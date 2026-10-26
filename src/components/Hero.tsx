/**
 * @license
 * FAZZA FOOD - Komponen Hero Section
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Utensils, HeartHandshake, Sparkles, CheckCircle, MapPin, ChefHat } from 'lucide-react';
import chefLogo from '../assets/images/fazza_chef_logo_1793023852083.jpg';

export const Hero: React.FC = () => {
  const { config, isStoreOpen } = useStore();
  const openStatus = isStoreOpen();

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPackages = () => {
    const el = document.getElementById('paket');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="beranda" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Background Subtle Organic Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Teks & Tombol Aksi */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge dengan Lokasi Karanggintung */}
            <div className="inline-flex items-center gap-2 bg-orange-100/90 border border-orange-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#EA580C]">
              <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0" />
              <span>Katering Karanggintung, Gandrungmangu, Cilacap</span>
            </div>

            {/* Judul Utama Serif Hangat */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3B1F0E] leading-[1.15] tracking-tight">
              Lezatnya Hidangan,{' '}
              <span className="text-[#EA580C] underline decoration-amber-400 decoration-wavy decoration-2">
                Mudahnya Pemesanan
              </span>
            </h1>

            {/* Subjudul Singkat */}
            <p className="text-base sm:text-lg text-[#3B1F0E]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FAZZA FOOD siap melayani kebutuhan aneka nasi box komplit, snack box higienis, dan prasmanan mewah khas Nusantara untuk rapat kantor, arisan keluarga, syukuran, pengajian, hingga pernikahan di seluruh wilayah Gandrungmangu, Cilacap dan sekitarnya.
            </p>

            {/* Tombol Aksi Utama */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={scrollToMenu}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] text-base cursor-pointer"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={scrollToPackages}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-[#3B1F0E] font-bold px-7 py-4 rounded-2xl border border-orange-200/90 shadow-xs transition-all hover:scale-[1.01] text-base cursor-pointer"
              >
                <Utensils className="w-5 h-5 text-[#EA580C]" />
                <span>Lihat 7 Paket Katering</span>
              </button>
            </div>

            {/* Highlight Lokasi Dapur & Keunggulan */}
            <div className="pt-4 border-t border-orange-200/60 space-y-2">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs text-stone-600 font-semibold">
                <MapPin className="w-4 h-4 text-[#EA580C] shrink-0" />
                <span>Alamat Dapur: Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap, Jawa Tengah</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-xs text-[#3B1F0E]/80">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6B8F71]" />
                  <span>100% Halal & Higienis</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6B8F71]" />
                  <span>Bahan Segar Pasar Lokal</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6B8F71]" />
                  <span>Langsung Kirim via WhatsApp</span>
                </span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Kolase 3 Foto Makanan Murni Berasio 4:3 */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none pt-4 pb-8">
              {/* Foto 1: Foto Utama Nasi Box Komplit */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-gradient-to-br from-amber-100 to-orange-200 z-10 group">
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80"
                  alt="Nasi Box Ayam Lengkuas Komplit FAZZA FOOD"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="bg-[#EA580C] text-[10px] font-black uppercase px-2 py-0.5 rounded-md inline-block mb-1">
                      Paling Laris
                    </span>
                    <p className="text-xs sm:text-sm font-bold leading-tight">
                      Nasi Box Ayam Goreng Lengkuas Tradisional
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto 2: Snack Box & Kue Tradisional (Kanan Bawah Bertumpuk) */}
              <div className="absolute -bottom-4 right-0 sm:-right-4 w-44 sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-orange-200 to-amber-200 z-20 group">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Snack Box & Kue Basah Tradisional"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-bold leading-tight">
                    Snack Box Gurih & Manis
                  </span>
                </div>
              </div>

              {/* Foto 3: Prasmanan Nusantara (Kiri Bawah Bertumpuk) */}
              <div className="absolute -bottom-6 -left-3 sm:-left-6 w-40 sm:w-48 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-amber-200 to-orange-200 z-20 group hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80"
                  alt="Prasmanan Lengkap Nusantara"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-white text-[11px] font-bold leading-tight">
                    Prasmanan Resepsi
                  </span>
                </div>
              </div>

              {/* Badge Maskot Koki Muda (Kiri Atas Melayang) */}
              <div className="absolute -top-6 -left-3 sm:-left-6 bg-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-orange-200 flex items-center gap-3 z-30 animate-float">
                <img
                  src={chefLogo}
                  alt="Maskot Koki Muda FAZZA FOOD"
                  className="w-11 h-11 rounded-full border-2 border-[#EA580C] object-cover shrink-0"
                />
                <div>
                  <p className="text-xs font-black text-[#3B1F0E]">Masakan Koki Muda</p>
                  <p className="text-[11px] text-[#EA580C] font-semibold">Resep Asli & Gurih</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
