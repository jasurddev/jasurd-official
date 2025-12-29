'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();

  // Mock Data Artikel (Di real app, ini fetch dari database berdasarkan slug)
  const article = {
    title: "3 AI Buat Jago Ngoding Modal Prompt Doang.",
    category: "Tech Hacks",
    date: "12 Jan 2024",
    author: "Admin Jasurd",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    content: `
      <p class="mb-4">Zaman sekarang gak perlu jago syntax sampai botak. Cukup jago <strong>Prompt Engineering</strong>, lo bisa bikin aplikasi sekelas startup unicorn.</p>
      
      <h3 class="text-xl font-black text-slate-900 mt-6 mb-2">1. ChatGPT (Si Paling Umum)</h3>
      <p class="mb-4">Buat logic dasar dan debugging, ini masih juara. Kuncinya ada di konteks. Jangan cuma bilang "Buatin kodingan login", tapi kasih detail stack teknologi lo.</p>
      
      <h3 class="text-xl font-black text-slate-900 mt-6 mb-2">2. Claude 3.5 Sonnet (Si Paling Pinter)</h3>
      <p class="mb-4">Kalau butuh kodingan yang lebih manusiawi dan minim bug, Claude jagonya. Dia ngerti nuansa bahasa lebih baik dari GPT.</p>
      
      <h3 class="text-xl font-black text-slate-900 mt-6 mb-2">3. GitHub Copilot (Asisten Pribadi)</h3>
      <p class="mb-4">Ini wajib buat yang pake VS Code. Dia bisa ngelanjutin kodingan lo bahkan sebelum lo mikir mau ngetik apa.</p>
      
      <div class="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 my-6">
        <p class="text-sm font-bold text-indigo-900">💡 Pro Tip: Gabungin ketiganya buat hasil maksimal. Claude buat arsitektur, GPT buat refactor, Copilot buat ngetik cepet.</p>
      </div>

      <p>Intinya, AI itu alat. Lo tetep butuh logika dasar buat nyatuin puzzle-nya. Semangat ngoding!</p>
    `
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      
      {/* Hero Image Full Width */}
      <div className="h-64 md:h-96 relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Back Button */}
        <div className="absolute top-20 left-4 md:left-6 z-20">
          <Link href="/insight" className="w-10 h-10 bg-white/20 backdrop-blur border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition shadow-lg">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-3xl mx-auto">
            <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-3 inline-block border border-slate-900 shadow-sm">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-md">
              {article.title}
            </h1>
            <p className="text-xs md:text-sm font-bold text-slate-300">
              {article.date} • Oleh {article.author}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <article 
          className="prose prose-slate prose-lg max-w-none font-medium text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Share Section */}
        <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between items-center">
          <p className="text-sm font-bold text-slate-500">Suka artikel ini?</p>
          <button 
            onClick={() => alert('Link artikel disalin!')}
            className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition shadow-hard border-2 border-slate-900 active:translate-y-0.5 active:shadow-none"
          >
            <i className="fa-solid fa-share-nodes"></i> Share
          </button>
        </div>
      </div>

    </div>
  );
}