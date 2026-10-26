/**
 * @license
 * FAZZA FOOD - Definisi Tipe TypeScript
 * File ini mendefinisikan seluruh struktur data yang digunakan di aplikasi FAZZA FOOD.
 */

// Kategori menu yang didukung
export type ProductCategory = 'Semua' | 'Nasi Box' | 'Snack Box' | 'Kue' | 'Minuman' | 'Prasmanan';

// Label/badge status produk
export type ProductLabel = 'Terlaris' | 'Baru' | 'Tersedia' | 'Habis';

// Varian opsional pada produk (misal: tingkat pedas, pilihan nasi)
export interface ProductVariant {
  title: string;
  options: string[];
}

// Data Produk Menu
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  minOrder: number;
  shortDescription: string;
  fullDescription: string;
  ingredients: string[];
  image: string;
  label: ProductLabel;
  available: boolean;
  isFavorite?: boolean;
  variants?: ProductVariant[];
}

// Data Paket Katering
export interface CateringPackage {
  id: string;
  name: string;
  tag: string;
  description: string;
  items: string[];
  pricePerPortion: number;
  minPortion: number;
  available: boolean;
  isPopular?: boolean;
  image: string;
}

// Item di dalam keranjang belanja
export interface CartItem {
  id: string; // unique cart item id (productId + variant)
  productId: string;
  itemType: 'product' | 'package';
  name: string;
  price: number;
  quantity: number;
  minOrder: number;
  image: string;
  note?: string;
  selectedVariant?: string;
}

// Status Pemesanan
export type OrderStatus =
  | 'Menunggu Konfirmasi'
  | 'Dikonfirmasi'
  | 'Diproses'
  | 'Dikirim'
  | 'Selesai'
  | 'Dibatalkan';

// Data Pemesan & Pengiriman
export interface CustomerData {
  fullName: string;
  whatsapp: string;
  deliveryMethod: 'delivery' | 'pickup';
  address: string;
  landmark?: string;
  deliveryAreaId: string;
  deliveryDate: string; // Format YYYY-MM-DD
  deliveryTime: string; // Format HH:mm
  eventType: string;
  specialNotes?: string;
  paymentMethod: 'transfer' | 'qris' | 'cod';
}

// Data Pesanan Lengkap
export interface Order {
  id: string;
  orderNumber: string; // Misal: FZ-20261026-001
  createdAt: string; // ISO String
  customer: CustomerData;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  total: number;
  status: OrderStatus;
}

// Area Pengiriman & Tarif Ongkir
export interface DeliveryArea {
  id: string;
  name: string;
  fee: number;
  estimate: string;
}

// Kode Promo
export interface PromoCode {
  code: string;
  discountPercent: number; // Misal 10 untuk 10%
  maxDiscount: number; // Maksimal potongan dalam Rupiah
  minSpend: number; // Minimal belanja untuk menggunakan promo
  active: boolean;
}

// Konfigurasi Bisnis
export interface AppConfig {
  businessName: string;
  tagline: string;
  whatsappNumber: string; // Format internasional tanpa simbol: 6281234567890
  email: string;
  address: string;
  city: string;
  operatingHours: {
    open: string; // misal "08:00"
    close: string; // misal "18:00"
    daysDescription: string; // "Senin - Sabtu (Minggu khusus pesanan terjadwal)"
  };
  social: {
    instagram: string;
    facebook: string;
  };
  about: {
    story: string;
    highlights: string[];
  };
  deliveryAreas: DeliveryArea[];
  freeShippingThreshold: number; // Gratis ongkir jika belanja mencapai nominal ini
  promoCodes: PromoCode[];
  minOrderDays: number; // Batas minimal hari pemesanan (misal 2 untuk H-2)
  blackoutDates: string[]; // Tanggal libur/sudah penuh (YYYY-MM-DD)
  demoAdminPin: string; // PIN akses dashboard demo (default: 1234)
}

// Tipe untuk Filter Menu
export interface MenuFilters {
  category: ProductCategory;
  searchQuery: string;
  priceRange: 'all' | 'under20' | '20to30' | 'above30';
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'name-asc';
}
