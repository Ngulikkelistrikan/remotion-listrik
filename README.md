# Ngulik Kelistrikan — Remotion Starter

Template video vertikal 1080×1920, 30 fps, durasi 60 detik (6 adegan).

## Isi video
1. Hook: Bagaimana listrik sampai ke rumah?
2. Pembangkit listrik
3. Jaringan transmisi
4. Gardu induk
5. Distribusi
6. Sampai ke rumah

## Catatan penting
Visual dalam starter ini dibuat dengan SVG dan CSS motion graphic. Ini bukan render 3D fotorealistis. Kamu bisa mengganti ilustrasi dengan foto/video berlisensi atau aset buatan sendiri untuk tampilan yang lebih realistis.

## Menjalankan proyek
Dibutuhkan lingkungan Node.js yang mendukung Remotion. Android tidak ideal untuk proses render Remotion secara lokal. Gunakan laptop/PC, atau lingkungan coding cloud yang menyediakan terminal Node.js dan dukungan browser/Chromium.

1. Ekstrak ZIP.
2. Buka folder proyek di lingkungan Node.js.
3. Jalankan `npm install`.
4. Jalankan `npm run start` untuk membuka Remotion Studio.
5. Pilih komposisi `NgulikKelistrikan`.
6. Untuk render MP4 jalankan `npm run build`.

## Mengubah teks
Edit array `scenes` di `src/MainVideo.tsx`. Setiap objek mengatur eyebrow, title, sub, dan tag.

## Narasi
Starter ini belum menyertakan voice-over atau musik. Rekam narasi terpisah, lalu tambahkan audio sebagai komponen Remotion atau gabungkan saat proses editing akhir. Gunakan musik yang memang boleh dipakai untuk konten YouTube.
