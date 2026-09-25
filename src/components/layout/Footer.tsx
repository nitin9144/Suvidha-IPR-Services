import { Link } from 'react-router'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-9 w-auto object-contain" />
              <span className="text-[10px] text-white/40 uppercase tracking-widest border-l border-white/10 pl-2.5" style={{ fontFamily: 'DM Mono, monospace' }}>IPR Services</span>
            </div>
            <p className="text-white/30 text-xs leading-relaxed max-w-xs mb-5">
              Premier intellectual property firm serving innovators, MSMEs, startups, and academic institutions — across India and globally.
            </p>
            <div className="space-y-2">
              <a href="mailto:admin@iprsrg.com" className="flex items-center gap-2 text-white/30 hover:text-gold-400 text-xs transition-colors"><Mail className="w-3.5 h-3.5" />admin@iprsrg.com</a>
              <a href="tel:+917903467153" className="flex items-center gap-2 text-white/30 hover:text-gold-400 text-xs transition-colors"><Phone className="w-3.5 h-3.5" />+91 7903467153</a>
              <span className="flex items-start gap-2 text-white/25 text-xs"><MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />Corporate Park, Tower 1, 907, Sector 142, Noida – 201305</span>
            </div>
            <div className="flex gap-2.5 mt-5">
              {['in', 'tw', 'fb', 'yt'].map(s => (
                <a key={s} href="#" className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-gold-400 hover:border-gold-500/30 transition-all text-[10px] font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Patent Services',
              links: [
                ['Patent Search', '/patent-enquiry'],
                ['Prior Art Search', '/patent-enquiry'],
                ['Provisional Application', '/patent-enquiry'],
                ['Complete Specification', '/patent-enquiry'],
                ['PCT / International', '/patent-enquiry'],
                ['Patent Prosecution', '/patent-enquiry'],
              ],
            },
            {
              title: 'Copyright Services',
              links: [
                ['Copyright Search', '/copyright-enquiry'],
                ['Software Copyright', '/copyright-enquiry'],
                ['Literary Works', '/copyright-enquiry'],
                ['Artistic Works', '/copyright-enquiry'],
                ['Educational Content', '/copyright-enquiry'],
                ['Registration Assistance', '/copyright-enquiry'],
              ],
            },
            {
              title: 'Company',
              links: [
                ['About Us', '/#about'],
                ['How It Works', '/#how-it-works'],
                ['Blog & Resources', '/#blog'],
                ['FAQ', '/#faq'],
                ['Contact Us', '/#contact'],
                ['Client Login', '/login'],
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white text-[10px] font-semibold uppercase tracking-widest mb-4" style={{ fontFamily: 'DM Mono, monospace' }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-white/30 hover:text-gold-400 text-xs transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">© 2026 Suvidha IPR Services. All rights reserved.</p>
          <p className="text-white/15 text-[10px] text-center max-w-md">
            Suvidha IPR Services provides professional filing assistance only. We do not guarantee patent grant or copyright registration. Government statutory fees are separate from our professional charges.
          </p>
          <p className="text-white/15 text-xs">Noida · London · San Jose</p>
        </div>
      </div>
    </footer>
  )
}
