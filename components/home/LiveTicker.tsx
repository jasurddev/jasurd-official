import Image from 'next/image';

const LiveTicker = () => {
  // Data Ticker (Dummy Realistis)
  const tickerItems = [
    { 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
      name: "Budi",
      action: "cairin",
      value: "Rp 150rb",
      valColor: "text-green-400",
      icon: "fa-money-bill-wave"
    },
    { 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siska",
      name: "Siska",
      action: "ambil job",
      value: "\"Joki Antri\"",
      valColor: "text-orange-400",
      icon: "fa-fire"
    },
    { 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rian",
      name: "Rian",
      action: "join sebagai",
      value: "Solver Baru",
      valColor: "text-blue-400",
      icon: "fa-user-plus"
    },
    { 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dina",
      name: "Dina",
      action: "sukses misi",
      value: "\"Teman Curhat\"",
      valColor: "text-purple-400",
      icon: "fa-check-circle"
    },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs font-bold py-3 border-y-2 border-slate-900 relative z-20 my-6 overflow-hidden shadow-hard">
      
      {/* LIVE Badge */}
      <div className="absolute left-0 top-0 bottom-0 bg-red-600 px-4 z-30 flex items-center gap-2 shadow-[4px_0px_10px_rgba(0,0,0,0.5)] border-r-2 border-slate-900">
        <span className="italic font-black tracking-tight">LIVE</span>
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
      </div>
      
      {/* Marquee Wrapper */}
      <div className="marquee-wrapper w-full flex gap-8 animate-marquee ml-24 items-center">
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center gap-3 whitespace-nowrap">
            
            {/* Avatar & Text */}
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-700 border border-slate-500 relative">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-slate-300">
                <strong className="text-white">{item.name}</strong> {item.action} <span className={item.valColor}>{item.value}</span>
              </span>
            </div>

            <span className="text-slate-600 text-[8px]">●</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;