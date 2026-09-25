import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Play,
  Shield,
  Crown,
  Star,
  FileText,
  Globe,
  Scale,
  Lightbulb,
  Building2,
  FlaskConical,
  Landmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// --- TRUSTED BODIES ---
const CLIENTS = [
  { name: "IP India", icon: Landmark },
  { name: "WIPO", icon: Globe },
  { name: "DPIIT", icon: Building2 },
  { name: "MSME Ministry", icon: FileText },
  { name: "CII", icon: Scale },
  { name: "FICCI", icon: Lightbulb },
  { name: "DST India", icon: FlaskConical },
];

// --- HERO SLIDES ---
const SLIDES = [
  {
    badge: "IP India Registered Firm",
    headline: ["Your Innovation,", "Completely", "Protected."],
    highlight: 1,
    sub: "End-to-end patent, trademark, copyright, and design protection — from first filing to final grant, handled by specialists.",
    primaryCta: "File a Patent",
    secondaryCta: "Watch Overview",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=700&fit=crop&auto=format",
  },
  {
    badge: "Trademark & Copyright Experts",
    headline: ["Register Your", "Brand With", "Confidence."],
    highlight: 1,
    sub: "Comprehensive trademark searches, applications, and prosecution — protecting your brand identity in India and globally.",
    primaryCta: "Register Trademark",
    secondaryCta: "Our Process",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&h=700&fit=crop&auto=format",
  },
  {
    badge: "IPR Litigation Specialists",
    headline: ["Fight For", "Your Rights.", "Win."],
    highlight: 2,
    sub: "Experienced IPR litigation counsel — from cease-and-desist letters to full courtroom representation before Indian courts.",
    primaryCta: "Talk to a Lawyer",
    secondaryCta: "Case Studies",
    img: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=900&h=700&fit=crop&auto=format",
  },
];

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl" style={{ fontFamily: "Fraunces, Georgia, serif" }}>{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs" style={{ fontFamily: "DM Mono, monospace" }}>{label}</span>
  </div>
);

// --- MAIN COMPONENT ---
export default function HeroSection() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = SLIDES[idx];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => {
    setPaused(true);
    setIdx((i) => (i + dir + SLIDES.length) % SLIDES.length);
    setTimeout(() => setPaused(false), 9000);
  };

  return (
    <div className="relative w-full text-white overflow-hidden font-sans" style={{ background: "#050e1f" }}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .anim-in { animation: fadeSlideIn 0.75s ease-out forwards; opacity: 0; }
        .animate-marquee { animation: marquee 36s linear infinite; }
        .d100 { animation-delay: 0.10s; }
        .d200 { animation-delay: 0.20s; }
        .d300 { animation-delay: 0.30s; }
        .d400 { animation-delay: 0.40s; }
        .d500 { animation-delay: 0.52s; }
      `}</style>

      {/* Background image + gradient mask */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{ opacity: i === idx ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${s.img})`,
              opacity: 0.18,
              maskImage: "linear-gradient(180deg, transparent, black 10%, black 75%, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, transparent, black 10%, black 75%, transparent)",
            }}
          />
        </div>
      ))}

      {/* Grid dot overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(200,168,75,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(200,168,75,0.08) 0%, transparent 70%)" }} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-28 pb-14 sm:px-8 md:pt-36 md:pb-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7 pt-6">

            {/* Badge */}
            <div className="anim-in d100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-md hover:bg-white/10 transition-colors">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  {slide.badge}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              key={idx}
              className="anim-in d200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.92]"
              style={{
                fontFamily: "Fraunces, Georgia, serif",
                fontWeight: 700,
                maskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, black 0%, black 80%, transparent 100%)",
              }}
            >
              {slide.headline.map((line, i) => (
                <span key={i} className="block">
                  {i === slide.highlight ? (
                    <span className="bg-gradient-to-br from-white via-white to-[#c8a84b] bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Sub */}
            <p className="anim-in d300 max-w-lg text-base sm:text-lg text-zinc-400 leading-relaxed">
              {slide.sub}
            </p>

            {/* CTAs */}
            <div className="anim-in d400 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-navy-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: "#c8a84b" }}
              >
                {slide.primaryCta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20">
                <Play className="w-4 h-4 fill-current" />
                {slide.secondaryCta}
              </button>
            </div>

            {/* Slide Controls */}
            <div className="anim-in d500 flex items-center gap-4 pt-2">
              <button onClick={() => go(-1)} aria-label="Previous"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-yellow-500/60 hover:text-yellow-400 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {SLIDES.map((_, i) => (
                  <button key={i} onClick={() => { setPaused(true); setIdx(i); }}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-0.5 rounded-full transition-all duration-300 ${i === idx ? "w-10 bg-yellow-500" : "w-3 bg-white/20 hover:bg-white/40"}`} />
                ))}
              </div>
              <button onClick={() => go(1)} aria-label="Next"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-yellow-500/60 hover:text-yellow-400 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-white/20 text-xs ml-1" style={{ fontFamily: "DM Mono, monospace" }}>
                {String(idx + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="lg:col-span-5 space-y-5 lg:mt-10">

            {/* Stats Card */}
            <div className="anim-in d500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-0 -mr-14 -mt-14 h-56 w-56 rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                    <Shield className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "Fraunces, Georgia, serif" }}>3,500+</div>
                    <div className="text-sm text-zinc-400">IP Matters Handled</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-3 mb-7">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Client Satisfaction Rate</span>
                    <span className="text-white font-semibold">98%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/60">
                    <div className="h-full rounded-full" style={{ width: "98%", background: "linear-gradient(90deg, #c8a84b, #e2cc96)" }} />
                  </div>
                </div>

                <div className="h-px w-full bg-white/10 mb-6" />

                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <StatItem value="15+" label="Years" />
                  <div className="w-px bg-white/10 mx-auto" />
                  <StatItem value="2K+" label="Patents" />
                  <div className="w-px bg-white/10 mx-auto" />
                  <StatItem value="3" label="Offices" />
                </div>

                {/* Pill tags */}
                <div className="mt-7 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-zinc-300" style={{ fontFamily: "DM Mono, monospace" }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    ACCEPTING CASES
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-zinc-300" style={{ fontFamily: "DM Mono, monospace" }}>
                    <Crown className="w-3 h-3 text-yellow-500" />
                    REGISTERED FIRM
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold tracking-wide text-zinc-300" style={{ fontFamily: "DM Mono, monospace" }}>
                    🌐 GLOBAL REACH
                  </div>
                </div>
              </div>
            </div>

            {/* Marquee Card */}
            <div className="anim-in d500 relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-7 backdrop-blur-xl">
              <h3 className="mb-5 px-7 text-xs font-semibold uppercase tracking-widest text-zinc-400" style={{ fontFamily: "DM Mono, monospace" }}>
                Recognized & Registered With
              </h3>
              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <div className="animate-marquee flex gap-10 whitespace-nowrap px-4">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div key={i} className="flex items-center gap-2 opacity-40 transition-all hover:opacity-100 hover:scale-105 cursor-default">
                      <client.icon className="h-5 w-5 text-yellow-300" />
                      <span className="text-base font-bold text-white tracking-tight">{client.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
