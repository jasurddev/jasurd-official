'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function ManageArticles() {
  const supabase = createClient();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
      setArticles(data || []);
    };
    fetchArticles();
  }, [supabase]);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus artikel ini?")) return;
    await supabase.from('articles').delete().eq('id', id);
    setArticles(articles.filter(a => a.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-slate-900">Manage Artikel</h1>
        <Link href="/dashboard/admin/post-article" className="bg-primary text-white px-4 py-2 rounded-lg font-bold shadow-hard border-2 border-slate-900 hover:translate-y-[-2px] transition">
          + Tulis Baru
        </Link>
      </div>

      <div className="bg-white rounded-2xl border-2 border-slate-900 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b-2 border-slate-900">
            <tr>
              <th className="p-4 font-black">Judul</th>
              <th className="p-4 font-black">Kategori</th>
              <th className="p-4 font-black">Status</th>
              <th className="p-4 font-black">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-slate-200 hover:bg-slate-50">
                <td className="p-4 font-bold">{article.title}</td>
                <td className="p-4 text-sm">{article.category}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${article.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {article.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:underline text-sm font-bold">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}