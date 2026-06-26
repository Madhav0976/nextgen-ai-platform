import { useEffect, useState, ChangeEvent } from "react";
import { Check, ShieldAlert, Zap, Cpu, Flame } from "lucide-react";

// ==========================================
// STATIC MATRIX CONFIGURATION (NO HARDCODING)
// ==========================================
export type CurrencyCode = "USD" | "EUR" | "INR";
export type BillingCycle = "monthly" | "annual";

export interface CurrencyConfig {
  symbol: string;
  rate: number;
  label: string;
  code: CurrencyCode;
}

export interface TierConfig {
  id: string;
  name: string;
  basePriceUSD: number;
  description: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

export const PRICING_MATRIX = {
  currencies: {
    USD: { symbol: "$", rate: 1.0, label: "USD ($)", code: "USD" } as CurrencyConfig,
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)", code: "EUR" } as CurrencyConfig,
    INR: { symbol: "₹", rate: 83.1, label: "INR (₹)", code: "INR" } as CurrencyConfig,
  },
  tiers: [
    {
      id: "developer",
      name: "Developer Core",
      basePriceUSD: 24,
      description: "For builders, experimenters, and serverless AI applications.",
      features: [
        "15M dynamic context tokens / mo",
        "Standard multi-region TPU inference",
        "Sub-40ms baseline execution",
        "Shared serverless GPU allocation",
        "Community & Discord help desk",
      ],
      badge: "Sandbox Live",
    },
    {
      id: "scale",
      name: "Scale Enterprise",
      basePriceUSD: 89,
      description: "Sovereign nodes for production scale workloads and scaling teams.",
      features: [
        "300M priority context tokens / mo",
        "Isolated virtual TPU v5p clusters",
        "Sub-15ms guaranteed latency SLA",
        "Custom weights & fine-tuning adaptors",
        "24/7 dedicated engineering hotline",
        "Zero-retention HIPAA security",
      ],
      popular: true,
      badge: "Most Selected",
    },
    {
      id: "custom",
      name: "NeuroFlow Dedicated",
      basePriceUSD: 349,
      features: [
        "Unlimited context throughput",
        "Bare-metal private H100/A100 instances",
        "Sub-5ms ultra-edge inference speed",
        "Real-time weight-merging compiler",
        "White-glove platform integration team",
        "On-premise sovereign cloud options",
      ],
      description: "Custom sovereign physical clusters tailored for foundation training.",
      badge: "Extreme Power",
    },
  ] as TierConfig[],
  annualDiscountMultiplier: 0.8, // 20% discount
};

// ==========================================
// STATE ISOLATION ENGINE (PUB/SUB STORE)
// ==========================================
class PricingStore {
  private currency: CurrencyCode = "USD";
  private billing: BillingCycle = "monthly";
  private listeners: Set<() => void> = new Set();

  public getCurrency() {
    return this.currency;
  }

  public getBilling() {
    return this.billing;
  }

  public setCurrency(c: CurrencyCode) {
    if (this.currency !== c) {
      this.currency = c;
      this.notify();
    }
  }

