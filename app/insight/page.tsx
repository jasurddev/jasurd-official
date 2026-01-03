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
        <span className="bg-indigo-100 text-primary border border-indigo-200 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider mb-3 inline-block">Blog & Tips</span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">Wawasan Anti Mainstream.</h1>
        <p className="text-slate-600 font-medium text-lg max-w-2xl">Bacaan buat nambah cuan, tips survival di gig economy, atau sekedar hiburan pas lagi sepi job.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* GRID LAYOUT */}
        {/* Mobile: 1 Kolom (Full Width) biar jelas */}
        {/* Desktop: 3 Kolom (Bento) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          
          {articles.map((article, index) => {
            // Logic Bento Desktop Only
            const isFeatured = index === 0; // Artikel pertama besar (2x2)
            
            return (
              <Link 
                key={article.id}
                href={`/insight/${article.slug}`}
                className={`
                  relative overflow-hidden border-2 border-slate-900 shadow-hard card-hoverable group cursor-pointer rounded-3xl bg-white flex flex-col
                  ${isFeatured ? 'md:col-span-2 md:row-span-2' : 'md:col-span-1 md:row-span-1'}
                  h-full min-h-[250px]
                `}
              >
                {/* Image Background (Full Cover) */}
                <div className="absolute inset-0 z-0">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img 
                     src={article.image_url || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"} 
                     alt={article.title} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                   />
                   {/* Overlay Gradient (Lebih Gelap di Bawah) */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                {/* Content (Text Putih di atas Overlay) */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border border-white/30 bg-white/20 backdrop-blur-md mb-3">
                      {article.category}
                    </span>
                    <h3 className={`font-black leading-tight mb-2 group-hover:underline decoration-2 underline-offset-4 ${isFeatured ? 'text-2xl md:text-4xl' : 'text-xl'}`}>
                      {article.title}
                    </h3>
                    {/* Summary cuma muncul di Featured Desktop */}
                    {isFeatured && (
                      <p className="hidden md:block text-sm font-medium text-slate-300 line-clamp-2">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
}