'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function EditGigPage() {
  const supabase = createClient();
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Jastip',
    price: '',
    unit: 'flat',
    type: 'solver',
    is_active: true
  });

  useEffect(() => {
    const fetchGig = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const { data, error } = await supabase
        .from('gigs')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id) // Pastikan punya sendiri
        .single();

      if (error || !data) {
        showToast("Jasa tidak ditemukan atau bukan punya lo!", "error");
        router.push('/dashboard');
        return;
      }

      setFormData({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        unit: data.unit,
        type: data.type,
        is_active: data.is_active
      });
      setLoading(false);
    };
    fetchGig();
  }, [params.id, router, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('gigs')
      .update({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit,
        is_active: formData.is_active
      })
      .eq('id', params.id);

    if (error) {
      showToast("Gagal update jasa!", "error");
    } else {
      showToast("Jasa berhasil diupdate!", "success");
      router.push('/dashboard');
      router.refresh();
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus jasa ini? Gak bisa balik lho.")) return;
    
    const { error } = await supabase.from('gigs').delete().eq('id', params.id);
    if (error) {
      showToast("Gagal hapus!", "error");
    } else {
      showToast("Jasa dihapus.", "success");
      router.push('/dashboard');
      router.refresh();
    }
  };

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-20 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Edit Jasa ✏️</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none" required />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Harga</label>
              <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none" required />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Satuan</label>
              <select value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none">
                <option value="flat">Flat</option>
                <option value="hour">/ Jam</option>
                <option value="day">/ Hari</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
            <textarea rows={4} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none" required></textarea>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input 
              type="checkbox" 
              id="isActive" 
              checked={formData.is_active} 
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="w-5 h-5 accent-primary"
            />
            <label htmlFor="isActive" className="text-sm font-bold text-slate-700">Tampilkan Jasa Ini (Aktif)</label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={handleDelete} className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl font-bold border-2 border-red-100 hover:border-red-500 transition">
              Hapus Jasa
            </button>
            <button type="submit" disabled={saving} className="flex-[2] py-3 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-primary-dark transition disabled:opacity-70">
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}