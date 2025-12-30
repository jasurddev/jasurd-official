"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavMobile = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    // DIET: h-16 jadi h-14. bottom-6 jadi bottom-4.
    <nav id="mobile-bottom-nav" className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white border-2 border-slate-900 shadow-hard rounded-2xl z-[90] h-14 flex items-center gap-1 px-2 transition-all duration-300 md:hidden w-[90%] max-w-[350px]">
      
      {/* Home */}
      <Link 
        href="/" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/') ? 'text-primary' : 'text-slate-400'}`}
      >
        {/* Icon dikecilin dikit */}
        <i className="fa-solid fa-house text-base mb-0.5"></i>
        <span className="text-[8px] font-bold">Home</span>
      </Link>

      {/* Insight */}
      <Link 
        href="/insight" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/insight') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-lightbulb text-base mb-0.5"></i>
        <span className="text-[8px] font-bold">Insight</span>
      </Link>

      {/* Center Button (Lounge) - Lebih Compact */}
      <Link 
        href="/lounge" 
        className="w-10 h-10 bg-slate-900 rounded-xl text-white shadow-md flex items-center justify-center text-lg active:scale-90 transition -mt-6 border-2 border-slate-900 hover:bg-primary hover:border-primary"
        aria-label="Lounge Marketplace"
      >
        <i className="fa-solid fa-store"></i>
      </Link>

      {/* Inbox */}
      <Link 
        href="/inbox" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 relative ${isActive('/inbox') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-comment-dots text-base mb-0.5"></i>
        <span className="text-[8px] font-bold">Inbox</span>
        <span className="absolute top-2 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
      </Link>

      {/* Akun */}
      <Link 
        href="/dashboard" 
        className={`flex-1 flex flex-col items-center justify-center h-full transition cursor-pointer rounded-xl hover:bg-slate-50 active:scale-90 ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-user text-base mb-0.5"></i>
        <span className="text-[8px] font-bold">Akun</span>
      </Link>

    </nav>
  );
};

export default BottomNavMobile;