'use client';

import { useState, useEffect } from 'react';
import ModalCheckout from './ModalCheckout';

interface ModalOrderDetailsProps {
  onClose: () => void;
  gigTitle: string;
  price: number;
  unit: string; // flat, hour, day, etc.
}

export default function ModalOrderDetails({ onClose, gigTitle, price, unit }: ModalOrderDetailsProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);

  // Hitung total harga otomatis
  useEffect(() => {
    if (unit === 'flat') {
      setTotalPrice(price);
    } else {
      setTotalPrice(price * duration);
    }
  }, [duration, price, unit]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  if (showCheckout) {
    return <ModalCheckout onClose={onClose} totalPrice={totalPrice} />;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
        
        <h3 className="font-black text-2xl text-slate-900 mb-1">Order Details 📝</h3>
        <p className="text-xs text-slate-500 font-bold mb-6">Lengkapi data sebelum bayar.</p>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCheckout(true); }}>
          
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <p className="text-xs font-bold text-slate-500">Jasa</p>
            <p className="font-black text-slate-900 text-sm line-clamp-1">{gigTitle}</p>
          </div>

          <div className="flex gap-2">
             <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Tanggal</label>
                <input type="date" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" required />
             </div>
             <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Jam</label>
                <input type="time" className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none" required />
             </div>
          </div>

          {/* INPUT DURASI (Hanya muncul kalau bukan Flat) */}
          {unit !== 'flat' && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                Durasi ({unit === 'hour' ? 'Jam' : unit === 'day' ? 'Hari' : unit})
              </label>
              <div className="flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={() => setDuration(Math.max(1, duration - 1))}
                  className="w-10 h-10 bg-slate-100 rounded-lg font-black text-slate-600 hover:bg-slate-200"
                >-</button>
                <input 
                  type="number" 
                  value={duration} 
                  onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                  className="flex-1 text-center font-black text-lg outline-none border-b-2 border-slate-200 focus:border-slate-900 py-1"
                />
                <button 
                  type="button" 
                  onClick={() => setDuration(duration + 1)}
                  className="w-10 h-10 bg-slate-100 rounded-lg font-black text-slate-600 hover:bg-slate-200"
                >+</button>
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Catatan Khusus</label>
            <textarea rows={2} placeholder="Contoh: Tolong pake baju batik ya." className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-medium shadow-sm outline-none"></textarea>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border-2 border-slate-900 flex justify-between items-center text-white shadow-hard">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Bayar</p>
              <p className="font-black text-xl">{formatRupiah(totalPrice)}</p>
            </div>
            <button type="submit" className="bg-white text-slate-900 px-6 py-2 rounded-lg font-black text-sm hover:bg-accent transition">
              Lanjut
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
