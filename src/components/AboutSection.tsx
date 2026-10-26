/**
 * @license
 * FAZZA FOOD - Komponen Tentang Kami, Testimoni Demo & Galeri Lightbox
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { GALLERY_PHOTOS, INITIAL_TESTIMONIALS, GalleryPhoto } from '../data';
import {
  HeartHandshake,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  X,
  Maximize2,
} from 'lucide-react';

import chefLogo from '../assets/images/fazza_chef_logo_1793023852083.jpg';

export const AboutSection: React.FC = () => {
  const { config } = useStore();

  // State Testimoni Carousel
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const testimonials = INITIAL_TESTIMONIALS;

  // State Lightbox Galeri
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const prevTesti = () => {
    setActiveTestiIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTesti = () => {
    setActiveTestiIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTesti = testimonials[activeTestiIndex];

  return (
    <section id="tentang" className="py-16 sm:py-24 bg-[#FFF8F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Profil Usaha & Nilai-Nilai */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3.5 py-1.5 rounded-full inline-block">
              Tentang {config.businessName}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E] leading-tight">
              Dedikasi Rasa Rumahan dengan Standar Katering Profesional
            </h2>
            <p className="text-sm sm:text-base text-[#3B1F0E]/80 leading-relaxed">
              {config.about.story}
            </p>

            <div className="space-y-3 pt-2">
              {config.about.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#3B1F0E]/85 leading-relaxed font-medium">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gradient-to-tr from-amber-200 to-orange-200">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1000&q=80"
                alt="Suasana Dapur Bersih FAZZA FOOD Karanggintung"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Badge Maskot Koki Muda */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2 rounded-2xl shadow-lg border border-orange-200 flex items-center gap-2.5">
                <img
                  src={chefLogo}
                  alt="Koki Muda FAZZA FOOD"
                  className="w-10 h-10 rounded-full border border-orange-400 object-cover"
                />
                <div className="text-left pr-1">
                  <span className="text-[11px] font-black text-[#3B1F0E] block leading-tight">Koki FAZZA FOOD</span>
                  <span className="text-[10px] text-orange-600 font-semibold block">Karanggintung</span>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="font-serif font-bold text-lg">Dapur Bersih & Berstandar Higienis</p>
                  <p className="text-xs text-white/80">Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONI CAROUSEL (DIBERI LABEL CONTOH DEMO JELAS) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-200/80 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                  Ulasan Pelanggan
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  Contoh testimoni (demo)
                </span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#3B1F0E] mt-1">
                Kesan Mereka Tentang Sajian Kami
              </h3>
            </div>

            {/* Tombol Navigasi Carousel */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTesti}
                className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-[#3B1F0E] hover:bg-orange-100 transition-colors cursor-pointer"
                aria-label="Ulasan sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-semibold text-stone-500">
                {activeTestiIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTesti}
                className="w-10 h-10 rounded-full border border-orange-200 flex items-center justify-center text-[#3B1F0E] hover:bg-orange-100 transition-colors cursor-pointer"
                aria-label="Ulasan selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Kartu Testimoni Aktif */}
          <div className="bg-[#FFF8F0] p-6 sm:p-8 rounded-2xl border border-orange-100 relative">
            <Quote className="w-12 h-12 text-orange-200/80 absolute top-4 right-4 pointer-events-none" />

            <div className="flex items-center gap-1 mb-4">
              {[...Array(currentTesti.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-sm sm:text-base text-[#3B1F0E] italic leading-relaxed relative z-10">
              &quot;{currentTesti.comment}&quot;
            </p>

            <div className="mt-6 flex items-center gap-3.5 pt-4 border-t border-orange-200/50">
              <img
                src={currentTesti.avatar}
                alt={currentTesti.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#EA580C]"
                loading="lazy"
              />
              <div>
                <h4 className="font-serif font-bold text-base text-[#3B1F0E]">
                  {currentTesti.name}
                </h4>
                <p className="text-xs text-[#3B1F0E]/70">{currentTesti.role}</p>
                <span className="text-[10px] text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded font-medium mt-1 inline-block">
                  {currentTesti.event}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GALERI 6 FOTO DENGAN LIGHTBOX */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#3B1F0E]">
              Galeri Sajian & Dapur Kami
            </h3>
            <p className="text-xs sm:text-sm text-[#3B1F0E]/75 mt-1.5">
              Klik foto untuk memperbesar tampilan dan melihat detailnya.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative rounded-2xl overflow-hidden aspect-square border-2 border-white shadow-sm hover:shadow-lg cursor-pointer bg-stone-200"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-white">
                  <span className="text-xs font-bold truncate">{photo.title}</span>
                  <div className="flex items-center gap-1 text-[10px] text-white/80 mt-0.5">
                    <Maximize2 className="w-3 h-3" />
                    <span>Perbesar</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal Sederhana */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[4/3] bg-black">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-white">
              <h4 className="font-serif font-bold text-xl text-[#3B1F0E]">
                {activePhoto.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#3B1F0E]/80 mt-1">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
