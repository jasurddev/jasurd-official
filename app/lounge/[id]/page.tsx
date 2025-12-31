'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ModalOrderDetails from '@/components/modals/ModalOrderDetails';
import { createClient } from '@/lib/supabase';

// FIX: Wajib ada 'export default'
export default function GigDetailPage() {
  const params = useParams();
  const supabase = createClient();
  
  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGigDetail = async () => {
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles (
            full_name,
            username,
            avatar_url,
            role,
            is_verified
          )
        `)
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Error fetching gig:', error);
      } else {
        setGig(data);
      }
      setLoading(false);
    };

    if (params.id) fetchGigDetail();
  }, [params.id, supabase]);

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-900"></i></div>;
  
  if (!gig) return <div className="min-h-screen bg-pattern flex items-center justify-center font-bold text-slate-500">Jasa tidak ditemukan atau sudah dihapus.</div>;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-pattern pb-32 md:pb-12">
      
      {/* Navbar Placeholder (Back Button) */}
      <div className="fixed top-0 left-0 w-full z-40 px-4 py-4 pointer-events-none">
        <Link href="/lounge" className="pointer-events-auto inline-flex w-10 h-10 bg-white border-2 border-slate-900 rounded-full items-center justify-center text-slate-900 shadow-hard btn-brutal">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="h-64 md:h-96 bg-slate-900 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={gig.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"} 
          alt={gig.title} 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Title Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-slate-900">
                  {gig.category}
                </span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                  <i className="fa-solid fa-clock"></i> {gig.unit === 'flat' ? 'Sekali Bayar' : `Per ${gig.unit}`}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
                {gig.title}
              </h1>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <i className="fa-solid fa-star text-yellow-400"></i> 
                <span>New (Belum ada review)</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard-sm">
              <h3 className="font-black text-lg text-slate-900 mb-3">Deskripsi Misi</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {gig.description}
              </p>
            </div>

            {/* Seller Profile Link */}
            <Link 
              href={`/u/${gig.profiles?.username}`}
              className="bg-white rounded-3xl p-4 border-2 border-slate-900 shadow-hard-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition group"
            >
              <div className="w-16 h-16 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gig.profiles?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt={gig.profiles?.username} className="w-full h-full object-cover" />
                {gig.profiles?.is_verified && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-[10px]">
                    <i className="fa-solid fa-check"></i>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{gig.profiles?.full_name}</h4>
                <p className="text-xs font-bold text-slate-500">@{gig.profiles?.username} • {gig.profiles?.role}</p>
              </div>
              <div className="text-2xl text-slate-300 group-hover:text-slate-900 transition-colors">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </Link>

          </div>

          {/* RIGHT COLUMN: Sticky Action */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Harga</p>
              <div className="text-3xl font-black text-slate-900 mb-6">
                {formatRupiah(gig.price)}
                {gig.unit !== 'flat' && <span className="text-sm text-slate-500 font-bold">/{gig.unit}</span>}
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
              >
                Book Sekarang <i className="fa-solid fa-bolt"></i>
              </button>

              <p className="text-[10px] text-slate-400 font-bold text-center mt-4">
                <i className="fa-solid fa-shield-halved"></i> Dijamin aman pake Escrow Jasurd.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-4 z-50 flex items-center justify-between pb-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Harga</p>
          <p className="text-xl font-black text-slate-900">{formatRupiah(gig.price)}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-3 rounded-xl font-black shadow-hard border-2 border-slate-900 text-sm active:scale-95 transition"
        >
          Book Now
        </button>
      </div>

      {/* MODAL ORDER DETAILS */}
      {isModalOpen && (
        <ModalOrderDetails 
          onClose={() => setIsModalOpen(false)} 
          gigTitle={gig.title}
          price={gig.price}
          unit={gig.unit}
        />
      )}

    </div>
  );
}