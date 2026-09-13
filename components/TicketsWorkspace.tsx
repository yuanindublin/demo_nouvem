'use client';

import React, { useState } from 'react';
import {
  Ticket,
  AlertCircle,
  Clock,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Building2,
  Users,
  ShieldCheck,
  ThermometerSnowflake
} from 'lucide-react';

export interface TicketItem {
  id: string;
  ticketNumber: string;
  title: string;
  companyName: string;
  companyId: string;
  contactName: string;
  category: 'Cold Chain Excursion' | 'HACCP Audit' | 'FSMA Compliance' | 'Spec & Lab Discrepancy' | 'Packaging';
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Under QA Review' | 'Resolved';
  assignee: string;
  createdDate: string;
  description: string;
}

const INITIAL_TICKETS: TicketItem[] = [
  {
    id: 'tck-1',
    ticketNumber: 'TCK-8921',
    title: 'Reefer Trailer Temp Excursion: -14°C on Lot #9021B (SLA requires <-18°C)',
    companyName: 'Business Example',
    companyId: 'cust-100',
    contactName: 'Peter Example',
    category: 'Cold Chain Excursion',
    priority: 'Urgent',
    status: 'In Progress',
    assignee: 'Alex Rivera (Cold Chain QA)',
    createdDate: 'Today at 08:30 AM',
    description: 'In-transit telemetry sensor alert triggered during Omaha cross-dock transfer. Core meat temperature verification swab required before release.'
  },
  {
    id: 'tck-2',
    ticketNumber: 'TCK-8919',
    title: 'USDA FSIS Wholesomeness & Organic Export Certificate Verification',
    companyName: 'Apex Primal Beef & Fabricators',
    companyId: 'cust-101',
    contactName: 'Marcus Vance',
    category: 'FSMA Compliance',
    priority: 'High',
    status: 'Open',
    assignee: 'Sarah Lin (QA Director)',
    createdDate: 'Yesterday at 04:15 PM',
    description: 'Customer requested expedited USDA Form 9060-5 for Q4 chilled beef container export to Asian processing hubs.'
  },
  {
    id: 'tck-3',
    ticketNumber: 'TCK-8915',
    title: 'Microbiological Swab Lab Results: Salmonella & Listeria PCR Negative',
    companyName: 'Shenandoah Broiler Farms & Deboning',
    companyId: 'cust-102',
    contactName: 'Elena Rostova',
    category: 'HACCP Audit',
    priority: 'Medium',
    status: 'Resolved',
    assignee: 'Dr. Chen (Senior Microbiologist)',
    createdDate: 'Sep 10, 2026',
    description: 'Quarterly environmental Listeria monitoring swabs from evisceration line 2 verified clear. Certificates attached to contact record.'
  },
  {
    id: 'tck-4',
    ticketNumber: 'TCK-8910',
    title: 'Tare Weight Discrepancy on Palletized IQF Salmon Fillet Shipment',
    companyName: 'Pacific Rim Marine Harvest & Filleting',
    companyId: 'cust-103',
    contactName: 'Capt. Donald Tanaka',
    category: 'Spec & Lab Discrepancy',
    priority: 'Medium',
    status: 'Under QA Review',
    assignee: 'Warehouse Receiving QA',
    createdDate: 'Sep 08, 2026',
    description: 'Reported 1.2% ice glaze tare deduction variance between plant manifest and dock scale. Re-weigh protocol initiated.'
  }
];

interface TicketsWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function TicketsWorkspace({
  onOpenRecordDetail,
  showToast
}: TicketsWorkspaceProps) {
  const [tickets, setTickets] = useState<TicketItem[]>(INITIAL_TICKETS);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TicketItem['category']>('Cold Chain Excursion');
  const [newPriority, setNewPriority] = useState<TicketItem['priority']>('High');

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch = !searchQuery || 
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTicket: TicketItem = {
      id: `tck-${Date.now()}`,
      ticketNumber: `TCK-${Math.floor(8900 + Math.random() * 100)}`,
      title: newTitle,
      companyName: 'Business Example',
      companyId: 'cust-100',
      contactName: 'Peter Example',
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      assignee: 'Sarah Lin (QA Director)',
      createdDate: 'Just now',
      description: 'Logged via Provisions Quality & Compliance Ticket Center.'
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateOpen(false);
    setNewTitle('');
    showToast(`Ticket ${newTicket.ticketNumber} created successfully`);
  };

  const getPriorityBadge = (p: TicketItem['priority']) => {
    switch (p) {
      case 'Urgent': return 'bg-rose-100 text-rose-800 border-rose-300 font-bold';
      case 'High': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (s: TicketItem['status']) => {
    switch (s) {
      case 'Resolved': return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Under QA Review': return 'bg-purple-50 text-purple-700 border-purple-300';
      default: return 'bg-amber-50 text-amber-700 border-amber-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Food Safety & Compliance Tickets</h1>
            <span className="text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-full">
              {tickets.filter(t => t.status !== 'Resolved').length} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cold-chain temperature excursion alerts, FSIS audit filings, lab microbiological reports, and packaging QA
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-right">
            <span className="text-[10px] text-rose-700 font-semibold uppercase block">Urgent Alerts</span>
            <span className="text-base font-bold text-rose-900">
              {tickets.filter(t => t.priority === 'Urgent').length} Cases
            </span>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New ticket</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs">
          {['all', 'Open', 'In Progress', 'Under QA Review', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {st === 'all' ? 'All Tickets' : st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets, company or est #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Ticket # & Subject</th>
                <th className="px-4 py-3">Processor / Customer</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">QA Assignee</th>
                <th className="px-4 py-3 text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3 max-w-[340px]">
                    <div className="font-mono text-[11px] font-bold text-slate-900">{t.ticketNumber}</div>
                    <div className="font-semibold text-slate-900 truncate mt-0.5">{t.title}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-0.5">{t.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onOpenRecordDetail('company', t.companyId)}
                      className="font-semibold text-slate-800 hover:text-[#ff7a59] flex items-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.companyName}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 block">{t.contactName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {t.category === 'Cold Chain Excursion' && <ThermometerSnowflake className="w-3 h-3 text-cyan-600" />}
                      {t.category === 'HACCP Audit' && <ShieldCheck className="w-3 h-3 text-blue-600" />}
                      {t.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] border ${getPriorityBadge(t.priority)}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(t.status)}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-medium">
                    {t.assignee}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-400 text-[11px]">
                    {t.createdDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal to Create Ticket */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Log Food Safety Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Subject / Issue Summary *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Temperature alarm during reefer transport"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TicketItem['category'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Cold Chain Excursion">Cold Chain Excursion</option>
                    <option value="HACCP Audit">HACCP Audit</option>
                    <option value="FSMA Compliance">FSMA Compliance</option>
                    <option value="Spec & Lab Discrepancy">Spec & Lab Discrepancy</option>
                    <option value="Packaging">Packaging</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as TicketItem['priority'])}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Urgent">🚨 Urgent</option>
                    <option value="High">⚠️ High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#ff7a59] text-white text-xs font-semibold rounded-lg hover:bg-[#e06545]"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
