/**
 * @license
 * FAZZA FOOD - Komponen Kontak & Footer
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  UtensilsCrossed,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  Facebook,
  ShieldAlert,
  Heart,
  ChevronRight,
} from 'lucide-react';

import chefLogo from '../assets/images/fazza_chef_logo_1793023852083.jpg';

export const Footer: React.FC = () => {
  const { config, setIsAdminOpen } = useStore();

  const isWaConfigured = Boolean(config.whatsappNumber && config.whatsappNumber.trim() !== '');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="kontak" className="bg-[#3B1F0E] text-white/90 pt-16 pb-12 border-t-4 border-[#EA580C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-orange-900/60">
          {/* Kolom 1: Profil Brand dengan Logo Koki Muda */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#EA580C] shadow-md bg-orange-100 shrink-0">
                <img
                  src={chefLogo}
                  alt="Logo FAZZA FOOD"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-2xl text-white block">
                  {config.businessName}
                </span>
                <span className="text-[11px] text-amber-300 font-medium">Katering Gandrungmangu, Cilacap</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {config.tagline}
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-amber-300 block mb-2">Ikuti Media Sosial Kami:</span>
              <div className="flex items-center gap-2.5">
                {config.social.instagram ? (
                  <a
                    href={`https://instagram.com/${config.social.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors"
                    aria-label="Instagram FAZZA FOOD"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-xs text-white/50">Instagram belum diatur</span>
                )}
                {config.social.facebook && (
                  <a
                    href={`https://facebook.com/${config.social.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#EA580C] text-white flex items-center justify-center transition-colors"
                    aria-label="Facebook FAZZA FOOD"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-amber-300">Tautan Cepat</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/75">
              <li>
                <button
                  onClick={() => scrollToSection('beranda')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  <span>Beranda</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  <span>Menu Nasi Box & Snack</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('paket')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  <span>7 Paket Katering</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cara-pesan')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  <span>Cara Pemesanan</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('tentang')}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                  <span>Tentang & Galeri Dapur</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Info Kontak & Operasional */}
          <div className="lg:col-span-5 space-y-3.5">
            <h4 className="font-serif font-bold text-base text-amber-300">Dapur & Layanan Pelanggan</h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  {config.address ? `${config.address}, ${config.city}` : 'Alamat belum diatur (dapat diubah di Admin)'}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{config.operatingHours.daysDescription}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    WhatsApp:{' '}
                    {isWaConfigured ? (
                      `+${config.whatsappNumber}`
                    ) : (
                      <span className="text-amber-300 italic font-normal">Belum diatur oleh admin</span>
                    )}
                  </span>
                  {!isWaConfigured && (
                    <span className="text-[11px] text-amber-200/80">
                      (Buka Area Pengelola untuk mengisi nomor WhatsApp bisnis asli Anda)
                    </span>
                  )}
                </div>
              </div>

              {config.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>{config.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {config.businessName}. Hak Cipta Dilindungi.</span>
          </div>

          {/* Link Rahasia/Discreet Admin */}
          <div className="flex items-center gap-4">
            <span className="text-white/40">Dibuat dengan dedikasi masakan Nusantara</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-white/60 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Area Pengelola (Admin)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
