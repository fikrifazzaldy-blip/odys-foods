/**
 * @license
 * FAZZA FOOD - Bottom Bar Keranjang Melayang di Ponsel (Mobile Floating Cart Bar)
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const MobileCartBar: React.FC = () => {
  const { cart, cartTotalCount, cartSubtotal, discountAmount, setIsCartOpen, formatRupiah } = useStore();

  if (cart.length === 0) return null;

  const currentTotal = Math.max(0, cartSubtotal - discountAmount);

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-20 z-40 animate-in slide-in-from-bottom duration-300">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-[#3B1F0E] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between border border-orange-500/30 active:scale-98 transition-transform cursor-pointer"
        aria-label="Buka keranjang belanja"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-[#EA580C] flex items-center justify-center shrink-0">
            <ShoppingBag className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 bg-[#FBBF24] text-[#3B1F0E] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartTotalCount}
            </span>
          </div>
          <div className="text-left">
            <span className="text-[11px] text-orange-200 block leading-tight font-medium">
              {cartTotalCount} Porsi Terpilih
            </span>
            <span className="font-serif font-extrabold text-sm text-white">
              {formatRupiah(currentTotal)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-white/10 px-2.5 py-1.5 rounded-xl">
          <span>Lihat</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
