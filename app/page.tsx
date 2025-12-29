import HeroSection from "@/components/home/HeroSection";
import LiveTicker from "@/components/home/LiveTicker";
import HowItWorksSection from "@/components/home/HowItWorks"; // Cek nama file di folder home, kalau HowItWorks.tsx pake ini
import SpillTheGigSection from "@/components/home/SpillTheGigSection"; // <--- Ini nama yang benar
import JastipSpotlight from "@/components/home/JastipSpotlight";
import CuanFactSection from "@/components/home/CuanFact"; // Cek nama file, di list kamu CuanFact.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern overflow-hidden pb-20 md:pb-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Live Ticker */}
      <LiveTicker />

      {/* How It Works */}
      <HowItWorksSection />

      {/* 
        Spill The Gig 
        FIX: Ganti <SpillTheGig /> jadi <SpillTheGigSection /> 
      */}
      <SpillTheGigSection />

      {/* Jastip Spotlight */}
      <JastipSpotlight />

      {/* Cuan Fact */}
      <CuanFactSection />
      
    </main>
  );
}