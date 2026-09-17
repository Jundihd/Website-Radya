---
slug: membuat-npm-package-dengan-custom-cli
directus_id: 08b66210-0de6-41aa-93af-ece997f318af
title_id: Membuat NPM Package dengan Custom CLI
title_en: Creating NPM Packages with Custom CLI
excerpt_id: ''
excerpt_en: ''
date: '2025-02-11'
author: Radya Labs Engineering Team
cover: /images/blog/membuat-npm-package-dengan-custom-cli.jpg
category_id: INSIGHT
category_en: INSIGHT
tags:
  - Technology
published: true
body_en: "### What is a Package Manager\n\nA\_**Package Manager**\_is a tool for managing dependencies or packages required by an application or project. This tool takes these packages from repositories, both local and public, and installs them on the system.\n\nIn programming, we rarely start a project from scratch. Usually, we integrate several existing libraries or packages that are created by others. This can happen because we may not be able to create the library, or we just want to focus on product development. In the end, we save time by utilizing libraries that have been shared by others. Using what has been created by others can speed up the development process and avoid the effort of \"reinventing something that already exists.\"\n\nWith a package manager, application development becomes easier and more efficient, because developers do not need to download and install packages manually. This package contains reusable code and provides various features and functionality to manage our project dependencies such as libraries, frameworks, and utilities.\n\n### Steps to Create an NPM Package\n\nTo create an NPM package, follow these steps.\n\n1\\. Install Node.js\n\nVisit the official\_[Node.js](https://nodejs.org/)\_website and download the\_**LTS**\_version or the latest version according to your needs.\n\nOnce downloaded, follow the installation instructions that suit your operating system (Windows, macOS, or Linux).\n\n2\\. Initialize the Project\n\nCreate a project directory for your package manager:\n\nInitialize the project using npm init:\n\nThen update the package.json file\n\n3\\. Install Commander.js for CLI\n\nPackage managers like NPM use the\_**Command Line Interface (CLI)**. You can use the\_[Commander](https://www.npmjs.com/package/commander)\_library for custom CLI.\n\nInstall\_**Commander**:\n\n4\\. Create a program file\n\nCreate a src folder and a JavaScript file in it, for example\_**index.js**:\n\nAdd code to the\_**index.js** file to create a simple command.\n\n5\\. Test the npm package that has been created\n\nCreate a local package link\n\nIn the project where the package will be installed, add the following command\n\nCheck the package after installation\n\nIf it has been successfully installed, you can start using the package that has been prepared\n\ncommand 1\n\nOutput:\n\ncommand 2\n\nOutput:\n\n6\\. Publish\n\nFirst, you must have an NPM account to publish your npm package.\n\nEnter the following command\n\nCongratulations, your\_[NPM](https://www.npmjs.com/login) Package has been successfully published and you can install it via NPM.\n\nCongratulations, your NPM Package has been successfully published and you can install it via NPM.\n\n### **Conclusion**\n\nBy following the steps above, you can\_**create your package manager**\_that works like NPM, from Node.js installation to implementing features such as dependency management, caching, and version management. This opens up great opportunities for you to customize and explore various\_**NPM packages**\_according to your project needs. In addition, with this capability, you can create a package ecosystem that suits project specifications and deepen your understanding of how package managers work.\n\nFor other interesting information about technology and IT, visit:\_[**Radya Blog**](https://radyadigital.com/en/blog). And for consultation in creating applications, you can contact our team at:\_[](https://radyadigital.com/en/contact)[**Radya Contact**](https://radyadigital.com/en/contact).\n\n**Source:**\n\n[How to Create and Publish an NPM Package — a Step-by-Step Guide](https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/)\n\n[How To Create An NPM Package](https://www.totaltypescript.com/how-to-create-an-npm-package)"
---
### Apa itu Package Manager

**Package Manager** adalah alat yang berperan dalam mengelola dependensi atau paket yang diperlukan oleh sebuah aplikasi atau proyek. Alat ini mengambil paket-paket tersebut dari repository, baik lokal maupun publik, dan menginstalnya ke sistem.

Dalam pemrograman, jarang sekali kita memulai proyek dari awal. Biasanya, kita mengintegrasikan beberapa library atau package yang sudah ada, bukan hasil buatan kita sendiri. Hal ini bisa terjadi karena kita mungkin tidak memiliki kemampuan untuk membuat library tersebut, atau kita hanya ingin fokus pada pengembangan produk. Pada akhirnya, kita menghemat waktu kerja dengan memanfaatkan library yang sudah dibagikan oleh orang lain. Menggunakan apa yang telah dibuat oleh orang lain dapat mempercepat proses pengembangan dan menghindari usaha untuk “menciptakan ulang sesuatu yang sudah ada.”

Dengan adanya package manager, pengembangan aplikasi menjadi lebih mudah dan efisien, karena pengembang tidak perlu mengunduh dan menginstal paket secara manual. Package ini berisi kode yang dapat digunakan kembali dan menyediakan berbagai fitur dan fungsionalitas untuk mengelola dependensi proyek kita seperti libraries, frameworks dan utilities.

### Langkah-langkah Membuat NPM Package

Untuk membuat NPM package ikuti langkah berikut ini

1\. Install Node.js

Kunjungi situs resmi [**Node.js**](https://nodejs.org/) dan download versi **LTS** atau versi terbaru sesuai kebutuhan Anda.

Setelah diunduh, ikuti petunjuk instalasi yang sesuai dengan sistem operasi Anda (Windows, macOS, atau Linux).

2\. Inisialisasi Proyek

Buat direktori proyek untuk package manager Anda:

Inisialisasi proyek menggunakan **npm init**:

lalu update file package.json

3\. Install Commander.js untuk CLI

Package manager seperti NPM menggunakan **Command Line Interface (CLI)**. Anda bisa menggunakan library **[Commander](https://www.npmjs.com/package/commander)** untuk custom CLI.

Install **Commander**:

4\. Membuat file program

Buat folder src dan file JavaScript didalamnya, misalnya **index.js**:

Tambahkan code pada file index.js untuk membuat perintah sederhana

5\. Melakukan testing pada package npm yang telah di buat

membuat link local package

pada proyek yang akan dilakukan instalasi package tambahkan command berikut

cek package setelah di install

jika sudah berhasil terinstall anda bisa memulai menggunakan package yang sudah disiapkan

command 1

output :

command 2

output :

6\. Melakukan Publish

Pertama anda harus mempunyai akun **[NPM](https://www.npmjs.com/login)** untuk melakukan publish npm package anda

masukan command berikut

Selamat NPM Package anda berhasil terpublish dan anda bisa menginstalnya melalui NPM.

### Kesimpulan

dengan mengikuti langkah-langkah di atas, Anda dapat **membuat package manager** sendiri yang berfungsi seperti NPM, dari instalasi Node.js hingga implementasi fitur seperti manajemen dependensi, caching, dan pengelolaan versi. Ini membuka peluang besar bagi Anda untuk menyesuaikan dan mengeksplorasi berbagai **NPM package** sesuai dengan kebutuhan proyek Anda. Selain itu, dengan kemampuan ini, Anda bisa menciptakan ekosistem package yang sesuai dengan spesifikasi proyek dan memperdalam pemahaman tentang bagaimana package manager bekerja.

Untuk informasi menarik lainnya seputar teknologi dan IT, kunjungi: [**Blog Radya**](https://radyadigital.com/id/blog). Dan untuk konsultasi dalam pembuatan aplikasi dapat menghubungi tim kami di: [**Kontak Radya**](https://radyadigital.com/id/blog).
