'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useToast } from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isWaMode, setIsWaMode] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let formattedPhone = phone;
    if (phone.startsWith('0')) formattedPhone = '62' + phone.slice(1);

    const { error } = await supabase.auth.signInWithOtp({
      phone: formattedPhone,
      options: {
        channel: 'whatsapp',
      },
    });

    if (error) {
      showToast(error.message, "error");
      setIsLoading(false);
    } else {
      setIsOtpSent(true);
      setIsLoading(false);
      showToast("OTP dikirim ke WhatsApp!", "success");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let formattedPhone = phone;
    if (phone.startsWith('0')) formattedPhone = '62' + phone.slice(1);

    const { error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      showToast("Kode OTP salah!", "error");
      setIsLoading(false);
    } else {
      showToast("Login Berhasil!", "success");
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-pattern flex flex-col justify-center items-center p-4">
      
      <div className="absolute top-6 left-6">
        <Link href="/" className="w-10 h-10 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center text-slate-900 shadow-hard btn-brutal">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 border-2 border-slate-900 shadow-hard relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Masuk Dulu, Bos.</h1>
          <p className="text-slate-500 font-bold text-sm mb-8">Pilih jalan ninja lo buat login.</p>

          {!isWaMode && (
            <>
              <button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-4 bg-white text-slate-900 rounded-xl font-bold border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-50 transition flex justify-center items-center gap-3 mb-4 shadow-sm"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Masuk pake Google
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Atau</span></div>
              </div>

              <button 
                onClick={() => setIsWaMode(true)}
                className="w-full py-4 bg-[#25D366] text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-[#20bd5a] transition flex justify-center items-center gap-2"
              >
                <i className="fa-brands fa-whatsapp text-xl"></i> Masuk pake WhatsApp
              </button>
            </>
          )}

          {isWaMode && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Nomor WhatsApp</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0812xxxx" 
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#25D366] rounded-xl px-4 py-3 text-sm font-bold outline-none transition-colors"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-[#25D366] text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-[#20bd5a] transition flex justify-center items-center gap-2"
                  >
                    {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Kirim Kode OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-left">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Masukin Kode OTP</label>
                    <input 
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456" 
                      className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#25D366] rounded-xl px-4 py-3 text-center text-xl font-black outline-none transition-colors tracking-widest"
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-black shadow-hard border-2 border-slate-900 hover:bg-primary transition"
                  >
                    {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verifikasi & Masuk"}
                  </button>
                </form>
              )}

              <button 
                onClick={() => { setIsWaMode(false); setIsOtpSent(false); }}
                className="mt-6 text-xs font-bold text-slate-400 hover:text-slate-900 underline"
              >
                Kembali ke pilihan login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}