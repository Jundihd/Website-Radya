---
slug: mengenal-react-pdf-membuat-dan-menampilkan-file-pdf-di-browser-dan-server
directus_id: 7e4d5961-d8c9-4e8b-8a77-55f9138c5242
title_id: 'Mengenal React-PDF, Membuat dan menampilkan file PDF di browser dan server'
title_en: >-
  Getting to Know React-PDF, Creating and Displaying PDF Files in Browsers and
  Servers
excerpt_id: ''
excerpt_en: ''
date: '2025-02-11'
author: Radya Labs Engineering Team
cover: ''
category_id: INSIGHT
category_en: INSIGHT
tags:
  - Technology
published: true
body_en: >-
  React-PDF is a React-based library designed to read, display, and create PDF
  documents in browsers or servers. With a component-based approach, React-PDF
  simplifies the developer's work in managing PDF files, both for rendering
  needs and dynamic document creation.


  This article will discuss how React-PDF works, its main components, best
  practices, and advanced implementations that can improve application
  efficiency.


  ### Introduction to React-PDF


  React-PDF provides two main modules:


  1.  @react-pdf/viewer: Used to read and display PDF files in React
  applications. This module is usually used to display existing documents.
      
  2.  @react-pdf/renderer: Used to create new PDF documents programmatically
  using javascript or typescript syntax. Usually used to create reports,
  invoices, or other dynamic documents.
      

  These two modules allow developers to handle PDF files flexibly without the
  need to use additional libraries or third-party plugins.


  ### React-PDF Main Components


  1\. React-PDF Viewer (@react-pdf/viewer)


  The most commonly used components for reading PDF files are:


  *   Document: The main component for loading PDF files.
      
  *   Page: Component for rendering specific pages from PDF.
      
  *   Outline: Provides a table of contents of PDF (if available).
      
  *   Thumbnail: Used to create a mini preview of each PDF page.
      

  Key Features:


  *   Supports pagination.
      
  *   Zoom in and zoom out capabilities.
      
  *   Render PDF pages efficiently with lazy loading for better performance.
      

  Viewer Implementation Example:


  2\. React-PDF Renderer (@react-pdf/renderer)


  This module allows you to create PDFs from scratch using JSX syntax. Its main
  components include:


  *   Document: Representation of a PDF document.
      
  *   Page: Page in a PDF.
      
  *   View: Multipurpose container for other elements.
      
  *   Text: Component for customizable text.
      
  *   Image: Used to insert images.
      
  *   Link: Add internal or external links in a document.
      

  Dynamic PDF Generation Example:


  ### Advanced Features


  1\. Pagination and Navigation Controls


  React-PDF Viewer supports pagination, which can be customized to provide a
  better reading experience. You can integrate navigation controls such as
  "Next" and "Previous" buttons.


  Navigation Example:


  2\. Customize Document Style


  Using StyleSheet from @react-pdf/renderer, you can define a more structured
  and clean style.


  3\. Insert Images and Graphics


  React-PDF supports inserting images, allowing you to create more visually
  appealing documents.


  Example of Adding an Image:


  ### Best Practices


  1.  Use Lazy Loading for Performance  
      For large documents, use lazy loading to render pages only when needed.
      
  2.  Cache PDF Data  
      Cache PDF documents to reduce repeated requests to the server.
      
  3.  Take Advantage of Server-side Rendering (SSR)  
      When possible, generate PDF files on the server side to reduce the load on the client.
      

  ### Conclusion


  React-PDF is a great library for managing PDF files in React applications.
  With PDF reading and rendering capabilities integrated directly into the React
  ecosystem, this library provides great flexibility and efficiency for
  developers. Whether you are building dynamic reporting features, needing PDF
  previews, or creating downloadable documents, React-PDF can be an ideal
  solution.


  For other interesting information about technology and IT, visit: [Radya
  Blog](https://radyadigital.com/en/blog). And for consultation in creating
  applications, you can contact our team at: [Radya
  Contact](https://radyadigital.com/en/contact).


  Source:


  [https://react-pdf.org/](https://react-pdf.org/)
---
React-PDF adalah library berbasis React yang dirancang untuk membaca, menampilkan, dan membuat dokumen PDF pada browser ataupun server. Dengan pendekatan berbasis komponen, React-PDF menyederhanakan pekerjaan developer untuk mengelola file PDF, baik untuk kebutuhan rendering maupun pembuatan dokumen secara dinamis.

Artikel ini akan membahas secara umum bagaimana cara kerja React-PDF, komponen-komponen utamanya, best practices, serta penerapan lanjutan yang dapat meningkatkan efisiensi aplikasi.

### Pendahuluan ke React-PDF

React-PDF menyediakan dua modul utama:

1.  @react-pdf/viewer: Digunakan untuk membaca dan menampilkan file PDF di aplikasi React. Modul ini biasanya digunakan untuk menampilkan dokumen yang sudah ada.
    
2.  @react-pdf/renderer: Digunakan untuk membuat dokumen PDF baru secara programatik menggunakan sintaks javascript atau typescript. Biasanya digunakan untuk membuat laporan, invoice, atau dokumen dinamis lainnya.
    

Kedua modul ini memungkinkan developer untuk menangani file PDF secara fleksibel tanpa perlu menggunakan library tambahan atau plugin pihak ketiga.

### Komponen Utama React-PDF

#### 1\. React-PDF Viewer (@react-pdf/viewer)

Komponen yang paling sering digunakan untuk membaca file PDF adalah:

*   Document: Komponen utama untuk memuat file PDF.
    
*   Page: Komponen untuk merender halaman tertentu dari PDF.
    
*   Outline: Menyediakan daftar isi PDF (jika tersedia).
    
*   Thumbnail: Digunakan untuk membuat pratinjau mini setiap halaman PDF.
    

Fitur Utama:

*   Mendukung paginasi.
    
*   Kemampuan zoom in dan zoom out.
    
*   Render halaman PDF secara efisien dengan lazy loading untuk kinerja yang lebih baik.
    

Contoh Implementasi Viewer:

#### 2\. React-PDF Renderer (@react-pdf/renderer)

Modul ini memungkinkan Anda membuat PDF dari awal menggunakan sintaks JSX. Komponen utamanya meliputi:

*   Document: Representasi dokumen PDF.
    
*   Page: Halaman dalam PDF.
    
*   View: Kontainer serbaguna untuk elemen lainnya.
    
*   Text: Komponen untuk teks yang dapat disesuaikan.
    
*   Image: Digunakan untuk menyisipkan gambar.
    
*   Link: Menambahkan tautan internal atau eksternal dalam dokumen.
    

Contoh Pembuatan PDF Dinamis:

### Fitur Lanjutan

#### 1\. Pagination dan Kontrol Navigasi

React-PDF Viewer mendukung paginasi, yang dapat dikustomisasi untuk menyediakan pengalaman membaca yang lebih baik. Anda dapat mengintegrasikan kontrol navigasi seperti tombol "Berikutnya" dan "Sebelumnya".

Contoh Navigasi:

#### 2\. Kustomisasi Gaya Dokumen

Menggunakan StyleSheet dari @react-pdf/renderer, Anda dapat mendefinisikan gaya yang lebih terstruktur dan rapi.

#### 3\. Menyisipkan Gambar dan Grafik

React-PDF mendukung penyisipan gambar, memungkinkan Anda membuat dokumen yang lebih menarik secara visual.

Contoh Menambahkan Gambar:

### Best Practices

1.  Gunakan Lazy Loading untuk Kinerja  
    Untuk dokumen besar, gunakan lazy loading untuk merender halaman hanya saat diperlukan.
    
2.  Cache Data PDF  
    Simpan dokumen PDF di cache untuk mengurangi permintaan berulang ke server.
    
3.  Manfaatkan Server-side Rendering (SSR)  
    Jika memungkinkan, buat file PDF di sisi server untuk mengurangi beban di klien.
    

### Kesimpulan

React-PDF adalah library yang bagus untuk mengelola file PDF di aplikasi React. Dengan kemampuan membaca dan membuat PDF yang terintegrasi langsung ke dalam ekosistem React, library ini memberikan fleksibilitas dan efisiensi tinggi untuk developer. Baik Anda sedang membangun fitur laporan dinamis, memerlukan pratinjau PDF, atau membuat dokumen yang dapat diunduh, React-PDF dapat menjadi solusi ideal.

Untuk informasi menarik lainnya seputar teknologi dan IT, kunjungi: [Blog Radya](https://radyadigital.com/id/blog). Dan untuk konsultasi dalam pembuatan aplikasi dapat menghubungi tim kami di: [Kontak Radya](https://radyadigital.com/id/blog).

Sumber :

[https://react-pdf.org/](https://react-pdf.org/)
