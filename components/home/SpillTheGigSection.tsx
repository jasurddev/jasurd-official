'use client';

import React from 'react';
// Pastikan path ini benar mengarah ke file di atas
import SpillCard from '@/components/ui/SpillCard';

const SpillTheGigSection = () => {
  // Mock Data
  const spills = [
    {
      id: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko",
      name: "@JokoSantuy",
      role: "Solver Level 3",
      content: "Kirain becanda minta ditemenin makan siang doang. Taunya dibayarin makan AYCE + dapet tip gede. Rejeki anak soleh emang gak kemana.",
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
    },
    {
      id: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rian",
      name: "@RianRunner",
      role: "Pro Runner",
      content: "Lari pagi dapet temen baru, sehat dapet, cuan dapet. Nikmat mana lagi yang kau dustakan? Next week udah dibooking lagi.",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=600&q=80",
      cuan: "+50K",
      verified: true,
      stats: { fire: 8, laugh: 10 }
    }
  ];

  const handleToast = () => {
    alert("Segera Hadir: Fitur tulis spill bakal segera dibuka!");
  };

  return (
    <section className="py-12 bg-accent border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Spill The Gig 🗣️</h2>
            <p className="text-sm font-bold text-slate-800">
              Drama lapangan & bukti cuan nyata. <span className="bg-slate-900 text-white px-2 py-0.5 text-[10px] rounded transform -rotate-2 inline-block">No Pic = Hoax</span>
            </p>
          </div>
          <button 
            onClick={handleToast}
            className="bg-white border-2 border-slate-900 px-4 py-2 rounded-lg text-xs font-black shadow-hard-sm hover:shadow-none active:translate-y-0.5 transition cursor-pointer flex items-center gap-2"
          >
            <i className="fa-solid fa-pen-nib"></i> <span className="hidden md:inline">Tulis Spill</span>
          </button>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {spills.map((spill) => (
            <SpillCard 
              key={spill.id}
              {...spill}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpillTheGigSection;