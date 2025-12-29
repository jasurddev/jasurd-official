import Link from 'next/link';

const CuanFactSection = () => {
  const facts = [
    {
      id: 1,
      number: "65%",
      text: "Umat Muslim Indonesia Belum Lancar Baca Al-Quran.",
      source: "Sumber: Data BPS & Kemenag",
      trigger: "Anak Pesantren Cek! 🫵",
      idea: "Buka Jasa Ngaji Privat",
      theme: "bg-green-100",
      accent: "bg-green-500 text-white"
    },
    {
      id: 2,
      number: "80%",
      text: "Gen Z Gagal Kerja Karena Kalah Lawan HRD Pas Interview.",
      source: "Sumber: Survei JobStreet",
      trigger: "HRD / Recruiter Masuk! 🧠",
      idea: "Jasa Simulasi Interview",
      theme: "bg-pink-100",
      accent: "bg-pink-500 text-white"
    },
    {
      id: 3,
      number: "24 Jam",
      text: "Waktu rata-rata orang Indonesia main HP per hari. Mata lelah, mager gerak.",
      source: "Sumber: State of Mobile 2024",
      trigger: "Yang Punya Motor Nganggur! 🛵",
      idea: "Jasa Kurir / Belanja Pasar",
      theme: "bg-orange-100",
      accent: "bg-orange-500 text-white"
    },
    {
      id: 4,
      number: "64 Juta",
      text: "UMKM di Indonesia, tapi baru 20% yang Go Digital dengan benar.",
      source: "Sumber: Kemenkop UKM",
      trigger: "Jago Canva / CapCut? 🎨",
      idea: "Jasa Foto & Video Produk HP",
      theme: "bg-blue-100",
      accent: "bg-blue-500 text-white"
    },
  ];

  return (
    <section id="data-fact" className="py-12 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Cuan Fact 💸
            </h2>
            <p className="text-sm font-bold text-slate-600 mt-1">
              Data valid buat lo yang bingung mau jualan skill apa.
            </p>
          </div>
          
          {/* Tombol "Cek Ide Lain" (Style Request Jastip) */}
          <Link 
            href="/insight"
            className="bg-white border-2 border-slate-900 px-5 py-2.5 rounded-xl font-black text-xs shadow-hard hover:shadow-none hover:bg-slate-50 transition active:translate-y-0.5 flex items-center gap-2 self-start md:self-auto"
          >
            <i className="fa-regular fa-lightbulb text-accent text-sm"></i> Cek Ide Lain
          </Link>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {facts.map((fact) => (
            <div 
              key={fact.id}
              className="min-w-[280px] w-[280px] md:min-w-[320px] snap-center bg-white rounded-3xl border-2 border-slate-900 shadow-hard flex flex-col overflow-hidden h-full flex-shrink-0 group hover:-translate-y-1 transition-transform"
            >
              {/* Top: The Fact (Masalah) */}
              <div className="p-6 flex-grow flex flex-col justify-center">
                <h3 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter">
                  {fact.number}
                </h3>
                <p className="text-sm font-bold text-slate-700 leading-snug mb-4">
                  "{fact.text}"
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-auto">
                  {fact.source}
                </p>
              </div>

              {/* Bottom: The Trigger (Solusi/Ide) - Bento Style Divider */}
              <div className={`${fact.theme} p-4 border-t-2 border-slate-900`}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black text-slate-600 uppercase">
                    Peluang Cuan 👇
                  </p>
                  <i className="fa-solid fa-arrow-turn-down text-slate-400"></i>
                </div>
                
                <p className="text-xs font-bold text-slate-800 mb-3">
                  {fact.trigger}
                </p>
                
                <button className={`w-full py-3 ${fact.accent} rounded-xl font-black text-xs border-2 border-slate-900 shadow-sm active:scale-95 transition flex items-center justify-center gap-2`}>
                  {fact.idea} <i className="fa-solid fa-bolt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CuanFactSection;