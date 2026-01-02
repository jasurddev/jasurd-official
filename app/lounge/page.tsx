'use client';

import { useState, useEffect } from 'react';
import GigCard from '@/components/ui/GigCard';
import { createClient } from '@/lib/supabase';

export default function LoungePage() {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<'solver' | 'seeker'>('solver');
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Hide Header Logic
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Fetch Data (With Search & Filter)
  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      
      let query = supabase
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
        .eq('type', activeTab)
        .order('created_at', { ascending: false });

      // Filter Search
      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      // Filter Category
      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching gigs:', error);
      } else {
        setGigs(data || []);
      }
      setLoading(false);
    };

    // Debounce Search (Tunggu 500ms setelah ngetik baru fetch)
    const timeoutId = setTimeout(() => {
      fetchGigs();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [supabase, activeTab, searchQuery, selectedCategory]);

  const formattedGigs = gigs.map(gig => ({
    id: gig.id,
    slug: gig.slug,
    title: gig.title,
    price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(gig.price) + (gig.unit !== 'flat' ? `/${gig.unit}` : ''),
    image: gig.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    category: gig.category,
    user: {
      name: gig.profiles?.full_name || "Anonim",
      username: gig.profiles?.username || "user",
      avatar: gig.profiles?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd",
      verified: gig.profiles?.is_verified
    },
    type: activeTab,
    isPremium: false
  }));

  const getTabClasses = (tab: 'solver' | 'seeker') => {
    const base = "px-4 py-1.5 rounded-lg text-[10px] md:text-xs font-black transition-all flex items-center gap-2";
    if (activeTab === tab) return `${base} bg-slate-900 text-white shadow-sm`;
    return `${base} text-slate-500 hover:text-slate-900`;
  };

  const categories = ['All', 'Jastip', 'Social', 'Digital', 'Absurd'];

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-16 md:pt-20">
      
      <div className={`
        sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b-2 border-slate-900 px-4 md:px-6 py-2 shadow-sm transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-[150%]'}
      `}>
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

          <div className="relative group z-20 mb-2">
            <div className="absolute inset-0 bg-slate-900 rounded-xl translate-y-0.5 translate-x-0.5 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
            <div className="relative flex bg-white border-2 border-slate-900 rounded-xl p-1 items-center shadow-sm">
              <i className="fa-solid fa-magnifying-glass text-slate-400 ml-3 text-sm"></i>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === 'solver' ? "Cari jasa..." : "Cari bantuan..."} 
                className="w-full px-2 py-1.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 font-bold text-xs md:text-sm" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="mr-2 text-slate-400 hover:text-red-500">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
             {categories.map((cat) => (
               <span 
                 key={cat} 
                 onClick={() => setSelectedCategory(cat)}
                 className={`
                   flex-shrink-0 px-2 py-1 border-2 rounded-md text-[10px] font-bold cursor-pointer transition select-none flex items-center gap-1
                   ${selectedCategory === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-surface border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}
                 `}
               >
                 {cat === 'All' ? 'Semua' : `#${cat}`}
               </span>
             ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">
        {loading ? (
          <div className="text-center py-20"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-300"></i></div>
        ) : formattedGigs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {formattedGigs.map((gig) => (
              <GigCard key={gig.id} {...gig} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-bold">
            {searchQuery ? `Gak nemu "${searchQuery}" nih.` : "Belum ada jasa di kategori ini."}
          </div>
        )}
      </div>

    </div>
  );
}