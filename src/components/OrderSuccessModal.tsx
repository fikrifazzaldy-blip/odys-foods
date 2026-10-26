/**
 * @license
 * FAZZA FOOD - Komponen Modal Sukses Pemesanan & Kirim WhatsApp
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  AlertTriangle,
  X,
  FileText,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { generateWhatsAppMessage, createWhatsAppUrl } from '../utils/whatsapp';

export const OrderSuccessModal: React.FC = () => {
  const {
    activeOrderSuccess,
    setActiveOrderSuccess,
    config,
    showToast,
    formatRupiah,
  } = useStore();

  const [copied, setCopied] = useState(false);

  if (!activeOrderSuccess) return null;

  const order = activeOrderSuccess;
  const isWaConfigured = Boolean(config.whatsappNumber && config.whatsappNumber.trim() !== '');
  const messageText = generateWhatsAppMessage(order, config);

  const handleSendWhatsApp = () => {
    if (!isWaConfigured) {
      showToast('Nomor WhatsApp admin belum diatur di Pengaturan Toko.', 'error');
      return;
    }
    const url = createWhatsAppUrl(config.whatsappNumber, messageText);
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    showToast('Teks pesanan berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header Sukses */}
        <div className="bg-emerald-600 text-white p-6 text-center relative">
          <button
            onClick={() => setActiveOrderSuccess(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-lg"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-serif font-bold text-2xl">Pesanan Berhasil Disiapkan!</h3>
          <p className="text-xs text-white/90 mt-1">
            Nomor Pesanan Anda: <strong className="font-mono text-amber-200">#{order.orderNumber}</strong>
          </p>
        </div>

        {/* Status Tegas: Belum Dikonfirmasi */}
        <div className="p-6 space-y-4">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-sm text-amber-950 mb-0.5">
                PENTING: Pesanan BELUM Resmi Dikonfirmasi
              </strong>
              <span>
                Pesanan baru sah dan dijadwalkan oleh dapur kami setelah disetujui oleh admin via WhatsApp.
                Silakan tekan tombol di bawah untuk mengirim rincian ke WhatsApp admin.
              </span>
            </div>
          </div>

          {/* Rincian Singkat */}
          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-orange-200 text-xs space-y-2">
            <div className="flex justify-between font-medium">
              <span className="text-stone-600">Pemesan:</span>
              <span className="font-bold text-[#3B1F0E]">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-stone-600">Jadwal Acara:</span>
              <span className="font-bold text-[#3B1F0E]">
                {order.customer.deliveryDate} (Pukul {order.customer.deliveryTime} WIB)
              </span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-stone-600">Jumlah Menu:</span>
              <span className="font-bold text-[#3B1F0E]">
                {order.items.reduce((s, i) => s + i.quantity, 0)} porsi
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-[#EA580C] pt-2 border-t border-orange-200">
              <span>Total Tagihan:</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
          </div>

          {/* Jika Nomor WA Belum Diatur */}
          {!isWaConfigured && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800">
              <strong>Peringatan Pengelola:</strong> Nomor WhatsApp bisnis belum diatur di menu Pengaturan Admin. Tombol WhatsApp dinonaktifkan sementara. Anda tetap dapat menggunakan tombol Salin Rincian di bawah.
            </div>
          )}

          {/* Tombol Utama Kirim WhatsApp */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSendWhatsApp}
              disabled={!isWaConfigured}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                isWaConfigured
                  ? 'bg-[#25D366] hover:bg-[#20ba59] text-white shadow-emerald-500/20 active:scale-98'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Kirim Rincian Pesanan ke WhatsApp</span>
            </button>

            {/* Tombol Salin Rincian Teks */}
            <button
              onClick={handleCopyMessage}
              className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs border border-orange-200 bg-white hover:bg-orange-50 text-[#3B1F0E] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Teks Berhasil Disalin!' : 'Salin Teks Pesanan Manual'}</span>
            </button>
          </div>

          <p className="text-[11px] text-center text-stone-500 pt-1">
            Data pesanan telah otomatis tersimpan di daftar pesanan sistem kami.
          </p>
        </div>
      </div>
    </div>
  );
};
