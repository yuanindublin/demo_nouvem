'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  Users,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  ShieldCheck,
  ThermometerSnowflake,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Layers,
  RotateCcw,
  Eye,
  Beef,
  Fish,
  Drumstick,
  Factory,
  ChevronRight,
  TrendingUp,
  Award,
  Check,
  LayoutGrid,
  LayoutDashboard,
  Ticket,
  ListFilter,
  Table as TableIcon,
  Kanban,
  FileText,
  PhoneCall,
  CheckSquare,
  Sparkles,
  DollarSign,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Code2,
  Copy,
  ExternalLink,
  Contact as ContactIcon,
  Scale,
  Timer,
  Activity,
  Gauge,
  FileCheck2,
  Truck,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { STANDALONE_HTML_CONTENT } from '@/lib/standaloneHtml';
import HubSpotRecordDetail from '@/components/HubSpotRecordDetail';
import FloatingSlimRail, { MainNavSection } from '@/components/FloatingSlimRail';
import DealsWorkspace from '@/components/DealsWorkspace';
import TicketsWorkspace from '@/components/TicketsWorkspace';
import OrdersWorkspace from '@/components/OrdersWorkspace';
import ListsWorkspace from '@/components/ListsWorkspace';
import InboxWorkspace from '@/components/InboxWorkspace';
import CallsWorkspace from '@/components/CallsWorkspace';
import TasksWorkspace from '@/components/TasksWorkspace';
import IntegratedOperationsDashboard from '@/components/IntegratedOperationsDashboard';
import { MockRecallModal } from '@/components/IrishManagementViews';

// ==========================================
// Types & Domain Models
// ==========================================
export type IndustrySector = 
  | 'Meat & Beef Processing'
  | 'Poultry Integration'
  | 'Seafood & Aquaculture'
  | 'Further Food Processing';

export type PipelineStage = 
  | 'Lead / Inbound'
  | 'Sample & Spec Review'
  | 'Plant & HACCP Audit'
  | 'Contract Negotiation'
  | 'Active Supply Partner';

export type ColdChainTier = 
  | 'Deep Freeze (-25°C to -18°C)'
  | 'Chilled Storage (0°C to 4°C)'
  | 'IQF (Individually Quick Frozen)'
  | 'Dry Aging / Climate Controlled';

export interface CustomerNote {
  id: string;
  author: string;
  date: string;
  content: string;
  type: 'note' | 'call' | 'audit' | 'task';
}

export interface CustomerAccount {
  id: string;
  establishmentNumber: string; // DAFM & FSAI Plant Approval, e.g. IE 542 EC
  companyName: string;
  tradingName: string;
  sector: IndustrySector;
  stage: PipelineStage;
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  facilityLocation: {
    address: string;
    city: string;
    state: string; // County in Ireland
    country: string;
  };
  coldChainSpec: ColdChainTier;
  monthlyVolumeMetricTons: number;
  paymentTerms: string; // Net 14 Days, Net 30 Days, Net 60 Days
  certifications: string[];
  lastAuditDate: string;
  nextAuditDate: string;
  annualContractValue: number; // in Euros €
  hasBordBiaMark?: boolean; // Bord Bia Quality Mark accreditation
  slaCutOffTime?: string; // Irish supermarket morning delivery cut-off
  otifRate?: number; // OTIF fulfillment rate percentage
  outstandingAr?: number; // A/R outstanding in Euros €
  overdueDays?: number; // Overdue ageing days
  creditLimit?: number; // Credit limit in Euros €
  notesList: CustomerNote[];
  createdAt: string;
}

