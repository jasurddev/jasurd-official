'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

export default function ManageCuanFact() {
  const supabase = createClient();
  const [facts, setFacts] = useState<any[]>([]);
  const [form, setForm] = useState({
    number: '', text: '', source: '', trigger: '', idea: '', theme: 'bg-white', accent: 'bg-slate-900 text-white'
  });

  const fetchFacts = async () => {
    const { data } = await supabase.from('cuan_facts').select('*').order('created_at', { ascending: false });
    setFacts(data || []);
  };

  useEffect(() => { fetchFacts(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('cuan_facts').insert(form);
    setForm({ number: '', text: '', source: '', trigger: '', idea: '', theme: 'bg-white', accent: 'bg-slate-900 text-white' });
    fetchFacts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus?")) return;
    await supabase.from('cuan_facts').delete().eq('id', id);
    fetchFacts();
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-slate-900 mb-6">Manage Cuan Fact 💸</h1>

      {/* Form Tambah */}
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-900 shadow-hard mb-8">
        <h3 className="font-bold mb-4">Tambah Fakta Baru</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input placeholder="Angka (65%)" value={form.number} onChange={e => setForm({...form, number: e.target.value})} className="border p-2 rounded" required />
          <input placeholder="Sumber (BPS)" value={form.source} onChange={e => setForm({...form, source: e.target.value})} className="border p-2 rounded" required />
          <textarea placeholder="Fakta (Teks)" value={form.text} onChange={e => setForm({...form, text: e.target.value})} className="border p-2 rounded col-span-2" required />
          <input placeholder="Trigger (Anak Pesantren Cek!)" value={form.trigger} onChange={e => setForm({...form, trigger: e.target.value})} className="border p-2 rounded" required />
          <input placeholder="Ide Bisnis (Jasa Ngaji)" value={form.idea} onChange={e => setForm({...form, idea: e.target.value})} className="border p-2 rounded" required />
          
          <select value={form.theme} onChange={e => setForm({...form, theme: e.target.value})} className="border p-2 rounded">
            <option value="bg-white">Putih</option>
            <option value="bg-green-100">Hijau</option>
            <option value="bg-pink-100">Pink</option>
            <option value="bg-orange-100">Orange</option>
            <option value="bg-blue-100">Biru</option>
          </select>
          
          <button type="submit" className="bg-primary text-white p-2 rounded font-bold col-span-2">Simpan Fakta</button>
        </form>
      </div>

      {/* List Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {facts.map((fact) => (
          <div key={fact.id} className={`${fact.theme} p-4 rounded-xl border-2 border-slate-900 relative`}>
            <button onClick={() => handleDelete(fact.id)} className="absolute top-2 right-2 text-red-500 font-bold">X</button>
            <h3 className="text-3xl font-black">{fact.number}</h3>
            <p className="text-sm font-bold mb-2">{fact.text}</p>
            <p className="text-xs text-slate-500">{fact.source}</p>
            <div className="mt-4 pt-4 border-t border-slate-900/20">
              <p className="text-xs font-bold">{fact.trigger}</p>
              <p className="text-xs bg-slate-900 text-white px-2 py-1 rounded inline-block mt-1">{fact.idea}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}