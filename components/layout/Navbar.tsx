'use client'; // Ubah jadi Client Component biar bisa cek auth

import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Cek Status Login
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();

    // Listen perubahan auth (Login/Logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b-2 border-slate-900 transition-all duration-300" id="main-header">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none" aria-label="JASURD Home">
          <div className="relative h-8 md:h-10 w-32 md:w-40 flex items-center">
             <Image 
               src="/logodark.svg" 
               alt="JASURD Logo" 
               fill
               className="object-contain object-left"
               priority
             />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 bg-white p-1.5 rounded-full border-2 border-slate-900 shadow-hard-sm">
          <Link href="/lounge" className="px-6 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-900 hover:text-white cursor-pointer transition">
            Lounge
          </Link>
          <Link href="/insight" className="px-6 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer">
            Insight
          </Link>
          <Link href="/how-to" className="px-6 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer">
            Cara Main
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Inbox & Notif (Hanya muncul kalau login) */}
          {user && (
            <>
              <Link href="/inbox" className="hidden md:flex w-10 h-10 items-center justify-center bg-white border-2 border-slate-900 rounded-lg shadow-hard-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition relative" title="Inbox">
                <i className="fa-regular fa-comment-dots text-lg"></i>
                {/* Dot Merah (Nanti bisa dibikin dinamis) */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
              </Link>

              <button className="hidden md:flex w-10 h-10 items-center justify-center bg-white border-2 border-slate-900 rounded-lg shadow-hard-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition relative" aria-label="Notifications">
                <i className="fa-regular fa-bell text-lg"></i>
              </button>
            </>
          )}

          {/* Auth Buttons / User Menu */}
          <div className="flex items-center gap-3">
            {user ? (
              // SUDAH LOGIN
              <>
                <Link href="/dashboard" className="hidden md:flex items-center gap-2 bg-slate-100 pl-1 pr-4 py-1 rounded-full border-2 border-transparent hover:border-slate-900 transition group">
                  <div className="w-8 h-8 bg-slate-300 rounded-full overflow-hidden border border-slate-400">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.user_metadata.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasurd"} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900 truncate max-w-[100px]">
                    {user.user_metadata.full_name?.split(' ')[0]}
                  </span>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl border-2 border-red-100 hover:border-red-500 transition shadow-sm"
                  title="Logout"
                >
                  <i className="fa-solid fa-power-off"></i>
                </button>
              </>
            ) : (
              // BELUM LOGIN
              <>
                <Link href="/login" className="hidden md:block font-bold text-slate-900 hover:text-primary transition text-sm px-2">
                  Masuk
                </Link>
                <Link href="/register" className="bg-primary text-white px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-sm shadow-hard btn-brutal hover:bg-primary-dark">
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;