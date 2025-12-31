'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import InsightCard from '@/components/home/InsightCard';

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article, index) => (
            <InsightCard 
              key={article.id}
              id={article.slug}
              title={article.title}
              category={article.category}
              summary={article.summary}
              image={article.image_url}
              isFeatured={index === 0} // Artikel pertama jadi featured
              color="bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}