import Link from 'next/link';

const HowItWorksSection = () => {
  const steps = [
    { id: 1, title: "1. Cari", desc: "Temukan solver unik di Lounge.", icon: "fa-magnifying-glass", bgIcon: "bg-sky-100", textIcon: "text-sky-600" },
    { id: 2, title: "2. Amanin", desc: "Uang ditahan sistem (Escrow).", icon: "fa-lock", bgIcon: "bg-indigo-100", textIcon: "text-primary" },
    { id: 3, title: "3. Misi", desc: "Solver kerjain tugas sesuai brief.", icon: "fa-person-digging", bgIcon: "bg-orange-100", textIcon: "text-orange-500" },
    { id: 4, title: "4. Cair", desc: "Kerjaan kelar? Tukar PIN.", icon: "fa-key", bgIcon: "bg-green-100", textIcon: "text-green-600" },
  ];

  return (
    // DIET: py-12 jadi py-8
    <section className="py-8 md:py-12 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Cara Main</h2>
          
          <Link 
            href="/how-to" 
            className="bg-white border-2 border-slate-900 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[10px] md:text-xs font-black shadow-hard-sm hover:shadow-none active:translate-y-0.5 transition cursor-pointer flex items-center gap-2 text-slate-900"
          >
            Lihat Detail <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {steps.map((step) => (
            <div 
              key={step.id}
              // DIET: p-4 jadi p-3
              className="bg-surface rounded-xl p-3 md:p-6 border-2 border-slate-900 shadow-hard-sm card-hoverable flex flex-col items-center text-center gap-2 md:gap-3 group"
            >
              {/* DIET: w-12 jadi w-10, text-xl jadi text-lg */}
              <div className={`w-10 h-10 md:w-16 md:h-16 ${step.bgIcon} ${step.textIcon} rounded-lg md:rounded-xl border-2 border-slate-900 flex items-center justify-center text-lg md:text-2xl shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <div>
                {/* DIET: text-sm jadi text-xs */}
                <h3 className="text-xs md:text-xl font-black text-slate-900 leading-tight mb-0.5 md:mb-1">{step.title}</h3>
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