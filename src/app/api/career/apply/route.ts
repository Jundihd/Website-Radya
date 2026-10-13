import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = (formData.get('fullName') as string) || '';
    const experienceYears = (formData.get('experienceYears') as string) || '';
    const lastJobTitle = (formData.get('lastJobTitle') as string) || '';
    const expectedSalary = (formData.get('expectedSalary') as string) || '';
    const email = (formData.get('email') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const positionTitle = (formData.get('positionTitle') as string) || 'Talent Pool / General Application';
    const cvFile = formData.get('cvFile') as File | null;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Nama lengkap, email, dan nomor telepon wajib diisi.' },
        { status: 400 }
      );
    }

    if (!cvFile || typeof cvFile === 'string') {
      return NextResponse.json(
        { success: false, error: 'Berkas CV wajib diunggah (format PDF, DOC, atau DOCX).' },
        { status: 400 }
      );
    }

    // Validasi ekstensi & ukuran berkas
    const fileName = cvFile.name;
    const fileSize = cvFile.size;
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(fileName).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { success: false, error: 'Format berkas tidak didukung. Harap unggah PDF, DOC, atau DOCX.' },
        { status: 400 }
      );
    }

    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (fileSize > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Ukuran berkas melebihi batas maksimal 10MB.' },
        { status: 400 }
      );
    }

    // Buat nomor referensi pendaftaran unik
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `RL-CAREER-${randomCode}`;

    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Simpan file sementara di disk lokal jika server mendukung
    let savedFileUrl = '';
    let fileBase64 = '';
    try {
      const fileBuffer = Buffer.from(await cvFile.arrayBuffer());
      fileBase64 = fileBuffer.toString('base64');

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'careers');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const safeFileName = `${referenceId}-${Date.now()}-${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const destPath = path.join(uploadsDir, safeFileName);
      fs.writeFileSync(destPath, fileBuffer);
      savedFileUrl = `/uploads/careers/${safeFileName}`;
    } catch (saveErr) {
      console.warn('[Career Apply API] Could not write CV to local disk (e.g. read-only environment):', saveErr);
    }

    const payload = {
      action: 'career_application',
      timestamp,
      referenceId,
      fullName,
      email,
      phone,
      positionTitle,
      experienceYears: experienceYears || '-',
      lastJobTitle: lastJobTitle || '-',
      expectedSalary: expectedSalary || '-',
      fileName,
      fileSize,
      savedFileUrl,
      targetRecipient: 'join@radyalabs.com',
    };

    console.log('[Career Apply API] Received new application:', payload);

    // 1. Integrasi Google Sheets / Apps Script Webhook
    const googleSheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    let sheetSynced = false;

    if (googleSheetWebhookUrl) {
      try {
        const sheetRes = await fetch(googleSheetWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          redirect: 'follow',
          body: JSON.stringify({
            ...payload,
            fileBase64: fileBase64 ? fileBase64.slice(0, 500000) : '', // limit payload size if needed
          }),
        });
        const resText = await sheetRes.text();
        if (sheetRes.ok && !resText.includes('accounts.google.com')) {
          sheetSynced = true;
          console.log('[Career Apply API] Successfully synced to Google Sheets webhook');
        }
      } catch (sheetErr) {
        console.error('[Career Apply API] Google Sheets Webhook error:', sheetErr);
      }
    }

    // 2. Notifikasi Telegram Alert
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    let telegramNotified = false;

    if (telegramBotToken && telegramChatId) {
      try {
        const telegramMessage =
          `💼 <b>LAMARAN KARIR BARU DI RADYA LABS</b>\n\n` +
          `📌 <b>No. Referensi:</b> <code>${escapeHtml(referenceId)}</code>\n` +
          `🎯 <b>Posisi:</b> <b>${escapeHtml(positionTitle)}</b>\n` +
          `👤 <b>Nama:</b> ${escapeHtml(fullName)}\n` +
          `✉️ <b>Email:</b> ${escapeHtml(email)}\n` +
          `📞 <b>Telepon / WA:</b> ${escapeHtml(phone)}\n` +
          `⏳ <b>Pengalaman:</b> ${escapeHtml(experienceYears)} Tahun\n` +
          `💼 <b>Jabatan Terakhir:</b> ${escapeHtml(lastJobTitle || '-')}\n` +
          `💰 <b>Ekspektasi Gaji:</b> ${escapeHtml(expectedSalary || '-')}\n` +
          `📄 <b>Berkas CV:</b> ${escapeHtml(fileName)} (${Math.round(fileSize / 1024)} KB)\n\n` +
          `⏰ <b>Waktu:</b> ${escapeHtml(timestamp)}\n` +
          `📬 <i>Tujuan: join@radyalabs.com</i>`;

        const telegramRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: telegramMessage,
              parse_mode: 'HTML',
            }),
          }
        );
        const teleData = await telegramRes.json();
        if (telegramRes.ok && teleData.ok) {
          telegramNotified = true;
        }
      } catch (teleErr) {
        console.error('[Career Apply API] Telegram alert error:', teleErr);
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      sheetSynced,
      telegramNotified,
      message: 'Lamaran Anda berhasil dikirim ke tim HR Radya Labs!',
    });
  } catch (error: any) {
    console.error('[Career Apply API] Server error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan sistem saat memproses lamaran.' },
      { status: 500 }
    );
  }
}
