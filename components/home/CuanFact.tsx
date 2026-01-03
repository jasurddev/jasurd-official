'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';

const CuanFactSection = () => {
  const supabase = createClient();
  const [facts, setFacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchFacts = async () => {
      const { data } = await supabase.from('cuan_facts').select('*').eq('is_active', true).order('created_at', { ascending: false });
      setFacts(data || []);
    };
    fetchFacts();
  }, [supabase]);

  if (facts.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-white border-b-2 border-slate-900">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Cuan Fact 💸</h2>
          <Link href="/insight" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1">
            Lihat Insight <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {facts.map((fact) => (
            <div key={fact.id} className="min-w-[260px] w-[260px] snap-center bg-white rounded-3xl border-2 border-slate-900 shadow-hard flex flex-col overflow-hidden h-full flex-shrink-0 group hover:-translate-y-1 transition-transform">
              <div className="p-5 flex-grow flex flex-col justify-center">
                <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{fact.number}</h3>
                <p className="text-xs font-bold text-slate-700 leading-snug mb-3">"{fact.text}"</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-auto">{fact.source}</p>
              </div>
              <div className={`${fact.theme} p-4 border-t-2 border-slate-900`}>
                <p className="text-[9px] font-black text-slate-600 uppercase mb-1">Peluang Cuan 👇</p>
                <p className="text-xs font-bold text-slate-800 mb-3">{fact.trigger}</p>
                <button className={`w-full py-2 ${fact.accent} rounded-lg font-black text-[10px] border-2 border-slate-900 shadow-sm active:scale-95 transition flex items-center justify-center gap-2`}>
                  {fact.idea} <i className="fa-solid fa-bolt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuanFactSection;