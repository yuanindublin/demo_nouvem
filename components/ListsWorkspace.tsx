'use client';

import React, { useState } from 'react';
import {
  ListOrdered,
  Building2,
  Users,
  Search,
  Filter,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ThermometerSnowflake
} from 'lucide-react';
import { CustomerAccount } from '@/app/page';

interface ListsWorkspaceProps {
  customers: CustomerAccount[];
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export interface SmartListSegment {
  id: string;
  name: string;
  description: string;
  filterFn: (c: CustomerAccount) => boolean;
  category: string;
}

export default function ListsWorkspace({
  customers,
  onOpenRecordDetail,
  showToast
}: ListsWorkspaceProps) {
  const SMART_SEGMENTS: SmartListSegment[] = [
    {
      id: 'high-vol',
      name: 'High Volume Processors (>500 MT/mo)',
      description: 'Industrial meat, poultry, and seafood processors with massive monthly quotas.',
      category: 'Capacity',
      filterFn: (c) => c.monthlyVolumeMetricTons >= 500
    },
    {
      id: 'deep-freeze',
      name: 'Deep Freeze SLA (-25°C to -18°C)',
      description: 'Facilities requiring ultra-low temperature monitoring and telemetry verification.',
      category: 'Cold Chain',
      filterFn: (c) => c.coldChainSpec.includes('Deep Freeze') || c.coldChainSpec.includes('IQF')
    },
    {
      id: 'active-partners',
      name: 'Active Supply Partners',
      description: 'Fully contracted food processing accounts with operational billing cycles.',
      category: 'Lifecycle',
      filterFn: (c) => c.stage === 'Active Supply Partner'
    },
    {
      id: 'usda-meat',
      name: 'USDA-Inspected Beef & Poultry Fabricators',
      description: 'Establishments holding active FSIS grant of inspection numbers.',
      category: 'Compliance',
      filterFn: (c) => c.establishmentNumber.startsWith('USDA')
    },
    {
      id: 'sqf-certified',
      name: 'SQF Level 3 Certified Plants',
      description: 'Benchmark GFSI certified plants approved for multi-tier enterprise retail distribution.',
      category: 'Certifications',
      filterFn: (c) => c.certifications.includes('SQF Level 3')
    }
  ];

  const [activeSegmentId, setActiveSegmentId] = useState<string>('high-vol');
  const activeSegment = SMART_SEGMENTS.find(s => s.id === activeSegmentId) || SMART_SEGMENTS[0];
  const matchingCustomers = customers.filter(activeSegment.filterFn);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Smart Lists & Processor Segments</h1>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              {SMART_SEGMENTS.length} Pre-built Lists
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dynamic audience segmentation based on cold-chain SLAs, USDA inspection grants, and monthly throughput
          </p>
        </div>

        <button
          onClick={() => showToast('Smart Segment Builder opened')}
          className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New list segment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">
        {/* Left Segment Picker */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block">
            Saved Segments
          </span>
          <div className="space-y-1">
            {SMART_SEGMENTS.map((seg) => {
              const count = customers.filter(seg.filterFn).length;
              const isActive = seg.id === activeSegmentId;

              return (
                <button
                  key={seg.id}
                  onClick={() => setActiveSegmentId(seg.id)}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#ff7a59]/10 text-[#ff7a59] font-bold border border-[#ff7a59]/20'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="truncate font-semibold">{seg.name}</div>
                    <span className="text-[10px] text-slate-400 font-normal">{seg.category}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-[#ff7a59] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Matching Records Table */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
            <div>
              <h2 className="text-sm font-bold text-slate-900">{activeSegment.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeSegment.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                <strong>{matchingCustomers.length}</strong> matching companies
              </span>
              <button
                onClick={() => showToast(`Exported ${activeSegment.name} CSV`)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export list</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-4 py-3">Processor Facility</th>
                  <th className="px-4 py-3">Primary Contact</th>
                  <th className="px-4 py-3">Throughput</th>
                  <th className="px-4 py-3">Cold Chain Spec</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {matchingCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onOpenRecordDetail('company', c.id)}
                        className="font-bold text-slate-900 hover:text-[#ff7a59] text-left block"
                      >
                        {c.companyName}
                      </button>
                      <span className="text-[10px] text-slate-400 font-mono">{c.establishmentNumber} • {c.facilityLocation.city}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onOpenRecordDetail('contact', c.id)}
                        className="font-semibold text-blue-600 hover:underline block"
                      >
                        {c.primaryContact.name}
                      </button>
                      <span className="text-[10px] text-slate-400">{c.primaryContact.email}</span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {c.monthlyVolumeMetricTons.toLocaleString()} MT/mo
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-600 text-[11px] font-medium">
                        {c.coldChainSpec}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {c.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onOpenRecordDetail('contact', c.id)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#ff7a59] hover:text-white rounded text-slate-700 font-semibold text-[11px] transition-colors"
                      >
                        Open Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
