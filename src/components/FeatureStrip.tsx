/**
 * @license
 * FAZZA FOOD - Komponen Strip Keunggulan (4 Poin Utama)
 */

import React from 'react';
import { Leaf, Sparkles, Clock, Coins } from 'lucide-react';

export const FeatureStrip: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Bahan Segar Harian',
      desc: 'Bahan baku berkualitas, dibeli segar setiap pagi tanpa pengawet berbahaya.',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    },
    {
      icon: Sparkles,
      title: 'Dapur Higienis',
      desc: 'Standar kebersihan ketat: sarung tangan, masker, dan dapur bersegel rapi.',
      color: 'bg-orange-50 text-orange-700 border-orange-200/60',
    },
    {
      icon: Clock,
      title: 'Tepat Waktu',
      desc: 'Pesanan dikirim tepat pada jam yang dijanjikan, tiba dalam kondisi hangat.',
      color: 'bg-amber-50 text-amber-700 border-amber-200/60',
    },
    {
      icon: Coins,
      title: 'Harga Bersahabat',
      desc: 'Porsi melimpah dengan harga terjangkau mulai dari Rp15.000 per porsi.',
      color: 'bg-stone-100 text-stone-800 border-stone-200/60',
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-orange-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFF8F0]/50 hover:bg-[#FFF8F0] border border-orange-100 transition-all hover:shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#3B1F0E]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#3B1F0E]/75 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
