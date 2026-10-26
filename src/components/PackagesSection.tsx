/**
 * @license
 * FAZZA FOOD - Komponen 7 Paket Katering & Kalkulator Porsi Acara
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CateringPackage } from '../types';
import {
  Check,
  Calculator,
  Sparkles,
  ShoppingBag,
  Users,
  Calendar,
  ChevronRight,
  Plus,
  Minus,
} from 'lucide-react';

export const PackagesSection: React.FC = () => {
  const { packages, addToCart, formatRupiah } = useStore();

  // State untuk Kalkulator Mini
  const [calcGuests, setCalcGuests] = useState<number>(50);
  const [calcEventType, setCalcEventType] = useState<string>('rapat');

  // Stepper porsi lokal per paket
  const [packagePortions, setPackagePortions] = useState<Record<string, number>>({});

  const getPortion = (pkg: CateringPackage) => packagePortions[pkg.id] || pkg.minPortion;

  const handlePortionChange = (pkgId: string, current: number, delta: number, min: number) => {
    const nextVal = Math.max(min, current + delta);
    setPackagePortions((prev) => ({ ...prev, [pkgId]: nextVal }));
  };

  const handleAddPackage = (pkg: CateringPackage) => {
    const qty = getPortion(pkg);
    addToCart({
      productId: pkg.id,
      itemType: 'package',
      name: pkg.name,
      price: pkg.pricePerPortion,
      quantity: qty,
      minOrder: pkg.minPortion,
      image: pkg.image,
      note: `Paket Katering Acara (${pkg.tag})`,
    });
  };

  // Logika Rekomendasi Kalkulator
  const getRecommendation = () => {
    let recommendedPkgId = 'pkg-nasi-box-acara';
    if (calcEventType === 'pernikahan' || calcGuests >= 100) {
      recommendedPkgId = 'pkg-pernikahan-prasmanan';
    } else if (calcEventType === 'rapat') {
      recommendedPkgId = 'pkg-rapat-kantor';
    } else if (calcEventType === 'ulang-tahun') {
      recommendedPkgId = 'pkg-ulang-tahun';
    } else if (calcEventType === 'pengajian') {
      recommendedPkgId = 'pkg-pengajian';
    } else if (calcEventType === 'harian') {
      recommendedPkgId = 'pkg-katering-harian';
    } else {
      recommendedPkgId = 'pkg-acara-keluarga';
    }

    const matchedPkg = packages.find((p) => p.id === recommendedPkgId) || packages[0];
    const estimatedTotal = matchedPkg ? matchedPkg.pricePerPortion * calcGuests : 0;

    return { matchedPkg, estimatedTotal };
  };

  const { matchedPkg, estimatedTotal } = getRecommendation();

  const handleApplyRecommendation = () => {
    if (!matchedPkg) return;
    const finalPortions = Math.max(calcGuests, matchedPkg.minPortion);
    addToCart({
      productId: matchedPkg.id,
      itemType: 'package',
      name: matchedPkg.name,
      price: matchedPkg.pricePerPortion,
      quantity: finalPortions,
      minOrder: matchedPkg.minPortion,
      image: matchedPkg.image,
      note: `Estimasi Acara untuk ${calcGuests} Tamu`,
    });
  };

  return (
    <section id="paket" className="py-16 sm:py-24 bg-[#FFF8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3.5 py-1.5 rounded-full inline-block">
            Pilihan Lengkap Acara
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E] mt-3">
            7 Paket Katering Spesial
          </h2>
          <p className="text-sm sm:text-base text-[#3B1F0E]/75 mt-2">
            Dari santapan harian kantor, syukuran keluarga, hingga resepsi akbar, kami siapkan menu komplit tanpa Anda perlu repot.
          </p>
        </div>

        {/* KALKULATOR MINI: "Berapa Porsi untuk Acaramu?" */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200/90 shadow-md mb-16 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between pb-6 border-b border-orange-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-[#3B1F0E]">
                  Kalkulator Porsi Acara
                </h3>
                <p className="text-xs sm:text-sm text-[#3B1F0E]/70">
                  Bingung menentukan paket & porsi? Masukkan jumlah tamu Anda di bawah ini:
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Rekomendasi Cepat & Akurat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 items-center">
            {/* Input Jenis Acara */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-[#3B1F0E] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                Jenis Acara
              </label>
              <select
                value={calcEventType}
                onChange={(e) => setCalcEventType(e.target.value)}
                className="w-full bg-[#FFF8F0] px-3.5 py-2.5 rounded-xl border border-orange-200 text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#EA580C]"
              >
                <option value="rapat">Rapat Kantor / Seminar</option>
                <option value="acara-keluarga">Acara Keluarga / Arisan</option>
                <option value="pengajian">Pengajian / Tasyakuran</option>
                <option value="ulang-tahun">Ulang Tahun / Syukuran</option>
                <option value="pernikahan">Pernikahan / Resepsi Akbar</option>
                <option value="harian">Katering Harian Kantor</option>
              </select>
            </div>

            {/* Slider Jumlah Tamu */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-[#3B1F0E]">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#EA580C]" />
                  Jumlah Tamu / Porsi
                </span>
                <span className="text-sm font-extrabold text-[#EA580C] bg-orange-100 px-2 py-0.5 rounded-lg">
                  {calcGuests} Orang
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={calcGuests}
                onChange={(e) => setCalcGuests(Number(e.target.value))}
                className="w-full accent-[#EA580C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>10 Tamu</span>
                <span>150 Tamu</span>
                <span>300+ Tamu</span>
              </div>
            </div>

            {/* Hasil Rekomendasi & Tombol Aksi */}
            <div className="md:col-span-4 bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200/70 text-center md:text-left flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-500 block">
                  Paket Direkomendasikan
                </span>
                <p className="font-serif font-bold text-sm text-[#3B1F0E] truncate">
                  {matchedPkg?.name}
                </p>
                <p className="text-xs font-extrabold text-[#EA580C] mt-0.5">
                  Estimasi: {formatRupiah(estimatedTotal)}
                </p>
              </div>
              <button
                type="button"
                onClick={handleApplyRecommendation}
                className="mt-3 w-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Pilih Rekomendasi Ini</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid 7 Paket Katering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const qty = getPortion(pkg);
            const isOutOfStock = !pkg.available;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col bg-white rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm hover:shadow-xl ${
                  pkg.isPopular
                    ? 'border-2 border-[#EA580C] ring-4 ring-orange-500/10'
                    : 'border-orange-200/70'
                } ${isOutOfStock ? 'opacity-60 grayscale' : 'hover:-translate-y-1'}`}
              >
                {/* Badge Paling Dipilih */}
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-bl-2xl shadow-md z-10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Paling Dipilih</span>
                  </div>
                )}

                {/* Gambar Paket Rasio 4:3 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-tr from-orange-100 to-amber-50">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                    {pkg.tag}
                  </div>
                </div>

                {/* Informasi Paket */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#3B1F0E]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-[#3B1F0E]/75 mt-1.5 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Harga Per Porsi */}
                    <div className="mt-4 pb-3 border-b border-orange-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[11px] text-stone-500 block">Harga per porsi</span>
                        <span className="font-serif font-extrabold text-2xl text-[#EA580C]">
                          {formatRupiah(pkg.pricePerPortion)}
                        </span>
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-800 font-semibold px-2.5 py-1 rounded-lg">
                        Min. {pkg.minPortion} porsi
                      </span>
                    </div>

                    {/* Daftar Isi Paket (Centang) */}
                    <div className="mt-4 space-y-2">
                      <span className="text-xs font-bold text-[#3B1F0E] block">
                        Isi & Fasilitas Paket:
                      </span>
                      <ul className="space-y-1.5">
                        {pkg.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-[#3B1F0E]/80">
                            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stepper Porsi & Tombol Pilih Paket */}
                  <div className="mt-6 pt-4 border-t border-orange-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#3B1F0E]">Jumlah Porsi:</span>
                      <div className="flex items-center bg-orange-50 border border-orange-200 rounded-xl px-1.5 py-1">
                        <button
                          type="button"
                          disabled={isOutOfStock || qty <= pkg.minPortion}
                          onClick={() => handlePortionChange(pkg.id, qty, -5, pkg.minPortion)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                          aria-label="Kurangi porsi paket"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-extrabold text-[#3B1F0E] px-3">
                          {qty} <span className="text-[10px] font-normal text-stone-500">porsi</span>
                        </span>
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => handlePortionChange(pkg.id, qty, 5, pkg.minPortion)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                          aria-label="Tambah porsi paket"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-stone-500">
                      <span>Estimasi Subtotal:</span>
                      <span className="font-bold text-[#3B1F0E] text-sm">
                        {formatRupiah(pkg.pricePerPortion * qty)}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleAddPackage(pkg)}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all cursor-pointer ${
                        pkg.isPopular
                          ? 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-lg shadow-orange-500/25 active:scale-95'
                          : 'bg-[#3B1F0E] hover:bg-[#251308] text-white shadow-md active:scale-95'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isOutOfStock ? 'Paket Tidak Tersedia' : 'Pilih Paket Ini'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
