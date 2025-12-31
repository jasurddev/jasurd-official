'use client';

import { useState, useEffect } from 'react';
import GigCard from '@/components/ui/GigCard';
import { createClient } from '@/lib/supabase';

export default function LoungePage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'solver' | 'seeker'>('solver');
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data Real (Filtered by Type)
  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar_url,
            is_verified
          )
        `)
        .eq('is_active', true)
        .eq('type', activeTab) // <--- FILTER DI SINI (solver/seeker)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gigs:', error);
      } else {
        setGigs(data || []);
      }
      setLoading(false);
    };

    fetchGigs();
  }, [supabase, activeTab]); // <--- Re-fetch kalau tab berubah

  // Format Data biar sesuai sama GigCard
  const formattedGigs = gigs.map(gig => ({
    id: gig.id,
    title: gig.title,
    price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(gig.price) + (gig.unit !== 'flat' ? `/${gig.unit}` : ''),
    image: gig.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80", // Placeholder kalau gak ada gambar
    category: gig.category,
    user: {
      name: gig.profiles?.full_name || "Anonim",
      username: gig.profiles?.username || "user",
      avatar: gig.profiles?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd",
      verified: gig.profiles?.is_verified
    },
    type: 'solver', // Sementara semua dianggap solver dulu
    isPremium: false
  }));

  const getTabClasses = (tab: 'solver' | 'seeker') => {
    const base = "px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-black transition-all flex items-center gap-2";
    if (activeTab === tab) return `${base} bg-slate-900 text-white shadow-sm`;
    return `${base} text-slate-500 hover:text-slate-900`;
  };

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-16 md:pt-20">
      
      {/* Sticky Header */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-900 px-4 md:px-6 py-2 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h1 className="text-xl md:text-3xl font-black text-slate-900">
              Lounge <span className="text-primary text-lg align-top">●</span>
            </h1>
            <div className="bg-surface p-1 rounded-xl border-2 border-slate-900 shadow-hard-sm flex">
              <button onClick={() => setActiveTab('solver')} className={getTabClasses('solver')}>
                <i className="fa-solid fa-briefcase"></i> Solver
              </button>
              <button onClick={() => setActiveTab('seeker')} className={getTabClasses('seeker')}>
                <i className="fa-solid fa-user"></i> Seeker
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group z-20 mb-2">
            <div className="absolute inset-0 bg-slate-900 rounded-xl translate-y-0.5 translate-x-0.5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
            <div className="relative flex bg-white border-2 border-slate-900 rounded-xl p-1 items-center shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-3 text-sm"></i>
              <input type="text" placeholder="Cari jasa..." className="w-full px-2 py-1.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 font-bold text-xs md:text-sm" />
              <button className="bg-accent text-slate-900 px-3 py-1.5 rounded-lg font-black hover:bg-accent-hover transition border-2 border-slate-900 text-[10px] uppercase tracking-wide">Cari</button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        {loading ? (
          <div className="text-center py-20"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-300"></i></div>
        ) : formattedGigs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {formattedGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} type="solver" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-bold">Belum ada jasa nih. Jadilah yang pertama!</div>
        )}
      </div>

    </div>
  );
}