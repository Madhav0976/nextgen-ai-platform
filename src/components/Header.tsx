import { Cpu, Terminal, Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#000000]/50 backdrop-blur-xl border-b border-[#111113]/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none select-none">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-white text-black transition-transform duration-500 group-hover:rotate-[18deg]">
            <Cpu className="w-5 h-5" />
          </div>
          <span className="font-display font-extrabold text-base tracking-widest text-[#f5f5f7]">
            NEUROFLOW <span className="text-[#86868b] text-xs font-semibold tracking-normal font-mono ml-1">v2.0</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-10">
          <a
            href="#features"
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase transition-colors duration-200"
          >
            Automation Engine
          </a>
          <a
            href="#pricing"
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase transition-colors duration-200"
          >
            Matrix Pricing
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase transition-colors duration-200"
          >
            Open Source
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#pricing"
            className="px-6 py-2.5 rounded-full bg-[#f5f5f7] text-black text-sm font-bold tracking-wider uppercase hover:bg-white transition-all duration-200 shadow-sm"
          >
            Deploy Pipeline
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 md:hidden text-[#86868b] hover:text-[#f5f5f7] focus:outline-none cursor-pointer"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer (Pure CSS Toggle Height) */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#000000]/95 backdrop-blur-2xl border-b border-[#111113]"
        style={{ maxHeight: isOpen ? "240px" : "0px" }}
      >
        <div className="px-5 py-6 flex flex-col gap-5">
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase py-1"
          >
            Automation Engine
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase py-1"
          >
            Matrix Pricing
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#86868b] hover:text-[#f5f5f7] tracking-wider uppercase py-1"
          >
            Open Source
          </a>
          <a
            href="#pricing"
            onClick={() => setIsOpen(false)}
            className="w-full text-center py-3 rounded-lg bg-[#f5f5f7] text-black text-sm font-bold tracking-wider uppercase mt-2"
          >
            Deploy Pipeline
          </a>
        </div>
      </div>
    </header>
  );
}
