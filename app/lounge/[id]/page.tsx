'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import ModalOrderDetails from '@/components/modals/ModalOrderDetails';

export default function GigDetailPage() {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- MOCK DATA ---
  const gigData = {
    id: 1,
    title: "Jasa Setup PC Gaming Rakitan (Cable Management Rapi)",
    price: 150000,
    description: "Bingung rakit PC sendiri takut kabel semrawut atau konslet? Gue bantu rakitin dari nol sampai nyala. Kabel manajemen rapi jali, airflow adem, install OS + Driver update terbaru. Garansi nyala atau uang kembali!",
    category: "Teknologi",
    location: "Jakarta Selatan (Home Service)",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Rakit Komponen (CPU, GPU, RAM, dll)",
      "Cable Management Super Rapi",
      "Install Windows 10/11 & Driver Basic",
      "Stress Test 1 Jam (Cinebench/Furmark)"
    ],
    seller: {
      name: "Alex",
      username: "AlexTech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      level: "Sepuh Rakit",
      rating: 4.9,
      reviews: 120
    },
    reviews: [
      { user: "Budi", text: "Gila rapi banget kabelnya, airflow jadi adem.", rating: 5 },
      { user: "Siti", text: "Orangnya ramah, diajarin cara bersihin debu juga.", rating: 5 }
    ]
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-pattern pb-32 md:pb-12">
      
      {/* Navbar Placeholder (Back Button) */}
      <div className="fixed top-0 left-0 w-full z-40 px-4 py-4 pointer-events-none">
        <Link href="/lounge" className="pointer-events-auto inline-flex w-10 h-10 bg-white border-2 border-slate-900 rounded-full items-center justify-center text-slate-900 shadow-hard btn-brutal">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="h-64 md:h-96 bg-slate-900 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={gigData.images[0]} 
          alt={gigData.title} 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Title Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-accent text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase border-2 border-slate-900">
                  {gigData.category}
                </span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                  <i className="fa-solid fa-location-dot"></i> {gigData.location}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight mb-2">
                {gigData.title}
              </h1>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <i className="fa-solid fa-star text-yellow-400"></i> 
                <span>{gigData.seller.rating} ({gigData.seller.reviews} Reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard-sm">
              <h3 className="font-black text-lg text-slate-900 mb-3">Deskripsi Misi</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                {gigData.description}
              </p>
            </div>

            {/* Features / Include */}
            <div className="bg-indigo-50 rounded-3xl p-6 border-2 border-indigo-100">
              <h3 className="font-black text-lg text-primary mb-4">Yang Lo Dapet:</h3>
              <ul className="space-y-3">
                {gigData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-bold text-slate-700">
                    <div className="w-6 h-6 bg-white rounded-full border-2 border-indigo-200 flex items-center justify-center text-green-500 shrink-0">
                      <i className="fa-solid fa-check text-xs"></i>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* FIX: Seller Profile Link */}
            <Link 
              href={`/u/${gigData.seller.username}`}
              className="bg-white rounded-3xl p-4 border-2 border-slate-900 shadow-hard-sm flex items-center gap-4 cursor-pointer hover:bg-slate-50 transition group"
            >
              <div className="w-16 h-16 bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gigData.seller.avatar} alt={gigData.seller.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{gigData.seller.name}</h4>
                <p className="text-xs font-bold text-slate-500">@{gigData.seller.username} • {gigData.seller.level}</p>
              </div>
              <div className="text-2xl text-slate-300 group-hover:text-slate-900 transition-colors">
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </Link>

          </div>

          {/* RIGHT COLUMN: Sticky Action (Desktop) / Bottom Sheet (Mobile) */}
          <div className="md:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-6 border-2 border-slate-900 shadow-hard">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Harga</p>
              <div className="text-3xl font-black text-slate-900 mb-6">
                {formatRupiah(gigData.price)}
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-primary text-white rounded-xl font-black shadow-hard border-2 border-slate-900 text-lg hover:bg-primary-dark hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-y-[0px] active:shadow-hard transition-all flex items-center justify-center gap-2"
              >
                Book Sekarang <i className="fa-solid fa-bolt"></i>
              </button>

              <p className="text-[10px] text-slate-400 font-bold text-center mt-4">
                <i className="fa-solid fa-shield-halved"></i> Dijamin aman pake Escrow Jasurd.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t-2 border-slate-900 p-4 z-50 flex items-center justify-between pb-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">Harga</p>
          <p className="text-xl font-black text-slate-900">{formatRupiah(gigData.price)}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-8 py-3 rounded-xl font-black shadow-hard border-2 border-slate-900 text-sm active:scale-95 transition"
        >
          Book Now
        </button>
      </div>

      {/* MODAL ORDER DETAILS */}
      {isModalOpen && <ModalOrderDetails onClose={() => setIsModalOpen(false)} />}

    </div>
  );
}