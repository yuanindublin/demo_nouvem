'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle2,
  ThermometerSnowflake,
  Scale,
  Award,
  FileCheck2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  Building2,
  X
} from 'lucide-react';
import { CustomerAccount } from '@/app/page';

interface IrishManagementViewsProps {
  customers: CustomerAccount[];
  dublinTime: string;
  cutOffCountdown: { hours: number; minutes: number; seconds: number };
  onOpenRecordDetail: (type: 'contact' | 'company', id: string) => void;
  onOpenMockRecall: () => void;
  onSwitchToCrud: () => void;
}

// -------------------------------------------------------------
// 1. CEO / GM Executive Operational Dashboard
// -------------------------------------------------------------
export function CeoGmDashboard({
  customers,
  cutOffCountdown,
  onOpenRecordDetail,
  onOpenMockRecall,
  onSwitchToCrud
}: IrishManagementViewsProps) {
  return (
    <div className="space-y-6">
      {/* Top Executive Operational Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">出货总吨位 (Monthly Tonnage)</span>
            <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Scale className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">5,280 MT</span>
            <span className="text-xs font-semibold text-emerald-600">+8.4% MoM</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">草饲牛肉/家禽冷链加工总吞吐量</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">OTIF 履约率 (On-Time In-Full)</span>
            <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">99.4%</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">达标 (Target &gt;98.5%)</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">爱尔兰主要商超早班交付准点率</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">在途冷链车队 (Chilled Fleet)</span>
            <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">18 车次在途</span>
            <span className="text-xs font-semibold text-blue-600">温度传感器正常</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">0°C ~ 4°C 全程实时遥测监控</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">本土核心客户产值 (Contract Pipeline)</span>
            <span className="p-2 rounded-lg bg-orange-50 text-orange-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">€13.25M</span>
            <span className="text-xs font-semibold text-slate-500">/ 年合同额</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Dunnes, Tesco, Musgrave, BWG 覆盖</p>
        </div>
      </div>

      {/* SLA Cut-off Countdown Cards by Major Irish Retailer */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F58220]" />
              <span>爱尔兰各大商超早班冷链送货截单预警 (SLA Cut-Off Ticker)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              爱尔兰中央配送中心 (CDC) 严格要求于次日 05:30 ~ 06:30 AM 完成越库交接，逾期将产生巨额退货与 SLA 罚金。
            </p>
          </div>
          <button
            onClick={onOpenMockRecall}
            className="self-start sm:self-auto px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>启动 2小时模拟召回</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dunnes Stores */}
          <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Dunnes Stores</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                IE 542 EC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Newbridge CDC / Cornelscourt</p>
            
            <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">截单交付窗口</span>
                <span className="text-xs font-bold text-amber-400">06:00 AM Morning Gate</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">剩余倒计时</span>
                <span className="font-mono font-bold text-sm text-white">
                  {String(cutOffCountdown.hours).padStart(2, '0')}:{String(cutOffCountdown.minutes).padStart(2, '0')}:{String(cutOffCountdown.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">在途车次: <strong className="text-slate-800">4 辆冷藏车</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ThermometerSnowflake className="w-3.5 h-3.5" /> 1.8°C (合格)
              </span>
            </div>
          </div>

          {/* Tesco Ireland */}
          <div className="border border-amber-200 rounded-xl p-4 bg-gradient-to-b from-amber-50/40 to-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Tesco Ireland</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                IE 812 EC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Donabate Central Hub (Donabate)</p>
            
            <div className="mt-3 p-2.5 rounded-lg bg-amber-950 text-white flex items-center justify-between border border-amber-500/40">
              <div>
                <span className="text-[10px] uppercase text-amber-300 block font-semibold">极速截单窗口</span>
                <span className="text-xs font-bold text-amber-400">05:30 AM 紧迫</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-amber-300 block font-semibold">剩余倒计时</span>
                <span className="font-mono font-bold text-sm text-amber-300">
                  {String(Math.max(0, cutOffCountdown.hours - 1)).padStart(2, '0')}:{String(cutOffCountdown.minutes).padStart(2, '0')}:{String(cutOffCountdown.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">在途车次: <strong className="text-slate-800">3 辆冷藏车</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ThermometerSnowflake className="w-3.5 h-3.5" /> 2.1°C (合格)
              </span>
            </div>
          </div>

          {/* SuperValu Musgrave */}
          <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">SuperValu (Musgrave)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                IE 319 EC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Kilcock & Cork Distribution Hubs</p>
            
            <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">截单交付窗口</span>
                <span className="text-xs font-bold text-amber-400">06:00 AM Morning Gate</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">剩余倒计时</span>
                <span className="font-mono font-bold text-sm text-white">
                  {String(cutOffCountdown.hours).padStart(2, '0')}:{String(cutOffCountdown.minutes).padStart(2, '0')}:{String(cutOffCountdown.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">装运月台: <strong className="text-slate-800">Bay 2 装车完毕</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ThermometerSnowflake className="w-3.5 h-3.5" /> 2.4°C (合格)
              </span>
            </div>
          </div>

          {/* BWG Foods */}
          <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">BWG Foods (Spar)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                IE 477 EC
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Walkinstown Wholesale & Retail DC</p>
            
            <div className="mt-3 p-2.5 rounded-lg bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">截单交付窗口</span>
                <span className="text-xs font-bold text-amber-400">06:30 AM Morning Gate</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">剩余倒计时</span>
                <span className="font-mono font-bold text-sm text-white">
                  {String(cutOffCountdown.hours).padStart(2, '0')}:{String(cutOffCountdown.minutes + 30 > 59 ? cutOffCountdown.minutes - 30 : cutOffCountdown.minutes).padStart(2, '0')}:{String(cutOffCountdown.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">在途车次: <strong className="text-slate-800">2 辆冷藏车</strong></span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ThermometerSnowflake className="w-3.5 h-3.5" /> 3.1°C (合格)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Outbound Dispatches Telemetry Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">当日出货冷链批次与爱尔兰农业部 (DAFM) 兽医铅封状态</h3>
            <p className="text-xs text-slate-500">Live Cold-Chain Dispatch Manifest with DAFM Veterinary Seals</p>
          </div>
          <button
            onClick={onSwitchToCrud}
            className="text-xs font-semibold text-[#F58220] hover:underline flex items-center gap-1"
          >
            <span>进入客户档案管理</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">客户 (Retailer)</th>
                <th className="px-4 py-3">厂号 (DAFM #)</th>
                <th className="px-4 py-3">发货批次 (Batch ID)</th>
                <th className="px-4 py-3">产品品类 (Protein Spec)</th>
                <th className="px-4 py-3">吨位 (Tonnage)</th>
                <th className="px-4 py-3">在途车牌 (Reefer ID)</th>
                <th className="px-4 py-3">实时温控 (Telemetry)</th>
                <th className="px-4 py-3">Bord Bia 标示</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">Dunnes Stores</td>
                <td className="px-4 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800">IE 542 EC</span></td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600">LOT-2026-BEEF-9941</td>
                <td className="px-4 py-3">Grass-Fed Angus Ribeye &amp; Striploin (0°C~4°C)</td>
                <td className="px-4 py-3 font-bold text-slate-900">14.28 MT</td>
                <td className="px-4 py-3 font-mono">24-D-1902</td>
                <td className="px-4 py-3 text-emerald-600 font-medium">1.8°C (OK)</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Award className="w-3 h-3 text-emerald-600" />
                    Quality Mark
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onOpenRecordDetail('contact', 'cust-100')} className="text-xs font-semibold text-[#F58220] hover:underline">
                    查看联系人 ↗
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">Tesco Ireland</td>
                <td className="px-4 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800">IE 812 EC</span></td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600">LOT-2026-POUL-4011</td>
                <td className="px-4 py-3">Fresh Irish Chicken Fillets (Chilled Traypack)</td>
                <td className="px-4 py-3 font-bold text-slate-900">12.50 MT</td>
                <td className="px-4 py-3 font-mono">23-D-8821</td>
                <td className="px-4 py-3 text-emerald-600 font-medium">2.1°C (OK)</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Award className="w-3 h-3 text-emerald-600" />
                    Quality Mark
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onOpenRecordDetail('contact', 'cust-101')} className="text-xs font-semibold text-[#F58220] hover:underline">
                    查看联系人 ↗
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-slate-900">SuperValu (Musgrave)</td>
                <td className="px-4 py-3"><span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-800">IE 319 EC</span></td>
                <td className="px-4 py-3 font-mono text-xs text-blue-600">LOT-2026-BEEF-9942</td>
                <td className="px-4 py-3">Irish Sirloin &amp; Diced Stewing Beef (Chilled)</td>
                <td className="px-4 py-3 font-bold text-slate-900">9.80 MT</td>
                <td className="px-4 py-3 font-mono">22-C-5510</td>
                <td className="px-4 py-3 text-emerald-600 font-medium">2.4°C (OK)</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Award className="w-3 h-3 text-emerald-600" />
                    Quality Mark
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => onOpenRecordDetail('contact', 'cust-102')} className="text-xs font-semibold text-[#F58220] hover:underline">
                    查看联系人 ↗
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. CFO Financial & Credit Risk Dashboard
// -------------------------------------------------------------
export function CfoRiskDashboard({
  customers,
  onOpenRecordDetail
}: {
  customers: CustomerAccount[];
  onOpenRecordDetail: (type: 'contact' | 'company', id: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Top A/R Aging Risk Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">正常期内账款 (Current &lt;14 Days)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">€1,890,000</span>
            <span className="text-xs font-semibold text-emerald-600">76.2% 正常</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tesco (Net 14) &amp; Dunnes (Net 30) 良好付款</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">账期初度超期 (1 ~ 14 Days Overdue)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-600">€410,000</span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">16.5% 关注</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">BWG Foods Net 60 跨月对账周期</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">重度超期预警 (15 ~ 30 Days Overdue)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-600">€145,000</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">5.8% 催收</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Connacht Artisan Meats (18天逾期已暂停放单)</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">爱尔兰活牛原料利差监控 (R3 Steer Yield)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600">€5.15 / kg</span>
            <span className="text-xs font-semibold text-emerald-700">+22.4% 毛利差</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Bord Bia 牧场收购价 vs 商超分切出厂批发价</p>
        </div>
      </div>

      {/* Credit Limits & Payment Terms Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">核心商超客户账期风控与信贷额度管控 (Net 14 / Net 30 / Net 60)</h3>
            <p className="text-xs text-slate-500">Irish Retail Accounts Receivable Aging &amp; Credit Limit Exposure</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">统一计价币种:</span>
            <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-100 text-slate-800 border border-slate-300">
              EUR (€)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">客户名称 (Client)</th>
                <th className="px-4 py-3">约定账期 (Terms)</th>
                <th className="px-4 py-3">授信额度 (Credit Limit)</th>
                <th className="px-4 py-3">当前应收 (A/R Outstanding)</th>
                <th className="px-4 py-3">超期天数 (Aging)</th>
                <th className="px-4 py-3">额度使用率 (Exposure)</th>
                <th className="px-4 py-3">风控等级 (Risk Tier)</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customers.map((c) => {
                const limit = c.creditLimit || 500000;
                const outstanding = c.outstandingAr || 250000;
                const usage = Math.round((outstanding / limit) * 100);
                const overdue = c.overdueDays || 0;
                return (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">{c.companyName}</div>
                      <div className="text-[11px] text-slate-500">{c.primaryContact.name} ({c.primaryContact.title})</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                        c.paymentTerms === 'Net 14 Days'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : c.paymentTerms === 'Net 30 Days'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {c.paymentTerms}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-medium text-slate-900">€{limit.toLocaleString()}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">€{outstanding.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {overdue === 0 ? (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> 准时 (0天)
                        </span>
                      ) : (
                        <span className={`font-semibold flex items-center gap-1 ${overdue > 10 ? 'text-rose-600' : 'text-amber-600'}`}>
                          <AlertTriangle className="w-3.5 h-3.5" /> 逾期 {overdue} 天
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-500">
                          <span>{usage}%</span>
                          <span>Max €{(limit/1000).toFixed(0)}k</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${usage > 80 ? 'bg-rose-500' : usage > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(100, usage)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {usage > 80 || overdue > 10 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          High (冻结发货)
                        </span>
                      ) : overdue > 0 ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          Medium (催款中)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Tier 1 (优级信贷)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onOpenRecordDetail('contact', c.id)}
                        className="text-xs font-semibold text-[#F58220] hover:underline"
                      >
                        核查对账单 ↗
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Protein Margin & Yield Matrix (草饲牛初加工利差) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>爱尔兰牛肉加工分切初级原料利差核算 (Protein Fabrication Gross Margins)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-800 block">白条胴体进厂基准价 (Irish Steer R3 Base)</span>
            <div className="mt-1 text-lg font-bold text-slate-900">€5.15 / kg 胴体净重</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Bord Bia 挂牌均价，冷藏排酸 48 小时损耗率 1.4%</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-800 block">高价值原切部位肉 (Primal Cuts: Striploin/Ribeye)</span>
            <div className="mt-1 text-lg font-bold text-emerald-600">€14.80 / kg (+65.2% 溢价)</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Dunnes &amp; SuperValu 定制气调真空包装出厂结算</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-semibold text-slate-800 block">精瘦绞肉与边角料 (80CL / 90CL Beef Trim)</span>
            <div className="mt-1 text-lg font-bold text-blue-600">€4.20 / kg (保底工业回收)</div>
            <p className="text-[11px] text-slate-500 mt-0.5">BWG (Spar) 熟食碎肉汉堡排专供分流</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. QA Food Safety & Compliance Audit Dashboard
// -------------------------------------------------------------
export function QaComplianceDashboard({
  customers,
  onOpenRecordDetail,
  onOpenMockRecall
}: {
  customers: CustomerAccount[];
  onOpenRecordDetail: (type: 'contact' | 'company', id: string) => void;
  onOpenMockRecall: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Top Banner: Bord Bia Compliance Blocker Alert */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              爱尔兰国家食品局 (Bord Bia Quality Mark) 资质合规阻断引擎
            </h3>
            <p className="text-xs text-amber-800 mt-0.5">
              法定要求：所有进入 Dunnes, Tesco, Musgrave, BWG 的爱尔兰本土肉类必须通过 Bord Bia 认证。无此资质的客户或发货订单将被系统<strong>自动强制锁定阻断</strong>出库。
            </p>
          </div>
        </div>
        <button
          onClick={onOpenMockRecall}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all whitespace-nowrap"
        >
          一键 2小时模拟召回测试 ⚡
        </button>
      </div>

      {/* DAFM / FSAI Plant Approval Numbers Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              爱尔兰农业部 (DAFM) &amp; 食品安全局 (FSAI) 厂号准入与 Bord Bia 认证矩阵
            </h3>
            <p className="text-xs text-slate-500">EC Regulation 853/2004 Approved Establishments &amp; Origin Green</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            4 / 5 家完全合规
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">客户机构 (Company)</th>
                <th className="px-4 py-3">法定厂号 (DAFM Establishment)</th>
                <th className="px-4 py-3">Bord Bia 认证标志</th>
                <th className="px-4 py-3">FSAI 官方稽核状态</th>
                <th className="px-4 py-3">下次复审日期</th>
                <th className="px-4 py-3">出库许可阻断</th>
                <th className="px-4 py-3 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {customers.map((c) => {
                const isCompliant = c.hasBordBiaMark !== false;
                return (
                  <tr key={c.id} className={`hover:bg-slate-50 ${!isCompliant ? 'bg-rose-50/40' : ''}`}>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {c.companyName}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {c.establishmentNumber}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isCompliant ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Award className="w-3.5 h-3.5 text-emerald-600" />
                          已核准 (Certified)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          缺失资质 (Non-Compliant)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-600 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        官方合格通过 (Level A)
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">{c.nextAuditDate}</td>
                    <td className="px-4 py-3">
                      {isCompliant ? (
                        <span className="text-emerald-700 font-medium">允许发货 (Cleared)</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded font-bold text-[11px] bg-rose-600 text-white animate-pulse">
                          ⛔ 阻断发货 (BLOCKED)
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onOpenRecordDetail('company', c.id)}
                        className="text-xs font-semibold text-[#F58220] hover:underline"
                      >
                        合规档案 ↗
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* HACCP 4 Critical Control Points (CCP) Real-Time Telemetry */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ThermometerSnowflake className="w-4 h-4 text-blue-600" />
          <span>HACCP 关键控制点 (CCP 1-4) 车间温控与微生物关键限值实时监测</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>CCP 1: 活牛屠宰胴体接收</span>
              <span className="text-emerald-600 font-bold">PASS</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900">2.8°C</div>
            <p className="text-[10px] text-slate-500 mt-1">法定上限 &lt; 7.0°C (DAFM Annex III)</p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>CCP 2: 精细分割车间环境</span>
              <span className="text-emerald-600 font-bold">PASS</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900">9.4°C</div>
            <p className="text-[10px] text-slate-500 mt-1">法定上限 &lt; 12.0°C (EC 853/2004)</p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>CCP 3: 螺旋单冻隧道 (IQF)</span>
              <span className="text-emerald-600 font-bold">PASS</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900">-36.8°C</div>
            <p className="text-[10px] text-slate-500 mt-1">中心温度速冻至 -18°C 以下</p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>CCP 4: 冷藏月台发运交接</span>
              <span className="text-emerald-600 font-bold">PASS</span>
            </div>
            <div className="mt-1 text-xl font-bold text-slate-900">3.4°C</div>
            <p className="text-[10px] text-slate-500 mt-1">商超交付上限 &lt; 4.0°C 严格温控</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Interactive 1-Click Mock Recall Modal (模拟召回系统)
// -------------------------------------------------------------
export function MockRecallModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedLot, setSelectedLot] = useState('LOT-IE-2026-BEEF-9941');

  if (!isOpen) return null;

  const handleStartTrace = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setFinished(true);
    }, 1200);
  };

  const handleReset = () => {
    setFinished(false);
    setRunning(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0A2540] text-white px-6 py-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>爱尔兰 DAFM / FSAI 法定 2小时模拟召回审计 (Mock Recall Audit)</span>
              </h2>
              <p className="text-xs text-slate-300">
                符合欧盟法规 EC 178/2002 第18条 &amp; 爱尔兰国家食品局 (Bord Bia) 质量全链路物料平衡回溯
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-700">
          {/* Target Lot Selector & Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                选择待召回测试批次号 (Target Lot for Mock Recall)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={selectedLot}
                  onChange={(e) => setSelectedLot(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 w-64"
                />
                <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 font-mono font-semibold text-[11px]">
                  DAFM Plant: IE 542 EC
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!finished ? (
                <button
                  onClick={handleStartTrace}
                  disabled={running}
                  className="px-4 py-2 rounded-lg font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 shadow-md transition-all flex items-center gap-2"
                >
                  {running ? (
                    <>
                      <RotateCcw className="w-4 h-4 animate-spin" />
                      <span>正在全链路物料平衡计算中...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>立即执行 100% 质量穿透召回</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
                >
                  重新选择批次
                </button>
              )}
            </div>
          </div>

          {/* Trace Results Dashboard */}
          {finished && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Audit Pass Banner */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">
                      审计通过：100.0% 物料平衡回溯达成 (AUDIT PASSED — 100% TRACEABILITY)
                    </h4>
                    <p className="text-xs text-emerald-800">
                      回溯完成耗时: <strong>18 分钟</strong>（爱尔兰 FSAI 法定上限: 120 分钟）。物料质量差额: <strong>0.00 kg (完美平账)</strong>。
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                  FSAI COMPLIANT
                </span>
              </div>

              {/* 3-Tier Traceability Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Inbound Cattle Intake */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-xs">① 上游活牛/原料接收</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-mono">
                      Inbound
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <p><strong>供应牧场:</strong> Dawn Meats (Co. Waterford)</p>
                    <p><strong>耳标批次:</strong> 42 Head Aberdeen Angus</p>
                    <p><strong>进厂总净重:</strong> <span className="font-bold text-slate-900 font-mono">14,280 kg</span></p>
                    <p><strong>Bord Bia 标章:</strong> 牧场认证有效 (PASSED)</p>
                    <p><strong>屠宰日期:</strong> 2026-03-08</p>
                  </div>
                </div>

                {/* 2. Processing & Fabrication Batches */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-xs">② 车间精分割批次转化</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-50 text-purple-700 font-mono">
                      Fabrication
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <p><strong>高值原切 (PB-8812):</strong> 8,200 kg (Ribeye/Striploin)</p>
                    <p><strong>工业绞肉 (PB-8813):</strong> 5,680 kg (80CL Trim)</p>
                    <p><strong>留样质检库 (Ref Samples):</strong> 400 kg</p>
                    <p><strong>下线核销总量:</strong> <span className="font-bold text-slate-900 font-mono">14,280 kg</span></p>
                    <p><strong>HACCP CCP记录:</strong> 全部合格 (100% PASS)</p>
                  </div>
                </div>

                {/* 3. Downstream Retail Deliveries */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold text-slate-900 text-xs">③ 下游核心商超配送终端</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-700 font-mono">
                      Dispatched
                    </span>
                  </div>
                  <div className="space-y-1 text-slate-600">
                    <p><strong>Dunnes Stores Newbridge:</strong> 8,200 kg (托盘 DUN-0891~94)</p>
                    <p><strong>Tesco Ireland Donabate:</strong> 3,800 kg (托盘 TES-1022~24)</p>
                    <p><strong>SuperValu Musgrave:</strong> 1,880 kg (托盘 MUS-4410)</p>
                    <p><strong>工厂冷藏留存备件:</strong> 400 kg (隔离封存)</p>
                    <p><strong>追溯成功率:</strong> <span className="font-bold text-emerald-600 font-mono">100.0% 准确定位</span></p>
                  </div>
                </div>
              </div>

              {/* Mass Balance Calculation Equation */}
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  法定物料平衡平衡方程式 (FSAI Mass Balance Verification Equation):
                </div>
                <div className="text-slate-300">
                  原料总重 (14,280 kg) = 商超发出 (8,200 + 3,800 + 1,880 kg) + 工厂隔离留样 (400 kg)
                </div>
                <div className="text-emerald-400 font-bold">
                  Σ Input (14,280 kg) - Σ Output (14,280 kg) = 0.00 kg Variance (Discrepancy: 0%)
                </div>
              </div>
            </div>
          )}

          {!finished && !running && (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">点击上方按钮启动爱尔兰官方标准模拟召回演练</p>
              <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                系统将即时穿透屠宰批次、车间加工批号、冷链在途运输及最终交付至 Dunnes Stores、Tesco Ireland 和 SuperValu 的托盘记录。
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            爱尔兰农业部 DAFM 认可检验记录系统 · 生成时间: 2026-03-13
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
