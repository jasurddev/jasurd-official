import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Left: Brand */}
        <div className="text-center md:text-left">
          <Link href="/" className="mb-4 opacity-90 hover:opacity-100 transition-opacity inline-block relative h-10 w-32">
              <Image 
                 src="/logo.svg" 
                 alt="JASURD Logo" 
                 fill
                 className="object-contain object-left filter invert brightness-0 invert" 
              />
          </Link>
          <p className="text-slate-400 text-xs max-w-xs font-medium leading-relaxed">
            Platform gig economy buat lo yang punya Waktu & Kemauan. <br/>
            Karena Hidup Udah Susah, Nyari Duit Harusnya Mudah.
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-center md:text-right">
          <div className="flex flex-col gap-3">
            <h4 className="font-black text-white uppercase text-sm tracking-wider">Menu</h4>
            <Link href="/lounge" className="text-slate-400 hover:text-white text-sm font-bold transition">Lounge</Link>
            <Link href="/insight" className="text-slate-400 hover:text-white text-sm font-bold transition">Insight</Link>
            <Link href="/how-to" className="text-slate-400 hover:text-white text-sm font-bold transition">Cara Main</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-black text-white uppercase text-sm tracking-wider">Company</h4>
            <Link href="/about" className="text-slate-400 hover:text-white text-sm font-bold transition">Tentang Kami</Link>
            <a href="#" className="text-slate-400 hover:text-white text-sm font-bold transition">Syarat & Ketentuan</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm font-bold transition">Kebijakan Privasi</a>
          </div>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center md:text-left">
        <p className="text-slate-600 text-[10px] font-medium">
          © {new Date().getFullYear()} PT Studio Satu Akun.
        </p>
      </div>
    </footer>
  );
};

export default Footer;