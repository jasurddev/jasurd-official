import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 text-center mt-auto border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Logo Image (Inverted for Dark Mode) */}
        <Link href="/" className="mb-6 opacity-90 hover:opacity-100 transition-opacity inline-block relative h-10 w-32">
            <Image 
               src="/logodark.svg" 
               alt="JASURD Logo" 
               fill
               className="object-contain filter invert brightness-0 invert" // Trik CSS: Hitam jadi Putih
            />
        </Link>
        
        <p className="text-slate-400 text-xs max-w-md mx-auto font-medium mb-6 leading-relaxed">
          Platform gig economy buat lo yang punya skill absurd. <br/>
          Karena hidup udah susah, nyari duit harusnya mudah.
        </p>

        {/* Footer Links */}
        <div className="flex gap-6 mb-8 text-sm font-bold text-slate-300">
          <Link href="/about" className="hover:text-white hover:underline decoration-accent decoration-2 underline-offset-4 transition">Tentang Kami</Link>
          <Link href="/how-to" className="hover:text-white hover:underline decoration-accent decoration-2 underline-offset-4 transition">Cara Main</Link>
          <Link href="/insight" className="hover:text-white hover:underline decoration-accent decoration-2 underline-offset-4 transition">Blog</Link>
        </div>
        
        <p className="text-slate-600 text-[10px] font-medium">
          © {new Date().getFullYear()} PT Studio Satu Akun. Made with ☕ & 😭.
        </p>
      </div>
    </footer>
  );
};

export default Footer;