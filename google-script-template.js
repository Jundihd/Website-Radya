/**
 * KODE GOOGLE APPS SCRIPT UNTUK INTEGRASI FORM KONSULTASI RADYA LABS & NOTIFIKASI EMAIL
 * 
 * TARGET EMAIL PENERIMA: amang.udinjundi@gmail.com, aloysius.adrian@radyalabs.com
 * 
 * =========================================================================================
 * CARA RESET DATABASE (START FRESH) & SETUP GOOGLE APPS SCRIPT:
 * =========================================================================================
 * 1. Buka Google Sheet tempat Anda ingin menampung database formulir konsultasi.
 * 2. Klik menu "Extensions" (Ekstensi) > "Apps Script".
 * 3. Hapus semua kode default, lalu tempelkan (paste) SELURUH kode di file ini.
 * 4. Klik tombol "Save" (Ikon Disket / Ctrl + S).
 * 
 * 🧹 UNTUK HAPUS DATABASE & START FRESH:
 * 5. Pada dropdown fungsi di bagian atas editor (di sebelah tombol Run/Jalankan),
 *    pilih fungsi: "resetSheetDatabase".
 * 6. Klik tombol "Run" (Jalankan). Berikan izin akses akun Google jika diminta (Review permissions > Allow).
 *    -> Google Sheet Anda akan langsung bersih, terformat rapi dengan tema Radya Labs Dark Navy & kolom baru "Tahap yang Dikembangkan".
 * 
 * 🚀 UNTUK DEPLOY WEB APP (MENGHUBUNGKAN KE WEBSITE):
 * 7. Klik "Deploy" (Terapkan) > "Manage deployments" (jika sudah ada) atau "New deployment" (jika baru).
 * 8. Jika "New deployment":
 *    - Pilih type: "Web app" (Aplikasi web).
 *    - Description: Radya Labs Consultation Form v2 (Tahap Pengembangan & Layanan)
 *    - Execute as: Me (Email Anda)
 *    - Who has access: Anyone (Siapa saja)  <-- PENTING agar website dapat mengirim data!
 *    - Klik "Deploy".
 * 9. Salin "Web app URL" (contoh: https://script.google.com/macros/s/.../exec).
 * 10. Pastikan URL tersebut sudah ada di file `.env.local` / Vercel Environment Variables:
 *     GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * =========================================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Setup Header jika Spreadsheet masih kosong
    if (sheet.getLastRow() === 0) {
      setupHeaders(sheet);
    }

    // Parsing data JSON yang dikirimkan dari backend Next.js
    var data = JSON.parse(e.postData.contents);

    var stageValue = data.stage || data.developmentStage || data.budget || "-";

    var row = [
      data.timestamp || new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
      data.referenceId || "-",
      data.name || "-",
      data.email || "-",
      data.phone || "-",
      data.company || "-",
      data.service || "-",
      stageValue,
      data.message || "-"
    ];

    // 1. Tambahkan baris baru di Google Sheet
    sheet.appendRow(row);

    // Format text wrapping dan alignment untuk baris baru
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");
    sheet.getRange(lastRow, 9).setWrap(true); // Catatan Proyek wrap

    // 2. Kirim Notifikasi Email Otomatis ke masing-masing penerima
    try {
      var recipientEmails = ["amang.udinjundi@gmail.com", "aloysius.adrian@radyalabs.com"];
      var subject = "🔔 [Radya Labs] Permintaan Konsultasi Baru (" + (data.referenceId || "RL-NEW") + ") - " + (data.name || "Klien");
      var htmlBody = ""
        + "<div style='font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);'>"
        + "  <div style='background-color: #0F172A; padding: 24px; text-align: center; color: white; border-bottom: 3px solid #1793E8;'>"
        + "    <h2 style='margin: 0; font-size: 22px; font-weight: bold; letter-spacing: -0.5px;'>Radya Labs Solution Architecture</h2>"
        + "    <p style='margin: 6px 0 0 0; color: #38bdf8; font-size: 14px; font-weight: bold;'>🔔 Permintaan Konsultasi Baru Diterima</p>"
        + "  </div>"
        + "  <div style='padding: 28px; background-color: #ffffff; color: #334155; font-size: 14px; line-height: 1.6;'>"
        + "    <div style='background-color: #f0f9ff; border-left: 4px solid #1793E8; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px; font-size: 13px; color: #0369a1; font-weight: bold;'>"
        + "      Nomor Referensi: " + (data.referenceId || "-") + " | Waktu: " + (data.timestamp || "-")
        + "    </div>"
        + "    <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; width: 190px; color: #64748b;'>Nama Lengkap:</td><td style='padding: 10px 0; color: #0f172a; font-weight: bold;'>" + (data.name || "-") + "</td></tr>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; color: #64748b;'>Email Perusahaan:</td><td style='padding: 10px 0;'><a href='mailto:" + data.email + "' style='color: #1793E8; font-weight: bold; text-decoration: none;'>" + (data.email || "-") + "</a></td></tr>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; color: #64748b;'>Telepon / WhatsApp:</td><td style='padding: 10px 0;'><a href='https://wa.me/" + String(data.phone).replace(/[^0-9]/g, '') + "' style='color: #16a34a; font-weight: bold; text-decoration: none;'>" + (data.phone || "-") + " (Klik untuk Chat WA)</a></td></tr>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; color: #64748b;'>Nama Perusahaan:</td><td style='padding: 10px 0; color: #0f172a;'>" + (data.company || "-") + "</td></tr>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; color: #64748b;'>Kebutuhan Layanan:</td><td style='padding: 10px 0;'><span style='background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 13px;'>" + (data.service || "-") + "</span></td></tr>"
        + "      <tr style='border-bottom: 1px solid #f1f5f9;'><td style='padding: 10px 0; font-weight: bold; color: #64748b;'>Tahap yang Dikembangkan:</td><td style='padding: 10px 0; color: #0f172a; font-weight: bold;'><span style='background: #dcfce7; color: #15803d; padding: 4px 10px; border-radius: 6px; font-size: 13px;'>" + stageValue + "</span></td></tr>"
        + "      <tr><td style='padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;'>Catatan / Pesan Tambahan:</td><td style='padding: 10px 0; color: #334155; white-space: pre-line;'>" + (data.message || "-") + "</td></tr>"
        + "    </table>"
        + "  </div>"
        + "  <div style='background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;'>"
        + "    Email ini dikirimkan otomatis oleh Web Portal Radya Labs."
        + "  </div>"
        + "</div>";

      for (var i = 0; i < recipientEmails.length; i++) {
        var emailTarget = recipientEmails[i].trim();
        if (emailTarget) {
          try {
            GmailApp.sendEmail(emailTarget, subject, "", {
              htmlBody: htmlBody
            });
          } catch (gmailErr) {
            try {
              MailApp.sendEmail({
                to: emailTarget,
                subject: subject,
                htmlBody: htmlBody
              });
            } catch (mailErr) {
              Logger.log("Err sending to " + emailTarget + ": " + mailErr.toString());
            }
          }
        }
      }
    } catch (mailErr) {
      Logger.log("Email notification error: " + mailErr.toString());
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success", referenceId: data.referenceId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "Google Apps Script Webhook Active - Target Email: amang.udinjundi@gmail.com, aloysius.adrian@radyalabs.com" }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * HELPER: Setup Header & Format Table
 */
