export type CaseType = 'patent' | 'copyright'
export type CaseStatus =
  | 'submitted'
  | 'under_review'
  | 'search_in_progress'
  | 'drafting'
  | 'client_review'
  | 'filing_coordination'
  | 'filed'
  | 'granted'
  | 'rejected'

export interface CaseEvent {
  date: string
  label: string
  note?: string
  done: boolean
}

export interface CaseDoc {
  id: string
  name: string
  uploadedBy: string
  date: string
  size: string
}

export interface IPCase {
  id: string
  clientId: string
  clientName: string
  type: CaseType
  title: string
  status: CaseStatus
  assignedTo: string
  createdAt: string
  updatedAt: string
  applicationNumber?: string
  deadline?: string
  timeline: CaseEvent[]
  documents: CaseDoc[]
  pendingActions: string[]
  fees: { label: string; amount: string; paid: boolean }[]
  notes: string
}

const PATENT_TIMELINE: (status: CaseStatus) => CaseEvent[] = (status) => {
  const steps: [string, CaseStatus][] = [
    ['Enquiry Submitted', 'submitted'],
    ['Initial Review', 'under_review'],
    ['Prior Art / Novelty Search', 'search_in_progress'],
    ['Drafting Specification', 'drafting'],
    ['Client Review', 'client_review'],
    ['Filing Coordination', 'filing_coordination'],
    ['Application Filed', 'filed'],
    ['Grant / Decision', 'granted'],
  ]
  const order = steps.map(s => s[1])
  const currentIdx = order.indexOf(status)
  return steps.map(([label, s], i) => ({
    date: i <= currentIdx ? `2026-0${i + 1}-${(i + 1) * 3}` : '',
    label,
    done: i <= currentIdx,
  }))
}

const COPYRIGHT_TIMELINE: (status: CaseStatus) => CaseEvent[] = (status) => {
  const steps: [string, CaseStatus][] = [
    ['Enquiry Submitted', 'submitted'],
    ['Initial Review', 'under_review'],
    ['Application Preparation', 'drafting'],
    ['Client Review', 'client_review'],
    ['Filing Coordination', 'filing_coordination'],
    ['Application Filed', 'filed'],
    ['Diary / Registration', 'granted'],
  ]
  const order = steps.map(s => s[1])
  const currentIdx = order.indexOf(status)
  return steps.map(([label, s], i) => ({
    date: i <= currentIdx ? `2026-0${i + 1}-${(i + 1) * 4}` : '',
    label,
    done: i <= currentIdx,
  }))
}

export const MOCK_CASES: IPCase[] = [
  {
    id: 'SIP-2026-0041',
    clientId: 'u1',
    clientName: 'Arjun Mehta',
    type: 'patent',
    title: 'Smart Irrigation System Using IoT Sensors',
    status: 'drafting',
    assignedTo: 'Dr. R.N. Sharma',
    createdAt: '2026-03-10',
    updatedAt: '2026-07-15',
    applicationNumber: undefined,
    deadline: '2026-10-01',
    timeline: PATENT_TIMELINE('drafting'),
    documents: [
      { id: 'd1', name: 'Invention_Disclosure.pdf', uploadedBy: 'Client', date: '2026-03-10', size: '1.2 MB' },
      { id: 'd2', name: 'Prior_Art_Search_Report.pdf', uploadedBy: 'Suvidha', date: '2026-04-20', size: '3.5 MB' },
    ],
    pendingActions: ['Review draft specification sent on 15 Jul', 'Provide inventor declarations'],
    fees: [
      { label: 'Professional Fee (Search)', amount: '₹8,000', paid: true },
      { label: 'Professional Fee (Drafting)', amount: '₹15,000', paid: false },
      { label: 'Govt. Filing Fee (est.)', amount: '₹1,600', paid: false },
    ],
    notes: 'Novelty search complete. Specification drafting underway. Client to review draft by 30 July.',
  },
  {
    id: 'SIP-2026-0039',
    clientId: 'u1',
    clientName: 'Arjun Mehta',
    type: 'copyright',
    title: 'AgriSense Mobile Application (Software)',
    status: 'filed',
    assignedTo: 'Mrs. Meera Sharma',
    createdAt: '2026-01-05',
    updatedAt: '2026-05-20',
    applicationNumber: 'SW-2026-8821',
    deadline: undefined,
    timeline: COPYRIGHT_TIMELINE('filed'),
    documents: [
      { id: 'd3', name: 'Source_Code_Disclosure.zip', uploadedBy: 'Client', date: '2026-01-05', size: '4.2 MB' },
      { id: 'd4', name: 'Copyright_Application.pdf', uploadedBy: 'Suvidha', date: '2026-04-10', size: '0.8 MB' },
      { id: 'd5', name: 'Filing_Acknowledgement.pdf', uploadedBy: 'Suvidha', date: '2026-05-20', size: '0.3 MB' },
    ],
    pendingActions: [],
    fees: [
      { label: 'Professional Fee', amount: '₹5,000', paid: true },
      { label: 'Govt. Filing Fee', amount: '₹500', paid: true },
    ],
    notes: 'Application filed. Diary number received. Awaiting registration certificate.',
  },
  {
    id: 'SIP-2026-0055',
    clientId: 'u2',
    clientName: 'Priya Nair',
    type: 'patent',
    title: 'Biodegradable Polymer Composite for Medical Implants',
    status: 'under_review',
    assignedTo: 'Dr. Kumari Lipi',
    createdAt: '2026-06-01',
    updatedAt: '2026-07-01',
    applicationNumber: undefined,
    deadline: '2026-09-30',
    timeline: PATENT_TIMELINE('under_review'),
    documents: [
      { id: 'd6', name: 'Invention_Disclosure_Form.pdf', uploadedBy: 'Client', date: '2026-06-01', size: '2.1 MB' },
    ],
    pendingActions: ['Provide technical drawings', 'Sign inventor declaration form'],
    fees: [
      { label: 'Professional Fee (Search)', amount: '₹10,000', paid: false },
    ],
    notes: 'Initial review underway. Technical drawings required before search can begin.',
  },
]

const KEY = 'suvidha_cases'

export function getCases(): IPCase[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : MOCK_CASES
  } catch { return MOCK_CASES }
}

export function saveCases(cases: IPCase[]) {
  localStorage.setItem(KEY, JSON.stringify(cases))
}

export function getCasesForClient(clientId: string): IPCase[] {
  return getCases().filter(c => c.clientId === clientId)
}

export function updateCaseStatus(caseId: string, status: CaseStatus) {
  const cases = getCases()
  const idx = cases.findIndex(c => c.id === caseId)
  if (idx < 0) return
  cases[idx].status = status
  cases[idx].updatedAt = new Date().toISOString().split('T')[0]
  saveCases(cases)
}

export const STATUS_LABELS: Record<CaseStatus, string> = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  search_in_progress: 'Search In Progress',
  drafting: 'Drafting',
  client_review: 'Client Review',
  filing_coordination: 'Filing Coordination',
  filed: 'Filed',
  granted: 'Granted',
  rejected: 'Rejected',
}

export const STATUS_COLORS: Record<CaseStatus, string> = {
  submitted: 'bg-gray-100 text-gray-700',
  under_review: 'bg-blue-50 text-blue-700',
  search_in_progress: 'bg-purple-50 text-purple-700',
  drafting: 'bg-amber-50 text-amber-700',
  client_review: 'bg-orange-50 text-orange-700',
  filing_coordination: 'bg-teal-50 text-teal-700',
  filed: 'bg-indigo-50 text-indigo-700',
  granted: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
}
