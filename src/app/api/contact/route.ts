import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

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
      budget: budget || '-',
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
        const telegramMessage = `🔔 *PERMINTAAN KONSULTASI BARU RADYA LABS*\n\n`
          + `📌 *No. Referensi:* \`${referenceId}\`\n`
          + `👤 *Nama Lengkap:* ${name}\n`
          + `✉️ *Email:* ${email}\n`
          + `📞 *Telepon / WA:* ${phone || '-'}\n`
          + `🏢 *Perusahaan:* ${company || '-'}\n`
          + `⚡ *Kebutuhan Layanan:* ${service || '-'}\n`
          + `💰 *Estimasi Anggaran:* ${budget || '-'}\n`
          + `📝 *Catatan Proyek:* ${message || '-'}\n\n`
          + `⏰ *Waktu:* ${timestamp}`;

        const telegramRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: 'Markdown',
          }),
        });

        if (telegramRes.ok) {
          telegramNotified = true;
          console.log('[Contact API] Sent instant Telegram notification alert!');
        }
      } catch (teleErr) {
        console.error('[Contact API] Error sending Telegram alert:', teleErr);
      }
    }

    // 3. Generate WhatsApp Direct Link for User & Team
    const adminWhatsAppNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890';
    const waText = encodeURIComponent(
      `Halo Tim Solution Architect Radya Labs,\nSaya telah mengajukan permintaan konsultasi di website dengan No. Referensi: ${referenceId}.\n\nNama: ${name}\nEmail: ${email}\nLayanan: ${service}`
    );
    const whatsappUrl = `https://wa.me/${adminWhatsAppNumber.replace(/[^0-9]/g, '')}?text=${waText}`;

    return NextResponse.json({
      success: true,
      referenceId,
      sheetSynced,
      telegramNotified,
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
