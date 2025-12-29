'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/Toast'; // Import Hook

interface ModalWithdrawProps {
  onClose: () => void;
}

export default function ModalWithdraw({ onClose }: ModalWithdrawProps) {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast(); // Panggil Hook
  const saldo = 150000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(amount) > saldo) {
      // Ganti alert dengan showToast
      showToast("Saldo gak cukup, Bos! Kerja lagi sana.", "error");
      return;
    }
    if (Number(amount) < 10000) {
      showToast("Minimal ceban (10rb) ya.", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Ganti alert sukses
      showToast(`Sukses narik Rp ${Number(amount).toLocaleString()}!`, "success");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full md:max-w-md rounded-3xl p-6 border-2 border-slate-900 shadow-hard animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        {/* Handle Bar (Mobile Visual) */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-black text-2xl text-slate-900">Tarik Saldo 💸</h3>
          <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border border-green-200 mb-6 flex justify-between items-center">
          <span className="text-xs font-bold text-green-700">Saldo Tersedia</span>
          <span className="font-black text-green-700 text-lg">Rp {saldo.toLocaleString()}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nominal (Rp)</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimal 10.000" 
              className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none transition-colors"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Rekening Tujuan</label>
            <div className="relative">
              <select className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none appearance-none">
                <option>BCA - 1234567890 (Budi S)</option>
                <option>GoPay - 08123456789</option>
                <option>DANA - 08123456789</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-hard border-2 border-slate-900 text-lg mt-4 hover:bg-primary transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>Processing <i className="fa-solid fa-spinner fa-spin"></i></>
            ) : (
              "Cairkan Sekarang"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}