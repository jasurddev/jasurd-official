const LiveTicker = () => {
  // Data Ticker
  const tickerItems = [
    { icon: "fa-money-bill-wave", color: "text-green-400", text: "Budi cairin Rp 150rb" },
    { icon: "fa-fire", color: "text-orange-400", text: 'Siska ambil "Joki Antri"' },
    { icon: "fa-user-plus", color: "text-blue-400", text: "140+ Solver Baru" },
    { icon: "fa-check-circle", color: "text-purple-400", text: "Rian sukses misi 'Teman Curhat'" },
    { icon: "fa-bolt", color: "text-yellow-400", text: "Server Up 99.9%" },
  ];

  return (
    <div className="bg-slate-900 text-white text-xs font-bold py-3 border-y-2 border-slate-900 relative z-20 my-6 overflow-hidden shadow-hard">
      
      {/* LIVE Badge (Fixed Left) */}
      <div className="absolute left-0 top-0 bottom-0 bg-red-600 px-4 z-30 flex items-center gap-2 shadow-[4px_0px_10px_rgba(0,0,0,0.5)] border-r-2 border-slate-900">
        <span className="italic font-black tracking-tight">LIVE</span>
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
      </div>
      
      {/* Marquee Wrapper */}
      <div className="marquee-wrapper w-full flex gap-8 animate-marquee ml-24 items-center">
        {/* Render Items Twice for Seamless Loop */}
        {[...tickerItems, ...tickerItems].map((item, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            <span className="flex items-center gap-2 text-slate-300">
              <i className={`fa-solid ${item.icon} ${item.color}`}></i> 
              <span>
                {/* Parsing simple HTML-like string manually or just rendering text */}
                <span dangerouslySetInnerHTML={{ 
                  __html: item.text
                    .replace('Budi', '<strong class="text-white">Budi</strong>')
                    .replace('Siska', '<strong class="text-white">Siska</strong>')
                    .replace('Rp 150rb', '<span class="text-green-400">Rp 150rb</span>')
                    .replace('"Joki Antri"', '<span class="text-orange-400">"Joki Antri"</span>')
                }} />
              </span>
            </span>
            <span className="text-slate-600 text-[10px] mx-2">●</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;