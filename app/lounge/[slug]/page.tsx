'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ModalOrderDetails from '@/components/modals/ModalOrderDetails';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';

export default function GigDetailPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();
  
  const [gig, setGig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchGigDetail = async () => {
      const { data, error } = await supabase
        .from('gigs')
        .select(`
          *,
          profiles (
            id,
            full_name,
            username,
            avatar_url,
            role,
            is_verified
          )
        `)
        .eq('slug', params.slug)
        .single();

      if (error) {
        console.error('Error fetching gig:', error);
      } else {
        setGig(data);
        // Increment View Count (Simple)
        await supabase.rpc('increment_view_count', { gig_id: data.id });
      }
      setLoading(false);
    };

    if (params.slug) fetchGigDetail();
  }, [params.slug, supabase]);

  const handleChat = async () => {
    setChatLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      showToast("Login dulu buat chat!", "error");
      router.push('/login');
      return;
    }

    if (user.id === gig.profiles.id) {
      showToast("Gak bisa chat diri sendiri, Bos.", "error");
      setChatLoading(false);
      return;
    }

    const user1 = user.id < gig.profiles.id ? user.id : gig.profiles.id;
    const user2 = user.id < gig.profiles.id ? gig.profiles.id : user.id;

    // Cek Room
    const { data: existingRoom } = await supabase
      .from('conversations')
      .select('id')
      .eq('user1_id', user1)
      .eq('user2_id', user2)
      .single();

    if (existingRoom) {
      router.push(`/inbox/${existingRoom.id}`);
    } else {
      // Bikin Room Baru
      const { data: newRoom, error } = await supabase
        .from('conversations')
        .insert({ user1_id: user1, user2_id: user2, last_message: `Halo, mau tanya soal jasa "${gig.title}"` })
        .select()
        .single();

      if (error) {
        showToast("Gagal bikin room chat.", "error");
      } else {
        router.push(`/inbox/${newRoom.id}`);
      }
    }
    setChatLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: gig.title, url: window.location.href }); } catch (e) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin!');
    }
  };

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-900"></i></div>;
  if (!gig) return <div className="min-h-screen bg-pattern flex items-center justify-center font-bold text-slate-500">Jasa tidak ditemukan.</div>;

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  return (
    <div className="min-h-screen bg-pattern pb-32 md:pb-12">
      
      <div className="fixed top-0 left-0 w-full z-40 px-4 py-4 pointer-events-none flex justify-between items-center">
        <Link href="/lounge" className="pointer-events-auto inline-flex w-10 h-10 bg-white border-2 border-slate-900 rounded-full items-center justify-center text-slate-900 shadow-hard btn-brutal"><i className="fa-solid fa-arrow-left"></i></Link>
        <button onClick={handleShare} className="pointer-events-auto inline-flex w-10 h-10 bg-white border-2 border-slate-900 rounded-full items-center justify-center text-slate-900 shadow-hard btn-brutal"><i className="fa-solid fa-share-nodes"></i></button>
      </div>

      <div className="h-64 md:h-96 bg-slate-900 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={gig.image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"} alt={gig.title} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-slate-900">{gig.category}</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-1"><i className="fa-solid fa-clock"></i> {gig.unit === 'flat' ? 'Sekali Bayar' : `Per ${gig.unit}`}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-2">{gig.title}</h1>
              
              {/* SOCIAL PROOF */}
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mt-4 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-1"><i className="fa-solid fa-eye text-blue-500"></i> {gig.views_count || 0} Dilihat</div>
                <div className="flex items-center gap-1"><i className="fa-solid fa-fire text-orange-500"></i> {gig.likes_count || 0} Dibooking</div>
                <div className="flex items-center gap-1"><i className="fa-solid fa-star text-yellow-400"></i> New</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard-sm">
              <h3 className="font-black text-lg text-slate-900 mb-3">Deskripsi Misi</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base whitespace-pre-wrap">{gig.description}</p>
            </div>

            <Link href={`/u/${gig.profiles?.username}`} className="bg-white rounded-3xl p-4 border-2 border-slate-900 shadow-hard-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition group">
              <div className="w-16 h-16 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gig.profiles?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt={gig.profiles?.username} className="w-full h-full object-cover" />
                {gig.profiles?.is_verified && <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-white text-[10px]"><i className="fa-solid fa-check"></i></div>}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{gig.profiles?.full_name}</h4>
                <p className="text-xs font-bold text-slate-500">@{gig.profiles?.username} • {gig.profiles?.role}</p>
              </div>
              <div className="text-2xl text-slate-300 group-hover:text-slate-900 transition-colors"><i className="fa-solid fa-chevron-right"></i></div>
            </Link>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Harga</p>
              <div className="text-3xl font-black text-slate-900 mb-6">{formatRupiah(gig.price)}{gig.unit !== 'flat' && <span className="text-sm text-slate-500 font-bold">/{gig.unit}</span>}</div>
              
              <div className="space-y-3">
                <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2">
                  Book Sekarang <i className="fa-solid fa-bolt"></i>
                </button>
                <button onClick={handleChat} disabled={chatLoading} className="w-full py-3 bg-white text-slate-900 rounded-xl font-black border-2 border-slate-900 text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2">
                  {chatLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <>Chat Dulu <i className="fa-regular fa-comment-dots"></i></>}
                </button>
              </div>

              <p className="text-[10px] text-slate-400 font-bold text-center mt-4"><i className="fa-solid fa-shield-halved"></i> Dijamin aman pake Escrow Jasurd.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-4 z-50 flex items-center gap-3 pb-8">
        <button onClick={handleChat} disabled={chatLoading} className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-black border-2 border-slate-900 text-sm hover:bg-slate-50 transition">
          {chatLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-regular fa-comment-dots text-lg"></i>}
        </button>
        <button onClick={() => setIsModalOpen(true)} className="flex-[3] bg-primary text-white px-4 py-3 rounded-xl font-black shadow-hard border-2 border-slate-900 text-sm active:scale-95 transition flex items-center justify-center gap-2">
          Book {formatRupiah(gig.price)}
        </button>
      </div>

      {isModalOpen && <ModalOrderDetails onClose={() => setIsModalOpen(false)} gigTitle={gig.title} price={gig.price} unit={gig.unit} />}

    </div>
  );
}