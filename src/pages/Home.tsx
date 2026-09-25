import { useState, useRef } from 'react'
import { Link } from 'react-router'
import HeroSection from '../components/ui/glassmorphism-trust-hero'
import {
  ArrowRight, ExternalLink, CheckCircle2, ChevronDown, ChevronUp,
  Microscope, FileText, Globe, Scale, Cpu, BookOpen
} from 'lucide-react'

// ─── Press Bar ─────────────────────────────────────────────────────────────
function PressBar() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-5">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>Recognized & Registered With</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {['IP India', 'WIPO', 'DPIIT', 'MSME Ministry', 'CII', 'FICCI'].map(l => (
            <span key={l} className="text-gray-400 text-sm font-semibold tracking-wide hover:text-navy-700 transition-colors cursor-default">{l}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Two-panel Moment ──────────────────────────────────────────────────────
function TwoPanelMoment() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center mb-16">
        <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>How It Works</p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          Protection without<br /><em>complication.</em>
        </h2>
        <p className="text-gray-500 text-base mt-5 max-w-lg mx-auto">From disclosure to grant — we handle every step with transparency and expertise.</p>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-10 grid md:grid-cols-3 gap-6 items-center mb-14">
        <div className="bg-navy-50 rounded-3xl p-8 text-center">
          <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Microscope className="w-7 h-7 text-navy-800" />
          </div>
          <h3 className="text-xl font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>You Invent</h3>
          <p className="text-navy-600/70 text-sm leading-relaxed">Your idea — a product, process, brand, or creative work — is ready to be protected.</p>
        </div>
        <div className="hidden md:flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ background: '#c8a84b' }}>
            <ArrowRight className="w-5 h-5 text-navy-900" />
          </div>
        </div>
        <div className="bg-navy-900 rounded-3xl p-8 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Scale className="w-7 h-7 text-yellow-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>We Protect</h3>
          <p className="text-white/50 text-sm leading-relaxed">We handle every filing, prosecution, and legal step — so you stay focused on what you do best.</p>
        </div>
      </div>

      {/* Workflow steps */}
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              type: '🔬 Patent Workflow',
              href: '/patent-enquiry',
              steps: ['Client Registration', 'Invention Disclosure', 'Applicant Information', 'Prior Art Search', 'Specification Drafting', 'Client Review', 'Filing Coordination', 'Application Tracking'],
            },
            {
              type: '©️ Copyright Workflow',
              href: '/copyright-enquiry',
              steps: ['Client Registration', 'Work Information', 'Author Information', 'Category Selection', 'Document Upload', 'Application Preparation', 'Filing Coordination', 'Diary / Tracking'],
            },
          ].map(w => (
            <div key={w.type} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h4 className="font-bold text-navy-900 mb-4">{w.type}</h4>
              <div className="space-y-2">
                {w.steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-navy-700 flex-shrink-0">{i + 1}</span>
                    <span className="text-sm text-navy-700">{s}</span>
                  </div>
                ))}
              </div>
              <Link to={w.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:text-gold-600 transition-colors">
                Start this workflow <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────
const patentServices = [
  'Patent Search', 'Prior Art Search', 'Patentability Assessment', 'Provisional Application',
  'Complete Specification', 'Patent Filing', 'Patent Prosecution', 'PCT / International Filing',
]
const copyrightServices = [
  'Copyright Search', 'Copyright Application', 'Software Copyright', 'Literary Works',
  'Artistic Works', 'Educational Content', 'Copyright Registration', 'International Filing',
]

function Services() {
  const [tab, setTab] = useState<'patent' | 'copyright'>('patent')
  return (
    <section id="services" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>Our Practice Areas</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            IP protection,<br /><em>start to finish.</em>
          </h2>
        </div>

        <div className="flex gap-3 justify-center mb-10">
          {(['patent', 'copyright'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${t === tab ? 'bg-navy-900 text-white shadow' : 'bg-white border border-gray-200 text-navy-700 hover:border-navy-300'}`}>
              {t === 'patent' ? '🔬 Patent Services' : '©️ Copyright Services'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-3">
            {(tab === 'patent' ? patentServices : copyrightServices).map(s => (
              <div key={s} className="flex items-start gap-2.5 bg-white rounded-xl p-4 border border-gray-100 hover:border-gold-200 hover:shadow-sm transition-all">
                <CheckCircle2 className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-navy-800 font-medium">{s}</span>
              </div>
            ))}
          </div>
          <div className="bg-navy-900 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              {tab === 'patent' ? 'Patent Filing Assistance' : 'Copyright Registration Assistance'}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {tab === 'patent'
                ? 'We assist inventors, startups, and institutions through every stage of patent protection — from initial search to final grant, including PCT international applications.'
                : 'We help authors, developers, and creators protect their original works through efficient copyright registration with the Copyright Office of India and internationally.'}
            </p>
            <div className="bg-white/5 rounded-xl p-4 mb-6 text-xs text-white/40 border border-white/10">
              <strong className="text-yellow-400 block mb-1">Important Disclaimer</strong>
              Suvidha IPR Services provides professional filing assistance only. Government statutory fees are charged separately. We do not guarantee patent grant or copyright registration.
            </div>
            <Link to={tab === 'patent' ? '/patent-enquiry' : '/copyright-enquiry'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105" style={{ background: '#c8a84b', color: '#0b1c3d' }}>
              Start {tab === 'patent' ? 'Patent' : 'Copyright'} Enquiry →
            </Link>
          </div>
        </div>

        {/* Feature tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { icon: Globe, title: 'International Reach', desc: 'PCT, Madrid Protocol, global filings.' },
            { icon: Scale, title: 'IPR Litigation', desc: 'Courts, tribunals, enforcement.' },
            { icon: Cpu, title: 'IP Strategy', desc: 'Portfolio audits and valuation.' },
            { icon: BookOpen, title: 'R&D Consulting', desc: 'Grant writing and tech transfer.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all group">
              <f.icon className="w-6 h-6 text-navy-700 mb-3 group-hover:text-gold-600 transition-colors" />
              <div className="font-semibold text-navy-900 text-sm mb-1">{f.title}</div>
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
    <section className="py-20 bg-navy-900">
      <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <div className="w-14 h-px bg-yellow-500 mx-auto mb-8" />
        <blockquote className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          "Suvidha IPR helped our research institution file and commercialize patents we would have otherwise left unlicensed. Their scientific depth is unmatched."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" alt="Dr. Rajiv Menon" className="w-11 h-11 rounded-full object-cover border-2 border-yellow-500/30" />
          <div className="text-left">
            <div className="text-white font-semibold text-sm">Dr. Rajiv Menon</div>
            <div className="text-yellow-400 text-xs mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>Director, IIT Technology Business Incubator</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = [
  { name: 'Priya Nair', role: 'Founder, BioTechX', stars: 5, text: 'Filed three patents through Suvidha — seamless process and expert prosecution. Grants came through faster than expected.' },
  { name: 'Amitesh Kumar', role: 'MSME Manufacturer, Jaipur', stars: 5, text: 'Got my trademark registered despite a third-party opposition. Absolute professionals throughout.' },
  { name: 'Dr. Sunita Verma', role: 'Associate Prof., Delhi University', stars: 5, text: "Filed software copyrights for our university's research tools and negotiated tech transfer. Highly recommended for academia." },
  { name: 'Rajan Mehta', role: 'CEO, StartupLab India', stars: 5, text: 'IP audit identified 6 overlooked innovations. Now have a robust portfolio that boosted our Series A valuation significantly.' },
  { name: 'Kavitha Reddy', role: 'Independent Designer', stars: 5, text: 'Design registered in under 3 months. Plain-language explanations made the process stress-free.' },
  { name: 'Vikram Singh', role: 'MD, Pharma Co.', stars: 5, text: 'PCT filings across 12 countries — flawless coordination with overseas agents. Truly a global firm.' },
]

function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 mb-12">
        <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>Client Stories</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
          Trusted by innovators<br /><em>across India.</em>
        </h2>
      </div>
      <div ref={ref} className="flex gap-5 overflow-x-auto pb-4 px-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex-shrink-0 w-72 snap-start bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex gap-0.5 mb-4">{Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}</div>
            <p className="text-navy-800 text-sm leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
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
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>Official Portals</p>
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-5" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Check your IP<br /><em>status instantly.</em>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">Real-time links to government IP status portals. No login required for basic checks.</p>
            <p className="text-gray-400 text-sm">For detailed prosecution history, <a href="/#contact" className="text-gold-600 underline">contact our team</a>.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portals.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer"
                className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:border-gold-300 hover:shadow-md transition-all group">
                <span className="text-2xl">{p.emoji}</span>
                <div>
                  <div className="font-semibold text-navy-900 text-sm group-hover:text-gold-700 transition-colors">{p.label}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{p.source}</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-gold-400 self-end transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About ─────────────────────────────────────────────────────────────────
function About() {
  const team = [
    { name: 'Dr. R.N. Sharma', role: 'Founder', spec: 'Patent Law & Technology Transfer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=360&fit=crop&auto=format' },
    { name: 'Mrs. Meera Sharma', role: 'Founder', spec: 'Trademark & Copyright', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=360&fit=crop&auto=format' },
    { name: 'Dr. Madhuranjan Vatsa', role: 'Managing Partner', spec: 'IPR Litigation', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=360&fit=crop&auto=format' },
    { name: 'Dr. Kumari Lipi', role: 'Managing Partner', spec: 'Scientific Patents & R&D', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=360&fit=crop&auto=format' },
  ]
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>Our Team</p>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
            Led by <em>experts.</em>
          </h2>
          <p className="text-gray-500 text-base mt-4 max-w-md mx-auto">Scientific depth, legal acumen, and decades of IP experience under one roof.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map(m => (
            <div key={m.name} className="group text-center">
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100" style={{ aspectRatio: '5/6' }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/25 transition-all duration-300" />
              </div>
              <div className="font-bold text-navy-900 text-sm" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{m.name}</div>
              <div className="text-gold-600 text-xs font-medium mt-0.5">{m.role}</div>
              <div className="text-gray-400 text-xs mt-1">{m.spec}</div>
            </div>
          ))}
        </div>
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            { n: '01', t: 'Honest Advice', d: 'Realistic timelines, frank assessments, no inflated promises. We tell you exactly what to expect.' },
            { n: '02', t: 'Tailored Pricing', d: 'Government fees are always disclosed separately. Professional charges are customized per client.' },
            { n: '03', t: 'Global Reach', d: 'Offices in Noida, London, and San Jose — seamlessly handling Indian and international IP matters.' },
          ].map(w => (
            <div key={w.n} className="bg-navy-50 rounded-2xl p-7">
              <div className="text-gold-500 text-xs mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>{w.n}</div>
              <h4 className="font-bold text-navy-900 mb-2">{w.t}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Blog ──────────────────────────────────────────────────────────────────
const posts = [
  { cat: 'Patents', title: 'How to File a Provisional Patent Application in India: Step-by-Step', date: 'Aug 12, 2026', img: 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=480&h=300&fit=crop&auto=format' },
  { cat: 'Trademarks', title: 'Understanding Trademark Classes: Which Class Does Your Business Fall In?', date: 'Aug 8, 2026', img: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=480&h=300&fit=crop&auto=format' },
  { cat: 'IP Strategy', title: 'IP Portfolio Management for Startups: When and What to Protect', date: 'Jul 30, 2026', img: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=480&h=300&fit=crop&auto=format' },
]

function Blog() {
  return (
    <section id="blog" className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>IP Insights</p>
            <h2 className="text-4xl font-bold text-navy-900 leading-tight" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Latest articles.</h2>
          </div>
          <a href="#" className="text-navy-700 text-sm font-medium hover:text-gold-600 transition-colors flex items-center gap-1.5">
            View all <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(p => (
            <a key={p.title} href="#" className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gold-200 hover:shadow-lg transition-all">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-gold-600 text-xs font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>{p.cat}</div>
                <h3 className="font-bold text-navy-900 text-sm leading-snug mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{p.title}</h3>
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
  { q: 'What is Suvidha IPR Services?', a: 'Suvidha IPR Services is a professional IP filing assistance firm based in Noida with offices in London and San Jose. We provide end-to-end support for patent and copyright registration, trademark protection, design registration, and IPR litigation.' },
  { q: 'Do you guarantee patent grant or copyright registration?', a: 'No. We provide professional filing assistance only. Patent grant and copyright registration decisions rest with the respective government offices (Indian Patent Office and Copyright Office). We ensure applications are prepared and filed correctly to maximize success.' },
  { q: 'What are Government statutory fees?', a: 'Government statutory fees are separate charges payable directly to the Indian Patent Office, Copyright Office, or other government bodies. These are in addition to our professional service charges and are always disclosed transparently.' },
  { q: 'How long does a patent take?', a: 'In India, patent prosecution typically takes 3–6 years. A provisional application can be filed quickly to establish a priority date, with the complete specification filed within 12 months.' },
  { q: 'Can startups get fee reductions?', a: 'Yes. The Indian Patent Office offers significant fee reductions (up to 80%) for startups, natural persons, and small entities. We ensure all eligible clients avail these concessions.' },
  { q: 'How do I track my case progress?', a: 'Once registered, clients get access to the Client Dashboard where they can view case timelines, pending actions, documents, and communicate with the assigned team in real time.' },
  { q: 'Do you handle PCT international patent filings?', a: 'Yes. We file PCT applications through the Indian Patent Office as a Receiving Office, enabling protection across 150+ member countries with coordinated national phase entry.' },
  { q: 'Is my invention information kept confidential?', a: 'Completely. All disclosures are protected by attorney-client privilege and our strict internal confidentiality protocols. Your invention details are never shared with third parties.' },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-5 lg:px-10">
        <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-4 text-center" style={{ fontFamily: 'DM Mono, monospace' }}>FAQ</p>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-900 text-center leading-tight mb-14" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Common questions.</h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group gap-5">
                <span className={`font-semibold text-sm leading-relaxed transition-colors ${open === i ? 'text-navy-900' : 'text-navy-800 group-hover:text-navy-900'}`}>{f.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-gold-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-navy-500 transition-colors" />}
              </button>
              {open === i && <p className="pb-5 text-gray-600 text-sm leading-relaxed border-l-2 border-gold-300 pl-4 -mt-1">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact / CTA ─────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', msg: '' })
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="py-28 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(200,168,75,0.08) 0%, transparent 60%)' }} />
      <div className="max-w-7xl mx-auto px-5 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {[{ e: '⭐', l: '4.8 Rated Firm' }, { e: '🏛️', l: 'IP India Registered' }, { e: '🔒', l: '100% Confidential' }].map(b => (
                <span key={b.l} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/10 rounded-full text-white text-xs font-medium">{b.e} {b.l}</span>
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Start protecting<br /><em className="text-yellow-400">your IP today.</em>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10 text-base">Whether it's your first patent or a global trademark portfolio — we're ready to help you move fast and protect smart.</p>
            <div className="space-y-4">
              {[
                { e: '✉️', l: 'Email', v: 'admin@iprsrg.com' },
                { e: '📞', l: 'Phone', v: '+91 7903467153 / 9308937148' },
                { e: '📍', l: 'Noida', v: 'Corporate Park, Tower 1, 907, Sector 142, Noida – 201305' },
                { e: '🌍', l: 'UK', v: '532 Becontree Avenue, London, RM8 3HR' },
              ].map(c => (
                <div key={c.l} className="flex gap-3 items-start">
                  <span className="text-lg">{c.e}</span>
                  <div>
                    <div className="text-white/30 text-[10px] uppercase tracking-widest mb-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>{c.l}</div>
                    <div className="text-white/75 text-sm">{c.v}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex gap-3 flex-wrap">
              <Link to="/patent-enquiry" className="px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105" style={{ background: '#c8a84b', color: '#0b1c3d' }}>
                Start Patent Enquiry →
              </Link>
              <Link to="/copyright-enquiry" className="px-6 py-3 rounded-full text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors">
                Start Copyright Enquiry
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8">
            {sent ? (
              <div className="flex flex-col items-center py-14 text-center">
                <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Message received!</h3>
                <p className="text-gray-500 text-sm">We'll respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="space-y-4">
                <h3 className="font-bold text-navy-900 text-xl mb-5" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Book a free consultation</h3>
                {[{ id: 'name', label: 'Full Name', type: 'text', ph: 'Dr. Arjun Mehta' }, { id: 'email', label: 'Email', type: 'email', ph: 'arjun@company.com' }].map(f => (
                  <div key={f.id}>
                    <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                    <input type={f.type} required placeholder={f.ph} value={(form as any)[f.id]} onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Service</label>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-400 bg-white appearance-none">
                    <option value="">Select a service…</option>
                    {['Patent Search', 'Provisional Patent', 'Complete Patent', 'PCT Filing', 'Copyright Registration', 'Software Copyright', 'IPR Litigation', 'IP Strategy'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Message</label>
                  <textarea rows={3} placeholder="Briefly describe your IP need…" value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 resize-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-navy-900 text-white font-bold text-sm rounded-xl hover:bg-navy-800 transition-colors">
                  Send Message →
                </button>
                <p className="text-center text-gray-400 text-xs">Responds within 1 business day · 100% confidential</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <PressBar />
      <TwoPanelMoment />
      <Services />
      <ExpertQuote />
      <Testimonials />
      <StatusCheck />
      <About />
      <Blog />
      <FAQ />
      <Contact />
    </>
  )
}
