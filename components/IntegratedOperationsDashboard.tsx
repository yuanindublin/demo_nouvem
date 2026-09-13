'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Ticket,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  ThermometerSnowflake,
  ShieldCheck,
  ChevronRight,
  Plus,
  ArrowRight,
  Sparkles,
  Search,
  Filter,
  Check,
  RotateCcw,
  Scale,
  Award,
  Calendar,
  Layers,
  ArrowUpRight,
  Briefcase,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { CustomerAccount } from '@/app/page';
import { MainNavSection } from '@/components/FloatingSlimRail';

export interface DashboardDeal {
  id: string;
  title: string;
  amount: number;
  stageId: string;
  stageName: string;
  closeDate: string;
  dealOwner: string;
  score: number;
  companyId: string;
  companyName: string;
  contactName: string;
  productLine: string;
}

export interface DashboardTicket {
  id: string;
  ticketNumber: string;
  title: string;
  companyId: string;
  companyName: string;
  contactName: string;
  category: 'Cold Chain Excursion' | 'Bord Bia / DAFM' | 'SLA Cut-off Delivery' | 'Spec & Lab Discrepancy' | 'Packaging & Barcode';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Under QA Review' | 'Resolved';
  assignee: string;
  createdDate: string;
  description: string;
}

const DEAL_PIPELINE_STAGES = [
  { id: 'appointment-scheduled', name: 'Appointment Scheduled' },
  { id: 'qualified-to-buy', name: 'Qualified To Buy' },
  { id: 'presentation-scheduled', name: 'Presentation Scheduled' },
  { id: 'decision-maker-bought-in', name: 'Decision Maker Bought-In' },
  { id: 'contract-sent', name: 'Contract Sent' },
  { id: 'closed-won', name: 'Closed Won' }
];

const INITIAL_DASHBOARD_DEALS: DashboardDeal[] = [
  {
    id: 'deal-dunnes-beef',
    title: 'Dunnes Stores - Annual Chilled Beef & Trim Agreement',
    amount: 3450000,
    stageId: 'contract-sent',
    stageName: 'Contract Sent',
    closeDate: '04/15/2026',
    dealOwner: 'Sarah Lin',
    score: 92,
    companyId: 'cust-100',
    companyName: 'Dunnes Stores',
    contactName: 'Peter Example',
    productLine: 'Chilled Irish Angus Beef 0°C–4°C'
  },
  {
    id: 'deal-tesco-poultry',
    title: 'Tesco Ireland - Fresh Poultry & Deboned Fillet Range',
    amount: 2100000,
    stageId: 'decision-maker-bought-in',
    stageName: 'Decision Maker Bought-In',
    closeDate: '04/30/2026',
    dealOwner: 'Thalita Milan',
    score: 85,
    companyId: 'cust-101',
    companyName: 'Tesco Ireland',
    contactName: 'Jessica Walsh',
    productLine: 'Bord Bia Quality Mark Certified Poultry'
  },
  {
    id: 'deal-supervalu-lamb',
    title: 'SuperValu (Musgrave) - Butcher Counter Premium Steaks & Lamb',
    amount: 1650000,
    stageId: 'qualified-to-buy',
    stageName: 'Qualified To Buy',
    closeDate: '05/10/2026',
    dealOwner: 'Marcus Vance',
    score: 74,
    companyId: 'cust-102',
    companyName: 'SuperValu (Musgrave Group)',
    contactName: 'Seán O\'Connor',
    productLine: 'Private Label Grass-Fed Steaks'
  },
  {
    id: 'deal-bwg-bacon',
    title: 'BWG Foods (Spar) - Cured Bacon, Sausage & Convenience Hub',
    amount: 850000,
    stageId: 'appointment-scheduled',
    stageName: 'Appointment Scheduled',
    closeDate: '05/25/2026',
    dealOwner: 'Elena Rostova',
    score: 62,
    companyId: 'cust-103',
    companyName: 'BWG Foods (Spar Ireland)',
    contactName: 'Liam Byrne',
    productLine: 'Chilled Pork & Deli Counter Pre-packs'
  },
  {
    id: 'deal-connacht-foodservice',
    title: 'Connacht Artisan Meats - West Coast Foodservice Distribution',
    amount: 480000,
    stageId: 'closed-won',
    stageName: 'Closed Won',
    closeDate: '03/28/2026',
    dealOwner: 'Dave Miller',
    score: 98,
    companyId: 'cust-104',
    companyName: 'Connacht Artisan Meats',
    contactName: 'Patrick Higgins',
    productLine: 'Artisan Dry-Aged Beef Primal Cuts'
  }
];

