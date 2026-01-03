'use client';

import Link from 'next/link';
import SpillCard from '@/components/ui/SpillCard';

const InspirationWall = () => {
  // Mock Data Spill
  const spills = [
    {
      id: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joko",
      name: "@JokoSantuy",
      role: "Solver Level 3",
      content: "Kirain becanda minta ditemenin makan siang doang. Taunya dibayarin makan AYCE + dapet tip gede.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80",
      cuan: "Total Cuan: Rp 350.000",
      verified: true,
      stats: { fire: 12, laugh: 5 }
    },
    {
      id: 2,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bella",
      name: "@BellaCia",
      role: "Newbie",
      content: "Dapet job bangunin sahur pake suara Anime 'Onii-chan'. Pas nelpon, yang angkat bapaknya. Langsung kena ulti ceramah subuh 😭",
      isFail: true,
      stats: { fire: 2, laugh: 145 }
    }
  ];

  // Mock Data Cuan Fact
  const facts = [
    {
      id: 1,
      number: "65%",
      text: "Umat Muslim Indonesia Belum Lancar Baca Al-Quran.",
      trigger: "Anak Pesantren Cek! 🫵",
      idea: "Buka Jasa Ngaji Privat",
      theme: "bg-green-100",
      accent: "bg-green-500 text-white"
    },
    {
      id: 2,
      number: "80%",
      text: "Gen Z Gagal Kerja Karena Kalah Lawan HRD Pas Interview.",
      trigger: "HRD / Recruiter Masuk! 🧠",
      idea: "Jasa Simulasi Interview",
      theme: "bg-pink-100",
      accent: "bg-pink-500 text-white"
    }
  ];

  return (
    <section className="py-8 md:py-16 bg-slate-50 border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Dinding Inspirasi 💡
            </h2>
            <p className="text-sm font-bold text-slate-600 mt-1">
              Cerita absurd & fakta cuan buat ide bisnis lo.
            </p>
          </div>
          <Link 
            href="/insight"
            className="bg-white border-2 border-slate-900 px-5 py-2.5 rounded-xl font-black text-xs shadow-hard hover:shadow-none hover:bg-slate-50 transition active:translate-y-0.5 flex items-center gap-2 self-start md:self-auto"
          >
            Lihat Semua Artikel <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          {/* KOLOM 1: SPILL THE GIG (Vertical Stack di Desktop) */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="bg-accent p-4 rounded-2xl border-2 border-slate-900 shadow-hard-sm">
              <h3 className="font-black text-slate-900 text-lg mb-1">Spill The Gig 🗣️</h3>
              <p className="text-xs font-bold text-slate-800">Drama lapangan & bukti cuan nyata.</p>
            </div>
            {/* Render Spill Card */}
            {spills.map((spill) => (
              <div key={spill.id} className="h-full">
                <SpillCard {...spill} />
              </div>
            ))}
          </div>

          {/* KOLOM 2 & 3: CUAN FACT (Grid 2x2 di Desktop) */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Header Cuan Fact */}
            <div className="sm:col-span-2 bg-slate-900 p-6 rounded-2xl border-2 border-slate-900 shadow-hard text-white flex flex-col justify-center items-start">
              <h3 className="font-black text-2xl mb-2">Cuan Fact 💸</h3>
              <p className="text-sm text-slate-300 max-w-md">Data valid buat lo yang bingung mau jualan skill apa. Jangan cuma bengong, jadiin peluang!</p>
            </div>

            {/* Render Facts */}
            {facts.map((fact) => (
              <div key={fact.id} className="bg-white rounded-2xl border-2 border-slate-900 shadow-hard flex flex-col overflow-hidden h-full group hover:-translate-y-1 transition-transform">
                <div className="p-5 flex-grow">
                  <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{fact.number}</h3>
                  <p className="text-xs font-bold text-slate-700 leading-snug">{fact.text}</p>
                </div>
                <div className={`${fact.theme} p-4 border-t-2 border-slate-900`}>
                  <p className="text-[10px] font-black text-slate-600 uppercase mb-1">Peluang Cuan 👇</p>
                  <p className="text-xs font-bold text-slate-800 mb-3">{fact.trigger}</p>
                  <button className={`w-full py-2 ${fact.accent} rounded-lg font-black text-[10px] border-2 border-slate-900 shadow-sm active:scale-95 transition flex items-center justify-center gap-2`}>
                    {fact.idea} <i className="fa-solid fa-bolt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default InspirationWall;