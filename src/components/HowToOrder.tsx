/**
 * @license
 * FAZZA FOOD - Komponen Cara Pemesanan (Timeline 4 Langkah)
 */

import React from 'react';
import { Utensils, CalendarCheck, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowToOrder: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Utensils,
      title: 'Pilih Menu / Paket',
      desc: 'Pilih nasi box, snack box, atau paket katering sesuai kebutuhan acara Anda dan atur jumlah porsinya.',
    },
    {
      step: '02',
      icon: CalendarCheck,
      title: 'Isi Data & Jadwal',
      desc: 'Masukkan alamat pengantaran, tanggal acara (minimal H-2), waktu kirim, dan catatan khusus masakan.',
    },
    {
      step: '03',
      icon: MessageSquare,
      title: 'Kirim via WhatsApp',
      desc: 'Sistem merangkum pesanan menjadi format chat rapi dan otomatis mengarahkannya ke WhatsApp admin resmi.',
    },
    {
      step: '04',
      icon: CheckCircle2,
      title: 'Konfirmasi & Pembayaran',
      desc: 'Admin mengecek jadwal dapur, mengonfirmasi pesanan, lalu Anda menyelesaikan pembayaran via transfer/QRIS.',
    },
  ];

  return (
    <section id="cara-pesan" className="py-16 sm:py-24 bg-white border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-orange-100 px-3.5 py-1.5 rounded-full inline-block">
            Alur Pemesanan Mudah
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#3B1F0E] mt-3">
            Hanya 4 Langkah Praktis
          </h2>
          <p className="text-sm sm:text-base text-[#3B1F0E]/75 mt-2">
            Pemesanan katering tidak pernah semudah ini. Tanpa ribet, langsung terhubung dengan admin dapur kami.
          </p>
        </div>

        {/* 4 Cards Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-[#FFF8F0] p-6 rounded-3xl border border-orange-200/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EA580C] text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif font-black text-2xl text-orange-200 group-hover:text-orange-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#3B1F0E]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3B1F0E]/75 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-orange-200/50 flex items-center gap-2 text-xs font-bold text-[#EA580C]">
                  <span>Langkah {index + 1}</span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 hidden lg:inline ml-auto" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