function setupHeaders(sheet) {
  var headers = [
    "Waktu Input (WIB)",
    "No. Referensi",
    "Nama Lengkap",
    "Email Perusahaan",
    "Nomor Telepon / WA",
    "Nama Perusahaan",
    "Kebutuhan Layanan Utama",
    "Tahap yang Dikembangkan",
    "Catatan / Pesan Tambahan"
  ];
  sheet.appendRow(headers);

  // Styling Header (Bold & Background Dark Navy Radya Labs)
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#0F172A");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  // Set lebar kolom agar rapi dan nyaman dibaca
  sheet.setColumnWidth(1, 180); // Waktu
  sheet.setColumnWidth(2, 120); // No Ref
  sheet.setColumnWidth(3, 180); // Nama Lengkap
  sheet.setColumnWidth(4, 200); // Email
  sheet.setColumnWidth(5, 160); // Telp/WA
  sheet.setColumnWidth(6, 200); // Perusahaan
  sheet.setColumnWidth(7, 240); // Layanan Utama
  sheet.setColumnWidth(8, 260); // Tahap yang Dikembangkan
  sheet.setColumnWidth(9, 320); // Catatan Proyek
}

/**
 * 🧹 FUNGSI RESET DATABASE (START FRESH)
 * Jalankan fungsi ini langsung dari Google Apps Script untuk menghapus seluruh data lama
 * dan memasang tabel header baru dengan rapi!
 */
function resetSheetDatabase() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getActiveSheet();
  sheet.clear(); // Hapus seluruh isi dan format lama
  setupHeaders(sheet);
  Logger.log("✅ Database Google Sheet berhasil di-reset dan dimulai fresh dengan header terbaru!");
}

/**
 * 🧪 FUNGSI TES EMAIL (PILIH & JALANKAN DI APPS SCRIPT UNTUK MEMICU IZIN GOOGLE)
 */
function testSendEmail() {
  var testEmail = "amang.udinjundi@gmail.com";
  try {
    GmailApp.sendEmail(testEmail, "🧪 Tes Notifikasi Email Radya Labs", "", {
      htmlBody: "<h3 style='color: #1793E8;'>Sistem Notifikasi Email Berhasil Diotorisasi!</h3><p>Email ini mengonfirmasi bahwa Google Apps Script Anda telah diizinkan mengirimkan email notifikasi ke <b>" + testEmail + "</b>.</p>"
    });
  } catch (e) {
    MailApp.sendEmail({
      to: testEmail,
      subject: "🧪 Tes Notifikasi Email Radya Labs",
      htmlBody: "<h3 style='color: #1793E8;'>Sistem Notifikasi Email Berhasil Diotorisasi!</h3><p>Email ini mengonfirmasi bahwa Google Apps Script Anda telah diizinkan mengirimkan email notifikasi ke <b>" + testEmail + "</b>.</p>"
    });
  }
  Logger.log("Email tes berhasil dikirim ke: " + testEmail);
}
