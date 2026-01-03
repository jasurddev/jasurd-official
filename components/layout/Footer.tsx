import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Logo (Tanpa Background Putih, tapi di-Invert jadi Putih) */}
        <Link href="/" className="mb-4 opacity-90 hover:opacity-100 transition-opacity inline-block relative h-10 w-32">
            <Image 
               src="/logo.svg" 
               alt="JASURD Logo" 
               fill
               className="object-contain filter invert brightness-0 invert" // Hitam -> Putih
            />
        </Link>
        
        {/* Tagline */}
        <p className="text-slate-400 text-[10px] md:text-xs max-w-md font-medium mb-6 leading-relaxed">
          Platform gig economy buat lo yang punya skill absurd. 
          <br className="block md:hidden" />
          Karena hidup udah susah, nyari duit harusnya mudah.
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-3 text-[10px] md:text-xs font-bold text-slate-300 mb-6">
          <Link href="/about" className="hover:text-white transition">Tentang Kami</Link>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-white transition">Syarat & Ketentuan</a>
          <span className="text-slate-600">|</span>
          <a href="#" className="hover:text-white transition">Kebijakan Privasi</a>
        </div>
        
        {/* Copyright */}
        <p className="text-slate-600 text-[9px] font-medium">
          © {new Date().getFullYear()} PT Studio Satu Akun.
        </p>
      </div>
    </footer>
  );
};

export default Footer;