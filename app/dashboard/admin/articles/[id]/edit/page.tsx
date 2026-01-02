'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function EditArticlePage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech Hacks',
    summary: '',
    content: '',
    image_url: '',
    is_published: true
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        showToast("Artikel tidak ditemukan!", "error");
        router.push('/dashboard/admin/articles');
        return;
      }

      setFormData({
        title: data.title,
        category: data.category,
        summary: data.summary,
        content: data.content,
        image_url: data.image_url,
        is_published: data.is_published
      });
      setLoading(false);
    };
    fetchArticle();
  }, [params.id, router, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let finalImageUrl = formData.image_url;

    // Upload Gambar Baru (Jika ada)
    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `article-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('gig-images')
        .upload(fileName, file);

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('gig-images').getPublicUrl(fileName);
        finalImageUrl = urlData.publicUrl;
      }
    }

    const { error } = await supabase
      .from('articles')
      .update({
        title: formData.title,
        category: formData.category,
        summary: formData.summary,
        content: formData.content,
        image_url: finalImageUrl,
        is_published: formData.is_published
      })
      .eq('id', params.id);

    if (error) {
      showToast("Gagal update artikel!", "error");
    } else {
      showToast("Artikel berhasil diupdate!", "success");
      router.push('/dashboard/admin/articles');
      router.refresh();
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-pattern pt-24 pb-24 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl border-2 border-slate-900 shadow-hard">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/admin/articles" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1 className="text-3xl font-black text-slate-900">Edit Artikel ✏️</h1>
        </div>
        
        <form onSubmit={handleSave} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image</label>
            {formData.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={formData.image_url} alt="Preview" className="w-full h-40 object-cover rounded-xl mb-4 border-2 border-slate-200" />
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none"
            />
          </div>

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
              <option>Gig Economy</option>
              <option>Generasi Z</option>
              <option>Dunia Kerja</option>
              {/* Tambahkan kategori lain sesuai kebutuhan */}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Summary</label>
            <textarea rows={2} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-medium outline-none" required></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Konten (HTML)</label>
            <textarea rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-mono text-sm outline-none" required></textarea>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input 
              type="checkbox" 
              id="isPublished" 
              checked={formData.is_published} 
              onChange={(e) => setFormData({...formData, is_published: e.target.checked})}
              className="w-5 h-5 accent-primary"
            />
            <label htmlFor="isPublished" className="text-sm font-bold text-slate-700">Publish Artikel Ini</label>
          </div>

          <button type="submit" disabled={saving} className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-primary-dark transition disabled:opacity-70">
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}