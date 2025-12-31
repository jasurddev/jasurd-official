'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import ModalWithdraw from '@/components/modals/ModalWithdraw';
import ModalPostGig from '@/components/modals/ModalPostGig';

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showPostGig, setShowPostGig] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      
      setLoading(false);
    };

    getProfile();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pattern">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-slate-900"></i>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pattern pb-32 pt-20 md:pt-24">
      
      {/* Header Profil */}
      <div className="fixed top-16 md:top-20 left-0 w-full bg-white/90 backdrop-blur border-b-2 border-slate-900 z-30 px-4 py-3 md:px-6 md:py-4 transition-all">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-black text-slate-900 leading-tight">{profile?.full_name}</h2>
              <span className="inline-block bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                @{profile?.username}
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl border-2 border-red-100 hover:border-red-500 transition"
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 mt-4 space-y-6">
        
        {/* Wallet Card */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-hard border-2 border-slate-900">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Dompet</p>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-black border border-green-500/50 flex items-center gap-1">
                <i className="fa-solid fa-lock"></i> Aman
              </div>
            </div>
            <h2 className="text-4xl font-black mb-6">Rp {profile?.saldo?.toLocaleString('id-ID') || 0}</h2>
            <div className="flex gap-3">
              <button onClick={() => alert('Top Up Segera Hadir!')} className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold border border-white/20 transition active:scale-95">Top Up</button>
              <button onClick={() => setShowWithdraw(true)} className="flex-1 bg-white text-slate-900 py-3 rounded-xl text-sm font-bold border-2 border-transparent hover:border-slate-200 transition active:scale-95 shadow-sm">Tarik Dana</button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button onClick={() => setShowPostGig(true)} className="w-full py-4 bg-accent border-2 border-slate-900 rounded-2xl flex items-center justify-between px-6 shadow-hard card-hoverable group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition"><i className="fa-solid fa-plus"></i></div>
            <div className="text-left">
              <h3 className="font-black text-slate-900 text-lg">Tambah Jasa Baru</h3>
              <p className="text-xs text-slate-800 font-bold">Mulai jualan skill unik lo.</p>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-900"></i>
        </button>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-3">
           <Link href={`/u/${profile?.username}`} className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 transition flex items-center gap-3 group">
              <i className="fa-regular fa-eye text-slate-400 group-hover:text-slate-900"></i>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Lihat Profil Publik</span>
           </Link>
           
           {/* FIX: Tombol ini sekarang pake Link ke /dashboard/edit */}
           <Link href="/dashboard/edit" className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 transition flex items-center gap-3 group text-left">
              <i className="fa-solid fa-gear text-slate-400 group-hover:text-slate-900"></i>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Edit Profil</span>
           </Link>
        </div>

      </div>

      {/* MODALS */}
      {showWithdraw && <ModalWithdraw onClose={() => setShowWithdraw(false)} />}
      {showPostGig && <ModalPostGig onClose={() => setShowPostGig(false)} />}

    </div>
  );
}