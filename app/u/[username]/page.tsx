'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import GigCard from '@/components/ui/GigCard';
import { createClient } from '@/lib/supabase';

export default function PublicProfilePage() {
  const params = useParams();
  const supabase = createClient();
  
  const [profile, setProfile] = useState<any>(null);
  const [gigs, setGigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'gigs' | 'reviews'>('gigs');

  useEffect(() => {
    const fetchData = async () => {
      // 1. Cari Profile berdasarkan Username
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', params.username)
        .single();

      if (userError || !userData) {
        setLoading(false);
        return; // User not found
      }

      setProfile(userData);

      // 2. Cari Gigs milik user tersebut
      const { data: gigsData } = await supabase
        .from('gigs')
        .select('*')
        .eq('user_id', userData.id)
        .eq('is_active', true);

      setGigs(gigsData || []);
      setLoading(false);
    };

    fetchData();
  }, [params.username, supabase]);

  if (loading) return <div className="min-h-screen bg-surface flex items-center justify-center">Loading...</div>;
  if (!profile) return <div className="min-h-screen bg-surface flex items-center justify-center font-bold text-slate-500">User gak ketemu, Bos.</div>;

  // Mock Reviews (Sementara)
  const reviews = [
    { id: 1, user: "Siska", text: "Joki antrinya gercep parah! Dapet tiket VIP sesuai request.", rating: 5, date: "2 hari lalu" },
    { id: 2, user: "Doni", text: "Enak diajak ngobrol, pendengar yang baik.", rating: 4, date: "1 minggu lalu" }
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      
      {/* Header Nav */}
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

      {/* Cover & Avatar */}
      <div className="relative mb-16">
        <div className="h-48 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent rounded-full blur-3xl opacity-50"></div>
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-28 h-28 bg-white p-1 rounded-3xl border-4 border-slate-900 shadow-hard relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt={profile.full_name} className="w-full h-full object-cover rounded-2xl bg-surface" />
            {profile.is_verified && (
              <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                <i className="fa-solid fa-check text-xs"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Identity */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">{profile.full_name}</h1>
        <p className="text-sm font-bold text-slate-500 mb-4 max-w-md mx-auto">"{profile.bio || 'Belum ada bio.'}"</p>
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          <span className="bg-indigo-100 text-primary border border-indigo-200 px-3 py-1 rounded-full text-[10px] font-black uppercase">{profile.role}</span>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-t-3xl border-2 border-slate-900 min-h-[50vh] px-4 py-6 shadow-hard">
          <div className="flex p-1 bg-surface rounded-xl border-2 border-slate-200 mb-6 sticky top-24 z-30">
            <button onClick={() => setActiveTab('gigs')} className={`flex-1 py-2 rounded-lg text-xs font-black transition ${activeTab === 'gigs' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Lapak Jasa</button>
            <button onClick={() => setActiveTab('reviews')} className={`flex-1 py-2 rounded-lg text-xs font-black transition ${activeTab === 'reviews' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>Review (0)</button>
          </div>

          {activeTab === 'gigs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gigs.length > 0 ? gigs.map((gig) => (
                <GigCard 
                  key={gig.id} 
                  id={gig.id}
                  slug={gig.slug} // FIX: Tambahkan prop slug di sini
                  title={gig.title}
                  price={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(gig.price)}
                  image={gig.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80"}
                  category={gig.category}
                  user={{ name: profile.full_name, username: profile.username, avatar: profile.avatar_url, verified: profile.is_verified }}
                  type="solver"
                />
              )) : <p className="text-center text-slate-400 text-sm font-bold py-10">Belum ada jasa yang diposting.</p>}
            </div>
          )}

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
        </div>
      </div>

    </div>
  );
}