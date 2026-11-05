# BIM Travel — Website PT BIM Tour & Travel

Website resmi **PT BIM Tour & Travel (BIM Umrah)** — biro perjalanan wisata dan penyelenggara Umrah dan Haji yang amanah dan profesional, berbasis di Tuban, Jawa Timur.

Dibangun dengan kesetaraan konten 100% terhadap [bimtravel.co.id](https://bimtravel.co.id/) (konten, section, alur, dan fungsi utama), dengan penyempurnaan visual menjadi lebih elegan dan profesional.

🌐 **Repositori:** https://github.com/appsheetindonesia/BIM-travel-umrah  
📂 **Branch:** `main`

---

## Konten yang Tersedia (Sesuai Sumber)

Semua konten diekstrak langsung dari situs referensi:

| Section | Isi |
|---------|-----|
| **Hero** | Judul "PT BIM Tour & Travel", tagline "Sahabat Menuju Baitullah", 2 CTA (Konsultasi Sekarang / Lihat Paket Umrah) |
| **Countdown Pemberangkatan** | Status jadwal keberangkatan selanjutnya (kosong → menampilkan status "jadwal sedang disiapkan", karena data paket 2023–2024 adalah historis dan tidak boleh dipublikasikan sebagai penawaran aktif) |
| **Profil & Visi–Misi** | Visi lengkap + 4 misi asli PT BIM Tour & Travel |
| **Layanan Umrah & Haji Plus** | 2 kartu layanan dengan deskripsi lengkap |
| **Keunggulan BIM Umrah** | Pasti Berangkat · Umrah 3X · Pesawat Premium |
| **Mitra** | 4 logo mitra resmi (BIM, KK-BIM, BIM Mart, Ayu) |
| **Tahapan Umrah** | 6 tahapan: Pendaftaran Umrah → Pendaftaran Imigrasi → Manasik → Berangkat ke Tanah Suci → Beribadah Umrah → Pulang ke Tanah Air |
| **Paket Umrah** | Empty state profesional + Arsip Paket (6 baris data historis 2023–2024, ditandai bukan penawaran aktif) |
| **Galeri** | 18 foto asli dengan lightbox |
| **Playlist Video** | 5 video dokumentasi resmi dari YouTube (click-to-load embed) |
| **Berita** | Empty state (sumber tidak memiliki artikel dipublikasikan) |
| **Kontak** | Alamat asli: Jl. Penambangan 03, Semanding, Tuban, Jawa Timur (62381) + peta embed |
| **Footer** | Quick links, layanan, sosial resmi (Instagram & TikTok @pt.bimtourandtravel) |

---

## Design System

Desain mengikuti arahan **UIRD (User Interface Requirements Document)**:

| Token | Nilai | Penggunaan |
|-------|-------|------------|
| `color-primary` | `#123D36` (Deep Emerald) | Header, CTA utama, identitas |
| `color-accent` | `#C6A66A` (Muted Champagne) | Aksen, garis, detail premium |
| `color-background` | `#FAF8F3` (Warm Ivory) | Latar halaman |
| `color-surface` | `#FFFFFF` | Kartu dan panel |
| `color-text` | `#202826` (Charcoal) | Teks utama |
| `color-muted` | `#68736F` | Teks sekunder |
| `color-border` | `#E7E4DC` | Border dan pemisah |

**Tipografi:** Fraunces (display serif) + Plus Jakarta Sans (UI/body)

**Konsep visual:** Premium Islamic travel — tenang, terpercaya, hangat, bersih, dan berkelas. Komposisi editorial dengan ruang putih yang memadai. Tanpa ornamen berlebihan, efek glossy, atau animasi mengganggu.

---

## Fitur Interaksi

- **Header gelas** saat scroll (backdrop blur)
- **Drawer navigasi mobile** (buka/tutup via hamburger, klik link, Escape)
- **Scrollspy** — highlight navigasi sesuai section yang dilihat
- **Reveal-on-scroll** — animasi muncul saat section masuk viewport
- **Lightbox galeri** — perbesar foto, navigasi kiri-kanan, tutup dengan Escape
- **Video click-to-load** — YouTube embed hanya dimuat saat tombol play diklik (privacy-enhanced mode)
- **Countdown pemberangkatan** — siap diisi tanggal aktif melalui variabel `NEXT_DEPARTURE` di `main.js`
- **Aksesibilitas:** skip link, `:focus-visible`, `prefers-reduced-motion`, alt text semua gambar, JSON-LD TravelAgency, Open Graph

---

## Struktur File

```
website/
├── index.html                    # Halaman utama (12 section)
├── kebijakan-privasi.html        # Halaman legal
├── ketentuan-penggunaan.html     # Halaman legal
├── robots.txt                    # Crawler policy
├── sitemap.xml                   # SEO index
├── README.md                     # Dokumentasi ini
└── assets/
    ├── css/
    │   └── style.css             # Design system lengkap
    ├── js/
    │   └── main.js               # Interaksi: header, drawer, scrollspy, reveal, countdown, lightbox, video embed
    └── img/
        ├── brand/                # Logo, favicon, hero
        ├── gallery/              # 18 foto asli (bim-gal-01 s.d. bim-gal-18.jpg)
        ├── partners/             # 4 logo mitra
        └── videos/               # 5 thumbnail video
```

41 file secara keseluruhan.

---

## Teknologi

- **Frontend:** HTML5 + CSS3 + Vanilla JavaScript (tidak bergantung framework)
- **Styling:** CSS custom properties (design tokens), Flexbox/Grid, responsive breakpoints
- **Font:** Fraunces & Plus Jakarta Sans (via Google Fonts)
- **Ikon:** SVG inline (line-art, ringan)
- **Media:** YouTube-nocookie embed, Google Maps iframe
- **Hosting:** Siap di-deploy ke Vercel, Netlify, GitHub Pages, atau hosting statis lainnya

---

## Deployment

Karena ini situs statis, Anda bisa langsung meng-deploy:

### Vercel
```bash
# Push ke GitHub, lalu impor repositori di vercel.com
```

### Netlify
```bash
# Drag & drop folder website/ ke netlify.com, atau hubungkan GitHub
```

### GitHub Pages
```bash
# Aktifkan GitHub Pages di Settings → Pages → Branch: main
# Situs akan tersedia di: https://appsheetindonesia.github.io/BIM-travel-umrah/
```

---

## Catatan Validasi Konten (Penting)

1. **Telepon & email tidak disalin** — Situs sumber hanya menampilkan placeholder Elementor (`info@example.com`, `+1 859...`). Karena tidak terverifikasi, kontak telepon/email palsu **tidak ada** di website ini. Silakan isi melalui CMS atau edit langsung di `index.html` bagian Kontak.
2. **Data paket 2023–2024 adalah historis** — Ditampilkan di bagian **Arsip Paket** sebagai dokumentasi program yang pernah terselenggara. **Bukan penawaran aktif.** Untuk jadwal & harga terkini, konsultasi langsung ke tim BIM Travel.
3. **Media sosial resmi** hanya Instagram dan TikTok (@pt.bimtourandtravel) yang terverifikasi dari situs sumber.
4. **Izinhak penggunaan** logo, foto, dan video harus dikonfirmasi kepada PT BIM Tour & Travel sebelum produksi.

---

## Dokumen Persyaratan

Proyek ini didasarkan pada 9 dokumen requirements:

1. Market Requirements Document (MRD).md
2. Customer Requirements Document (CRD).md
3. Business Requirements Document (BRD).md
4. Product Requirements Document (PRD) 18 Section.md
5. User Interface Requirements Document (UIRD).md
6. Functional Requirements Document (FRD).md
7. Technical Requirements Document (TRD).md
8. Quality Requirements Document (QRD).md
9. Software Requirements Specification (SRS).md

Urutan penggunaan: MRD → CRD → BRD → PRD → UIRD → FRD → TRD → QRD → SRS.

---

## Lisensi

Semua hak cipta konten (logo, foto, video, teks) milik PT BIM Tour & Travel atau pemegang hak terkait. Kode website (HTML/CSS/JS) disediakan untuk keperluan pengembangan website resmi perusahaan.

---

**Dibangun 5 November 2026** · Dibuat untuk PT BIM Tour & Travel · [https://github.com/appsheetindonesia/BIM-travel-umrah](https://github.com/appsheetindonesia/BIM-travel-umrah)
