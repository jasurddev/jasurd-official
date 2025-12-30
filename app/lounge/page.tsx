'use client';

import { useState } from 'react';
import GigCard from '@/components/ui/GigCard';
import { usePathname } from 'next/navigation'; // Untuk highlight Nav

export default function LoungePage() {
  const pathname = usePathname(); // Dapatkan path saat ini
  const [activeTab, setActiveTab] = useState<'solver' | 'seeker'>('solver');

  // Mock Data Solver
  const solverGigs = [
    {
      id: 1,
      title: "Jasa Setup PC Gaming Rakitan",
      price: "150K",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
      user: { name: "Alex", username: "AlexTech", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
      type: 'solver' as const,
      isPremium: true
    },
    {
      id: 2,
      title: "Jasa Temenin Lari Pagi (Pace Santuy)",
      price: "30K",
      image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=400&q=80",
      user: { name: "Rian", username: "RianRunner", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rian" },
      type: 'solver' as const
    },
    {
      id: 3,
      title: "Joki Antri Tiket Konser",
      price: "500K",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=400&q=80",
      user: { name: "Siska", username: "SiPalingTiket", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siska" },
      type: 'solver' as const
    },
    {
      id: 4,
      title: "Tim Hore Surprise Ultah",
      price: "50K",
      image: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&w=400&q=80",
      user: { name: "Budi", username: "PartyGuy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
      type: 'solver' as const
    }
  ];

  // Dummy Data Seeker
  const seekerGigs = [
    {
      id: 101,
      title: "Butuh Pacar Sewaan buat Kondangan Mantan",
      price: "300K",
      user: { name: "Galau", username: "SadBoy99", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sad" },
      type: 'seeker' as const
    },
    {
      id: 102,
      title: "Cari Jastip Gudeg Yu Djum ke Jakarta Besok",
      price: "Fee 50K",
      user: { name: "Lapar", username: "FoodieJkt", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Food" },
      type: 'seeker' as const
    }
  ];

  // Helper untuk highlight tab aktif
  const getTabClasses = (tab: 'solver' | 'seeker') => {
    const base = "px-6 py-2 rounded-lg text-xs font-black transition-all flex items-center gap-2";
    if (activeTab === tab) {
      return `${base} bg-slate-900 text-white shadow-sm`;
    }
    return `${base} text-slate-500 hover:text-slate-900`;
  };

  return (
    <div className="min-h-screen bg-pattern pb-24">
      
      {/* Sticky Header & Filter */}
      {/* FIX: Tambah padding atas biar gak ketutup header global */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-900 px-4 md:px-6 py-4 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Row: Title & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-black text-slate-900">
              Lounge <span className="text-primary text-xl align-top">●</span>
            </h1>
            
            {/* Tab Switcher */}
            <div className="bg-surface p-1 rounded-xl border-2 border-slate-900 shadow-hard-sm flex self-start md:self-auto">
              <button 
                onClick={() => setActiveTab('solver')}
                className={getTabClasses('solver')}
              >
                <i className="fa-solid fa-briefcase"></i> Solver
              </button>
              <button 
                onClick={() => setActiveTab('seeker')}
                className={getTabClasses('seeker')}
              >
                <i className="fa-solid fa-user"></i> Seeker
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group z-20 mb-4">
            <div className="absolute inset-0 bg-slate-900 rounded-2xl translate-y-1 translate-x-1 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
            <div className="relative flex bg-white border-2 border-slate-900 rounded-2xl p-1.5 items-center shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-4 text-lg"></i>
              <input 
                type="text" 
                placeholder={activeTab === 'solver' ? "Cari jasa unik..." : "Cari orang yang butuh bantuan..."}
                className="w-full px-3 py-2 bg-transparent outline-none text-slate-900 placeholder-slate-400 font-bold text-sm"
              />
              <button className="bg-accent text-slate-900 px-4 py-2 rounded-xl font-black hover:bg-accent-hover transition border-2 border-slate-900 text-xs uppercase tracking-wide">
                Cari
              </button>
            </div>
          </div>

          {/* Categories (Horizontal Scroll) */}
          {/* FIX: Tambah padding bawah biar gak mepet ke konten */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
             {['#Jastip', '#TemanCurhat', '#JokiAntri', '#SurpriseUltah', '#Gaming', '#Absurd'].map((tag) => (
               <span 
                 key={tag} 
                 className="flex-shrink-0 px-3 py-1.5 bg-surface border-2 border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:border-slate-900 hover:text-slate-900 cursor-pointer transition select-none flex items-center gap-1"
               >
                 <i className="fa-solid fa-hashtag text-[10px] text-primary"></i> {tag.replace('#', '')}
               </span>
             ))}
          </div>

        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {activeTab === 'solver' ? (
            solverGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
            ))
          ) : (
            seekerGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
            ))
          )}
        </div>
        
        {/* Empty State */}
        <div className="mt-12 text-center pb-12">
          <p className="text-xs font-bold text-slate-400">
            Udah mentok bawah nih. <br/>
            <span className="text-primary cursor-pointer hover:underline">Load More</span>
          </p>
        </div>
      </div>

    </div>
  );
}