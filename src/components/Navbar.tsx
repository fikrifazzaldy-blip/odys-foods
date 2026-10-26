/**
 * @license
 * FAZZA FOOD - Komponen Navigasi Utama (Sticky Navbar Rapih)
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import chefLogo from '../assets/images/fazza_chef_logo_1793023852083.jpg';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { config, cartTotalCount, cartSubtotal, discountAmount, setIsCartOpen, setIsAdminOpen, isStoreOpen, formatRupiah } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openStatus = isStoreOpen();
  const cartCurrentTotal = Math.max(0, cartSubtotal - discountAmount);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Menu', href: '#menu' },
    { label: 'Paket Katering', href: '#paket' },
    { label: 'Cara Pemesanan', href: '#cara-pesan' },
    { label: 'Tentang Kami', href: '#tentang' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Bar Informasi Ringkas & Rapih */}
      <div className="bg-[#3B1F0E] text-white/90 text-xs py-2 px-4 border-b border-orange-950/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          {/* Sisi Kiri: Lokasi & Aturan H-2 */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Pesan minimal H-{config.minOrderDays || 2} sebelum hari acara
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
              <span className="truncate max-w-xs sm:max-w-md">
                Karanggintung RT 3 RW 4, Gandrungmangu, Cilacap
              </span>
            </span>
          </div>

          {/* Sisi Kanan: Status Dapur & Area Pengelola */}
          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            <div className="inline-flex items-center gap-1.5 text-[11px] bg-black/25 px-2.5 py-1 rounded-full border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${
                  openStatus ? 'bg-[#6B8F71] animate-pulse' : 'bg-rose-400'
                }`}
              />
              <span className={openStatus ? 'text-[#84ab8b] font-medium' : 'text-rose-300 font-medium'}>
                {openStatus ? 'Dapur Buka (Menerima Order)' : 'Dapur Tutup (Pre-Order Tetap Buka)'}
              </span>
            </div>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-white/60 hover:text-amber-300 text-xs font-medium underline-offset-2 hover:underline transition-colors pl-1 cursor-pointer"
              title="Akses Khusus Pemilik Toko"
            >
              Area Pengelola
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8F0]/95 backdrop-blur-md shadow-md py-2.5 border-b border-orange-200/60'
            : 'bg-[#FFF8F0] py-3.5 border-b border-orange-100/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Logo dengan Karakter Laki Muda Topi Koki */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#beranda');
            }}
            className="flex items-center gap-3 group cursor-pointer shrink-0"
          >
            {/* Foto Avatar Maskot Koki Muda */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#EA580C] shadow-md group-hover:scale-105 transition-transform bg-orange-100 shrink-0">
              <img
                src={chefLogo}
                alt="Logo Koki Muda FAZZA FOOD"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border border-white" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-[#3B1F0E] group-hover:text-[#EA580C] transition-colors">
                  FAZZA FOOD
                </span>
                <span className="bg-[#EA580C] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-2xs hidden sm:inline">
                  Katering
                </span>
              </div>
              <p className="text-[11px] text-[#3B1F0E]/70 font-medium -mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#EA580C]" />
                <span>Gandrungmangu, Cilacap</span>
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#EA580C] bg-orange-100/90 shadow-2xs font-bold'
                      : 'text-[#3B1F0E]/80 hover:text-[#EA580C] hover:bg-orange-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Cart Button & Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Tombol Keranjang Belanja */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-bold shadow-md shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              aria-label="Buka Keranjang Belanja"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FBBF24] text-[#3B1F0E] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-2xs">
                    {cartTotalCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-[11px] text-orange-100 font-medium">Keranjang</span>
                <span className="text-xs font-extrabold text-white">
                  {cartTotalCount > 0 ? formatRupiah(cartCurrentTotal) : '0 Porsi'}
                </span>
              </div>
            </button>

            {/* Hamburger Button Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-orange-100 text-[#3B1F0E] hover:bg-orange-200/70 transition-colors cursor-pointer"
              aria-label="Menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu yang Rapi & Bersih */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF8F0] border-t border-orange-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-orange-100 mb-3">
              <img
                src={chefLogo}
                alt="Logo Koki FAZZA"
                className="w-10 h-10 rounded-full border border-orange-300 object-cover"
              />
              <div>
                <p className="font-serif font-bold text-sm text-[#3B1F0E]">FAZZA FOOD Katering</p>
                <p className="text-[11px] text-stone-500">Karanggintung, Gandrungmangu, Cilacap</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between cursor-pointer transition-colors ${
                      isActive
                        ? 'text-[#EA580C] bg-orange-100'
                        : 'text-[#3B1F0E] hover:bg-orange-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-orange-200/60 mt-3 flex items-center justify-between text-xs text-stone-600 px-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                {config.operatingHours.open} - {config.operatingHours.close} WIB
              </span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="text-[#EA580C] font-bold underline"
              >
                Area Pengelola
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
