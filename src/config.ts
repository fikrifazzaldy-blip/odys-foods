/**
 * @license
 * FAZZA FOOD - Konfigurasi Utama Bisnis
 * 
 * PANDUAN PEMULA:
 * Anda dapat mengubah pengaturan bisnis di file ini, atau mengubahnya langsung
 * melalui Dashboard Admin di website tanpa perlu mengedit kode!
 */

import { AppConfig } from './types';

export const DEFAULT_CONFIG: AppConfig = {
  // Nama usaha & slogan
  businessName: 'FAZZA FOOD',
  tagline: 'Katering Lezat, Higienis & Tepat Waktu untuk Setiap Momen Spesial',

  // Nomor WhatsApp Resmi Bisnis
  // CATATAN PENTING:
  // Format nomor diawali 62 tanpa tanda tambah (+), spasi, atau tanda strip.
  // Contoh: '6281234567890'.
  // Jika dikosongkan (''), sistem akan mengingatkan bahwa nomor belum diatur.
  whatsappNumber: '6281234567890',

  // Email resmi (opsional)
  email: 'kontak@fazzafood.id',

  // Alamat dapur & lokasi layanan (bisa diedit di dashboard)
  address: 'Karanggintung RT 3 RW 4, Gandrungmangu',
  city: 'Cilacap, Jawa Tengah',

  // Jam Operasional Dapur & Layanan Pelanggan
  operatingHours: {
    open: '07:00',
    close: '20:00',
    daysDescription: 'Senin - Sabtu (07:00 - 20:00 WIB), Minggu (Khusus Pesanan Acara)',
  },

  // Tautan Media Sosial
  social: {
    instagram: 'fazzafood.catering',
    facebook: 'fazzafood.official',
  },

  // Profil & Kisah Singkat Usaha
  about: {
    story: 'FAZZA FOOD berlokasi di Karanggintung, Gandrungmangu, Cilacap. Bermula dari dapur keluarga dengan cinta mendalam terhadap masakan Nusantara yang autentik, bersih, gurih, dan memuaskan. Kami melayani kebutuhan katering harian, nasi box syukuran, rapat, hingga resepsi pernikahan di seluruh wilayah Gandrungmangu, Cilacap dan sekitarnya.',
    highlights: [
      'Bahan Segar Setiap Hari: Belanja langsung sayuran dan lauk segar pilihan setiap subuh tanpa bahan pengawet.',
      'Dapur Bersih & Higienis: Standar pengolahan higienis oleh koki berpengalaman dengan peralatan masak bersih.',
      'Pengantaran Tepat Waktu: Armada siap antar tepat sebelum acara dimulai dalam kemasan rapi bersegel hangat.',
      'Rasa Gurih Lezat & Harga Terjangkau: Porsi kenyang dengan cita rasa bumbu rempah khas Nusantara yang mantap.'
    ],
  },

  // Wilayah Pengiriman & Tarif Ongkir
  deliveryAreas: [
    { id: 'area-1', name: 'Gandrungmangu & Sekitarnya (0 - 5 km)', fee: 8000, estimate: '15-25 menit' },
    { id: 'area-2', name: 'Kecamatan Sekitar (Bantarsari, Sidareja, Karangpucung)', fee: 18000, estimate: '25-45 menit' },
    { id: 'area-3', name: 'Area Cilacap Kota / Jeruklegi / Kesugihan', fee: 30000, estimate: '45-60 menit' },
    { id: 'area-4', name: 'Area Khusus / Luar Wilayah (> 35 km)', fee: 45000, estimate: '60-80 menit' },
  ],

  // Belanja di atas nominal ini akan otomatis GRATIS ONGKIR
  freeShippingThreshold: 500000, // Rp 500.000

  // Daftar Kode Promo Aktif
  promoCodes: [
    {
      code: 'FAZZA10',
      discountPercent: 10,
      maxDiscount: 50000,
      minSpend: 150000,
      active: true,
    },
    {
      code: 'HEMAT5',
      discountPercent: 5,
      maxDiscount: 25000,
      minSpend: 100000,
      active: true,
    },
  ],

  // Batas minimal hari pemesanan (H-2 artinya minimal pesan 2 hari sebelum acara)
  minOrderDays: 2,

  // Tanggal libur atau tanggal dapur sudah penuh (format YYYY-MM-DD)
  blackoutDates: [],

  // PIN masuk admin mode demo (bisa diubah pemilik)
  demoAdminPin: '1234',
};
