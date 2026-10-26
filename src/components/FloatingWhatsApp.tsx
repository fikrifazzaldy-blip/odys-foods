/**
 * @license
 * FAZZA FOOD - Komponen Tombol Melayang WhatsApp dengan Tooltip
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle, X } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { config, showToast } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const isWaConfigured = Boolean(config.whatsappNumber && config.whatsappNumber.trim() !== '');

  const handleClick = () => {
    if (!isWaConfigured) {
      showToast(
        'Nomor WhatsApp bisnis belum diatur di Pengaturan Admin.',
        'info'
      );
      return;
    }

    const defaultText = `Halo ${config.businessName}, saya ingin bertanya mengenai menu katering & ketersediaan tanggal acara.`;
    const url = createWhatsAppUrl(config.whatsappNumber, defaultText);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end">
      {/* Tooltip Ramah */}
      {showTooltip && (
        <div className="relative mb-2 bg-white text-[#3B1F0E] px-3.5 py-2 rounded-2xl shadow-xl border border-orange-200 text-xs font-semibold flex items-center gap-2 max-w-[210px] animate-bounce">
          <span>Ada pertanyaan acara? Chat admin kami!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 p-0.5"
            aria-label="Tutup tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-orange-200 rotate-45" />
        </div>
      )}

      {/* Tombol Utama WA */}
      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Chat WhatsApp Admin"
        title="Chat WhatsApp Admin FAZZA FOOD"
      >
        <MessageCircle className="w-7 h-7 fill-white text-white" />
      </button>
    </div>
  );
};
