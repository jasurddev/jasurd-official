'use client';

interface ModalOrderDetailsProps {
  onClose: () => void; // Prop wajib untuk menutup modal
}

export default function ModalOrderDetails({ onClose }: ModalOrderDetailsProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
        
        <h3 className="font-black text-2xl text-slate-900 mb-1">Order Details 📝</h3>
        <p className="text-xs text-slate-500 font-bold mb-6">Lengkapi data sebelum bayar.</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Lanjut ke Payment!'); onClose(); }}>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tanggal Misi</label>
            <input type="date" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Catatan Khusus</label>
            <textarea rows={3} placeholder="Contoh: Tolong pake baju batik ya pas dateng." className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium shadow-sm outline-none"></textarea>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500">Total Bayar</span>
            <span className="font-black text-xl text-slate-900">Rp 150.000</span>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-900 transition">
              Batal
            </button>
            <button type="submit" className="flex-[2] py-3 bg-primary text-white rounded-xl font-bold shadow-hard border-2 border-slate-900 hover:bg-primary-dark transition">
              Bayar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}