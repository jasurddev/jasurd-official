'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return router.push('/login');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        alert("Eits, area terlarang! Cuma Minsurd yang boleh masuk.");
        router.push('/dashboard');
      } else {
        setIsAdmin(true);
      }
      setLoading(false);
    };
    checkAdmin();
  }, [router, supabase]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking Access...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block fixed h-full">
        <h1 className="text-2xl font-black mb-8 text-accent">MINSURD 👑</h1>
        <nav className="space-y-4">
          <Link href="/dashboard/admin" className="block py-2 px-4 rounded hover:bg-slate-800">Dashboard</Link>
          <Link href="/dashboard/admin/articles" className="block py-2 px-4 rounded hover:bg-slate-800">Artikel (Insight)</Link>
          <Link href="/dashboard/admin/cuan-fact" className="block py-2 px-4 rounded hover:bg-slate-800">Cuan Fact</Link>
          <Link href="/" className="block py-2 px-4 rounded hover:bg-slate-800 text-slate-400 mt-8">Ke Website Utama</Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}