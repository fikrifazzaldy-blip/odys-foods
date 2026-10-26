/**
 * @license
 * FAZZA FOOD - Komponen Modal Detail Produk & Pilihan Varian
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Sparkles,
  Info,
  Utensils,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    formatRupiah,
  } = useStore();

  const product = selectedProductForDetail;

  // Selected variant state
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState<number>(product ? product.minOrder : 1);
  const [itemNote, setItemNote] = useState('');

  if (!product) return null;

  const isOutOfStock = !product.available || product.label === 'Habis';

  // Variant change handler
  const handleVariantSelect = (title: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [title]: option }));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    // Gabungkan string varian yang dipilih
    const variantString = Object.values(selectedVariants).join(', ');

    addToCart({
      productId: product.id,
      itemType: 'product',
      name: product.name,
      price: product.price,
      quantity,
      minOrder: product.minOrder,
      image: product.image,
      note: itemNote || undefined,
      selectedVariant: variantString || (product.variants?.[0]?.options?.[0] ?? undefined),
    });

    setSelectedProductForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Gambar Header Produk */}
        <div className="relative aspect-[16/9] bg-stone-100 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
            aria-label="Tutup detail"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="bg-[#EA580C] text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
              {product.label}
            </span>
            <span className="bg-white/90 backdrop-blur-xs text-[#3B1F0E] text-xs font-semibold px-2.5 py-1 rounded-xl">
              Min. {product.minOrder} porsi
            </span>
          </div>
        </div>

        {/* Konten Scrollable */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-1">
              Kategori: {product.category}
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#3B1F0E]">
              {product.name}
            </h3>
            <span className="font-serif font-extrabold text-2xl text-[#EA580C] mt-1 block">
              {formatRupiah(product.price)} <span className="text-xs font-normal text-stone-500">/ porsi</span>
            </span>
          </div>

          {/* Deskripsi Lengkap */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B1F0E] mb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#EA580C]" />
              Deskripsi Menu
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {product.fullDescription || product.shortDescription}
            </p>
          </div>

          {/* Komposisi & Bahan Baku */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#3B1F0E] mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#EA580C]" />
                Komposisi & Lauk Penyerta
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="bg-[#FFF8F0] border border-orange-200 text-stone-700 text-xs px-2.5 py-1 rounded-lg"
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pilihan Varian (Tingkat Pedas, Pilihan Nasi, dll.) */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-orange-100">
              {product.variants.map((v, idx) => (
                <div key={idx}>
                  <label className="text-xs font-bold text-[#3B1F0E] block mb-1.5">
                    {v.title}:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {v.options.map((opt) => {
                      const isSelected =
                        selectedVariants[v.title] === opt ||
                        (!selectedVariants[v.title] && opt === v.options[0]);

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleVariantSelect(v.title, opt)}
                          className={`text-xs p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#EA580C] bg-orange-50 text-[#EA580C] font-bold ring-1 ring-orange-500'
                              : 'border-orange-200 bg-white text-stone-700 hover:bg-orange-50/50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Catatan Item Tambahan */}
          <div className="pt-2">
            <label className="text-xs font-bold text-[#3B1F0E] block mb-1">
              Catatan untuk Menu Ini (Opsional):
            </label>
            <input
              type="text"
              value={itemNote}
              onChange={(e) => setItemNote(e.target.value)}
              placeholder="Contoh: Sambal jangan dipisah, ekstra timun..."
              className="w-full bg-[#FFF8F0] px-3.5 py-2 rounded-xl border border-orange-200 text-xs text-stone-800"
            />
          </div>
        </div>

        {/* Footer Modal: Stepper & Tombol Tambah */}
        <div className="p-4 sm:p-5 bg-[#FFF8F0] border-t border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-bold text-[#3B1F0E]">Jumlah:</span>
            <div className="flex items-center bg-white border border-orange-200 rounded-xl px-1.5 py-1">
              <button
                type="button"
                disabled={isOutOfStock || quantity <= product.minOrder}
                onClick={() => setQuantity((q) => Math.max(product.minOrder, q - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50 text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-extrabold text-[#3B1F0E] px-3">
                {quantity} <span className="text-[10px] font-normal text-stone-500">porsi</span>
              </span>
              <button
                type="button"
                disabled={isOutOfStock}
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-orange-50 text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-right sm:ml-2">
              <span className="text-[10px] text-stone-500 block">Subtotal</span>
              <span className="text-xs font-extrabold text-[#EA580C]">
                {formatRupiah(product.price * quantity)}
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs transition-all shadow-md cursor-pointer ${
              isOutOfStock
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-orange-500/20 active:scale-95'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? 'Stok Sedang Habis' : 'Tambahkan ke Keranjang'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
