'use client';

import { useState } from 'react';

interface ModalCheckoutProps {
  onClose: () => void;
  totalPrice: number;
}

export default function ModalCheckout({ onClose, totalPrice }: ModalCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulasi Payment Gateway
    setTimeout(() => {
      setIsProcessing(false);
      alert("Pembayaran Berhasil! Saldo diamankan di Escrow.");
      onClose();
    }, 2000);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // FIX: Pastikan fungsi ini mengembalikan JSX (div), bukan void
  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="relative bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl p-6 border-t-2 md:border-2 border-slate-900 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-300">
        
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl text-green-600 mx-auto mb-4 border-2 border-green-200">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3 className="font-black text-2xl text-slate-900">Amanin Duit Dulu</h3>
          <p className="text-xs text-slate-500 font-bold mt-1">Uang lo ditahan sistem (Escrow) sampai misi selesai.</p>
        </div>

        <div className="bg-surface p-4 rounded-2xl border-2 border-slate-200 mb-6 space-y-3">
          <div className="flex justify-between text-sm font-bold text-slate-600">
            <span>Harga Jasa</span>
            <span>{formatRupiah(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-slate-600">
            <span>Biaya Layanan (5%)</span>
            <span>{formatRupiah(totalPrice * 0.05)}</span>
          </div>
          <div className="border-t-2 border-slate-200 pt-3 flex justify-between text-lg font-black text-slate-900">
            <span>Total Bayar</span>
            <span>{formatRupiah(totalPrice * 1.05)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark transition disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>Memproses <i className="fa-solid fa-spinner fa-spin"></i></>
            ) : (
              "Bayar Sekarang"
            )}
          </button>
          
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="w-full py-3 bg-white text-slate-500 rounded-xl font-bold hover:text-slate-900 transition text-sm"
          >
            Batal
          </button>
        </div>

      </div>
    </div>
  );
}