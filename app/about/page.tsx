'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pattern pb-24 pt-20 md:pt-24 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-6 inline-block transform -rotate-2">
            The Origin Story
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] mb-6">
            Bukan Startup <br/>
            <span className="text-primary">Unicorn</span> (Belum).
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Kami cuma sekumpulan orang yang percaya kalau <span className="bg-accent px-1 text-slate-900 font-bold">skill absurd</span> lo itu punya harga.
          </p>
        </motion.div>
      </section>

      {/* STORY BLOCK 1 */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border-2 border-slate-900 shadow-hard relative"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent rounded-full border-2 border-slate-900 flex items-center justify-center text-2xl">🤔</div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Kenapa Jasurd Ada?</h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-4">
              Dunia kerja itu kaku. Harus punya ijazah, harus punya pengalaman 5 tahun (padahal baru lulus), harus bisa Microsoft Excel level dewa.
            </p>
            <p className="text-slate-900 font-bold leading-relaxed">
              Terus gimana nasib orang yang jagonya cuma "Nemenin Curhat", "Jago Antri Tiket", atau "Bangunin Sahur"?
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-64 md:h-80 bg-slate-200 rounded-3xl border-2 border-slate-900 overflow-hidden"
          >
             {/* Placeholder Image - Ganti kalau ada foto tim/kantor */}
             <Image 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
               alt="Meeting Absurd" 
               fill
               className="object-cover grayscale hover:grayscale-0 transition duration-500"
             />
          </motion.div>
        </div>
      </section>

      {/* VALUES (3 CARDS) */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900">Filosofi Kami 🧠</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Unik > Sempurna", desc: "Gak perlu jadi yang terbaik, cukup jadi yang paling beda.", icon: "🦄", color: "bg-pink-100" },
            { title: "Cuan Halal", desc: "Selama gak ngerugiin orang lain & gak melanggar hukum, gas aja.", icon: "💸", color: "bg-green-100" },
            { title: "Anti Ribet", desc: "Birokrasi itu musuh. Di sini semua sat-set wat-wet.", icon: "⚡", color: "bg-yellow-100" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`${item.color} p-6 rounded-2xl border-2 border-slate-900 shadow-hard-sm hover:-translate-y-1 hover:shadow-hard transition-all`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-700 font-bold">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl border-2 border-slate-900 shadow-hard relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Siap Gabung Gerakan Ini?</h2>
            <p className="text-slate-300 mb-8 text-lg">Jangan biarkan bakat absurd lo terpendam sia-sia.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-primary text-white px-8 py-4 rounded-xl font-black shadow-hard border-2 border-white hover:bg-primary-dark transition">
                Daftar Jadi Solver
              </Link>
              <Link href="/lounge" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-black shadow-hard border-2 border-transparent hover:border-white transition">
                Cari Jasa Aneh
              </Link>
            </div>
          </div>
          {/* Decoration */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20"></div>
        </div>
      </section>

    </div>
  );
}