import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  LayoutDashboard, Users, Briefcase, FileText, Bell, BarChart3,
  LogOut, Search, Filter, ChevronDown, X, Plus, CheckCircle2,
  Clock, AlertTriangle, Upload, Download, Send, Shield
} from 'lucide-react'
import { getSession, clearSession } from '../../lib/auth'
import { getCases, updateCaseStatus, STATUS_LABELS, STATUS_COLORS, type IPCase, type CaseStatus } from '../../lib/cases'

const ALL_STATUSES: CaseStatus[] = ['submitted', 'under_review', 'search_in_progress', 'drafting', 'client_review', 'filing_coordination', 'filed', 'granted', 'rejected']

function AdminSidebar({ active, setActive, session, logout }: any) {
  const nav = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'cases', label: 'Case Management', icon: Briefcase },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ]
  return (
    <aside className="w-60 bg-navy-950 flex flex-col min-h-screen border-r border-navy-800">
      <div className="p-5 border-b border-navy-800 flex items-center gap-2.5">
        <Shield className="w-5 h-5 text-gold-400" />
        <span className="text-white font-bold text-sm">Admin Panel</span>
      </div>
      <div className="p-4 border-b border-navy-800">
        <Link to="/"><img src="/suvidha-logo.png" alt="Suvidha IPR" className="h-7 w-auto object-contain mb-3" /></Link>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-xs">
            {session?.name?.[0] ?? 'A'}
          </div>
          <div>
            <p className="text-white text-xs font-semibold truncate">{session?.name}</p>
            <p className="text-gold-400/60 text-[10px]" style={{ fontFamily: 'DM Mono, monospace' }}>ADMINISTRATOR</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${active === n.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <n.icon className="w-4 h-4" />{n.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-navy-800">
        <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-white/30 hover:text-white hover:bg-white/5 text-xs transition-all">
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  )
}

function StatCard({ label, value, delta, color }: { label: string; value: string | number; delta?: string; color: string }) {
  return (
    <div className={`rounded-2xl p-5 ${color}`}>
      <p className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>{value}</p>
      <p className="text-xs font-medium mt-1 opacity-70">{label}</p>
      {delta && <p className="text-xs mt-2 opacity-60">{delta}</p>}
    </div>
  )
}

function CaseRow({ c, onSelect, onStatusChange }: { c: IPCase; onSelect: () => void; onStatusChange: (id: string, s: CaseStatus) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors grid grid-cols-12 items-center gap-3 group">
      <div className="col-span-1 text-xs text-gray-400 font-mono">{c.id.split('-').pop()}</div>
      <div className="col-span-4 min-w-0">
        <button onClick={onSelect} className="text-sm text-navy-900 font-semibold text-left hover:text-gold-700 transition-colors leading-snug truncate block w-full">{c.title}</button>
        <p className="text-xs text-gray-400">{c.clientName} · {c.type === 'patent' ? '🔬' : '©️'} {c.type}</p>
      </div>
      <div className="col-span-2">
        <div className="relative">
          <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_COLORS[c.status]}`}>
            {STATUS_LABELS[c.status]} <ChevronDown className="w-3 h-3" />
          </button>
          {open && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1 w-44">
              {ALL_STATUSES.map(s => (
                <button key={s} onClick={() => { onStatusChange(c.id, s); setOpen(false) }}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 font-medium transition-colors">
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2 text-xs text-gray-500">{c.assignedTo.split(' ').slice(0, 2).join(' ')}</div>
      <div className="col-span-2 text-xs text-gray-400">{c.updatedAt}</div>
      <div className="col-span-1 flex items-center justify-end">
        {c.pendingActions.length > 0 && (
          <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center">{c.pendingActions.length}</span>
        )}
      </div>
    </div>
  )
}

function CaseDetailAdmin({ c, onClose, onStatusChange }: { c: IPCase; onClose: () => void; onStatusChange: (id: string, s: CaseStatus) => void }) {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([{ text: c.notes, time: c.updatedAt, by: 'System' }])
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-2xl bg-white h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <p className="font-bold text-navy-900 text-sm">{c.id}</p>
            <p className="text-xs text-gray-500 truncate">{c.title}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Status change */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Update Status</p>
            <div className="flex flex-wrap gap-2">
              {ALL_STATUSES.map(s => (
                <button key={s} onClick={() => onStatusChange(c.id, s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${c.status === s ? 'bg-navy-900 text-white border-navy-900' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Client', c.clientName], ['Type', c.type], ['Assigned To', c.assignedTo],
              ['Created', c.createdAt], ['Last Updated', c.updatedAt],
              ['Application No.', c.applicationNumber || 'Pending'],
              ['Deadline', c.deadline || '—'],
            ].map(([k, v]) => (
              <div key={k} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>{k}</p>
                <p className="text-sm text-navy-900 font-medium">{v}</p>
              </div>
            ))}
          </div>

          {/* Pending Actions */}
          {c.pendingActions.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'DM Mono, monospace' }}>Pending Client Actions</p>
              <div className="space-y-2">
                {c.pendingActions.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-orange-50 rounded-xl border border-orange-100 text-sm text-orange-800">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />{a}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>Case Timeline</p>
            <div className="space-y-3">
              {c.timeline.map((ev, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${ev.done ? 'bg-green-500' : 'bg-gray-100'}`}>
                    {ev.done ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <Clock className="w-3 h-3 text-gray-400" />}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${ev.done ? 'text-navy-900' : 'text-gray-400'}`}>{ev.label}</p>
                    {ev.date && <p className="text-xs text-gray-400">{ev.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>Documents</p>
            {c.documents.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 mb-2">
                <FileText className="w-4 h-4 text-navy-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-navy-900 font-medium truncate">{d.name}</p>
                  <p className="text-xs text-gray-400">{d.uploadedBy} · {d.date} · {d.size}</p>
                </div>
                <button className="text-navy-700 hover:text-gold-600 transition-colors"><Download className="w-4 h-4" /></button>
              </div>
            ))}
            <button className="flex items-center gap-2 text-sm text-navy-700 hover:text-gold-600 font-medium transition-colors mt-1">
              <Upload className="w-4 h-4" /> Upload Document
            </button>
          </div>

          {/* Admin Notes */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3" style={{ fontFamily: 'DM Mono, monospace' }}>Admin Notes</p>
            <div className="space-y-2 mb-3">
              {notes.map((n, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-sm text-navy-800">{n.text}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.by} · {n.time}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add a note…"
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-colors" />
              <button onClick={() => { if (note) { setNotes(n => [...n, { text: note, time: 'Just now', by: 'Admin' }]); setNote('') } }}
                className="px-4 py-2 bg-navy-900 text-white text-xs font-bold rounded-xl hover:bg-navy-800 transition-colors">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const MOCK_USERS = [
  { id: 'u1', name: 'Arjun Mehta', email: 'client@suvidha.com', cases: 2, joined: '2026-03-10', status: 'active' },
  { id: 'u2', name: 'Priya Nair', email: 'priya@startup.com', cases: 1, joined: '2026-06-01', status: 'active' },
  { id: 'u3', name: 'Rajan Mehta', email: 'rajan@startuplab.in', cases: 0, joined: '2026-07-15', status: 'pending' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const session = getSession()
  const [active, setActive] = useState('overview')
  const [cases, setCases] = useState(getCases())
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'patent' | 'copyright'>('all')
  const [selectedCase, setSelectedCase] = useState<IPCase | null>(null)

  useEffect(() => {
    if (!session || session.role !== 'admin') navigate('/login')
  }, [])

  const logout = () => { clearSession(); navigate('/login') }

  const handleStatusChange = (id: string, s: CaseStatus) => {
    updateCaseStatus(id, s)
    setCases(getCases())
    if (selectedCase?.id === id) {
      setSelectedCase(prev => prev ? { ...prev, status: s } : null)
    }
  }

  const filtered = cases.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.clientName.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search)
    const matchType = filterType === 'all' || c.type === filterType
    return matchSearch && matchType
  })

  if (!session || session.role !== 'admin') return null

  const activeCases = cases.filter(c => !['granted', 'rejected'].includes(c.status)).length
  const pendingActions = cases.reduce((a, c) => a + c.pendingActions.length, 0)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:block">
        <AdminSidebar active={active} setActive={setActive} session={session} logout={logout} />
      </div>

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {/* Mobile bar */}
        <div className="lg:hidden flex items-center justify-between mb-5">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-navy-700" /><span className="text-sm font-bold text-navy-900">Admin</span></div>
          <button onClick={logout} className="text-xs text-gray-500 flex items-center gap-1"><LogOut className="w-3.5 h-3.5" /> Logout</button>
        </div>
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-5" style={{ scrollbarWidth: 'none' }}>
          {[['overview', 'Overview'], ['cases', 'Cases'], ['users', 'Users'], ['reports', 'Reports']].map(([id, l]) => (
            <button key={id} onClick={() => setActive(id)} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold ${active === id ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{l}</button>
          ))}
        </div>

        {/* Overview */}
        {active === 'overview' && (
          <div>
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Admin Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Suvidha IPR Services — Case Management</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Cases" value={cases.length} color="bg-navy-50 text-navy-700" />
              <StatCard label="Active Cases" value={activeCases} color="bg-blue-50 text-blue-700" />
              <StatCard label="Pending Actions" value={pendingActions} color="bg-orange-50 text-orange-700" />
              <StatCard label="Registered Clients" value={MOCK_USERS.length} color="bg-green-50 text-green-700" />
            </div>

            {/* Recent Cases */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
              <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                <h3 className="font-bold text-navy-900 text-sm">Recent Cases</h3>
                <button onClick={() => setActive('cases')} className="text-xs text-gold-600 font-semibold">View All →</button>
              </div>
              <div className="px-5 py-3 border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider grid grid-cols-12 gap-3" style={{ fontFamily: 'DM Mono, monospace' }}>
                <span className="col-span-1">#</span><span className="col-span-4">Case</span><span className="col-span-2">Status</span>
                <span className="col-span-2">Assigned</span><span className="col-span-2">Updated</span><span className="col-span-1">!</span>
              </div>
              {cases.slice(0, 5).map(c => (
                <CaseRow key={c.id} c={c} onSelect={() => setSelectedCase(c)} onStatusChange={handleStatusChange} />
              ))}
            </div>

            {/* Deadline alerts */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 text-sm mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {cases.filter(c => c.deadline).map(c => (
                  <div key={c.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                    <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-navy-900 font-medium">{c.title}</p>
                      <p className="text-xs text-gray-500">{c.id} · Deadline: <strong className="text-red-600">{c.deadline}</strong></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cases tab */}
        {active === 'cases' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Case Management</h1>
              <Link to="/patent-enquiry" className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold" style={{ background: '#c8a84b', color: '#0b1c3d' }}>
                <Plus className="w-3.5 h-3.5" /> New Enquiry
              </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-5 flex-wrap">
              <div className="flex-1 min-w-48 relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search cases, clients…"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-navy-400 transition-colors bg-white" />
              </div>
              <div className="flex gap-2">
                {(['all', 'patent', 'copyright'] as const).map(t => (
                  <button key={t} onClick={() => setFilterType(t)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${filterType === t ? 'bg-navy-900 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                    {t === 'all' ? 'All' : t === 'patent' ? '🔬 Patent' : '©️ Copyright'}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider grid grid-cols-12 gap-3" style={{ fontFamily: 'DM Mono, monospace' }}>
                <span className="col-span-1">#</span><span className="col-span-4">Case / Client</span><span className="col-span-2">Status</span>
                <span className="col-span-2">Assigned</span><span className="col-span-2">Updated</span><span className="col-span-1">!</span>
              </div>
              {filtered.length === 0
                ? <div className="text-center py-16 text-gray-400 text-sm">No cases match your search.</div>
                : filtered.map(c => <CaseRow key={c.id} c={c} onSelect={() => setSelectedCase(c)} onStatusChange={handleStatusChange} />)}
            </div>
            <p className="text-xs text-gray-400 mt-3">{filtered.length} case{filtered.length !== 1 ? 's' : ''} shown</p>
          </div>
        )}

        {/* Users tab */}
        {active === 'users' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Users</h1>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-50 text-[10px] text-gray-400 uppercase tracking-wider grid grid-cols-5 gap-3" style={{ fontFamily: 'DM Mono, monospace' }}>
                <span className="col-span-2">User</span><span>Cases</span><span>Joined</span><span>Status</span>
              </div>
              {MOCK_USERS.map(u => (
                <div key={u.id} className="px-5 py-4 border-b border-gray-50 grid grid-cols-5 items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-sm">{u.name[0]}</div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-navy-700 font-medium">{u.cases}</span>
                  <span className="text-xs text-gray-400">{u.joined}</span>
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reports tab */}
        {active === 'reports' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Reports</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Case Status Summary', rows: ALL_STATUSES.filter(s => cases.some(c => c.status === s)).map(s => ({ label: STATUS_LABELS[s], value: cases.filter(c => c.status === s).length })) },
                { title: 'Cases by Type', rows: [{ label: '🔬 Patent', value: cases.filter(c => c.type === 'patent').length }, { label: '©️ Copyright', value: cases.filter(c => c.type === 'copyright').length }] },
              ].map(r => (
                <div key={r.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="font-bold text-navy-900 mb-4 text-sm">{r.title}</h3>
                  <div className="space-y-3">
                    {r.rows.map(row => (
                      <div key={row.label} className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 min-w-[140px]">{row.label}</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-navy-700" style={{ width: `${(row.value / cases.length) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-navy-900 min-w-[20px] text-right">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 md:col-span-2">
                <h3 className="font-bold text-navy-900 mb-4 text-sm">Audit Log</h3>
                <div className="space-y-2 text-xs text-gray-500">
                  {[
                    { action: 'Status updated: SIP-2026-0041 → Drafting', time: '2026-07-15 14:22', by: 'Admin' },
                    { action: 'Document uploaded: Prior_Art_Search_Report.pdf to SIP-2026-0041', time: '2026-04-20 11:15', by: 'Dr. R.N. Sharma' },
                    { action: 'Case filed: SCR-2026-0039 application submitted to Copyright Office', time: '2026-05-20 16:30', by: 'Mrs. Meera Sharma' },
                    { action: 'New enquiry received: SIP-2026-0055 from Priya Nair', time: '2026-06-01 09:00', by: 'System' },
                  ].map((l, i) => (
                    <div key={i} className="flex gap-3 py-2 border-b border-gray-50">
                      <span className="text-gray-300 flex-shrink-0" style={{ fontFamily: 'DM Mono, monospace' }}>{l.time}</span>
                      <span className="flex-1">{l.action}</span>
                      <span className="text-gray-400 flex-shrink-0">{l.by}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {active === 'notifications' && (
          <div>
            <h1 className="text-2xl font-bold text-navy-900 mb-6" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>Notifications</h1>
            <div className="space-y-3">
              {[
                { icon: '⚠️', title: 'Deadline Alert: SIP-2026-0041', body: 'Complete specification for Smart Irrigation patent must be filed by 1 October 2026.', time: 'Today', urgent: true },
                { icon: '⚠️', title: 'Deadline Alert: SIP-2026-0055', body: 'Technical drawings awaited from client Priya Nair. Deadline: 30 September 2026.', time: 'Today', urgent: true },
                { icon: '📬', title: 'New Enquiry Received', body: 'New patent enquiry from Rajan Mehta awaiting initial review assignment.', time: 'Jul 20, 2026', urgent: false },
                { icon: '✅', title: 'Copyright Filed: SCR-2026-0039', body: 'AgriSense software copyright filed successfully. Diary number SW-2026-8821 issued.', time: 'May 20, 2026', urgent: false },
              ].map((n, i) => (
                <div key={i} className={`flex gap-4 p-5 rounded-2xl border ${n.urgent ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
                  <span className="text-2xl flex-shrink-0">{n.icon}</span>
                  <div>
                    <p className={`text-sm font-bold ${n.urgent ? 'text-red-900' : 'text-navy-900'}`}>{n.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{n.body}</p>
                    <p className="text-xs text-gray-400 mt-2">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {selectedCase && <CaseDetailAdmin c={selectedCase} onClose={() => setSelectedCase(null)} onStatusChange={handleStatusChange} />}
    </div>
  )
}
