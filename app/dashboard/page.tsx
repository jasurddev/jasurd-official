'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

export default function AdminDashboard() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    users: 0,
    gigs: 0,
    articles: 0,
    facts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { count: users } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: gigs } = await supabase.from('gigs').select('*', { count: 'exact', head: true });
      const { count: articles } = await supabase.from('articles').select('*', { count: 'exact', head: true });
      const { count: facts } = await supabase.from('cuan_facts').select('*', { count: 'exact', head: true });

      setStats({
        users: users || 0,
        gigs: gigs || 0,
        articles: articles || 0,
        facts: facts || 0
      });
    };
    fetchStats();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-2">Dashboard Minsurd 👑</h1>
      <p className="text-slate-500 font-bold mb-8">Pantau kerajaan bisnis absurd lo dari sini.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card Users */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-500 text-sm uppercase">Total User</h3>
            <i className="fa-solid fa-users text-slate-300 text-xl"></i>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.users}</p>
        </div>

        {/* Card Gigs */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-500 text-sm uppercase">Total Jasa</h3>
            <i className="fa-solid fa-briefcase text-slate-300 text-xl"></i>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.gigs}</p>
        </div>

        {/* Card Articles */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-500 text-sm uppercase">Artikel</h3>
            <i className="fa-solid fa-newspaper text-slate-300 text-xl"></i>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.articles}</p>
        </div>

        {/* Card Facts */}
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard flex flex-col justify-between h-32">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-500 text-sm uppercase">Cuan Facts</h3>
            <i className="fa-solid fa-lightbulb text-slate-300 text-xl"></i>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.facts}</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h3 className="font-black text-xl text-slate-900 mb-4">Aksi Cepat ⚡</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/dashboard/admin/post-article" className="bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-primary transition flex items-center gap-3">
            <i className="fa-solid fa-pen-nib"></i> Tulis Artikel Baru
          </a>
          <a href="/dashboard/admin/cuan-fact" className="bg-white text-slate-900 border-2 border-slate-900 p-4 rounded-xl font-bold hover:bg-slate-50 transition flex items-center gap-3">
            <i className="fa-solid fa-plus"></i> Tambah Cuan Fact
          </a>
        </div>
      </div>
    </div>
  );
}