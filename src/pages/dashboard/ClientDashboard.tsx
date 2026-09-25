import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  LayoutDashboard, FileText, Upload, Download, Bell, CreditCard,
  MessageSquare, LogOut, ChevronRight, CheckCircle2, Clock, AlertCircle,
  X, Send, Plus
} from 'lucide-react'
import { getSession, clearSession } from '../../lib/auth'
import { getCasesForClient, STATUS_LABELS, STATUS_COLORS, type IPCase } from '../../lib/cases'

function Sidebar({ active, setActive, session, logout }: { active: string; setActive: (s: string) => void; session: any; logout: () => void }) {
  const nav = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'cases', label: 'My Cases', icon: FileText },
    { id: 'documents', label: 'Documents', icon: Upload },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ]
  return (
    <aside className="w-60 bg-navy-900 flex flex-col min-h-screen">
      <div className="p-5 border-b border-navy-800">
        <Link to="/"><img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-8 w-auto object-contain" /></Link>
      </div>
      <div className="p-4 border-b border-navy-800">
        <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-sm mb-2">
          {session?.name?.[0] ?? 'C'}
        </div>
        <p className="text-white text-sm font-semibold truncate">{session?.name}</p>
        <p className="text-white/40 text-xs truncate">{session?.email}</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all ${active === n.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
            <n.icon className="w-4 h-4" />{n.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-navy-800">
        <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-white/40 hover:text-white hover:bg-white/5 text-sm transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  )
}

function CaseCard({ c, onClick }: { c: IPCase; onClick: () => void }) {
  const progress = c.timeline.filter(t => t.done).length / c.timeline.length * 100
  return (
    <button onClick={onClick} className="w-full text-left bg-white rounded-2xl border border-gray-100 p-5 hover:border-gold-200 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="font-bold text-navy-900 text-sm group-hover:text-navy-700 transition-colors leading-snug">{c.title}</p>
          <p className="text-gray-400 text-xs mt-1" style={{ fontFamily: 'DM Mono, monospace' }}>{c.id}</p>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex-shrink-0 ${STATUS_COLORS[c.status]}`}>{STATUS_LABELS[c.status]}</span>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
        <span>{c.type === 'patent' ? '🔬 Patent' : '©️ Copyright'}</span>
        <span>Assigned: {c.assignedTo}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
        <span>{Math.round(progress)}% complete</span>
        {c.deadline && <span>Deadline: {c.deadline}</span>}
      </div>
      {c.pendingActions.length > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-orange-600 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          {c.pendingActions.length} pending action{c.pendingActions.length > 1 ? 's' : ''}
        </div>
      )}
    </button>
  )
}

function CaseDetail({ c, onClose }: { c: IPCase; onClose: () => void }) {
  const [tab, setTab] = useState<'timeline' | 'documents' | 'payments'>('timeline')
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-bold text-navy-900 text-sm">{c.title}</p>
            <p className="text-xs text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>{c.id}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {/* Status + info */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { l: 'Status', v: STATUS_LABELS[c.status] },
              { l: 'Type', v: c.type === 'patent' ? '🔬 Patent' : '©️ Copyright' },
              { l: 'Assigned To', v: c.assignedTo },
              { l: 'Filed On', v: c.createdAt },
              { l: 'Last Updated', v: c.updatedAt },
              { l: 'Application No.', v: c.applicationNumber || 'Pending' },
            ].map(i => (
              <div key={i.l} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>{i.l}</p>
                <p className="text-sm text-navy-900 font-medium">{i.v}</p>
              </div>
            ))}
          </div>

          {/* Pending actions */}
          {c.pendingActions.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Action Required</p>
              {c.pendingActions.map((a, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-orange-800 mt-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />{a}
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-5 border-b border-gray-100 pb-2">
            {(['timeline', 'documents', 'payments'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all capitalize ${tab === t ? 'bg-navy-900 text-white' : 'text-gray-500 hover:text-navy-700'}`}>
                {t}
              </button>
            ))}
          </div>

          {tab === 'timeline' && (
            <div className="space-y-4">
              {c.timeline.map((ev, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${ev.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                    {ev.done ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Clock className="w-3.5 h-3.5 text-gray-400" />}
                  </div>
                  <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                    <p className={`text-sm font-medium ${ev.done ? 'text-navy-900' : 'text-gray-400'}`}>{ev.label}</p>
                    {ev.date && <p className="text-xs text-gray-400 mt-0.5">{ev.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'documents' && (
            <div className="space-y-3">
              {c.documents.map(d => (
                <div key={d.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <FileText className="w-5 h-5 text-navy-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-navy-900 font-medium truncate">{d.name}</p>
                    <p className="text-xs text-gray-400">{d.uploadedBy} · {d.date} · {d.size}</p>
                  </div>
                  <button className="flex items-center gap-1 text-xs text-navy-700 hover:text-gold-600 font-medium transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              ))}
              <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-navy-300 hover:text-navy-700 transition-all">
                <Upload className="w-4 h-4" /> Upload Document
              </button>
            </div>
          )}

          {tab === 'payments' && (
            <div className="space-y-3">
              {c.fees.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm text-navy-900 font-medium">{f.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{f.paid ? 'Paid' : 'Outstanding'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-navy-900 text-sm">{f.amount}</span>
                    {f.paid
                      ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">PAID</span>
                      : <button className="px-3 py-1 bg-navy-900 text-white text-xs font-bold rounded-full hover:bg-navy-800 transition-colors">Pay</button>}
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 p-3 bg-amber-50 rounded-xl border border-amber-100">
                Government statutory fees are charged separately and may vary. All fee breakdowns will be communicated transparently before payment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ClientDashboard() {
  const navigate = useNavigate()
  const session = getSession()
  const [active, setActive] = useState('overview')
  const [selectedCase, setSelectedCase] = useState<IPCase | null>(null)
  const [msgText, setMsgText] = useState('')
  const [messages, setMessages] = useState([
    { from: 'Suvidha Team', text: "Welcome! Your patent enquiry (SIP-2026-0041) has been received. We'll contact you within 1-2 business days.", time: '9:00 AM', mine: false },
    { from: 'Suvidha Team', text: 'The prior art search for your IoT irrigation patent is complete. Please review the search report in the Documents section.', time: '2:30 PM', mine: false },
  ])

  useEffect(() => {
    if (!session) navigate('/login')
  }, [])

  const cases = session ? getCasesForClient(session.id) : []

  const logout = () => { clearSession(); navigate('/login') }

  const sendMessage = () => {
    if (!msgText.trim()) return
    setMessages(m => [...m, { from: 'You', text: msgText, time: 'Just now', mine: true }])
    setMsgText('')
  }

  if (!session) return null

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <Sidebar active={active} setActive={setActive} session={session} logout={logout} />
      </div>

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link to="/"><img src="/suvidha-logo.png" alt="" className="h-8 w-auto" /></Link>
          <button onClick={logout} className="text-xs text-gray-500 flex items-center gap-1"><LogOut className="w-3.5 h-3.5" /> Logout</button>
        </div>

        {/* Mobile nav pills */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: 'none' }}>
          {[['overview', 'Overview'], ['cases', 'Cases'], ['documents', 'Docs'], ['payments', 'Payments'], ['messages', 'Messages']].map(([id, label]) => (
            <button key={id} onClick={() => setActive(id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${active === id ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {active === 'overview' && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Good morning, {session.name.split(' ')[0]} 👋</h1>
              <p className="text-gray-500 text-sm mt-1">Here's a summary of your IP cases.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Cases', value: cases.length, color: 'bg-navy-50 text-navy-700' },
                { label: 'Active Cases', value: cases.filter(c => !['granted', 'rejected'].includes(c.status)).length, color: 'bg-blue-50 text-blue-700' },
                { label: 'Pending Actions', value: cases.reduce((a, c) => a + c.pendingActions.length, 0), color: 'bg-orange-50 text-orange-700' },
                { label: 'Filed', value: cases.filter(c => ['filed', 'granted'].includes(c.status)).length, color: 'bg-green-50 text-green-700' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
                  <p className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{s.value}</p>
                  <p className="text-xs mt-1 font-medium opacity-70">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-bold text-navy-900">Your Cases</h2>
              <div className="flex gap-2">
                <Link to="/patent-enquiry" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>
                  <Plus className="w-3.5 h-3.5" /> New Patent
                </Link>
                <Link to="/copyright-enquiry" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-navy-100 text-navy-800">
                  <Plus className="w-3.5 h-3.5" /> New Copyright
                </Link>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cases.map(c => <CaseCard key={c.id} c={c} onClick={() => setSelectedCase(c)} />)}
            </div>
          </div>
        )}

        {/* Cases tab */}
        {active === 'cases' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>My Cases</h1>
              <div className="flex gap-2">
                <Link to="/patent-enquiry" className="px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>+ Patent</Link>
                <Link to="/copyright-enquiry" className="px-4 py-2 rounded-full text-xs font-semibold bg-navy-100 text-navy-800">+ Copyright</Link>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cases.map(c => <CaseCard key={c.id} c={c} onClick={() => setSelectedCase(c)} />)}
            </div>
          </div>
        )}

        {/* Documents tab */}
        {active === 'documents' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Documents</h1>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider grid grid-cols-4" style={{ fontFamily: 'DM Mono, monospace' }}>
                <span className="col-span-2">File</span><span>Case</span><span>Uploaded</span>
              </div>
              {cases.flatMap(c => c.documents.map(d => ({ ...d, caseId: c.id }))).map(d => (
                <div key={d.id} className="px-5 py-3.5 border-b border-gray-50 grid grid-cols-4 items-center hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-2.5 min-w-0">
                    <FileText className="w-4 h-4 text-navy-500 flex-shrink-0" />
                    <span className="text-sm text-navy-900 font-medium truncate">{d.name}</span>
                  </div>
                  <span className="text-xs text-gray-400" style={{ fontFamily: 'DM Mono, monospace' }}>{d.caseId}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{d.date}</span>
                    <button className="text-navy-700 hover:text-gold-600 transition-colors"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-navy-300 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500 font-medium">Upload a document</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX, ZIP — max 20 MB</p>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {active === 'notifications' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Notifications</h1>
            <div className="space-y-3">
              {[
                { icon: '📋', title: 'Draft Specification Ready for Review', body: 'The draft patent specification for "Smart Irrigation System" is ready. Please review and provide feedback by 30 July.', time: 'Today, 9:00 AM', unread: true },
                { icon: '⚡', title: 'Action Required: Inventor Declaration', body: 'Please sign and upload the inventor declaration form for case SIP-2026-0041.', time: 'Yesterday, 3:30 PM', unread: true },
                { icon: '✅', title: 'Copyright Filed Successfully', body: 'Your copyright application (SW-2026-8821) for AgriSense has been filed. Diary number received.', time: 'May 20, 2026', unread: false },
                { icon: '🔍', title: 'Prior Art Search Complete', body: 'The prior art search report for your IoT irrigation patent is available in the Documents section.', time: 'Apr 20, 2026', unread: false },
              ].map((n, i) => (
                <div key={i} className={`flex gap-4 p-5 rounded-2xl border transition-all ${n.unread ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'}`}>
                  <span className="text-2xl flex-shrink-0">{n.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${n.unread ? 'text-navy-900' : 'text-navy-700'}`}>{n.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{n.body}</p>
                    <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                  </div>
                  {n.unread && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments tab */}
        {active === 'payments' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Payments</h1>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-800">
              Professional fees (Suvidha's charges) and Government statutory fees are shown separately. Government fees vary by applicant type and are payable directly to the respective authority.
            </div>
            <div className="space-y-4">
              {cases.flatMap(c => c.fees.map(f => ({ ...f, caseId: c.id, caseTitle: c.title }))).map((f, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{f.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>{f.caseId} · {f.caseTitle.substring(0, 35)}…</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-navy-900">{f.amount}</span>
                    {f.paid
                      ? <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">PAID</span>
                      : <button className="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-full hover:bg-navy-800 transition-colors">Pay Now</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages tab */}
        {active === 'messages' && (
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <h1 className="text-2xl font-bold text-navy-900 mb-4" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Messages</h1>
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 flex flex-col overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
                <p className="text-sm font-semibold text-navy-900">Suvidha Team</p>
                <p className="text-xs text-green-500">● Online</p>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.mine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.mine ? 'bg-navy-900 text-white' : 'bg-gray-100 text-navy-900'}`}>
                      {!m.mine && <p className="text-[10px] font-bold text-gold-600 mb-1 uppercase tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>{m.from}</p>}
                      {m.text}
                      <p className={`text-[10px] mt-1.5 ${m.mine ? 'text-white/40' : 'text-gray-400'}`}>{m.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 flex gap-3">
                <input value={msgText} onChange={e => setMsgText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-colors" />
                <button onClick={sendMessage} className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center hover:bg-navy-800 transition-colors flex-shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedCase && <CaseDetail c={selectedCase} onClose={() => setSelectedCase(null)} />}
    </div>
  )
}
