'use client';

import { useState, useEffect } from 'react';
import GigCard from '@/components/ui/GigCard';

export default function LoungePage() {
  const [activeTab, setActiveTab] = useState<'solver' | 'seeker'>('solver');
  
  // LOGIC HIDE ON SCROLL
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Kalau scroll ke bawah lebih dari 50px, sembunyikan header
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        // Kalau scroll ke atas, munculkan header
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

  // Mock Data Seeker
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

  const getTabClasses = (tab: 'solver' | 'seeker') => {
    // DIET: py-2 jadi py-1.5, text-xs jadi text-[10px]
    const base = "px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-black transition-all flex items-center gap-2";
    if (activeTab === tab) {
      return `${base} bg-slate-900 text-white shadow-sm`;
    }
    return `${base} text-slate-500 hover:text-slate-900`;
  };

  return (
    <div className="min-h-screen bg-pattern pb-24">
      
      {/* 
        SMART HEADER 
        - top-16: Posisi awal di bawah Navbar Global
        - transition-transform: Biar geraknya halus
        - translate-y: Kalau !isVisible, dia geser ke atas (ngumpet)
      */}
      <div className={`
        sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-900 px-4 md:px-6 py-2 shadow-sm transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
      `}>
        <div className="max-w-7xl mx-auto">
          
          {/* Top Row: Title & Tabs (Lebih Rapat) */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <h1 className="text-xl md:text-3xl font-black text-slate-900">
              Lounge <span className="text-primary text-lg align-top">●</span>
            </h1>
            
            {/* Tab Switcher Compact */}
            <div className="bg-surface p-1 rounded-xl border-2 border-slate-900 shadow-hard-sm flex">
              <button onClick={() => setActiveTab('solver')} className={getTabClasses('solver')}>
                <i className="fa-solid fa-briefcase"></i> Solver
              </button>
              <button onClick={() => setActiveTab('seeker')} className={getTabClasses('seeker')}>
                <i className="fa-solid fa-user"></i> Seeker
              </button>
            </div>
          </div>

          {/* Search Bar Compact */}
          <div className="relative group z-20 mb-2">
            <div className="absolute inset-0 bg-slate-900 rounded-xl translate-y-0.5 translate-x-0.5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
            {/* DIET: p-1.5 jadi p-1 */}
            <div className="relative flex bg-white border-2 border-slate-900 rounded-xl p-1 items-center shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-3 text-sm"></i>
              {/* DIET: py-2 jadi py-1.5, text-sm jadi text-xs */}
              <input 
                type="text" 
                placeholder={activeTab === 'solver' ? "Cari jasa..." : "Cari bantuan..."}
                className="w-full px-2 py-1.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 font-bold text-xs md:text-sm"
              />
              <button className="bg-accent text-slate-900 px-3 py-1.5 rounded-lg font-black hover:bg-accent-hover transition border-2 border-slate-900 text-[10px] uppercase tracking-wide">
                Cari
              </button>
            </div>
          </div>

          {/* Categories Chips Compact */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
             {['#Jastip', '#TemanCurhat', '#JokiAntri', '#SurpriseUltah', '#Gaming', '#Absurd'].map((tag) => (
               <span 
                 key={tag} 
                 // DIET: px-3 jadi px-2, py-1.5 jadi py-1, text-xs jadi text-[10px]
                 className="flex-shrink-0 px-2 py-1 bg-surface border-2 border-slate-200 text-slate-600 rounded-md text-[10px] font-bold hover:border-slate-900 hover:text-slate-900 cursor-pointer transition select-none flex items-center gap-1"
               >
                 {tag.replace('#', '')}
               </span>
             ))}
          </div>

        </div>
      </div>

      {/* Content Grid */}
      {/* DIET: pt-6 jadi pt-4 */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
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
        
        <div className="mt-8 text-center pb-12">
          <p className="text-[10px] font-bold text-slate-400">
            Udah mentok bawah nih. <br/>
            <span className="text-primary cursor-pointer hover:underline">Load More</span>
          </p>
        </div>
      </div>

    </div>
  );
}
