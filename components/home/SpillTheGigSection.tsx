'use client';

import React from 'react';
import SpillCard from '@/components/ui/SpillCard';

const SpillTheGigSection = () => {
  const spills = [
    {
      id: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko",
      name: "@JokoSantuy",
      role: "Solver Level 3",
      content: "Kirain becanda minta ditemenin makan siang doang. Taunya dibayarin makan AYCE + dapet tip gede.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      cuan: "Total Cuan: Rp 350.000",
      verified: true,
      stats: { fire: 12, laugh: 5 }
    },
    {
      id: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
      name: "@BellaCia",
      role: "Newbie",
      content: "Dapet job bangunin sahur pake suara Anime 'Onii-chan'. Pas nelpon, yang angkat bapaknya. Langsung kena ulti ceramah subuh 😭",
      isFail: true,
      stats: { fire: 2, laugh: 145 }
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-accent border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Spill The Gig 🗣️</h2>
          <button onClick={() => alert("Segera Hadir!")} className="bg-white border-2 border-slate-900 px-3 py-1.5 rounded-lg text-[10px] font-black shadow-hard-sm hover:shadow-none active:translate-y-0.5 transition">
            <i className="fa-solid fa-pen-nib"></i> Tulis Spill
          </button>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {spills.map((spill) => <SpillCard key={spill.id} {...spill} />)}
        </div>
      </div>
    </section>
  );
};

export default SpillTheGigSection;