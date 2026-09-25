import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CheckCircle2, Upload, ArrowLeft, ArrowRight, X, FileText } from 'lucide-react'

const STEPS = [
  'Service Selection',
  'Invention Information',
  'Applicant Details',
  'Disclosure & Claims',
  'Document Upload',
  'Review & Submit',
]

type UploadedFile = { name: string; size: string }

interface FormData {
  service: string
  inventionTitle: string
  inventionField: string
  inventionSummary: string
  noveltyAspects: string
  priorArtKnown: string
  applicantType: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  applicantAddress: string
  applicantCountry: string
  inventorSame: boolean
  inventorName: string
  publicDisclosure: string
  targetCountries: string[]
  files: UploadedFile[]
  agreeDisclaimer: boolean
  agreeConfidentiality: boolean
}

const PATENT_SERVICES = [
  { id: 'search', label: 'Patent Search', desc: 'Comprehensive search of existing patents and literature.', fee: '₹6,000–₹12,000' },
  { id: 'prior_art', label: 'Prior Art Search', desc: 'Detailed search for prior art to assess novelty.', fee: '₹8,000–₹15,000' },
  { id: 'provisional', label: 'Provisional Application', desc: 'File a provisional to establish priority date — complete spec due within 12 months.', fee: '₹12,000–₹20,000' },
  { id: 'complete', label: 'Complete Specification', desc: 'Full specification drafting and filing with claims.', fee: '₹25,000–₹45,000' },
  { id: 'pct', label: 'PCT / International Filing', desc: 'File through WIPO for protection in 150+ countries.', fee: '₹40,000–₹80,000' },
  { id: 'prosecution', label: 'Patent Prosecution Support', desc: 'Respond to office actions and examination reports.', fee: '₹8,000–₹20,000' },
]

