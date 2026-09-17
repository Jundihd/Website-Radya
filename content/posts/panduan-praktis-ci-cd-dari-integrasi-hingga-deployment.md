---
slug: panduan-praktis-ci-cd-dari-integrasi-hingga-deployment
directus_id: 35efa51c-76ee-4000-a0f6-f5f12e72ffed
title_id: 'Panduan Praktis CI/CD: Dari Integrasi Hingga Deployment'
title_en: 'A Practical Guide to CI/CD: From Integration to Deployment '
excerpt_id: ''
excerpt_en: ''
date: '2025-02-11'
author: Radya Labs Engineering Team
cover: /images/blog/panduan-praktis-ci-cd-dari-integrasi-hingga-deployment.jpg
category_id: INSIGHT
category_en: INSIGHT
tags:
  - Technology
published: true
body_en: "### Overview\n\nCI/CD, short for continuous integration and continuous deployment, aims to streamline and accelerate the software development lifecycle.\_\n\n### Why CI/CD?\n\n*   Speed: CI/CD pipelines help developers make code changes as quickly and frequently as possible.\n*   Increased productivity: Deploying more frequently means you can deliver new features and bug fixes to users faster, which increases customer satisfaction.\n*   Reduced risk: A CI/CD pipeline will help you catch bugs earlier in the development process before the code reaches production. You want to deploy frequently, but you also don't want to send bugs to your users frequently - CI/CD will reduce the risk of doing so.\n*   Higher quality: Fixing issues earlier in the development cycle means you'll be able to deliver high-quality features or fixes to your users.\n\n### What is CI/CD?\n\nCI/CD consists of two parts, CI (continuous integration) and CD (continuous delivery/deployment).\n\n*   CI: refers to the building and unit testing stages of the software release process. Every committed revision/change will trigger the build and unit testing automatically.\n*   CD: refers to the release stage in the software development process. This release stage is done with a build artifact that is ready to be deployed and has passed a standardized testing process.\n\n### Important Concepts\n\n![cicd concepts](https://dev-admin.radyalabs.com/assets/c07ef088-8d61-4ccb-a0d3-19f2e9fb4969.jpg?width=700&height=238)\n\n*   Trigger  \n    Something that triggers the pipeline to run\n*   Pipeline  \n    A workflow of a CI or CD process consisting of one or more stages.\n*   Stage  \n    A stage is the logical boundary of a pipeline. Usually used for separation of interests for example (Build, staging, and production). Consists of one or more jobs\n*   Job  \n    A job represents the execution boundary of a series of steps. Job separation is usually done if there is a need to run a series of steps in different environments.. Each job runs on a single agent\n*   Step  \n    Is the smallest block of the pipeline, for example in one job there is a step that runs the build and there is a step that runs testing. Steps can contain tasks or scripts\n*   Agent  \n    A computer infrastructure with agent software that runs the job\n\nSo, the trigger will trigger the pipeline to run which consists of several stages and in the stage there are several jobs run by the agent and these jobs consist of steps that contain instructions or scripts.\_\n\n### CI In Practice\n\nIn this example, we use azure devops to create a pipeline in CI. First, click new pipeline on the pipelines menu page.\n\nThen connect your repository with the pipeline, in this example we will use a YAML file to configure the pipeline. If you don't want to use a YAML file, you can click Use the classic editor.\n\nAfter connecting the repo, you will reach the Configure step:\n\nSelect the pipeline starter to use the empty template yaml file.\n\nThen we configure this pipeline file such as triggers, agents, build steps as needed. The image below is an example of a yaml file for build and push images using docker with trigger tags that start with v \\*:\n\nWhen finished, save the configuration by pressing the save and run button, then the pipeline that we set up earlier will run.\n\n### CD In Practice\n\nTo create a CD pipeline in Azure Devops, open the Releases menu and press the New button then select new release pipeline.\n\nThen a form will appear to create a new release pipeline, if there is an option to choose a template, select start with an empty job to create a release pipeline from scratch.\n\nFirst, add the artifact and set the pipeline source by pressing the add button in the Artifacts section. Then, customize the Artifact configuration as needed.\n\nThen, enable the Continuous deployment trigger to run the release pipeline every time there is a successful build of the CI pipeline.\n\nTo add release steps, press the add button in the Stages section then select New Stage. Then move to the Tasks tab to set the steps in the release. Here is an example of the steps in the release pipeline:\n\nOnce you have done that, press the Save button to save the release pipeline.\n\nThank you for reading this article about CI/CD. We hope that the information presented can provide a better understanding of the importance of Continuous Integration and Continuous Delivery in software development. By implementing CI/CD practices, development teams can improve efficiency, quality, and speed in releasing software.\n\nFor other interesting information about technology and IT, visit:\_[**Radya Blog**](https://radyadigital.com/en/blog). And for consultation in making applications, you can contact our team at:\_**[Radya Contact](https://radyadigital.com/en/contact)**.\n\nSumber:\n\n[Developing an effective CI/CD pipeline for frontend apps - LogRocket Blog](https://blog.logrocket.com/best-practices-ci-cd-pipeline-frontend/)\n\n[What is CI/CD? (redhat.com)](https://www.redhat.com/en/topics/devops/what-is-ci-cd#overview)\n\n[What is CI? - Continuous Integration Explained - AWS (amazon.com)](https://aws.amazon.com/id/devops/continuous-integration/#:~:text=Continuous%20integration%20refers%20to%20the,for%20a%20release%20to%20production.)\n\n[Apa itu Pengiriman Berkelanjutan? – Amazon Web Services](https://aws.amazon.com/id/devops/continuous-delivery/)"
---
### Overview

