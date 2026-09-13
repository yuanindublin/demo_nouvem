'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  Ticket,
  ShoppingBag,
  ListOrdered,
  Inbox,
  PhoneCall,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Command,
  ShieldCheck,
  RotateCcw,
  Download,
  Plus,
  LayoutDashboard
} from 'lucide-react';

export type MainNavSection = 
  | 'dashboard'
  | 'contacts'
  | 'companies'
  | 'deals'
  | 'tickets'
  | 'orders'
  | 'lists'
  | 'inbox'
  | 'calls'
  | 'tasks';

interface FloatingSlimRailProps {
  activeSection: MainNavSection;
  onSelectSection: (section: MainNavSection) => void;
  badgeCounts?: {
    inbox?: number;
    tasks?: number;
    tickets?: number;
    deals?: number;
  };
  onQuickPeterContact?: () => void;
  onOpenCreate?: () => void;
  onResetDemo?: () => void;
  onExportStandalone?: () => void;
}

export default function FloatingSlimRail({
  activeSection,
  onSelectSection,
  badgeCounts = { inbox: 3, tasks: 4, tickets: 2, deals: 5 },
  onQuickPeterContact,
  onOpenCreate,
  onResetDemo,
  onExportStandalone
}: FloatingSlimRailProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Core CRM Objects (常用类)
  const coreObjects = [
    {
      id: 'dashboard' as MainNavSection,
      label: 'Dashboard',
      sublabel: '综合业务联动看板',
      icon: LayoutDashboard,
      hotkey: '⌘0',
      badge: 'Live',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 font-bold'
    },
    {
      id: 'contacts' as MainNavSection,
      label: 'Contacts',
      sublabel: '联系人',
      icon: Users,
      hotkey: '⌘1',
      badge: null
    },
    {
      id: 'companies' as MainNavSection,
      label: 'Companies',
      sublabel: '公司 / 工厂',
      icon: Building2,
      hotkey: '⌘2',
      badge: null
    },
    {
      id: 'deals' as MainNavSection,
      label: 'Deals',
      sublabel: '商机谈判',
      icon: TrendingUp,
      hotkey: '⌘3',
      badge: badgeCounts.deals ? `${badgeCounts.deals}` : null,
      badgeColor: 'bg-emerald-100 text-emerald-700'
    },
    {
      id: 'tickets' as MainNavSection,
      label: 'Tickets',
      sublabel: '质检合规工单',
      icon: Ticket,
      hotkey: '⌘4',
      badge: badgeCounts.tickets ? `${badgeCounts.tickets}` : null,
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'orders' as MainNavSection,
      label: 'Orders',
      sublabel: '冷链履约订单',
      icon: ShoppingBag,
      hotkey: '⌘5',
      badge: null
    }
  ];

  // Activity & Workspace Area (活动区)
  const activityAreas = [
    {
      id: 'lists' as MainNavSection,
      label: 'Lists',
      sublabel: '智能列表分群',
      icon: ListOrdered,
      hotkey: '⌘6',
      badge: null
    },
    {
      id: 'inbox' as MainNavSection,
      label: 'Inbox',
      sublabel: '统一消息收件箱',
      icon: Inbox,
      hotkey: '⌘7',
      badge: badgeCounts.inbox ? `${badgeCounts.inbox}` : null,
      badgeColor: 'bg-blue-100 text-blue-700 font-semibold'
    },
    {
      id: 'calls' as MainNavSection,
      label: 'Calls',
      sublabel: '通话记录与排程',
      icon: PhoneCall,
      hotkey: '⌘8',
      badge: null
    },
    {
      id: 'tasks' as MainNavSection,
      label: 'Tasks',
      sublabel: '待办与合规复核',
      icon: CheckSquare,
      hotkey: '⌘9',
      badge: badgeCounts.tasks ? `${badgeCounts.tasks}` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    }
  ];

  return (
    <aside
      id="floating-slim-rail"
      aria-label="Floating Slim Navigation Rail"
      className={`hidden md:flex flex-col fixed left-3 top-3 bottom-3 z-40 transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-200/50 rounded-2xl select-none ${
        isExpanded ? 'w-[218px]' : 'w-[64px]'
      }`}
    >
      {/* Top Brand / Logo */}
      <div className="p-3 border-b border-slate-100 flex items-center justify-between">
        <div 
          onClick={() => onSelectSection('companies')}
          className="flex items-center gap-2.5 cursor-pointer group w-full overflow-hidden"
          title="Provisions Food & Protein CRM"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff7a59] to-[#ff987d] text-white font-bold flex items-center justify-center shrink-0 shadow-xs shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xs tracking-tight">FP</span>
          </div>
          {isExpanded && (
            <div className="overflow-hidden whitespace-nowrap">
              <div className="font-bold text-xs text-slate-900 leading-tight tracking-tight">Provisions CRM</div>
              <div className="text-[10px] text-slate-400 font-medium">Food & Protein Hub</div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Button (Create) */}
      <div className="px-2.5 py-2 border-b border-slate-100">
        {isExpanded ? (
          <button
            onClick={onOpenCreate}
            className="w-full py-1.5 px-3 bg-[#ff7a59] hover:bg-[#e06545] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Record</span>
          </button>
        ) : (
          <button
            onClick={onOpenCreate}
            className="w-10 h-8 mx-auto bg-[#ff7a59] hover:bg-[#e06545] text-white rounded-lg flex items-center justify-center shadow-xs transition-colors"
            title="Create New Food Processor Record"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-2 py-2.5 space-y-4 no-scrollbar">
        
        {/* GROUP 1: 常用类 (Core CRM Objects) */}
        <div>
          {isExpanded ? (
            <div className="px-2.5 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>常用类 Objects</span>
              <span className="text-[9px] text-slate-300 font-mono">5</span>
            </div>
          ) : (
            <div className="h-2" />
          )}

          <div className="space-y-1">
            {coreObjects.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    id={`rail-nav-${item.id}`}
                    onClick={() => onSelectSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                      isActive
                        ? 'bg-[#ff7a59]/10 text-[#ff7a59] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {/* Active Pip Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#ff7a59] rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#ff7a59]' : 'text-slate-500 group-hover:text-slate-900'
                      }`}
                    />

                    {isExpanded ? (
                      <div className="flex-1 flex items-center justify-between overflow-hidden text-left">
                        <div className="overflow-hidden">
                          <span className="block truncate leading-none">{item.label}</span>
                          <span className="text-[10px] text-slate-400 font-normal leading-none mt-0.5 block">{item.sublabel}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      item.badge && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff7a59]" />
                      )
                    )}
                  </button>

                  {/* Linear/Raycast Style Floating Tooltip when collapsed */}
                  {!isExpanded && hoveredItem === item.id && (
                    <div className="absolute left-[70px] top-1/2 -translate-y-1/2 z-50 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-2 border border-slate-800 animate-in fade-in zoom-in-95 duration-150">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-slate-400 text-[10px]">({item.sublabel})</span>
                      <kbd className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono border border-slate-700">
                        {item.hotkey}
                      </kbd>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-slate-100 my-2" />

        {/* GROUP 2: 活动区 (Activity Area & Workspace) */}
        <div>
          {isExpanded ? (
            <div className="px-2.5 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>活动区 Workspace</span>
              <span className="text-[9px] text-slate-300 font-mono">4</span>
            </div>
          ) : (
            <div className="h-1" />
          )}

          <div className="space-y-1">
            {activityAreas.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <div key={item.id} className="relative">
                  <button
                    id={`rail-nav-${item.id}`}
                    onClick={() => onSelectSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                      isActive
                        ? 'bg-[#ff7a59]/10 text-[#ff7a59] shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {/* Active Pip Indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#ff7a59] rounded-r-full" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#ff7a59]' : 'text-slate-500 group-hover:text-slate-900'
                      }`}
                    />

                    {isExpanded ? (
                      <div className="flex-1 flex items-center justify-between overflow-hidden text-left">
                        <div className="overflow-hidden">
                          <span className="block truncate leading-none">{item.label}</span>
                          <span className="text-[10px] text-slate-400 font-normal leading-none mt-0.5 block">{item.sublabel}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${item.badgeColor || 'bg-slate-100 text-slate-600'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    ) : (
                      item.badge && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500" />
                      )
                    )}
                  </button>

                  {/* Tooltip when collapsed */}
                  {!isExpanded && hoveredItem === item.id && (
                    <div className="absolute left-[70px] top-1/2 -translate-y-1/2 z-50 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-2 border border-slate-800 animate-in fade-in zoom-in-95 duration-150">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-slate-400 text-[10px]">({item.sublabel})</span>
                      {item.badge && (
                        <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1 rounded">
                          {item.badge} new
                        </span>
                      )}
                      <kbd className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono border border-slate-700">
                        {item.hotkey}
                      </kbd>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Quick Contact Button */}
        {onQuickPeterContact && (
          <div className="pt-2">
            <button
              onClick={onQuickPeterContact}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-semibold bg-orange-50/80 border border-orange-200 text-[#ff7a59] hover:bg-orange-100/90 transition-all ${
                isExpanded ? 'justify-start' : 'justify-center'
              }`}
              title="Open Peter Example Contact Record"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-[#ff7a59]" />
              {isExpanded && <span className="truncate">Peter Example ↗</span>}
            </button>
          </div>
        )}
      </div>

      {/* Bottom Controls / Expand-Collapse & User Profile */}
      <div className="p-2 border-t border-slate-100 space-y-1.5">
        {/* Toggle Expand / Slim Rail */}
        <button
          id="btn-toggle-rail-expand"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
            isExpanded ? 'justify-between' : 'justify-center'
          }`}
          title={isExpanded ? '收起微导轨 (Collapse rail)' : '展开导航微导轨 (Expand rail)'}
        >
          {isExpanded ? (
            <>
              <span className="text-[11px]">收起微导轨</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </>
          ) : (
            <ChevronRight className="w-3.5 h-3.5" />
          )}
        </button>

        {/* User Pill / System Status */}
        <div className={`flex items-center gap-2 p-1 rounded-xl bg-slate-50 border border-slate-100 ${
          isExpanded ? 'px-2' : 'justify-center'
        }`}>
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
              SL
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
          </div>
          {isExpanded && (
            <div className="overflow-hidden">
              <div className="text-[11px] font-bold text-slate-800 leading-tight truncate">Sarah Lin</div>
              <div className="text-[9px] text-slate-400 truncate">Provisions QA Dir.</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
