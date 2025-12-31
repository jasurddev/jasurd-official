'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function EditProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const { showToast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    bio: '',
    role: 'newbie'
  });

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setFormData({
          full_name: data.full_name || '',
          username: data.username || '',
          bio: data.bio || '',
          role: data.role || 'newbie'
        });
      }
      setLoading(false);
    };
    getProfile();
  }, [router, supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update ke Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        username: formData.username,
        bio: formData.bio,
        role: formData.role
      })
      .eq('id', user.id);

    if (error) {
      showToast("Gagal update! Username mungkin udah dipake.", "error");
    } else {
      showToast("Profil berhasil diupdate!", "success");
      router.push('/dashboard');
    }
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-pattern flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-pattern pb-24 pt-20 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition">
            <i className="fa-solid fa-arrow-left"></i>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Edit Profil ✏️</h1>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              value={formData.full_name}
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Username (Unik)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">@</span>
              <input 
                type="text" 
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value.toLowerCase().replace(/\s/g, '')})}
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl pl-8 pr-4 py-3 text-sm font-bold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Bio Singkat</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Ceritain skill absurd lo di sini..."
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Role Utama</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold outline-none appearance-none"
            >
              <option value="newbie">Newbie (Baru Belajar)</option>
              <option value="solver">Solver (Jual Jasa)</option>
              <option value="seeker">Seeker (Cari Bantuan)</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark transition disabled:opacity-70 mt-4"
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </form>
      </div>
    </div>
  );
}