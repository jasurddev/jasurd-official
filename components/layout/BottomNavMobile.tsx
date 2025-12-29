"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavMobile = () => {
  const pathname = usePathname();

  // Helper function untuk cek active state
  // Menggunakan startsWith untuk sub-routes (misal /insight/detail tetap aktif di Insight)
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav id="mobile-bottom-nav" className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-900 shadow-hard rounded-2xl z-[90] h-16 flex items-center gap-1 px-2 transition-all duration-300 md:hidden w-[90%] max-w-[350px]">
      
      {/* Home */}
      <Link 
        href="/" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/') ? 'text-primary bg-slate-50' : 'text-slate-400'}`}
      >
        <i className="fa-solid fa-house text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Home</span>
      </Link>

      {/* Insight */}
      <Link 
        href="/insight" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/insight') ? 'text-primary bg-slate-50' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-lightbulb text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Insight</span>
      </Link>

      {/* Center Button (Lounge) - Main Action */}
      <Link 
        href="/lounge" 
        className="w-12 h-12 bg-slate-900 rounded-xl text-white shadow-md flex items-center justify-center text-xl active:scale-90 transition -mt-8 border-2 border-slate-900 hover:bg-primary hover:border-primary"
        aria-label="Lounge Marketplace"
      >
        <i className="fa-solid fa-store"></i>
      </Link>

      {/* Inbox */}
      <Link 
        href="/inbox" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 relative ${isActive('/inbox') ? 'text-primary bg-slate-50' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-comment-dots text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Inbox</span>
        {/* Notification Dot (Hardcoded for now) */}
        <span className="absolute top-3 right-4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </Link>

      {/* Akun / Dashboard */}
      <Link 
        href="/dashboard" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/dashboard') ? 'text-primary bg-slate-50' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-user text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Akun</span>
      </Link>

    </nav>
  );
};

export default BottomNavMobile;