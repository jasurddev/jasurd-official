'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

export default function PostArticlePage() {
  const supabase = createClient();
  const { showToast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech Hacks',
    summary: '',
    content: '', // HTML Content
    image_url: '',
  });

  // Helper Slug
  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const slug = createSlug(formData.title);

    const { error } = await supabase
      .from('articles')
      .insert({
        ...formData,
        slug: slug,
        is_published: true, // Langsung publish
        author: 'Admin Jasurd'
      });

    if (error) {
      showToast(`Gagal: ${error.message}`, "error");
    } else {
      showToast("Artikel Terbit! 📰", "success");
      router.push('/insight');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-pattern pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border-2 border-slate-900 shadow-hard">
        <h1 className="text-3xl font-black text-slate-900 mb-6">Tulis Artikel Baru ✍️</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-bold outline-none" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-bold outline-none">
              <option>Tech Hacks</option>
              <option>Success Story</option>
              <option>Safety</option>
              <option>Guide</option>
              <option>Skill</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Image URL (Unsplash)</label>
            <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-medium outline-none" placeholder="https://images.unsplash.com/..." required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Summary (Untuk Card)</label>
            <textarea rows={2} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-medium outline-none" required></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Konten (HTML)</label>
            <textarea rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-mono text-sm outline-none" placeholder="<p>Paragraf 1...</p>" required></textarea>
            <p className="text-[10px] text-slate-400 mt-1">*Support tag HTML dasar: p, h3, strong, ul, li</p>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-primary-dark transition">
            {isLoading ? "Publishing..." : "Publish Artikel"}
          </button>
        </form>
      </div>
    </div>
  );
}