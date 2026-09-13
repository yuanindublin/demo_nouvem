'use client';

import React, { useState, useMemo } from 'react';
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  Search,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Plus,
  Settings,
  ShieldCheck,
  FileText,
  PhoneCall,
  CheckSquare,
  DollarSign,
  TrendingUp,
  ThermometerSnowflake,
  Edit3,
  Trash2,
  X,
  MessageSquare,
  HelpCircle,
  ArrowLeft,
  Share2
} from 'lucide-react';
import { CustomerAccount, CustomerNote, PipelineStage } from '@/app/page';

export interface HubSpotRecordDetailProps {
  type: 'contact' | 'company';
  account: CustomerAccount;
  allAccounts: CustomerAccount[];
  onBack: () => void;
  onSwitchRecord: (type: 'contact' | 'company', accountId: string) => void;
  onUpdateAccount: (updated: CustomerAccount) => void;
  onDeleteAccount: (accountId: string) => void;
  onEditAccount: (account: CustomerAccount) => void;
  showToast: (msg: string) => void;
}

export default function HubSpotRecordDetail({
  type,
  account,
  allAccounts,
  onBack,
  onSwitchRecord,
  onUpdateAccount,
  onDeleteAccount,
  onEditAccount,
  showToast
}: HubSpotRecordDetailProps) {
  // Tabs: About, Activities, Revenue, Intelligence, Customize
  const [activeTab, setActiveTab] = useState<'about' | 'activities' | 'revenue' | 'intelligence'>('activities');

  // Left sidebar accordion
  const [isKeyInfoOpen, setIsKeyInfoOpen] = useState(true);
  const [isActionsDropdownOpen, setIsActionsDropdownOpen] = useState(false);

  // Activities tab states
  const [activityFilter, setActivityFilter] = useState<'all' | 'note' | 'email' | 'call' | 'task' | 'meeting'>('all');
  const [activitySearchQuery, setActivitySearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(true);
  const [composerType, setComposerType] = useState<'note' | 'call' | 'email' | 'task' | 'meeting'>('note');
  const [composerContent, setComposerContent] = useState('');
  const [composerDuration, setComposerDuration] = useState('15 mins');
  const [composerSubject, setComposerSubject] = useState('');

  // Breeze AI states
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<'up' | 'down' | null>(null);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAnsweringAi, setIsAnsweringAi] = useState(false);

  // Associated modals
  const [isAddDealOpen, setIsAddDealOpen] = useState(false);
  const [newDealName, setNewDealName] = useState('');
  const [newDealAmount, setNewDealAmount] = useState('');
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [newTicketName, setNewTicketName] = useState('');

  // Domain computation
  const domainName = useMemo(() => {
    const raw = account.companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 15);
    return `${raw || 'businessexample'}.com`;
  }, [account.companyName]);

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard`);
  };

  // Stage change with auto timeline logging
  const handleStageChange = (newStage: PipelineStage) => {
    if (newStage === account.stage) return;
    const oldStage = account.stage;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}`;

    const lifecycleNote: CustomerNote = {
      id: 'log-' + Date.now(),
      author: 'Thalita Milan',
      date: formattedDate,
      type: 'task',
      content: `Thalita Milan updated the lifecycle stage for this ${type} from ${oldStage} to ${newStage}.`
    };

    const updatedAccount: CustomerAccount = {
      ...account,
      stage: newStage,
      notesList: [lifecycleNote, ...account.notesList]
    };

    onUpdateAccount(updatedAccount);
    showToast(`Updated lifecycle stage to ${newStage}`);
  };

  // Activity submit
  const handleSaveActivity = () => {
    if (!composerContent.trim()) return;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}`;

    let content = composerContent.trim();
    if (composerType === 'call') {
      content = `[Outbound Call - ${composerDuration}] ${content}`;
    } else if (composerType === 'email') {
      content = `[Email Subject: ${composerSubject || 'Supply Specification'}] ${content}`;
    } else if (composerType === 'meeting') {
      content = `[Meeting Log] ${content}`;
    }

    const newNote: CustomerNote = {
      id: 'act-' + Date.now(),
      author: 'Thalita Milan',
      date: formattedDate,
      type: composerType === 'email' || composerType === 'meeting' ? 'note' : composerType,
      content
    };

    const updatedAccount: CustomerAccount = {
      ...account,
      notesList: [newNote, ...account.notesList]
    };

    onUpdateAccount(updatedAccount);
    setComposerContent('');
    setComposerSubject('');
    showToast(`Activity logged for ${type === 'contact' ? account.primaryContact.name : account.companyName}`);
  };

  // Filtered timeline notes
  const filteredNotes = useMemo(() => {
    return account.notesList.filter(note => {
      if (activitySearchQuery) {
        const q = activitySearchQuery.toLowerCase();
        if (!note.content.toLowerCase().includes(q) && !note.author.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (activityFilter === 'note') return note.type === 'note' && !note.content.startsWith('[Email');
      if (activityFilter === 'call') return note.type === 'call' || note.content.startsWith('[Outbound Call');
      if (activityFilter === 'task') return note.type === 'task' || note.type === 'audit';
      if (activityFilter === 'email') return note.content.startsWith('[Email');
      if (activityFilter === 'meeting') return note.content.startsWith('[Meeting');
      return true;
    });
  }, [account.notesList, activityFilter, activitySearchQuery]);

  // AI Q&A answering simulation based on real record data
  const handleAskAiQuestion = (customQ?: string) => {
    const q = (customQ || aiQuestion).trim();
    if (!q) return;
    setIsAnsweringAi(true);
    setAiAnswer(null);

    setTimeout(() => {
      let ans = '';
      const lq = q.toLowerCase();
      if (lq.includes('temperature') || lq.includes('cold chain') || lq.includes('freeze')) {
        ans = `${account.companyName} operates under continuous specification of ${account.coldChainSpec}. The primary plant at ${account.establishmentNumber} utilizes real-time temperature loggers with zero thermal excursions logged this month.`;
      } else if (lq.includes('audit') || lq.includes('haccp') || lq.includes('cert')) {
        ans = `Last food safety inspection was recorded on ${account.lastAuditDate} with the next scheduled audit due on ${account.nextAuditDate}. Active certifications include: ${account.certifications.join(', ')}.`;
      } else if (lq.includes('volume') || lq.includes('tonnage') || lq.includes('mt')) {
        ans = `The facility currently has an estimated throughput of ${account.monthlyVolumeMetricTons.toLocaleString()} Metric Tons per month, representing an annual contract value of $${account.annualContractValue.toLocaleString()}.`;
      } else if (lq.includes('payment') || lq.includes('term') || lq.includes('net')) {
        ans = `Commercial payment terms are structured as ${account.paymentTerms}, tied to Certificate of Analysis (COA) verification upon arrival.`;
      } else {
        ans = `${type === 'contact' ? account.primaryContact.name : account.companyName} is in the "${account.stage}" pipeline stage. Key stakeholders are aligned on maintaining cold-chain compliance and throughput quotas.`;
      }
      setAiAnswer(ans);
      setIsAnsweringAi(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f5f8fa] min-h-[calc(100vh-3.5rem)] text-slate-800">
      
      {/* Top Header Bar for Record Detail */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium transition-colors p-1 rounded hover:bg-slate-100"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {type === 'contact' ? 'Contacts' : 'Companies'}</span>
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900 truncate max-w-xs">
            {type === 'contact' ? account.primaryContact.name : account.companyName}
          </span>
          <span className={`px-2 py-0.5 rounded-full font-medium text-[11px] ${
            account.stage === 'Active Supply Partner' ? 'bg-emerald-100 text-emerald-800' :
            account.stage === 'Contract Negotiation' ? 'bg-purple-100 text-purple-800' :
            account.stage === 'Plant & HACCP Audit' ? 'bg-blue-100 text-blue-800' :
            account.stage === 'Sample & Spec Review' ? 'bg-amber-100 text-amber-800' :
            'bg-slate-100 text-slate-700'
          }`}>
            {account.stage}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {type === 'contact' ? (
            <button
              onClick={() => onSwitchRecord('company', account.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>View Company Record</span>
            </button>
          ) : (
            <button
              onClick={() => onSwitchRecord('contact', account.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>View Contact Record</span>
            </button>
          )}
          <button
            onClick={() => onEditAccount(account)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-[#ff7a59] hover:bg-[#e06545] rounded transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit {type === 'contact' ? 'Contact' : 'Company'}</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column HubSpot Record Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: Record Properties, Quick Actions, Key Info  */}
        {/* ======================================================== */}
        <aside className="w-full lg:w-80 bg-white border-r border-slate-200 p-5 flex flex-col gap-5 shrink-0 overflow-y-auto max-h-none lg:max-h-[calc(100vh-6.5rem)]">
          
          {/* Top Breadcrumb & Actions Button */}
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>&lt; {type === 'contact' ? 'Contacts' : 'Companies'}</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsActionsDropdownOpen(!isActionsDropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100"
              >
                <span>Actions</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {isActionsDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 text-xs">
                  <button
                    onClick={() => {
                      setIsActionsDropdownOpen(false);
                      onEditAccount(account);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Edit Properties</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsActionsDropdownOpen(false);
                      handleCopy(window.location.href, 'record link');
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Record Link</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsActionsDropdownOpen(false);
                      onDeleteAccount(account.id);
                    }}
                    className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    <span>Delete {type === 'contact' ? 'Contact' : 'Company'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Record Identity Header */}
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0">
                {type === 'contact' ? (
                  account.primaryContact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                ) : (
                  <Building2 className="w-6 h-6 text-slate-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg font-bold text-slate-900 truncate tracking-tight">
                    {type === 'contact' ? account.primaryContact.name : account.companyName}
                  </h1>
                  <button
                    onClick={() => onEditAccount(account)}
                    title="Edit name"
                    className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {type === 'contact' ? (
                  <button
                    onClick={() => onSwitchRecord('company', account.id)}
                    className="text-xs text-slate-600 hover:text-[#ff7a59] font-medium block truncate text-left mt-0.5"
                  >
                    {account.companyName}
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                    <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded font-medium text-slate-600">
                      {account.establishmentNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Email / Domain link */}
            <div className="flex items-center gap-2 text-xs pt-1">
              {type === 'contact' ? (
                <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px] truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${account.primaryContact.email}`}
                    className="truncate hover:text-[#ff7a59] underline decoration-slate-300"
                  >
                    {account.primaryContact.email}
                  </a>
                  <button
                    onClick={() => handleCopy(account.primaryContact.email, 'email')}
                    title="Copy email"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-slate-600 text-xs truncate">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate font-medium">{domainName}</span>
                  <button
                    onClick={() => handleCopy(domainName, 'domain')}
                    title="Copy domain"
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (6 Round HubSpot Buttons) */}
          <div className="grid grid-cols-6 gap-2 text-center pt-1 border-t border-slate-100">
            {[
              { id: 'note', label: 'Note', icon: FileText, action: () => { setActiveTab('activities'); setComposerType('note'); setIsComposerOpen(true); } },
              { id: 'email', label: 'Email', icon: Mail, action: () => { setActiveTab('activities'); setComposerType('email'); setIsComposerOpen(true); } },
              { id: 'call', label: 'Call', icon: PhoneCall, action: () => { setActiveTab('activities'); setComposerType('call'); setIsComposerOpen(true); } },
              { id: 'task', label: 'Task', icon: CheckSquare, action: () => { setActiveTab('activities'); setComposerType('task'); setIsComposerOpen(true); } },
              { id: 'meeting', label: 'Meeting', icon: Calendar, action: () => { setActiveTab('activities'); setComposerType('meeting'); setIsComposerOpen(true); } },
              { id: 'more', label: 'More', icon: MoreHorizontal, action: () => setIsActionsDropdownOpen(true) }
            ].map(item => (
              <button
                key={item.id}
                onClick={item.action}
                className="flex flex-col items-center gap-1 text-slate-600 hover:text-[#ff7a59] group"
              >
                <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:border-[#ff7a59] group-hover:bg-orange-50/50 transition-colors shadow-2xs">
                  <item.icon className="w-4 h-4 text-slate-600 group-hover:text-[#ff7a59]" />
                </div>
                <span className="text-[10px] font-medium leading-none">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Key Information Accordion Card */}
          <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
            <button
              onClick={() => setIsKeyInfoOpen(!isKeyInfoOpen)}
              className="w-full px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                {isKeyInfoOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronUp className="w-4 h-4 text-slate-500" />}
                <span>Key information</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-normal">
                <span className="text-[11px]">Actions ▾</span>
                <Settings className="w-3.5 h-3.5" />
              </div>
            </button>

            {isKeyInfoOpen && (
              <div className="p-4 space-y-3.5 text-xs">
                {/* Lifecycle Stage dropdown */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Lifecycle Stage</label>
                  <select
                    value={account.stage}
                    onChange={(e) => handleStageChange(e.target.value as PipelineStage)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                  >
                    <option value="Lead / Inbound">Lead / Inbound</option>
                    <option value="Sample & Spec Review">Sample & Spec Review</option>
                    <option value="Plant & HACCP Audit">Plant & HACCP Audit</option>
                    <option value="Contract Negotiation">Contract Negotiation</option>
                    <option value="Active Supply Partner">Active Supply Partner</option>
                  </select>
                </div>

                {type === 'contact' ? (
                  <>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">Email</span>
                      <span className="text-xs text-slate-800 font-mono select-all">{account.primaryContact.email}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">Country/Region</span>
                      <span className="text-xs text-slate-800 font-semibold flex items-center gap-1">
                        <span>🇮🇪 Ireland (爱尔兰)</span>
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">Phone Number</span>
                      <span className="text-xs text-slate-800 font-mono">{account.primaryContact.phone}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">Bord Bia 资质审核</span>
                      <span className="text-xs font-semibold">
                        {account.hasBordBiaMark !== false ? (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                            ✓ Quality Mark 认证通过
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-50 border border-rose-300 px-1.5 py-0.5 rounded inline-flex items-center gap-1">
                            ⛔ 资质缺失 (阻断出库)
                          </span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">商超截单窗口 (SLA Cut-Off)</span>
                      <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                        {account.slaCutOffTime || '06:00 AM Morning Gate'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">OTIF 履约达标率</span>
                      <span className="text-xs font-bold text-emerald-600">
                        {account.otifRate ? `${account.otifRate}%` : '99.4%'} (目标 &gt;98.5%)
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">约定商业账期</span>
                      <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {account.paymentTerms || 'Net 30 Days'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">当前 A/R 应收未结</span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        €{(account.outstandingAr || 280000).toLocaleString()}{' '}
                        {(account.overdueDays || 0) > 0 ? (
                          <span className="text-rose-600 font-normal text-[11px]">(逾期 {account.overdueDays}天)</span>
                        ) : (
                          <span className="text-emerald-600 font-normal text-[11px]">(准时)</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">DAFM 兽医检验厂号</span>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                        {account.establishmentNumber}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">Company owner</span>
                      <span className="text-xs text-slate-800">Alex Rivera (Key Account Director)</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">爱尔兰国家食品局 (Bord Bia)</span>
                      <span className="text-xs font-semibold">
                        {account.hasBordBiaMark !== false ? (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-flex items-center gap-1">
                            ✓ Quality Mark Certified
                          </span>
                        ) : (
                          <span className="text-rose-700 bg-rose-50 border border-rose-300 px-2 py-0.5 rounded inline-flex items-center gap-1 font-bold">
                            ⛔ 资质缺失 (阻断发货)
                          </span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">DAFM & FSAI 厂号</span>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {account.establishmentNumber}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">商超冷链截单窗口</span>
                      <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 inline-block">
                        {account.slaCutOffTime || '06:00 AM Morning Gate'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">OTIF 履约达标率</span>
                      <span className="text-xs font-bold text-emerald-600">
                        {account.otifRate ? `${account.otifRate}%` : '99.4%'} (合格)
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">账期与授信额度</span>
                      <span className="text-xs font-semibold text-slate-800">
                        {account.paymentTerms || 'Net 30 Days'} (限额 €{(account.creditLimit || 500000).toLocaleString()})
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">当前 A/R 余额</span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        €{(account.outstandingAr || 280000).toLocaleString()}{' '}
                        {(account.overdueDays || 0) > 0 ? (
                          <span className="text-rose-600 font-semibold text-[11px]">(逾期 {account.overdueDays}天)</span>
                        ) : (
                          <span className="text-emerald-600 font-semibold text-[11px]">(正常无超期)</span>
                        )}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">冷链温控规范 (Cold Chain)</span>
                      <span className="text-xs text-slate-800">{account.coldChainSpec}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-medium text-slate-400">上次 FSAI / HACCP 审计</span>
                      <span className="text-xs text-slate-800">{account.lastAuditDate} (下次: {account.nextAuditDate})</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ======================================================== */}
        {/* MIDDLE COLUMN: Tab bar (About, Activities, Revenue, QA)   */}
        {/* ======================================================== */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto max-h-none lg:max-h-[calc(100vh-6.5rem)] space-y-5">
          
          {/* Main Middle Tab Navigation */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-1 text-xs font-semibold">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-2.5 transition-colors border-b-2 font-semibold ${
                  activeTab === 'about'
                    ? 'border-[#ff7a59] text-[#ff7a59]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('activities')}
                className={`pb-2.5 transition-colors border-b-2 font-semibold flex items-center gap-1.5 ${
                  activeTab === 'activities'
                    ? 'border-[#ff7a59] text-[#ff7a59]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Activities</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full text-[10px]">
                  {account.notesList.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('revenue')}
                className={`pb-2.5 transition-colors border-b-2 font-semibold ${
                  activeTab === 'revenue'
                    ? 'border-[#ff7a59] text-[#ff7a59]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveTab('intelligence')}
                className={`pb-2.5 transition-colors border-b-2 font-semibold flex items-center gap-1 ${
                  activeTab === 'intelligence'
                    ? 'border-[#ff7a59] text-[#ff7a59]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Intelligence & QA</span>
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
              </button>
            </div>

            <button className="text-slate-500 hover:text-slate-800 flex items-center gap-1 pb-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          </div>

          {/* TAB 1: ABOUT (Screenshot 1 Layout) */}
          {activeTab === 'about' && (
            <div className="space-y-5">
              
              {/* Breeze Record Summary Card with AI Badge */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900">Breeze record summary</h2>
                    <span className="px-1.5 py-0.5 bg-[#ff2a85] text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-2xs">
                      <Sparkles className="w-2.5 h-2.5" />
                      + AI
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span>Generated Mar 13, 2026</span>
                    <button
                      onClick={() => showToast('Refreshed Breeze AI summary')}
                      className="hover:text-slate-600"
                    >
                      🔄
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-lg space-y-3">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {type === 'contact' ? (
                      <>
                        <strong className="text-slate-900 font-semibold">{account.primaryContact.name}</strong> serves as {account.primaryContact.title} for{' '}
                        <strong className="text-slate-900 font-semibold">{account.companyName}</strong> ({account.establishmentNumber}). Primary operational responsibility involves overseeing{' '}
                        <strong className="text-slate-900 font-semibold">{account.monthlyVolumeMetricTons.toLocaleString()} MT/month</strong> of {account.sector.toLowerCase()} under strict{' '}
                        <strong className="text-slate-900 font-semibold">{account.coldChainSpec}</strong> protocols. Commercial delivery adheres to the <strong className="text-amber-800">{account.slaCutOffTime || '06:00 AM Morning Gate'}</strong> SLA deadline with Bord Bia Quality Mark status <strong className={account.hasBordBiaMark !== false ? "text-emerald-700" : "text-rose-700"}>{account.hasBordBiaMark !== false ? "Active Certified" : "Blocked / Non-Compliant"}</strong>.
                      </>
                    ) : (
                      <>
                        <strong className="text-slate-900 font-semibold">{account.companyName}</strong> operates under DAFM/FSAI plant registration <span className="font-mono font-bold text-slate-900">{account.establishmentNumber}</span> in {account.facilityLocation.city}, {account.facilityLocation.state}. Current pipeline throughput stands at <strong className="text-slate-900">{account.monthlyVolumeMetricTons.toLocaleString()} MT/mo</strong> with annual contract value of <strong className="text-blue-700">€{account.annualContractValue.toLocaleString()}</strong> ({account.paymentTerms || 'Net 30 Days'}). Delivery commitment maintains <strong className="text-emerald-700">{account.otifRate ? `${account.otifRate}%` : '99.4%'} OTIF</strong> into regional supermarket distribution hubs.
                      </>
                    )}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-3 text-slate-400">
                      <button
                        onClick={() => { setAiFeedback('up'); showToast('Thank you for your feedback'); }}
                        className={`hover:text-slate-700 ${aiFeedback === 'up' ? 'text-emerald-600' : ''}`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => { setAiFeedback('down'); showToast('Thank you for your feedback'); }}
                        className={`hover:text-slate-700 ${aiFeedback === 'down' ? 'text-red-500' : ''}`}
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(`Breeze AI Summary: ${account.companyName} (${account.primaryContact.name}) - Volume: ${account.monthlyVolumeMetricTons} MT. Cold Chain: ${account.coldChainSpec}`);
                          setCopiedSummary(true);
                          setTimeout(() => setCopiedSummary(false), 2000);
                          showToast('Summary copied');
                        }}
                        className="hover:text-slate-700 flex items-center gap-1"
                      >
                        {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={() => setIsAskAiOpen(!isAskAiOpen)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#ff2a85]/40 text-[#ff2a85] hover:bg-pink-50 rounded-md text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isAskAiOpen ? 'Close AI Assistant' : '+ Ask a question'}</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Breeze AI Q&A Panel */}
                {isAskAiOpen && (
                  <div className="p-4 bg-pink-50/40 border border-pink-200/70 rounded-lg space-y-3 mt-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-pink-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#ff2a85]" />
                        Ask Breeze about this {type}
                      </span>
                      <span className="text-[11px] text-slate-400">Grounded in plant & CRM data</span>
                    </div>

                    {/* Quick suggestion chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'What is the cold chain SLA?',
                        'When is the next inspection?',
                        'What are the commercial payment terms?',
                        'What is the monthly throughput?'
                      ].map(chip => (
                        <button
                          key={chip}
                          onClick={() => {
                            setAiQuestion(chip);
                            handleAskAiQuestion(chip);
                          }}
                          className="px-2.5 py-1 bg-white border border-pink-200 text-slate-700 hover:text-pink-900 hover:border-pink-300 rounded text-[11px] transition-colors"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type any question about this account..."
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskAiQuestion()}
                        className="flex-1 px-3 py-1.5 bg-white border border-pink-200 rounded text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#ff2a85]"
                      />
                      <button
                        onClick={() => handleAskAiQuestion()}
                        disabled={isAnsweringAi || !aiQuestion.trim()}
                        className="px-3 py-1.5 bg-[#ff2a85] hover:bg-[#e01f73] disabled:opacity-50 text-white rounded text-xs font-semibold"
                      >
                        {isAnsweringAi ? 'Thinking...' : 'Ask'}
                      </button>
                    </div>

                    {aiAnswer && (
                      <div className="p-3 bg-white border border-pink-100 rounded text-xs text-slate-800 space-y-1">
                        <span className="font-bold text-[#ff2a85] block text-[11px]">Breeze Intelligence Answer:</span>
                        <p className="leading-relaxed">{aiAnswer}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Company Profile Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    {type === 'contact' ? 'Contact profile' : 'Company profile'}
                  </h3>
                  <button className="text-slate-400 hover:text-slate-600">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">City</span>
                    <span className="text-slate-800 font-medium">{account.facilityLocation.city}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">Street address</span>
                    <span className="text-slate-800 font-medium">{account.facilityLocation.address}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">Postal code</span>
                    <span className="text-slate-800 font-mono">68102</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">State/Region</span>
                    <span className="text-slate-800 font-medium">{account.facilityLocation.state}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">Country/Region</span>
                    <span className="text-slate-800 font-medium">{account.facilityLocation.country}</span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">Industry</span>
                    <span className="text-slate-800 font-medium">{account.sector}</span>
                  </div>
                </div>
              </div>

              {/* Signals Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Signals</h3>
                    <span className="text-xs text-slate-500">Buyer Intent & Food Supply Indicators</span>
                  </div>
                  <button className="text-xs text-[#ff7a59] hover:underline font-semibold">View all</button>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                      <span className="font-semibold text-slate-800 block">High Procurement Velocity</span>
                      <span className="text-slate-500 text-[11px]">Multiple inquiries logged for Q4 frozen protein contracts</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Score: 92/100
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITIES (Screenshot 2 Layout) */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              
              {/* Search activities & Collapse all bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search activities"
                    value={activitySearchQuery}
                    onChange={(e) => setActivitySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsComposerOpen(!isComposerOpen)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs"
                  >
                    <span>{isComposerOpen ? 'Hide Composer' : '+ Log Activity'}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: Activity, Notes, Emails, Calls, Tasks, Meetings */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium">
                {[
                  { id: 'all', label: 'Activity' },
                  { id: 'note', label: 'Notes' },
                  { id: 'email', label: 'Emails' },
                  { id: 'call', label: 'Calls' },
                  { id: 'task', label: 'Tasks' },
                  { id: 'meeting', label: 'Meetings' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActivityFilter(sub.id as any)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap ${
                      activityFilter === sub.id
                        ? 'bg-slate-200/80 text-slate-900 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {/* Filter by Row */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span>Filter by: <strong className="text-slate-800">Filter activity ({filteredNotes.length}/{account.notesList.length}) ▾</strong></span>
                  <span>•</span>
                  <span><strong>All users ▾</strong></span>
                </div>
              </div>

              {/* Interactive Quick Composer Box */}
              {isComposerOpen && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    {[
                      { id: 'note', label: 'Note', icon: FileText },
                      { id: 'email', label: 'Email', icon: Mail },
                      { id: 'call', label: 'Call', icon: PhoneCall },
                      { id: 'task', label: 'Task', icon: CheckSquare },
                      { id: 'meeting', label: 'Meeting', icon: Calendar }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setComposerType(t.id as any)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                          composerType === t.id
                            ? 'bg-[#ff7a59] text-white font-semibold'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <t.icon className="w-3.5 h-3.5" />
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>

                  {composerType === 'email' && (
                    <input
                      type="text"
                      placeholder="Email subject (e.g. Inbound Poultry Batch Spec)..."
                      value={composerSubject}
                      onChange={(e) => setComposerSubject(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#ff7a59]"
                    />
                  )}

                  {composerType === 'call' && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span>Call Duration:</span>
                      <select
                        value={composerDuration}
                        onChange={(e) => setComposerDuration(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs"
                      >
                        <option value="5 mins">5 mins</option>
                        <option value="15 mins">15 mins</option>
                        <option value="30 mins">30 mins</option>
                        <option value="45 mins">45 mins</option>
                      </select>
                    </div>
                  )}

                  <textarea
                    rows={3}
                    placeholder={`Log ${composerType} details for ${type === 'contact' ? account.primaryContact.name : account.companyName}...`}
                    value={composerContent}
                    onChange={(e) => setComposerContent(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#ff7a59] resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Author: Thalita Milan (Food Accounts QA)
                    </span>
                    <button
                      onClick={handleSaveActivity}
                      disabled={!composerContent.trim()}
                      className="px-4 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Save activity
                    </button>
                  </div>
                </div>
              )}

              {/* Monthly Grouped Timeline (Screenshot 2) */}
              <div className="space-y-4 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  March 2026
                </div>

                {/* Static HubSpot standard timeline events matching Screenshot 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Lifecycle change
                    </span>
                    <span>Mar 13, 2026 at 4:09 PM GMT</span>
                  </div>
                  <p className="text-xs text-slate-700 pt-1">
                    <button className="font-semibold text-blue-600 hover:underline">Thalita Milan</button> updated the lifecycle stage for this {type} to <strong className="font-semibold text-slate-900">{account.stage}</strong>. <button className="text-blue-600 hover:underline inline-flex items-center gap-0.5 font-medium ml-1">View details <ExternalLink className="w-2.5 h-2.5" /></button>
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      This {type} was created
                    </span>
                    <span>Mar 13, 2026 at 4:09 PM GMT</span>
                  </div>
                </div>

                {/* Dynamically logged user activities */}
                {filteredNotes.map((note) => (
                  <div key={note.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-900 text-xs capitalize flex items-center gap-1.5">
                        {note.type === 'call' || note.content.startsWith('[Outbound Call') ? (
                          <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                        ) : note.type === 'audit' || note.type === 'task' ? (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        ) : note.content.startsWith('[Email') ? (
                          <Mail className="w-3.5 h-3.5 text-purple-500" />
                        ) : (
                          <FileText className="w-3.5 h-3.5 text-amber-500" />
                        )}
                        <span>{note.type} by {note.author}</span>
                      </span>
                      <span>{note.date}</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: REVENUE */}
          {activeTab === 'revenue' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Revenue & Commercial Terms</h3>
                  <button
                    onClick={() => setIsAddDealOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#ff7a59] text-white rounded text-xs font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add deal</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] font-medium text-slate-400 block uppercase">Annual Contract Value</span>
                    <span className="text-xl font-bold text-slate-900 block mt-1">
                      ${account.annualContractValue.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-600 mt-1 block">Active Pipeline</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] font-medium text-slate-400 block uppercase">Monthly Throughput</span>
                    <span className="text-xl font-bold text-slate-900 block mt-1">
                      {account.monthlyVolumeMetricTons.toLocaleString()} MT
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      ~{Math.round(account.monthlyVolumeMetricTons * 2204.62).toLocaleString()} lbs / mo
                    </span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] font-medium text-slate-400 block uppercase">Commercial Terms</span>
                    <span className="text-xl font-bold text-slate-900 block mt-1">
                      {account.paymentTerms}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-1 block">Subject to QA clearance</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTELLIGENCE & QA */}
          {activeTab === 'intelligence' && (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Food Safety & Cold-Chain Telemetry</h3>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    HACCP Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <span className="font-semibold text-slate-800 block">Facility Registration</span>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">USDA / FDA Establishment #</span>
                      <span className="font-mono font-bold text-slate-900">{account.establishmentNumber}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Sector Category</span>
                      <span className="font-medium text-slate-800">{account.sector}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Last Inspection Date</span>
                      <span className="font-medium text-slate-800">{account.lastAuditDate}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                    <span className="font-semibold text-slate-800 block">Cold Chain SLA</span>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Temperature Tier</span>
                      <span className="font-medium text-cyan-700">{account.coldChainSpec}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Real-time Telemetry Sensor</span>
                      <span className="font-mono text-emerald-600 font-bold">-22.4°C (Normal)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Next Scheduled Audit</span>
                      <span className="font-medium text-slate-800">{account.nextAuditDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-2">Verified Food Safety Certifications</span>
                  <div className="flex flex-wrap gap-2">
                    {account.certifications.map(c => (
                      <span key={c} className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-md flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Associated Objects (Contacts/Companies,    */}
        {/* Deals, Tickets)                                          */}
        {/* ======================================================== */}
        <aside className="w-full lg:w-80 bg-white border-l border-slate-200 p-5 flex flex-col gap-5 shrink-0 overflow-y-auto max-h-none lg:max-h-[calc(100vh-6.5rem)]">
          
          {/* Card 1: Associated Object (Companies if Contact, Contacts if Company) */}
          {type === 'contact' ? (
            <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Companies (1)</span>
                <div className="flex items-center gap-2">
                  <button className="text-slate-500 hover:text-slate-800 font-normal">+ Add</button>
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSwitchRecord('company', account.id)}
                        className="text-xs font-bold text-blue-600 hover:underline truncate text-left"
                      >
                        {account.companyName}
                      </button>
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded border border-slate-200">
                        Primary
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      Company Domain Name: <span className="font-medium text-slate-700">{domainName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Phone: <span className="text-slate-700">{account.primaryContact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <button className="text-blue-600 hover:underline font-medium">Add association label</button>
                  <button
                    onClick={() => onSwitchRecord('company', account.id)}
                    className="text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-medium"
                  >
                    <span>View company</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Contacts (1)</span>
                <div className="flex items-center gap-2">
                  <button className="text-slate-500 hover:text-slate-800 font-normal">+ Add</button>
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                    {account.primaryContact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => onSwitchRecord('contact', account.id)}
                      className="text-xs font-bold text-blue-600 hover:underline truncate text-left block"
                    >
                      {account.primaryContact.name}
                    </button>
                    <span className="text-[11px] text-slate-500 block truncate">{account.primaryContact.title}</span>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">
                      Email: <span className="font-mono text-slate-700">{account.primaryContact.email}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Phone: <span className="text-slate-700">{account.primaryContact.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Contact with Primary Company</span>
                  <button
                    onClick={() => onSwitchRecord('contact', account.id)}
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>View all associated Contacts</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Deals (1) */}
          <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Deals (1)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddDealOpen(true)}
                  className="text-slate-500 hover:text-slate-800 font-normal"
                >
                  + Add
                </button>
                <Settings className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="p-4 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block truncate">
                2026-2027 Irish Retail Offtake ({account.sector})
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Stage: <strong className="text-purple-700 font-semibold">{account.stage}</strong></span>
                <span className="font-bold text-blue-700 font-mono">€{account.annualContractValue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                <span>SLA: {account.slaCutOffTime || '06:00 AM Gate'}</span>
                <span>Terms: {account.paymentTerms || 'Net 30'}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Tickets (1) */}
          <div className="border border-slate-200 rounded-xl bg-white shadow-2xs overflow-hidden">
            <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Tickets (1)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAddTicketOpen(true)}
                  className="text-slate-500 hover:text-slate-800 font-normal"
                >
                  + Add
                </button>
                <Settings className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="p-4 space-y-1.5 text-xs">
              <span className="font-bold text-slate-900 block truncate">
                Lot #2026-B Temperature Telemetry Verification
              </span>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Status: <strong className="text-emerald-700 font-semibold">Resolved</strong></span>
                <span className="text-slate-400">Medium Priority</span>
              </div>
              <span className="text-[10px] text-slate-400 block">Food Safety & Compliance Tickets</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Add Deal Modal */}
      {isAddDealOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Supply Deal</h3>
              <button onClick={() => setIsAddDealOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Deal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q4 Chilled Boneless Breast Supply"
                  value={newDealName}
                  onChange={(e) => setNewDealName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  placeholder="500000"
                  value={newDealAmount}
                  onChange={(e) => setNewDealAmount(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsAddDealOpen(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Deal created and associated');
                  setIsAddDealOpen(false);
                  setNewDealName('');
                  setNewDealAmount('');
                }}
                disabled={!newDealName}
                className="px-3 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] disabled:opacity-50 text-white rounded text-xs font-semibold"
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Ticket Modal */}
      {isAddTicketOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Create Support or QA Ticket</h3>
              <button onClick={() => setIsAddTicketOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Ticket Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Cold Chain Excursion Check - Lot #991"
                  value={newTicketName}
                  onChange={(e) => setNewTicketName(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsAddTicketOpen(false)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Ticket logged successfully');
                  setIsAddTicketOpen(false);
                  setNewTicketName('');
                }}
                disabled={!newTicketName}
                className="px-3 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] disabled:opacity-50 text-white rounded text-xs font-semibold"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
