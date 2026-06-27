import { Cpu, Mail, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-[#020202]/90 backdrop-blur-md border-t border-[#111113] py-16 md:py-24 px-4 sm:px-6 lg:px-8 text-xs text-[#86868b] select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Grid (Grid columns prevent squishing) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 flex-wrap">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2 text-[#f5f5f7]">
              <div className="w-6 h-6 rounded bg-[#f5f5f7] text-black flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-display font-bold tracking-widest uppercase">
                NEUROFLOW
              </span>
            </div>
            <p className="leading-relaxed font-light text-[#86868b]">
              Ultra-premium on-demand sovereign AI data automation platform for global enterprise pipelines.
            </p>
          </div>

          {/* Column 2: Infrastructure Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-wider uppercase text-[10px]">
              Sovereign Cloud
            </h4>
            <a href="#features" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Agentic Routing Fabric
            </a>
            <a href="#features" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Schema-Adaptation Compiler
            </a>
            <a href="#features" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Confidential Enclaves
            </a>
            <a href="#features" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Edge Sync Fabric
            </a>
          </div>

          {/* Column 3: Platform Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-wider uppercase text-[10px]">
              Compliance & SLA
            </h4>
            <a href="#pricing" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Pricing Options
            </a>
            <a href="#" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Hardware Security Audits
            </a>
            <a href="#" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Latency Guarantee Map
            </a>
            <a href="#" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Disaster Failover Pipeline
            </a>
          </div>

          {/* Column 4: Contact & Node Support */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-wider uppercase text-[10px]">
              Infrastructure Desk
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:tanguturimadhav@gmail.com"
                className="flex items-center gap-1.5 hover:text-[#f5f5f7] transition-colors duration-200"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>tanguturimadhav@gmail.com</span>
              </a>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span>Sovereign Cloud, RC v2.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] bg-[#111113]" />

        {/* Bottom copyright metadata row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center flex-wrap">
          <div className="flex flex-col gap-1">
            <p className="font-light">
              &copy; {currentYear} NeuroFlow AI Platform. All rights reserved globally.
            </p>
            <p className="text-[10px] text-[#444] leading-none">
              All benchmark tests conducted on virtual TPC-H isolated data pipeline configurations using standard SLA controls.
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#f5f5f7] transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