CI/CD, kependekan dari continuous integration dan continuous deployment bertujuan untuk mempermudah (streamlined) dan mempercepat lifecycle pengembangan perangkat lunak

### Mengapa CI/CD?

*   Kecepatan: Pipeline CI/CD membantu pengembang membuat perubahan kode secepat dan sesering mungkin.
*   Produktivitas yang meningkat: Melakukan deploy lebih sering berarti Anda dapat mengirimkan fitur baru dan perbaikan bug kepada pengguna lebih cepat, yang akan meningkatkan kepuasan pelanggan
*   Risiko yang berkurang: Pipeline CI/CD akan membantu Anda menangkap bug lebih awal dalam proses pengembangan sebelum kode mencapai produksi. Anda ingin melakukan deploy secara sering, tetapi Anda juga tidak ingin sering mengirimkan bug kepada pengguna Anda — CI/CD akan mengurangi risiko melakukan hal tersebut.
*   Kualitas yang lebih tinggi: Memperbaiki masalah lebih awal dalam siklus pengembangan berarti Anda akan dapat mengirimkan fitur atau perbaikan berkualitas tinggi kepada pengguna.

### Apa itu CI/CD?

CI/CD terdiri dari 2 bagian yaitu CI (continuous integration) dan CD (continuous delivery/deployment)

*   CI:  mengacu pada tahap building dan unit testing dalam proses rilis perangkat lunak. Setiap revisi/perubahan yang di-commit akan men-trigger build dan unit testing secara otomatis
*   CD:  mengacu pada tahap rilis dalam proses pengembangan perangkat lunak. Tahap rilis ini dilakukan dengan artifact build yang siap di deploy dan telah melewati proses pengujian terstandarisasi

### Konsep Penting

