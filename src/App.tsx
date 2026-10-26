/**
 * @license
 * FAZZA FOOD - Website Pemesanan Katering Online Profesional
 * Didesain & dibangun untuk kemudahan pengguna dan pengelola usaha katering.
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureStrip } from './components/FeatureStrip';
import { FeaturedMenu } from './components/FeaturedMenu';
import { MenuList } from './components/MenuList';
import { PackagesSection } from './components/PackagesSection';
import { HowToOrder } from './components/HowToOrder';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileCartBar } from './components/MobileCartBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ToastContainer } from './components/ToastContainer';
import { Info, ShieldCheck, X } from 'lucide-react';

const MainApp: React.FC = () => {
  const { setIsAdminOpen } = useStore();
  const [activeSection, setActiveSection] = useState('beranda');
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  // Deteksi URL / parameter untuk admin (/admin atau #admin)
  useEffect(() => {
    const handleUrlCheck = () => {
      const hash = window.location.hash;
      const pathname = window.location.pathname;
      const search = window.location.search;
      if (hash === '#admin' || pathname === '/admin' || search.includes('admin=true')) {
        setIsAdminOpen(true);
      }
    };
    handleUrlCheck();
    window.addEventListener('hashchange', handleUrlCheck);
    return () => window.removeEventListener('hashchange', handleUrlCheck);
  }, [setIsAdminOpen]);

  // Observer untuk mendeteksi bagian halaman yang aktif saat di-scroll
  useEffect(() => {
    const sectionIds = ['beranda', 'menu', 'paket', 'cara-pesan', 'tentang', 'kontak'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#3B1F0E] selection:bg-[#EA580C] selection:text-white">
      {/* Banner Mode Demo Transparan */}
      {showDemoBanner && (
        <div className="bg-amber-100/90 text-amber-950 px-4 py-1.5 text-xs border-b border-amber-200/80 flex items-center justify-between">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>
              <strong>Mode Demo:</strong> Data pesanan & menu tersimpan di browser ini (localStorage). Untuk masuk ke Dashboard Admin, gunakan link di footer atau tombol{' '}
              <button
                onClick={() => setIsAdminOpen(true)}
                className="underline font-bold text-[#EA580C] hover:text-[#C2410C]"
              >
                Area Pengelola
              </button>{' '}
              (PIN Demo: 1234).
            </span>
          </div>
          <button
            onClick={() => setShowDemoBanner(false)}
            className="text-amber-800 hover:text-amber-950 p-1"
            aria-label="Tutup banner demo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigasi Utama Sticky */}
      <Navbar activeSection={activeSection} />

      {/* Bagian-Bagian Halaman Utama */}
      <main className="flex-1">
        <Hero />
        <FeatureStrip />
        <FeaturedMenu />
        <MenuList />
        <PackagesSection />
        <HowToOrder />
        <AboutSection />
        <FAQSection />
      </main>

      {/* Footer & Kontak */}
      <Footer />

      {/* Komponen Interaktif & Modal Melayang */}
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <ProductDetailModal />
      <FloatingWhatsApp />
      <MobileCartBar />
      <AdminDashboard />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
