'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const HeroSection = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <header className="pt-24 pb-8 px-4 md:px-6 relative max-w-7xl mx-auto overflow-hidden min-h-[75vh] flex items-center">
      
      {/* Background Blobs */}
      <div className="absolute top-20 right-0 w-[200px] md:w-[600px] h-[200px] md:h-[600px] bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* LEFT COLUMN: TEXT */}
        <motion.div 
          className="relative z-10 text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-4 md:mb-6 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border-2 border-slate-900 shadow-hard-sm text-slate-900 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:scale-105 transition cursor-default">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse border border-slate-900"></span>
              Marketplace Jasa Paling Anti Mainstream #1
            </div>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] md:leading-[1] tracking-tight mb-6">
            Uangin Waktu Lo. <br className="hidden md:block" />
            <span className="relative inline-block text-white mt-2 px-3 py-1 transform -rotate-1">
              <span className="absolute inset-0 bg-primary skew-x-[-3deg] border-2 border-slate-900 shadow-hard-sm -z-10 rounded-lg"></span>
              <span className="relative z-10">Nyari Duit Harusnya Mudah.</span>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm md:text-lg text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Platform gig economy buat lo yang punya banyak waktu luang. 
            Transaksi aman pake <span className="font-bold text-slate-900 underline decoration-accent decoration-4 underline-offset-2">Sistem Escrow</span>, jadi gak ada drama tipu-tipu.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-row gap-3 justify-center lg:justify-start w-full">
            <Link 
              href="/lounge" 
              className="flex-1 md:flex-none md:w-auto bg-accent text-slate-900 px-4 py-3.5 rounded-xl font-black hover:bg-accent-hover transition border-2 border-slate-900 btn-brutal text-xs md:text-lg uppercase tracking-wide shadow-hard flex items-center justify-center gap-2"
            >
              Cari Jasa <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <Link 
              href="/dashboard" 
              className="flex-1 md:flex-none md:w-auto bg-white text-slate-900 px-4 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition border-2 border-slate-900 shadow-hard-sm hover:shadow-hard text-xs md:text-lg text-center flex items-center justify-center gap-2"
            >
              Jual Jasa <i className="fa-solid fa-plus"></i>
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: VISUAL (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:block relative h-[500px] w-full"
        >
          <div className="absolute top-10 right-10 w-64 h-80 bg-white border-2 border-slate-900 rounded-3xl shadow-hard rotate-6 z-10 overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" alt="Hero 1" />
          </div>
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent border-2 border-slate-900 rounded-full shadow-hard -rotate-3 z-20 flex items-center justify-center overflow-hidden">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-90 mix-blend-multiply" alt="Hero 2" />
          </div>
          
          <div className="absolute top-0 left-20 bg-white px-4 py-2 rounded-xl border-2 border-slate-900 shadow-hard font-black text-sm rotate-12 animate-bounce">
            💸 Cuan!
          </div>
          <div className="absolute bottom-20 right-0 bg-primary text-white px-4 py-2 rounded-xl border-2 border-slate-900 shadow-hard font-black text-sm -rotate-6 animate-pulse">
            🔥 Trending
          </div>
        </motion.div>

      </div>
    </header>
  );
};

export default HeroSection;