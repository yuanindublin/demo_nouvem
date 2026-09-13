'use client';

import React, { useState } from 'react';
import {
  Search,
  Kanban,
  Table as TableIcon,
  Settings,
  ChevronDown,
  Filter,
  ArrowUpDown,
  BarChart2,
  Download,
  Plus,
  MoreVertical,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  Sparkles,
  Mail,
  CheckSquare,
  Building2,
  Info,
  Calendar,
  User,
  SlidersHorizontal,
  MoveRight
} from 'lucide-react';

export interface DealRecord {
  id: string;
  title: string;
  amount: number;
  closeDate: string;
  dealOwner: string;
  createDate: string;
  stageId: string;
  score: number; // The circular badge number (e.g. 59 in screenshot)
  companyName: string;
  companyId?: string;
  contactName?: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  probability: number;
}

const SALES_PIPELINE_STAGES: PipelineStage[] = [
  { id: 'appointment-scheduled', name: 'Appointment Scheduled', probability: 0.2 },
  { id: 'qualified-to-buy', name: 'Qualified To Buy', probability: 0.4 },
  { id: 'presentation-scheduled', name: 'Presentation Scheduled', probability: 0.6 },
  { id: 'decision-maker-bought-in', name: 'Decision Maker Bought-In', probability: 0.8 },
  { id: 'contract-sent', name: 'Contract Sent', probability: 0.9 },
  { id: 'closed-won', name: 'Closed Won', probability: 1.0 }
];

const INITIAL_DEALS: DealRecord[] = [
  {
    id: 'deal-seo',
    title: 'SEO consulting ongoing',
    amount: 3000,
    closeDate: '03/31/2026',
    dealOwner: 'Thalita Milan',
    createDate: '03/25/2026',
    stageId: 'appointment-scheduled',
    score: 59,
    companyName: 'Digital Growth Agency',
    companyId: 'cust-100',
    contactName: 'Peter Example'
  },
  {
    id: 'deal-beef-supply',
    title: 'Annual Cold-Chain Protein Agreement',
    amount: 1350000,
    closeDate: '04/15/2026',
    dealOwner: 'Sarah Lin',
    createDate: '03/10/2026',
    stageId: 'decision-maker-bought-in',
    score: 82,
    companyName: 'Business Example (USDA-EST-9941)',
    companyId: 'cust-100',
    contactName: 'Peter Example'
  },
  {
    id: 'deal-seafood-sla',
    title: 'Deep Freeze Fillet Supply SLA',
    amount: 920000,
    closeDate: '05/01/2026',
    dealOwner: 'Dave Miller',
    createDate: '03/18/2026',
    stageId: 'presentation-scheduled',
    score: 64,
    companyName: 'Pacific Rim Marine Harvest',
    companyId: 'cust-103',
    contactName: 'Capt. Donald Tanaka'
  },
  {
    id: 'deal-poultry-contract',
    title: 'Deboned Poultry Annual Contract',
    amount: 1640000,
    closeDate: '04/30/2026',
    dealOwner: 'Elena Rostova',
    createDate: '02/20/2026',
    stageId: 'contract-sent',
    score: 91,
    companyName: 'Shenandoah Broiler Farms',
    companyId: 'cust-102',
    contactName: 'Elena Rostova'
  },
  {
    id: 'deal-ribeye-primal',
    title: 'Primal Beef Cut Long-term Supply',
    amount: 2180000,
    closeDate: '03/28/2026',
    dealOwner: 'Marcus Vance',
    createDate: '01/15/2026',
    stageId: 'closed-won',
    score: 99,
    companyName: 'Apex Primal Beef',
    companyId: 'cust-101',
    contactName: 'Marcus Vance'
  }
];

