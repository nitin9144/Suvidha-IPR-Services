import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { CheckCircle2, Upload, ArrowLeft, ArrowRight, X, FileText } from 'lucide-react'

const STEPS = ['Work Category', 'Work Information', 'Author / Applicant', 'Document Upload', 'Review & Submit']

type UploadedFile = { name: string; size: string }

interface FormData {
  workCategory: string
  workTitle: string
  workDescription: string
  yearCreated: string
  firstPublished: boolean
  publicationDate: string
  authorName: string
  authorType: string
  authorEmail: string
  authorPhone: string
  authorAddress: string
  applicantSameAsAuthor: boolean
  applicantName: string
  files: UploadedFile[]
  agreeDisclaimer: boolean
  agreeConfidentiality: boolean
}

const CATEGORIES = [
  { id: 'software', label: 'Software / Computer Program', icon: '💻', desc: 'Source code, executable programs, apps.' },
  { id: 'literary', label: 'Literary Work', icon: '📖', desc: 'Books, articles, research papers, manuals.' },
  { id: 'artistic', label: 'Artistic Work', icon: '🎨', desc: 'Paintings, drawings, photographs, graphics.' },
  { id: 'musical', label: 'Musical Work', icon: '🎵', desc: 'Songs, compositions, musical scores.' },
  { id: 'dramatic', label: 'Dramatic Work', icon: '🎭', desc: 'Scripts, screenplays, plays.' },
  { id: 'cinematograph', label: 'Cinematograph / Video', icon: '🎬', desc: 'Films, videos, animations.' },
  { id: 'sound', label: 'Sound Recording', icon: '🎧', desc: 'Audio recordings, podcasts.' },
  { id: 'educational', label: 'Educational Content', icon: '🎓', desc: 'Course material, e-learning content.' },
]

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-12 px-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < current ? 'bg-green-500 text-white' : i === current ? 'bg-navy-900 text-white ring-4 ring-navy-900/20' : 'bg-gray-100 text-gray-400'}`}>
              {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-[9px] uppercase tracking-wider font-medium text-center leading-tight max-w-[55px] hidden md:block ${i === current ? 'text-navy-900' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < current ? 'bg-green-400' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  )
}

export default function CopyrightEnquiry() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [data, setData] = useState<FormData>({
    workCategory: '',
    workTitle: '',
    workDescription: '',
    yearCreated: '',
    firstPublished: false,
    publicationDate: '',
    authorName: '',
    authorType: 'individual',
    authorEmail: '',
    authorPhone: '',
    authorAddress: '',
    applicantSameAsAuthor: true,
    applicantName: '',
    files: [],
    agreeDisclaimer: false,
    agreeConfidentiality: false,
  })

  const set = (key: keyof FormData, val: any) => setData(d => ({ ...d, [key]: val }))
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))
  const handleFileAdd = () => {
    const fake: UploadedFile[] = [{ name: 'Work_Sample.pdf', size: '2.1 MB' }, { name: 'Source_Code.zip', size: '5.4 MB' }]
    set('files', [...data.files, fake[data.files.length % 2]])
  }
  const handleSubmit = () => setSubmitted(true)

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 pt-20">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Enquiry Submitted!</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Your copyright enquiry has been received. Our team will review and contact you within <strong>1–2 business days</strong>.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-8 text-xs text-amber-800">
            <strong className="block mb-1">Reference ID: SCR-2026-{Math.floor(Math.random() * 9000) + 1000}</strong>
            Please save this reference. Client Dashboard credentials will be shared after initial review.
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
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <p className="text-gold-600 text-xs font-semibold uppercase tracking-widest mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Copyright Services</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Copyright Enquiry Form</h1>
          <p className="text-gray-500 text-sm mt-2">Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>
        </div>
        <StepIndicator current={step} />

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">

          {/* Step 0: Work Category */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>What type of work do you want to protect?</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => set('workCategory', c.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${data.workCategory === c.id ? 'border-navy-900 bg-navy-50' : 'border-gray-100 hover:border-navy-200'}`}>
                    <div className="text-2xl mb-2">{c.icon}</div>
                    <div className="font-semibold text-navy-900 text-sm mb-1">{c.label}</div>
                    <div className="text-gray-500 text-xs">{c.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700">
                <strong>Note:</strong> Copyright subsists automatically in original works. Registration is not mandatory but provides important legal advantages including a public record and prima facie evidence in disputes.
              </div>
            </div>
          )}

          {/* Step 1: Work Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Tell us about your work</h2>
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3">🔒 All information is kept strictly confidential.</p>
              {[
                { key: 'workTitle', label: 'Title of the Work', ph: 'e.g. "AgriSense — Smart Irrigation App" or "The Silent Valley"' },
                { key: 'yearCreated', label: 'Year of Creation', ph: 'e.g. 2025' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                  <input type="text" placeholder={f.ph} value={(data as any)[f.key]} onChange={e => set(f.key as any, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Brief Description of the Work</label>
                <textarea rows={4} placeholder="Describe your work — its nature, purpose, and what makes it original…"
                  value={data.workDescription} onChange={e => set('workDescription', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 resize-none transition-colors" />
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input type="checkbox" id="published" checked={data.firstPublished} onChange={e => set('firstPublished', e.target.checked)} className="w-4 h-4 accent-navy-900" />
                <label htmlFor="published" className="text-sm text-navy-800 font-medium cursor-pointer">This work has already been published / made public</label>
              </div>
              {data.firstPublished && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Publication Date</label>
                  <input type="date" value={data.publicationDate} onChange={e => set('publicationDate', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Author / Applicant */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Author & Applicant Information</h2>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Author Type</label>
                <div className="flex flex-wrap gap-2">
                  {[['individual', 'Individual Author'], ['joint', 'Joint Authors'], ['company', 'Company / Work for Hire'], ['university', 'University / Institution']].map(([v, l]) => (
                    <button key={v} onClick={() => set('authorType', v)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${data.authorType === v ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>{l}</button>
                  ))}
                </div>
              </div>
              {[
                { key: 'authorName', label: 'Author Name', ph: 'Full name of author(s)' },
                { key: 'authorEmail', label: 'Email Address', ph: 'author@example.com' },
                { key: 'authorPhone', label: 'Phone / WhatsApp', ph: '+91 98765 43210' },
                { key: 'authorAddress', label: 'Address', ph: 'Street, City, State, PIN' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.label}</label>
                  <input type="text" placeholder={f.ph} value={(data as any)[f.key]} onChange={e => set(f.key as any, e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              ))}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input type="checkbox" id="sameApplicant" checked={data.applicantSameAsAuthor} onChange={e => set('applicantSameAsAuthor', e.target.checked)} className="w-4 h-4 accent-navy-900" />
                <label htmlFor="sameApplicant" className="text-sm text-navy-800 font-medium cursor-pointer">The applicant (person filing) is the same as the author</label>
              </div>
              {!data.applicantSameAsAuthor && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5" style={{ fontFamily: 'DM Mono, monospace' }}>Applicant Name</label>
                  <input type="text" placeholder="Name of the person or entity applying for registration" value={data.applicantName} onChange={e => set('applicantName', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-navy-900 placeholder-gray-300 focus:outline-none focus:border-navy-400 transition-colors" />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Upload Your Work Sample</h2>
              <p className="text-gray-500 text-sm">Upload a copy or sample of your work. For software, a portion of the source code suffices. All files are encrypted.</p>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-navy-300 transition-colors">
                <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-1 font-medium">Drop files here or</p>
                <button onClick={handleFileAdd} className="text-sm text-navy-700 font-semibold hover:text-gold-600 underline transition-colors">browse to upload</button>
                <p className="text-xs text-gray-400 mt-2">PDF, DOCX, MP3, MP4, ZIP, JPG — max 50 MB per file</p>
              </div>
              {data.files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>Uploaded</p>
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
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold text-navy-900 mb-2" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Review & Submit</h2>
              <div className="space-y-3 text-sm">
                {[
                  ['Work Category', CATEGORIES.find(c => c.id === data.workCategory)?.label || '—'],
                  ['Work Title', data.workTitle || '—'],
                  ['Year of Creation', data.yearCreated || '—'],
                  ['Author', data.authorName || '—'],
                  ['Email', data.authorEmail || '—'],
                  ['Documents', data.files.length ? `${data.files.length} file(s)` : 'None'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4 py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium min-w-[130px] text-xs uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>{k}</span>
                    <span className="text-navy-900">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900 leading-relaxed">
                <strong className="block mb-2">Important Disclaimer</strong>
                Suvidha IPR Services provides professional copyright application <em>assistance</em> only. Copyright registration decisions rest solely with the Copyright Office of India. Government statutory fees (currently ₹500 per work) are charged separately. We do not guarantee registration.
              </div>
              <div className="space-y-3">
                {[
                  { key: 'agreeDisclaimer', label: 'I have read and understood the disclaimer regarding professional fees, government fees, and that registration is not guaranteed.' },
                  { key: 'agreeConfidentiality', label: 'I consent to Suvidha IPR Services storing my work information securely for the purpose of this enquiry.' },
                ].map(c => (
                  <label key={c.key} className="flex gap-3 cursor-pointer items-start p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <input type="checkbox" checked={(data as any)[c.key]} onChange={e => set(c.key as any, e.target.checked)} className="w-4 h-4 mt-0.5 accent-navy-900 flex-shrink-0" />
                    <span className="text-sm text-navy-800">{c.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button onClick={back} className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={next} disabled={step === 0 && !data.workCategory}
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
