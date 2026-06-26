import { useState, useEffect, ComponentType } from "react";
import { Cpu, Layers, ShieldCheck, Database, ChevronDown } from "lucide-react";

interface BentoItem {
  id: number;
  num: string;
  title: string;
  tag: string;
  description: string;
  cta: string;
  icon: ComponentType<{ className?: string }>;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 0,
    num: "01",
    title: "Agentic Data Routing Fabric",
    tag: "Sub-15ms Latency",
    description: "Run autonomous, enterprise-fine-tuned data agents across an isolated routing fabric. Fully managed agent nodes guarantee consistent processing without cold-starts or shared queue noise.",
    cta: "View Routing Map",
    icon: Cpu,
  },
  {
    id: 1,
    num: "02",
    title: "Dynamic Schema Adaptation",
    tag: "3ms Adaptation",
    description: "Instantly map and normalize unstructured data schemas in physical memory mid-stream without clearing context buffers. Transform complex data shapes on the fly with zero overhead.",
    cta: "Read Schema Docs",
    icon: Layers,
  },
  {
    id: 2,
    num: "03",
    title: "Confidential Data Enclaves",
    tag: "TEE Confidentiality",
    description: "Hardware-enforced confidential computing enclaves (TEE) secure ingestion pipelines and sensitive databases. Zero-retention architecture makes compliance built-in by physical design.",
    cta: "Verify Cryptography",
    icon: ShieldCheck,
  },
  {
    id: 3,
    num: "04",
    title: "Hyper-Scale Vector ETL",
    tag: "100M+ QPS pipeline",
    description: "Hardware-accelerated vectorized transformations and high-dimensional semantic search directly mapped onto data memory channels, enabling instant RAG preparation with zero indexing overhead.",
    cta: "Deploy Pipeline",
    icon: Database,
  },
];

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Monitor resize events to programmatically log/verify context transfer
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Visual component for Neural Edge Core (Item 0)
  const renderEdgeVisual = (isActive: boolean) => (
    <div className="relative w-full h-40 bg-[#070709] rounded-xl border border-[#1d1d1f] overflow-hidden flex items-center justify-center p-4">
      {/* Dynamic network nodes */}
      <div className="absolute inset-0 opacity-25 flex flex-wrap gap-4 p-4 justify-around items-center">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full transition-all duration-1000 ${
              isActive && i % 3 === 0
                ? "bg-white scale-250 shadow-[0_0_8px_#fff]"
                : "bg-neutral-800"
            }`}
            style={{
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#86868b]">
            Agent Live Routing Grid
          </span>
        </div>
        <div className="text-3xl font-extrabold font-mono tracking-wider text-[#f5f5f7]">
          {isActive ? "13.4 ms" : "15.0 ms"}
        </div>
        <span className="text-[10px] font-mono text-[#86868b] uppercase tracking-widest">
          SLA LATENCY ENFORCED
        </span>
      </div>
    </div>
  );

  // Visual component for Weight Swapping (Item 1)
  const renderWeightVisual = (isActive: boolean) => (
    <div className="relative w-full h-40 bg-[#070709] rounded-xl border border-[#1d1d1f] overflow-hidden flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2 w-full max-w-[160px] justify-between relative">
        <div
          className={`h-1.5 rounded-full bg-neutral-800 transition-all duration-500 flex-1 relative overflow-hidden`}
        >
          <div
            className={`absolute inset-y-0 left-0 bg-white transition-all duration-700 ${
              isActive ? "w-full" : "w-1/4"
            }`}
          />
        </div>
        <div className="text-[10px] font-mono text-[#86868b] leading-none">SCHEMA A</div>
      </div>

      <div className="flex gap-2 w-full max-w-[160px] justify-between">
        <div
          className={`h-1.5 rounded-full bg-neutral-800 transition-all duration-500 flex-1 relative overflow-hidden`}
        >
          <div
            className={`absolute inset-y-0 right-0 bg-white transition-all duration-700 ${
              isActive ? "w-full" : "w-0"
            }`}
          />
        </div>
        <div className="text-[10px] font-mono text-[#86868b] leading-none">SCHEMA B</div>
      </div>

      <div className="text-xs font-mono tracking-widest uppercase text-center mt-1">
        {isActive ? (
          <span className="text-[#00e676] font-bold">ADAPTATION SUCCESSFUL // 3.2ms</span>
        ) : (
          <span className="text-[#86868b]">STANDBY ADAPTATION LAYER</span>
        )}
      </div>
    </div>
  );

  // Visual component for Secure Enclaves (Item 2)
  const renderSecureVisual = (isActive: boolean) => (
    <div className="relative w-full h-40 bg-[#070709] rounded-xl border border-[#1d1d1f] overflow-hidden flex flex-col items-center justify-center p-4">
      <div
        className={`w-12 h-12 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${
          isActive
            ? "border-white bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            : "border-[#1d1d1f] bg-transparent"
        }`}
      >
        <ShieldCheck
          className={`w-6 h-6 transition-transform duration-500 ${
            isActive ? "text-white scale-110" : "text-[#86868b]"
          }`}
        />
      </div>
      <span className="text-xs font-mono tracking-widest text-[#86868b] uppercase mt-3">
        {isActive ? "HARDWARE ENCLAVE COMPLIANT" : "SECURED ASYMMETRIC ZONE"}
      </span>
    </div>
  );

  // Visual component for Vector Compiler (Item 3)
  const renderVectorVisual = (isActive: boolean) => (
    <div className="relative w-full h-40 bg-[#070709] rounded-xl border border-[#1d1d1f] overflow-hidden flex items-center justify-center p-4">
      <div className="w-full flex flex-col gap-1.5 font-mono text-xs leading-relaxed text-[#86868b] max-h-[120px] overflow-hidden">
        <div className={isActive ? "text-white" : ""}>
          &gt; neuroflow-pipeline run --schema=sovereign-v2
        </div>
        <div>[0.001s] loaded index block (100,000,000 vectors)</div>
        <div className={isActive ? "text-[#00e676]" : ""}>
          [0.003s] pipeline direct transformation: channel 3 OK
        </div>
        <div>[0.004s] latency SLA: sub-1.2ms throughput</div>
        {isActive && (
          <div className="text-white animate-pulse">
            &gt; core ready. executing active batch pipeline...
          </div>
        )}
      </div>
    </div>
  );

  const getVisual = (id: number, isActive: boolean) => {
    switch (id) {
      case 0:
        return renderEdgeVisual(isActive);
      case 1:
        return renderWeightVisual(isActive);
      case 2:
        return renderSecureVisual(isActive);
      case 3:
        return renderVectorVisual(isActive);
      default:
        return null;
    }
  };

  return (
    <section id="features" className="py-24 md:py-32 relative z-10 bg-transparent px-4 sm:px-6 lg:px-8 border-b border-[#111]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214]/90 border border-[#1d1d1f] backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#86868b]">
              Automation Engine v2.0
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#f5f5f7] via-[#d2d2d7] to-[#86868b] max-w-4xl leading-none font-display">
            Deeply integrated automation.
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl font-light leading-relaxed">
            We built our data pipelines from the compiler level upwards to bypass the
            latency overhead of virtualized legacy databases.
          </p>
        </div>

        {/* Dynamic Layout Wrapper */}
        <div className="w-full">
          {/* DESKTOP BENTO GRID VIEW (md and up) */}
          <div className="hidden md:grid grid-cols-3 gap-6 items-stretch">
            {BENTO_ITEMS.map((item) => {
              const isActive = activeIndex === item.id;
              // Node width scaling: Item 0 and 3 are larger, Item 1 and 2 are smaller
              const colSpanClass = item.id === 0 || item.id === 3 ? "col-span-2" : "col-span-1";

              return (
                <div
                  key={item.id}
                  id={`bento-node-${item.id}`}
                  onMouseEnter={() => setActiveIndex(item.id)}
                  className={`flex flex-col justify-between p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-2xl border transition-all duration-500 cursor-pointer ${colSpanClass} ${
                    isActive
                      ? "border-neutral-500 scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                      : "border-[#1d1d1f] hover:border-neutral-800"
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-base text-[#86868b] tracking-widest">
                        [{item.num}]
                      </span>
                      <span className="px-3.5 py-1 rounded-full border border-[#1d1d1f] text-sm text-[#86868b] font-bold tracking-wider uppercase bg-[#111]">
                        {item.tag}
                      </span>
                    </div>

                    {/* Graphics Visualizer Area */}
                    <div className="w-full">{getVisual(item.id, isActive)}</div>

                    {/* Metadata */}
                    <div className="flex flex-col gap-2.5 mt-2">
                      <h3 className="text-3xl font-extrabold text-[#f5f5f7] tracking-tight flex items-center gap-2 font-display">
                        <item.icon className="w-7 h-7 text-neutral-400 animate-pulse" />
                        {item.title}
                      </h3>
                      <p className="text-base text-[#86868b] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 pt-4 border-t border-[#121214] flex justify-between items-center text-base font-extrabold text-[#f5f5f7] hover:text-white group">
                    <span>{item.cta}</span>
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1 font-mono">
                      -&gt;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE ACCORDION VIEW (under md) */}
          <div className="grid md:hidden grid-cols-1 gap-4">
            {BENTO_ITEMS.map((item) => {
              const isOpen = activeIndex === item.id;

              return (
                <div
                  key={item.id}
                  id={`accordion-node-${item.id}`}
                  className={`border rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-neutral-500" : "border-[#1d1d1f]"
                  }`}
                >
                   {/* Accordion Trigger Header */}
                  <button
                    onClick={() => setActiveIndex(item.id)}
                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-[#86868b]">
                        {item.num}
                      </span>
                      <h3 className="text-lg font-bold text-[#f5f5f7] tracking-tight font-display">
                        {item.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-[#86868b] transition-transform duration-300 ${
                        isOpen ? "transform rotate-180 text-white" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Expandable Content (Strictly hardware-accelerated raw CSS transitions) */}
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isOpen ? "480px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="p-6 pt-0 flex flex-col gap-5 border-t border-[#121214]">
                      {/* Badge and Metadata */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="px-3 py-1 rounded bg-neutral-900 border border-neutral-800 text-xs text-[#86868b] font-bold uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <item.icon className="w-6 h-6 text-[#86868b]" />
                      </div>

                      {/* Render Visual */}
                      <div className="w-full scale-95 origin-top">
                        {getVisual(item.id, isOpen)}
                      </div>

                      <p className="text-base text-[#86868b] leading-relaxed">
                        {item.description}
                      </p>

                      <div className="text-base font-bold text-[#f5f5f7] flex items-center justify-between mt-2">
                        <span>{item.cta}</span>
                        <span className="font-mono">-&gt;</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Browser Resize Metadata Feedback */}
        <div className="text-center font-mono text-xs text-neutral-600 uppercase tracking-widest">
          Active Index Locked: [{activeIndex}] | Viewport Width: {windowWidth}px
        </div>
      </div>
    </section>
  );
}
