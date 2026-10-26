/**
 * @license
 * FAZZA FOOD - Komponen Daftar Menu Lengkap & Filter Interaktif
 */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import {
  Search,
  Filter,
  ArrowUpDown,
  ShoppingBag,
  Eye,
  Plus,
  Minus,
  UtensilsCrossed,
  RotateCcw,
} from 'lucide-react';

export const MenuList: React.FC = () => {
  const { products, addToCart, formatRupiah, setSelectedProductForDetail } = useStore();

  // State Filter & Pencarian
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under20' | '20to30' | 'above30'>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'name-asc'>('popular');

  // Stepper porsi lokal per kartu
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories: ProductCategory[] = ['Semua', 'Nasi Box', 'Snack Box', 'Kue', 'Minuman', 'Prasmanan'];

  const getQty = (prod: Product) => quantities[prod.id] || prod.minOrder || 1;

  const handleQtyChange = (prodId: string, current: number, delta: number, min: number) => {
    const nextVal = Math.max(min, current + delta);
    setQuantities((prev) => ({ ...prev, [prodId]: nextVal }));
  };

  const handleAddDirect = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
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

  // Filter & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Filter Kategori
        if (selectedCategory !== 'Semua' && item.category !== selectedCategory) {
          return false;
        }

        // Filter Pencarian Teks
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = item.shortDescription.toLowerCase().includes(query);
          const matchIngr = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
          if (!matchName && !matchDesc && !matchIngr) return false;
        }

        // Filter Rentang Harga
        if (priceFilter === 'under20' && item.price >= 20000) return false;
        if (priceFilter === '20to30' && (item.price < 20000 || item.price > 30000)) return false;
        if (priceFilter === 'above30' && item.price <= 30000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        // Default popular: Terlaris duluan
        if (a.label === 'Terlaris' && b.label !== 'Terlaris') return -1;
        if (b.label === 'Terlaris' && a.label !== 'Terlaris') return 1;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, priceFilter, sortBy]);

  const handleResetFilter = () => {
    setSelectedCategory('Semua');
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('popular');
  };

  return (
    <section id="menu" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3 py-1 rounded-full">
            Daftar Menu Katering
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E] mt-2">
            Pilihan Menu Lezat & Higienis
          </h2>
          <p className="text-sm sm:text-base text-[#3B1F0E]/75 mt-2">
            Dibuat fresh setiap hari dengan bumbu rempah pilihan, porsi mengenyangkan, dan kemasan higienis.
          </p>
        </div>

        {/* Search, Filter, Sort Controls Bar */}
        <div className="bg-[#FFF8F0] p-4 sm:p-6 rounded-3xl border border-orange-200/80 mb-10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Bar Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari menu, lauk, bumbu (misal: ayam bakar, risoles)..."
                className="w-full bg-white pl-11 pr-4 py-3 rounded-2xl border border-orange-200/90 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:border-transparent transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs bg-stone-200 hover:bg-stone-300 rounded-full w-5 h-5 flex items-center justify-center text-stone-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Price Range Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-semibold text-stone-500 whitespace-nowrap hidden sm:inline ml-1 mr-1">
                Harga:
              </span>
              <button
                onClick={() => setPriceFilter('all')}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  priceFilter === 'all'
                    ? 'bg-[#EA580C] text-white border-[#EA580C]'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                Semua Harga
              </button>
              <button
                onClick={() => setPriceFilter('under20')}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  priceFilter === 'under20'
                    ? 'bg-[#EA580C] text-white border-[#EA580C]'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                &lt; Rp20rb
              </button>
              <button
                onClick={() => setPriceFilter('20to30')}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  priceFilter === '20to30'
                    ? 'bg-[#EA580C] text-white border-[#EA580C]'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                Rp20rb - Rp30rb
              </button>
              <button
                onClick={() => setPriceFilter('above30')}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border whitespace-nowrap cursor-pointer transition-all ${
                  priceFilter === 'above30'
                    ? 'bg-[#EA580C] text-white border-[#EA580C]'
                    : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-50'
                }`}
              >
                &gt; Rp30rb
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative min-w-[170px]">
              <ArrowUpDown className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full appearance-none bg-white pl-9 pr-8 py-3 rounded-2xl border border-orange-200/90 text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#EA580C] cursor-pointer"
              >
                <option value="popular">Urutkan: Terlaris</option>
                <option value="price-asc">Harga: Terendah</option>
                <option value="price-desc">Harga: Tertinggi</option>
                <option value="name-asc">Nama: A - Z</option>
              </select>
            </div>
          </div>

          {/* Horizontal Scrollable Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3B1F0E] text-white shadow-md'
                      : 'bg-white/80 text-stone-700 border border-orange-200/70 hover:bg-white hover:text-[#EA580C]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State jika hasil pencarian kosong */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-[#FFF8F0] rounded-3xl border border-dashed border-orange-300 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3B1F0E]">
              Menu Tidak Ditemukan
            </h3>
            <p className="text-sm text-[#3B1F0E]/70 mt-2 max-w-sm mx-auto">
              Maaf, tidak ada menu yang cocok dengan kata kunci &quot;{searchQuery}&quot; atau filter yang dipilih.
            </p>
            <button
              onClick={handleResetFilter}
              className="mt-5 inline-flex items-center gap-2 bg-[#EA580C] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#C2410C] transition-colors cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Semua Filter</span>
            </button>
          </div>
        ) : (
          /* Grid Kartu Menu */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const qty = getQty(product);
              const isOutOfStock = !product.available || product.label === 'Habis';

              return (
                <div
                  key={product.id}
                  onClick={() => setSelectedProductForDetail(product)}
                  className={`group flex flex-col bg-white rounded-3xl overflow-hidden border border-orange-200/70 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    isOutOfStock ? 'opacity-60 grayscale' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Gambar Menu Rasio 4:3 */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-tr from-orange-100 to-amber-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Label Badge */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs ${
                          product.label === 'Terlaris'
                            ? 'bg-[#EA580C] text-white'
                            : product.label === 'Baru'
                            ? 'bg-[#FBBF24] text-[#3B1F0E]'
                            : product.label === 'Habis'
                            ? 'bg-stone-800 text-white'
                            : 'bg-[#6B8F71] text-white'
                        }`}
                      >
                        {product.label}
                      </span>
                      <span className="bg-white/90 backdrop-blur-xs text-[#3B1F0E] text-[11px] font-semibold px-2 py-1 rounded-xl">
                        Min. {product.minOrder} porsi
                      </span>
                    </div>

                    {/* Ikon Detail Hover */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#3B1F0E] p-2 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4 text-[#EA580C]" />
                    </div>
                  </div>

                  {/* Isi Kartu */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                          {product.category}
                        </span>
                        {product.variants && product.variants.length > 0 && (
                          <span className="text-[10px] bg-orange-100 text-orange-800 font-semibold px-2 py-0.5 rounded-full">
                            Ada Varian
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#3B1F0E] group-hover:text-[#EA580C] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#3B1F0E]/70 line-clamp-2 mt-1.5 leading-relaxed">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-orange-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <div>
                          <span className="text-[11px] text-[#3B1F0E]/60 block">Harga Satuan</span>
                          <span className="font-serif font-extrabold text-xl text-[#EA580C]">
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
                      <div
                        className="flex items-center gap-2 mb-3"
                        onClick={(e) => e.stopPropagation()}
                      >
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

                      {/* Tombol Aksi Tambah */}
                      <button
                        type="button"
                        disabled={isOutOfStock}
                        onClick={(e) => handleAddDirect(product, e)}
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
        )}
      </div>
    </section>
  );
};
