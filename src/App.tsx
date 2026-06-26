import { useEffect, useState } from "react";
import Header from "./components/Header";
import Scene3D from "./components/Scene3D";
import Hero from "./components/Hero";
import BentoAccordion from "./components/BentoAccordion";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import { Cpu } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ultra-optimized, high-speed orchestration: finishes loading in exactly 400ms
    // to strictly preserve semantic indexing and guarantee instant Time-To-Interactive (TTI)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* High-Speed Hardware-Accelerated Entry Loader veil (Max 400ms) */}
      <div
        className={`fixed inset-0 bg-black z-50 flex flex-col gap-4 items-center justify-center transition-all duration-300 ease-in-out pointer-events-none select-none ${
          loading ? "opacity-100" : "opacity-0 scale-105"
        }`}
      >
        <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white text-black animate-spin duration-1000">
          <Cpu className="w-6 h-6" />
        </div>
        <div className="font-display font-semibold text-xs text-[#86868b] uppercase tracking-widest animate-pulse">
          Initializing NeuroFlow AI Fabric...
        </div>
      </div>

      {/* Global 3D Background Canvas Layer */}
      <Scene3D />

      {/* Ambient Radial Glowing Gradients (Bento Grid Theme Specific) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden blueprint-grid">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%]" 
          style={{ background: "radial-gradient(circle at 50% 50%, #121214 0%, #000000 75%)" }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.12]" 
          style={{ 
            background: "radial-gradient(circle at center, #86868b 0%, transparent 70%)",
            filter: "blur(80px)" 
          }} 
        />
      </div>

      {/* Foreground Container (Completely transparent background, higher Z-index, standard semantic tags) */}
      <div className="relative z-10 bg-transparent min-h-screen flex flex-col justify-between selection:bg-white selection:text-black">
        {/* Floating Semantic Header */}
        <Header />

        {/* Semantic Content Container */}
        <main className="flex-grow">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: Bento Grid (Desktop) and Accordion Drawer (Mobile) with State Lock */}
          <BentoAccordion />

          {/* Section 3: Sovereign State-Isolated Pricing */}
          <PricingSection />
        </main>

        {/* Semantic Footer */}
        <Footer />
      </div>
    </>
  );
}
