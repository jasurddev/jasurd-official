'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi Login
    setTimeout(() => {
      setIsLoading(false);
      showToast("Welcome back, Sultan! 👋", "success");
      router.push('/dashboard'); // Redirect ke Dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-pattern flex flex-col justify-center items-center p-4">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 shadow-hard btn-brutal">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-hard relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Masuk Dulu, Bos.</h1>
          <p className="text-slate-500 font-bold text-sm mb-8">Lanjutin misi nyari cuan lo hari ini.</p>

          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="text-right mt-2">
                <a href="#" className="text-[10px] font-bold text-primary hover:underline">Lupa password?</a>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary transition disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Gass Masuk 🚀"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-slate-500">
              Belum punya akun? <Link href="/register" className="text-primary hover:underline">Daftar di sini</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}