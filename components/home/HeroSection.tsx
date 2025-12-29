'use client';

import Link from 'next/link';
// FIX: Import tipe 'Variants' dari framer-motion
import { motion, Variants } from 'framer-motion';

const HeroSection = () => {
  // FIX: Tambahkan tipe ': Variants' secara eksplisit
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  // FIX: Tambahkan tipe ': Variants' secara eksplisit
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <header className="pt-32 pb-12 px-4 md:px-6 relative max-w-7xl mx-auto overflow-hidden text-center min-h-[85vh] flex flex-col justify-center items-center">
      
      <div className="absolute top-20 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <motion.div 
        className="relative z-10 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6 md:mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white border-2 border-slate-900 shadow-hard-sm text-slate-900 text-[10px] md:text-xs font-bold uppercase tracking-wider hover:scale-105 transition cursor-default">
            <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse border border-slate-900"></span>
            Marketplace Jasa Paling Anti Mainstream #1
          </div>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight mb-6">
          Uangin Waktu Lo, <br className="hidden md:block" />
          <span className="relative inline-block text-white mt-2 px-3 py-1 md:px-4 md:py-1">
            <span className="absolute inset-0 bg-primary skew-x-[-3deg] border-2 border-slate-900 shadow-hard-sm -z-10 rounded-lg"></span>
            <span className="relative z-10">Kalo Hidup Lagi Susah,</span>
          </span>
          <br className="hidden md:block" />
          <span className="relative inline-block text-slate-900 mt-2">
             Nyari Duit Harusnya Mudah.
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-sm md:text-xl text-slate-600 font-medium max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-2">
          Platform gig economy buat lo yang punya banyak waktu. 
          Transaksi aman pake <span className="font-bold text-slate-900 underline decoration-accent decoration-4 underline-offset-2">Sistem Escrow</span>, jadi gak ada drama tipu-tipu.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link 
            href="/lounge" 
            className="w-full md:w-auto bg-accent text-slate-900 px-8 py-4 rounded-xl font-black hover:bg-accent-hover transition border-2 border-slate-900 btn-brutal text-base md:text-lg uppercase tracking-wide shadow-hard flex items-center justify-center gap-2"
          >
            Jelajahi Lounge <i className="fa-solid fa-rocket"></i>
          </Link>
          <Link 
            href="/how-to" 
            className="w-full md:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition border-2 border-transparent hover:border-slate-900 text-sm md:text-base"
          >
            Cara Main
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default HeroSection;