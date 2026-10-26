/**
 * @license
 * FAZZA FOOD - Integrasi Format Pesan WhatsApp
 * 
 * Menghasilkan teks pesan WhatsApp yang rapi, profesional, dan mudah dibaca
 * oleh admin katering untuk memproses pesanan pelanggan.
 */

import { Order, AppConfig } from '../types';

/**
 * Format angka ke format mata uang Rupiah
 */
const formatRp = (num: number): string => 'Rp' + num.toLocaleString('id-ID');

/**
 * Memformat nomor WhatsApp ke standar internasional tanpa tanda '+' atau spasi
 * Contoh input: '081234567890' -> output: '6281234567890'
 */
export const sanitizeWhatsAppNumber = (phone: string): string => {
  if (!phone) return '';
  let cleaned = phone.replace(/\D/g, ''); // Hapus semua karakter non-angka
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '628' + cleaned.slice(1);
  }
  return cleaned;
};

/**
 * Membentuk teks lengkap rincian pesanan untuk dikirimkan via WhatsApp
 */
export const generateWhatsAppMessage = (order: Order, config: AppConfig): string => {
  const deliveryArea = config.deliveryAreas.find(
    (a) => a.id === order.customer.deliveryAreaId
  );
  const areaName = deliveryArea ? deliveryArea.name : 'Area Khusus / Dalam Kota';

  // Format tanggal ramah bahasa Indonesia
  let formattedDate = order.customer.deliveryDate;
  try {
    const d = new Date(order.customer.deliveryDate + 'T00:00:00');
    formattedDate = d.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    // fallback
  }

  // Format daftar item pesanan
  const itemsText = order.items
    .map((item, index) => {
      const variantText = item.selectedVariant ? ` (${item.selectedVariant})` : '';
      const noteText = item.note ? `\n   📝 Catatan: "${item.note}"` : '';
      return `${index + 1}. *${item.name}${variantText}*\n   ${item.quantity} porsi x ${formatRp(item.price)} = *${formatRp(item.price * item.quantity)}*${noteText}`;
    })
    .join('\n\n');

  // Terjemahan metode pembayaran
  const paymentLabels: Record<string, string> = {
    transfer: 'Transfer Bank (BCA / Mandiri / BRI)',
    qris: 'QRIS (Semua E-Wallet & Mobile Banking)',
    cod: 'Tunai saat Pengantaran / Pengambilan',
  };

  const deliveryMethodText =
    order.customer.deliveryMethod === 'delivery'
      ? '🚗 Pengantaran ke Lokasi'
      : '🏪 Ambil Sendiri di Dapur FAZZA FOOD';

  // Susunan pesan rapi
  const message = `Halo *${config.businessName}*, saya ingin memesan katering dengan rincian berikut:

📋 *RINCIAN PESANAN*
Nomor Pesanan: *#${order.orderNumber}*
Tanggal Order: ${new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB

🍱 *MENU YANG DIPILIH:*
${itemsText}

💰 *RINGKASAN BIAYA:*
• Subtotal: ${formatRp(order.subtotal)}
• Ongkos Kirim (${order.customer.deliveryMethod === 'delivery' ? areaName : 'Ambil Sendiri'}): ${order.deliveryFee === 0 ? 'GRATIS' : formatRp(order.deliveryFee)}
${order.discount > 0 ? `• Diskon Promo (${order.promoCode}): -${formatRp(order.discount)}\n` : ''}• *TOTAL PEMBAYARAN: ${formatRp(order.total)}*

👤 *DATA PEMESAN & JADWAL:*
• Nama Lengkap: *${order.customer.fullName}*
• No. WhatsApp: ${order.customer.whatsapp}
• Jadwal Acara: *${formattedDate}*
• Waktu Pengiriman: *Pukul ${order.customer.deliveryTime} WIB*
• Jenis Acara: ${order.customer.eventType}
• Metode Layanan: ${deliveryMethodText}
${order.customer.deliveryMethod === 'delivery' ? `• Alamat Kirim: ${order.customer.address}\n• Patokan Lokasi: ${order.customer.landmark || '-'}` : ''}
• Metode Pembayaran: ${paymentLabels[order.customer.paymentMethod] || order.customer.paymentMethod}
${order.customer.specialNotes ? `• Catatan Khusus Acara: "${order.customer.specialNotes}"` : ''}

Mohon dicek ketersediaan jadwal dapur dan konfirmasi nomor rekening / QRIS pembayarannya. Terima kasih banyak! 🙏`;

  return message;
};

/**
 * Membuat tautan wa.me langsung
 */
export const createWhatsAppUrl = (phone: string, text: string): string => {
  const cleanPhone = sanitizeWhatsAppNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
};
