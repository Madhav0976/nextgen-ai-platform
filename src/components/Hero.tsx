import { ArrowRight, Terminal, Activity, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen relative z-10 bg-transparent flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-32 text-center select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-10">
        {/* Release Tag Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214]/80 backdrop-blur-md border border-[#1d1d1f] transition-all duration-300 hover:border-neutral-700">
          <Terminal className="w-3 h-3 text-[#86868b]" />
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#86868b]">
            Platform Core v2.0 Release Candidate
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          <span className="text-[9px] font-mono font-medium text-white px-1 py-0.2 bg-[#2d2d30] rounded">
            99.99% SLA
          </span>
        </div>

        {/* Apple-Level Majestic Title */}
        <div className="flex flex-col gap-5">
          <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#f5f5f7] via-[#d2d2d7] to-[#86868b] font-display">
            NeuroFlow.
            <br />
            Think differently.
          </h1>
          <p className="text-xl md:text-3xl text-[#86868b] font-light max-w-3xl mx-auto tracking-normal leading-relaxed mt-4">
            The world's first agentic AI data automation platform.
            Deploy sovereign data agents, coordinate complex ETL pipelines,
            and scale automated workflows with zero latency compromise.
          </p>
        </div>

        {/* Real-time Infrastructure Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 py-5 px-10 rounded-3xl bg-[#070708]/50 border border-[#111113] backdrop-blur-md max-w-3xl w-full flex-wrap mt-2">
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="font-mono text-xs text-[#86868b] tracking-wider uppercase">
              Active Data Agents
            </span>
            <span className="text-2xl font-extrabold text-[#f5f5f7] font-display">12,000+ Agents</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="font-mono text-xs text-[#86868b] tracking-wider uppercase">
              Sync Latency
            </span>
            <span className="text-2xl font-extrabold text-[#00e676] font-display">&lt; 15ms SLA</span>
          </div>
          <div className="hidden md:flex flex-col items-center justify-center gap-1.5">
            <span className="font-mono text-xs text-[#86868b] tracking-wider uppercase">
              Data Compliance
            </span>
            <span className="text-2xl font-extrabold text-[#f5f5f7] font-display">SOC2 / TEE</span>
          </div>
        </div>

        {/* Unbreakable Action Buttons (Flex Wrap prevents overlaps) */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-5 items-center justify-center w-full max-w-md sm:max-w-none mt-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#f5f5f7] text-black text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.18)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] hover:scale-[1.03] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Deploy Data Pipeline</span>
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="w-full sm:w-auto px-10 py-5 rounded-full bg-[#121214] border border-[#222] text-[#86868b] hover:text-[#f5f5f7] hover:border-[#444] text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-[#1a1a1d] hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Automation Engine</span>
          </a>
        </div>
      </div>
    </section>
  );
}
