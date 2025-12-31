import Link from 'next/link';
import InsightCard from '@/components/home/InsightCard';

export default function InsightPage() {
  // Mock Data Artikel (Sekarang pake properti 'slug')
  const articles = [
    {
      id: 1,
      slug: "3-ai-buat-jago-ngoding-modal-prompt",
      title: "3 AI Buat Jago Ngoding Modal Prompt Doang.",
      category: "Tech Hacks",
      summary: "Zaman sekarang gak perlu jago syntax. Cukup jago prompt engineering. Tools: ChatGPT, Claude, GitHub Copilot.",
      isFeatured: true,
      color: "bg-surface",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      slug: "kisah-rian-beli-motor-cash-dari-joki-tiket",
      title: "Kisah Rian Beli Motor Cash dari Joki Tiket.",
      category: "Success Story",
      summary: "\"Cuma modal antri tiket konser, gue bisa kebeli NMAX cash tanpa nyicil.\"",
      color: "bg-accent",
    },
    {
      id: 3,
      slug: "tips-hindari-red-flag-client",
      title: "Tips Hindari Red Flag Client 🚩",
      category: "Safety",
      summary: "Jangan mau diajak transaksi luar aplikasi! Kenali ciri-ciri penipu berkedok sultan.",
      color: "bg-white",
    },
    {
      id: 4,
      slug: "panduan-rate-card-teman-kondangan-2024",
      title: "Panduan Rate Card 'Teman Kondangan' 2024",
      category: "Guide",
      summary: "Teman kondangan pasif: 150k-250k. Aktif (bantu ambil makan): 300k-500k.",
      color: "bg-pink-50",
    },
    {
      id: 5,
      slug: "cara-menjadi-pendengar-curhat-yang-baik",
      title: "Cara Menjadi Pendengar Curhat yang Baik",
      category: "Skill",
      summary: "Modal kuping doang bisa dapet duit? Bisa banget. Pelajari teknik active listening.",
      color: "bg-indigo-50",
    }
  ];

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-20 md:pt-24">
      
      {/* Header */}
      <div className="px-4 md:px-6 max-w-7xl mx-auto mb-8">
        <span className="bg-indigo-100 text-primary border border-indigo-200 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-3 inline-block">
          Blog & Tips
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">
          Wawasan Anti Mainstream.
        </h1>
        <p className="text-slate-600 font-medium text-lg max-w-2xl">
          Bacaan buat nambah cuan, tips survival di gig economy, atau sekedar hiburan pas lagi sepi job.
        </p>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article) => (
            <InsightCard 
              key={article.id}
              id={article.slug} // FIX: Kirim slug sebagai ID ke card
              title={article.title}
              category={article.category}
              summary={article.summary}
              image={article.image}
              isFeatured={article.isFeatured}
              color={article.color}
            />
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border-2 border-slate-900 shadow-hard">
           <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Jangan Ketinggalan Info Cuan!</h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">Subscribe newsletter kita. No spam, isinya daging semua.</p>
              <div className="flex max-w-md mx-auto gap-2">
                 <input type="email" placeholder="Email lo..." className="flex-1 px-4 py-3 rounded-xl font-bold text-slate-900 outline-none border-2 border-transparent focus:border-accent" />
                 <button className="bg-accent text-slate-900 px-6 py-3 rounded-xl font-black hover:bg-accent-hover transition">Gas</button>
              </div>
           </div>
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>

      </div>
    </div>
  );
}