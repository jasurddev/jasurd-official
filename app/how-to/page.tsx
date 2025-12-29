import Link from 'next/link';

export default function HowToPage() {
  const steps = [
    {
      num: "01",
      title: "Cari & Deal",
      desc: "Cari jasa di Lounge atau search bar. Cek rating & review Solver dulu. Wajib chat untuk nego detail tugas & harga sebelum klik 'Book Now'.",
      icon: "fa-magnifying-glass",
      color: "bg-sky-100 text-sky-600"
    },
    {
      num: "02",
      title: "Amanin Duit",
      desc: "User bayar ke Jasurd (Escrow), BUKAN ke rekening pribadi Solver. Uang ditahan sistem sampai misi selesai. Anti tipu-tipu club.",
      icon: "fa-shield-halved",
      color: "bg-indigo-100 text-primary"
    },
    {
      num: "03",
      title: "Eksekusi Misi",
      desc: "Solver kerjain tugas. Wajib kirim bukti foto/video di chat secara berkala (real-time update) biar User tenang dan hasil sesuai ekspektasi.",
      icon: "fa-person-digging",
      color: "bg-orange-100 text-orange-500"
    },
    {
      num: "04",
      title: "Tukar PIN & Cair",
      desc: "Puas? User kasih 4 digit PIN ke Solver. Solver input PIN di menu 'Transaksi', duit langsung pindah ke saldo dompet detik itu juga.",
      icon: "fa-key",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-pattern pb-32 pt-24 md:pt-32">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center mb-12">
        <span className="bg-white border-2 border-slate-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 inline-block shadow-hard-sm">
          Newbie Guide
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
          Mekanisme & Aturan Main.
        </h1>
        <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">
          Biar sama-sama enak, aman, dan cuan. Tolong dibaca pake mata, jangan pake perasaan.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {steps.map((step) => (
          <div key={step.num} className="bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-hard flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left relative overflow-hidden group hover:-translate-y-1 transition-transform">
            <div className={`w-20 h-20 ${step.color} rounded-2xl border-2 border-slate-900 flex items-center justify-center text-3xl shrink-0 shadow-sm z-10 relative`}>
              <i className={`fa-solid ${step.icon}`}></i>
              <span className="absolute -top-3 -left-3 w-8 h-8 bg-slate-900 text-white rounded-full text-sm flex items-center justify-center font-bold border-2 border-white">
                {step.num}
              </span>
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section (Accordion) */}
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-2">
            <i className="fa-solid fa-circle-question text-primary"></i> FAQ Netizen
          </h3>
          <p className="text-sm font-bold text-slate-500 mt-2">Pertanyaan yang sering ditanyain (padahal udah dijelasin).</p>
        </div>
        
        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group bg-white border-2 border-slate-900 rounded-2xl shadow-sm open:shadow-hard transition-all cursor-pointer">
            <summary className="flex items-center justify-between p-5 font-bold text-slate-900 select-none text-sm md:text-base">
              Apakah uang saya aman?
              <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i>
            </summary>
            <div className="p-5 pt-0 text-sm text-slate-600 font-medium leading-relaxed border-t-2 border-transparent group-open:border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              100% Aman. Kita pakai sistem Escrow (Rekber Digital). Uang lo gak langsung masuk ke rekening pribadi Solver, tapi ketahan di sistem Jasurd. Baru cair kalau lo kasih PIN konfirmasi. Kalau Solver kabur/batalin sepihak, uang balik 100% ke saldo lo.
            </div>
          </details>

          {/* FAQ 2 */}
          <details className="group bg-white border-2 border-slate-900 rounded-2xl shadow-sm open:shadow-hard transition-all cursor-pointer">
            <summary className="flex items-center justify-between p-5 font-bold text-slate-900 select-none text-sm md:text-base">
              Gimana kalau hasil kerja jelek?
              <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i>
            </summary>
            <div className="p-5 pt-0 text-sm text-slate-600 font-medium leading-relaxed border-t-2 border-transparent group-open:border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              Jangan kasih PIN-nya! Ajukan 'Komplain' di halaman detail transaksi. Tim admin Jasurd bakal jadi hakim garis buat nentuin solusinya (Full Refund, Partial Refund, atau Lanjut Revisi) berdasarkan bukti chat dan dokumentasi yang ada.
            </div>
          </details>

          {/* FAQ 3 */}
          <details className="group bg-white border-2 border-slate-900 rounded-2xl shadow-sm open:shadow-hard transition-all cursor-pointer">
            <summary className="flex items-center justify-between p-5 font-bold text-slate-900 select-none text-sm md:text-base">
              Ada potongan biaya gak?
              <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i>
            </summary>
            <div className="p-5 pt-0 text-sm text-slate-600 font-medium leading-relaxed border-t-2 border-transparent group-open:border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              Ada dong, buat biaya server dan kopi admin. Fee platform cuma 5% dari total nilai transaksi atau minimal Rp 2.000. Murah kan? Daripada kena tipu jutaan di medsos lain tanpa jaminan.
            </div>
          </details>

          {/* FAQ 4 */}
          <details className="group bg-white border-2 border-slate-900 rounded-2xl shadow-sm open:shadow-hard transition-all cursor-pointer">
            <summary className="flex items-center justify-between p-5 font-bold text-slate-900 select-none text-sm md:text-base">
              Boleh minta jasa apa aja?
              <i className="fa-solid fa-chevron-down group-open:rotate-180 transition-transform text-slate-400"></i>
            </summary>
            <div className="p-5 pt-0 text-sm text-slate-600 font-medium leading-relaxed border-t-2 border-transparent group-open:border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">
              BEBAS selama LEGAL secara hukum Indonesia dan TIDAK BERBAHAYA. 
              <br/><br/>
              <span className="text-green-600 font-bold"><i className="fa-solid fa-check"></i> Boleh:</span> Nemenin kondangan, antri tiket, bangunin sahur, kuras toren, dengerin curhat, joki game.
              <br/><br/>
              <span className="text-red-600 font-bold"><i className="fa-solid fa-xmark"></i> Dilarang Keras:</span> Hal mistis (santet), kriminal, kekerasan, seksual/plus-plus/open BO, dan joki tugas akademik (skripsi/tes). Melanggar = Banned Permanen.
            </div>
          </details>
        </div>
      </div>

    </div>
  );
}