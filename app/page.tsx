import HeroSection from "@/components/home/HeroSection";
import LiveTicker from "@/components/home/LiveTicker";
import HowItWorksSection from "@/components/home/HowItWorks";
import JastipSpotlight from "@/components/home/JastipSpotlight";
import InspirationWall from "@/components/home/InspirationWall"; // Import Baru

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern overflow-x-hidden w-full pb-24 md:pb-0 flex flex-col">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Live Ticker */}
      <LiveTicker />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Jastip Spotlight (Tetap Ada) */}
      <JastipSpotlight />

      {/* Inspiration Wall (Gabungan Spill & Cuan Fact) */}
      <InspirationWall />
      
    </main>
  );
}