const INITIAL_DASHBOARD_TICKETS: DashboardTicket[] = [
  {
    id: 'tck-1',
    ticketNumber: 'TCK-8921',
    title: 'Reefer Trailer Temp Excursion: -14°C on Lot #9021B (SLA requires <-18°C)',
    companyId: 'cust-100',
    companyName: 'Dunnes Stores',
    contactName: 'Peter Example',
    category: 'Cold Chain Excursion',
    priority: 'Urgent',
    status: 'In Progress',
    assignee: 'Alex Rivera (Cold Chain QA)',
    createdDate: 'Today at 08:30 AM',
    description: 'In-transit telemetry alert on Dunnes cross-dock transfer. Core meat temperature swab required before release.'
  },
  {
    id: 'tck-2',
    ticketNumber: 'TCK-8920',
    title: 'Bord Bia Quality Mark Traceability Audit Certificate Verification',
    companyId: 'cust-101',
    companyName: 'Tesco Ireland',
    contactName: 'Jessica Walsh',
    category: 'Bord Bia / DAFM',
    priority: 'High',
    status: 'Open',
    assignee: 'Sarah Lin (QA Lead)',
    createdDate: 'Yesterday at 04:15 PM',
    description: 'Tesco central QA requested DAFM IE 388 EC and Bord Bia annual supplier compliance packet.'
  },
  {
    id: 'tck-3',
    ticketNumber: 'TCK-8919',
    title: '06:00 AM Kilcock CDC Early Morning SLA Cut-off Delivery Warning',
    companyId: 'cust-102',
    companyName: 'SuperValu (Musgrave Group)',
    contactName: 'Seán O\'Connor',
    category: 'SLA Cut-off Delivery',
    priority: 'Urgent',
    status: 'Under QA Review',
    assignee: 'Logistics Dispatch Desk',
    createdDate: 'Today at 05:15 AM',
    description: 'Fleet GPS check indicates trailer #IE-26-D-4412 will arrive at Musgrave CDC dock at 05:42 AM.'
  },
  {
    id: 'tck-4',
    ticketNumber: 'TCK-8918',
    title: 'Net 60 Terms & Barcode Label Verification on Spar Cured Pork Batch',
    companyId: 'cust-103',
    companyName: 'BWG Foods (Spar Ireland)',
    contactName: 'Liam Byrne',
    category: 'Packaging & Barcode',
    priority: 'Medium',
    status: 'Open',
    assignee: 'Commercial Finance Desk',
    createdDate: 'Sep 11, 2026',
    description: 'Retail scanner calibration check on EAN-128 variable weight barcode labels.'
  },
  {
    id: 'tck-5',
    ticketNumber: 'TCK-8917',
    title: 'Bord Bia Quality Mark Remediation & DAFM IE 904 EC Plant Inspection',
    companyId: 'cust-104',
    companyName: 'Connacht Artisan Meats',
    contactName: 'Patrick Higgins',
    category: 'Bord Bia / DAFM',
    priority: 'High',
    status: 'Open',
    assignee: 'FSAI Liaison Officer',
    createdDate: 'Sep 09, 2026',
    description: 'Pending Bord Bia mark certification block. Temporary hold on retail shelf distribution until clearance.'
  }
];

interface IntegratedOperationsDashboardProps {
  customers: CustomerAccount[];
  dublinTime: string;
  cutOffCountdown: { hours: number; minutes: number; seconds: number };
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  onNavigateSection: (section: MainNavSection) => void;
  onOpenMockRecall: () => void;
  showToast: (msg: string) => void;
}

