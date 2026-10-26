/**
 * @license
 * FAZZA FOOD - Komponen Formulir Checkout 3 Langkah
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerData, Order } from '../types';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  CreditCard,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import { sanitizeWhatsAppNumber } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    discountAmount,
    appliedPromo,
    config,
    createOrder,
    formatRupiah,
    getMinOrderDate,
  } = useStore();

  // Step 1: Ringkasan, Step 2: Form Data, Step 3: Tinjau & Kirim
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<CustomerData>({
    fullName: '',
    whatsapp: '',
    deliveryMethod: 'delivery',
    address: '',
    landmark: '',
    deliveryAreaId: config.deliveryAreas[0]?.id || 'area-1',
    deliveryDate: getMinOrderDate(),
    deliveryTime: '11:00',
    eventType: 'Rapat Kantor',
    specialNotes: '',
    paymentMethod: 'transfer',
  });

  // Error validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen || cart.length === 0) return null;

  // Hitung Ongkir
  const selectedArea = config.deliveryAreas.find((a) => a.id === formData.deliveryAreaId);
  const rawFee = selectedArea ? selectedArea.fee : 15000;
  const isFreeDelivery = cartSubtotal >= (config.freeShippingThreshold || 500000);
  const deliveryFee =
    formData.deliveryMethod === 'pickup' ? 0 : isFreeDelivery ? 0 : rawFee;

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Validasi Step 2
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Nama lengkap wajib diisi.';
    }

    if (!formData.whatsapp.trim()) {
      errs.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else {
      const cleanPhone = formData.whatsapp.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        errs.whatsapp = 'Nomor WhatsApp minimal 10 digit.';
      } else if (!cleanPhone.startsWith('08') && !cleanPhone.startsWith('628')) {
        errs.whatsapp = 'Gunakan format nomor Indonesia yang valid (08xx atau 628xx).';
      }
    }

    if (formData.deliveryMethod === 'delivery') {
      if (!formData.address.trim()) {
        errs.address = 'Alamat pengantaran lengkap wajib diisi.';
      }
    }

    if (!formData.deliveryDate) {
      errs.deliveryDate = 'Tanggal acara wajib dipilih.';
    } else {
      const minDate = getMinOrderDate();
      if (formData.deliveryDate < minDate) {
        errs.deliveryDate = `Minimal pemesanan adalah H-${config.minOrderDays || 2} (mulai ${minDate}).`;
      }
    }

    if (!formData.deliveryTime) {
      errs.deliveryTime = 'Jam pengiriman wajib ditentukan.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateForm()) {
        setCurrentStep(3);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
  };

  // Submit pesanan akhir
  const handleSubmitOrder = () => {
    const newOrder = createOrder({
      customer: formData,
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      promoCode: appliedPromo || undefined,
      total: grandTotal,
    });

    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[#FFF8F0] border-b border-orange-200/80 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-[#3B1F0E]">
              Pemesanan Katering
            </h3>
            <span className="text-xs text-stone-500">
              Langkah {currentStep} dari 3: {currentStep === 1 ? 'Ringkasan Menu' : currentStep === 2 ? 'Data Pemesan & Jadwal' : 'Konfirmasi Pesanan'}
            </span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-xl bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup form checkout"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar 3 Langkah */}
        <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex items-center justify-between text-xs font-bold">
          <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-[#EA580C]' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 1 ? 'bg-[#EA580C] text-white' : 'bg-stone-200'}`}>
              1
            </span>
            <span className="hidden sm:inline">Ringkasan</span>
          </div>
          <div className="h-0.5 w-12 bg-orange-200" />
          <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-[#EA580C]' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep >= 2 ? 'bg-[#EA580C] text-white' : 'bg-stone-200'}`}>
              2
            </span>
            <span className="hidden sm:inline">Data & Jadwal</span>
          </div>
          <div className="h-0.5 w-12 bg-orange-200" />
          <div className={`flex items-center gap-1.5 ${currentStep === 3 ? 'text-[#EA580C]' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === 3 ? 'bg-[#EA580C] text-white' : 'bg-stone-200'}`}>
              3
            </span>
            <span className="hidden sm:inline">Konfirmasi</span>
          </div>
        </div>

        {/* Isi Form Sesuai Langkah */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* ===================== LANGKAH 1: RINGKASAN ===================== */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200/70 text-xs text-[#3B1F0E] space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-[#EA580C]">
                  <CheckCircle2 className="w-4 h-4" />
                  Periksa kembali menu katering Anda:
                </span>
                <p className="text-stone-600">
                  Pastikan porsi dan varian yang dipilih sudah sesuai dengan kebutuhan acara.
                </p>
              </div>

              <div className="divide-y divide-orange-100 border border-orange-100 rounded-2xl overflow-hidden">
                {cart.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-[#3B1F0E]">{item.name}</h5>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#EA580C]">Varian: {item.selectedVariant}</span>
                        )}
                        <p className="text-stone-500">{item.quantity} porsi x {formatRupiah(item.price)}</p>
                        {item.note && <p className="italic text-stone-500 text-[10px]">Catatan: &quot;{item.note}&quot;</p>}
                      </div>
                    </div>
                    <span className="font-bold text-[#3B1F0E] shrink-0">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">{formatRupiah(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Diskon Promo ({appliedPromo}):</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-[#EA580C] pt-2 border-t border-orange-200">
                  <span>Total Sementara:</span>
                  <span>{formatRupiah(cartSubtotal - discountAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* ===================== LANGKAH 2: FORM DATA & JADWAL ===================== */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Nama & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5 text-[#EA580C]" />
                    Nama Lengkap Pemesan *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                      errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-orange-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5 text-[#EA580C]" />
                    No. WhatsApp Aktif *
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="Contoh: 081234567890"
                    className={`w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                      errors.whatsapp ? 'border-rose-500 bg-rose-50' : 'border-orange-200'
                    }`}
                  />
                  {errors.whatsapp && <p className="text-[11px] text-rose-600 mt-1">{errors.whatsapp}</p>}
                </div>
              </div>

              {/* Tanggal & Jam Pengiriman */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                    Tanggal Acara (Min. H-{config.minOrderDays || 2}) *
                  </label>
                  <input
                    type="date"
                    min={getMinOrderDate()}
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className={`w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                      errors.deliveryDate ? 'border-rose-500 bg-rose-50' : 'border-orange-200'
                    }`}
                  />
                  {errors.deliveryDate && <p className="text-[11px] text-rose-600 mt-1">{errors.deliveryDate}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
                    Waktu Tiba / Jam Pengiriman *
                  </label>
                  <input
                    type="time"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                    className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                  />
                </div>
              </div>

              {/* Pilihan Metode Pengantaran */}
              <div>
                <label className="text-xs font-bold text-[#3B1F0E] block mb-1.5">
                  Metode Layanan *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'delivery' })}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      formData.deliveryMethod === 'delivery'
                        ? 'border-[#EA580C] bg-orange-50 text-[#EA580C] ring-2 ring-orange-500/20'
                        : 'border-orange-200 bg-white text-stone-700'
                    }`}
                  >
                    <Truck className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">Pengantaran</span>
                      <span className="text-[10px] text-stone-500">Dikirim langsung ke lokasi</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryMethod: 'pickup' })}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      formData.deliveryMethod === 'pickup'
                        ? 'border-[#EA580C] bg-orange-50 text-[#EA580C] ring-2 ring-orange-500/20'
                        : 'border-orange-200 bg-white text-stone-700'
                    }`}
                  >
                    <Store className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold text-xs block">Ambil Sendiri</span>
                      <span className="text-[10px] text-stone-500">Ambil di dapur FAZZA FOOD</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Alamat & Area (jika delivery) */}
              {formData.deliveryMethod === 'delivery' && (
                <div className="space-y-3 p-4 bg-[#FFF8F0] rounded-2xl border border-orange-200">
                  <div>
                    <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                      Pilih Area Pengantaran (Ongkir) *
                    </label>
                    <select
                      value={formData.deliveryAreaId}
                      onChange={(e) => setFormData({ ...formData, deliveryAreaId: e.target.value })}
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                    >
                      {config.deliveryAreas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.name} — {isFreeDelivery ? 'GRATIS (Promo)' : formatRupiah(area.fee)} ({area.estimate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                      Alamat Lengkap Pengantaran *
                    </label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, gedung, lantai..."
                      className={`w-full bg-white px-3.5 py-2 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] ${
                        errors.address ? 'border-rose-500 bg-rose-50' : 'border-orange-200'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-600 block mb-1">
                      Patokan Lokasi (Opsional)
                    </label>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      placeholder="Contoh: Sebelah Indomaret, pagar warna hitam"
                      className="w-full bg-white px-3 py-2 rounded-xl border border-orange-200 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* Jenis Acara & Catatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
                    Jenis Acara
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                  >
                    <option value="Rapat Kantor">Rapat Kantor / Seminar</option>
                    <option value="Acara Keluarga / Arisan">Acara Keluarga / Arisan</option>
                    <option value="Pengajian / Tasyakuran">Pengajian / Tasyakuran</option>
                    <option value="Ulang Tahun">Ulang Tahun / Syukuran</option>
                    <option value="Pernikahan / Resepsi">Pernikahan / Resepsi</option>
                    <option value="Makan Siang Bersama">Makan Siang Bersama</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5 mb-1">
                    <CreditCard className="w-3.5 h-3.5 text-[#EA580C]" />
                    Pilihan Metode Pembayaran
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
                    className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-orange-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
                  >
                    <option value="transfer">Transfer Bank (BCA / Mandiri / BRI)</option>
                    <option value="qris">QRIS (Semua E-Wallet & Bank)</option>
                    <option value="cod">Tunai saat Pengantaran / Pengambilan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">
                  Catatan Khusus untuk Dapur (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="Contoh: Pisahkan sambal, sambal jangan terlalu pedas, dll."
                  className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* ===================== LANGKAH 3: TINJAU & KONFIRMASI ===================== */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {/* Pemberitahuan Tegas Tanpa Payment Gateway Palsu */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold block mb-0.5">Informasi Pembayaran:</span>
                  Tidak ada pembayaran otomatis di website ini. Rincian pesanan akan dikirimkan ke WhatsApp admin resmi kami untuk dicek jadwal dapurnya terlebih dahulu. Pembayaran (transfer/QRIS) dilakukan setelah admin menyetujui pesanan.
                </div>
              </div>

              {/* Rincian Pesanan Ringkas */}
              <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200 space-y-3 text-xs">
                <h4 className="font-serif font-bold text-sm text-[#3B1F0E]">
                  Ringkasan Data Pemesan
                </h4>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="text-stone-500 block">Nama:</span>
                    <span className="font-bold text-[#3B1F0E]">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">WhatsApp:</span>
                    <span className="font-bold text-[#3B1F0E]">{formData.whatsapp}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Tanggal Acara:</span>
                    <span className="font-bold text-[#3B1F0E]">{formData.deliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Waktu Pengiriman:</span>
                    <span className="font-bold text-[#3B1F0E]">Pukul {formData.deliveryTime} WIB</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-stone-500 block">Layanan:</span>
                    <span className="font-bold text-[#3B1F0E]">
                      {formData.deliveryMethod === 'delivery'
                        ? `Pengantaran ke: ${formData.address}`
                        : 'Ambil Sendiri di Dapur FAZZA FOOD'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rincian Biaya Lengkap */}
              <div className="bg-white p-4 rounded-2xl border border-orange-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} porsi):</span>
                  <span className="font-bold">{formatRupiah(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Diskon Promo ({appliedPromo}):</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Biaya Pengantaran:</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">GRATIS</span>
                    ) : (
                      formatRupiah(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-extrabold text-[#EA580C] pt-2 border-t border-orange-200">
                  <span>Total yang Dibayarkan:</span>
                  <span>{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-white border-t border-orange-100 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-orange-200 text-xs font-bold text-[#3B1F0E] hover:bg-orange-50 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-orange-200 text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Tutup
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitOrder}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Siapkan Pesanan via WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
