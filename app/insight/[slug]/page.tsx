'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function ArticleDetailPage() {
  const params = useParams();
  const supabase = createClient();
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      // Decode slug dari URL
      const slug = decodeURIComponent(params.slug as string);
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error("Error fetching article:", error);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };

    if (params.slug) fetchArticle();
  }, [params.slug, supabase]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link disalin!');
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-3xl text-slate-900"></i></div>;

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-2">404</h1>
        <p className="text-slate-500 font-bold mb-6">Artikelnya ilang atau belum ditulis, Bos.</p>
        <Link href="/insight" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">Balik ke Insight</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="h-64 md:h-96 relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-20 left-4 md:left-6 z-20">
          <Link href="/insight" className="w-10 h-10 bg-white/20 backdrop-blur border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition shadow-lg"><i className="fa-solid fa-arrow-left"></i></Link>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-black/90 to-transparent">
          <div className="max-w-3xl mx-auto">
            <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-3 inline-block border border-slate-900 shadow-sm">{article.category}</span>
            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight mb-2 drop-shadow-md">{article.title}</h1>
            <p className="text-xs md:text-sm font-bold text-slate-300">{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • Oleh {article.author}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <article className="prose prose-slate prose-lg max-w-none font-medium text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="mt-12 pt-8 border-t-2 border-slate-100 flex justify-between items-center">
          <p className="text-sm font-bold text-slate-500">Suka artikel ini?</p>
          <button onClick={handleShare} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary transition shadow-hard border-2 border-slate-900 active:translate-y-0.5 active:shadow-none"><i className="fa-solid fa-share-nodes"></i> Share</button>
        </div>
      </div>
    </div>
  );
}
