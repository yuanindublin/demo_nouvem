'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
  Search,
  Building2,
  Calendar,
  DollarSign,
  Plus
} from 'lucide-react';

export interface OrderItem {
  id: string;
  orderNumber: string;
  companyName: string;
  companyId: string;
  contactName: string;
  productDescription: string;
  volumeMetricTons: number;
  tempSpec: string;
  status: 'In Reefer Transit' | 'Dispatched' | 'Customs & QA Cleared' | 'Delivered' | 'Pending Dispatch';
  deliveryDate: string;
  totalValue: number;
  reeferTrailerId: string;
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: 'PO-2026-0842',
    companyName: 'Business Example',
    companyId: 'cust-100',
    contactName: 'Peter Example',
    productDescription: 'Frozen Beef Trimmings 85CL Combo Bins',
    volumeMetricTons: 120,
    tempSpec: '-22°C (Deep Freeze)',
    status: 'In Reefer Transit',
    deliveryDate: 'Sep 16, 2026',
    totalValue: 480000,
    reeferTrailerId: 'REF-7721-TX'
  },
  {
    id: 'ord-2',
    orderNumber: 'PO-2026-0841',
    companyName: 'Apex Primal Beef & Fabricators',
    companyId: 'cust-101',
    contactName: 'Marcus Vance',
    productDescription: 'Choice Heavy Ribeye Subprimals (112A)',
    volumeMetricTons: 250,
    tempSpec: '1°C (Chilled Strict)',
    status: 'Dispatched',
    deliveryDate: 'Sep 14, 2026',
    totalValue: 1250000,
    reeferTrailerId: 'REF-9044-NE'
  },
  {
    id: 'ord-3',
    orderNumber: 'PO-2026-0839',
    companyName: 'Pacific Rim Marine Harvest & Filleting',
    companyId: 'cust-103',
    contactName: 'Capt. Donald Tanaka',
    productDescription: 'IQF Wild Coho Salmon Portions 6oz',
    volumeMetricTons: 80,
    tempSpec: '-25°C (Super-Freezer)',
    status: 'Customs & QA Cleared',
    deliveryDate: 'Sep 12, 2026',
    totalValue: 720000,
    reeferTrailerId: 'REF-3312-WA'
  },
  {
    id: 'ord-4',
    orderNumber: 'PO-2026-0838',
    companyName: 'Shenandoah Broiler Farms & Deboning',
    companyId: 'cust-102',
    contactName: 'Elena Rostova',
    productDescription: 'Fresh Boneless Skinless Breast Fillets',
    volumeMetricTons: 160,
    tempSpec: '2°C (Controlled Chill)',
    status: 'Delivered',
    deliveryDate: 'Sep 10, 2026',
    totalValue: 496000,
    reeferTrailerId: 'REF-4820-VA'
  }
];

interface OrdersWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function OrdersWorkspace({
  onOpenRecordDetail,
  showToast
}: OrdersWorkspaceProps) {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [search, setSearch] = useState('');

  const totalVolume = orders.reduce((acc, o) => acc + o.volumeMetricTons, 0);
  const totalValue = orders.reduce((acc, o) => acc + o.totalValue, 0);

  const filteredOrders = orders.filter(o => 
    !search || 
    o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
    o.companyName.toLowerCase().includes(search.toLowerCase()) ||
    o.productDescription.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (st: OrderItem['status']) => {
    switch (st) {
      case 'In Reefer Transit': return 'bg-cyan-50 text-cyan-700 border-cyan-300 animate-pulse';
      case 'Dispatched': return 'bg-blue-50 text-blue-700 border-blue-300';
      case 'Customs & QA Cleared': return 'bg-purple-50 text-purple-700 border-purple-300';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cold-Chain Orders & Reefer Logistics</h1>
            <span className="text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded-full">
              {orders.length} Active Shipments
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time protein purchase orders, refrigerated linehauls, and delivery temperature verifications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right">
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Total Freight Volume</span>
            <span className="text-base font-bold text-slate-900">{totalVolume} MT</span>
          </div>
          <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-right">
            <span className="text-[10px] text-emerald-700 font-semibold uppercase block">Invoiced Value</span>
            <span className="text-base font-bold text-emerald-900">${(totalValue / 1000000).toFixed(2)}M</span>
          </div>
          <button
            onClick={() => showToast('Dispatched new Reefer PO workflow')}
            className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New order</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-3 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders, trailer ID or processor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
            />
          </div>
          <div className="text-xs text-slate-500">
            Telemetry SLA: 100% compliant
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">PO # & Spec</th>
                <th className="px-4 py-3">Customer / Plant</th>
                <th className="px-4 py-3">Throughput (MT)</th>
                <th className="px-4 py-3">Temp SLA</th>
                <th className="px-4 py-3">Reefer Trailer</th>
                <th className="px-4 py-3">Fulfillment Status</th>
                <th className="px-4 py-3">Delivery ETA</th>
                <th className="px-4 py-3 text-right">Order Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono font-bold text-slate-900 block">{o.orderNumber}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{o.productDescription}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onOpenRecordDetail('company', o.companyId)}
                      className="font-semibold text-slate-800 hover:text-[#ff7a59] flex items-center gap-1.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{o.companyName}</span>
                    </button>
                    <span className="text-[11px] text-slate-400 block">{o.contactName}</span>
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">
                    {o.volumeMetricTons} MT
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] text-cyan-700 font-medium bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded">
                      <ThermometerSnowflake className="w-3 h-3 text-cyan-600" />
                      {o.tempSpec}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-600">
                    <div className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{o.reeferTrailerId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(o.status)}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-[11px]">
                    {o.deliveryDate}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900 text-sm">
                    ${o.totalValue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
