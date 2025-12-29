'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ModalWithdraw from '@/components/modals/ModalWithdraw'; // Pastikan path benar
import ModalPostGig from '@/components/modals/ModalPostGig'; // Untuk tombol "Tambah Jasa"

export default function DashboardPage() {
  // State Modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showPostGig, setShowPostGig] = useState(false);

  // Mock User Data
  const user = {
    name: "Budi Santoso",
    username: "@budisans",
    level: "Solver Level 1",
    saldo: 150000,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    stats: {
      cuan: "1.5jt",
      misi: 12,
      rating: 4.9
    }
  };

  return (
    <div className="min-h-screen bg-pattern pb-32 pt-20 md:pt-24">
      
      {/* 1. Header Profil (Sticky Top Mobile) */}
      <div className="fixed top-16 md:top-20 left-0 w-full bg-white/90 backdrop-blur border-b-2 border-slate-900 z-30 px-4 py-3 md:px-6 md:py-4 transition-all">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-black text-slate-900 leading-tight">{user.name}</h2>
              <span className="inline-block bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                {user.level}
              </span>
            </div>
          </div>
          <button 
            onClick={() => alert('Logout?')} 
            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl border-2 border-red-100 hover:border-red-500 transition"
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 md:px-6 mt-4 space-y-6">
        
        {/* 2. Wallet Card */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-hard border-2 border-slate-900">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Saldo Dompet</p>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-black border border-green-500/50 flex items-center gap-1">
                <i className="fa-solid fa-lock"></i> Aman
              </div>
            </div>
            <h2 className="text-4xl font-black mb-6">Rp {user.saldo.toLocaleString('id-ID')}</h2>
            
            <div className="flex gap-3">
              <button 
                onClick={() => alert('Fitur Top Up Segera Hadir!')}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold border border-white/20 transition active:scale-95"
              >
                Top Up
              </button>
              <button 
                onClick={() => setShowWithdraw(true)}
                className="flex-1 bg-white text-slate-900 py-3 rounded-xl text-sm font-bold border-2 border-transparent hover:border-slate-200 transition active:scale-95 shadow-sm"
              >
                Tarik Dana
              </button>
            </div>
          </div>
        </div>

        {/* 3. Statistik Ringkas (Bento Grid Kecil) */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center flex flex-col justify-center min-h-[90px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Cuan</p>
            <p className="text-sm font-black text-green-600 truncate">Rp {user.stats.cuan}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center flex flex-col justify-center min-h-[90px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Misi Beres</p>
            <p className="text-xl font-black text-slate-900">{user.stats.misi}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 text-center flex flex-col justify-center min-h-[90px]">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rating</p>
            <p className="text-xl font-black text-slate-900 flex items-center justify-center gap-1">
              {user.stats.rating} <i className="fa-solid fa-star text-yellow-400 text-xs"></i>
            </p>
          </div>
        </div>

        {/* 4. Action Button: Tambah Jasa */}
        <button 
          onClick={() => setShowPostGig(true)}
          className="w-full py-4 bg-accent border-2 border-slate-900 rounded-2xl flex items-center justify-between px-6 shadow-hard card-hoverable group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-slate-900 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="text-left">
              <h3 className="font-black text-slate-900 text-lg">Tambah Jasa Baru</h3>
              <p className="text-xs text-slate-800 font-bold">Mulai jualan skill unik lo.</p>
            </div>
          </div>
          <i className="fa-solid fa-chevron-right text-slate-900"></i>
        </button>

        {/* 5. Active Orders (Empty State for now) */}
        <div>
          <h3 className="font-black text-slate-900 mb-4 pl-1 text-lg flex justify-between items-center">
            Jadwal Misi 📅
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Riwayat</span>
          </h3>
          
          <div className="text-center p-8 bg-white rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-[150px]">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 text-xl mb-3">
               <i className="fa-regular fa-calendar-xmark"></i>
            </div>
            <p className="text-slate-500 text-xs font-bold mb-2">Belum ada orderan aktif.</p>
            <button onClick={() => setShowPostGig(true)} className="text-primary text-xs font-black underline">
              Promosiin Jasa Lo Dulu!
            </button>
          </div>
        </div>

        {/* 6. Menu Grid (Navigasi Tambahan) */}
        <div className="grid grid-cols-2 gap-3">
           <Link href="/u/budisans" className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 transition flex items-center gap-3 group">
              <i className="fa-regular fa-eye text-slate-400 group-hover:text-slate-900"></i>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Lihat Profil Publik</span>
           </Link>
           <button className="bg-white p-4 rounded-2xl border-2 border-slate-200 hover:border-slate-900 transition flex items-center gap-3 group text-left">
              <i className="fa-solid fa-gear text-slate-400 group-hover:text-slate-900"></i>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900">Pengaturan Akun</span>
           </button>
        </div>

      </div>

      {/* MODALS */}
      {/* Render Modal Component jika state true */}
      {showWithdraw && <ModalWithdraw onClose={() => setShowWithdraw(false)} />}
      {showPostGig && <ModalPostGig onClose={() => setShowPostGig(false)} />}

    </div>
  );
}