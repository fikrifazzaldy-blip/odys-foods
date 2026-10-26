/**
 * @license
 * FAZZA FOOD - Data Awal Produk, Paket, Testimoni & FAQ
 * 
 * PANDUAN PEMULA:
 * Seluruh data di bawah ini adalah data awal (default).
 * Anda bisa mengubah atau menambah data langsung dari Dashboard Admin,
 * dan perubahan akan tersimpan secara otomatis di peramban (localStorage).
 */

import { Product, CateringPackage } from './types';

// ==========================================
// DAFTAR PRODUK MENU
// ==========================================
export const INITIAL_PRODUCTS: Product[] = [
  // 1. Produk Wajib: Nasi Box Ayam Goreng
  {
    id: 'prod-ayam-goreng',
    name: 'Nasi Box Ayam Goreng Lengkuas',
    category: 'Nasi Box',
    price: 20000,
    minOrder: 5,
    shortDescription: 'Nasi putih pulen, ayam goreng bumbu rempah lengkuas renyah, tahu, tempe, sambal terasi & lalapan.',
    fullDescription: 'Paket nasi box favorit dengan ayam goreng ungkep bumbu kuning tradisional yang ditaburi remah lengkuas krispi gurih. Disajikan lengkap dengan nasi putih wangi, tahu tempe goreng, sambal terasi matang, lalapan segar, dan kerupuk.',
    ingredients: ['Beras pandan wangi', 'Ayam potong segar', 'Bumbu lengkuas rempah', 'Tahu & tempe', 'Sambal terasi', 'Timun & kemangi', 'Kerupuk'],
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    label: 'Terlaris',
    available: true,
    isFavorite: true,
    variants: [
      {
        title: 'Tingkat Kepedasan Sambal',
        options: ['Sedang (Standar)', 'Tidak Pedas', 'Ekstra Pedas (+Rp0)'],
      },
      {
        title: 'Pilihan Nasi',
        options: ['Nasi Putih Pulen', 'Nasi Uduk (+Rp2.000)', 'Nasi Kuning Wangi (+Rp3.000)'],
      },
    ],
  },

  // 2. Produk Wajib: Nasi Box Ayam Bakar
  {
    id: 'prod-ayam-bakar',
    name: 'Nasi Box Ayam Bakar Madu',
    category: 'Nasi Box',
    price: 23000,
    minOrder: 5,
    shortDescription: 'Ayam bakar manis gurih karamel madu, nasi pulen, urap sayur/lalapan, sambal bajak & kerupuk.',
    fullDescription: 'Daging ayam empuk dibumbui kecap manis gurih dan rempah rempah rahasia, dipanggang dengan olesan madu murni hingga terkaramelisasi harum. Dilengkapi sambal bajak khas Sunda dan sayuran segar.',
    ingredients: ['Ayam pejantan segar', 'Kecap manis pilihan', 'Madu murni', 'Bumbu marinasi khas', 'Lalap & Sambal bajak'],
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    label: 'Terlaris',
    available: true,
    isFavorite: true,
    variants: [
      {
        title: 'Tingkat Kepedasan Sambal',
        options: ['Sedang (Standar)', 'Manis Gurih (Tidak Pedas)', 'Pedas Nampol'],
      },
    ],
  },

  // 3. Produk Wajib: Nasi Box Ayam Geprek
  {
    id: 'prod-ayam-geprek',
    name: 'Nasi Box Ayam Geprek Sambal Bawang',
    category: 'Nasi Box',
    price: 18000,
    minOrder: 5,
    shortDescription: 'Ayam krispi renyah digeprek dengan cabai rawit pedas segar, nasi putih hangat & lalapan timun.',
    fullDescription: 'Ayam goreng tepung renyah bertekstur krispi yang digeprek langsung bersama racikan cabai rawit merah dan bawang putih siram minyak panas. Cocok untuk pecinta cita rasa pedas nampol.',
    ingredients: ['Dada/paha ayam filet krispi', 'Cabai rawit segar', 'Bawang putih & garam', 'Nasi putih', 'Irisan timun'],
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
    variants: [
      {
        title: 'Level Pedas',
        options: ['Level 1 (Sedang - 5 Cabai)', 'Level 2 (Pedas - 10 Cabai)', 'Level 3 (Ekstra Pedas - 15 Cabai)'],
      },
    ],
  },

  // 4. Produk Wajib: Nasi Box Lele Goreng
  {
    id: 'prod-lele-goreng',
    name: 'Nasi Box Lele Goreng Kremes',
    category: 'Nasi Box',
    price: 17000,
    minOrder: 5,
    shortDescription: 'Ikan lele segar renyah gurih disajikan dengan taburan kremesan kriuk, sambal terasi & lalapan.',
    fullDescription: 'Lele segar budidaya bersih diolah dengan bumbu rempah ketumbar dan kunyit, digoreng garing di luar namun tetap lembut di dalam. Dilengkapi kremesan renyah, lalap segar, dan sambal tomat terasi harum.',
    ingredients: ['Ikan lele segar pilihan', 'Kremesan renyah', 'Sambal tomat terasi', 'Nasi putih', 'Lalapan kubis & timun'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },

  // 5. Produk Wajib: Nasi Box Telur Balado
  {
    id: 'prod-telur-balado',
    name: 'Nasi Box Telur Balado Minang',
    category: 'Nasi Box',
    price: 15000,
    minOrder: 5,
    shortDescription: 'Telur rebus goreng dengan sambal balado merah khas Minang yang sedap, tumis buncis & nasi putih.',
    fullDescription: 'Pilihan hemat bernutrisi tinggi! Telur ayam rebus digoreng hingga berkulit lalu dilumuri sambal balado merah berminyak sedap. Dilengkapi dengan tumisan buncis wortel jagung manis serta kerupuk renyah.',
    ingredients: ['Telur ayam negeri grade A', 'Cabai merah balado', 'Tomat & bawang merah', 'Tumis buncis wortel', 'Nasi putih'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },

  // 6. Produk Wajib: Paket Prasmanan
  {
    id: 'prod-paket-prasmanan',
    name: 'Paket Prasmanan Nusantara Lengkap',
    category: 'Prasmanan',
    price: 35000,
    minOrder: 30,
    shortDescription: 'Sajian prasmanan elegan mulai Rp35.000/porsi: 2 lauk utama, 1 sayur, sup, pelengkap, buah potong & air.',
    fullDescription: 'Layanan prasmanan lengkap untuk resepsi pernikahan, syukuran akbar, atau gathering kantor. Sudah termasuk meja prasmanan, pemanas makanan (chafing dish), piring & sendok garpu, serta pelayan (waiter) profesional.',
    ingredients: ['Nasi putih / nasi goreng', 'Pilihan ayam (bakar/rica/rendang)', 'Pilihan daging sapi / ikan kakap', 'Sup kimlo / sup jagung sosis', 'Capcay / cah kailan', 'Kerupuk udang', 'Puding buah segar', 'Air mineral galon & cup'],
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    label: 'Terlaris',
    available: true,
    isFavorite: true,
  },

  // Produk Contoh Tambahan (Snack Box, Kue, Minuman)
  {
    id: 'prod-snack-box-a',
    name: 'Snack Box Komplit Gurih Manis',
    category: 'Snack Box',
    price: 12000,
    minOrder: 10,
    shortDescription: '1 Risoles ragout ayam, 1 lemper ayam bakar, 1 bolu kukus lembut, plus air mineral gelas.',
    fullDescription: 'Paket snack box ekonomis dan higienis yang disukai untuk seminar, rapat instansi, dan arisan. Kemasan kotak kardus laminasi bersih dilengkapi tisu dan tusuk gigi.',
    ingredients: ['Risoles ayam ragout', 'Lemper ayam ketan wangi', 'Bolu kukus pandan', 'Air mineral gelas 220ml'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    label: 'Terlaris',
    available: true,
    isFavorite: true,
  },
  {
    id: 'prod-snack-box-premium',
    name: 'Snack Box Premium Executive',
    category: 'Snack Box',
    price: 16000,
    minOrder: 10,
    shortDescription: 'Pastel ayam telur, pie buah segar, puding cokelat cup, kacang mete & air mineral botol mini.',
    fullDescription: 'Pilihan elegan untuk rapat direksi, tamu kehormatan, dan acara wisuda. Aneka kue berstandar hotel dengan bahan premium berkualitas.',
    ingredients: ['Pastel renyah telur ayam', 'Fruit pie vla vanilla', 'Puding sutra cokelat', 'Air mineral botol 330ml'],
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    label: 'Baru',
    available: true,
  },
  {
    id: 'prod-risoles-ragout',
    name: 'Risoles Ragout Ayam Daging (Isi 5 Pcs)',
    category: 'Snack Box',
    price: 22500,
    minOrder: 2,
    shortDescription: 'Kulit risoles renyah keemasan dengan isian krim ragout ayam, wortel, dan daging sapi lezat.',
    fullDescription: 'Camilan legendaris kesukaan semua orang. Kulit lembut dibalut tepung roti renyah, saat digigit lumer dengan keju dan ragout susu lezat. Diberi cabai rawit hijau segar.',
    ingredients: ['Daging ayam cincang', 'Wortel & buncis', 'Susu murni & keju', 'Tepung panir jepang', 'Cabai rawit segar'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },
  {
    id: 'prod-lemper-ayam',
    name: 'Lemper Bakar Ayam Gurih (Isi 5 Pcs)',
    category: 'Kue',
    price: 20000,
    minOrder: 2,
    shortDescription: 'Beras ketan putih pulen dimasak santan kelapa asli dengan isian ayam suwir bumbu opor harum.',
    fullDescription: 'Dibuat tradisional dengan daun pisang alami yang dibakar sebentar sehingga mengeluarkan aroma wangi khas. Isian ayam melimpah dan tidak pelit bumbu.',
    ingredients: ['Ketan putih pilihan', 'Santan kelapa murni', 'Ayam suwir rempah', 'Daun pisang segar'],
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },
  {
    id: 'prod-fudgy-brownies',
    name: 'Fudgy Brownies Panggang Almond (Uk. 20x10)',
    category: 'Kue',
    price: 45000,
    minOrder: 1,
    shortDescription: 'Brownies cokelat murni dengan permukaan shiny crust renyah dan tekstur lumer legit di dalam.',
    fullDescription: 'Dibuat dari cokelat couverture hitam berkualitas dan mentega wisman asli. Taburan almond slice dan chocochips berlimpah menambah kemewahan rasa.',
    ingredients: ['Dark chocolate murni', 'Butter impor', 'Gula tebu', 'Kacang almond renyah', 'Chocochips'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    label: 'Baru',
    available: true,
  },
  {
    id: 'prod-nastar-butter',
    name: 'Nastar Wisman Lumer Spesial (Toples 250gr)',
    category: 'Kue',
    price: 55000,
    minOrder: 1,
    shortDescription: 'Kue nastar mentega lumer di mulut dengan selai nanas asli buatan sendiri yang wangi kayu manis.',
    fullDescription: 'Kue kering klasik istimewa dengan aroma butter harum memikat. Selai nanas dimasak perlahan hingga legit tanpa pengawet. Cocok untuk bingkisan maupun hidangan hari raya.',
    ingredients: ['Mentega Wisman', 'Kuning telur', 'Tepung terigu protein rendah', 'Selai nanas madu alami', 'Cengkeh & kayu manis'],
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },
  {
    id: 'prod-es-teh-melati',
    name: 'Es Teh Manis Melati Jumbo (500ml)',
    category: 'Minuman',
    price: 5000,
    minOrder: 5,
    shortDescription: 'Seduhan daun teh melati wangi alami dingin dengan gula tebu asli. Segar dan melegakan tenggorokan.',
    fullDescription: 'Diseduh fresh setiap pagi dari racikan 3 jenis daun teh lokal pilihan menghasilkan cita rasa sepet-manis-wangi (Wasgitel) yang sempurna untuk mendampingi makan siang katering.',
    ingredients: ['Daun teh melati pilihan', 'Gula pasir tebu murni', 'Air mineral higienis', 'Es kristal food-grade'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },
  {
    id: 'prod-es-jeruk-peras',
    name: 'Es Jeruk Peras Murni (500ml)',
    category: 'Minuman',
    price: 8000,
    minOrder: 5,
    shortDescription: '100% air perasan jeruk lokal matang segar kaya vitamin C dengan sedikit gula tebu alami.',
    fullDescription: 'Segarnya bulir jeruk peras alami tanpa sirup buatan dan tanpa pewarna. Sangat cocok disajikan dingin untuk menyegarkan acara santai maupun formal.',
    ingredients: ['Jeruk peras manis segar', 'Gula tebu cair', 'Es batu kristal higienis'],
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
    label: 'Tersedia',
    available: true,
  },
];

// ==========================================
// 7 PAKET KATERING LENGKAP
// ==========================================
export const INITIAL_PACKAGES: CateringPackage[] = [
  // 1. Katering Harian
  {
    id: 'pkg-katering-harian',
    name: 'Paket Katering Harian',
    tag: 'Langganan Kantor & Keluarga',
    description: 'Solusi makan siang harian tanpa repot dengan menu bervariasi setiap hari selama Senin-Jumat.',
    items: [
      'Menu berganti setiap hari (tidak membosankan)',
      '1 Lauk utama (Ayam/Daging/Ikan)',
      '1 Lauk pendamping (Tahu/Tempe/Bakwan/Perkedel)',
      '1 Sayur segar (Sop/Tumis/Lodeh/Sayur Asem)',
      'Nasi putih pulen porsi kenyang',
      'Sambal sedap & kerupuk renyah',
      'Gratis biaya antar khusus langganan bulanan',
    ],
    pricePerPortion: 22000,
    minPortion: 5,
    available: true,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },

  // 2. Nasi Box Acara
  {
    id: 'pkg-nasi-box-acara',
    name: 'Paket Nasi Box Acara & Syukuran',
    tag: 'Praktis & Higienis',
    description: 'Kemasan box eksklusif rapi bersegel, sangat cocok untuk tasyakuran, arisan, dan syukuran rumah baru.',
    items: [
      'Box tebal higienis berlaminasi food-grade',
      'Nasi putih / nasi uduk / nasi kuning',
      'Ayam goreng kremes atau ayam bakar madu',
      'Sambal goreng ati kentang / telur balado',
      'Mie goreng kecap gurih / bihun sayur',
      'Krupuk udang, sambal & sendok tisu set',
      'Air mineral gelas higienis',
    ],
    pricePerPortion: 25000,
    minPortion: 15,
    available: true,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
  },

  // 3. Rapat Kantor
  {
    id: 'pkg-rapat-kantor',
    name: 'Paket Rapat Kantor Eksekutif',
    tag: 'Formal & Profesional',
    description: 'Format bento box bersekat elegan, rapi tanpa tumpah, menjaga kenyamanan para peserta rapat penting.',
    items: [
      'Bento box sekat 5 dengan tutup bening premium',
      'Nasi wangi pandan / nasi liwet',
      'Daging sapi lada hitam / ayam bistik mentega',
      'Tumis brokoli wortel jamur shiitake',
      'Rolade daging sapi / udang krispi mayones',
      'Puding buah lembut dalam cup',
      'Alat makan premium & air mineral botol 330ml',
    ],
    pricePerPortion: 32000,
    minPortion: 10,
    available: true,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
  },

  // 4. Ulang Tahun
  {
    id: 'pkg-ulang-tahun',
    name: 'Paket Ulang Tahun & Perayaan',
    tag: 'Meriah & Menggugah Selera',
    description: 'Sajian meriah tumpeng mini personal atau box tematik ceria untuk ulang tahun anak dan dewasa.',
    items: [
      'Kemasan mika bulat tumpeng mini dengan stiker ucapan',
      'Nasi kuning gurih bentuk kerucut imut',
      'Ayam suwir pedas manis atau nuget ayam krispi',
      'Perkedel kentang lembut & abon sapi manis',
      'Telur dadar rawis & kering tempe kacang',
      'Puding rainbow / bolu karakter mini',
      'Stiker ucapan nama kustom gratis',
    ],
    pricePerPortion: 28000,
    minPortion: 20,
    available: true,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },

  // 5. Pernikahan / Prasmanan (Paling Dipilih)
  {
    id: 'pkg-pernikahan-prasmanan',
    name: 'Paket Pernikahan & Prasmanan Agung',
    tag: 'Paling Dipilih',
    description: 'Layanan prasmanan bintang lima lengkap dengan peralatan chafing dish, dekorasi meja buffet, dan waiter ramah.',
    items: [
      'Lengkap perlengkapan meja prasmanan & penghangat makanan',
      'Piring porselen putih, sendok, garpu & gelas kaca',
      'Waiter berseragam rapi untuk melayani tamu',
      '2 Pilihan lauk utama (Rendang sapi + Ayam panggang)',
      '1 Pilihan lauk seafood (Ikan gurame asam manis / kakap filet)',
      'Sup pengantin kimlo & salad sayur / asinan buah',
      'Aneka puding, buah potong segar & es campur/doger',
      'Air mineral galon dingin & teh manis hangat',
    ],
    pricePerPortion: 42000,
    minPortion: 50,
    available: true,
    isPopular: true, // Paling dipilih
    image: 'https://images.unsplash.com/photo-1519225438550-4536d0dc66c4?auto=format&fit=crop&w=800&q=80',
  },

  // 6. Acara Keluarga
  {
    id: 'pkg-acara-keluarga',
    name: 'Paket Acara Keluarga & Arisan',
    tag: 'Hangat & Akrab',
    description: 'Porsi melimpah dengan cita rasa rumahan otentik yang bikin kangen dan mencairkan suasana kebersamaan.',
    items: [
      'Wadah box besar atau baki saji higienis',
      'Nasi putih pulen / nasi liwet daun pisang',
      'Ayam kalasan bakar madu / rendang daging sapi empuk',
      'Sayur lodeh nangka muda / sop daging iga rempah',
      'Tahu & tempe bacem legit',
      'Sambal bajak pedas nikmat & lalap segar melimpah',
      'Kerupuk gendar gurih',
    ],
    pricePerPortion: 27000,
    minPortion: 15,
    available: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },

  // 7. Pengajian
  {
    id: 'pkg-pengajian',
    name: 'Paket Pengajian & Tasyakuran',
    tag: 'Berkah & Praktis',
    description: 'Sajian nasi berkat lezat, bersih, dan mudah dibawa pulang oleh para jamaah pengajian.',
    items: [
      'Box nasi berselubung plastik rapi & mudah dijinjing',
      'Nasi kebuli gurih atau nasi uduk harum rempah',
      'Ayam goreng bumbu lengkuas atau semur daging sapi',
      'Sambal goreng krecek tahu pedas manis',
      'Acar kuning segar wortel mentimun',
      'Kerupuk udang & sambal sachet higienis',
      'Bonus 1 buah kue tradisional manis (lemper/nagasari)',
    ],
    pricePerPortion: 24000,
    minPortion: 20,
    available: true,
    image: 'https://images.unsplash.com/photo-1505253758473-96b3015f210f?auto=format&fit=crop&w=800&q=80',
  },
];

// ==========================================
// TESTIMONI CONTOH (LABEL DEMO JELAS)
// ==========================================
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  event: string;
}

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Ibu Ratna Dewi',
    role: 'Penyelenggara Arisan Keluarga',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Pesan 60 box Nasi Ayam Bakar Madu untuk arisan keluarga besar. Semuanya memuji makanannya sangat empuk, bumbunya meresap sampai ke tulang, dan kotaknya rapi sekali. Pengantaran juga tepat 45 menit sebelum acara dimulai.',
    event: 'Contoh testimoni (demo)',
  },
  {
    id: 'testi-2',
    name: 'Bapak Hendra Pratama',
    role: 'HR Officer Perusahaan Teknologi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Sudah 3 bulan kantor kami berlangganan katering harian dan nasi box rapat di FAZZA FOOD. Menunya tidak pernah bikin bosan, porsinya pas mengenyangkan, dan tim adminnya sangat responsif di WhatsApp.',
    event: 'Contoh testimoni (demo)',
  },
  {
    id: 'testi-3',
    name: 'Siti Rahmawati, S.Pd',
    role: 'Koordinator Pengajian Majelis Ta’lim',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Paket Nasi Pengajian sangat praktis dan higienis. Rasanya enak seperti masakan ibu sendiri di rumah. Terima kasih FAZZA FOOD sudah membantu kelancaran acara syukuran kami!',
    event: 'Contoh testimoni (demo)',
  },
  {
    id: 'testi-4',
    name: 'Dimas Wicaksono',
    role: 'Penyelenggara Acara Ulang Tahun',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Tumpeng mini ulang tahunnya imut banget, anak-anak dan tamu suka! Brownies panggangnya juga juara, legit cokelatnya terasa premium. Pasti order lagi untuk acara berikutnya.',
    event: 'Contoh testimoni (demo)',
  },
];

// ==========================================
// FAQ ACCORDION (PERTANYAAN UMUM)
// ==========================================
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'Berapa jumlah minimal pemesanan untuk nasi box dan paket katering?',
    answer: 'Untuk menu Nasi Box satuan, minimal pemesanan adalah 5 porsi per varian. Untuk Snack Box minimal 10 porsi, dan untuk Paket Prasmanan prasmanan lengkap minimal 30 hingga 50 porsi tergantung paket yang dipilih.',
  },
  {
    question: 'Berapa batas waktu pemesanan sebelum hari acara?',
    answer: 'Kami menerapkan batas minimal pemesanan H-2 (2 hari sebelum tanggal acara) untuk menjaga kesegaran bahan dan penjadwalan dapur yang rapi. Untuk pemesanan mendesak (H-1), silakan chat admin WhatsApp langsung untuk mengecek ketersediaan slot dapur.',
  },
  {
    question: 'Bagaimana dengan area pengantaran dan perhitungan ongkos kirim?',
    answer: 'Kami melayani pengantaran dari dapur kami di Karanggintung RT 3 RW 4 ke seluruh wilayah Gandrungmangu, Bantarsari, Sidareja, Karangpucung, hingga Cilacap kota dan sekitarnya. Tarif ongkos kirim mulai dari Rp8.000 untuk radius terdekat, dan pesanan total di atas Rp500.000 otomatis mendapatkan GRATIS ONGKIR.',
  },
  {
    question: 'Bagaimana metode pembayaran dan apakah perlu uang muka (DP)?',
    answer: 'Pembayaran dilakukan secara manual setelah admin kami mengonfirmasi pesanan Anda via WhatsApp. Untuk pesanan acara, uang muka (DP) sebesar 50% dibayarkan via Transfer Bank atau QRIS resmi, dan pelunasan dilakukan H-1 atau saat pesanan tiba.',
  },
  {
    question: 'Apakah bisa mengubah jumlah porsi atau menu setelah memesan?',
    answer: 'Perubahan jumlah porsi atau pilihan menu dapat dilakukan maksimal H-2 sebelum pukul 15.00 WIB dengan menginformasikan nomor pesanan kepada admin via WhatsApp.',
  },
  {
    question: 'Apakah bisa meminta menu khusus (rendah garam, tanpa santan, atau tidak pedas)?',
    answer: 'Tentu saja! Kami sangat memperhatikan preferensi Anda. Anda dapat menuliskan catatan khusus saat checkout (misal: "tidak pedas sama sekali", "pisahkan sambal", "tanpa kacang", dll.) atau konsultasi gratis dengan admin.',
  },
];

// ==========================================
// GALERI FOTO UNTUK TENTANG KAMI / LIGHTBOX
// ==========================================
export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Dapur Higienis',
    caption: 'Proses pengolahan bahan higienis dengan standar kebersihan ketat',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-2',
    title: 'Bahan Segar Pilihan',
    caption: 'Bumbu rempah dan sayuran dipetik segar setiap subuh',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-3',
    title: 'Packaging Eksklusif',
    caption: 'Pengemasan rapi bersegel anti tumpah dan higienis',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-4',
    title: 'Sajian Prasmanan Mewah',
    caption: 'Dekorasi buffet hangat untuk resepsi dan syukuran',
    image: 'https://images.unsplash.com/photo-1519225438550-4536d0dc66c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-5',
    title: 'Kudapan Snack Box',
    caption: 'Kue basah tradisional dan pastry renyah segar dari oven',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-6',
    title: 'Pengantaran Tepat Waktu',
    caption: 'Armada pengantaran berpengalaman memastikan pesanan tiba hangat',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=800&q=80',
  },
];
