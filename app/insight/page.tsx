import Link from 'next/link';
import InsightCard from '@/components/home/InsightCard'; // Pastikan path ini benar

export default function InsightPage() {
  // Mock Data Artikel
  const articles = [
    {
      id: 1,
      title: "3 AI Buat Jago Ngoding Modal Prompt Doang.",
      category: "Tech Hacks",
      summary: "Zaman sekarang gak perlu jago syntax. Cukup jago prompt engineering. Tools: ChatGPT, Claude, GitHub Copilot.",
      isFeatured: true,
      color: "bg-surface",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Kisah Rian Beli Motor Cash dari Joki Tiket.",
      category: "Success Story",
      summary: "\"Cuma modal antri tiket konser, gue bisa kebeli NMAX cash tanpa nyicil.\"",
      color: "bg-accent",
    },
    {
      id: 3,
      title: "Tips Hindari Red Flag Client 🚩",
      category: "Safety",
      summary: "Jangan mau diajak transaksi luar aplikasi! Kenali ciri-ciri penipu berkedok sultan.",
      color: "bg-white",
    },
    {
      id: 4,
      title: "Panduan Rate Card 'Teman Kondangan' 2024",
      category: "Guide",
      summary: "Teman kondangan pasif: 150k-250k. Aktif (bantu ambil makan): 300k-500k.",
      color: "bg-pink-50",
    },
    {
      id: 5,
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
              {...article}
            />
          ))}
        </div>
      </div>
    </div>
  );
}