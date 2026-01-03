import Link from 'next/link';

const HowItWorksSection = () => {
  const steps = [
    { id: 1, title: "Cari", desc: "Temukan solver unik.", icon: "fa-magnifying-glass", bgIcon: "bg-sky-100", textIcon: "text-sky-600" },
    { id: 2, title: "Amanin", desc: "Uang ditahan Escrow.", icon: "fa-lock", bgIcon: "bg-indigo-100", textIcon: "text-primary" },
    { id: 3, title: "Misi", desc: "Solver kerjain tugas.", icon: "fa-person-digging", bgIcon: "bg-orange-100", textIcon: "text-orange-500" },
    { id: 4, title: "Cair", desc: "Tukar PIN, duit cair.", icon: "fa-key", bgIcon: "bg-green-100", textIcon: "text-green-600" },
  ];

  return (
    <section className="py-8 md:py-12 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Cara Main</h2>
          <Link href="/how-to" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
            Detail <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        
        {/* HORIZONTAL SCROLL DI MOBILE */}
        <div className="flex md:grid md:grid-cols-4 gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="min-w-[140px] md:min-w-0 snap-center bg-surface rounded-xl p-4 border-2 border-slate-900 shadow-hard-sm card-hoverable flex flex-col items-center text-center gap-3 group"
            >
              {/* Icon Only (No Box) */}
              <i className={`fa-solid ${step.icon} text-3xl ${step.textIcon} group-hover:scale-110 transition-transform duration-200`}></i>
              
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-tight mb-1">{step.title}</h3>
                <p className="text-[10px] text-slate-600 font-medium leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;