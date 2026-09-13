'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Building2,
  Users,
  Calendar,
  Plus,
  Search,
  Sparkles,
  Volume2
} from 'lucide-react';

export interface CallLog {
  id: string;
  contactName: string;
  companyName: string;
  companyId: string;
  direction: 'Inbound' | 'Outbound';
  duration: string;
  date: string;
  outcome: 'Connected' | 'Left Voicemail' | 'Scheduled Follow-up' | 'Busy';
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Action Required';
}

const INITIAL_CALLS: CallLog[] = [
  {
    id: 'call-1',
    contactName: 'Peter Example',
    companyName: 'Business Example',
    companyId: 'cust-100',
    direction: 'Outbound',
    duration: '18m 42s',
    date: 'Today, 09:30 AM',
    outcome: 'Connected',
    summary: 'Discussed 1,450 MT/mo beef trim contract terms and deep-freeze telemetry requirements (-22°C threshold). Peter confirmed plant visit next Wednesday.',
    sentiment: 'Positive'
  },
  {
    id: 'call-2',
    contactName: 'Marcus Vance',
    companyName: 'Apex Primal Beef & Fabricators',
    companyId: 'cust-101',
    direction: 'Inbound',
    duration: '12m 15s',
    date: 'Yesterday, 02:10 PM',
    outcome: 'Connected',
    summary: 'Reviewed Q3 heavy ribeye subprimal allocation. Marcus requested urgent re-issue of USDA Form 9060-5 for export container.',
    sentiment: 'Positive'
  },
  {
    id: 'call-3',
    contactName: 'Elena Rostova',
    companyName: 'Shenandoah Broiler Farms & Deboning',
    companyId: 'cust-102',
    direction: 'Outbound',
    duration: '24m 05s',
    date: 'Sep 10, 2026',
    outcome: 'Connected',
    summary: 'Detailed review of chilled transport SLA clauses and micro-testing schedule. Reached consensus on Net 15 payment terms.',
    sentiment: 'Positive'
  },
  {
    id: 'call-4',
    contactName: 'Dr. Nathan Cross (USDA FSIS)',
    companyName: 'Midwest Culinary Prepared Foods Co.',
    companyId: 'cust-104',
    direction: 'Inbound',
    duration: '08m 19s',
    date: 'Sep 08, 2026',
    outcome: 'Scheduled Follow-up',
    summary: 'Confirmed date for HACCP reassessment walk-through. Requires packaging integrity records for retort pouch line.',
    sentiment: 'Action Required'
  }
];

interface CallsWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function CallsWorkspace({
  onOpenRecordDetail,
  showToast
}: CallsWorkspaceProps) {
  const [calls, setCalls] = useState<CallLog[]>(INITIAL_CALLS);
  const [directionFilter, setDirectionFilter] = useState<string>('all');
  const [isLogCallOpen, setIsLogCallOpen] = useState(false);
  const [newSummary, setNewSummary] = useState('');

  const filteredCalls = calls.filter(c => {
    if (directionFilter === 'all') return true;
    return c.direction.toLowerCase() === directionFilter.toLowerCase();
  });

  const handleSaveCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSummary.trim()) return;

    const newCall: CallLog = {
      id: `call-${Date.now()}`,
      contactName: 'Peter Example',
      companyName: 'Business Example',
      companyId: 'cust-100',
      direction: 'Outbound',
      duration: '15m 00s',
      date: 'Just now',
      outcome: 'Connected',
      summary: newSummary,
      sentiment: 'Positive'
    };

    setCalls([newCall, ...calls]);
    setIsLogCallOpen(false);
    setNewSummary('');
    showToast('Call logged with Peter Example');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Call Center & Meeting Logs</h1>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              {calls.length} Logged Calls
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Voice conversations, cold-chain QA syncs, and automated AI call summaries for food processing leaders
          </p>
        </div>

        <button
          onClick={() => setIsLogCallOpen(true)}
          className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Log a call</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => setDirectionFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            directionFilter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          All Calls ({calls.length})
        </button>
        <button
          onClick={() => setDirectionFilter('outbound')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            directionFilter === 'outbound' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          Outbound Calls
        </button>
        <button
          onClick={() => setDirectionFilter('inbound')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
            directionFilter === 'inbound' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
          }`}
        >
          Inbound Calls
        </button>
      </div>

      {/* Calls List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredCalls.map((call) => (
          <div key={call.id} className="p-4 hover:bg-slate-50/70 transition-colors space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  call.direction === 'Outbound' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                }`}>
                  {call.direction === 'Outbound' ? <PhoneOutgoing className="w-4 h-4" /> : <PhoneIncoming className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenRecordDetail('contact', call.companyId)}
                      className="font-bold text-xs text-slate-900 hover:text-[#ff7a59] transition-colors"
                    >
                      {call.contactName}
                    </button>
                    <span className="text-[11px] text-slate-400">• {call.companyName}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{call.direction}</span>
                    <span>• Duration: {call.duration}</span>
                    <span>• {call.outcome}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="text-[11px] font-mono text-slate-400">{call.date}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  call.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {call.sentiment}
                </span>
              </div>
            </div>

            {/* Call Summary & AI Notes */}
            <div className="ml-11 p-3 bg-slate-50 border border-slate-200/70 rounded-lg text-xs text-slate-700 leading-relaxed flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 mr-1">AI Call Transcript Summary:</span>
                {call.summary}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Log Call Modal */}
      {isLogCallOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Log Phone Conversation</h3>
            <form onSubmit={handleSaveCall} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Call with Contact</label>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium">
                  Peter Example (CEO / Operations Director) - Business Example
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Call Notes & Key Takeaways *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter notes on cold-chain capacity, contract redlines, or next action items..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLogCallOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#ff7a59] text-white text-xs font-semibold rounded-lg hover:bg-[#e06545]"
                >
                  Save Call Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
