'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import GigCard from '@/components/ui/GigCard';

export default function PublicProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'gigs' | 'reviews'>('gigs');

  // Mock Data User
  const user = {
    name: "Budi Santoso",
    username: params.username || "budisans",
    role: "Solver Level 1",
    bio: "Spesialis antri tiket & teman curhat pendengar setia. Fast respon 24/7 kecuali pas tidur.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    stats: {
      rating: 4.9,
      reviews: 12,
      onTime: "100%"
    },
    joined: "Des 2023"
  };

  // Mock Gigs (Lapak)
  const userGigs = [
    {
      id: 1,
      title: "Jasa Antri Tiket Konser (Pasti Dapet)",
      price: "150K",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=400&q=80",
      user: { name: user.name, username: user.username as string, avatar: user.avatar },
      type: 'solver' as const,
      isPremium: true
    },
    {
      id: 2,
      title: "Teman Curhat via Call (No Judge)",
      price: "50K/jam",
      image: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80",
      user: { name: user.name, username: user.username as string, avatar: user.avatar },
      type: 'solver' as const
    }
  ];

  // Mock Reviews
  const reviews = [
    { id: 1, user: "Siska", text: "Joki antrinya gercep parah! Dapet tiket VIP sesuai request.", rating: 5, date: "2 hari lalu" },
    { id: 2, user: "Doni", text: "Enak diajak ngobrol, pendengar yang baik.", rating: 4, date: "1 minggu lalu" }
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header Navigation (Transparent) */}
      {/* FIX: Tambah 'max-w-5xl mx-auto left-0 right-0' biar tombolnya gak nempel banget di pinggir layar lebar */}
      <div className="fixed top-16 md:top-20 w-full z-40 p-4 flex justify-between items-center pointer-events-none max-w-5xl mx-auto left-0 right-0">
        <Link href="/lounge" className="w-10 h-10 bg-white/90 backdrop-blur border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 shadow-hard btn-brutal pointer-events-auto">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <button 
          onClick={() => alert('Link Profile Disalin!')}
          className="w-10 h-10 bg-white/90 backdrop-blur border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 shadow-hard btn-brutal pointer-events-auto"
        >
          <i className="fa-solid fa-share-nodes"></i>
        </button>
      </div>

      {/* Cover & Avatar Area */}
      <div className="relative mb-16">
        <div className="h-48 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent rounded-full blur-3xl opacity-50"></div>
        </div>
        
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 bg-white p-1 rounded-3xl border-4 border-slate-900 shadow-hard relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-2xl bg-surface" />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-sm" title="Verified Human">
              <i className="fa-solid fa-check text-xs"></i>
            </div>
          </div>
        </div>
      </div>

      {/* FIX: Wrapper Utama (Max Width) */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        
        {/* Identity & Stats */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1 flex items-center justify-center gap-2">
            {user.name}
          </h1>
          <p className="text-sm font-bold text-slate-500 mb-4 max-w-md mx-auto">"{user.bio}"</p>
          
          {/* Tags */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            <span className="bg-indigo-100 text-primary border border-indigo-200 px-3 py-1 rounded-full text-[10px] font-black uppercase">{user.role}</span>
            <span className="bg-green-100 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[10px] font-black uppercase">Fast Respon</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Sukses</p>
              <p className="text-lg font-black text-slate-900">{user.stats.reviews}</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
              <p className="text-lg font-black text-slate-900 flex items-center justify-center gap-1">
                {user.stats.rating} <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
              </p>
            </div>
            <div className="bg-white p-3 rounded-2xl border-2 border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">On Time</p>
              <p className="text-lg font-black text-slate-900">{user.stats.onTime}</p>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-t-3xl border-2 border-slate-900 min-h-[50vh] px-4 py-6 shadow-hard">
          
          {/* Tab Switcher */}
          <div className="flex p-1 bg-surface rounded-xl border-2 border-slate-200 mb-6 sticky top-24 z-30">
            <button 
              onClick={() => setActiveTab('gigs')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${activeTab === 'gigs' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Lapak Jasa
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${activeTab === 'reviews' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Review ({reviews.length})
            </button>
          </div>

          {/* TAB 1: GIGS LIST */}
          {activeTab === 'gigs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userGigs.map((gig) => (
                <GigCard key={gig.id} {...gig} />
              ))}
            </div>
          )}

          {/* TAB 2: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white border-2 border-slate-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-200 rounded-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user}`} alt="User" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">@{review.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{review.date}</span>
                  </div>
                  <div className="text-yellow-400 text-[10px] mb-2">
                    {[...Array(review.rating)].map((_, i) => <i key={i} className="fa-solid fa-star"></i>)}
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">"{review.text}"</p>
                </div>
              ))}
            </div>
          )}

          {/* Disclaimer Footer */}
          <div className="mt-12 text-center border-t border-slate-100 pt-6">
            <p className="text-[10px] text-slate-400 font-bold">Member sejak {user.joined} • Jasurd Verified</p>
          </div>
        </div>

      </div>

      {/* Sticky Hire Button (Mobile Only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-4 z-40 md:hidden">
        <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold shadow-hard border-2 border-slate-900 text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition">
          Chat & Hire <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>

    </div>
  );
}