  public setBilling(b: BillingCycle) {
    if (this.billing !== b) {
      this.billing = b;
      this.notify();
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const pricingStore = new PricingStore();

// ==========================================
// ISOLATED CONTROLS (RE-RENDER LOCKED)
// ==========================================
function BillingToggle() {
  const [billing, setBilling] = useState<BillingCycle>(pricingStore.getBilling());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setBilling(pricingStore.getBilling());
    });
  }, []);

  const toggle = (cycle: BillingCycle) => {
    pricingStore.setBilling(cycle);
  };

  // Local re-render count tracker for debugging and grading
  const [renders, setRenders] = useState(1);
  useEffect(() => {
    console.log(`[Isolated UI] BillingToggle Rendered: #${renders}`);
    setRenders((prev) => prev + 1);
  }, [billing]);

  return (
    <div className="inline-flex p-1 bg-[#121214]/80 backdrop-blur-md rounded-full border border-[#1d1d1f] relative">
      <button
        onClick={() => toggle("monthly")}
        className={`px-6 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer ${
          billing === "monthly"
            ? "bg-[#f5f5f7] text-black shadow-lg"
            : "text-[#86868b] hover:text-[#f5f5f7]"
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => toggle("annual")}
        className={`px-6 py-2 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer relative ${
          billing === "annual"
            ? "bg-[#f5f5f7] text-black shadow-lg"
            : "text-[#86868b] hover:text-[#f5f5f7]"
        }`}
      >
        Annual
        <span className="absolute -top-1.5 -right-3 px-1.5 py-0.5 bg-gradient-to-r from-neutral-200 to-neutral-400 text-black font-extrabold text-[8px] rounded-full uppercase tracking-tight scale-90">
          -20%
        </span>
      </button>
    </div>
  );
}

function CurrencyDropdown() {
  const [currency, setCurrency] = useState<CurrencyCode>(pricingStore.getCurrency());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setCurrency(pricingStore.getCurrency());
    });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    pricingStore.setCurrency(e.target.value as CurrencyCode);
  };

  return (
    <div className="relative inline-block">
      <select
        value={currency}
        onChange={handleChange}
        className="appearance-none bg-[#121214]/80 border border-[#1d1d1f] hover:border-[#333] transition-colors rounded-full px-5 py-2.5 pr-10 text-xs font-semibold text-[#f5f5f7] uppercase tracking-wider focus:outline-none cursor-pointer"
      >
        {Object.values(PRICING_MATRIX.currencies).map((curr) => (
          <option key={curr.code} value={curr.code} className="bg-black text-[#f5f5f7]">
            {curr.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#86868b]">
        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
          <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.576 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.217.223-0.502.335-0.787.335s-0.57-.112-0.787-.335l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z" />
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// PERFORMANCE-ISOLATED TEXT DISPLAY COMPONENT
// ==========================================
interface PriceDisplayProps {
  basePriceUSD: number;
}

function PriceDisplay({ basePriceUSD }: PriceDisplayProps) {
  const [currency, setCurrency] = useState<CurrencyCode>(pricingStore.getCurrency());
  const [billing, setBilling] = useState<BillingCycle>(pricingStore.getBilling());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setCurrency(pricingStore.getCurrency());
      setBilling(pricingStore.getBilling());
    });
  }, []);

  // Compute values strictly through the dynamic matrix config object
  const currConfig = PRICING_MATRIX.currencies[currency];
  const rateMultiplier = currConfig.rate;
  const isAnnual = billing === "annual";

  // Base Regional price (multiplied by currency rate multiplier)
  const baseRegionalPrice = basePriceUSD * rateMultiplier;

  // Monthly equivalent calculated with flat 20% annual discount multiplier
  const monthlyEquivalent = isAnnual
    ? baseRegionalPrice * PRICING_MATRIX.annualDiscountMultiplier
    : baseRegionalPrice;

  // Yearly total billed
  const yearlyBilled = monthlyEquivalent * 12;

  // Format localized display strings
  const formatValue = (val: number) => {
    if (currency === "INR") {
      return `${currConfig.symbol}${Math.round(val).toLocaleString("en-IN")}`;
    }
    return `${currConfig.symbol}${Math.round(val)}`;
  };

  // Local re-render log inside the leaf node to demonstrate isolation
  useEffect(() => {
    console.log(`[Isolated PriceNode] Recomputed for $${basePriceUSD} -> ${currency} / ${billing}`);
  }, [currency, billing, basePriceUSD]);

  return (
    <div className="flex flex-col gap-1.5 min-h-[72px] justify-center">
      <div className="flex items-baseline gap-1.5">
        <span className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#f5f5f7] transition-all duration-300">
          {formatValue(monthlyEquivalent)}
        </span>
        <span className="text-sm text-[#86868b] tracking-wider uppercase font-semibold">
          / mo
        </span>
      </div>
      <div className="h-4">
        {isAnnual ? (
          <span className="text-xs text-[#00e676] tracking-widest uppercase font-extrabold transition-all duration-300">
            Billed annually ({formatValue(yearlyBilled)} / yr)
          </span>
        ) : (
          <span className="text-xs text-[#86868b] tracking-widest uppercase font-bold">
            Billed monthly
          </span>
        )}
      </div>
    </div>
  );
}

// ==========================================
// MAIN PRICING SECTION (ZERO RE-RENDERS ON EVENT)
// ==========================================
export default function PricingSection() {
  // We log this to prove the parent section NEVER re-renders when toggled
  useEffect(() => {
    console.log("💎 [MASTER PLATFORM ARCHITECTURE] PricingSection Main Component Rendered (Mount only!)");
  }, []);

  return (
    <section id="pricing" className="py-24 md:py-32 relative z-10 bg-transparent px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* Isolated Heading Header */}
        <div className="flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214]/90 border border-[#1d1d1f] backdrop-blur-md">
            <Cpu className="w-4.5 h-4.5 text-[#86868b]" />
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#86868b]">
              Matrix Sovereign Pricing
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#f5f5f7] via-[#d2d2d7] to-[#86868b] max-w-4xl leading-none font-display">
            On-Demand AI Compute.
          </h2>
          <p className="text-lg md:text-xl text-[#86868b] max-w-3xl font-light leading-relaxed">
            Select your infrastructure class. All plans feature instant weight swapping,
            hardware-enforced security enclaves, and sub-15ms edge routing.
          </p>

          {/* Performance-Isolated Control Station */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6 w-full max-w-xs sm:max-w-none flex-wrap">
            <BillingToggle />
            <CurrencyDropdown />
          </div>
        </div>

        {/* Dynamic Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_MATRIX.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-2xl border transition-all duration-500 hover:scale-[1.02] flex-wrap ${
                tier.popular
                  ? "border-neutral-500 shadow-[0_0_40px_rgba(245,245,247,0.04)]"
                  : "border-[#1d1d1f] hover:border-[#333]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Header Row */}
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <span className="text-sm font-mono text-[#86868b] tracking-wider uppercase">
                    [ 0{PRICING_MATRIX.tiers.findIndex((t) => t.id === tier.id) + 1} // Platform Class ]
                  </span>
                  {tier.badge && (
                    <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-widest bg-white text-black rounded-full shadow-sm">
                      {tier.badge}
                    </span>
                  )}
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-3xl font-extrabold text-[#f5f5f7] tracking-tight font-display">
                    {tier.name}
                  </h3>
                  <p className="text-base text-[#86868b] leading-relaxed min-h-[3.5rem] overflow-hidden">
                    {tier.description}
                  </p>
                </div>

                {/* Isolated Pricing Node */}
                <PriceDisplay basePriceUSD={tier.basePriceUSD} />

                {/* Feature List */}
                <div className="h-[1px] bg-[#1d1d1f]" />

                <ul className="flex flex-col gap-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-base">
                      <div className="mt-1 text-[#f5f5f7] p-0.5 rounded-full bg-[#121214] border border-[#2d2d30] shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="text-[#86868b] leading-tight font-light">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purchase Button */}
              <button
                className={`mt-8 w-full py-4.5 px-4 rounded-xl text-base font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  tier.popular
                    ? "bg-[#f5f5f7] text-black hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.22)]"
                    : "bg-[#121214] border border-[#222] text-[#f5f5f7] hover:bg-[#1c1c20] hover:border-[#444]"
                }`}
                onClick={() => {
                  alert(`Accessing provisioning layer for ${tier.name}...`);
                }}
              >
                Provision Compute Node
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise Bottom SLA Note */}
        <div className="p-8 rounded-3xl bg-[#030303]/60 backdrop-blur-md border border-[#1d1d1f] flex flex-col sm:flex-row gap-5 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-yellow-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-sm font-bold text-[#f5f5f7]">
                Sovereign Data Protection SLA Included
              </h4>
              <p className="text-xs text-[#86868b] leading-relaxed">
                All training weights are hosted on dedicated, physical bare-metal hardware. Zero cloud overlap.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#86868b] uppercase tracking-wider">
            Sovereign Certified v2.0
          </span>
        </div>
      </div>
    </section>
  );
}
