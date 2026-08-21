import { NextResponse } from 'next/server';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatWaNumber(numStr: string): string {
  if (numStr.startsWith('whatsapp:')) return numStr;
  let cleaned = numStr.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return `whatsapp:+${cleaned}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, stage, developmentStage, budget, message } = body;
    const chosenStage = stage || developmentStage || budget || '-';

    // Basic Validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // Generate unique reference ID (e.g., RL-89421)
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `RL-${randomCode}`;
    
    // Format timestamp in WIB (Jakarta time)
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'amang.udinjundi@gmail.com, aloysius.adrian@radyalabs.com';

    const payload = {
      timestamp,
      referenceId,
      name,
      email,
      phone: phone || '-',
      company: company || '-',
      service: service || 'General Inquiry',
      stage: chosenStage,
      budget: chosenStage, // for backward compatibility with older sheet webhooks
      message: message || '-',
      recipientEmail,
    };

    console.log('[Contact API] Received submission:', payload);

    // 1. Google Sheets Webhook & Automatic Admin Email Alert
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let sheetSynced = false;

    if (googleSheetWebhookUrl) {
      try {
        const sheetRes = await fetch(googleSheetWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          redirect: 'follow',
          body: JSON.stringify(payload),
        });

        const resText = await sheetRes.text();
        console.log('[Contact API] Sheet Webhook Status:', sheetRes.status, 'Response:', resText);

        if (sheetRes.ok && !resText.includes('accounts.google.com') && !resText.includes('Halaman Tidak Ditemukan')) {
          sheetSynced = true;
          console.log('[Contact API] Successfully synced submission to Google Sheets & sent email alert.');
        } else {
          console.warn('[Contact API] Google Sheet webhook returned unexpected response or requires permission check.');
        }
      } catch (sheetErr) {
        console.error('[Contact API] Error forwarding to Google Sheets webhook:', sheetErr);
      }
    }

    // 2. Instant Telegram Bot Notification Alert
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    let telegramNotified = false;

    if (telegramBotToken && telegramChatId) {
      try {
        const telegramMessage = `<b>🔔 PERMINTAAN KONSULTASI BARU RADYA LABS</b>\n\n`
          + `📌 <b>No. Referensi:</b> <code>${escapeHtml(referenceId)}</code>\n`
          + `👤 <b>Nama Lengkap:</b> ${escapeHtml(name)}\n`
          + `✉️ <b>Email:</b> ${escapeHtml(email)}\n`
          + `📞 <b>Telepon / WA:</b> ${escapeHtml(phone || '-')}\n`
          + `🏢 <b>Perusahaan:</b> ${escapeHtml(company || '-')}\n`
          + `⚡ <b>Kebutuhan Layanan:</b> ${escapeHtml(service || '-')}\n`
          + `🚀 <b>Tahap yang Dikembangkan:</b> ${escapeHtml(chosenStage)}\n`
          + `📝 <b>Catatan / Pesan Tambahan:</b> ${escapeHtml(message || '-')}\n\n`
          + `⏰ <b>Waktu:</b> ${escapeHtml(timestamp)}`;

        const telegramRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: 'HTML',
          }),
        });

        const teleData = await telegramRes.json();
        if (telegramRes.ok && teleData.ok) {
          telegramNotified = true;
          console.log('[Contact API] Sent instant Telegram notification alert!');
        } else {
          console.error('[Contact API] Telegram API error response:', teleData);
        }
      } catch (teleErr) {
        console.error('[Contact API] Error sending Telegram alert:', teleErr);
      }
    }

    // 3. Instant Twilio WhatsApp API Notification Alert
    const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioSenderWa = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // default Twilio sandbox number
    const targetWaNumberRaw = process.env.TWILIO_TARGET_WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628131600130';
    let twilioNotified = false;

    if (twilioAccountSid && twilioAuthToken) {
      try {
        const fromWa = formatWaNumber(twilioSenderWa);
        const toWa = formatWaNumber(targetWaNumberRaw);
        
        const twilioWaMessage = `🔔 PERMINTAAN KONSULTASI BARU RADYA LABS\n\n`
          + `📌 No. Referensi: ${referenceId}\n`
          + `👤 Nama: ${name}\n`
          + `✉️ Email: ${email}\n`
          + `📞 Telepon / WA: ${phone || '-'}\n`
          + `🏢 Perusahaan: ${company || '-'}\n`
          + `⚡ Layanan: ${service || '-'}\n`
          + `🚀 Tahap: ${chosenStage}\n`
          + `📝 Pesan: ${message || '-'}\n\n`
          + `⏰ Waktu: ${timestamp}`;

        const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
        const authHeader = 'Basic ' + Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');

        const params = new URLSearchParams();
        params.append('From', fromWa);
        params.append('To', toWa);
        params.append('Body', twilioWaMessage);

        const twilioRes = await fetch(twilioUrl, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        });

        const twilioData = await twilioRes.json();
        if (twilioRes.ok && twilioData.sid) {
          twilioNotified = true;
          console.log('[Contact API] Sent instant Twilio WhatsApp notification alert! SID:', twilioData.sid);
        } else {
          console.error('[Contact API] Twilio WhatsApp API error response:', twilioData);
        }
      } catch (twilioErr) {
        console.error('[Contact API] Error sending Twilio WhatsApp alert:', twilioErr);
      }
    }

    // 4. Generate WhatsApp Direct Link for User & Team
    const adminWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '628131600130';
    const waText = encodeURIComponent(
      `Halo Tim Solution Architect Radya Labs,\nSaya telah mengajukan permintaan konsultasi di website dengan No. Referensi: ${referenceId}.\n\nNama: ${name}\nEmail: ${email}\nLayanan: ${service}\nTahap: ${chosenStage}`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber.replace(/[^0-9]/g, '')}?text=${waText}`;

    return NextResponse.json({
      success: true,
      referenceId,
      sheetSynced,
      telegramNotified,
      twilioNotified,
      whatsappUrl,
      message: 'Consultation request submitted successfully.',
    });
  } catch (error: any) {
    console.error('[Contact API] Error handling request:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error occurred.' },
      { status: 500 }
    );
  }
}

