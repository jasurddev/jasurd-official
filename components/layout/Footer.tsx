import Link from "next/link";
import Image from "next/image"; // Wajib import Image

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 text-center mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Logo Image (Pakai logo.svg untuk background gelap) */}
        <Link href="/" className="mb-4 opacity-90 hover:opacity-100 transition-opacity inline-block">
            <Image 
                src="/logo.svg" 
                alt="JASURD Logo" 
                width={120} 
                height={40} 
                className="h-8 md:h-10 w-auto object-contain"
            />
        </Link>
        
        <p className="text-slate-400 text-xs max-w-md mx-auto font-medium mb-6">
          Karena hidup udah susah, nyari duit harusnya mudah.
        </p>
        
        <p className="text-slate-600 text-[10px] font-medium">
          © {new Date().getFullYear()} PT Studio Satu Akun.
        </p>
      </div>
    </footer>
  );
};

export default Footer;