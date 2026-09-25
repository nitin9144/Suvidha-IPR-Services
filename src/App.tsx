import { useState, useEffect, useRef } from 'react'
import HeroSection from '@/components/ui/glassmorphism-trust-hero'

// ─── Logo ──────────────────────────────────────────────────────────────────
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/suvidha-logo.png" alt="Suvidha IPR Services" className="h-10 w-auto object-contain" />
      <span
        className={`text-[11px] uppercase tracking-[0.2em] font-semibold border-l pl-2.5 ${dark ? 'text-navy-900 border-navy-200' : 'text-white/70 border-white/20'}`}
        style={{ fontFamily: 'DM Mono, monospace' }}
      >
        IPR Services
      </span>
    </div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero">{scrolled ? <Logo dark /> : <Logo />}</a>

        <div className="hidden md:flex items-center gap-8">
          {[['Services', '#services'], ['About', '#about'], ['Status Check', '#status'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([l, h]) => (
            <a key={l} href={h} className={`text-sm font-medium transition-colors ${scrolled ? 'text-navy-800 hover:text-gold-600' : 'text-white/80 hover:text-white'}`}>{l}</a>
          ))}
        </div>

        <a href="#contact" className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${scrolled ? 'bg-navy-900 text-white hover:bg-navy-800' : 'bg-white text-navy-900 hover:bg-gold-50'}`}>
          Free Consultation
        </a>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-navy-900' : 'bg-white'} ${i === 1 && mobileOpen ? 'opacity-0' : ''} ${i === 0 && mobileOpen ? 'rotate-45 translate-y-1.5' : ''} ${i === 2 && mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          ))}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-5 pt-3 space-y-3">
          {[['Services', '#services'], ['About', '#about'], ['Status Check', '#status'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([l, h]) => (
            <a key={l} href={h} onClick={() => setMobileOpen(false)} className="block text-sm text-navy-800 font-medium py-1.5 border-b border-gray-50">{l}</a>
          ))}
          <a href="#contact" className="block text-center mt-3 px-5 py-2.5 bg-navy-900 text-white rounded-full text-sm font-semibold">Free Consultation</a>
        </div>
      )}
    </nav>
  )
}

// ─── Press Bar ─────────────────────────────────────────────────────────────
function PressBar() {
  const logos = ['IP India', 'WIPO', 'MSME Ministry', 'DPIIT', 'CII', 'FICCI']
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-5" style={{ fontFamily: 'DM Mono, monospace' }}>Recognized & Registered With</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {logos.map(l => (
            <span key={l} className="text-gray-400 text-sm font-semibold tracking-wide hover:text-navy-700 transition-colors cursor-default">{l}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Two-Panel Moment ──────────────────────────────────────────────────────
function TwoPanelMoment() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center mb-16">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>How It Works</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
          Protection without<br />complication.
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-3 gap-6 items-center">
        {/* You Invent */}
        <div className="bg-navy-50 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4a9 9 0 110 14.5" stroke="#0b1c3d" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="16" r="3" fill="#0b1c3d"/><path d="M16 26v-4M8 16H4M28 16h-4M10.3 10.3L7.5 7.5M25.5 24.5l-2.8-2.8" stroke="#0b1c3d" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>You invent</h3>
          <p className="text-navy-600/70 text-sm leading-relaxed">Your idea — a product, process, brand, or design — is ready to share with the world.</p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
            <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-200">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M12 6l4 4-4 4" stroke="#0b1c3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold-300 to-transparent" />
          </div>
        </div>

        {/* We Protect */}
        <div className="bg-navy-900 rounded-3xl p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 3L5 8v10c0 7 5 12.5 11 14 6-1.5 11-7 11-14V8L16 3Z" fill="#c8a84b" opacity="0.2" stroke="#c8a84b" strokeWidth="2" strokeLinejoin="round"/><path d="M11 16l4 4 6-7" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>We protect</h3>
          <p className="text-white/50 text-sm leading-relaxed">We handle every filing, prosecution, and legal step — so your IP is secured without the headache.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-10 grid grid-cols-3 gap-4 text-center">
        {[['Patent', 'Up to 20 years protection'], ['Trademark', 'Renew every 10 years'], ['Copyright', 'Lifetime + 60 years']].map(([t, d]) => (
          <div key={t} className="py-5 border border-gray-100 rounded-2xl">
            <div className="text-navy-900 font-semibold text-sm">{t}</div>
            <div className="text-gray-400 text-xs mt-1">{d}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Services / Features ───────────────────────────────────────────────────
const mainServices = [
  {
    title: 'Patent Filing & Prosecution',
    desc: 'From novelty search to grant — we draft, file, and prosecute patents before the Indian Patent Office and WIPO PCT.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=480&fit=crop&auto=format',
    tags: ['Novelty Search', 'Drafting', 'PCT Filing', 'Grant'],
    color: 'from-blue-50 to-indigo-50',
  },
  {
    title: 'Trademark Registration',
    desc: 'Protect your brand name, logo, and tagline. We manage searches, applications, opposition, and renewal.',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=640&h=480&fit=crop&auto=format',
    tags: ['TM Search', 'Application', 'Opposition', 'Renewal'],
    color: 'from-amber-50 to-orange-50',
  },
  {
    title: 'Copyright Protection',
    desc: 'Register literary, artistic, musical, and software works with the Copyright Office — nationally and internationally.',
    img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=640&h=480&fit=crop&auto=format',
    tags: ['Registration', 'Software', 'International', 'Licensing'],
    color: 'from-purple-50 to-violet-50',
  },
  {
    title: 'Design Registration',
    desc: 'Protect the visual appearance of your products. We handle search, classification, and prosecution under the Designs Act.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=640&h=480&fit=crop&auto=format',
    tags: ['Search', 'Filing', 'Classification', 'Restoration'],
    color: 'from-teal-50 to-cyan-50',
  },
]

const featureTiles = [
  { icon: '⚖️', title: 'IPR Litigation', desc: 'Courts, tribunals, cease-and-desist.' },
  { icon: '🌐', title: 'International Filing', desc: 'PCT, Madrid Protocol, Hague.' },
  { icon: '🔬', title: 'R&D Consulting', desc: 'Grant writing & tech transfer.' },
  { icon: '🤖', title: 'IP Strategy', desc: 'Portfolio audits & valuation.' },
  { icon: '📜', title: 'Trade Secrets', desc: 'NDA drafting & enforcement.' },
  { icon: '🎓', title: 'Institutions', desc: 'MSMEs, startups, academia.' },
  { icon: '🛡️', title: 'Opposition Defense', desc: 'Respond to third-party challenges.' },
  { icon: '📊', title: 'IP Audits', desc: 'Inventory and gap analysis.' },
]

function Services() {
  const [active, setActive] = useState(0)
  const s = mainServices[active]
  return (
    <section id="services" className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>Our Practice Areas</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center mb-4 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
          IP protection,<br />start to finish.
        </h2>
        <p className="text-center text-gray-500 text-base mb-14 max-w-md mx-auto">Every step of your intellectual property lifecycle, handled by specialists.</p>

        {/* Service selector tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {mainServices.map((ms, i) => (
            <button key={ms.title} onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${i === active ? 'bg-navy-900 text-white shadow-md' : 'bg-white text-navy-700 border border-gray-200 hover:border-navy-300'}`}>
              {ms.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Active service card */}
        <div className={`rounded-3xl bg-gradient-to-br ${s.color} p-2 mb-14 transition-all duration-300`}>
          <div className="bg-white rounded-2xl overflow-hidden grid md:grid-cols-2 gap-0">
            <div className="p-10 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-navy-900 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>{s.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map(t => (
                  <span key={t} className="px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-xs font-medium">{t}</span>
                ))}
              </div>
              <a href="#contact" className="mt-8 self-start px-6 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded-full hover:bg-navy-800 transition-colors">
                Get Started →
              </a>
            </div>
            <div className="relative min-h-56 bg-gray-100">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </div>
        </div>

        {/* Feature tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featureTiles.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all duration-200 group">
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-semibold text-navy-900 text-sm mb-1 group-hover:text-gold-700 transition-colors">{f.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Expert Quote ──────────────────────────────────────────────────────────
function ExpertQuote() {
  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-16 h-px bg-gold-500 mx-auto mb-8" />
        <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-10" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          "Suvidha IPR Services has been instrumental in helping our research institution secure and commercialize patents that would otherwise have remained unlicensed. Their expertise is unmatched."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" alt="Dr. Rajiv Menon" className="w-12 h-12 rounded-full object-cover border-2 border-gold-400/30" />
          <div className="text-left">
            <div className="text-white font-semibold text-sm">Dr. Rajiv Menon</div>
            <div className="text-gold-400 text-xs mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>Director, IIT Technology Business Incubator</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Priya Nair', role: 'Founder, BioTechX', stars: 5, text: 'We filed three patents through Suvidha — the process was seamless, and their prosecution team handled every office action expertly. Our grants came through faster than expected.' },
  { name: 'Amitesh Kumar', role: 'MSME Manufacturer, Jaipur', stars: 5, text: 'I had been using my brand name for years without trademark registration. Suvidha filed it quickly, handled a third-party opposition, and we got our trademark. Absolute professionals.' },
  { name: 'Dr. Sunita Verma', role: 'Associate Prof., Delhi University', stars: 5, text: "For our university's research output, Suvidha helped us file copyrights on software tools and negotiate tech transfer agreements. Highly recommended for academia." },
  { name: 'Rajan Mehta', role: 'CEO, StartupLab India', stars: 5, text: 'Their IP audit identified 6 protectable innovations we had overlooked. We now have a robust portfolio that significantly boosted our Series A valuation.' },
  { name: 'Kavitha Reddy', role: 'Independent Designer', stars: 5, text: 'Got my product designs registered in under 3 months. The team explained every step in plain language. I finally feel my work is legally protected.' },
  { name: 'Vikram Singh', role: 'Managing Director, Pharma Co.', stars: 5, text: 'Suvidha handled our PCT international applications across 12 countries. Their coordination with overseas agents was flawless.' },
]

function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>Client Stories</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
          Trusted by innovators<br />across India.
        </h2>
      </div>

      {/* Scrollable row */}
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 px-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-72 snap-start bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex gap-0.5 mb-4">
              {Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-gold-400 text-sm">★</span>)}
            </div>
            <p className="text-navy-800 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
            <div>
              <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
              <div className="text-gray-400 text-xs mt-0.5">{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Status Check ──────────────────────────────────────────────────────────
function StatusCheck() {
  const portals = [
    { label: 'Patent Status', source: 'IP India · inPASS', href: 'https://ipindiaservices.gov.in/PatentSearch/PatentSearch/ViewApplicationStatus', emoji: '🔬' },
    { label: 'Trademark Status', source: 'IP India · TMR', href: 'https://ipindiaservices.gov.in/tmrpublicsearch/', emoji: '™️' },
    { label: 'Copyright', source: 'copyright.gov.in', href: 'https://copyright.gov.in/', emoji: '©️' },
    { label: 'Design Status', source: 'IP India · Designs', href: 'https://ipindiaservices.gov.in/DesignSearch/', emoji: '✏️' },
    { label: 'PCT / WIPO', source: 'WIPO Patentscope', href: 'https://patentscope.wipo.int/search/en/search.jsf', emoji: '🌐' },
    { label: 'Court Cases', source: 'eCourts Portal', href: 'https://ecourts.gov.in/ecourts_home/', emoji: '⚖️' },
  ]
  return (
    <section id="status" className="py-28 bg-navy-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>Official Portals</p>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
              Check your IP<br />status instantly.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">Quick links to government portals for real-time IP status verification. No login required for basic status checks.</p>
            <p className="text-gray-400 text-sm">For detailed prosecution history or office action responses, contact our team.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portals.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all duration-200 group">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="font-semibold text-navy-900 text-sm group-hover:text-gold-700 transition-colors">{p.label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{p.source}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-300 group-hover:text-gold-400 self-end transition-colors"><path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Team ──────────────────────────────────────────────────────────────────
function About() {
  const team = [
    { name: 'Dr. R.N. Sharma', role: 'Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=360&fit=crop&auto=format', spec: 'Patent Law & Technology Transfer' },
    { name: 'Mrs. Meera Sharma', role: 'Founder', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=360&fit=crop&auto=format', spec: 'Trademark & Copyright' },
    { name: 'Dr. Madhuranjan Vatsa', role: 'Managing Partner', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=360&fit=crop&auto=format', spec: 'IPR Litigation' },
    { name: 'Dr. Kumari Lipi', role: 'Managing Partner', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=360&fit=crop&auto=format', spec: 'Scientific Patents & R&D Grants' },
  ]

  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>Our Team</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center leading-tight mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
          Led by experts.
        </h2>
        <p className="text-center text-gray-500 mb-16 max-w-lg mx-auto">Scientific depth, legal acumen, and decades of IP experience — all under one roof.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="group text-center">
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100" style={{ aspectRatio: '5/6' }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/30 transition-all duration-300" />
              </div>
              <div className="font-bold text-navy-900 text-sm" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{m.name}</div>
              <div className="text-gold-600 text-xs font-medium mt-0.5">{m.role}</div>
              <div className="text-gray-400 text-xs mt-1 leading-tight">{m.spec}</div>
            </div>
          ))}
        </div>

        {/* Why choose */}
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { n: '01', title: 'Honest & Frank Advice', desc: 'We tell you what you need to hear — realistic timelines, honest assessments, no inflated promises.' },
            { n: '02', title: 'Tailored to Your Budget', desc: 'Pricing and delivery are customized per client. We work with startups as readily as large corporations.' },
            { n: '03', title: 'Global Reach, Local Insight', desc: 'Offices in Noida, London, and San Jose — seamlessly managing Indian and international IP matters.' },
          ].map(w => (
            <div key={w.n} className="bg-navy-50 rounded-2xl p-7">
              <div className="text-gold-500 text-xs font-mono-data mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>{w.n}</div>
              <h4 className="font-bold text-navy-900 mb-2">{w.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog ──────────────────────────────────────────────────────────────────
const posts = [
  { cat: 'Patents', title: 'How to File a Provisional Patent Application in India: Step-by-Step Guide', date: 'Aug 12, 2026', img: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=480&h=300&fit=crop&auto=format' },
  { cat: 'Trademarks', title: 'Understanding Trademark Classes: Which Class Does Your Business Fall In?', date: 'Aug 8, 2026', img: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=480&h=300&fit=crop&auto=format' },
  { cat: 'IP Strategy', title: 'IP Portfolio Management for Startups: When and What to Protect', date: 'Jul 30, 2026', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=480&h=300&fit=crop&auto=format' },
]

function Blog() {
  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>IP Insights</p>
            <h2 className="text-4xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>Latest articles.</h2>
          </div>
          <a href="#" className="text-navy-700 text-sm font-medium hover:text-gold-600 transition-colors flex items-center gap-1.5">
            View all articles <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p => (
            <a key={p.title} href="#" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all duration-200">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-gold-600 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>{p.cat}</div>
                <h3 className="font-bold text-navy-900 text-sm leading-snug mb-3 group-hover:text-navy-700 transition-colors" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{p.title}</h3>
                <div className="text-gray-400 text-xs">{p.date}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
const faqs = [
  { q: 'What is Suvidha IPR Services?', a: 'Suvidha IPR Services is a premier intellectual property law firm based in Noida, India, with offices in London and San Jose. We offer end-to-end IP services including patent filing, trademark registration, copyright protection, design registration, and IPR litigation.' },
  { q: 'How long does a patent last in India?', a: 'A granted patent in India is valid for 20 years from the date of filing, subject to annual renewal fees. PCT patents can extend protection to 150+ countries.' },
  { q: 'Can startups and MSMEs afford patent services?', a: 'Absolutely. Indian IP offices offer significant fee reductions for startups and MSMEs — up to 80% off standard fees. We work with these concessions and offer flexible pricing.' },
  { q: 'How long does trademark registration take?', a: 'After filing, examination typically takes 3–6 months. If accepted and published without opposition, registration is granted within 18–24 months. Using an expedited route can reduce this.' },
  { q: 'Do you handle international (PCT) patent filings?', a: 'Yes. We file PCT applications through the Indian Patent Office as a Receiving Office, with coverage in 150+ member countries. We also coordinate with overseas associates for national phase entry.' },
  { q: 'Is my information kept confidential?', a: 'Completely. All client information and IP disclosures are protected by attorney-client privilege and strict internal confidentiality protocols. We never share your innovations with third parties.' },
  { q: 'What is the difference between a patent and a design registration?', a: 'A patent protects functional and technical innovations (how something works), while a design registration protects only the novel ornamental or visual appearance of an article (how something looks).' },
  { q: 'Which types of works are eligible for copyright?', a: 'Literary, dramatic, musical, and artistic works, cinematograph films, computer programs, and sound recordings all qualify. Registration is not mandatory in India but provides crucial legal advantages.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-gold-600 text-sm font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>FAQ</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center leading-tight mb-14" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
          Common questions.
        </h2>

        <div className="divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group gap-6">
                <span className={`font-semibold text-base transition-colors ${open === i ? 'text-navy-900' : 'text-navy-800 group-hover:text-navy-900'}`}>{f.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${open === i ? 'bg-gold-500 border-gold-500 rotate-45' : 'border-gray-200 group-hover:border-navy-300'}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke={open === i ? '#0b1c3d' : '#555'} strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
              </button>
              {open === i && (
                <p className="pb-5 text-gray-600 text-sm leading-relaxed border-l-2 border-gold-300 pl-4 -mt-1">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Closing CTA ───────────────────────────────────────────────────────────
function ClosingCTA() {
  const [form, setForm] = useState({ name: '', email: '', service: '', msg: '' })
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 80% at 10% 50%, rgba(200,168,75,0.08) 0%, transparent 60%)' }} />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[{ e: '⭐', l: '4.8 Rated Firm' }, { e: '🏛️', l: 'IP India Registered' }, { e: '🔒', l: '100% Confidential' }].map(b => (
                <span key={b.l} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/10 rounded-full text-white text-xs font-medium">
                  {b.e} {b.l}
                </span>
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>
              Start protecting<br />your IP today.
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10">Whether it's your first patent or a global trademark portfolio — our team is ready to help you move fast and protect smart.</p>

            <div className="space-y-5">
              {[
                { icon: '✉️', label: 'Email', val: 'admin@iprsrg.com' },
                { icon: '📞', label: 'Phone', val: '+91 7903467153 / 9308937148' },
                { icon: '📍', label: 'Noida', val: 'Corporate Park, Tower 1, 907, Sector 142, Noida – 201305' },
                { icon: '🌍', label: 'UK', val: '532 Becontree Avenue, London, RM8 3HR' },
              ].map(c => (
                <div key={c.label} className="flex gap-4 items-start">
                  <span className="text-lg mt-0.5">{c.icon}</span>
                  <div>
                    <div className="text-white/30 text-xs uppercase tracking-widest mb-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>{c.label}</div>
                    <div className="text-white/80 text-sm">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Message received!</h3>
                <p className="text-gray-500 text-sm">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
                <h3 className="font-bold text-navy-900 text-xl mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 700 }}>Book a free consultation</h3>
                {[{ id: 'name', label: 'Full Name', type: 'text', ph: 'Arjun Mehta' }, { id: 'email', label: 'Email', type: 'email', ph: 'arjun@company.com' }].map(f => (
                  <div key={f.id}>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.ph} value={(form as any)[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Service Required</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-400 transition-colors appearance-none bg-white">
                    <option value="">Select a service…</option>
                    {['Patent Filing', 'Trademark Registration', 'Copyright Protection', 'Design Registration', 'IPR Litigation', 'R&D Consulting', 'IP Strategy'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Your Message</label>
                  <textarea rows={3} required placeholder="Briefly describe your IP need…" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-3.5 bg-navy-900 text-white font-bold text-sm rounded-xl hover:bg-navy-800 transition-colors">
                  Send Message →
                </button>
                <p className="text-center text-gray-400 text-xs mt-2">We respond within 1 business day · 100% confidential</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          <div className="col-span-2">
            <Logo />
            <p className="text-white/30 text-xs leading-relaxed mt-4 max-w-xs">
              Premier intellectual property firm serving innovators, MSMEs, startups, and academic institutions — across India and globally.
            </p>
            <div className="flex gap-2.5 mt-6">
              {['in', 'tw', 'fb', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 hover:border-white/30 transition-all text-xs font-bold">{s}</a>
              ))}
            </div>
          </div>

          {[
            { title: 'Services', items: ['Patent Filing', 'Trademark', 'Copyright', 'Design', 'Litigation', 'R&D Consulting'] },
            { title: 'Company', items: ['About Us', 'Our Team', 'Blog', 'Careers', 'Contact'] },
            { title: 'Offices', items: ['Noida – Sector 142', 'London – RM8 3HR', 'San Jose – CA 95121', 'admin@iprsrg.com'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-5" style={{ fontFamily: 'DM Mono, monospace' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map(i => <li key={i}><a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-xs">© 2026 Suvidha IPR Services. All rights reserved.</p>
          <p className="text-white/15 text-xs">Noida · London · San Jose</p>
        </div>
      </div>
    </footer>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <PressBar />
      <TwoPanelMoment />
      <Services />
      <ExpertQuote />
      <Testimonials />
      <StatusCheck />
      <About />
      <Blog />
      <FAQ />
      <ClosingCTA />
      <Footer />
    </div>
  )
}
