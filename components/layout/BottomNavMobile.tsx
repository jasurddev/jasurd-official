"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavMobile = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isHiddenPage = pathname.startsWith('/inbox/') && pathname !== '/inbox' || pathname === '/login' || pathname === '/register';
  if (isHiddenPage) return null;

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav 
      id="mobile-bottom-nav" 
      className={`
        fixed left-1/2 -translate-x-1/2 bg-white border-2 border-slate-900 shadow-hard rounded-2xl z-[90] 
        h-16 flex items-center justify-between px-4 transition-all duration-300 md:hidden w-[90%] max-w-[350px]
        ${isVisible ? 'bottom-6' : '-bottom-24'}
      `}
    >
      
      {/* Home */}
      <Link 
        href="/" 
        className={`flex flex-col items-center justify-center w-12 h-full transition active:scale-90 ${isActive('/') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-solid fa-house text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Home</span>
      </Link>

      {/* Insight */}
      <Link 
        href="/insight" 
        className={`flex flex-col items-center justify-center w-12 h-full transition active:scale-90 ${isActive('/insight') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-lightbulb text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Insight</span>
      </Link>

      {/* Center Button (Lounge) - Floating */}
      <div className="relative -top-5">
        <Link 
          href="/lounge" 
          className="w-14 h-14 bg-slate-900 rounded-full text-white shadow-hard border-2 border-white flex items-center justify-center text-xl active:scale-90 transition hover:bg-primary"
          aria-label="Lounge Marketplace"
        >
          <i className="fa-solid fa-store"></i>
        </Link>
      </div>

      {/* Inbox */}
      <Link 
        href="/inbox" 
        className={`flex flex-col items-center justify-center w-12 h-full transition active:scale-90 relative ${isActive('/inbox') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-comment-dots text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Inbox</span>
        <span className="absolute top-3 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
      </Link>

      {/* Akun */}
      <Link 
        href="/dashboard" 
        className={`flex flex-col items-center justify-center w-12 h-full transition active:scale-90 ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400'}`}
      >
        <i className="fa-regular fa-user text-lg mb-0.5"></i>
        <span className="text-[9px] font-bold">Akun</span>
      </Link>

    </nav>
  );
};

export default BottomNavMobile;