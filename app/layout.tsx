import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNavMobile from "@/components/layout/BottomNavMobile";
import { ToastProvider } from "@/components/ui/Toast"; // Import Provider

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
 metadataBase: new URL('https://jasurd.com'), 
  
  title: "JASURD | Marketplace Jasa Unik & Anti Mainstream Indonesia",
  description: "Uangin waktu lu, Kalo Hidup Lagi Susah, Nyari Duit Harusnya Mudah. Marketplace jasa paling unik, aman (Escrow), dan anti mainstream di Indonesia.",
  manifest: "/manifest.json",
  openGraph: {
    title: "JASURD | Marketplace Jasa Unik",
    description: "Cari jasa unik atau jadi solver buat nambah cuan. Aman, Unik, Brutal.",
    url: "https://jasurd.com", // Update URL ini
    siteName: "JASURD",
    locale: "id_ID",
    type: "website",
  },
  // Tambahkan alternates (Canonical)
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body className={`${jakarta.variable} font-sans bg-pattern text-slate-900 antialiased selection:bg-accent selection:text-slate-900 overflow-x-hidden min-h-screen flex flex-col`}>
        
        {/* Bungkus dengan ToastProvider */}
        <ToastProvider>
          <Navbar />

          <main className="flex-grow pt-16 md:pt-20 w-full">
            {children}
          </main>

          <Footer />
          <BottomNavMobile />
        </ToastProvider>
        
      </body>
    </html>
  );
}