const PIPELINE_STAGES: { id: PipelineStage; label: string; color: string; badgeBg: string; badgeText: string }[] = [
  { id: 'Lead / Inbound', label: 'Lead / Inbound', color: 'bg-slate-400', badgeBg: 'bg-slate-100', badgeText: 'text-slate-700' },
  { id: 'Sample & Spec Review', label: 'Sample & QA Review', color: 'bg-amber-400', badgeBg: 'bg-amber-50', badgeText: 'text-amber-700' },
  { id: 'Plant & HACCP Audit', label: 'Plant & HACCP Audit', color: 'bg-blue-400', badgeBg: 'bg-blue-50', badgeText: 'text-blue-700' },
  { id: 'Contract Negotiation', label: 'Contract Negotiation', color: 'bg-purple-400', badgeBg: 'bg-purple-50', badgeText: 'text-purple-700' },
  { id: 'Active Supply Partner', label: 'Active Supply Partner', color: 'bg-emerald-500', badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-700' }
];

const AVAILABLE_CERTIFICATIONS = [
  'Bord Bia Quality Mark Certified',
  'DAFM Approved Plant (IE)',
  'FSAI Audited & Compliant',
  'HACCP Certified',
  'BRCGS Food Safety',
  'Origin Green Member',
  'SQF Level 3',
  'Halal Certified (IE Authority)'
];

// Core Irish Retailers & Food Processors Presets
const INITIAL_ENTERPRISE_CUSTOMERS: CustomerAccount[] = [
  {
    id: 'cust-100',
    establishmentNumber: 'IE 542 EC',
    companyName: 'Dunnes Stores',
    tradingName: 'Dunnes Stores Food Division',
    sector: 'Meat & Beef Processing',
    stage: 'Active Supply Partner',
    primaryContact: {
      name: 'Peter Example',
      title: 'VP of Procurement & Cold-Chain Logistics',
      email: 'peter.example@dunnesstores.com',
      phone: '+353 (1) 475-1111'
    },
    facilityLocation: {
      address: '46-50 South Great George\'s Street',
      city: 'Dublin 2',
      state: 'Co. Dublin',
      country: 'Ireland'
    },
    coldChainSpec: 'Chilled Storage (0°C to 4°C)',
    monthlyVolumeMetricTons: 1850,
    paymentTerms: 'Net 30 Days',
    hasBordBiaMark: true,
    slaCutOffTime: '06:00 AM (Dunnes Newbridge CDC)',
    otifRate: 99.6,
    annualContractValue: 4250000,
    outstandingAr: 480000,
    overdueDays: 3,
    creditLimit: 750000,
    certifications: ['Bord Bia Quality Mark Certified', 'DAFM Approved Plant (IE)', 'HACCP Certified', 'BRCGS Food Safety', 'Origin Green Member'],
    lastAuditDate: '2026-03-13',
    nextAuditDate: '2027-03-13',
    notesList: [
      { id: 'n-lead-change', author: 'Thalita Milan', date: 'Mar 13, 2026 at 4:09 PM GMT', type: 'task', content: 'Thalita Milan confirmed 06:00 AM cross-dock delivery schedule for Newbridge & Cornelscourt.' },
      { id: 'n-created', author: 'System', date: 'Mar 13, 2026 at 4:09 PM GMT', type: 'note', content: 'Account initialized with DAFM establishment license IE 542 EC and Bord Bia accreditation.' },
      { id: 'n-call-1', author: 'Peter Example', date: 'Mar 12, 2026 at 2:30 PM GMT', type: 'call', content: '[Outbound Call - 15 mins] Finalized weekly volume forecast: 1,850 MT grass-fed Irish beef primals with telemetry loggers active.' }
    ],
    createdAt: '03/13/2026'
  },
  {
    id: 'cust-101',
    establishmentNumber: 'IE 812 EC',
    companyName: 'Tesco Ireland',
    tradingName: 'Tesco Ireland Commercial Operations',
    sector: 'Poultry Integration',
    stage: 'Active Supply Partner',
    primaryContact: {
      name: 'Sarah Lin',
      title: 'Category Sourcing Director - Chilled Protein',
      email: 's.lin@tesco.ie',
      phone: '+353 (1) 249-0000'
    },
    facilityLocation: {
      address: 'Hearse Road, Donabate Central Distribution Centre',
      city: 'Donabate',
      state: 'Co. Dublin',
      country: 'Ireland'
    },
    coldChainSpec: 'Chilled Storage (0°C to 4°C)',
    monthlyVolumeMetricTons: 1420,
    paymentTerms: 'Net 14 Days',
    hasBordBiaMark: true,
    slaCutOffTime: '05:30 AM (Tesco Donabate CDC)',
    otifRate: 99.2,
    annualContractValue: 3890000,
    outstandingAr: 210000,
    overdueDays: 0,
    creditLimit: 500000,
    certifications: ['Bord Bia Quality Mark Certified', 'DAFM Approved Plant (IE)', 'HACCP Certified', 'Origin Green Member'],
    lastAuditDate: '2026-03-15',
    nextAuditDate: '2027-03-14',
    notesList: [
      { id: 'n1', author: 'Sarah Lin', date: '2026-08-10', type: 'call', content: 'Reviewed Q3 fresh poultry volume. Re-confirmed Net 14 payment terms and strict 05:30 AM Donabate gate cut-off.' },
      { id: 'n2', author: 'Alex Rivera', date: '2026-06-20', type: 'audit', content: 'DAFM IE 812 EC veterinary audit passed with zero non-conformances. Bord Bia audit renewal verified.' }
    ],
    createdAt: '2025-01-12'
  },
  {
    id: 'cust-102',
    establishmentNumber: 'IE 319 EC',
    companyName: 'SuperValu (Musgrave Group)',
    tradingName: 'Musgrave Retail Partners Ireland',
    sector: 'Meat & Beef Processing',
    stage: 'Active Supply Partner',
    primaryContact: {
      name: 'Seán O\'Connor',
      title: 'Chilled Meat Sourcing & QA Lead',
      email: 's.oconnor@musgrave.ie',
      phone: '+353 (21) 452-2100'
    },
    facilityLocation: {
      address: 'Ballycurreen, Airport Road',
      city: 'Cork',
      state: 'Co. Cork',
      country: 'Ireland'
    },
    coldChainSpec: 'Chilled Storage (0°C to 4°C)',
    monthlyVolumeMetricTons: 1150,
    paymentTerms: 'Net 30 Days',
    hasBordBiaMark: true,
    slaCutOffTime: '06:00 AM (Kilcock & Cork CDC)',
    otifRate: 98.9,
    annualContractValue: 2980000,
    outstandingAr: 340000,
    overdueDays: 0,
    creditLimit: 600000,
    certifications: ['Bord Bia Quality Mark Certified', 'DAFM Approved Plant (IE)', 'HACCP Certified', 'Origin Green Member'],
    lastAuditDate: '2026-05-10',
    nextAuditDate: '2027-05-09',
    notesList: [
      { id: 'n3', author: 'Jessica Miller', date: '2026-09-02', type: 'task', content: 'Validated Bord Bia Quality Mark compliance on all pre-packed private label steaks for SuperValu.' }
    ],
    createdAt: '2025-02-18'
  },
  {
    id: 'cust-103',
    establishmentNumber: 'IE 477 EC',
    companyName: 'BWG Foods (Spar Ireland)',
    tradingName: 'BWG Foods Wholesale & Convenience',
    sector: 'Further Food Processing',
    stage: 'Active Supply Partner',
    primaryContact: {
      name: 'Liam Byrne',
      title: 'Head of Chilled Food & Butchery Sourcing',
      email: 'l.byrne@bwg.ie',
      phone: '+353 (1) 409-0300'
    },
    facilityLocation: {
      address: 'BWG House, Greenhills Road',
      city: 'Walkinstown',
      state: 'Dublin 12',
      country: 'Ireland'
    },
    coldChainSpec: 'Chilled Storage (0°C to 4°C)',
    monthlyVolumeMetricTons: 680,
    paymentTerms: 'Net 60 Days',
    hasBordBiaMark: true,
    slaCutOffTime: '06:30 AM (Walkinstown Hub)',
    otifRate: 99.1,
    annualContractValue: 1650000,
    outstandingAr: 290000,
    overdueDays: 5,
    creditLimit: 400000,
    certifications: ['Bord Bia Quality Mark Certified', 'DAFM Approved Plant (IE)', 'HACCP Certified'],
    lastAuditDate: '2026-07-22',
    nextAuditDate: '2027-07-20',
    notesList: [
      { id: 'n4', author: 'Liam Byrne', date: '2026-08-28', type: 'note', content: 'Reviewed Net 60 payment schedule. Fresh sausage and cured bacon lines operating at 100% specification.' }
    ],
    createdAt: '2025-04-05'
  },
  {
    id: 'cust-104',
    establishmentNumber: 'IE 904 EC',
    companyName: 'Connacht Artisan Meats',
    tradingName: 'Connacht Artisan Meat Co.',
    sector: 'Meat & Beef Processing',
    stage: 'Plant & HACCP Audit',
    primaryContact: {
      name: 'Patrick Higgins',
      title: 'Managing Director & Operations',
      email: 'p.higgins@connachtmeats.ie',
      phone: '+353 (91) 790-222'
    },
    facilityLocation: {
      address: 'Oranmore Business Park',
      city: 'Oranmore',
      state: 'Co. Galway',
      country: 'Ireland'
    },
    coldChainSpec: 'Chilled Storage (0°C to 4°C)',
    monthlyVolumeMetricTons: 180,
    paymentTerms: 'Net 14 Days',
    hasBordBiaMark: false, // Triggers Bord Bia Compliance Blocker!
    slaCutOffTime: '07:00 AM',
    otifRate: 94.2,
    annualContractValue: 480000,
    outstandingAr: 45000,
    overdueDays: 18,
    creditLimit: 100000,
    certifications: ['DAFM Approved Plant (IE)', 'HACCP Certified'],
    lastAuditDate: '2025-11-18',
    nextAuditDate: '2026-11-17',
    notesList: [
      { id: 'n5', author: 'Quality Dept', date: '2026-09-08', type: 'audit', content: '⚠️ COMPLIANCE BLOCKER ACTIVE: Lacking Bord Bia Quality Mark certification. Commercial dispatch on hold until re-audit.' }
    ],
    createdAt: '2025-06-20'
  }
];

export default function HubSpotSmallBusinessFoodCRM() {
  // ----------------------------------------
  // State Management
  // ----------------------------------------
  const [customers, setCustomers] = useState<CustomerAccount[]>(INITIAL_ENTERPRISE_CUSTOMERS);
  const [viewMode, setViewMode] = useState<'table' | 'board'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<string>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof CustomerAccount>('companyName');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Drawer & Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSingleHtmlModalOpen, setIsSingleHtmlModalOpen] = useState(false);
  const [isCopiedHtml, setIsCopiedHtml] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerAccount | null>(null);
  const [detailCustomer, setDetailCustomer] = useState<CustomerAccount | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<CustomerAccount | null>(null);

  // HubSpot 3-Column Detailed Record View (Contact or Company)
  const [activeRecordDetail, setActiveRecordDetail] = useState<{
    type: 'contact' | 'company';
    customerId: string;
  } | null>(null);
  const [crmDirectoryType, setCrmDirectoryType] = useState<'companies' | 'contacts'>('companies');
  const [activeNavSection, setActiveNavSection] = useState<MainNavSection>('dashboard');

  // Irish Localization & Operations State
  const [dublinTime, setDublinTime] = useState<string>('');
  const [cutOffCountdown, setCutOffCountdown] = useState<{ hours: number; minutes: number; seconds: number }>({ hours: 2, minutes: 24, seconds: 15 });
  const [isMockRecallOpen, setIsMockRecallOpen] = useState(false);
  const [mockRecallRunning, setMockRecallRunning] = useState(false);
  const [mockRecallCompleted, setMockRecallCompleted] = useState(false);
  const [mockRecallLot, setMockRecallLot] = useState('LOT-IE-2026-BEEF-9941');

  // Real-time Irish Dublin Clock & 06:00 AM Supermarket SLA Cut-off Countdown
  useEffect(() => {
    const updateDublinTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IE', {
          timeZone: 'Europe/Dublin',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setDublinTime(timeStr);

        // Next 06:00 AM delivery cut-off
        const dublinNow = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Dublin' }));
        const target = new Date(dublinNow);
        target.setHours(6, 0, 0, 0);
        if (dublinNow.getTime() >= target.getTime()) {
          target.setDate(target.getDate() + 1);
        }
        const diffMs = target.getTime() - dublinNow.getTime();
        const diffSec = Math.max(0, Math.floor(diffMs / 1000));
        const hours = Math.floor(diffSec / 3600);
        const minutes = Math.floor((diffSec % 3600) / 60);
        const seconds = diffSec % 60;
        setCutOffCountdown({ hours, minutes, seconds });
      } catch {
        setDublinTime('06:00:00 IST');
      }
    };
    updateDublinTime();
    const interval = setInterval(updateDublinTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectNavSection = (section: MainNavSection) => {
    setActiveNavSection(section);
    if (section === 'companies') {
      setCrmDirectoryType('companies');
      setActiveRecordDetail(null);
    } else if (section === 'contacts') {
      setCrmDirectoryType('contacts');
      setActiveRecordDetail(null);
    } else {
      setActiveRecordDetail(null);
    }
  };

  // Keyboard Shortcuts (⌘1 to ⌘9) for Linear/Raycast/Stripe style navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === '1') { e.preventDefault(); handleSelectNavSection('contacts'); }
        else if (e.key === '2') { e.preventDefault(); handleSelectNavSection('companies'); }
        else if (e.key === '3') { e.preventDefault(); handleSelectNavSection('deals'); }
        else if (e.key === '4') { e.preventDefault(); handleSelectNavSection('tickets'); }
        else if (e.key === '5') { e.preventDefault(); handleSelectNavSection('orders'); }
        else if (e.key === '6') { e.preventDefault(); handleSelectNavSection('lists'); }
        else if (e.key === '7') { e.preventDefault(); handleSelectNavSection('inbox'); }
        else if (e.key === '8') { e.preventDefault(); handleSelectNavSection('calls'); }
        else if (e.key === '9') { e.preventDefault(); handleSelectNavSection('tasks'); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Form State
  const [formValues, setFormValues] = useState<Partial<CustomerAccount>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // HubSpot Activity Tab inside Customer 360 Drawer
  const [activeDrawerTab, setActiveDrawerTab] = useState<'activity' | 'notes' | 'properties'>('activity');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteType, setNewNoteType] = useState<'note' | 'call' | 'task'>('note');

  // Load from local storage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = localStorage.getItem('hubspot_food_crm_customers');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCustomers(parsed);
          }
        }
      } catch {
        // ignore
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const saveToStorage = (updated: CustomerAccount[]) => {
    setCustomers(updated);
    try {
      localStorage.setItem('hubspot_food_crm_customers', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ----------------------------------------
  // Aggregated Pipeline Metrics (HubSpot Header)
  // ----------------------------------------
  const pipelineMetrics = useMemo(() => {
    const total = customers.length;
    const activePartners = customers.filter(c => c.stage === 'Active Supply Partner').length;
    const totalPipelineValue = customers.reduce((sum, c) => sum + (Number(c.annualContractValue) || 0), 0);
    const totalVolume = customers.reduce((sum, c) => sum + (Number(c.monthlyVolumeMetricTons) || 0), 0);
    const haccpCount = customers.filter(c => c.certifications.some(cert => cert.includes('HACCP'))).length;

    return {
      total,
      activePartners,
      totalPipelineValue,
      totalVolume,
      haccpRate: total > 0 ? Math.round((haccpCount / total) * 100) : 0
    };
  }, [customers]);

  // ----------------------------------------
  // Filtering & Search
  // ----------------------------------------
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        c.companyName.toLowerCase().includes(q) ||
        c.establishmentNumber.toLowerCase().includes(q) ||
        c.primaryContact.name.toLowerCase().includes(q) ||
        c.primaryContact.email.toLowerCase().includes(q) ||
        c.facilityLocation.city.toLowerCase().includes(q) ||
        c.facilityLocation.state.toLowerCase().includes(q);

      let matchesTab = true;
      if (activeTabFilter === 'meat') matchesTab = c.sector === 'Meat & Beef Processing';
      else if (activeTabFilter === 'poultry') matchesTab = c.sector === 'Poultry Integration';
      else if (activeTabFilter === 'seafood') matchesTab = c.sector === 'Seafood & Aquaculture';
      else if (activeTabFilter === 'prepared') matchesTab = c.sector === 'Further Food Processing';
      else if (activeTabFilter === 'active') matchesTab = c.stage === 'Active Supply Partner';
      else if (activeTabFilter === 'high_volume') matchesTab = c.monthlyVolumeMetricTons >= 500;

      return matchesQuery && matchesTab;
    }).sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return 0;
    });
  }, [customers, searchQuery, activeTabFilter, sortField, sortDirection]);

  // ----------------------------------------
  // CRUD Actions
  // ----------------------------------------
  const openCreateModal = () => {
    setEditingCustomer(null);
    setFormValues({
      establishmentNumber: 'USDA-EST-' + Math.floor(1000 + Math.random() * 9000),
      companyName: '',
      tradingName: '',
      sector: 'Meat & Beef Processing',
      stage: 'Lead / Inbound',
      primaryContact: {
        name: '',
        title: 'VP Procurement & QA',
        email: '',
        phone: ''
      },
      facilityLocation: {
        address: '',
        city: '',
        state: '',
        country: 'USA'
      },
      coldChainSpec: 'Deep Freeze (-25°C to -18°C)',
      monthlyVolumeMetricTons: 250,
      paymentTerms: 'Net 30 Days',
      certifications: ['HACCP Certified', 'FSMA Compliant'],
      lastAuditDate: new Date().toISOString().split('T')[0],
      nextAuditDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      annualContractValue: 750000,
      notesList: [
        { id: `n-${Date.now()}`, author: 'Current User', date: new Date().toISOString().split('T')[0], type: 'note', content: 'Account created in CRM.' }
      ]
    });
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const openEditModal = (account: CustomerAccount) => {
    setEditingCustomer(account);
    setFormValues(JSON.parse(JSON.stringify(account)));
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const handleToggleCertification = (cert: string) => {
    const current = formValues.certifications || [];
    if (current.includes(cert)) {
      setFormValues({
        ...formValues,
        certifications: current.filter(c => c !== cert)
      });
    } else {
      setFormValues({
        ...formValues,
        certifications: [...current, cert]
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.companyName?.trim()) errors.companyName = 'Company name is required';
    if (!formValues.establishmentNumber?.trim()) errors.establishmentNumber = 'Est / Facility ID is required';
    if (!formValues.primaryContact?.name?.trim()) errors.contactName = 'Contact name is required';
    if (!formValues.primaryContact?.email?.trim() || !formValues.primaryContact.email.includes('@')) {
      errors.contactEmail = 'Valid business email is required';
    }
    if (!formValues.facilityLocation?.city?.trim()) errors.city = 'City is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCustomer) {
      // Update (U)
      const updatedList = customers.map(c => 
        c.id === editingCustomer.id ? { ...(formValues as CustomerAccount), id: c.id } : c
      );
      saveToStorage(updatedList);
      showToast(`Updated company: ${formValues.companyName}`);
      if (detailCustomer && detailCustomer.id === editingCustomer.id) {
        setDetailCustomer({ ...(formValues as CustomerAccount), id: editingCustomer.id });
      }
    } else {
      // Create (C)
      const newCustomer: CustomerAccount = {
        ...(formValues as CustomerAccount),
        id: `cust-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      const updatedList = [newCustomer, ...customers];
      saveToStorage(updatedList);
      showToast(`Created company: ${newCustomer.companyName}`);
    }

    setIsCreateModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!customerToDelete) return;
    const updatedList = customers.filter(c => c.id !== customerToDelete.id);
    saveToStorage(updatedList);
    setSelectedIds(prev => prev.filter(id => id !== customerToDelete.id));
    if (detailCustomer && detailCustomer.id === customerToDelete.id) {
      setDetailCustomer(null);
    }
    showToast(`Removed company record: ${customerToDelete.companyName}`);
    setCustomerToDelete(null);
  };

  const handleStageChange = (customer: CustomerAccount, newStage: PipelineStage) => {
    const updatedCustomer: CustomerAccount = {
      ...customer,
      stage: newStage,
      notesList: [
        {
          id: `n-${Date.now()}`,
          author: 'CRM Automation',
          date: new Date().toISOString().split('T')[0],
          type: 'task',
          content: `Pipeline stage shifted to "${newStage}".`
        },
        ...customer.notesList
      ]
    };
    const updatedList = customers.map(c => c.id === customer.id ? updatedCustomer : c);
    saveToStorage(updatedList);
    if (detailCustomer && detailCustomer.id === customer.id) {
      setDetailCustomer(updatedCustomer);
    }
    showToast(`${customer.companyName} moved to ${newStage}`);
  };

  const handleAddNoteToDetail = () => {
    if (!detailCustomer || !newNoteContent.trim()) return;
    const newNote: CustomerNote = {
      id: `note-${Date.now()}`,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      type: newNoteType,
      content: newNoteContent.trim()
    };
    const updatedCustomer = {
      ...detailCustomer,
      notesList: [newNote, ...detailCustomer.notesList]
    };
    const updatedList = customers.map(c => c.id === detailCustomer.id ? updatedCustomer : c);
    saveToStorage(updatedList);
    setDetailCustomer(updatedCustomer);
    setNewNoteContent('');
    showToast('Activity logged successfully');
  };

  const resetToFactoryDemo = () => {
    if (confirm('Reset CRM database to default HubSpot small business food processor data?')) {
      saveToStorage(INITIAL_ENTERPRISE_CUSTOMERS);
      setSelectedIds([]);
      showToast('Database reset to default data.');
    }
  };

  // CSV Export Utility
  const exportToCSV = () => {
    const headers = [
      'Establishment ID',
      'Company Name',
      'Trade Name',
      'Industry Sector',
      'Pipeline Stage',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'City',
      'State',
      'Cold Chain Spec',
      'Monthly Volume (MT)',
      'Annual Contract ($)',
      'Certifications'
    ];
    const rows = filteredCustomers.map(c => [
      `"${c.establishmentNumber}"`,
      `"${c.companyName}"`,
      `"${c.tradingName || ''}"`,
      `"${c.sector}"`,
      `"${c.stage}"`,
      `"${c.primaryContact.name}"`,
      `"${c.primaryContact.email}"`,
      `"${c.primaryContact.phone}"`,
      `"${c.facilityLocation.city}"`,
      `"${c.facilityLocation.state}"`,
      `"${c.coldChainSpec}"`,
      c.monthlyVolumeMetricTons,
      c.annualContractValue,
      `"${c.certifications.join(', ')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hubspot_food_customers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported filtered customers to CSV');
  };

  // Single HTML Format Actions
  const handleDownloadSingleHtml = () => {
    const blob = new Blob([STANDALONE_HTML_CONTENT], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'food_processor_crm_single.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Downloaded standalone single HTML file!');
  };

  const handleCopySingleHtml = () => {
    navigator.clipboard.writeText(STANDALONE_HTML_CONTENT);
    setIsCopiedHtml(true);
    showToast('Copied full single HTML code to clipboard!');
    setTimeout(() => setIsCopiedHtml(false), 2500);
  };

  // ----------------------------------------
  // UI Badge Renderers
  // ----------------------------------------
  const renderSectorBadge = (sector: IndustrySector) => {
    switch (sector) {
      case 'Meat & Beef Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <Beef className="w-3.5 h-3.5 text-rose-500" />
            <span>Meat & Beef</span>
          </span>
        );
      case 'Poultry Integration':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Drumstick className="w-3.5 h-3.5 text-amber-600" />
            <span>Poultry</span>
          </span>
        );
      case 'Seafood & Aquaculture':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200">
            <Fish className="w-3.5 h-3.5 text-sky-500" />
            <span>Seafood</span>
          </span>
        );
      case 'Further Food Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
            <Factory className="w-3.5 h-3.5 text-purple-500" />
            <span>Food Processor</span>
          </span>
        );
    }
  };

  const renderStageBadge = (stage: PipelineStage) => {
    const cfg = PIPELINE_STAGES.find(s => s.id === stage) || PIPELINE_STAGES[0];
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.badgeBg} ${cfg.badgeText}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.color}`}></span>
        {stage}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f8fa] text-slate-800 flex flex-col font-sans selection:bg-[#ff7a59] selection:text-white md:pl-[76px] transition-all duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-slate-800"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Slim Rail (Linear / Raycast / Stripe Dashboard Inspired) */}
      <FloatingSlimRail
        activeSection={activeRecordDetail ? (activeRecordDetail.type === 'contact' ? 'contacts' : 'companies') : activeNavSection}
        onSelectSection={handleSelectNavSection}
        badgeCounts={{ inbox: 3, tasks: 4, tickets: 2, deals: 5 }}
        onQuickPeterContact={() => {
          setActiveNavSection('contacts');
          setActiveRecordDetail({ type: 'contact', customerId: 'cust-100' });
        }}
        onOpenCreate={openCreateModal}
        onResetDemo={resetToFactoryDemo}
        onExportStandalone={() => setIsSingleHtmlModalOpen(true)}
      />

      {/* NOUVEM Irish Localization Global Top Bar */}
      <header className="h-14 bg-[#0A2540] text-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md border-b border-slate-800">
        <div className="flex items-center gap-4 sm:gap-6">
          <div 
            className="flex items-center gap-2.5 font-bold text-base tracking-tight cursor-pointer" 
            onClick={() => {
              setActiveRecordDetail(null);
              setActiveNavSection('companies');
            }}
          >
            <div className="w-7 h-7 rounded-lg bg-[#F58220] flex items-center justify-center font-bold text-white text-xs shadow-xs">
              NV
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-sm flex items-center gap-1.5">
                <span>NOUVEM</span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                  IE-FSAI
                </span>
              </span>
              <span className="text-[10px] text-slate-300 font-normal leading-none">
                Food Processing & Retail Hub
              </span>
            </div>
          </div>

          {/* Top Bar Current Section Breadcrumb & Quick Switchers */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs">
            <button
              onClick={() => handleSelectNavSection('dashboard')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                !activeRecordDetail && activeNavSection === 'dashboard'
                  ? 'bg-[#F58220] text-white font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => handleSelectNavSection('companies')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                (!activeRecordDetail && activeNavSection === 'companies') || (activeRecordDetail?.type === 'company')
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Companies</span>
            </button>

            <button
              onClick={() => handleSelectNavSection('contacts')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                (!activeRecordDetail && activeNavSection === 'contacts') || (activeRecordDetail?.type === 'contact')
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Contacts</span>
            </button>

            <button
              onClick={() => handleSelectNavSection('deals')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                !activeRecordDetail && activeNavSection === 'deals'
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Deals</span>
            </button>

            <button
              onClick={() => handleSelectNavSection('tickets')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                !activeRecordDetail && activeNavSection === 'tickets'
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Tickets</span>
            </button>

            <button
              onClick={() => handleSelectNavSection('orders')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                !activeRecordDetail && activeNavSection === 'orders'
                  ? 'bg-slate-800 text-white font-semibold shadow-2xs border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Orders</span>
            </button>

            {/* Quick Link to Peter Example at Dunnes Stores */}
            <button
              onClick={() => {
                setActiveNavSection('contacts');
                setActiveRecordDetail({ type: 'contact', customerId: 'cust-100' });
              }}
              className={`ml-2 px-3 py-1 rounded-md font-semibold text-xs transition-all flex items-center gap-1.5 ${
                activeRecordDetail?.type === 'contact' && activeRecordDetail.customerId === 'cust-100'
                  ? 'bg-[#F58220] text-white shadow-xs'
                  : 'bg-[#F58220]/20 text-orange-200 border border-[#F58220]/40 hover:bg-[#F58220]/30 hover:text-white'
              }`}
              title="Open Peter Example (Dunnes Stores) Contact Record"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
              <span>Peter Example (Dunnes) ↗</span>
            </button>
          </nav>
        </div>

        {/* Top Bar Right: Irish Clock, Standalone HTML & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Live Dublin Clock */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700 text-xs font-mono font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400 text-[11px]">🇮🇪 Dublin:</span>
            <span className="font-bold text-white">{dublinTime || '14:26:12 IST'}</span>
          </div>

          <button
            id="btn-reset-demo"
            onClick={resetToFactoryDemo}
            title="Reset sample data"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            id="btn-export-csv"
            onClick={exportToCSV}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
          <button
            id="btn-single-html-modal"
            onClick={() => setIsSingleHtmlModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:text-white bg-emerald-950/80 border border-emerald-500/60 hover:bg-emerald-900 rounded transition-all shadow-xs"
            title="View, copy, or download single HTML format code"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Single HTML</span>
          </button>
          <button
            id="btn-create-company"
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#F58220] hover:bg-[#e06e12] active:bg-[#c95f0c] rounded shadow-sm transition-all focus:ring-2 focus:ring-[#F58220]/50"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>
      </header>

      {/* Dynamic Content Switching */}
      {activeRecordDetail ? (
        <HubSpotRecordDetail
          type={activeRecordDetail.type}
          account={customers.find(c => c.id === activeRecordDetail.customerId) || customers[0]}
          allAccounts={customers}
          onBack={() => setActiveRecordDetail(null)}
          onSwitchRecord={(type, id) => setActiveRecordDetail({ type, customerId: id })}
          onUpdateAccount={(updated) => {
            setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
            try {
              const next = customers.map(c => c.id === updated.id ? updated : c);
              localStorage.setItem('hubspot_food_crm_customers', JSON.stringify(next));
            } catch {}
          }}
          onDeleteAccount={(id) => {
            const target = customers.find(c => c.id === id);
            if (target) {
              setCustomerToDelete(target);
              setActiveRecordDetail(null);
            }
          }}
          onEditAccount={(account) => openEditModal(account)}
          showToast={(msg) => showToast(msg)}
        />
      ) : activeNavSection === 'deals' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <DealsWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'tickets' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <TicketsWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'orders' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <OrdersWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'lists' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <ListsWorkspace
            customers={customers}
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'inbox' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <InboxWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'calls' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <CallsWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'tasks' ? (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-6 w-full">
          <TasksWorkspace
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            showToast={showToast}
          />
        </main>
      ) : activeNavSection === 'dashboard' ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
          <IntegratedOperationsDashboard
            customers={customers}
            dublinTime={dublinTime}
            cutOffCountdown={cutOffCountdown}
            onOpenRecordDetail={(type, id) => {
              setActiveNavSection(type === 'contact' ? 'contacts' : 'companies');
              setActiveRecordDetail({ type, customerId: id });
            }}
            onNavigateSection={(sec) => handleSelectNavSection(sec)}
            onOpenMockRecall={() => setIsMockRecallOpen(true)}
            showToast={showToast}
          />
        </main>
      ) : (
        <>
          {/* Secondary HubSpot Navigation & Metric Highlights Bar */}
          <div className="bg-white border-b border-slate-200 px-6 py-3">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      id="btn-dir-companies"
                      onClick={() => setCrmDirectoryType('companies')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        crmDirectoryType === 'companies'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Companies ({customers.length})</span>
                    </button>
                    <button
                      id="btn-dir-contacts"
                      onClick={() => setCrmDirectoryType('contacts')}
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                        crmDirectoryType === 'contacts'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Contacts ({customers.length})</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setActiveRecordDetail({ type: 'contact', customerId: 'cust-100' })}
                    className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#F58220] bg-orange-50 border border-orange-200 hover:bg-orange-100 rounded-md transition-colors"
                    title="Open Peter Example (Dunnes Stores) Contact Record Detail View"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured: Peter Example (Dunnes) ↗</span>
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {crmDirectoryType === 'companies'
                    ? 'Dunnes, Tesco, SuperValu, BWG & Irish protein processors supply chain accounts'
                    : 'Key buyers, commercial trading directors, and food safety quality assurance managers'}
                </p>
              </div>

              {/* Metric Highlights Pill */}
              <div className="flex items-center gap-4 text-xs">
                <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">爱尔兰核心客户</span>
                  <span className="font-bold text-slate-900 text-sm text-emerald-600">
                    {customers.length} 重点商超/企业
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">月出货吨位</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {pipelineMetrics.totalVolume.toLocaleString()} MT / mo
                  </span>
                </div>
                <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hidden sm:block">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">年度合同总额</span>
                  <span className="font-bold text-slate-900 text-sm text-blue-600">
                    €{(pipelineMetrics.totalPipelineValue / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main App Workspace */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-4">
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-3">
          {/* Top Row: View Tabs + View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            {/* Quick View Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium">
              {[
                { id: 'all', label: 'All Companies' },
                { id: 'meat', label: '🥩 Meat & Beef' },
                { id: 'poultry', label: '🍗 Poultry' },
                { id: 'seafood', label: '🐟 Seafood' },
                { id: 'prepared', label: '🏭 Prepared Foods' },
                { id: 'high_volume', label: '⚡ High Volume (>500 MT)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  id={`tab-filter-${tab.id}`}
                  onClick={() => setActiveTabFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                    activeTabFilter === tab.id
                      ? 'bg-slate-100 text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle: Table vs Board */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                id="btn-view-table"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
              <button
                id="btn-view-board"
                onClick={() => setViewMode('board')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  viewMode === 'board'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Board</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Search & Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-search-hubspot"
                type="text"
                placeholder="Search by company, contact, Est #, city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff7a59]/30 focus:border-[#ff7a59] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-500">
              <span>Sort by:</span>
              <select
                id="select-sort-options"
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [f, d] = e.target.value.split('-') as [keyof CustomerAccount, 'asc' | 'desc'];
                  setSortField(f);
                  setSortDirection(d);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
              >
                <option value="companyName-asc">Company name (A-Z)</option>
                <option value="companyName-desc">Company name (Z-A)</option>
                <option value="monthlyVolumeMetricTons-desc">Monthly volume (High to Low)</option>
                <option value="annualContractValue-desc">Contract value (High to Low)</option>
              </select>
            </div>
          </div>
        </div>

        {crmDirectoryType === 'contacts' ? (
          /* ======================================================== */
          /* VIEW: HubSpot Contacts Directory View                    */
          /* ======================================================== */
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3">Contact Name</th>
                    <th className="px-4 py-3">Associated Company</th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Phone Number</th>
                    <th className="px-4 py-3">Lifecycle Stage</th>
                    <th className="px-4 py-3">Cold Chain Spec</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCustomers.map((account) => (
                    <tr key={`contact-dir-${account.id}`} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-xs shadow-2xs">
                            {account.primaryContact.name.substring(0, 1)}
                          </div>
                          <div>
                            <button
                              onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                              className="font-bold text-slate-900 hover:text-blue-600 text-left transition-colors block"
                            >
                              {account.primaryContact.name}
                            </button>
                            <span className="text-[11px] text-slate-400 block">{account.primaryContact.title}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setActiveRecordDetail({ type: 'company', customerId: account.id })}
                          className="font-medium text-slate-800 hover:text-[#ff7a59] flex items-center gap-1.5"
                        >
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{account.companyName}</span>
                        </button>
                        <span className="text-[10px] text-slate-400 block font-mono">{account.establishmentNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${account.primaryContact.email}`} className="text-[#ff7a59] hover:underline">
                          {account.primaryContact.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {account.primaryContact.phone}
                      </td>
                      <td className="px-4 py-3">
                        {renderStageBadge(account.stage)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-600">
                          <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-500" />
                          {account.coldChainSpec}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-[#ff7a59] hover:bg-[#e06545] rounded transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <ContactIcon className="w-3.5 h-3.5" />
                          <span>Open Contact Detail Page</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <strong className="text-slate-800">{filteredCustomers.length}</strong> processor contacts
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ======================================================== */}
            {/* VIEW 1: HubSpot Classic Table / List View                */}
            {/* ======================================================== */}
            {viewMode === 'table' && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === filteredCustomers.length && filteredCustomers.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds(filteredCustomers.map(c => c.id));
                          else setSelectedIds([]);
                        }}
                        className="rounded border-slate-300 text-[#ff7a59] focus:ring-0 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3">Company Name</th>
                    <th className="px-4 py-3">Sector</th>
                    <th className="px-4 py-3">Lead / Pipeline Stage</th>
                    <th className="px-4 py-3">Primary Contact</th>
                    <th className="px-4 py-3">Throughput (MT)</th>
                    <th className="px-4 py-3">Contract ($)</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center text-slate-400">
                        <div className="max-w-sm mx-auto flex flex-col items-center">
                          <Building2 className="w-10 h-10 text-slate-300 mb-2" />
                          <p className="text-sm font-semibold text-slate-700">No matching food processor accounts</p>
                          <p className="text-xs text-slate-400 mt-1">Try resetting filters or search query.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCustomers.map((account) => {
                      const isSelected = selectedIds.includes(account.id);
                      return (
                        <tr
                          key={account.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            isSelected ? 'bg-blue-50/40' : ''
                          }`}
                        >
                          {/* Selection Checkbox */}
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedIds(prev => [...prev, account.id]);
                                else setSelectedIds(prev => prev.filter(id => id !== account.id));
                              }}
                              className="rounded border-slate-300 text-[#ff7a59] focus:ring-0 cursor-pointer"
                            />
                          </td>

                          {/* Company Name & Est # */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                                {account.companyName.substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <button
                                  onClick={() => setActiveRecordDetail({ type: 'company', customerId: account.id })}
                                  className="font-semibold text-slate-900 hover:text-[#ff7a59] text-left transition-colors"
                                  title="Open Company Record Detailed Page"
                                >
                                  {account.companyName}
                                </button>
                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                  <span className="font-mono text-slate-500 font-medium">{account.establishmentNumber}</span>
                                  <span>•</span>
                                  <span>{account.facilityLocation.city}, {account.facilityLocation.state}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Sector */}
                          <td className="px-4 py-3">
                            {renderSectorBadge(account.sector)}
                          </td>

                          {/* Stage */}
                          <td className="px-4 py-3">
                            {renderStageBadge(account.stage)}
                          </td>

                          {/* Primary Contact */}
                          <td className="px-4 py-3">
                            <div>
                              <button
                                onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                                className="font-semibold text-blue-600 hover:underline hover:text-blue-800 block text-left"
                                title="Open Contact Record Detailed Page"
                              >
                                {account.primaryContact.name}
                              </button>
                              <button
                                onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                                className="text-[11px] text-slate-500 hover:underline block text-left"
                                title="Open Contact Record Detailed Page"
                              >
                                {account.primaryContact.email}
                              </button>
                            </div>
                          </td>

                          {/* Volume Throughput */}
                          <td className="px-4 py-3 font-medium text-slate-800">
                            <div className="flex items-center gap-1">
                              <ThermometerSnowflake className="w-3.5 h-3.5 text-cyan-500" />
                              <span>{account.monthlyVolumeMetricTons.toLocaleString()} MT</span>
                            </div>
                          </td>

                          {/* Contract Value */}
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            ${account.annualContractValue.toLocaleString()}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                                title="Open Contact Record Page"
                                className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                              >
                                <ContactIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setActiveRecordDetail({ type: 'company', customerId: account.id })}
                                title="Open Company Record Page"
                                className="p-1.5 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                              >
                                <Building2 className="w-4 h-4" />
                              </button>
                              <button
                                id={`btn-table-view-${account.id}`}
                                onClick={() => setDetailCustomer(account)}
                                title="Open Quick 360 Drawer"
                                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                id={`btn-table-edit-${account.id}`}
                                onClick={() => openEditModal(account)}
                                title="Edit Company"
                                className="p-1.5 text-slate-400 hover:text-[#ff7a59] hover:bg-orange-50 rounded transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                id={`btn-table-delete-${account.id}`}
                                onClick={() => setCustomerToDelete(account)}
                                title="Delete Company"
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Summary */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <div>
                Showing <strong className="text-slate-800">{filteredCustomers.length}</strong> of{' '}
                <strong className="text-slate-800">{customers.length}</strong> companies
              </div>
              <div className="flex items-center gap-4">
                <span>HACCP Coverage: <strong className="text-emerald-600 font-semibold">{pipelineMetrics.haccpRate}%</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: HubSpot Kanban / Pipeline Board View            */}
        {/* ======================================================== */}
        {viewMode === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4 items-start">
            {PIPELINE_STAGES.map((col, idx) => {
              const stageCustomers = filteredCustomers.filter(c => c.stage === col.id);
              const stageVolume = stageCustomers.reduce((acc, c) => acc + c.monthlyVolumeMetricTons, 0);
              const stageVal = stageCustomers.reduce((acc, c) => acc + c.annualContractValue, 0);

              return (
                <div
                  key={col.id}
                  className="bg-slate-100/80 border border-slate-200/80 rounded-xl p-2.5 flex flex-col min-h-[500px]"
                >
                  {/* Column Header */}
                  <div className="p-2 border-b border-slate-200 mb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800">{col.label}</span>
                      <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-2xs">
                        {stageCustomers.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1 font-medium">
                      <span>{stageVolume.toLocaleString()} MT</span>
                      <span>${(stageVal / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-2.5 flex-1">
                    {stageCustomers.map((account) => (
                      <div
                        key={account.id}
                        className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:shadow-sm transition-all space-y-2 group"
                      >
                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-1.5">
                          <div>
                            <button
                              onClick={() => setActiveRecordDetail({ type: 'company', customerId: account.id })}
                              className="font-semibold text-xs text-slate-900 hover:text-[#ff7a59] text-left line-clamp-1"
                              title="Open Company Record Detailed Page"
                            >
                              {account.companyName}
                            </button>
                            <span className="text-[10px] font-mono text-slate-400 block">{account.establishmentNumber}</span>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                              className="text-slate-400 hover:text-blue-600 p-0.5"
                              title="Open Contact Record Detailed Page"
                            >
                              <ContactIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDetailCustomer(account)}
                              className="text-slate-400 hover:text-slate-700 p-0.5"
                              title="Quick 360 Drawer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => openEditModal(account)}
                              className="text-slate-400 hover:text-slate-600 p-0.5"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setCustomerToDelete(account)}
                              className="text-slate-400 hover:text-red-500 p-0.5"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Sector Badge */}
                        <div className="flex items-center justify-between">
                          <div>{renderSectorBadge(account.sector)}</div>
                        </div>

                        {/* Primary Contact Pill */}
                        <button
                          onClick={() => setActiveRecordDetail({ type: 'contact', customerId: account.id })}
                          className="w-full text-left text-[11px] text-slate-700 hover:text-blue-600 flex items-center gap-1.5 py-1 px-1.5 bg-slate-50 border border-slate-100 rounded hover:border-blue-200 transition-colors"
                          title="Open Contact Record Page"
                        >
                          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[9px] flex items-center justify-center shrink-0">
                            {account.primaryContact.name.substring(0, 1)}
                          </span>
                          <span className="truncate font-medium">{account.primaryContact.name}</span>
                          <span className="text-[10px] text-slate-400 ml-auto shrink-0">{account.primaryContact.title}</span>
                        </button>

                        {/* Volume & Value */}
                        <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className="flex items-center gap-1 font-medium">
                            <ThermometerSnowflake className="w-3 h-3 text-cyan-500" />
                            {account.monthlyVolumeMetricTons} MT/mo
                          </span>
                          <span className="font-bold text-slate-900">
                            ${(account.annualContractValue / 1000).toFixed(0)}k
                          </span>
                        </div>

                        {/* Fast Move Pipeline Buttons */}
                        <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                          {idx > 0 ? (
                            <button
                              onClick={() => handleStageChange(account, PIPELINE_STAGES[idx - 1].id)}
                              className="hover:text-slate-700 flex items-center gap-0.5"
                              title="Move back"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              Back
                            </button>
                          ) : <span></span>}

                          {idx < PIPELINE_STAGES.length - 1 ? (
                            <button
                              onClick={() => handleStageChange(account, PIPELINE_STAGES[idx + 1].id)}
                              className="hover:text-[#ff7a59] font-semibold flex items-center gap-0.5 text-slate-600"
                              title="Advance stage"
                            >
                              Next
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              Partner
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    )}
  </main>
</>
)}

  <MockRecallModal
    isOpen={isMockRecallOpen}
    onClose={() => setIsMockRecallOpen(false)}
  />

      {/* ======================================================== */}
      {/* HubSpot Style 360 Customer Profile Drawer                */}
      {/* ======================================================== */}
      <AnimatePresence>
        {detailCustomer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailCustomer(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200"
            >
              {/* Drawer Top Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white font-bold flex items-center justify-center text-base shadow-sm">
                    {detailCustomer.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">{detailCustomer.companyName}</h2>
                      {renderStageBadge(detailCustomer.stage)}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {detailCustomer.establishmentNumber} • {detailCustomer.facilityLocation.city}, {detailCustomer.facilityLocation.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const c = detailCustomer;
                      setDetailCustomer(null);
                      setActiveRecordDetail({ type: 'contact', customerId: c.id });
                    }}
                    className="px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
                  >
                    Contact Record Page ↗
                  </button>
                  <button
                    onClick={() => {
                      const c = detailCustomer;
                      setDetailCustomer(null);
                      setActiveRecordDetail({ type: 'company', customerId: c.id });
                    }}
                    className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Company Record Page ↗
                  </button>
                  <button
                    onClick={() => {
                      const c = detailCustomer;
                      setDetailCustomer(null);
                      openEditModal(c);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    Edit properties
                  </button>
                  <button
                    onClick={() => setDetailCustomer(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Body: 2-Column HubSpot Architecture */}
              <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
                
                {/* Left Properties Column */}
                <div className="w-full md:w-72 border-r border-slate-200 p-5 space-y-5 bg-slate-50/40 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block mb-3">
                      About this Company
                    </span>
                    <div className="space-y-3">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Lifecycle Stage:</span>
                        <select
                          value={detailCustomer.stage}
                          onChange={(e) => handleStageChange(detailCustomer, e.target.value as PipelineStage)}
                          className="w-full mt-1 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-medium text-slate-800"
                        >
                          {PIPELINE_STAGES.map(s => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Industry Sector:</span>
                        <div className="mt-1">{renderSectorBadge(detailCustomer.sector)}</div>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Primary Contact:</span>
                        <span className="font-semibold text-slate-800 block mt-0.5">{detailCustomer.primaryContact.name}</span>
                        <span className="text-slate-500 text-[11px] block">{detailCustomer.primaryContact.title}</span>
                        <a href={`mailto:${detailCustomer.primaryContact.email}`} className="text-[#ff7a59] hover:underline block mt-0.5">
                          {detailCustomer.primaryContact.email}
                        </a>
                        <span className="text-slate-500 block">{detailCustomer.primaryContact.phone}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Cold Chain SLA:</span>
                        <span className="font-medium text-slate-800 block mt-0.5">{detailCustomer.coldChainSpec}</span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Monthly Volume:</span>
                        <span className="font-bold text-slate-900 text-sm block mt-0.5">
                          {detailCustomer.monthlyVolumeMetricTons.toLocaleString()} MT
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Annual Contract Value:</span>
                        <span className="font-bold text-emerald-600 text-sm block mt-0.5">
                          ${detailCustomer.annualContractValue.toLocaleString()} USD
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block text-[11px]">Facility Address:</span>
                        <span className="text-slate-700 block mt-0.5">
                          {detailCustomer.facilityLocation.address}<br />
                          {detailCustomer.facilityLocation.city}, {detailCustomer.facilityLocation.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Certifications Section */}
                  <div className="pt-4 border-t border-slate-200">
                    <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block mb-2">
                      Verified Certifications
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {detailCustomer.certifications.map((cert, idx) => (
                        <span key={idx} className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center / Right Column: Activity, Notes, Tasks */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* HubSpot Activity Header Tabs */}
                  <div className="flex items-center gap-4 border-b border-slate-200 pb-2 text-xs font-semibold">
                    <button
                      onClick={() => setActiveDrawerTab('activity')}
                      className={`pb-2 transition-colors border-b-2 ${
                        activeDrawerTab === 'activity'
                          ? 'border-[#ff7a59] text-[#ff7a59]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Activity Timeline ({detailCustomer.notesList.length})
                    </button>
                    <button
                      onClick={() => setActiveDrawerTab('notes')}
                      className={`pb-2 transition-colors border-b-2 ${
                        activeDrawerTab === 'notes'
                          ? 'border-[#ff7a59] text-[#ff7a59]'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Log Note / Call / Task
                    </button>
                  </div>

                  {/* Tab 1: Activity Timeline */}
                  {activeDrawerTab === 'activity' && (
                    <div className="flex-1 py-4 space-y-3 overflow-y-auto">
                      {/* Fast Note Creation Banner inside Activity tab */}
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
                        <textarea
                          placeholder="Leave a quick CRM note or call update on this food processor..."
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          rows={2}
                          className="w-full p-2 bg-white border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:border-[#ff7a59] resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <select
                              value={newNoteType}
                              onChange={(e) => setNewNoteType(e.target.value as any)}
                              className="bg-white border border-slate-200 text-xs rounded px-2 py-1 text-slate-700"
                            >
                              <option value="note">Note</option>
                              <option value="call">Call Log</option>
                              <option value="task">Action Task</option>
                            </select>
                          </div>
                          <button
                            onClick={handleAddNoteToDetail}
                            disabled={!newNoteContent.trim()}
                            className="px-3 py-1 bg-[#ff7a59] hover:bg-[#e06545] disabled:opacity-50 text-white rounded text-xs font-semibold"
                          >
                            Save Activity
                          </button>
                        </div>
                      </div>

                      {/* Timeline Events */}
                      <div className="space-y-3 pt-2">
                        {detailCustomer.notesList.map((note) => (
                          <div key={note.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs space-y-1">
                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                              <span className="font-semibold text-slate-700 capitalize flex items-center gap-1.5">
                                {note.type === 'call' && <PhoneCall className="w-3.5 h-3.5 text-blue-500" />}
                                {note.type === 'audit' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />}
                                {note.type === 'task' && <CheckSquare className="w-3.5 h-3.5 text-purple-500" />}
                                {note.type === 'note' && <FileText className="w-3.5 h-3.5 text-amber-500" />}
                                {note.type} by {note.author}
                              </span>
                              <span>{note.date}</span>
                            </div>
                            <p className="text-xs text-slate-800 leading-relaxed">{note.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Detailed Note Logger */}
                  {activeDrawerTab === 'notes' && (
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700">Activity Type</label>
                        <div className="flex gap-2">
                          {[
                            { id: 'note', label: 'General Note', icon: FileText },
                            { id: 'call', label: 'Phone Call', icon: PhoneCall },
                            { id: 'task', label: 'Inspection Task', icon: CheckSquare }
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => setNewNoteType(t.id as any)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
                                newNoteType === t.id
                                  ? 'bg-orange-50 border-[#ff7a59] text-[#ff7a59]'
                                  : 'bg-white border-slate-200 text-slate-600'
                              }`}
                            >
                              <t.icon className="w-3.5 h-3.5" />
                              <span>{t.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-slate-700">Activity Notes & Cold-Chain Minutes</label>
                        <textarea
                          rows={6}
                          placeholder="Record details of the discussion, plant audit findings, pallet volume commitments..."
                          value={newNoteContent}
                          onChange={(e) => setNewNoteContent(e.target.value)}
                          className="w-full p-3 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#ff7a59]/30"
                        />
                      </div>

                      <button
                        onClick={handleAddNoteToDetail}
                        disabled={!newNoteContent.trim()}
                        className="px-4 py-2 bg-[#ff7a59] hover:bg-[#e06545] disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-2xs"
                      >
                        Log to Customer History
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => {
                    const toDel = detailCustomer;
                    setDetailCustomer(null);
                    setCustomerToDelete(toDel);
                  }}
                  className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  De-register company
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDetailCustomer(null)}
                    className="px-4 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* HubSpot Style "Create / Edit Company" Modal              */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingCustomer ? 'Edit Company' : 'Create Company'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Food & protein processing account record with cold-chain specifications
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-5">
                <form id="hubspot-company-form" onSubmit={handleSaveCustomer} className="space-y-4">
                  
                  {/* Basic Identifiers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
                      <input
                        id="form-company-name"
                        type="text"
                        placeholder="e.g. Apex Primal Beef LLC"
                        value={formValues.companyName || ''}
                        onChange={e => setFormValues({ ...formValues, companyName: e.target.value })}
                        className={`w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] ${
                          formErrors.companyName ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.companyName && <p className="text-[11px] text-red-500 mt-0.5">{formErrors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Est / Reg # *</label>
                      <input
                        id="form-est-number"
                        type="text"
                        placeholder="e.g. USDA-EST-4892A"
                        value={formValues.establishmentNumber || ''}
                        onChange={e => setFormValues({ ...formValues, establishmentNumber: e.target.value })}
                        className={`w-full px-3 py-1.5 bg-white border rounded text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] ${
                          formErrors.establishmentNumber ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {formErrors.establishmentNumber && <p className="text-[11px] text-red-500 mt-0.5">{formErrors.establishmentNumber}</p>}
                    </div>
                  </div>

                  {/* Sector & Pipeline Stage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Industry Sector</label>
                      <select
                        id="form-sector"
                        value={formValues.sector || 'Meat & Beef Processing'}
                        onChange={e => setFormValues({ ...formValues, sector: e.target.value as IndustrySector })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                      >
                        <option value="Meat & Beef Processing">Meat & Beef Processing</option>
                        <option value="Poultry Integration">Poultry Integration</option>
                        <option value="Seafood & Aquaculture">Seafood & Aquaculture</option>
                        <option value="Further Food Processing">Further Food Processing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Pipeline Stage</label>
                      <select
                        id="form-stage"
                        value={formValues.stage || 'Lead / Inbound'}
                        onChange={e => setFormValues({ ...formValues, stage: e.target.value as PipelineStage })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                      >
                        {PIPELINE_STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Primary Contact
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name *</label>
                        <input
                          id="form-contact-name"
                          type="text"
                          placeholder="e.g. Marcus Vance"
                          value={formValues.primaryContact?.name || ''}
                          onChange={e => setFormValues({
                            ...formValues,
                            primaryContact: { ...formValues.primaryContact!, name: e.target.value }
                          })}
                          className={`w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] ${
                            formErrors.contactName ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {formErrors.contactName && <p className="text-[11px] text-red-500 mt-0.5">{formErrors.contactName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                        <input
                          id="form-contact-email"
                          type="email"
                          placeholder="m.vance@apexprimal.com"
                          value={formValues.primaryContact?.email || ''}
                          onChange={e => setFormValues({
                            ...formValues,
                            primaryContact: { ...formValues.primaryContact!, email: e.target.value }
                          })}
                          className={`w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] ${
                            formErrors.contactEmail ? 'border-red-500' : 'border-slate-300'
                          }`}
                        />
                        {formErrors.contactEmail && <p className="text-[11px] text-red-500 mt-0.5">{formErrors.contactEmail}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Cold Chain & Volume */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Throughput & Volume SLA
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Cold Chain Specification</label>
                        <select
                          id="form-cold-chain"
                          value={formValues.coldChainSpec || 'Deep Freeze (-25°C to -18°C)'}
                          onChange={e => setFormValues({ ...formValues, coldChainSpec: e.target.value as ColdChainTier })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                        >
                          <option value="Deep Freeze (-25°C to -18°C)">Deep Freeze (-25°C to -18°C)</option>
                          <option value="Chilled Storage (0°C to 4°C)">Chilled Storage (0°C to 4°C)</option>
                          <option value="IQF (Individually Quick Frozen)">IQF (Individually Quick Frozen)</option>
                          <option value="Dry Aging / Climate Controlled">Dry Aging / Climate Controlled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Volume (MT)</label>
                        <input
                          id="form-volume"
                          type="number"
                          min="1"
                          placeholder="e.g. 500"
                          value={formValues.monthlyVolumeMetricTons || ''}
                          onChange={e => setFormValues({ ...formValues, monthlyVolumeMetricTons: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Certifications Checklist */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Food Safety Certifications</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {AVAILABLE_CERTIFICATIONS.map(cert => {
                        const isChecked = (formValues.certifications || []).includes(cert);
                        return (
                          <button
                            key={cert}
                            type="button"
                            onClick={() => handleToggleCertification(cert)}
                            className={`px-2 py-1.5 text-[11px] font-medium rounded border text-left flex items-center justify-between transition-colors ${
                              isChecked
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span>{cert}</span>
                            {isChecked && <Check className="w-3 h-3 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Location City */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                      <input
                        id="form-city"
                        type="text"
                        placeholder="e.g. Omaha"
                        value={formValues.facilityLocation?.city || ''}
                        onChange={e => setFormValues({
                          ...formValues,
                          facilityLocation: { ...formValues.facilityLocation!, city: e.target.value }
                        })}
                        className={`w-full px-3 py-1.5 bg-white border rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] ${
                          formErrors.city ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Annual Contract Value ($)</label>
                      <input
                        id="form-contract-val"
                        type="number"
                        placeholder="750000"
                        value={formValues.annualContractValue || ''}
                        onChange={e => setFormValues({ ...formValues, annualContractValue: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="hubspot-company-form"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#ff7a59] hover:bg-[#e06545] rounded shadow-xs"
                >
                  {editingCustomer ? 'Save changes' : 'Create company'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* Delete Confirmation Dialog                               */}
      {/* ======================================================== */}
      <AnimatePresence>
        {customerToDelete && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete company record?</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Are you sure you want to permanently delete{' '}
                  <strong className="text-slate-900">{customerToDelete.companyName}</strong> ({customerToDelete.establishmentNumber})?
                  All activity logs, cold-chain specifications, and pipeline history will be deleted.
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomerToDelete(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-xs"
                >
                  Delete company
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* ======================================================== */}
      {/* Single HTML Format Export & Code Inspector Modal        */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isSingleHtmlModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">Single HTML Format CRM</h3>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                        Self-Contained File
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Standalone single-file HTML format with embedded styles, icons, and full CRUD engine
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsSingleHtmlModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadSingleHtml}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download standalone .html</span>
                  </button>
                  <a
                    href="/standalone.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-xs transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span>Open in new tab</span>
                  </a>
                </div>

                <button
                  onClick={handleCopySingleHtml}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-xs border transition-all ${
                    isCopiedHtml
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-800 hover:bg-slate-900 text-white border-slate-800'
                  }`}
                >
                  {isCopiedHtml ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" />
                      <span>Copied HTML!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-300" />
                      <span>Copy Single HTML Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Preview Box */}
              <div className="flex-1 overflow-y-auto p-4 bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed select-all">
                <pre className="whitespace-pre-wrap break-all">
                  {STANDALONE_HTML_CONTENT}
                </pre>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span>File size: ~28 KB • No build tools or Node.js required to run</span>
                <button
                  onClick={() => setIsSingleHtmlModalOpen(false)}
                  className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
