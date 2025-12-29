import Link from 'next/link';

const HowItWorksSection = () => {
  const steps = [
    { id: 1, title: "1. Cari", desc: "Temukan solver unik di Lounge.", icon: "fa-magnifying-glass", bgIcon: "bg-sky-100", textIcon: "text-sky-600" },
    { id: 2, title: "2. Amanin", desc: "Uang ditahan sistem (Escrow).", icon: "fa-lock", bgIcon: "bg-indigo-100", textIcon: "text-primary" },
    { id: 3, title: "3. Misi", desc: "Solver kerjain tugas sesuai brief.", icon: "fa-person-digging", bgIcon: "bg-orange-100", textIcon: "text-orange-500" },
    { id: 4, title: "4. Cair", desc: "Kerjaan kelar? Tukar PIN.", icon: "fa-key", bgIcon: "bg-green-100", textIcon: "text-green-600" },
  ];

  return (
    <section className="py-12 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Cara Main</h2>
          
          {/* FIX: Tombol Lihat Detail dibungkus style button */}
          <Link 
            href="/how-to" 
            className="bg-white border-2 border-slate-900 px-4 py-2 rounded-lg text-xs font-black shadow-hard-sm hover:shadow-none active:translate-y-0.5 transition cursor-pointer flex items-center gap-2 text-slate-900"
          >
            Lihat Detail <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-surface rounded-xl p-4 md:p-6 border-2 border-slate-900 shadow-hard-sm card-hoverable flex flex-col items-center text-center gap-3 group"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 ${step.bgIcon} ${step.textIcon} rounded-lg md:rounded-xl border-2 border-slate-900 flex items-center justify-center text-xl md:text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <div>
                <h3 className="text-sm md:text-xl font-black text-slate-900 leading-tight mb-1">{step.title}</h3>
                <p className="hidden md:block text-sm text-slate-600 font-medium leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;