'use client';

import { useState, useEffect, createContext, useContext } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Hilang dalam 3 detik
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Container */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in slide-in-from-top-5 fade-in duration-300">
          <div className={`
            flex items-center gap-3 p-4 rounded-xl border-2 border-slate-900 shadow-hard
            ${toast.type === 'success' ? 'bg-green-100' : toast.type === 'error' ? 'bg-red-100' : 'bg-white'}
          `}>
            <div className={`
              w-10 h-10 rounded-full border-2 border-slate-900 flex items-center justify-center text-lg shrink-0
              ${toast.type === 'success' ? 'bg-green-500 text-white' : toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'}
            `}>
              {toast.type === 'success' && <i className="fa-solid fa-check"></i>}
              {toast.type === 'error' && <i className="fa-solid fa-xmark"></i>}
              {toast.type === 'info' && <i className="fa-solid fa-info"></i>}
            </div>
            <div>
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider">
                {toast.type === 'success' ? 'Berhasil!' : toast.type === 'error' ? 'Gagal!' : 'Info'}
              </h4>
              <p className="text-xs font-bold text-slate-600 leading-tight">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};