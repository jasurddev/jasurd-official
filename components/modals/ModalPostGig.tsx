'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

interface ModalPostGigProps {
  onClose: () => void;
}

export default function ModalPostGig({ onClose }: ModalPostGigProps) {
  const supabase = createClient();
  const { showToast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Jastip',
    price: '',
    unit: 'flat',
    type: 'solver', // Default Solver
  });

  // AI Magic Writer
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMagicText = () => {
    if (!keyword) return showToast("Isi kata kuncinya dulu, Bos!", "error");
    setIsGenerating(true);
    setTimeout(() => {
      if (formData.type === 'solver') {
        setFormData(prev => ({
          ...prev,
          title: `Jasa ${keyword} Anti Ribet (Lo Tau Beres)`,
          description: `Masih jaman ${keyword} sendiri? Capek, Bos! Mending gue yang kerjain. Skill gue di atas rata-rata, mental baja, dan pastinya lebih gercep dari harapan orang tua lo. Gas order sekarang sebelum gue sibuk!`
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          title: `Butuh Bantuan ${keyword} (Urgent!)`,
          description: `Gue lagi butuh banget orang buat ${keyword}. Syaratnya cuma jujur, gercep, dan gak baperan. Budget bisa nego tipis. Tolongin gue plis!`
        }));
      }
      setIsGenerating(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      showToast("Login dulu woy!", "error");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('gigs')
      .insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        unit: formData.unit,
        type: formData.type, // Masukkan tipe
        is_active: true
      });

    if (error) {
      console.error("Supabase Error:", error.message);
      showToast(`Gagal: ${error.message}`, "error");
    } else {
      showToast(formData.type === 'solver' ? "Jasa tayang!" : "Request diposting!", "success");
      router.refresh();
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300 max-h-[90vh] flex flex-col">
        
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden shrink-0"></div>
        
        <div className="flex justify-between items-center mb-6 shrink-0">
          <div>
            <h3 className="font-black text-2xl text-slate-900">Posting Baru 📢</h3>
            <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">Free Listing</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          
          {/* TIPE POSTING (SWITCHER) */}
          <div className="bg-slate-100 p-1 rounded-xl flex mb-6">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'solver'})}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${formData.type === 'solver' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Jual Jasa (Solver)
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'seeker'})}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition ${formData.type === 'seeker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Cari Bantuan (Seeker)
            </button>
          </div>

          {/* AI SECTION */}
          <div className="bg-indigo-50 border-2 border-indigo-100 rounded-2xl p-4 mb-6 relative group hover:border-primary transition-colors">
            <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-black px-2 py-1 rounded-bl-lg">BETA</div>
            <label className="flex items-center gap-2 text-sm font-black text-primary mb-3">
              <i className="fa-solid fa-wand-magic-sparkles"></i> Dukun Teks (AI Writer)
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={formData.type === 'solver' ? "Jasa apa?" : "Butuh apa?"} 
                className="flex-1 bg-white border-2 border-indigo-200 focus:border-primary rounded-xl px-3 py-2 text-xs font-bold outline-none"
              />
              <button 
                type="button" 
                onClick={generateMagicText}
                disabled={isGenerating}
                className="bg-slate-900 text-white px-4 rounded-lg text-xs font-bold hover:bg-primary transition shadow-md"
              >
                {isGenerating ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-bolt"></i>}
              </button>
            </div>
          </div>

          <form className="space-y-5 pb-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Judul</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" 
                placeholder={formData.type === 'solver' ? "Contoh: Jasa Nemenin Kondangan" : "Contoh: Butuh Teman Kondangan"} 
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Kategori</label>
                <div className="relative">
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none appearance-none"
                  >
                    <option value="Jastip">Jastip</option>
                    <option value="Social">Social</option>
                    <option value="Digital">Digital</option>
                    <option value="Absurd">Absurd</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-[2]">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{formData.type === 'solver' ? 'Harga (Rp)' : 'Budget (Rp)'}</label>
                <input 
                  type="number" 
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" 
                  placeholder="50000" 
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Satuan</label>
                <div className="relative">
                  <select 
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none appearance-none"
                  >
                    <option value="flat">Flat</option>
                    <option value="hour">/ Jam</option>
                    <option value="day">/ Hari</option>
                  </select>
                  <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Deskripsi</label>
              <textarea 
                rows={4} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium shadow-sm outline-none" 
                placeholder="Jelasin detailnya..."
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:translate-y-[-2px] transition disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : (formData.type === 'solver' ? "Tayangkan Jasa 🚀" : "Posting Request 🆘")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}