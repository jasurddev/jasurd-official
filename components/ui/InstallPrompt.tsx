'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[100] bg-slate-900 text-white p-4 rounded-2xl shadow-hard border-2 border-white flex items-center justify-between animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div>
        <h4 className="font-black text-sm">Install JASURD App 📱</h4>
        <p className="text-xs text-slate-300">Akses lebih cepet tanpa buka browser.</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setShowPrompt(false)}
          className="text-xs font-bold text-slate-400 hover:text-white px-2"
        >
          Nanti
        </button>
        <button 
          onClick={handleInstall}
          className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-black shadow-sm active:scale-95 transition"
        >
          Install
        </button>
      </div>
    </div>
  );
}