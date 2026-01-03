'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function InsightPage() {
  const supabase = createClient();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      setArticles(data || []);
      setLoading(false);
    };
    fetchArticles();
  }, [supabase]);

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-20 md:pt-24">
      <div className="px-4 md:px-6 max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2">Insight 💡</h1>
        <p className="text-slate-600 font-medium text-lg">Bacaan biar pinter dikit.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          
          <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* FIX: Mobile grid-cols-2, Desktop grid-cols-3 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 auto-rows-[200px]">
          
          {articles.map((article, index) => {
            // Logic Bento Acak (Pola: Besar - Kecil - Kecil - Sedang)
            // Index 0 (Featured): Full Width & Tinggi
            // Index 3, 6, 9...: Full Width di Mobile
            const isFeatured = index === 0;
            const isWideMobile = index % 3 === 0 && index !== 0;

            return (
              <Link 
                key={article.id}
                href={`/insight/${article.slug}`}
                className={`
                  relative overflow-hidden border-2 border-slate-900 shadow-hard card-hoverable group cursor-pointer rounded-2xl md:rounded-3xl bg-white flex flex-col
                  ${isFeatured ? 'col-span-2 md:col-span-2 row-span-2' : ''}
                  ${isWideMobile ? 'col-span-2 md:col-span-1' : ''}
                  ${!isFeatured && !isWideMobile ? 'col-span-1' : ''}
                `}
              >
                {/* Image */}
                <div className={`relative w-full h-full absolute inset-0 z-0`}>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={article.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                   {/* Overlay Gelap Selalu Ada biar teks kebaca */}
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                </div>

                {/* Content (Selalu di atas gambar) */}
                <div className="relative z-10 p-4 md:p-5 flex flex-col justify-end h-full text-white">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[8px] md:text-[10px] font-black uppercase tracking-wider border-2 border-white/20 bg-white/10 backdrop-blur-sm mb-2">
                      {article.category}
                    </span>
                    <h3 className={`font-black leading-tight mb-1 group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-xl md:text-4xl' : 'text-sm md:text-lg'}`}>
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>

        </div>
      </div>
    </div>
  );
}