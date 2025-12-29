'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Register
    setTimeout(() => {
      setIsLoading(false);
      showToast("Akun jadi! Silakan login.", "success");
      router.push('/login'); // Redirect ke Login
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-pattern flex flex-col justify-center items-center p-4">
      
      <div className="absolute top-6 left-6">
        <Link href="/" className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 shadow-hard btn-brutal">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-hard relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Join the Club.</h1>
          <p className="text-slate-500 font-bold text-sm mb-8">Mulai karir absurd lo di Jasurd sekarang.</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                placeholder="Budi Santoso" 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
              <input 
                type="email" 
                placeholder="contoh@email.com" 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-white border-2 border-slate-200 focus:border-slate-900 rounded-xl px-4 py-3 text-sm font-bold shadow-sm outline-none transition-colors"
                required
              />
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-[10px] font-bold text-slate-500 leading-tight">
                Saya setuju dengan <a href="#" className="text-slate-900 underline">Syarat & Ketentuan</a> Jasurd (termasuk gak baperan).
              </label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark transition disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Daftar Sekarang ✨"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-slate-500">
              Udah punya akun? <Link href="/login" className="text-primary hover:underline">Masuk aja</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}