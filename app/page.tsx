import HeroSection from "@/components/home/HeroSection";
import LiveTicker from "@/components/home/LiveTicker";
import HowItWorksSection from "@/components/home/HowItWorks";
import JastipSpotlight from "@/components/home/JastipSpotlight";
import SpillTheGigSection from "@/components/home/SpillTheGigSection"; // Balik lagi
import CuanFactSection from "@/components/home/CuanFact"; // Balik lagi

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern overflow-x-hidden w-full pb-24 md:pb-0 flex flex-col">
      <HeroSection />
      <LiveTicker />
      <HowItWorksSection />
      <SpillTheGigSection />
      <JastipSpotlight />
      <CuanFactSection />
    </main>
  );
}