const COUNTRIES = ['India', 'USA', 'UK', 'Germany', 'Japan', 'China', 'Canada', 'Australia', 'South Korea', 'France']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-12 px-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < current ? 'bg-green-500 text-white' : i === current ? 'bg-navy-900 text-white ring-4 ring-navy-900/20' : 'bg-gray-100 text-gray-400'}`}>
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-medium text-center leading-tight max-w-[60px] hidden md:block ${i === current ? 'text-navy-900' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < current ? 'bg-green-400' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}

export default function PatentEnquiry() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<FormData>({
    service: '',
    inventionTitle: '',
    inventionField: '',
    inventionSummary: '',
    noveltyAspects: '',
    priorArtKnown: '',
    applicantType: 'individual',
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    applicantAddress: '',
    applicantCountry: 'India',
    inventorSame: true,
    inventorName: '',
    publicDisclosure: 'no',
    targetCountries: ['India'],
    files: [],
    agreeDisclaimer: false,
    agreeConfidentiality: false,
  })

  const set = (key: keyof FormData, val: any) => setData(d => ({ ...d, [key]: val }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const handleFileAdd = () => {
    const fake: UploadedFile[] = [
      { name: 'Invention_Disclosure.pdf', size: '1.2 MB' },
      { name: 'Technical_Drawings.pdf', size: '3.4 MB' },
    ]
    set('files', [...data.files, fake[data.files.length % 2]])
  }

  const handleSubmit = () => setSubmitted(true)

  const toggleCountry = (c: string) => {
    set('targetCountries', data.targetCountries.includes(c)
      ? data.targetCountries.filter(x => x !== c)
      : [...data.targetCountries, c])
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Enquiry Submitted!</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Your patent enquiry has been received. Our team will review it and contact you within <strong>1–2 business days</strong>.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-8 text-xs text-amber-800">
            <strong className="block mb-1">Reference ID: SIP-2026-{Math.floor(Math.random() * 9000) + 1000}</strong>
            Please save this reference number. Once our team completes the initial review, you will receive login credentials for the Client Dashboard.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="px-6 py-3 border border-gray-200 rounded-full text-sm font-semibold text-navy-800 hover:bg-gray-50 transition-colors">Back to Home</Link>
            <Link to="/login" className="px-6 py-3 rounded-full text-sm font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>Track My Enquiry →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-3xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Patent Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Patent Enquiry Form</h1>
          <p className="text-gray-500 text-sm mt-2">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">

          {/* Step 0: Service Selection */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Select the service you need</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {PATENT_SERVICES.map(s => (
                  <button key={s.id} onClick={() => set('service', s.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${data.service === s.id ? 'border-navy-900 bg-navy-50' : 'border-gray-100 hover:border-navy-200'}`}>
                    <div className="font-semibold text-navy-900 text-sm mb-1">{s.label}</div>
                    <div className="text-gray-500 text-xs leading-relaxed mb-2">{s.desc}</div>
                    <div className="text-gold-700 text-xs font-semibold">{s.fee} (professional fee)</div>
                  </button>
                ))}
              </div>
              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                <strong>Note:</strong> Government statutory filing fees are charged separately and vary based on applicant type. These will be disclosed during the initial review.
              </div>
            </div>
          )}

          {/* Step 1: Invention Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Tell us about your invention</h2>
              <p className="text-gray-500 text-xs mb-5 bg-amber-50 border border-amber-100 rounded-lg p-3">
                🔒 All information is protected by strict confidentiality protocols. Your invention details will not be shared with any third party.
              </p>
              {[
                { key: 'inventionTitle', label: 'Invention Title', ph: 'e.g. Smart Water Purification Device Using AI' },
                { key: 'inventionField', label: 'Technical Field', ph: 'e.g. Water Treatment / Environmental Engineering' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                  <input type="text" placeholder={f.ph} value={(data as any)[f.key]} onChange={e => set(f.key as any, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              ))}
              {[
                { key: 'inventionSummary', label: 'Brief Description of the Invention', ph: 'Describe what your invention does, how it works, and what problem it solves...' },
                { key: 'noveltyAspects', label: 'Novel / Unique Aspects', ph: 'What makes this invention different from existing solutions?' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                  <textarea rows={3} placeholder={f.ph} value={(data as any)[f.key]} onChange={e => set(f.key as any, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 resize-none transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>
                  Have you publicly disclosed this invention? (publication, presentation, sale, etc.)
                </label>
                <div className="flex gap-3">
                  {['no', 'yes', 'unsure'].map(v => (
                    <button key={v} onClick={() => set('publicDisclosure', v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all capitalize ${data.publicDisclosure === v ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {v === 'no' ? 'No — not yet' : v === 'yes' ? 'Yes (provide details)' : 'Not sure'}
                    </button>
                  ))}
                </div>
                {data.publicDisclosure === 'yes' && (
                  <textarea rows={2} placeholder="Provide details: where, when, and how was it disclosed?" value={data.priorArtKnown} onChange={e => set('priorArtKnown', e.target.value)}
                    className="mt-3 w-full border border-amber-200 bg-amber-50 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 resize-none" />
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Target Countries for Protection</label>
                <div className="flex flex-wrap gap-2">
                  {COUNTRIES.map(c => (
                    <button key={c} onClick={() => toggleCountry(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${data.targetCountries.includes(c) ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Applicant Details */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Applicant & Inventor Information</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Applicant Type</label>
                <div className="flex flex-wrap gap-2">
                  {[['individual', 'Individual / Natural Person'], ['startup', 'Startup (DPIIT Recognized)'], ['sme', 'Small Entity / MSME'], ['company', 'Company / Corporation'], ['university', 'University / Research Institution']].map(([v, l]) => (
                    <button key={v} onClick={() => set('applicantType', v)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${data.applicantType === v ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                {['startup', 'sme', 'individual'].includes(data.applicantType) && (
                  <p className="text-green-700 text-xs bg-green-50 border border-green-100 rounded-lg px-3 py-2 mt-2">
                    ✅ Your applicant type may be eligible for reduced government filing fees (up to 80% concession).
                  </p>
                )}
              </div>
              {[
                { key: 'applicantName', label: 'Full Name / Organization Name', ph: 'Dr. Arjun Mehta or BioTechX Pvt. Ltd.' },
                { key: 'applicantEmail', label: 'Email Address', ph: 'arjun@company.com' },
                { key: 'applicantPhone', label: 'Phone / WhatsApp', ph: '+91 98765 43210' },
                { key: 'applicantAddress', label: 'Full Address', ph: 'Street, City, State, PIN' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                  <input type="text" placeholder={f.ph} value={(data as any)[f.key]} onChange={e => set(f.key as any, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              ))}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input type="checkbox" id="inventorSame" checked={data.inventorSame} onChange={e => set('inventorSame', e.target.checked)} className="w-4 h-4 accent-navy-900" />
                <label htmlFor="inventorSame" className="text-sm text-navy-800 font-medium cursor-pointer">The applicant is also the inventor (or lead inventor)</label>
              </div>
              {!data.inventorSame && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Lead Inventor Name</label>
                  <input type="text" placeholder="Inventor's full name" value={data.inventorName} onChange={e => set('inventorName', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Disclosure */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Disclosure & Claim Information</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 leading-relaxed">
                <strong className="block mb-1">Why this matters</strong>
                The more detail you provide, the better our team can assess patentability and draft a strong specification. All information remains strictly confidential.
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Prior Art Known to You</label>
                <textarea rows={3} placeholder="List any existing patents, products, or publications you are aware of that are similar to your invention…"
                  value={data.priorArtKnown} onChange={e => set('priorArtKnown', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 resize-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Key Claims / Features to Protect</label>
                <textarea rows={4} placeholder="Describe the key features or aspects you would like the patent to cover. You can use bullet points."
                  value={data.noveltyAspects} onChange={e => set('noveltyAspects', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 resize-none transition-colors" />
              </div>
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                <strong>Important:</strong> Suvidha IPR Services provides professional drafting assistance. Patent claims will be finalized by our registered patent agent and reviewed with you before filing. We do not guarantee patent grant.
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Upload Supporting Documents</h2>
              <p className="text-gray-500 text-sm">Upload any existing technical documentation, drawings, prototypes, or references. All uploads are encrypted and stored securely.</p>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-navy-300 transition-colors">
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1 font-medium">Drop files here or</p>
                <button onClick={handleFileAdd} className="text-sm text-navy-700 font-semibold hover:text-gold-600 underline transition-colors">browse to upload</button>
                <p className="text-xs text-gray-400 mt-2">PDF, DOCX, JPG, PNG, ZIP — max 20 MB per file</p>
              </div>
              {data.files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Uploaded Files</p>
                  {data.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <FileText className="w-4 h-4 text-navy-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-navy-900 font-medium truncate">{f.name}</div>
                        <div className="text-xs text-gray-400">{f.size}</div>
                      </div>
                      <button onClick={() => set('files', data.files.filter((_, j) => j !== i))} className="text-gray-300 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-400 bg-gray-50 rounded-xl p-4 leading-relaxed">
                <strong className="text-gray-600">Optional documents:</strong> Invention disclosure form, technical drawings, prototype photos, research papers, market analysis. Our team will request additional documents during the review phase.
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Review & Submit</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Service', PATENT_SERVICES.find(s => s.id === data.service)?.label || '—'],
                  ['Invention Title', data.inventionTitle || '—'],
                  ['Technical Field', data.inventionField || '—'],
                  ['Applicant', data.applicantName || '—'],
                  ['Email', data.applicantEmail || '—'],
                  ['Phone', data.applicantPhone || '—'],
                  ['Countries', data.targetCountries.join(', ') || '—'],
                  ['Documents', data.files.length ? `${data.files.length} file(s)` : 'None uploaded'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4 py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium min-w-[130px] text-xs uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>{k}</span>
                    <span className="text-navy-900">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900 leading-relaxed">
                <strong className="block mb-2">Important Disclaimer</strong>
                Suvidha IPR Services provides professional patent filing <em>assistance</em> only. We do not practice law and are not a law firm unless stated otherwise. Government statutory fees are charged separately from our professional service fees. Patent grant is subject to examination by the Indian Patent Office and is not guaranteed.
              </div>
              <div className="space-y-3">
                {[
                  { key: 'agreeDisclaimer', label: 'I have read and understood the above disclaimer regarding professional fees, government fees, and that patent grant is not guaranteed.' },
                  { key: 'agreeConfidentiality', label: 'I consent to Suvidha IPR Services storing my invention information securely for the purpose of this enquiry.' },
                ].map(c => (
                  <label key={c.key} className="flex gap-3 cursor-pointer items-start p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" checked={(data as any)[c.key]} onChange={e => set(c.key as any, e.target.checked)} className="w-4 h-4 mt-0.5 accent-navy-900 flex-shrink-0" />
                    <span className="text-sm text-navy-800">{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={next} disabled={step === 0 && !data.service}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: '#c8a84b', color: '#0b1c3d' }}>
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!data.agreeDisclaimer || !data.agreeConfidentiality}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold bg-navy-900 text-white hover:bg-navy-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Enquiry <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