export default function IntegratedOperationsDashboard({
  customers,
  dublinTime,
  cutOffCountdown,
  onOpenRecordDetail,
  onNavigateSection,
  onOpenMockRecall,
  showToast
}: IntegratedOperationsDashboardProps) {
  const [deals, setDeals] = useState<DashboardDeal[]>(INITIAL_DASHBOARD_DEALS);
  const [tickets, setTickets] = useState<DashboardTicket[]>(INITIAL_DASHBOARD_TICKETS);
  const [selectedRetailerFilter, setSelectedRetailerFilter] = useState<string>('all');
  const [ticketPriorityFilter, setTicketPriorityFilter] = useState<string>('all');
  
  // Modals
  const [isNewDealModalOpen, setIsNewDealModalOpen] = useState(false);
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);

  // New Deal Form State
  const [newDealTitle, setNewDealTitle] = useState('');
  const [newDealAmount, setNewDealAmount] = useState<number>(500000);
  const [newDealCompanyId, setNewDealCompanyId] = useState('cust-100');
  const [newDealStage, setNewDealStage] = useState('appointment-scheduled');

  // New Ticket Form State
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketCompanyId, setNewTicketCompanyId] = useState('cust-100');
  const [newTicketCategory, setNewTicketCategory] = useState<DashboardTicket['category']>('Cold Chain Excursion');
  const [newTicketPriority, setNewTicketPriority] = useState<DashboardTicket['priority']>('Urgent');

  // Filtered Deals & Tickets
  const filteredDeals = deals.filter(deal => {
    if (selectedRetailerFilter !== 'all' && deal.companyId !== selectedRetailerFilter) return false;
    return true;
  });

  const filteredTickets = tickets.filter(ticket => {
    if (selectedRetailerFilter !== 'all' && ticket.companyId !== selectedRetailerFilter) return false;
    if (ticketPriorityFilter === 'urgent' && ticket.priority !== 'Urgent') return false;
    if (ticketPriorityFilter === 'open' && ticket.status === 'Resolved') return false;
    return true;
  });

  // Aggregated Pipeline
  const totalPipelineAmount = deals.reduce((acc, d) => acc + d.amount, 0);
  const openTicketsCount = tickets.filter(t => t.status !== 'Resolved').length;
  const urgentTicketsCount = tickets.filter(t => t.priority === 'Urgent' && t.status !== 'Resolved').length;

  // 1-Click Advance Deal Stage
  const handleAdvanceDealStage = (dealId: string) => {
    setDeals(prev =>
      prev.map(deal => {
        if (deal.id !== dealId) return deal;
        const currentIdx = DEAL_PIPELINE_STAGES.findIndex(s => s.id === deal.stageId);
        const nextIdx = Math.min(DEAL_PIPELINE_STAGES.length - 1, currentIdx + 1);
        const nextStage = DEAL_PIPELINE_STAGES[nextIdx];
        showToast(`商机联动：${deal.companyName} 商机已推进至 "${nextStage.name}"`);
        return {
          ...deal,
          stageId: nextStage.id,
          stageName: nextStage.name
        };
      })
    );
  };

  // 1-Click Update Ticket Status
  const handleUpdateTicketStatus = (ticketId: string, nextStatus: DashboardTicket['status']) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id !== ticketId) return t;
        showToast(`工单联动：${t.ticketNumber} 状态已更新为 "${nextStatus}"`);
        return {
          ...t,
          status: nextStatus
        };
      })
    );
  };

  const handleCreateNewDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealTitle.trim()) return;
    const targetComp = customers.find(c => c.id === newDealCompanyId) || customers[0];
    const stageObj = DEAL_PIPELINE_STAGES.find(s => s.id === newDealStage) || DEAL_PIPELINE_STAGES[0];

    const newDeal: DashboardDeal = {
      id: `deal-${Date.now()}`,
      title: newDealTitle.trim(),
      amount: Number(newDealAmount) || 100000,
      stageId: stageObj.id,
      stageName: stageObj.name,
      closeDate: '06/30/2026',
      dealOwner: 'Current User',
      score: 75,
      companyId: targetComp.id,
      companyName: targetComp.companyName,
      contactName: targetComp.primaryContact.name,
      productLine: 'Irish Meat & Cold Chain SLA'
    };

    setDeals(prev => [newDeal, ...prev]);
    setIsNewDealModalOpen(false);
    setNewDealTitle('');
    showToast(`成功创建商机并联动至 ${targetComp.companyName}`);
  };

  const handleCreateNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketTitle.trim()) return;
    const targetComp = customers.find(c => c.id === newTicketCompanyId) || customers[0];

    const newTicket: DashboardTicket = {
      id: `tck-${Date.now()}`,
      ticketNumber: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTicketTitle.trim(),
      companyId: targetComp.id,
      companyName: targetComp.companyName,
      contactName: targetComp.primaryContact.name,
      category: newTicketCategory,
      priority: newTicketPriority,
      status: 'Open',
      assignee: 'Cold Chain QA Desk',
      createdDate: 'Just now',
      description: 'Logged directly from NOUVEM Irish Operations Dashboard.'
    };

    setTickets(prev => [newTicket, ...prev]);
    setIsNewTicketModalOpen(false);
    setNewTicketTitle('');
    showToast(`成功登记工单 ${newTicket.ticketNumber} 并绑定 ${targetComp.companyName}`);
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. Header Bar: NOUVEM Connected Irish Operations Hub                      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0E3459] to-[#0A2540] rounded-2xl p-5 sm:p-6 text-white shadow-lg border border-slate-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F58220] text-white font-bold flex items-center justify-center text-sm shadow-md">
              NV
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>爱尔兰商超全链路业务联动看板</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                LIVE CONNECTED
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            实时联动 <strong className="text-white">Deals 交易谈判</strong>、<strong className="text-white">Tickets 质检合规工单</strong>、
            <strong className="text-white">Dunnes/Tesco 商超早班履约</strong> 与客户主数据。点击任一商机、工单或客户均可瞬间穿透联动。
          </p>
        </div>

        {/* Action Controls & Real-time Dublin Clock */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Dublin IST Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">🇮🇪 Dublin:</span>
            <span className="font-bold text-white">{dublinTime || '14:26:12 IST'}</span>
          </div>

          {/* 06:00 AM SLA Cut-off Countdown */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-200 text-xs">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-semibold text-white">06:00 AM 截单倒计时:</span>
            <span className="px-2 py-0.5 rounded-md font-mono font-bold text-xs bg-amber-600 text-white shadow-xs">
              {String(cutOffCountdown.hours).padStart(2, '0')}:{String(cutOffCountdown.minutes).padStart(2, '0')}:{String(cutOffCountdown.seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={onOpenMockRecall}
            className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 shadow-md transition-all flex items-center gap-1.5"
            title="Execute 2-Hour FSAI Traceability & Mock Recall"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>FSAI 模拟召回</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. Interactive KPI Hub: 4 Core Metric Linkages                           */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Deals Pipeline */}
        <div 
          onClick={() => onNavigateSection('deals')}
          className="bg-white rounded-xl p-4 border border-slate-200 hover:border-[#F58220] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#F58220]" />
              在途 Deals 商机池
            </span>
            <span className="text-[11px] text-[#F58220] font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              进入谈判看板 ↗
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              €{(totalPipelineAmount / 1000000).toFixed(2)}M
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-[#F58220] border border-orange-200">
              {deals.length} 笔重大合同
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            <span>Dunnes & Tesco 占 65%</span>
            <span className="text-emerald-600 font-medium">1 笔已赢单</span>
          </div>
        </div>

        {/* Metric 2: Open Tickets Desk */}
        <div 
          onClick={() => onNavigateSection('tickets')}
          className="bg-white rounded-xl p-4 border border-slate-200 hover:border-rose-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-rose-600" />
              质检 & 冷链工单 (Tickets)
            </span>
            <span className="text-[11px] text-rose-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              进入工单中心 ↗
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {openTicketsCount} <span className="text-xs font-normal text-slate-400">待处理</span>
            </span>
            {urgentTicketsCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {urgentTicketsCount} 紧急 SLA
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                全部正常
              </span>
            )}
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            <span>车厢温控 + Bord Bia 复核</span>
            <span className="text-slate-600 font-medium">平均响应 18min</span>
          </div>
        </div>

        {/* Metric 3: Key Irish Retail Accounts */}
        <div 
          onClick={() => onNavigateSection('companies')}
          className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              爱尔兰核心零售商
            </span>
            <span className="text-[11px] text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              客户主数据 ↗
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {customers.length} <span className="text-xs font-normal text-slate-400">大型企业</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Dunnes / Tesco / SuperValu
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            <span>DAFM 厂号 100% 合规</span>
            <span className="text-emerald-600 font-medium">Bord Bia 80%</span>
          </div>
        </div>

        {/* Metric 4: Logistics OTIF & Cold Chain SLA */}
        <div 
          onClick={() => onNavigateSection('orders')}
          className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold flex items-center gap-1.5">
              <ThermometerSnowflake className="w-4 h-4 text-emerald-600" />
              06:00 AM 早班履约 OTIF
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
              订单履约 ↗
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-700 tracking-tight">
              99.2%
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              准时温控达标
            </span>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
            <span>Kilcock & Cork CDC 专线</span>
            <span className="text-emerald-600 font-medium">0 延误超时</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Global Retailer Cross-Filter Switcher                                 */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-medium">
          <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            快速联动筛选:
          </span>
          {[
            { id: 'all', label: '全部商超客户 (All)' },
            { id: 'cust-100', label: 'Dunnes Stores (IE 542 EC)' },
            { id: 'cust-101', label: 'Tesco Ireland (IE 388 EC)' },
            { id: 'cust-102', label: 'SuperValu Musgrave (IE 619 EC)' },
            { id: 'cust-103', label: 'BWG Foods Spar (IE 477 EC)' },
            { id: 'cust-104', label: 'Connacht Meats (IE 904 EC)' }
          ].map(retailer => (
            <button
              key={retailer.id}
              onClick={() => setSelectedRetailerFilter(retailer.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-semibold transition-all ${
                selectedRetailerFilter === retailer.id
                  ? 'bg-[#0A2540] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {retailer.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#F58220] hover:bg-[#e06e12] shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>新建商机</span>
          </button>
          <button
            onClick={() => setIsNewTicketModalOpen(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-xs flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>登记工单</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. Dual Columns: Interactive Deals & Interactive Tickets                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 Cols): Live Linked Deals Pipeline */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Deals Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F58220] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>联动商机池 (Deals Pipeline)</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-orange-100 text-[#F58220] font-bold">
                      {filteredDeals.length} 笔
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    可直接在看板推进谈判阶段，点击客户或联系人直接穿透进入 CRM 主档
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateSection('deals')}
                className="text-xs font-bold text-[#F58220] hover:text-[#d9670f] flex items-center gap-1 transition-colors group"
              >
                <span>全屏看板</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Deals List */}
            <div className="divide-y divide-slate-100">
              {filteredDeals.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  当前筛选下无匹配商机记录。
                </div>
              ) : (
                filteredDeals.map(deal => {
                  const stageIndex = DEAL_PIPELINE_STAGES.findIndex(s => s.id === deal.stageId);
                  const isClosedWon = deal.stageId === 'closed-won';

                  return (
                    <div 
                      key={deal.id}
                      className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 font-bold text-[10px] text-slate-700 flex items-center justify-center shrink-0">
                              {deal.score}
                            </span>
                            <span className="font-bold text-slate-900 text-sm hover:text-[#F58220] transition-colors">
                              {deal.title}
                            </span>
                          </div>
                          
                          {/* Associated Company and Contact Links */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pl-8">
                            <button
                              onClick={() => onOpenRecordDetail('company', deal.companyId)}
                              className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                              title="穿透打开企业详情主档"
                            >
                              <Building2 className="w-3.5 h-3.5" />
                              <span>{deal.companyName}</span>
                            </button>
                            <span>•</span>
                            <button
                              onClick={() => onOpenRecordDetail('contact', deal.companyId)}
                              className="text-slate-600 hover:text-slate-900 hover:underline flex items-center gap-1"
                              title="穿透打开联系人详情主档"
                            >
                              <Users className="w-3.5 h-3.5" />
                              <span>{deal.contactName}</span>
                            </button>
                            <span>•</span>
                            <span className="text-slate-400 font-mono text-[11px]">负责人: {deal.dealOwner}</span>
                          </div>
                        </div>

                        {/* Amount & Close Date */}
                        <div className="text-left sm:text-right shrink-0 pl-8 sm:pl-0">
                          <div className="text-base font-extrabold text-slate-900">
                            €{deal.amount.toLocaleString()}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            预计交付: {deal.closeDate}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Stage Flow & Advance Trigger */}
                      <div className="pl-8 pt-1 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isClosedWon 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {deal.stageName}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            (阶段 {stageIndex + 1}/6)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenRecordDetail('company', deal.companyId)}
                            className="px-2.5 py-1 rounded text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                          >
                            查看主档
                          </button>

                          {!isClosedWon && (
                            <button
                              onClick={() => handleAdvanceDealStage(deal.id)}
                              className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-[#F58220] hover:bg-[#e06e12] active:bg-[#c95f0c] shadow-xs transition-all flex items-center gap-1"
                              title="推进至下一谈判阶段"
                            >
                              <span>一键推进</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Live Linked Tickets Desk */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Tickets Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>联动工单队列 (Tickets Desk)</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-rose-100 text-rose-700 font-bold">
                      {filteredTickets.length} 件
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    冷链温控、Bord Bia 与 06:00 AM 早班时限追踪
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigateSection('tickets')}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors group"
              >
                <span>工单看板</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Quick Priority Filter */}
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">状态筛选:</span>
              {[
                { id: 'all', label: '全部' },
                { id: 'urgent', label: '🚨 紧急 (Urgent)' },
                { id: 'open', label: '未解决 (Open)' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTicketPriorityFilter(f.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                    ticketPriorityFilter === f.id
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Tickets List */}
            <div className="divide-y divide-slate-100 max-h-[580px] overflow-y-auto">
              {filteredTickets.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  暂无匹配工单，全部冷链与合规流程运转良好。
                </div>
              ) : (
                filteredTickets.map(ticket => {
                  const isResolved = ticket.status === 'Resolved';
                  const isUrgent = ticket.priority === 'Urgent';

                  return (
                    <div 
                      key={ticket.id}
                      className={`p-4 hover:bg-slate-50/80 transition-colors space-y-2.5 ${
                        isUrgent && !isResolved ? 'bg-rose-50/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {ticket.ticketNumber}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-700' :
                              ticket.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                            {ticket.title}
                          </h3>
                        </div>

                        {/* Status Badge / Action */}
                        <div className="shrink-0">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isResolved 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                              : ticket.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                      </div>

                      {/* Retailer Connection Link */}
                      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onOpenRecordDetail('company', ticket.companyId)}
                            className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{ticket.companyName}</span>
                          </button>
                          <span>•</span>
                          <span className="text-slate-400">{ticket.contactName}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {!isResolved ? (
                            <button
                              onClick={() => handleUpdateTicketStatus(ticket.id, 'Resolved')}
                              className="px-2.5 py-1 rounded text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1"
                            >
                              <Check className="w-3 h-3" />
                              <span>标记解决</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateTicketStatus(ticket.id, 'In Progress')}
                              className="px-2 py-0.5 rounded text-[10px] text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                            >
                              重新激活
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. Irish Key Retailers Operational Matrix (爱尔兰核心商超协同矩阵)       */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <span>爱尔兰核心商超协同矩阵 (Irish Supermarket Accounts Matrix)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                DAFM &amp; Bord Bia 准入
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              直接穿透查看商超专属 Deals 合同包、质检 Tickets 与对应负责人的 CRM 主档页面
            </p>
          </div>

          <button
            onClick={() => onNavigateSection('companies')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 shadow-2xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>企业主档库 ({customers.length})</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">企业 / 工厂 (Company &amp; Plant)</th>
                <th className="px-4 py-3">核心联络人 (Primary Contact)</th>
                <th className="px-4 py-3">Bord Bia 资质 (Mark Status)</th>
                <th className="px-4 py-3">月供货量 (Volume)</th>
                <th className="px-4 py-3">账期 (Terms)</th>
                <th className="px-4 py-3">商超 SLA 截单时限</th>
                <th className="px-4 py-3 text-right">一键跨模块联动操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map(c => {
                const compDeals = deals.filter(d => d.companyId === c.id);
                const compTickets = tickets.filter(t => t.companyId === c.id);

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                          {c.companyName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <button
                            onClick={() => onOpenRecordDetail('company', c.id)}
                            className="font-bold text-slate-900 hover:text-[#F58220] transition-colors text-left block"
                          >
                            {c.companyName}
                          </button>
                          <span className="font-mono text-[10px] text-slate-400">
                            {c.establishmentNumber} • {c.facilityLocation.city}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => onOpenRecordDetail('contact', c.id)}
                        className="font-semibold text-blue-600 hover:underline block text-left"
                      >
                        {c.primaryContact.name}
                      </button>
                      <span className="text-[11px] text-slate-400 block">{c.primaryContact.title}</span>
                    </td>

                    <td className="px-4 py-3">
                      {c.hasBordBiaMark ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Award className="w-3 h-3 text-emerald-600" />
                          已认证 (Approved)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-300">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          待审核 (Pending)
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {c.monthlyVolumeMetricTons.toLocaleString()} MT
                    </td>

                    <td className="px-4 py-3 font-mono font-medium text-slate-700">
                      {c.paymentTerms}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{c.slaCutOffTime || '06:00 AM'}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedRetailerFilter(c.id);
                            showToast(`已在看板筛选 ${c.companyName} 的专属 Deals 与 Tickets`);
                          }}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                          title="在当前看板仅展示此商超的 Deals 与 Tickets"
                        >
                          联动过滤 ({compDeals.length} Deals / {compTickets.length} Tickets)
                        </button>

                        <button
                          onClick={() => onOpenRecordDetail('company', c.id)}
                          className="px-2.5 py-1 rounded bg-[#0A2540] hover:bg-slate-800 text-white font-semibold text-[11px] transition-colors"
                          title="打开 HubSpot 格式企业详情页"
                        >
                          打开主档 ↗
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* Modal 1: Quick Create Deal Modal                                          */}
      {/* ========================================================================= */}
      {isNewDealModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#F58220]" />
                <h3 className="font-bold text-sm sm:text-base">新建商机合同 (New Deal)</h3>
              </div>
              <button onClick={() => setIsNewDealModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewDeal} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">商机名称 (Deal Title) *</label>
                <input
                  type="text"
                  required
                  placeholder="例如: Dunnes Stores Q3 羊肉排供货协议"
                  value={newDealTitle}
                  onChange={(e) => setNewDealTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#F58220]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">关联爱尔兰商超 (Associated Account) *</label>
                <select
                  value={newDealCompanyId}
                  onChange={(e) => setNewDealCompanyId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.establishmentNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">合同金额 (€ EUR) *</label>
                  <input
                    type="number"
                    min="10000"
                    step="10000"
                    value={newDealAmount}
                    onChange={(e) => setNewDealAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">谈判阶段 (Stage) *</label>
                  <select
                    value={newDealStage}
                    onChange={(e) => setNewDealStage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                  >
                    {DEAL_PIPELINE_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewDealModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#F58220] hover:bg-[#e06e12] text-white font-bold shadow-sm"
                >
                  创建并联动
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* Modal 2: Quick Create Ticket Modal                                        */}
      {/* ========================================================================= */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-5 bg-[#0A2540] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-sm sm:text-base">登记质检/冷链工单 (New Ticket)</h3>
              </div>
              <button onClick={() => setIsNewTicketModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewTicket} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">工单描述 (Issue Summary) *</label>
                <input
                  type="text"
                  required
                  placeholder="例如: Tesco 专车车厢温度超标异常预警"
                  value={newTicketTitle}
                  onChange={(e) => setNewTicketTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">关联商超客户 (Associated Account) *</label>
                <select
                  value={newTicketCompanyId}
                  onChange={(e) => setNewTicketCompanyId(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.companyName} ({c.establishmentNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">工单类型 (Category) *</label>
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value as DashboardTicket['category'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 bg-white"
                  >
                    <option value="Cold Chain Excursion">Cold Chain Excursion (冷链温控)</option>
                    <option value="Bord Bia / DAFM">Bord Bia / DAFM (国家局合规)</option>
                    <option value="SLA Cut-off Delivery">SLA Cut-off Delivery (截单时效)</option>
                    <option value="Spec & Lab Discrepancy">Spec & Lab Discrepancy (指标差异)</option>
                    <option value="Packaging & Barcode">Packaging & Barcode (包装条码)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">紧急程度 (Priority) *</label>
                  <select
                    value={newTicketPriority}
                    onChange={(e) => setNewTicketPriority(e.target.value as DashboardTicket['priority'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-rose-600 bg-white"
                  >
                    <option value="Urgent">🚨 Urgent (紧急阻断)</option>
                    <option value="High">⚠️ High (高优先级)</option>
                    <option value="Medium">⚡ Medium (中优先级)</option>
                    <option value="Low">Low (日常跟进)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm"
                >
                  登记并派发
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
