/**
 * @license
 * FAZZA FOOD - Komponen Menu Favorit (4 Pilihan Terlaris)
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ShoppingBag, Eye, Star, Plus, Minus } from 'lucide-react';

export const FeaturedMenu: React.FC = () => {
  const { products, addToCart, formatRupiah, setSelectedProductForDetail } = useStore();

  // Ambil 4 produk favorit atau terlaris
  const favoriteProducts = products
    .filter((p) => p.isFavorite || p.label === 'Terlaris')
    .slice(0, 4);

  // Stepper jumlah lokal per kartu untuk direct add
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (prod: Product) => quantities[prod.id] || prod.minOrder || 1;

  const handleQtyChange = (prodId: string, current: number, delta: number, min: number) => {
    const nextVal = Math.max(min, current + delta);
    setQuantities((prev) => ({ ...prev, [prodId]: nextVal }));
  };

  const handleAddDirect = (prod: Product) => {
    const qty = getQty(prod);
    addToCart({
      productId: prod.id,
      itemType: 'product',
      name: prod.name,
      price: prod.price,
      quantity: qty,
      minOrder: prod.minOrder,
      image: prod.image,
      selectedVariant: prod.variants?.[0]?.options?.[0],
    });
  };

  if (favoriteProducts.length === 0) return null;

  return (
    <section className="py-16 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3 py-1 rounded-full mb-2">
            <Star className="w-3.5 h-3.5 fill-[#EA580C]" />
            <span>Paling Banyak Dipesan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E]">
            Menu Favorit Pelanggan
          </h2>
          <p className="text-sm sm:text-base text-[#3B1F0E]/75 mt-2">
            Pilihan hidangan Nusantara istimewa yang selalu menjadi primadona dalam setiap rapat kantor dan acara syukuran.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => {
            const qty = getQty(product);
            const isOutOfStock = !product.available || product.label === 'Habis';

            return (
              <div
                key={product.id}
                className={`group flex flex-col bg-white rounded-3xl overflow-hidden border border-orange-200/70 shadow-sm hover:shadow-xl transition-all duration-300 ${
                  isOutOfStock ? 'opacity-60 grayscale' : 'hover:-translate-y-1'
                }`}
              >
                {/* Gambar Produk Rasio 4:3 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-tr from-orange-100 to-amber-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#EA580C] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                      {product.label}
                    </span>
                    <span className="bg-white/90 backdrop-blur-xs text-[#3B1F0E] text-[11px] font-semibold px-2 py-1 rounded-lg">
                      Min. {product.minOrder} porsi
                    </span>
                  </div>

                  {/* Tombol Lihat Detail Cepat */}
                  <button
                    onClick={() => setSelectedProductForDetail(product)}
                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-[#3B1F0E] p-2 rounded-xl shadow-md transition-all hover:scale-110 cursor-pointer"
                    title="Lihat Detail & Varian"
                  >
                    <Eye className="w-4 h-4 text-[#EA580C]" />
                  </button>
                </div>

                {/* Konten Menu */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#3B1F0E] line-clamp-1 group-hover:text-[#EA580C] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#3B1F0E]/70 line-clamp-2 mt-1 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-orange-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-xs text-[#3B1F0E]/60 block">Harga / porsi</span>
                        <span className="font-serif font-extrabold text-lg text-[#EA580C]">
                          {formatRupiah(product.price)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-[#3B1F0E]/60 block">Subtotal</span>
                        <span className="text-xs font-bold text-[#3B1F0E]">
                          {formatRupiah(product.price * qty)}
                        </span>
                      </div>
                    </div>

                    {/* Stepper Jumlah Porsi */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center bg-orange-50 border border-orange-200/80 rounded-xl px-1.5 py-1 flex-1 justify-between">
                        <button
                          type="button"
                          disabled={isOutOfStock || qty <= product.minOrder}
                          onClick={() => handleQtyChange(product.id, qty, -1, product.minOrder)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                          aria-label="Kurangi porsi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#3B1F0E] px-2">
                          {qty} <span className="text-[10px] font-normal text-stone-500">porsi</span>
                        </span>
                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => handleQtyChange(product.id, qty, 1, product.minOrder)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                          aria-label="Tambah porsi"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Tombol Tambah ke Keranjang */}
                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => handleAddDirect(product)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isOutOfStock
                          ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                          : 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-md shadow-orange-500/20 active:scale-95'
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{isOutOfStock ? 'Stok Habis' : '+ Tambah ke Keranjang'}</span>
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
