'use client';

import { useState } from 'react';
import { Search, Filter, Briefcase, User, Sparkles } from 'lucide-react';
import GigCard from '@/components/ui/GigCard';

// Dummy Data (Tetap sama kayak kemarin)
const DUMMY_GIGS = [
  { id: 1, title: "Jasa Menemani Kondangan Mantan Biar Gak Kelihatan Ngenes", price: "Rp 150rb", username: "RianSadboy", category: "Social", rating: 4.9, verified: true },
  { id: 2, title: "Joki Antri Tiket Konser Coldpley (Garansi Tembus)", price: "Rp 500rb", username: "SiskaTicket", category: "Joki", rating: 5.0, verified: true },
  { id: 3, title: "Bangunin Sahur Pake Suara Anime (Onii-chan)", price: "Rp 50rb", username: "WibuElit", category: "Voice", rating: 4.7, verified: false },
  { id: 4, title: "Curhat 1 Jam Tanpa Dihakimi + Solusi Ngawur", price: "Rp 75rb", username: "PsikologKw", category: "Curhat", rating: 4.8, verified: true },
  { id: 5, title: "Edit Foto Mantan Jadi Alien buat Konten TikTok", price: "Rp 25rb", username: "EditorBerkelas", category: "Creative", rating: 4.5, verified: false },
  { id: 6, title: "Partner Debat Kusir Politik di Grup WhatsApp Keluarga", price: "Rp 100rb", username: "BuzzerPensiun", category: "Jasa Unik", rating: 4.9, verified: true },
  { id: 7, title: "Jastip Sate Kambing H. Marno Brebes (Kirim Paxel)", price: "Rp 20rb", username: "WargaLokal", category: "Jastip", rating: 5.0, verified: true },
  { id: 8, title: "Titip Absen Kuliah Online (Aman Terkendali)", price: "Rp 15rb", username: "MabaAbadi", category: "Joki", rating: 4.2, verified: false },
];

export default function LoungePage() {
  const [activeTab, setActiveTab] = useState<'seeker' | 'solver'>('seeker');

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Lounge */}
      <section className="bg-white border-b-2 md:border-b-4 border-black py-6 md:py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Judul Responsif */}
          <h1 className="text-4xl md:text-7xl font-black uppercase mb-2 tracking-tighter leading-none">
            THE LOUNGE
          </h1>
          <p className="text-sm md:text-2xl font-bold text-blue-600 tracking-normal flex items-center gap-2">
            <Sparkles className="w-4 h-4 md:w-6 md:h-6" />
            Pasar Gelap Jasa Absurd
          </p>
          
          {/* Search Bar Brutalist (Compact di HP) */}
          <div className="mt-6 flex gap-2 md:gap-4">
            <div className="flex-1 relative">
                <input 
                    type="text" 
                    placeholder="Cari: Joki, Curhat, Jastip..." 
                    className="w-full h-10 md:h-14 border-2 md:border-4 border-black pl-3 md:pl-4 pr-10 font-bold text-sm md:text-lg focus:outline-none focus:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <Search className="absolute right-3 top-2.5 md:top-4 w-4 h-4 md:w-6 md:h-6 text-black" />
            </div>
            <button className="h-10 md:h-14 bg-black text-white px-4 md:px-8 font-bold text-sm md:text-lg border-2 md:border-4 border-black active:scale-95 transition-all flex items-center gap-2 justify-center">
                <Filter className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden md:inline">Filter</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Switcher (Seeker vs Solver) */}
      <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-sm border-b border-black/10 py-3 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-center">
            <div className="bg-white border-2 border-black p-1 rounded-full flex shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <button 
                    onClick={() => setActiveTab('seeker')}
                    className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-base transition-all flex items-center gap-2 ${activeTab === 'seeker' ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <User className="w-3 h-3 md:w-4 md:h-4" /> Cari Jasa
                </button>
                <button 
                    onClick={() => setActiveTab('solver')}
                    className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-base transition-all flex items-center gap-2 ${activeTab === 'solver' ? 'bg-yellow-400 text-black border border-black' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                    <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> Cari Cuan
                </button>
            </div>
        </div>
      </div>

      {/* Content Grid */}
      <section className="max-w-6xl mx-auto px-3 md:px-4 mt-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm md:text-2xl font-black italic bg-black text-white px-2 py-0.5 inline-block transform -rotate-1">
                {activeTab === 'seeker' ? '🔥 LAGI RAME' : '💰 MISI TERSEDIA'}
            </h2>
            <span className="text-xs md:text-sm font-bold underline cursor-pointer hover:text-blue-600">Lihat Semua &rarr;</span>
        </div>

        {/* GRID SYSTEM RESPONSIVE:
            - grid-cols-2: Di HP (2 kolom)
            - md:grid-cols-3: Di Tablet
            - lg:grid-cols-4: Di Laptop
            - gap-3: Jarak antar kartu rapet di HP
         */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
            {DUMMY_GIGS.map((gig) => (
                <GigCard 
                    key={gig.id}
                    title={gig.title}
                    price={gig.price}
                    username={gig.username}
                    category={gig.category}
                    rating={gig.rating}
                    verified={gig.verified}
                />
            ))}
        </div>
      </section>

    </main>
  );
}