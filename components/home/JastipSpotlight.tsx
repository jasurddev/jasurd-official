'use client';

import Link from 'next/link';

const JastipSpotlight = () => {
  // Mock Data Jastip (Campuran Lokal & Luar Kota)
  const jastipItems = [
    {
      id: 1,
      title: "Jastip Bakpia Kukus Tugu Jogja",
      route: "Jogja -> Jakarta",
      type: "intercity", // Luar Kota
      price: "Fee 15rb/box",
      image: "https://images.unsplash.com/photo-1626202267828-69c6539a4346?auto=format&fit=crop&w=600&q=80",
      isFeatured: true // Tampil Besar
    },
    {
      id: 2,
      title: "Antri Mie Gacoan Tebet",
      route: "Dalam Kota (Jaksel)",
      type: "local", // Lokal
      price: "Fee 20rb",
      image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=600&q=80",
      isFeatured: false
    },
    {
      id: 3,
      title: "IKEA Alam Sutera (Sale)",
      route: "Tangerang -> Depok",
      type: "intercity",
      price: "Fee 10%",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&q=80",
      isFeatured: false
    },
    {
      id: 4,
      title: "Beliin Obat di Apotek K24",
      route: "Dalam Kota (Jakpus)",
      type: "local",
      price: "Fee 15rb",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      isFeatured: true // Tampil Besar
    },
    {
      id: 5,
      title: "Roti Aoka Viral",
      route: "Bandung -> Jakarta",
      type: "intercity",
      price: "Fee 5rb",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
      isFeatured: false
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-purple-50 border-b-2 border-slate-900 relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <span className="bg-purple-600 text-white border-2 border-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider mb-2 inline-block shadow-hard-sm transform -rotate-1">
              Jasa Andalan 🔥
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Jastip Daerah Keren.
            </h2>
            <p className="text-xs md:text-sm font-bold text-slate-600 mt-1 max-w-lg">
              Lokal atau Luar Kota? Biar Solver yang bawain.
            </p>
          </div>
          <Link 
            href="/lounge?category=Jastip"
            className="bg-white border-2 border-slate-900 px-5 py-2.5 rounded-xl font-black text-xs shadow-hard hover:shadow-none hover:bg-purple-100 transition active:translate-y-0.5 flex items-center gap-2 self-start md:self-auto"
          >
            <i className="fa-solid fa-box-open text-purple-600"></i> Lihat Semua Jastip
          </Link>
        </div>

        {/* BENTO GRID (Mobile & Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          
          {jastipItems.map((item, index) => {
            // Logic Layout Bento
            // Mobile: Featured jadi full width (col-span-2), sisanya col-span-1
            // Desktop: Featured jadi col-span-2 row-span-2 (Gede banget)
            
            return (
              <Link 
                key={item.id}
                href="/lounge" // Nanti arahin ke detail
                className={`
                  relative rounded-2xl border-2 border-slate-900 shadow-hard overflow-hidden group cursor-pointer bg-white
                  ${item.isFeatured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}
                `}
              >
                {/* Image Background */}
                <div className="absolute inset-0">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                </div>

                {/* Badge Lokasi (Pojok Kanan Atas) */}
                <div className="absolute top-2 right-2 z-10">
                  <span className={`
                    text-[8px] md:text-[10px] font-black px-2 py-1 rounded border border-slate-900 shadow-sm
                    ${item.type === 'local' ? 'bg-green-400 text-slate-900' : 'bg-orange-400 text-slate-900'}
                  `}>
                    {item.type === 'local' ? '🛵 LOKAL' : '✈️ LUAR KOTA'}
                  </span>
                </div>

                {/* Content (Bawah) */}
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 text-white z-10">
                  <p className="text-[9px] md:text-xs font-bold text-slate-300 mb-1 flex items-center gap-1">
                    <i className="fa-solid fa-route"></i> {item.route}
                  </p>
                  <h3 className={`font-black leading-tight mb-1 ${item.isFeatured ? 'text-lg md:text-2xl' : 'text-xs md:text-sm line-clamp-2'}`}>
                    {item.title}
                  </h3>
                  <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-2 py-0.5 rounded text-[9px] md:text-xs font-bold text-white">
                    {item.price}
                  </span>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default JastipSpotlight;