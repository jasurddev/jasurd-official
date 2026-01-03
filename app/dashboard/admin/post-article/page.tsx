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
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tech Hacks',
    summary: '',
    content: '',
    image_url: '',
  });

  const createSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // HELPER: Auto Format Text to HTML
  const formatContent = (text: string) => {
    // Kalau udah ada tag HTML, anggap user tau apa yang dia lakukan
    if (text.includes('<p>') || text.includes('<h3>')) return text;
    
    // Kalau teks polos, pisahkan berdasarkan Enter 2x (Paragraf baru)
    return text.split('\n\n').map(para => {
      if (para.trim().startsWith('# ')) return `<h3 class="text-xl font-black text-slate-900 mt-6 mb-2">${para.replace('# ', '')}</h3>`;
      return `<p class="mb-4">${para}</p>`;
    }).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let finalImageUrl = formData.image_url;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `article-${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('gig-images').upload(fileName, file);
      if (uploadError) { showToast("Gagal upload gambar!", "error"); setIsLoading(false); return; }
      const { data: urlData } = supabase.storage.from('gig-images').getPublicUrl(fileName);
      finalImageUrl = urlData.publicUrl;
    }

    const slug = createSlug(formData.title);
    const formattedContent = formatContent(formData.content); // Pake formatter

    const { error } = await supabase
      .from('articles')
      .insert({
        ...formData,
        content: formattedContent,
        image_url: finalImageUrl,
        slug: slug,
        is_published: true,
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
          {/* ... Input Gambar, Judul, Kategori, Summary SAMA ... */}
          {/* Copy paste bagian input dari kode sebelumnya, cuma beda di handleSubmit */}
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-bold outline-none" required />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-bold outline-none">
              <option>Gig Economy</option>
              <option>Generasi Z</option>
              <option>Dunia Kerja</option>
              <option>Ekonomi Sosial</option>
              <option>Jasa Mikro</option>
              <option>Kerja Fleksibel</option>
              <option>Fenomena Sosial</option>
              <option>Ekonomi Digital</option>
              <option>Gaya Hidup Urban</option>
              <option>Perubahan Sosial</option>
              <option>Isu Ketenagakerjaan</option>
              <option>Kerja Non-Formal</option>
              <option>Ekonomi Kreatif</option>
              <option>Tren Anak Muda</option>
              <option>Realitas Pekerja</option>
              <option>Tech Hacks</option>
              <option>Success Story</option>
              <option>Safety</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Summary</label>
            <textarea rows={2} value={formData.summary} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-medium outline-none" required></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Konten</label>
            <textarea rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 font-mono text-sm outline-none" placeholder="Tulis biasa aja. Enter 2x buat paragraf baru. Pake # buat judul sub-bab." required></textarea>
            <p className="text-[10px] text-slate-400 mt-1">*Tips: Enter 2x = Paragraf Baru. # Judul = Sub-bab.</p>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-primary-dark transition">
            {isLoading ? "Publishing..." : "Publish Artikel"}
          </button>
        </form>
      </div>
    </div>
  );
}