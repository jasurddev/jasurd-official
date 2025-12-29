'use client';

import { useState } from 'react';

interface ModalPostGigProps {
  onClose: () => void;
}

export default function ModalPostGig({ onClose }: ModalPostGigProps) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keyword, setKeyword] = useState('');
  const [vibe, setVibe] = useState<'savage' | 'profesional' | 'empati'>('savage');
  const [isGenerating, setIsGenerating] = useState(false);

  // Simulasi AI Generator
  const generateMagicText = () => {
    if (!keyword) return alert("Isi kata kunci dulu, Bos!");
    
    setIsGenerating(true);
    setTimeout(() => {
      let newTitle = "";
      let newDesc = "";

      if (vibe === 'savage') {
        newTitle = `Jasa ${keyword} Anti Ribet (Lo Tau Beres)`;
        newDesc = `Masih jaman ${keyword} sendiri? Capek, Bos! Mending gue yang kerjain. Skill gue di atas rata-rata, mental baja, dan pastinya lebih gercep dari harapan orang tua lo. Gas order sekarang sebelum gue sibuk!`;
      } else if (vibe === 'profesional') {
        newTitle = `Layanan ${keyword} Profesional & Terpercaya`;
        newDesc = `Saya menawarkan jasa ${keyword} dengan standar kualitas tinggi. Pengerjaan tepat waktu, detail, dan berorientasi pada kepuasan klien. Portofolio tersedia jika dibutuhkan.`;
      } else {
        newTitle = `Teman ${keyword} yang Mengerti Kamu`;
        newDesc = `Aku tau banget rasanya butuh bantuan soal ${keyword}. Sini, biar aku bantu ringanin beban kamu. Aku bakal lakuin ini sepenuh hati kayak buat diri sendiri. Kamu tinggal duduk manis ya!`;
      }

      setTitle(newTitle);
      setDesc(newDesc);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 max-h-[90vh] flex flex-col">
        
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden shrink-0"></div>
        
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h3 className="font-black text-2xl text-slate-900">Posting Jasa 📢</h3>
            <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">Free Listing</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <form className="space-y-5 pb-6" onSubmit={(e) => { e.preventDefault(); alert('Tayang!'); onClose(); }}>
            
            {/* AI SECTION */}
            <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4 relative group hover:border-primary transition-colors">
              <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-bl-lg">BETA</div>
              <label className="flex items-center gap-2 text-sm font-black text-primary mb-3">
                <i className="fa-solid fa-wand-magic-sparkles"></i> Dukun Teks (AI Writer)
              </label>
              
              <div className="space-y-3">
                <input 
                  type="text" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Kata kunci (mis: bangunin sahur)" 
                  className="w-full bg-white border-2 border-indigo-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold outline-none"
                />
                
                <div className="flex gap-2">
                  {['savage', 'profesional', 'empati'].map((v) => (
                    <button 
                      key={v}
                      type="button" 
                      onClick={() => setVibe(v as any)}
                      className={`flex-1 py-1.5 rounded-lg border-2 text-[10px] font-black uppercase transition ${vibe === v ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-indigo-200 hover:border-primary'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={generateMagicText}
                  disabled={isGenerating}
                  className="w-full py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-primary transition shadow-md flex items-center justify-center gap-2"
                >
                  {isGenerating ? <i className="fa-solid fa-spinner fa-spin"></i> : <span>Mantrakan! <i className="fa-solid fa-bolt"></i></span>}
                </button>
              </div>
            </div>

            {/* FORM INPUTS */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul Jasa</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" placeholder="Contoh: Jasa Nemenin Kondangan" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
                <div className="relative">
                  <select className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none appearance-none">
                    <option>Jastip</option>
                    <option>Social</option>
                    <option>Digital</option>
                    <option>Absurd</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
              <div className="w-1/3">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Harga</label>
                <input type="number" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" placeholder="50k" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
              <textarea rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium shadow-sm outline-none" placeholder="Jelasin detail jasa lo..."></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:translate-y-[-2px] transition">
              Tayangkan Jasa
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}