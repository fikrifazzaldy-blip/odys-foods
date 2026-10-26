/**
 * @license
 * FAZZA FOOD - Komponen Keranjang Belanja (Drawer Samping / Bottom Sheet di HP)
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Tag,
  ArrowRight,
  AlertCircle,
  Edit3,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    updateCartNote,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotalCount,
    config,
    appliedPromo,
    discountAmount,
    applyPromoCode,
    removePromoCode,
    formatRupiah,
    setIsCheckoutOpen,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState('');

  if (!isCartOpen) return null;

  // Cek progres gratis ongkir
  const freeThreshold = config.freeShippingThreshold || 500000;
  const remainingForFree = Math.max(0, freeThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeThreshold) * 100));

  // Validasi batas minimal pemesanan per item
  const hasMinOrderIssues = cart.some((item) => item.quantity < item.minOrder);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSaveNote = (id: string) => {
    updateCartNote(id, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFF8F0] shadow-2xl flex flex-col justify-between">
          {/* Header Drawer */}
          <div className="p-5 sm:p-6 bg-white border-b border-orange-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#3B1F0E]">
                  Keranjang Pesanan
                </h3>
                <span className="text-xs text-stone-500">
                  {cartTotalCount} porsi hidangan dipilih
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="text-stone-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-colors"
                  title="Kosongkan Keranjang"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup keranjang"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Konfirmasi Kosongkan Keranjang */}
          {showClearConfirm && (
            <div className="bg-rose-50 p-4 border-b border-rose-200 flex items-center justify-between gap-3 text-xs">
              <span className="text-rose-800 font-semibold">
                Yakin ingin mengosongkan semua isi keranjang?
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2.5 py-1 bg-white text-stone-700 rounded-lg border border-stone-200 font-medium"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-lg font-bold"
                >
                  Kosongkan
                </button>
              </div>
            </div>
          )}

          {/* Progres Banner Gratis Ongkir */}
          {cart.length > 0 && (
            <div className="bg-orange-50 px-5 py-3 border-b border-orange-200/80">
              <div className="flex items-center justify-between text-xs mb-1.5 font-bold text-[#3B1F0E]">
                <span className="flex items-center gap-1.5 text-[#EA580C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {remainingForFree > 0
                    ? `Tambah ${formatRupiah(remainingForFree)} lagi untuk GRATIS ONGKIR!`
                    : 'Selamat! Pesanan Anda berhak GRATIS ONGKIR 🎉'}
                </span>
                <span className="text-stone-500 font-medium">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-orange-200/70 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#EA580C] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Isi Item Keranjang */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-3xl bg-orange-100/70 text-[#EA580C] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#3B1F0E]">
                  Keranjang Masih Kosong
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xs mt-1.5 leading-relaxed">
                  Yuk jelajahi aneka nasi box lezat, snack box gurih, atau paket katering kami dan tambahkan ke sini.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-6 bg-[#EA580C] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md shadow-orange-500/20 hover:bg-[#C2410C] transition-all cursor-pointer"
                >
                  Lihat Menu Sekarang
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const isUnderMin = item.quantity < item.minOrder;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 border border-orange-200/70 shadow-xs space-y-3"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-orange-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif font-bold text-sm text-[#3B1F0E] truncate">
                          {item.name}
                        </h5>
                        {item.selectedVariant && (
                          <span className="text-[11px] text-[#EA580C] font-medium block">
                            Varian: {item.selectedVariant}
                          </span>
                        )}
                        <span className="text-xs font-bold text-stone-800 mt-0.5 block">
                          {formatRupiah(item.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-300 hover:text-rose-500 self-start p-1"
                        aria-label="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Catatan Item */}
                    {editingNoteId === item.id ? (
                      <div className="space-y-1.5 pt-1">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Tulis catatan (mis: jangan pedas, pisah sambal)..."
                          className="w-full bg-[#FFF8F0] px-2.5 py-1.5 text-xs rounded-lg border border-orange-200 focus:outline-none focus:ring-1 focus:ring-[#EA580C]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="text-[11px] text-stone-500 hover:text-stone-700 px-2 py-0.5"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="text-[11px] bg-[#EA580C] text-white px-2.5 py-0.5 rounded font-semibold"
                          >
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                        <span className="italic truncate max-w-[240px]">
                          {item.note ? `Catatan: "${item.note}"` : 'Belum ada catatan khusus'}
                        </span>
                        <button
                          onClick={() => {
                            setEditingNoteId(item.id);
                            setTempNote(item.note || '');
                          }}
                          className="text-[#EA580C] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{item.note ? 'Ubah' : '+ Catatan'}</span>
                        </button>
                      </div>
                    )}

                    {/* Stepper Jumlah & Subtotal */}
                    <div className="pt-2 border-t border-orange-100 flex items-center justify-between">
                      <div className="flex items-center bg-orange-50 border border-orange-200 rounded-xl px-1.5 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 cursor-pointer shadow-xs"
                          aria-label="Kurang satu"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#3B1F0E] px-2.5">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-lg bg-white text-[#3B1F0E] hover:bg-orange-100 cursor-pointer shadow-xs"
                          aria-label="Tambah satu"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-[#EA580C]">
                        {formatRupiah(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Pesan Ramah Minimal Pemesanan jika di bawah kuota */}
                    {isUnderMin && (
                      <div className="flex items-center gap-1.5 bg-amber-50 text-amber-800 text-[11px] p-2 rounded-lg font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                        <span>
                          Minimal pemesanan menu ini adalah {item.minOrder} porsi (kurang {item.minOrder - item.quantity} porsi lagi).
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Drawer: Kupon Promo & Total */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-orange-100 space-y-4">
              {/* Input Kode Promo */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder='Punya kode promo? (contoh: "FAZZA10")'
                      className="w-full bg-[#FFF8F0] pl-9 pr-3 py-2 text-xs rounded-xl border border-orange-200 focus:outline-none focus:ring-1 focus:ring-[#EA580C] uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#3B1F0E] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-200">
                    <span className="font-semibold">
                      Kupon &quot;{appliedPromo}&quot; aktif ({formatRupiah(discountAmount)} diskon)
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-900 font-bold underline text-[11px]"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </form>

              {/* Rincian Angka */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-orange-100">
                <div className="flex justify-between">
                  <span>Subtotal Menu</span>
                  <span className="font-bold text-stone-800">{formatRupiah(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Potongan Diskon Promo</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="italic text-stone-500">Dihitung di langkah berikutnya</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[#3B1F0E] pt-2 border-t border-orange-200">
                  <span>Estimasi Total</span>
                  <span className="text-[#EA580C] font-serif text-lg">
                    {formatRupiah(cartSubtotal - discountAmount)}
                  </span>
                </div>
              </div>

              {/* Peringatan jika ada item di bawah kuota minimal */}
              {hasMinOrderIssues && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg leading-tight">
                  💡 Catatan: Beberapa menu belum memenuhi kuota minimum pemesanan. Anda tetap dapat melanjutkan dan mengonfirmasikannya dengan admin.
                </p>
              )}

              {/* Tombol Lanjut ke Checkout */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <span>Lanjut Pengisian Data Pesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