interface DealsWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function DealsWorkspace({
  onOpenRecordDetail,
  showToast
}: DealsWorkspaceProps) {
  const [deals, setDeals] = useState<DealRecord[]>(INITIAL_DEALS);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState<string>('all');
  const [showMetricsBar, setShowMetricsBar] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [collapsedStages, setCollapsedStages] = useState<Record<string, boolean>>({});

  // Form State for new deal
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState<number>(5000);
  const [newOwner, setNewOwner] = useState('Thalita Milan');
  const [newStage, setNewStage] = useState('appointment-scheduled');
  const [newCloseDate, setNewCloseDate] = useState('04/15/2026');

  // Filtered Deals
  const filteredDeals = deals.filter((deal) => {
    if (activeTab === 'my' && deal.dealOwner !== 'Thalita Milan') return false;
    if (ownerFilter !== 'all' && deal.dealOwner !== ownerFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = deal.title.toLowerCase().includes(q);
      const matchOwner = deal.dealOwner.toLowerCase().includes(q);
      const matchCompany = deal.companyName.toLowerCase().includes(q);
      if (!matchTitle && !matchOwner && !matchCompany) return false;
    }
    return true;
  });

  const totalAmountAll = filteredDeals.reduce((sum, d) => sum + d.amount, 0);

  const toggleStageCollapse = (stageId: string) => {
    setCollapsedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const handleAdvanceStage = (dealId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        const curIdx = SALES_PIPELINE_STAGES.findIndex((s) => s.id === d.stageId);
        if (curIdx < SALES_PIPELINE_STAGES.length - 1) {
          const nextStage = SALES_PIPELINE_STAGES[curIdx + 1];
          showToast(`Deal moved to ${nextStage.name}`);
          return { ...d, stageId: nextStage.id };
        }
        return d;
      })
    );
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const todayStr = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });

    const created: DealRecord = {
      id: `deal-${Date.now()}`,
      title: newTitle.trim(),
      amount: Number(newAmount) || 0,
      closeDate: newCloseDate || '04/30/2026',
      dealOwner: newOwner,
      createDate: todayStr,
      stageId: newStage,
      score: Math.floor(50 + Math.random() * 45),
      companyName: 'Business Example (USDA-EST-9941)',
      companyId: 'cust-100',
      contactName: 'Peter Example'
    };

    setDeals([created, ...deals]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    showToast(`Deal "${created.title}" created successfully`);
  };

  return (
    <div className="bg-[#f5f8fa] min-h-[calc(100vh-3.5rem)] text-slate-800 flex flex-col">
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP VIEW TABS (HubSpot exact header tab bar)               */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200 px-4 pt-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {/* Deals Selector Dropdown */}
          <button
            id="deals-nav-dropdown-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-md transition-colors mr-1"
          >
            <Kanban className="w-3.5 h-3.5 text-slate-500" />
            <span>Deals</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Tab 1: All deals (active) */}
          <div
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 font-semibold text-xs cursor-pointer transition-all ${
              activeTab === 'all'
                ? 'border-[#ff7a59] text-slate-900 bg-slate-50/80 rounded-t-md'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>All deals</span>
            <span className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
              {filteredDeals.length}
            </span>
            <button className="text-slate-400 hover:text-slate-600 ml-1">
              <MoreVertical className="w-3 h-3" />
            </button>
            <button className="text-slate-400 hover:text-slate-600">
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Tab 2: My deals */}
          <div
            onClick={() => setActiveTab('my')}
            className={`flex items-center gap-2 px-3 py-2 border-b-2 font-medium text-xs cursor-pointer transition-all ${
              activeTab === 'my'
                ? 'border-[#ff7a59] text-slate-900 bg-slate-50/80 rounded-t-md font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span>My deals</span>
          </div>

          {/* Add tab button */}
          <button
            onClick={() => showToast('New view tab created')}
            className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors ml-1"
            title="Add view tab"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Create Deal Primary Action */}
        <div className="flex items-center gap-2 pb-1.5">
          <button
            id="deals-create-deal-btn"
            onClick={() => setIsCreateModalOpen(true)}
            className="px-3 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create deal</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. ACTION BAR & PIPELINE SELECTION (Row 1)                    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Search input with magnifying glass */}
        <div className="relative min-w-[240px] max-w-sm flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            id="deals-search-input"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/60 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a59] focus:border-[#ff7a59] transition-all"
          />
        </div>

        {/* Right tools and dropdowns matching screenshot */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          {/* View switcher dropdown */}
          <div className="flex items-center bg-white border border-slate-300 rounded-md overflow-hidden shadow-2xs">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 font-medium transition-colors ${
                viewMode === 'board' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Board view</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <button
              onClick={() => showToast('View settings')}
              className="px-2 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              title="Board display settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pipeline selector dropdown */}
          <button
            id="deals-pipeline-selector"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs"
          >
            <span>Sales Pipeline</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Filters action button */}
          <button
            onClick={() => showToast('Filters panel opened')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filters</span>
          </button>

          {/* Sort button */}
          <button
            onClick={() => showToast('Sorting options opened')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span>Sort</span>
          </button>

          {/* Metrics toggle button */}
          <button
            onClick={() => setShowMetricsBar(!showMetricsBar)}
            className={`px-3 py-1.5 border border-slate-300 rounded-md font-medium shadow-2xs transition-colors ${
              showMetricsBar ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Metrics</span>
          </button>

          {/* Export button */}
          <button
            onClick={() => showToast('Exporting deals CSV...')}
            className="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs"
          >
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. QUICK FILTER CHIPS (Row 2 matching screenshot)              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Deal owner dropdown chip */}
          <div className="relative">
            <select
              value={ownerFilter}
              onChange={(e) => setOwnerFilter(e.target.value)}
              className="appearance-none bg-transparent pr-6 pl-2.5 py-1 rounded hover:bg-slate-100 font-medium cursor-pointer text-slate-700 focus:outline-none"
            >
              <option value="all">Deal owner</option>
              <option value="Thalita Milan">Thalita Milan</option>
              <option value="Sarah Lin">Sarah Lin</option>
              <option value="Elena Rostova">Elena Rostova</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Dave Miller">Dave Miller</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 top-2 pointer-events-none" />
          </div>

          {/* Create date dropdown chip */}
          <button
            onClick={() => showToast('Filter by Create Date')}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700"
          >
            <span>Create date</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {/* Last activity date dropdown chip */}
          <button
            onClick={() => showToast('Filter by Last Activity Date')}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700"
          >
            <span>Last activity date</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {/* Close date dropdown chip */}
          <button
            onClick={() => showToast('Filter by Close Date')}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700"
          >
            <span>Close date</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>

          {/* + More chip */}
          <button
            onClick={() => showToast('More filter criteria')}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-500 hover:text-slate-800"
          >
            <Plus className="w-3 h-3" />
            <span>More</span>
          </button>
        </div>

        {/* Advanced filters */}
        <button
          onClick={() => showToast('Advanced Filter Builder')}
          className="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
          <span>Advanced filters</span>
        </button>
      </div>

      {/* Optional Metrics Banner if toggled */}
      {showMetricsBar && (
        <div className="bg-slate-900 text-white px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Total Pipeline</span>
              <span className="text-lg font-bold text-emerald-400">${totalAmountAll.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Active Deals</span>
              <span className="text-lg font-bold text-white">{filteredDeals.length} Deals</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Average Deal Size</span>
              <span className="text-lg font-bold text-blue-300">
                ${filteredDeals.length > 0 ? Math.round(totalAmountAll / filteredDeals.length).toLocaleString() : 0}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowMetricsBar(false)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. KANBAN BOARD COLUMNS & CARDS (Exact match to screenshot)  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 overflow-x-auto p-3 flex gap-3 items-stretch relative">
        {SALES_PIPELINE_STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stageId === stage.id);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.amount, 0);
          const stageWeighted = Math.round(stageTotal * stage.probability);
          const isCollapsed = collapsedStages[stage.id];

          return (
            <div
              key={stage.id}
              className={`bg-[#f0f4f7] rounded-lg flex flex-col transition-all duration-200 ${
                isCollapsed ? 'w-12 min-w-[48px]' : 'w-[280px] min-w-[280px] shrink-0'
              }`}
            >
              {/* Column Header */}
              <div className="p-2.5 flex items-center justify-between border-b border-slate-200/80">
                {!isCollapsed ? (
                  <>
                    <div className="flex items-center gap-1.5 min-w-0 pr-1">
                      <h3 className="text-xs font-bold text-slate-800 truncate" title={stage.name}>
                        {stage.name}
                      </h3>
                      <span className="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold shrink-0">
                        {stageDeals.length}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleStageCollapse(stage.id)}
                      className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 p-1 rounded transition-colors"
                      title="Collapse stage"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center w-full py-2 gap-2">
                    <button
                      onClick={() => toggleStageCollapse(stage.id)}
                      className="text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-slate-200"
                      title="Expand stage"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-800 text-[10px] font-bold flex items-center justify-center">
                      {stageDeals.length}
                    </span>
                    <div className="[writing-mode:vertical-lr] text-[11px] font-bold text-slate-600 tracking-wider rotate-180 mt-2">
                      {stage.name}
                    </div>
                  </div>
                )}
              </div>

              {/* Column Body with Cards */}
              {!isCollapsed && (
                <div className="p-2 flex-1 space-y-2 overflow-y-auto max-h-[calc(100vh-17.5rem)]">
                  {stageDeals.map((deal) => (
                    /* ------------------------------------------------------------- */
                    /* DEAL CARD: EXACT STYLING & FIELDS FROM SCREENSHOT            */
                    /* ------------------------------------------------------------- */
                    <div
                      key={deal.id}
                      className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer relative group"
                      onClick={() => onOpenRecordDetail('contact', deal.companyId || 'cust-100')}
                    >
                      {/* Deal title (underlined link in teal/cyan as in screenshot) */}
                      <div className="mb-2">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenRecordDetail('contact', deal.companyId || 'cust-100');
                          }}
                          className="text-[#007a87] font-bold text-xs underline hover:text-[#005f6b] block leading-snug"
                        >
                          {deal.title}
                        </a>
                      </div>

                      {/* Property List (Amount, Close date, Deal owner, Create date) */}
                      <div className="space-y-1 text-xs text-slate-700">
                        <div className="flex items-center">
                          <span className="text-slate-600">Amount:&nbsp;</span>
                          <strong className="font-semibold text-slate-900">${deal.amount.toLocaleString()}</strong>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-600">Close date:&nbsp;</span>
                          <span className="text-slate-800">{deal.closeDate}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-600">Deal owner:&nbsp;</span>
                          <span className="text-slate-800">{deal.dealOwner}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-slate-600">Create date:&nbsp;</span>
                          <span className="text-slate-800">{deal.createDate}</span>
                        </div>
                      </div>

                      {/* Horizontal Subtle Divider */}
                      <div className="border-t border-slate-100 my-2.5"></div>

                      {/* Card Footer: Left score badge (59), Right micro action icons */}
                      <div className="flex items-center justify-between">
                        {/* Circle Score Badge (59 in amber circle) */}
                        <div
                          className="w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-50/70 text-amber-800 text-[10px] font-bold flex items-center justify-center shadow-2xs"
                          title={`Deal health score / activity index: ${deal.score}`}
                        >
                          {deal.score}
                        </div>

                        {/* Micro Action Icons matching screenshot */}
                        <div className="flex items-center gap-2 text-slate-400">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Added note to "${deal.title}"`);
                            }}
                            className="hover:text-slate-700 p-0.5"
                            title="Add note"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Breeze AI insight for "${deal.title}"`);
                            }}
                            className="hover:text-purple-600 p-0.5"
                            title="Breeze AI summary"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Draft email for "${deal.title}"`);
                            }}
                            className="hover:text-slate-700 p-0.5"
                            title="Send email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast(`Create task for "${deal.title}"`);
                            }}
                            className="hover:text-slate-700 p-0.5"
                            title="Create task"
                          >
                            <CheckSquare className="w-3.5 h-3.5" />
                          </button>

                          {/* Stage advance helper */}
                          <button
                            onClick={(e) => handleAdvanceStage(deal.id, e)}
                            className="hover:text-[#ff7a59] p-0.5 ml-0.5"
                            title="Advance to next pipeline stage"
                          >
                            <MoveRight className="w-3.5 h-3.5 text-slate-400 hover:text-[#ff7a59]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="h-32 border border-dashed border-slate-200/90 rounded-md flex items-center justify-center text-xs text-slate-400">
                      No deals in stage
                    </div>
                  )}
                </div>
              )}

              {/* Column Footer: Total Amount and Weighted Amount (Exact match to screenshot) */}
              {!isCollapsed && (
                <div className="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
                  <div className="font-semibold text-slate-800">
                    ${stageTotal.toLocaleString()} <span className="font-normal text-slate-500">| Total amount</span>
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                    <span>
                      ${stageWeighted.toLocaleString()} ({Math.round(stage.probability * 100)}%) | Weighted amount
                    </span>
                    <span title="Weighted probability forecast" className="inline-flex">
                      <Info className="w-3 h-3 text-slate-400 shrink-0" />
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. BOTTOM BAR WITH BETA BADGE (Matching screenshot)           */}
      {/* ------------------------------------------------------------- */}
      <div className="h-8 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca]">
            Beta
          </span>
          <span className="text-slate-400 text-[11px]">HubSpot Deals Kanban Engine</span>
        </div>
        <div className="text-slate-400 text-[11px]">
          Showing {filteredDeals.length} of {deals.length} deals • Pipeline: Sales Pipeline
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. CREATE DEAL MODAL                                          */}
      {/* ------------------------------------------------------------- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-base text-slate-900">Create deal</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deal name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SEO consulting ongoing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#ff7a59] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Amount ($) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Close date</label>
                  <input
                    type="text"
                    placeholder="03/31/2026"
                    value={newCloseDate}
                    onChange={(e) => setNewCloseDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deal owner</label>
                  <select
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Thalita Milan">Thalita Milan</option>
                    <option value="Sarah Lin">Sarah Lin</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                    <option value="Marcus Vance">Marcus Vance</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pipeline stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    {SALES_PIPELINE_STAGES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#ff7a59] text-white text-xs font-semibold rounded-lg hover:bg-[#e06545]"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
