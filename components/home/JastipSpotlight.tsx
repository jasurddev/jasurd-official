import Link from 'next/link';
import Image from 'next/image';

const JastipSpotlight = () => {
  const jastipItems = [
    {
      id: 1,
      title: "Makanan Viral",
      desc: "Bakpia, Roti, Cromboloni",
      quote: "Nitip oleh-oleh khas daerah tanpa harus beli tiket pesawat.",
      icon: "fa-burger",
      bgIcon: "bg-orange-100",
      textIcon: "text-orange-500",
      badge: "BEST SELLER",
      badgeColor: "bg-yellow-300",
    },
    {
      id: 2,
      title: "Event & Konser",
      desc: "Merchandise, Tiket OTS",
      quote: "Gak bisa dateng ke event Jejepangan/Konser? Nitip mata & barang aja.",
      icon: "fa-ticket",
      bgIcon: "bg-indigo-100",
      textIcon: "text-indigo-500",
    },
    {
      id: 3,
      title: "Barang Limited",
      desc: "IKEA, Uniqlo, Daiso",
      quote: "Buat lo yang di daerahnya gak ada mall gede. Titip solver kota besar.",
      icon: "fa-bag-shopping",
      bgIcon: "bg-pink-100",
      textIcon: "text-pink-500",
    },
  ];

  return (
    <section className="py-12 bg-purple-50 border-b-2 border-slate-900 relative overflow-hidden">
      
      {/* Dekorasi Background */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="bg-purple-600 text-white border-2 border-slate-900 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-2 inline-block shadow-hard-sm transform -rotate-1">
              Jasa Andalan 🔥
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Jastip Daerah Keren.
            </h2>
            <p className="text-sm font-bold text-slate-600 mt-2 max-w-lg">
              Gak perlu jauh-jauh ke sana, biar Solver lokal yang bawain. Dari makanan viral sampe *merchandise* event.
            </p>
          </div>
          
          {/* CTA Button */}
          <button className="bg-white border-2 border-slate-900 px-6 py-3 rounded-xl font-black text-sm shadow-hard hover:shadow-none hover:bg-purple-100 transition active:translate-y-0.5 flex items-center gap-2 self-start md:self-auto">
            <i className="fa-solid fa-box-open text-purple-600"></i> Request Jastip
          </button>
        </div>

        {/* Jastip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jastipItems.map((item) => (
            <Link 
              href="/lounge?category=jastip" 
              key={item.id}
              className="bg-white border-2 border-slate-900 rounded-2xl p-4 shadow-hard card-hoverable group cursor-pointer relative overflow-hidden flex flex-col h-full"
            >
              {item.badge && (
                <div className={`absolute top-3 right-3 ${item.badgeColor} border-2 border-slate-900 text-[10px] font-black px-2 py-0.5 rounded z-10`}>
                  {item.badge}
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 ${item.bgIcon} rounded-xl border-2 border-slate-900 flex items-center justify-center text-2xl group-hover:scale-110 transition shrink-0`}>
                  <i className={`fa-solid ${item.icon} ${item.textIcon}`}></i>
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg leading-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 font-bold">{item.desc}</p>
                </div>
              </div>
              
              <p className="text-xs text-slate-600 font-medium border-t-2 border-slate-100 pt-3 mt-auto italic">
                "{item.quote}"
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JastipSpotlight;