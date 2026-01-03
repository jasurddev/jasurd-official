'use client';

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Hide footer di halaman chat room, login, register
  const isHidden = pathname.startsWith('/inbox/') && pathname !== '/inbox' || pathname === '/login' || pathname === '/register';

  if (isHidden) return null;

  return <Footer />;
}