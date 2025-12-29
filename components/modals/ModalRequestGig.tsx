'use client';

import { useState } from 'react';

interface ModalRequestGigProps {
  onClose: () => void;
}

export default function ModalRequestGig({ onClose }: ModalRequestGigProps) {
  const [desc, setDesc] = useState('');

  const useTemplate = () => {
    setDesc("Halo, gue butuh bantuan buat... Syaratnya cuma: 1. Jujur, 2. Fast respon. Budget bisa nego tipis.");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 max-h-[90vh] flex flex-col">
        
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden shrink-0"></div>
        
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h3 className="font-black text-2xl text-slate-900">Butuh Bantuan? 🆘</h3>
            <p className="text-xs text-slate-500 font-bold">Posting misi biar Solver nyamperin lo.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <form className="space-y-5 pb-6" onSubmit={(e) => { e.preventDefault(); alert('Misi Diposting!'); onClose(); }}>
            
            {/* Basic Info */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Misi</label>
              <input type="text" placeholder="Contoh: Butuh partner kondangan sabtu ini" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none transition-colors" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
                <div className="relative">
                  <select className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none appearance-none">
                    <option>Jastip (Cari Barang)</option>
                    <option>Social (Temen Jalan)</option>
                    <option>Digital (Edit/Joki)</option>
                    <option>Urgent / Darurat</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
              <div className="w-1/3">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Budget</label>
                <input type="number" placeholder="100k" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Lokasi & Waktu</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Lokasi (Opsional)" className="flex-1 bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" />
                <input type="text" placeholder="Kapan?" className="flex-1 bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase">Detail Misi</label>
                <button type="button" onClick={useTemplate} className="text-[10px] font-bold text-primary hover:underline">
                  Pakai Template
                </button>
              </div>
              <textarea 
                rows={4} 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Jelasin apa yang harus Solver lakuin..." 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium shadow-sm outline-none"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-hard border-2 border-slate-900 text-lg hover:bg-primary transition-all flex justify-center items-center gap-2">
              Posting Misi <i className="fa-solid fa-rocket"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}