'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Mail,
  Send,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Paperclip,
  Search,
  Star,
  Trash2,
  Reply
} from 'lucide-react';

export interface InboxThread {
  id: string;
  senderName: string;
  senderEmail: string;
  companyName: string;
  companyId: string;
  subject: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  tag: string;
  messages: {
    id: string;
    sender: string;
    time: string;
    text: string;
  }[];
}

const INITIAL_THREADS: InboxThread[] = [
  {
    id: 'thread-1',
    senderName: 'Peter Example',
    senderEmail: 'peter.example@business.com',
    companyName: 'Business Example',
    companyId: 'cust-100',
    subject: 'Lot #9021B Cold Chain Telemetry Log & Reefer Schedule',
    preview: 'Hi Sarah, attaching the verified data-logger export for the 850 MT frozen beef batch. Can we lock in Friday 6 AM pickup?',
    timestamp: '10:14 AM',
    unread: true,
    tag: 'Cold Chain SLA',
    messages: [
      {
        id: 'm1',
        sender: 'Peter Example',
        time: 'Today, 10:14 AM',
        text: 'Hi Sarah, attaching the verified data-logger export for the 850 MT frozen beef batch. The deep-freeze temperature held at -22.4°C across all pallet zones. Can we lock in Friday 6 AM dock pickup with Carrier 448?'
      }
    ]
  },
  {
    id: 'thread-2',
    senderName: 'USDA FSIS District Office',
    senderEmail: 'district7.fsis@usda.gov',
    companyName: 'Apex Primal Beef & Fabricators',
    companyId: 'cust-101',
    subject: 'Official Verification Notice: Annual Grant of Inspection EST 4892A',
    preview: 'Please find attached the endorsed Form 9060-5 sanitary certificates for Q4 overseas exports.',
    timestamp: 'Yesterday',
    unread: true,
    tag: 'USDA Compliance',
    messages: [
      {
        id: 'm2',
        sender: 'USDA FSIS Inspector',
        time: 'Yesterday, 3:45 PM',
        text: 'Official notice of compliance for EST 4892A and EST 9021B. All microbiological surveillance sampling passed requirements.'
      }
    ]
  },
  {
    id: 'thread-3',
    senderName: 'Elena Rostova',
    senderEmail: 'elena.r@shenandoahpoultry.com',
    companyName: 'Shenandoah Broiler Farms & Deboning',
    companyId: 'cust-102',
    subject: 'Counter-signed Poultry Deboning Agreement (Net 15)',
    preview: 'Thank you for finalizing the chilled transport clauses. Our COO signed the addendum this morning.',
    timestamp: 'Sep 11',
    unread: false,
    tag: 'Contract Negotiation',
    messages: [
      {
        id: 'm3',
        sender: 'Elena Rostova',
        time: 'Sep 11, 11:20 AM',
        text: 'Thank you for finalizing the chilled transport clauses. Our COO signed the addendum this morning. Looking forward to our joint QA audit next month.'
      }
    ]
  },
  {
    id: 'thread-4',
    senderName: 'Carrier Dispatch (Great Lakes Reefer)',
    senderEmail: 'dispatch@glreefer.com',
    companyName: 'Pacific Rim Marine Harvest',
    companyId: 'cust-103',
    subject: 'Trailer #REF-3312 In-Transit GPS & Temperature Ping',
    preview: 'Container reached Seattle cold terminal. Core sensor reporting -25.1°C with zero defrost delays.',
    timestamp: 'Sep 09',
    unread: false,
    tag: 'Logistics Telemetry',
    messages: [
      {
        id: 'm4',
        sender: 'Carrier Dispatch',
        time: 'Sep 09, 4:02 PM',
        text: 'Container reached Seattle cold terminal. Core sensor reporting -25.1°C with zero defrost delays.'
      }
    ]
  }
];

interface InboxWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function InboxWorkspace({
  onOpenRecordDetail,
  showToast
}: InboxWorkspaceProps) {
  const [threads, setThreads] = useState<InboxThread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<string>(INITIAL_THREADS[0].id);
  const [replyText, setReplyText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const unreadCount = threads.filter(t => t.unread).length;

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const updatedThreads = threads.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unread: false,
          messages: [
            ...t.messages,
            {
              id: `reply-${Date.now()}`,
              sender: 'Sarah Lin (You)',
              time: 'Just now',
              text: replyText
            }
          ]
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setReplyText('');
    showToast(`Reply sent to ${activeThread.senderName}`);
  };

  const markAsRead = (threadId: string) => {
    setThreads(threads.map(t => t.id === threadId ? { ...t, unread: false } : t));
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inbox & Message Center</h1>
            <span className="text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              {unreadCount} Unread
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Unified communication hub with food plant executives, FSIS USDA inspectors, and cold carrier dispatch
          </p>
        </div>

        <button
          onClick={() => showToast('Composed new outbound message')}
          className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Mail className="w-4 h-4" />
          <span>Compose email</span>
        </button>
      </div>

      {/* Two-pane Inbox layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start h-[600px]">
        {/* Left Thread List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
          <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs font-bold text-slate-700">All Conversations</span>
            <span className="text-[11px] text-slate-400 font-medium">{threads.length} threads</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {threads.map((thread) => {
              const isSelected = thread.id === activeThreadId;

              return (
                <div
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id);
                    markAsRead(thread.id);
                  }}
                  className={`p-3.5 cursor-pointer transition-colors text-left relative ${
                    isSelected
                      ? 'bg-orange-50/60 border-l-4 border-l-[#ff7a59]'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs truncate font-bold ${thread.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                      {thread.senderName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-2">
                      {thread.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-slate-500 font-semibold truncate">
                      {thread.companyName}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                      {thread.tag}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-800 truncate">
                    {thread.subject}
                  </div>

                  <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                    {thread.preview}
                  </div>

                  {thread.unread && (
                    <span className="absolute top-4 right-3 w-2 h-2 rounded-full bg-[#ff7a59]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Message Pane */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
          {/* Thread Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-snug">{activeThread.subject}</h2>
              <div className="flex items-center gap-2 mt-1 text-xs">
                <span className="font-semibold text-slate-800">{activeThread.senderName}</span>
                <span className="text-slate-400">&lt;{activeThread.senderEmail}&gt;</span>
                <button
                  onClick={() => onOpenRecordDetail('contact', activeThread.companyId)}
                  className="text-xs text-[#ff7a59] hover:underline font-semibold"
                >
                  View Contact Record ↗
                </button>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
              {activeThread.tag}
            </span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {activeThread.messages.map((m) => (
              <div key={m.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{m.sender}</span>
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            ))}
          </div>

          {/* Quick Reply Form */}
          <form onSubmit={handleSendReply} className="p-3 border-t border-slate-200 bg-white space-y-2">
            <textarea
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeThread.senderName}... (e.g. Approved Friday 6 AM pickup, reefer trailer pre-cooling verified)`}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ff7a59] bg-slate-50/50"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                Breeze AI email tone assistant active
              </span>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Reply</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