![konsep ci/cd](https://dev-admin.radyalabs.com/assets/c07ef088-8d61-4ccb-a0d3-19f2e9fb4969.jpg?width=700&height=238)

*   Trigger  
    Sesuatu yang memicu **_pipeline_** untuk berjalan
*   Pipeline  
    Sebuah workflow dari process CI atau CD yang terdiri dari satu **_stage_** atau lebih
*   Stage  
    Stage adalah batasan logikal dari sebuah pipeline. Biasanya digunakan untuk pemisahan kepentingan misalnya (Build, staging, dan production). Terdiri dari satu **_job_** atau lebih.
*   Job  
    Sebuah _**job**_ mewakili batasan eksekusi dari serangkaian _**step**._ Pemisahan job biasanya dilakukan jika ada keperluan untuk menjalankan serangkaian **_steps_** pada beberapa environment yang berbeda. Setiap job berjalan pada satu **_agent_**
*   Step  
    Adalah blok terkecil dari pipeline, misal dalam satu job ada step yang menjalankan build dan ada step yang menjalankan testing. Step bisa berisi task maupun script
*   Agent  
    Sebuah infrastruktur komputer dengan agent software yang menjalankan **_job_**

Jadi, trigger akan memicu pipeline untuk berjalan yang mana terdiri dari beberapa stage dan di dalam stage tersebut ada beberapa job yang dijalankan oleh agent dan job-job tersebut terdiri dari step-step yang berisi instruksi atau script.

### CI In Practice

Pada contoh kali ini, kita menggunakan azure devops untuk membuat pipeline pada CI. Pertama, klik new pipeline pada halaman di menu pipelines.

Kemudian sambungkan repository anda dengan pipeline, pada contoh ini kita akan menggunakan file YAML untuk mengkonfigurasi pipelinenya. Jika anda tidak ingin menggunakan pipeline, anda bisa klik Use the classic editor.

Setelah menyambungkan repo, anda akan sampai di step Configure:

Pilih starter pipeline untuk menggunakan template kosong file yaml

Kemudian kita konfigurasikan file pipeline ini seperti trigger, agent, step-step buildnya sesuai dengan kebutuhan.

Gambar dibawah adalah contoh file yaml untuk build dan push image menggunakan docker dengan trigger tags yang berawalan v\*:

Jika sudah selesai maka simpan konfigurasi dengan menekan tombol save and run, maka pipeline yang tadi kita atur akan berjalan

### CD In Practice

Untuk membuat pipeline CD di Azure Devops, buka menu Releases dan tekan tombol New kemudian pilih new release pipeline

Maka akan tampil form untuk membuat new release pipeline, jika ada pilihan untuk memilih template pilih start with an empty job untuk membuat release pipeline dari awal

Pertama, tambahkan artifact dan set sumber pipeline dengan menekan tombol add pada section Artifacts. Lalu, sesuaikan konfigurasi Artifact sesuai dengan kebutuhan.

Lalu, aktifkan Continuous deployment trigger untuk menjalankan pipeline release setiap ada build yang berhasil dari pipeline CI.

Untuk menambah step-step release, tekan tombol add pada section Stages kemudian pilih New Stage. Lalu pindah ke tab Tasks untuk mengatur step-step yang ada pada release. Berikut adalah contoh step yang ada pada pipeline release:

Jika sudah maka tekan tombol Save untuk menyimpan release pipeline.

Terima kasih telah membaca artikel ini tentang CI/CD. Kami berharap informasi yang disajikan dapat memberikan pemahaman yang lebih baik tentang pentingnya Continuous Integration dan Continuous Delivery dalam pengembangan perangkat lunak. Dengan menerapkan praktik CI/CD, tim pengembang dapat meningkatkan efisiensi, kualitas, dan kecepatan dalam merilis perangkat lunak.

Untuk informasi menarik lainnya seputar teknologi dan IT, kunjungi: **[Blog Radya](https://radyadigital.com/id/blog)**. Dan untuk konsultasi dalam pembuatan aplikasi dapat menghubungi tim kami di: [**Kontak Radya**](https://radyadigital.com/id/blog).

**Sumber:**

**[Developing an effective CI/CD pipeline for frontend apps - LogRocket Blog](https://blog.logrocket.com/best-practices-ci-cd-pipeline-frontend/)**

[**What is CI/CD? (redhat.com)**](https://www.redhat.com/en/topics/devops/what-is-ci-cd#overview)

**[What is CI? - Continuous Integration Explained - AWS (amazon.com)](https://aws.amazon.com/id/devops/continuous-integration/#:~:text=Continuous%20integration%20refers%20to%20the,for%20a%20release%20to%20production.)**

**[Apa itu Pengiriman Berkelanjutan? – Amazon Web Services](https://aws.amazon.com/id/devops/continuous-delivery/)**
