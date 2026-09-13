export const STANDALONE_HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Food Processor CRM - HubSpot Style (Single HTML Format)</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#f5f8fa] text-slate-800 min-h-screen flex flex-col antialiased selection:bg-[#ff7a59] selection:text-white md:pl-[76px] transition-all duration-300">

  <!-- Floating Slim Rail (Linear / Raycast / Stripe Dashboard Inspired) -->
  <aside id="floating-slim-rail" class="fixed left-3 top-3 bottom-3 z-40 w-16 bg-[#1e293b]/95 backdrop-blur-md text-slate-300 border border-slate-700/60 rounded-2xl shadow-2xl flex flex-col items-center py-3 px-1 transition-all duration-300 select-none">
    <!-- Brand / Logo -->
    <button onclick="switchNavSection('companies')" class="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff7a59] to-orange-400 text-white font-black text-sm flex items-center justify-center shadow-md mb-2 hover:scale-105 transition-transform" title="Provisions CRM">
      FP
    </button>

    <div class="w-8 h-[1px] bg-slate-800 mb-2"></div>

    <!-- Core Objects Section (常用类) -->
    <div class="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1">Core</div>
    <div class="flex flex-col gap-1 w-full items-center">
      <!-- Contacts -->
      <button onclick="switchNavSection('contacts')" id="rail-btn-contacts" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Contacts [⌘1]">
        <i data-lucide="users" class="w-4 h-4"></i>
      </button>
      <!-- Companies -->
      <button onclick="switchNavSection('companies')" id="rail-btn-companies" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-white bg-[#ff7a59] shadow-md shadow-[#ff7a59]/30" title="Companies [⌘2]">
        <i data-lucide="building-2" class="w-4 h-4"></i>
      </button>
      <!-- Deals -->
      <button onclick="switchNavSection('deals')" id="rail-btn-deals" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Deals Pipeline [⌘3]">
        <i data-lucide="trending-up" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-[#ff7a59] text-white flex items-center justify-center">5</span>
      </button>
      <!-- Tickets -->
      <button onclick="switchNavSection('tickets')" id="rail-btn-tickets" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Safety & HACCP Tickets [⌘4]">
        <i data-lucide="life-buoy" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-rose-500 text-white flex items-center justify-center">2</span>
      </button>
      <!-- Orders -->
      <button onclick="switchNavSection('orders')" id="rail-btn-orders" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Orders & Logistics [⌘5]">
        <i data-lucide="truck" class="w-4 h-4"></i>
      </button>
    </div>

    <div class="w-8 h-[1px] bg-slate-800 my-2"></div>

    <!-- Activity Area Section (活动区) -->
    <div class="text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1">Act</div>
    <div class="flex flex-col gap-1 w-full items-center">
      <!-- Lists -->
      <button onclick="switchNavSection('lists')" id="rail-btn-lists" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Smart Lists [⌘6]">
        <i data-lucide="list-filter" class="w-4 h-4"></i>
      </button>
      <!-- Inbox -->
      <button onclick="switchNavSection('inbox')" id="rail-btn-inbox" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Unified Inbox [⌘7]">
        <i data-lucide="inbox" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-blue-500 text-white flex items-center justify-center">3</span>
      </button>
      <!-- Calls -->
      <button onclick="switchNavSection('calls')" id="rail-btn-calls" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Call Logs [⌘8]">
        <i data-lucide="phone-call" class="w-4 h-4"></i>
      </button>
      <!-- Tasks -->
      <button onclick="switchNavSection('tasks')" id="rail-btn-tasks" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60" title="Compliance Tasks [⌘9]">
        <i data-lucide="check-square" class="w-4 h-4"></i>
        <span class="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 text-[9px] font-bold rounded-full bg-emerald-500 text-white flex items-center justify-center">4</span>
      </button>
    </div>

    <!-- Bottom Quick Actions -->
    <div class="mt-auto flex flex-col gap-1 w-full items-center pt-2 border-t border-slate-800">
      <button onclick="openRecordDetail('contact', 'cust-100')" class="w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-orange-300 hover:text-white hover:bg-orange-950/50" title="Peter Example Contact Detail">
        <span class="w-7 h-7 rounded-full bg-[#ff7a59] text-white font-bold text-xs flex items-center justify-center shadow-xs">PE</span>
      </button>
      <button onclick="openCreateModal()" class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60" title="Quick Create Record">
        <i data-lucide="plus" class="w-4 h-4"></i>
      </button>
    </div>
  </aside>

  <!-- Toast Notification -->
  <div id="toast" class="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-slate-800 transition-all duration-300 opacity-0 pointer-events-none translate-y-[-10px]">
    <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400"></i>
    <span id="toast-msg" class="text-sm font-medium">Ready</span>
  </div>

  <!-- NOUVEM Irish Global Top Header -->
  <header class="h-14 bg-[#0A2540] text-white px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md border-b border-blue-900/60">
    <div class="flex items-center gap-3 sm:gap-5">
      <div class="flex items-center gap-2.5 cursor-pointer" onclick="switchNavSection('companies')">
        <div class="w-8 h-8 rounded-lg bg-[#F58220] flex items-center justify-center font-black text-white text-xs shadow-md tracking-wider">
          NVM
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-white font-bold text-sm tracking-tight">NOUVEM Meat & Protein ERP</span>
            <span class="text-[9px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-[#F58220] border border-[#F58220]/40 px-1.5 py-0.2 rounded hidden sm:inline">
              Ireland Edition
            </span>
          </div>
          <div class="text-[10px] text-slate-400 font-mono hidden md:block">DAFM / FSAI Compliance • Bord Bia QA Certified</div>
        </div>
      </div>

      <!-- Navigation tabs -->
      <nav class="hidden lg:flex items-center gap-1 text-xs">
        <button onclick="switchNavSection('contacts')" id="nav-btn-contacts" class="px-2.5 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5">
          <i data-lucide="users" class="w-3.5 h-3.5"></i>
          <span>Contacts</span>
        </button>
        <button onclick="switchNavSection('companies')" id="nav-btn-companies" class="px-2.5 py-1.5 rounded-md font-medium text-white bg-blue-900/70 transition-colors flex items-center gap-1.5">
          <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
          <span>Companies</span>
        </button>
        <button onclick="switchNavSection('deals')" id="nav-btn-deals" class="px-2.5 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5">
          <i data-lucide="trending-up" class="w-3.5 h-3.5"></i>
          <span>Retail Supply Deals</span>
        </button>
        <button onclick="switchNavSection('tickets')" id="nav-btn-tickets" class="px-2.5 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5">
          <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
          <span>HACCP & Audits</span>
        </button>
      </nav>
    </div>

    <!-- Right Controls: Live Dublin Clock & Action Buttons -->
    <div class="flex items-center gap-3">
      <div class="hidden sm:flex items-center gap-2 bg-[#133256] border border-blue-900/80 px-3 py-1.5 rounded-lg text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-slate-300">🇮🇪 Dublin:</span>
        <span id="standalone-dublin-clock" class="font-mono font-bold text-amber-400">--:--:-- IST</span>
      </div>
      <button onclick="openMockRecallModal()" class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-200 bg-rose-950/60 border border-rose-800/80 hover:bg-rose-900/80 rounded-lg transition-colors">
        <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-400"></i>
        <span>模拟召回演练</span>
      </button>
      <button onclick="openCreateModal()" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#F58220] hover:bg-[#e07116] rounded-lg shadow-sm transition-all">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>新建客户/订单</span>
      </button>
    </div>
  </header>

  <!-- Perspective Switcher Bar -->
  <div class="bg-[#0A2540] border-b border-blue-950 px-6 py-2.5 text-white">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-1 p-1 bg-[#133256] rounded-xl border border-blue-900/60 text-xs font-semibold">
        <button onclick="setPerspective('ceo')" id="persp-btn-ceo" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-white bg-[#F58220] shadow-sm">
          <i data-lucide="gauge" class="w-3.5 h-3.5"></i>
          <span>CEO/GM 经营看板</span>
        </button>
        <button onclick="setPerspective('cfo')" id="persp-btn-cfo" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-slate-300 hover:text-white hover:bg-blue-900/40">
          <i data-lucide="coins" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>CFO 账期风控</span>
        </button>
        <button onclick="setPerspective('qa')" id="persp-btn-qa" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-slate-300 hover:text-white hover:bg-blue-900/40">
          <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-blue-400"></i>
          <span>QA 合规审计</span>
        </button>
        <button onclick="setPerspective('crud')" id="persp-btn-crud" class="px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-slate-300 hover:text-white hover:bg-blue-900/40">
          <i data-lucide="layout-list" class="w-3.5 h-3.5 text-slate-300"></i>
          <span>业务客户管理</span>
        </button>
      </div>

      <div class="flex items-center gap-3 text-xs">
        <div class="flex items-center gap-1.5 text-amber-300 bg-amber-950/40 border border-amber-800/50 px-3 py-1 rounded-lg">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Dunnes/Tesco 截单倒计时:</span>
          <span id="standalone-sla-countdown" class="font-mono text-white font-bold">04h 22m</span>
        </div>
        <div class="text-[11px] text-slate-400 hidden lg:block">
          Net 14 / Net 30 / Net 60 账期支持 • 欧元结算 (€)
        </div>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- VIEW CONTAINER: CEO/GM Perspective Cockpit               -->
  <!-- ======================================================== -->
  <div id="view-perspective-ceo" class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <!-- Top KPI Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>当月总出货吨位</span>
          <i data-lucide="scale" class="w-4 h-4 text-blue-600"></i>
        </div>
        <div class="text-2xl font-black text-slate-900">6,870 <span class="text-xs font-normal text-slate-500">MT</span></div>
        <div class="text-[11px] text-emerald-600 font-semibold mt-1">↑ +8.4% 较上月增长 • 超越生产配额</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>综合 OTIF 履约达标率</span>
          <i data-lucide="trending-up" class="w-4 h-4 text-emerald-600"></i>
        </div>
        <div class="text-2xl font-black text-emerald-600">99.6%</div>
        <div class="text-[11px] text-slate-500 mt-1">爱尔兰零售标准 &gt; 98.5% (卓越评级)</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>商超早班截单窗口</span>
          <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-500"></i>
        </div>
        <div class="text-2xl font-black text-amber-600">06:00 AM</div>
        <div class="text-[11px] text-amber-700 font-semibold mt-1">冷链车队配载中 • 履约准时度 100%</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>年度直供合同池</span>
          <i data-lucide="euro" class="w-4 h-4 text-purple-600"></i>
        </div>
        <div class="text-2xl font-black text-slate-900">€13.75M</div>
        <div class="text-[11px] text-purple-700 font-semibold mt-1">覆盖 4 大爱尔兰商超集团</div>
      </div>
    </div>

    <!-- Irish Supermarkets SLA Matrix -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div class="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="clock" class="w-4 h-4 text-[#F58220]"></i>
          <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">爱尔兰核心零售商客户 06:00 AM 履约交付监控</h3>
        </div>
        <span class="text-[11px] text-slate-500">实时冷链物流状态</span>
      </div>
      <div class="divide-y divide-slate-100 text-xs">
        <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">DS</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 text-sm">Dunnes Stores (Retail & Wholesale)</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Bord Bia 认证通过</span>
              </div>
              <div class="text-slate-500 text-[11px] mt-0.5">厂号: IE 388 EC • 约定截单 06:00 AM • 约定账期: Net 30 Days</div>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">今日出货</span>
              <span class="font-bold text-slate-800 font-mono">1,950 MT</span>
            </div>
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">履约状态</span>
              <span class="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">车队运送中 (On Track)</span>
            </div>
          </div>
        </div>

        <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">TI</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 text-sm">Tesco Ireland Central Distribution</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Bord Bia 认证通过</span>
              </div>
              <div class="text-slate-500 text-[11px] mt-0.5">厂号: IE 892 EC • 约定截单 05:30 AM • 约定账期: Net 14 Days (特快结账)</div>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">今日出货</span>
              <span class="font-bold text-slate-800 font-mono">2,400 MT</span>
            </div>
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">履约状态</span>
              <span class="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">DC 码头签收完毕 (99.6% OTIF)</span>
            </div>
          </div>
        </div>

        <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs">SV</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 text-sm">SuperValu (Musgrave Group Cork)</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Bord Bia 认证通过</span>
              </div>
              <div class="text-slate-500 text-[11px] mt-0.5">厂号: IE 311 EC • 约定截单 06:00 AM • 约定账期: Net 30 Days</div>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">今日出货</span>
              <span class="font-bold text-slate-800 font-mono">1,600 MT</span>
            </div>
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">履约状态</span>
              <span class="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded">分流仓就绪 (Staged)</span>
            </div>
          </div>
        </div>

        <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/80 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-lg bg-red-100 text-red-700 font-bold flex items-center justify-center text-xs">BWG</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-slate-900 text-sm">BWG Foods (Spar Ireland)</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Bord Bia 认证通过</span>
              </div>
              <div class="text-slate-500 text-[11px] mt-0.5">厂号: IE 405 EC • 约定截单 07:00 AM • 约定账期: Net 60 Days</div>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">今日出货</span>
              <span class="font-bold text-slate-800 font-mono">920 MT</span>
            </div>
            <div class="text-right">
              <span class="text-slate-400 block text-[10px]">履约状态</span>
              <span class="text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-1 rounded">配车完成待发车</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- VIEW CONTAINER: CFO Perspective (A/R Aging & Margin Risk)-->
  <!-- ======================================================== -->
  <div id="view-perspective-cfo" class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 hidden">
    <!-- CFO Metrics Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>A/R 应收账款余额</span>
          <i data-lucide="wallet" class="w-4 h-4 text-blue-600"></i>
        </div>
        <div class="text-2xl font-black text-slate-900">€1,650,000</div>
        <div class="text-[11px] text-slate-500 mt-1">爱尔兰主流商超月度流动池</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>逾期未结账款 (Overdue)</span>
          <i data-lucide="alert-circle" class="w-4 h-4 text-rose-600"></i>
        </div>
        <div class="text-2xl font-black text-rose-600">€660,000</div>
        <div class="text-[11px] text-rose-700 font-semibold mt-1">BWG (12天) 及试验厂 (28天)</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>商超账期分布结构</span>
          <i data-lucide="calendar" class="w-4 h-4 text-purple-600"></i>
        </div>
        <div class="text-lg font-bold text-slate-900">Net 14 / 30 / 60</div>
        <div class="text-[11px] text-purple-700 font-semibold mt-1">Tesco 14天最快 • BWG 60天</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>肉类品类平均毛利率</span>
          <i data-lucide="pie-chart" class="w-4 h-4 text-emerald-600"></i>
        </div>
        <div class="text-2xl font-black text-emerald-600">18.2%</div>
        <div class="text-[11px] text-emerald-700 font-semibold mt-1">牛肉分割 22.4% • 家禽 17.8%</div>
      </div>
    </div>

    <!-- Credit & Overdue Table -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div class="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">零售客户授信限额与逾期风控矩阵</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
            <tr>
              <th class="px-4 py-3">客户名称</th>
              <th class="px-4 py-3">约定账期</th>
              <th class="px-4 py-3">授信额度</th>
              <th class="px-4 py-3">当前 A/R 余额</th>
              <th class="px-4 py-3">逾期天数</th>
              <th class="px-4 py-3">风控评级</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-900">Dunnes Stores</td>
              <td class="px-4 py-3"><span class="bg-slate-100 px-2 py-0.5 rounded font-medium">Net 30 Days</span></td>
              <td class="px-4 py-3 font-mono">€1,200,000</td>
              <td class="px-4 py-3 font-bold text-blue-700 font-mono">€420,000</td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">0 天 (按时)</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">AAA 优质</span></td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-900">Tesco Ireland</td>
              <td class="px-4 py-3"><span class="bg-slate-100 px-2 py-0.5 rounded font-medium">Net 14 Days</span></td>
              <td class="px-4 py-3 font-mono">€1,500,000</td>
              <td class="px-4 py-3 font-bold text-blue-700 font-mono">€310,000</td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">0 天 (按时)</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">AAA 优质</span></td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-900">SuperValu (Musgrave)</td>
              <td class="px-4 py-3"><span class="bg-slate-100 px-2 py-0.5 rounded font-medium">Net 30 Days</span></td>
              <td class="px-4 py-3 font-mono">€1,000,000</td>
              <td class="px-4 py-3 font-bold text-blue-700 font-mono">€380,000</td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">0 天 (按时)</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">AA 优良</span></td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-900">BWG Foods (Spar)</td>
              <td class="px-4 py-3"><span class="bg-slate-100 px-2 py-0.5 rounded font-medium">Net 60 Days</span></td>
              <td class="px-4 py-3 font-mono">€800,000</td>
              <td class="px-4 py-3 font-bold text-amber-700 font-mono">€540,000</td>
              <td class="px-4 py-3 text-rose-600 font-bold">逾期 12 天</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">B 中度关注</span></td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-900">Non-Compliant Trial Plant</td>
              <td class="px-4 py-3"><span class="bg-slate-100 px-2 py-0.5 rounded font-medium">Net 14 Days</span></td>
              <td class="px-4 py-3 font-mono">€150,000</td>
              <td class="px-4 py-3 font-bold text-rose-700 font-mono">€120,000</td>
              <td class="px-4 py-3 text-rose-600 font-black">逾期 28 天</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">⛔ 信用冻结</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- VIEW CONTAINER: QA Perspective (Compliance & Mock Recall)-->
  <!-- ======================================================== -->
  <div id="view-perspective-qa" class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 hidden">
    <!-- QA Metrics Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>Bord Bia 认证合格率</span>
          <i data-lucide="award" class="w-4 h-4 text-emerald-600"></i>
        </div>
        <div class="text-2xl font-black text-emerald-600">83.3%</div>
        <div class="text-[11px] text-slate-500 mt-1">5 家已获认证 • 1 家未通过已阻断</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>DAFM / FSAI 许可状态</span>
          <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
        </div>
        <div class="text-2xl font-black text-slate-900">100% 备案</div>
        <div class="text-[11px] text-blue-700 font-semibold mt-1">兽医检验厂号 IE 542 EC 等正常</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>冷链物联网遥测异常</span>
          <i data-lucide="thermometer-snowflake" class="w-4 h-4 text-cyan-500"></i>
        </div>
        <div class="text-2xl font-black text-emerald-600">0 次越界</div>
        <div class="text-[11px] text-slate-500 mt-1">深冷仓 -22.4°C • 冷藏 1.8°C 恒温</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-1 font-semibold uppercase tracking-wider">
          <span>2小时模拟召回演练</span>
          <i data-lucide="alert-octagon" class="w-4 h-4 text-rose-500"></i>
        </div>
        <div class="text-lg font-bold text-slate-900">就绪率 100%</div>
        <button onclick="openMockRecallModal()" class="text-[11px] text-rose-600 font-bold hover:underline block mt-1">
          立即触发模拟追溯演练 →
        </button>
      </div>
    </div>

    <!-- Bord Bia Compliance Table -->
    <div class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      <div class="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <h3 class="text-xs font-bold text-slate-800 uppercase tracking-wider">爱尔兰国家标准资质矩阵 (Bord Bia & DAFM)</h3>
        <button onclick="openMockRecallModal()" class="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <i data-lucide="play" class="w-3.5 h-3.5 text-rose-600"></i>
          <span>开始 2小时模拟召回演练</span>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-600 font-semibold uppercase border-b border-slate-200">
            <tr>
              <th class="px-4 py-3">工厂及商超客户</th>
              <th class="px-4 py-3">DAFM / FSAI 厂号</th>
              <th class="px-4 py-3">Bord Bia Quality Mark</th>
              <th class="px-4 py-3">发货阻断机制</th>
              <th class="px-4 py-3">下次现场审计</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">Peter Example / Kerry Foods Supply</td>
              <td class="px-4 py-3 font-mono font-semibold">IE 542 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✓ Certified</span></td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">正常放行</td>
              <td class="px-4 py-3">2026-10-15</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">Dunnes Stores</td>
              <td class="px-4 py-3 font-mono font-semibold">IE 388 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✓ Certified</span></td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">正常放行</td>
              <td class="px-4 py-3">2026-11-20</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">Tesco Ireland</td>
              <td class="px-4 py-3 font-mono font-semibold">IE 892 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✓ Certified</span></td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">正常放行</td>
              <td class="px-4 py-3">2026-09-30</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">SuperValu (Musgrave)</td>
              <td class="px-4 py-3 font-mono font-semibold">IE 311 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✓ Certified</span></td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">正常放行</td>
              <td class="px-4 py-3">2026-12-05</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-bold text-slate-900">BWG Foods (Spar)</td>
              <td class="px-4 py-3 font-mono font-semibold">IE 405 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">✓ Certified</span></td>
              <td class="px-4 py-3 text-emerald-600 font-semibold">正常放行</td>
              <td class="px-4 py-3">2026-10-28</td>
            </tr>
            <tr class="bg-rose-50/50">
              <td class="px-4 py-3 font-bold text-rose-900">Non-Compliant Trial Plant (Flagged)</td>
              <td class="px-4 py-3 font-mono font-semibold text-rose-700">IE 999 EC</td>
              <td class="px-4 py-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-200 text-rose-900">⛔ 资质缺失</span></td>
              <td class="px-4 py-3 text-rose-700 font-bold">已触发发货强制阻断</td>
              <td class="px-4 py-3 text-rose-700 font-semibold">资质待重审</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- VIEW CONTAINER A: Directory Lists (Companies / Contacts) -->
  <!-- ======================================================== -->
  <div id="directory-view-container" class="flex-1 flex flex-col">
    <!-- Secondary Sub-header with Metrics -->
    <div class="bg-white border-b border-slate-200 px-6 py-3">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-3">
            <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button onclick="setDirectory('companies')" id="toggle-dir-comp" class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all bg-white text-slate-900 shadow-xs">
                <i data-lucide="building-2" class="w-3.5 h-3.5"></i>
                <span id="label-count-companies">Companies (0)</span>
              </button>
              <button onclick="setDirectory('contacts')" id="toggle-dir-cont" class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all text-slate-500 hover:text-slate-900">
                <i data-lucide="users" class="w-3.5 h-3.5"></i>
                <span id="label-count-contacts">Contacts (0)</span>
              </button>
            </div>
            <button onclick="openRecordDetail('contact', 'cust-100')" class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#ff7a59] bg-orange-50 border border-orange-200 hover:bg-orange-100 rounded-md transition-colors">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Featured: Peter Example Contact Page ↗</span>
            </button>
          </div>
          <p id="directory-subtitle" class="text-xs text-slate-500 mt-1">
            Small business customer relationship & supply chain pipeline for protein and food processors
          </p>
        </div>

        <!-- Quick Metrics -->
        <div class="flex items-center gap-3 text-xs">
          <div class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span class="text-slate-500 block text-[10px] uppercase font-semibold">Active Supply Partners</span>
            <span id="metric-active" class="font-bold text-slate-900 text-sm text-emerald-600">0 Accounts</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <span class="text-slate-500 block text-[10px] uppercase font-semibold">Contract Throughput</span>
            <span id="metric-volume" class="font-bold text-slate-900 text-sm">0 MT / mo</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hidden sm:block">
            <span class="text-slate-500 block text-[10px] uppercase font-semibold">Pipeline Value</span>
            <span id="metric-value" class="font-bold text-slate-900 text-sm text-blue-600">$0.00M</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Workspace Workspace -->
    <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-4">
      <!-- Filter, View Toggle & Search Toolbar -->
      <div class="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <!-- Quick View Tabs -->
          <div class="flex items-center gap-1 overflow-x-auto text-xs font-medium" id="quick-tabs">
            <button onclick="setTabFilter('all')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap bg-slate-100 text-slate-900 font-semibold" data-tab="all">All Companies</button>
            <button onclick="setTabFilter('meat')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50" data-tab="meat">🥩 Meat & Beef</button>
            <button onclick="setTabFilter('poultry')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50" data-tab="poultry">🍗 Poultry</button>
            <button onclick="setTabFilter('seafood')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50" data-tab="seafood">🐟 Seafood</button>
            <button onclick="setTabFilter('prepared')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50" data-tab="prepared">🏭 Prepared Foods</button>
            <button onclick="setTabFilter('high_volume')" class="tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50" data-tab="high_volume">⚡ High Volume (>500 MT)</button>
          </div>

          <!-- View Mode Toggle: Table vs Board -->
          <div class="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200" id="view-mode-toggle-group">
            <button onclick="switchView('table')" id="btn-mode-table" class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-white text-slate-900 shadow-xs">
              <i data-lucide="table" class="w-3.5 h-3.5"></i>
              <span>List</span>
            </button>
            <button onclick="switchView('board')" id="btn-mode-board" class="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900">
              <i data-lucide="kanban" class="w-3.5 h-3.5"></i>
              <span>Board</span>
            </button>
          </div>
        </div>

        <!-- Search and Sort -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="relative w-full sm:w-80">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
            <input
              type="text"
              id="search-input"
              oninput="handleSearch(this.value)"
              placeholder="Search companies, contacts, EST #..."
              class="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"
            />
          </div>

          <div class="flex items-center gap-2 text-xs text-slate-500 w-full sm:w-auto justify-end">
            <span>Sort by:</span>
            <select onchange="handleSortChange(this.value)" class="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-2.5 py-1.5">
              <option value="companyName-asc">Company name (A-Z)</option>
              <option value="companyName-desc">Company name (Z-A)</option>
              <option value="monthlyVolumeMetricTons-desc">Monthly volume (High to Low)</option>
              <option value="annualContractValue-desc">Contract value (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Companies Table View -->
      <div id="container-table" class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs whitespace-nowrap">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="px-4 py-3">Company Name</th>
                <th class="px-4 py-3">Sector</th>
                <th class="px-4 py-3">Pipeline Stage</th>
                <th class="px-4 py-3">Primary Contact</th>
                <th class="px-4 py-3">Throughput</th>
                <th class="px-4 py-3">Contract ($)</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="table-body" class="divide-y divide-slate-100 text-slate-700"></tbody>
          </table>
        </div>
        <div class="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>Showing <strong id="filter-count" class="text-slate-800">0</strong> companies</div>
          <div>HACCP Verified Cold Chain CRM</div>
        </div>
      </div>

      <!-- Contacts Directory Table View -->
      <div id="container-contacts-dir" class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs whitespace-nowrap">
            <thead class="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th class="px-4 py-3">Contact Name</th>
                <th class="px-4 py-3">Associated Company</th>
                <th class="px-4 py-3">Email Address</th>
                <th class="px-4 py-3">Phone Number</th>
                <th class="px-4 py-3">Lifecycle Stage</th>
                <th class="px-4 py-3">Cold Chain Spec</th>
                <th class="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="contacts-table-body" class="divide-y divide-slate-100 text-slate-700"></tbody>
          </table>
        </div>
        <div class="px-4 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>Showing <strong id="contacts-filter-count" class="text-slate-800">0</strong> processor contacts</div>
          <div>Click contact name to open full 3-column detailed contact view</div>
        </div>
      </div>

      <!-- Companies Kanban Board View -->
      <div id="container-board" class="grid grid-cols-1 md:grid-cols-5 gap-3 overflow-x-auto pb-4 items-start hidden"></div>
    </main>
  </div>

  <!-- ======================================================== -->
  <!-- VIEW CONTAINER B: HubSpot 3-Column Record Detailed Page  -->
  <!-- ======================================================== -->
  <div id="record-detail-container" class="flex-1 flex flex-col bg-[#f5f8fa] hidden">
    <!-- Top Breadcrumb Bar -->
    <div class="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center justify-between sticky top-14 z-20 shadow-2xs">
      <div class="flex items-center gap-3">
        <button onclick="closeRecordDetail()" class="text-xs font-semibold text-[#ff7a59] hover:underline flex items-center gap-1">
          <i data-lucide="chevron-left" class="w-4 h-4"></i>
          <span id="detail-back-label">Contacts</span>
        </button>
        <span class="text-slate-300">/</span>
        <span id="detail-breadcrumb-title" class="text-xs font-medium text-slate-600">Peter Example</span>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="switchRecordMode()" id="btn-switch-record-mode" class="px-3 py-1 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded hover:bg-slate-200 transition-colors">
          Switch to Company View
        </button>
        <button onclick="editCurrentRecord()" class="px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 transition-colors shadow-2xs">
          Edit Properties
        </button>
      </div>
    </div>

    <!-- Main 3-Column Layout -->
    <div class="max-w-[1520px] w-full mx-auto p-4 sm:p-6 flex-1 flex flex-col lg:flex-row gap-5 items-start">
      
      <!-- ================= LEFT COLUMN: About & AI Summary ================= -->
      <div class="w-full lg:w-[330px] shrink-0 space-y-4">
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <!-- Avatar + Name -->
          <div class="flex items-start gap-3.5">
            <div id="detail-avatar" class="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-lg shadow-xs">
              PE
            </div>
            <div>
              <h1 id="detail-main-name" class="text-base font-bold text-slate-900 leading-tight">Peter Example</h1>
              <p id="detail-main-title" class="text-xs text-slate-500 font-medium mt-0.5">CEO / Operations Director</p>
              <button onclick="toggleAssociatedCompany()" id="detail-company-link" class="text-xs font-semibold text-[#ff7a59] hover:underline block mt-0.5">
                Business Example ↗
              </button>
            </div>
          </div>

          <!-- Status badges -->
          <div class="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span id="detail-stage-badge" class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">Lead</span>
            <span class="text-slate-400">•</span>
            <span class="text-slate-500 text-[11px]">Owner: <strong>Sarah Lin (Provisions QA)</strong></span>
          </div>

          <!-- Breeze AI Summary Box -->
          <div class="mt-4 p-3.5 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-orange-50/30 border border-indigo-100 rounded-xl">
            <div class="flex items-center gap-1.5 text-xs font-bold text-indigo-900">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-indigo-600"></i>
              <span>Breeze AI Intelligence Summary</span>
            </div>
            <p id="detail-ai-summary" class="text-xs text-slate-700 mt-2 leading-relaxed">
              High-value protein processing executive overseeing USDA-inspected cold chain facilities. Strong lead with active RFP underway for 850 MT/month.
            </p>
          </div>

          <!-- 6 Circular Action Buttons -->
          <div class="grid grid-cols-6 gap-2 mt-5 pt-4 border-t border-slate-100">
            <button onclick="quickActionClick('Note')" title="Add Note" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="file-text" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Note</span>
            </button>
            <button onclick="quickActionClick('Email')" title="Send Email" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="mail" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Email</span>
            </button>
            <button onclick="quickActionClick('Call')" title="Make Call" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="phone" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Call</span>
            </button>
            <button onclick="quickActionClick('Task')" title="Create Task" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="check-square" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Task</span>
            </button>
            <button onclick="quickActionClick('Meeting')" title="Schedule Meeting" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="calendar" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Meet</span>
            </button>
            <button onclick="quickActionClick('WhatsApp')" title="WhatsApp Contact" class="flex flex-col items-center gap-1 group">
              <div class="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-[#ff7a59] group-hover:text-white text-slate-700 flex items-center justify-center transition-colors">
                <i data-lucide="message-square" class="w-4 h-4"></i>
              </div>
              <span class="text-[10px] text-slate-600">Chat</span>
            </button>
          </div>

          <!-- Key Information Section -->
          <div class="mt-6 pt-5 border-t border-slate-100 space-y-3.5 text-xs">
            <span class="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">About this Record</span>
            <div>
              <span class="text-slate-400 block text-[11px]">Email Address</span>
              <a href="#" id="detail-info-email" class="font-medium text-[#ff7a59] hover:underline mt-0.5 block">peter.example@business.com</a>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Phone Number</span>
              <span id="detail-info-phone" class="font-medium text-slate-800 mt-0.5 block">(555) 019-2831</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Lifecycle Stage</span>
              <span id="detail-info-stage" class="font-medium text-slate-800 mt-0.5 block">Lead / Inbound</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Cold Chain SLA Spec</span>
              <span id="detail-info-coldchain" class="font-medium text-slate-800 mt-0.5 block">Deep Freeze (-25°C to -18°C)</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Facility Location</span>
              <span id="detail-info-location" class="font-medium text-slate-800 mt-0.5 block">Omaha, NE</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= CENTER COLUMN: Activity Timeline & Form ================= -->
      <div class="flex-1 w-full space-y-4">
        <!-- Center Activity Hub -->
        <div class="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <!-- Timeline Subtabs -->
          <div class="border-b border-slate-200 px-4 flex items-center justify-between overflow-x-auto text-xs font-semibold">
            <div class="flex items-center gap-4">
              <button onclick="switchTimelineTab('activity')" class="timeline-tab py-3 border-b-2 border-[#ff7a59] text-[#ff7a59] flex items-center gap-1.5" data-tab="activity">
                <i data-lucide="layers" class="w-3.5 h-3.5"></i>
                <span>Activity</span>
              </button>
              <button onclick="switchTimelineTab('notes')" class="timeline-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5" data-tab="notes">
                <i data-lucide="file-text" class="w-3.5 h-3.5"></i>
                <span>Notes</span>
              </button>
              <button onclick="switchTimelineTab('emails')" class="timeline-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5" data-tab="emails">
                <i data-lucide="mail" class="w-3.5 h-3.5"></i>
                <span>Emails</span>
              </button>
              <button onclick="switchTimelineTab('calls')" class="timeline-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5" data-tab="calls">
                <i data-lucide="phone" class="w-3.5 h-3.5"></i>
                <span>Calls</span>
              </button>
              <button onclick="switchTimelineTab('tasks')" class="timeline-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5" data-tab="tasks">
                <i data-lucide="check-square" class="w-3.5 h-3.5"></i>
                <span>Tasks</span>
              </button>
            </div>
            <button onclick="toggleActivityComposer()" class="text-xs font-semibold text-[#ff7a59] hover:underline flex items-center gap-1 py-2">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Log activity</span>
            </button>
          </div>

          <!-- Activity Composer Box -->
          <div id="activity-composer" class="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
            <div class="flex items-center gap-2">
              <select id="composer-type" class="text-xs bg-white border border-slate-300 rounded px-2.5 py-1 font-semibold text-slate-700">
                <option value="Note">📝 Add Note</option>
                <option value="Call">📞 Log Call</option>
                <option value="Email">✉️ Log Email</option>
                <option value="Meeting">🤝 Log Meeting</option>
                <option value="Task">✅ Create Task</option>
              </select>
              <input type="text" id="composer-title" placeholder="Activity title or subject..." class="flex-1 text-xs bg-white border border-slate-300 rounded px-3 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]" />
            </div>
            <textarea id="composer-body" rows="2" placeholder="Enter notes, cold-chain specifications discussed, or next steps..." class="w-full text-xs bg-white border border-slate-300 rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#ff7a59]"></textarea>
            <div class="flex justify-end gap-2">
              <button onclick="toggleActivityComposer()" class="px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded">Cancel</button>
              <button onclick="submitNewActivity()" class="px-4 py-1 text-xs font-semibold text-white bg-[#ff7a59] hover:bg-[#e06545] rounded shadow-xs">Save</button>
            </div>
          </div>

          <!-- Timeline Activities Feed -->
          <div class="p-5 space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100">
              <span class="font-bold text-xs text-slate-900 uppercase tracking-wider">March 2026</span>
              <span class="text-[11px] text-slate-400">Chronological history</span>
            </div>

            <!-- Dynamic Timeline Items Container -->
            <div id="timeline-items-feed" class="space-y-4"></div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT COLUMN: Associated Records ================= -->
      <div class="w-full lg:w-[310px] shrink-0 space-y-4">
        <!-- Associated Company Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-slate-900 uppercase tracking-wider">Companies</span>
            <button onclick="switchRecordMode()" class="text-xs font-semibold text-[#ff7a59] hover:underline">View ↗</button>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <div class="flex items-center gap-2">
              <div id="right-comp-avatar" class="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center">BE</div>
              <div>
                <button onclick="switchRecordMode()" id="right-comp-name" class="font-bold text-xs text-slate-900 hover:text-[#ff7a59] text-left block">Business Example</button>
                <span id="right-comp-est" class="text-[10px] text-slate-400 font-mono block">USDA-EST-9941</span>
              </div>
            </div>
            <div class="text-[11px] text-slate-600 pt-1 border-t border-slate-200 flex justify-between">
              <span>Monthly Volume:</span>
              <strong id="right-comp-volume" class="text-slate-800">850 MT</strong>
            </div>
          </div>
        </div>

        <!-- Associated Deals Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <div class="flex items-center justify-between">
            <span class="font-bold text-xs text-slate-900 uppercase tracking-wider">Deals</span>
            <span id="right-deals-total" class="text-xs font-bold text-emerald-600">$1,350,000</span>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
            <div class="flex items-center justify-between">
              <span id="right-deal-title" class="font-semibold text-xs text-slate-800">Annual Cold-Chain Supply</span>
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div class="text-[11px] text-slate-500 flex items-center justify-between">
              <span>Stage: Contract Negotiation</span>
              <strong id="right-deal-val" class="text-slate-900 font-bold">$1,350,000</strong>
            </div>
          </div>
        </div>

        <!-- Food Safety & Certifications Card -->
        <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
          <span class="font-bold text-xs text-slate-900 uppercase tracking-wider block">Certifications & Compliance</span>
          <div id="right-certs-pill-list" class="flex flex-wrap gap-1.5"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================================================== -->
  <!-- WORKSPACE CONTAINERS (Floating Slim Rail Views)          -->
  <!-- ======================================================== -->
  
  <!-- Deals Workspace (Exact HubSpot UI from User Screenshot) -->
  <div id="deals-view-container" class="hidden flex-1 w-full bg-[#f5f8fa] flex flex-col">
    <!-- 1. Top View Tabs -->
    <div class="bg-white border-b border-slate-200 px-4 pt-2.5 flex items-center justify-between">
      <div class="flex items-center gap-1.5 overflow-x-auto text-xs">
        <button class="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-md transition-colors mr-1">
          <i data-lucide="kanban" class="w-3.5 h-3.5 text-slate-500"></i>
          <span>Deals</span>
          <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
        </button>

        <!-- All deals tab -->
        <div class="flex items-center gap-2 px-3 py-2 border-b-2 border-[#ff7a59] font-semibold text-xs text-slate-900 bg-slate-50/80 rounded-t-md cursor-pointer">
          <span>All deals</span>
          <span class="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">1</span>
          <i data-lucide="more-vertical" class="w-3 h-3 text-slate-400"></i>
          <i data-lucide="x" class="w-3 h-3 text-slate-400"></i>
        </div>

        <!-- My deals tab -->
        <div class="flex items-center gap-2 px-3 py-2 border-b-2 border-transparent font-medium text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-md cursor-pointer">
          <span>My deals</span>
        </div>

        <button onclick="showToast('New view tab created')" class="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors ml-1" title="Add view tab">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
        </button>
      </div>

      <div class="flex items-center gap-2 pb-1.5">
        <button onclick="openCreateModal()" class="px-3 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5 transition-colors">
          <i data-lucide="plus" class="w-3.5 h-3.5"></i>
          <span>Create deal</span>
        </button>
      </div>
    </div>

    <!-- 2. Action Bar & Pipeline Selection -->
    <div class="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
      <div class="relative min-w-[240px] max-w-sm flex-1">
        <i data-lucide="search" class="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none"></i>
        <input type="text" placeholder="Search" class="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/60 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#ff7a59] focus:border-[#ff7a59]" />
      </div>

      <div class="flex items-center gap-2 flex-wrap text-xs">
        <div class="flex items-center bg-white border border-slate-300 rounded-md overflow-hidden shadow-2xs">
          <button class="flex items-center gap-1.5 px-2.5 py-1.5 font-semibold bg-slate-100 text-slate-900">
            <i data-lucide="kanban" class="w-3.5 h-3.5"></i>
            <span>Board view</span>
            <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
          </button>
          <div class="w-[1px] h-4 bg-slate-200"></div>
          <button class="px-2 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50">
            <i data-lucide="settings" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <button class="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs">
          <span>Sales Pipeline</span>
          <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-slate-400"></i>
        </button>

        <button onclick="showToast('Filters opened')" class="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs">
          <i data-lucide="filter" class="w-3.5 h-3.5 text-slate-500"></i>
          <span>Filters</span>
        </button>

        <button onclick="showToast('Sort options')" class="flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs">
          <i data-lucide="arrow-up-down" class="w-3.5 h-3.5 text-slate-500"></i>
          <span>Sort</span>
        </button>

        <button onclick="showToast('Metrics toggled')" class="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs">
          <span>Metrics</span>
        </button>

        <button onclick="showToast('Exporting deals...')" class="px-3 py-1.5 border border-slate-300 rounded-md bg-white text-slate-700 hover:bg-slate-50 font-medium shadow-2xs">
          <span>Export</span>
        </button>
      </div>
    </div>

    <!-- 3. Quick Filter Chips -->
    <div class="bg-white border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2">
      <div class="flex items-center gap-2 flex-wrap">
        <button class="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700">
          <span>Deal owner</span>
          <i data-lucide="chevron-down" class="w-3 h-3 text-slate-500"></i>
        </button>
        <button class="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700">
          <span>Create date</span>
          <i data-lucide="chevron-down" class="w-3 h-3 text-slate-500"></i>
        </button>
        <button class="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700">
          <span>Last activity date</span>
          <i data-lucide="chevron-down" class="w-3 h-3 text-slate-500"></i>
        </button>
        <button class="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-700">
          <span>Close date</span>
          <i data-lucide="chevron-down" class="w-3 h-3 text-slate-500"></i>
        </button>
        <button class="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-slate-100 font-medium text-slate-500">
          <i data-lucide="plus" class="w-3 h-3"></i>
          <span>More</span>
        </button>
      </div>

      <button class="flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100">
        <i data-lucide="sliders-horizontal" class="w-3.5 h-3.5 text-slate-600"></i>
        <span>Advanced filters</span>
      </button>
    </div>

    <!-- 4. Kanban Columns (Exact Match to Screenshot) -->
    <div class="flex-1 overflow-x-auto p-3 flex gap-3 items-stretch">
      <!-- Stage 1: Appointment Scheduled (Contains SEO consulting ongoing card!) -->
      <div class="w-[280px] min-w-[280px] shrink-0 bg-[#f0f4f7] rounded-lg flex flex-col">
        <div class="p-2.5 flex items-center justify-between border-b border-slate-200/80">
          <div class="flex items-center gap-1.5 min-w-0 pr-1">
            <h3 class="text-xs font-bold text-slate-800 truncate">Appointment Scheduled</h3>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold">1</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 p-1 rounded">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          </button>
        </div>

        <!-- Cards list -->
        <div class="p-2 flex-1 space-y-2 overflow-y-auto">
          <!-- The Deal Card from user screenshot -->
          <div class="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:shadow-md transition-all cursor-pointer" onclick="openRecordDetail('contact', 'cust-100')">
            <div class="mb-2">
              <a href="#" onclick="event.preventDefault(); openRecordDetail('contact', 'cust-100');" class="text-[#007a87] font-bold text-xs underline hover:text-[#005f6b] block leading-snug">
                SEO consulting ongoing
              </a>
            </div>

            <div class="space-y-1 text-xs text-slate-700">
              <div class="flex items-center">
                <span class="text-slate-600">Amount:&nbsp;</span>
                <strong class="font-semibold text-slate-900">$3,000</strong>
              </div>
              <div class="flex items-center">
                <span class="text-slate-600">Close date:&nbsp;</span>
                <span class="text-slate-800">03/31/2026</span>
              </div>
              <div class="flex items-center">
                <span class="text-slate-600">Deal owner:&nbsp;</span>
                <span class="text-slate-800">Thalita Milan</span>
              </div>
              <div class="flex items-center">
                <span class="text-slate-600">Create date:&nbsp;</span>
                <span class="text-slate-800">03/25/2026</span>
              </div>
            </div>

            <div class="border-t border-slate-100 my-2.5"></div>

            <div class="flex items-center justify-between">
              <!-- Score Badge 59 -->
              <div class="w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-50/70 text-amber-800 text-[10px] font-bold flex items-center justify-center shadow-2xs">
                59
              </div>

              <!-- Micro Actions -->
              <div class="flex items-center gap-2 text-slate-400">
                <button class="hover:text-slate-700 p-0.5" title="Add note"><i data-lucide="file-text" class="w-3.5 h-3.5"></i></button>
                <button class="hover:text-purple-600 p-0.5" title="Breeze AI insight"><i data-lucide="sparkles" class="w-3.5 h-3.5"></i></button>
                <button class="hover:text-slate-700 p-0.5" title="Send email"><i data-lucide="mail" class="w-3.5 h-3.5"></i></button>
                <button class="hover:text-slate-700 p-0.5" title="Create task"><i data-lucide="check-square" class="w-3.5 h-3.5"></i></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Column Footer Totals -->
        <div class="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
          <div class="font-semibold text-slate-800">
            $3,000 <span class="font-normal text-slate-500">| Total amount</span>
          </div>
          <div class="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
            <span>$600 (20%) | Weighted amount</span>
            <i data-lucide="info" class="w-3 h-3 text-slate-400"></i>
          </div>
        </div>
      </div>

      <!-- Stage 2: Qualified To Buy -->
      <div class="w-[280px] min-w-[280px] shrink-0 bg-[#f0f4f7] rounded-lg flex flex-col">
        <div class="p-2.5 flex items-center justify-between border-b border-slate-200/80">
          <div class="flex items-center gap-1.5 min-w-0 pr-1">
            <h3 class="text-xs font-bold text-slate-800 truncate">Qualified To Buy</h3>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold">0</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 p-1 rounded">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <div class="p-2 flex-1"></div>
        <div class="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
          <div class="font-semibold text-slate-800">
            $0 <span class="font-normal text-slate-500">| Total amount</span>
          </div>
          <div class="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
            <span>$0 (40%) | Weighted amount</span>
            <i data-lucide="info" class="w-3 h-3 text-slate-400"></i>
          </div>
        </div>
      </div>

      <!-- Stage 3: Presentation Scheduled -->
      <div class="w-[280px] min-w-[280px] shrink-0 bg-[#f0f4f7] rounded-lg flex flex-col">
        <div class="p-2.5 flex items-center justify-between border-b border-slate-200/80">
          <div class="flex items-center gap-1.5 min-w-0 pr-1">
            <h3 class="text-xs font-bold text-slate-800 truncate">Presentation Scheduled</h3>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold">0</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 p-1 rounded">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <div class="p-2 flex-1"></div>
        <div class="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
          <div class="font-semibold text-slate-800">
            $0 <span class="font-normal text-slate-500">| Total amount</span>
          </div>
          <div class="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
            <span>$0 (60%) | Weighted amount</span>
            <i data-lucide="info" class="w-3 h-3 text-slate-400"></i>
          </div>
        </div>
      </div>

      <!-- Stage 4: Decision Maker Bought-In -->
      <div class="w-[280px] min-w-[280px] shrink-0 bg-[#f0f4f7] rounded-lg flex flex-col">
        <div class="p-2.5 flex items-center justify-between border-b border-slate-200/80">
          <div class="flex items-center gap-1.5 min-w-0 pr-1">
            <h3 class="text-xs font-bold text-slate-800 truncate">Decision Maker Bought-In</h3>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold">0</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 p-1 rounded">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <div class="p-2 flex-1"></div>
        <div class="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
          <div class="font-semibold text-slate-800">
            $0 <span class="font-normal text-slate-500">| Total amount</span>
          </div>
          <div class="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
            <span>$0 (80%) | Weighted amount</span>
            <i data-lucide="info" class="w-3 h-3 text-slate-400"></i>
          </div>
        </div>
      </div>

      <!-- Stage 5: Contract Sent -->
      <div class="w-[280px] min-w-[280px] shrink-0 bg-[#f0f4f7] rounded-lg flex flex-col">
        <div class="p-2.5 flex items-center justify-between border-b border-slate-200/80">
          <div class="flex items-center gap-1.5 min-w-0 pr-1">
            <h3 class="text-xs font-bold text-slate-800 truncate">Contract Sent</h3>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-200/90 text-slate-700 text-[11px] font-semibold">0</span>
          </div>
          <button class="text-slate-400 hover:text-slate-600 p-1 rounded">
            <i data-lucide="chevron-left" class="w-3.5 h-3.5"></i>
          </button>
        </div>
        <div class="p-2 flex-1"></div>
        <div class="p-2.5 bg-[#eaf0f4] border-t border-slate-200/90 text-slate-700 text-xs mt-auto">
          <div class="font-semibold text-slate-800">
            $0 <span class="font-normal text-slate-500">| Total amount</span>
          </div>
          <div class="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
            <span>$0 (90%) | Weighted amount</span>
            <i data-lucide="info" class="w-3 h-3 text-slate-400"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Bottom Beta Bar -->
    <div class="h-8 bg-white border-t border-slate-200 px-4 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#e0e7ff] text-[#4338ca]">Beta</span>
        <span class="text-slate-400 text-[11px]">HubSpot Deals Board</span>
      </div>
      <div class="text-slate-400 text-[11px]">
        Showing 1 deal • Pipeline: Sales Pipeline
      </div>
    </div>
  </div>

  <!-- Tickets Workspace -->
  <div id="tickets-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="life-buoy" class="w-5 h-5 text-rose-500"></i>
          <span>Tickets & Safety Support</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">USDA FSIS audits, cold-chain temperature alerts, and customer compliance inquiries.</p>
      </div>
      <button onclick="showToast('Created new support ticket')" class="px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>New ticket</span>
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
          <tr>
            <th class="p-3">Ticket ID</th>
            <th class="p-3">Subject</th>
            <th class="p-3">Account / Contact</th>
            <th class="p-3">Priority</th>
            <th class="p-3">Status</th>
            <th class="p-3">Assignee</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <tr class="hover:bg-slate-50/80 cursor-pointer" onclick="openRecordDetail('contact', 'cust-100')">
            <td class="p-3 font-mono font-bold text-[#ff7a59]">TCK-4891</td>
            <td class="p-3 font-semibold text-slate-900">USDA-EST-9941 Annual Pre-Audit Spec Checklist</td>
            <td class="p-3">Business Example (Peter Example)</td>
            <td class="p-3"><span class="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]">High</span></td>
            <td class="p-3"><span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px]">In Progress</span></td>
            <td class="p-3">Sarah Lin</td>
          </tr>
          <tr class="hover:bg-slate-50/80 cursor-pointer" onclick="openRecordDetail('company', 'cust-101')">
            <td class="p-3 font-mono font-bold text-[#ff7a59]">TCK-4870</td>
            <td class="p-3 font-semibold text-slate-900">Reefer Truck #44 Temperature Excursion Verification</td>
            <td class="p-3">Apex Primal Beef</td>
            <td class="p-3"><span class="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-full font-bold text-[10px]">Critical</span></td>
            <td class="p-3"><span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px]">Under Review</span></td>
            <td class="p-3">Dave Miller</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Orders Workspace -->
  <div id="orders-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="truck" class="w-5 h-5 text-blue-600"></i>
          <span>Cold-Chain Orders & Logistics</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">Reefer shipments, bill of ladings, temperature loggers, and delivery confirmations.</p>
      </div>
      <button onclick="showToast('New order created')" class="px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Create order</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-slate-900">ORD-2026-9912</span>
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold">In Transit</span>
        </div>
        <div class="text-sm font-bold text-slate-900">45 MT Frozen Beef Primals</div>
        <div class="text-xs text-slate-500">Origin: Omaha, NE → Chicago, IL</div>
        <div class="text-xs text-slate-600 pt-2 border-t border-slate-100 flex justify-between">
          <span>Target Temp: <strong>-22°C</strong></span>
          <span class="text-emerald-600 font-bold">Temp OK</span>
        </div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
        <div class="flex items-center justify-between">
          <span class="font-mono text-xs font-bold text-slate-900">ORD-2026-9908</span>
          <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-semibold">Delivered</span>
        </div>
        <div class="text-sm font-bold text-slate-900">30 MT Chilled Deboned Breast</div>
        <div class="text-xs text-slate-500">Origin: Harrisonburg, VA → Atlanta, GA</div>
        <div class="text-xs text-slate-600 pt-2 border-t border-slate-100 flex justify-between">
          <span>Target Temp: <strong>+1.5°C</strong></span>
          <span class="text-emerald-600 font-bold">HACCP Cleared</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Lists Workspace -->
  <div id="lists-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="list-filter" class="w-5 h-5 text-purple-600"></i>
          <span>Dynamic Lists & Segments</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">Smart segmentations for cold-chain certification tier, monthly volume, and USDA inspection cycle.</p>
      </div>
      <button onclick="showToast('List filter applied')" class="px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>New smart list</span>
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs hover:border-purple-400 transition-all cursor-pointer" onclick="switchNavSection('companies')">
        <div class="font-bold text-sm text-slate-900">High Volume Processors (>500 MT)</div>
        <div class="text-xs text-slate-500">Accounts with significant regular monthly throughput requiring priority refrigerated staging.</div>
        <div class="text-xs font-semibold text-purple-600 pt-2 border-t border-slate-100">4 Accounts Included</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs hover:border-purple-400 transition-all cursor-pointer" onclick="openRecordDetail('contact', 'cust-100')">
        <div class="font-bold text-sm text-slate-900">Peter Example & Qualified Leads</div>
        <div class="text-xs text-slate-500">Inbound companies currently completing pre-contract facility and temperature compliance review.</div>
        <div class="text-xs font-semibold text-purple-600 pt-2 border-t border-slate-100">1 Target Contact</div>
      </div>
      <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs hover:border-purple-400 transition-all cursor-pointer" onclick="switchNavSection('companies')">
        <div class="font-bold text-sm text-slate-900">Deep Freeze (-25°C) SLA Partners</div>
        <div class="text-xs text-slate-500">Companies using blast freezing and long-duration zero-crystal preservation tiers.</div>
        <div class="text-xs font-semibold text-purple-600 pt-2 border-t border-slate-100">3 Accounts Included</div>
      </div>
    </div>
  </div>

  <!-- Inbox Workspace -->
  <div id="inbox-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="inbox" class="w-5 h-5 text-blue-500"></i>
          <span>Unified Communications Inbox</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">Direct inquiries, automated RFQ emails, and buyer communications.</p>
      </div>
      <span class="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">3 Unread Messages</span>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-2xs">
      <div class="p-4 hover:bg-slate-50 cursor-pointer flex items-start justify-between gap-4" onclick="openRecordDetail('contact', 'cust-100')">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shrink-0">PE</div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-slate-900">Peter Example</span>
              <span class="text-[11px] text-slate-400">peter.example@business.com</span>
            </div>
            <div class="text-xs font-semibold text-slate-800 mt-0.5">Re: Protein Processing Cold Chain SLA & Plant Audit Schedule</div>
            <p class="text-xs text-slate-500 mt-1 line-clamp-1">Hi Sarah, our QA manager reviewed the USDA Establishment 9941 spec and we are ready for Friday's site audit.</p>
          </div>
        </div>
        <span class="text-[10px] text-slate-400 shrink-0">2:15 PM</span>
      </div>

      <div class="p-4 hover:bg-slate-50 cursor-pointer flex items-start justify-between gap-4" onclick="openRecordDetail('company', 'cust-101')">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-full bg-slate-700 text-white font-bold text-xs flex items-center justify-center shrink-0">MV</div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-xs text-slate-900">Marcus Vance</span>
              <span class="text-[11px] text-slate-400">m.vance@apexprimal.com</span>
            </div>
            <div class="text-xs font-semibold text-slate-800 mt-0.5">Q2 Scheduled Throughput Allocation (+200 MT)</div>
            <p class="text-xs text-slate-500 mt-1 line-clamp-1">Confirmed purchase order for our deep-freeze facility in Omaha.</p>
          </div>
        </div>
        <span class="text-[10px] text-slate-400 shrink-0">Yesterday</span>
      </div>
    </div>
  </div>

  <!-- Calls Workspace -->
  <div id="calls-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="phone-call" class="w-5 h-5 text-emerald-600"></i>
          <span>Call Logs & AI Transcripts</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">Recorded discussions, HACCP compliance interviews, and Breeze AI meeting takeaways.</p>
      </div>
      <button onclick="showToast('Logged call to history')" class="px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Log a call</span>
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-4">
      <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 cursor-pointer hover:border-emerald-500 transition-all" onclick="openRecordDetail('contact', 'cust-100')">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-slate-900">Outbound Call with Peter Example</span>
            <span class="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-semibold">Connected (18m 42s)</span>
          </div>
          <span class="text-[10px] text-slate-400">March 10, 2026</span>
        </div>
        <p class="text-xs text-slate-600">Reviewed plant refrigeration tolerances and validated 850 MT monthly throughput requirements.</p>
        <div class="text-[11px] bg-white p-2 rounded border border-slate-200 text-purple-800 font-medium">
          ✨ <strong>Breeze AI Summary:</strong> Customer confirmed timeline; request next meeting with VP of QA regarding SQF Level 3 validation checklist.
        </div>
      </div>
    </div>
  </div>

  <!-- Tasks Workspace -->
  <div id="tasks-view-container" class="hidden flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 flex items-center gap-2">
          <i data-lucide="check-square" class="w-5 h-5 text-emerald-600"></i>
          <span>Tasks & Compliance Follow-ups</span>
        </h1>
        <p class="text-xs text-slate-500 mt-1">Audit preparation checklists, HACCP certificate renewals, and customer contracts.</p>
      </div>
      <button onclick="showToast('New task added')" class="px-3.5 py-1.5 bg-[#ff7a59] hover:bg-[#e06545] text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-sm">
        <i data-lucide="plus" class="w-4 h-4"></i>
        <span>Add task</span>
      </button>
    </div>

    <div class="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-2xs">
      <div class="p-4 flex items-center justify-between hover:bg-slate-50">
        <div class="flex items-center gap-3">
          <input type="checkbox" class="w-4 h-4 text-[#ff7a59] rounded" onchange="showToast('Task marked complete')" />
          <div>
            <div class="text-xs font-bold text-slate-900 cursor-pointer hover:text-[#ff7a59]" onclick="openRecordDetail('contact', 'cust-100')">
              Send USDA-EST-9941 pre-audit specimen pack to Peter Example
            </div>
            <div class="text-[11px] text-slate-400">Due tomorrow • Assignee: Sarah Lin</div>
          </div>
        </div>
        <span class="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full text-[10px] font-bold">High Priority</span>
      </div>

      <div class="p-4 flex items-center justify-between hover:bg-slate-50">
        <div class="flex items-center gap-3">
          <input type="checkbox" class="w-4 h-4 text-[#ff7a59] rounded" onchange="showToast('Task marked complete')" />
          <div>
            <div class="text-xs font-bold text-slate-900 cursor-pointer hover:text-[#ff7a59]" onclick="openRecordDetail('company', 'cust-101')">
              Download and archive quarterly Reefer #44 temperature logs
            </div>
            <div class="text-[11px] text-slate-400">Due March 18 • Assignee: Quality Control</div>
          </div>
        </div>
        <span class="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold">Medium</span>
      </div>
    </div>
  </div>

  <!-- Create / Edit Modal -->
  <div id="company-modal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <h2 id="modal-title" class="text-lg font-bold text-slate-900">Create company</h2>
        <button onclick="closeModal()" class="text-slate-400 hover:text-slate-600"><i data-lucide="x" class="w-5 h-5"></i></button>
      </div>
      <form id="company-form" onsubmit="handleFormSubmit(event)" class="space-y-4 text-xs">
        <input type="hidden" id="form-id" />
        
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Company Legal Name *</label>
          <input type="text" id="form-name" required placeholder="e.g. Heartland Cold Cut Processors" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Establishment Number</label>
            <input type="text" id="form-est" placeholder="USDA-EST-4892" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Industry Sector</label>
            <select id="form-sector" class="w-full px-3 py-2 border border-slate-300 rounded-lg">
              <option value="Meat & Beef Processing">🥩 Meat & Beef Processing</option>
              <option value="Poultry Integration">🍗 Poultry Integration</option>
              <option value="Seafood & Aquaculture">🐟 Seafood & Aquaculture</option>
              <option value="Further Food Processing">🏭 Further Food Processing</option>
            </select>
          </div>
        </div>

        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
          <span class="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">Primary Contact</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-slate-600 mb-1">Contact Name *</label>
              <input type="text" id="form-contact-name" required placeholder="Marcus Vance" class="w-full px-3 py-1.5 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label class="block text-slate-600 mb-1">Job Title</label>
              <input type="text" id="form-contact-title" placeholder="VP Procurement" class="w-full px-3 py-1.5 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label class="block text-slate-600 mb-1">Email *</label>
              <input type="email" id="form-contact-email" required placeholder="m.vance@company.com" class="w-full px-3 py-1.5 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label class="block text-slate-600 mb-1">Phone</label>
              <input type="text" id="form-contact-phone" placeholder="(555) 019-2831" class="w-full px-3 py-1.5 border border-slate-300 rounded-md" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">City *</label>
            <input type="text" id="form-city" required placeholder="Omaha" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">State / Province</label>
            <input type="text" id="form-state" placeholder="NE" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Cold-Chain SLA</label>
            <select id="form-coldchain" class="w-full px-3 py-2 border border-slate-300 rounded-lg">
              <option value="Deep Freeze (-25°C to -18°C)">Deep Freeze (-25°C to -18°C)</option>
              <option value="Chilled Storage (0°C to 4°C)">Chilled Storage (0°C to 4°C)</option>
              <option value="IQF (Individually Quick Frozen)">IQF (Individually Quick Frozen)</option>
              <option value="Dry Aging / Climate Controlled">Dry Aging / Climate Controlled</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Monthly Volume (MT)</label>
            <input type="number" id="form-volume" min="1" value="300" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label class="block font-semibold text-slate-700 mb-1">Annual Contract ($)</label>
            <input type="number" id="form-contract" min="0" value="500000" class="w-full px-3 py-2 border border-slate-300 rounded-lg" />
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="button" onclick="closeModal()" class="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
          <button type="submit" class="px-5 py-2 bg-[#F58220] hover:bg-[#e07116] text-white font-semibold rounded-lg shadow-sm">Save company</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Mock Recall 2-Hour Audit Modal -->
  <div id="modal-mock-recall" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 hidden">
    <div class="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
      <div class="bg-[#0A2540] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900/60">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center font-bold">
            <i data-lucide="alert-octagon" class="w-5 h-5"></i>
          </div>
          <div>
            <h3 class="font-bold text-sm sm:text-base tracking-tight">爱尔兰食品安全局 (FSAI) 2小时模拟召回演练</h3>
            <p class="text-xs text-blue-200">Bord Bia & DAFM 快速批次全链条双向溯源引擎</p>
          </div>
        </div>
        <button onclick="closeMockRecallModal()" class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="p-6 space-y-5 text-xs text-slate-700">
        <!-- Recall Scenario Card -->
        <div class="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
          <div class="flex items-center justify-between font-bold">
            <span class="flex items-center gap-1.5 text-sm">
              <i data-lucide="crosshair" class="w-4 h-4 text-rose-600"></i>
              演练目标批次: LOT-2026-IE-0941B (爱尔兰原切草饲肋眼)
            </span>
            <span class="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-black uppercase">DAFM 突击审计模式</span>
          </div>
          <p class="text-rose-800 leading-relaxed">
            模拟情景: 检验检疫部门通报冷链物流某批次外包装轻微受损。系统需在 120 分钟内完成上游牧场批号、分割车间班组、以及 Dunnes Stores / Tesco Ireland 等商超分拨中心货架的 100% 锁死与召回。
          </p>
        </div>

        <!-- 4 Steps Progress -->
        <div class="space-y-3">
          <div class="flex items-center justify-between font-semibold text-slate-800">
            <span>追溯执行进度 (法定限时 120 分钟)</span>
            <span id="recall-status-text" class="text-emerald-700 font-bold">已完成 4/4 步 (耗时: 38分14秒)</span>
          </div>
          <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div id="recall-progress-bar" class="bg-emerald-500 h-full rounded-full transition-all duration-500" style="width: 100%"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <div class="font-bold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> 1. 批次隔离</div>
              <div class="text-[10px] text-emerald-700 mt-0.5">厂内库存已冻结</div>
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <div class="font-bold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> 2. 发货图谱</div>
              <div class="text-[10px] text-emerald-700 mt-0.5">Dunnes / Tesco 锁定</div>
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <div class="font-bold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> 3. 门店下架</div>
              <div class="text-[10px] text-emerald-700 mt-0.5">EDI 阻断指令已送达</div>
            </div>
            <div class="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
              <div class="font-bold flex items-center gap-1"><i data-lucide="check" class="w-3 h-3 text-emerald-600"></i> 4. 报告归档</div>
              <div class="text-[10px] text-emerald-700 mt-0.5">FSAI 格式 PDF 已生成</div>
            </div>
          </div>
        </div>

        <!-- Metric Details -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-slate-500 block text-[10px] uppercase font-bold">目标批次总重量</span>
            <span class="font-black text-slate-900 text-sm font-mono">14.20 Metric Tons</span>
          </div>
          <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span class="text-slate-500 block text-[10px] uppercase font-bold">已核实召回重量</span>
            <span class="font-black text-emerald-600 text-sm font-mono">14.20 Metric Tons</span>
          </div>
          <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
            <span class="text-emerald-700 block text-[10px] uppercase font-bold">追溯召回达成率</span>
            <span class="font-black text-emerald-700 text-base font-mono">100.0% (合规)</span>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-[11px] text-slate-500">
          合规证明编号: <span class="font-mono font-bold text-slate-700">FSAI-RECALL-IE542EC-20260312</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="downloadRecallAuditReport()" class="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-lg transition-colors flex items-center gap-1.5 text-xs">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>导出审计存证 (.PDF)</span>
          </button>
          <button onclick="closeMockRecallModal()" class="px-5 py-2 bg-[#0A2540] hover:bg-slate-900 text-white font-bold rounded-lg transition-colors text-xs">
            确认完成演练
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const DEMO_CUSTOMERS = [
      {
        id: 'cust-100',
        establishmentNumber: 'IE 542 EC',
        companyName: 'Peter Example / Kerry Foods Supply',
        sector: 'Meat & Beef Processing',
        stage: 'Active Supply Partner',
        primaryContact: { name: 'Peter Example', title: 'CEO / Operations Director', email: 'peter.example@kerryfoods.ie', phone: '+353 (0)66 718 2000' },
        facilityLocation: { city: 'Tralee', state: 'Co. Kerry' },
        coldChainSpec: 'Deep Freeze (-25°C to -18°C)',
        monthlyVolumeMetricTons: 850,
        annualContractValue: 1350000,
        hasBordBiaMark: true,
        slaCutOffTime: '06:00 AM',
        otifRate: 99.4,
        paymentTerms: 'Net 30 Days',
        outstandingAr: 280000,
        overdueDays: 0,
        creditLimit: 600000,
        certifications: ['Bord Bia Quality Mark', 'DAFM Approved IE 542 EC', 'HACCP Certified', 'FSAI Compliant', 'BRCGS Food Safety']
      },
      {
        id: 'cust-101',
        establishmentNumber: 'IE 388 EC',
        companyName: 'Dunnes Stores (Retail & Wholesale)',
        sector: 'Further Food Processing',
        stage: 'Active Supply Partner',
        primaryContact: { name: 'Cormac O\'Connor', title: 'Head of Fresh Food Procurement', email: 'cormac.oc@dunnesstores.ie', phone: '+353 (0)1 890 1200' },
        facilityLocation: { city: 'Dublin', state: 'Co. Dublin' },
        coldChainSpec: 'Chilled Storage (0°C to 4°C)',
        monthlyVolumeMetricTons: 1950,
        annualContractValue: 3450000,
        hasBordBiaMark: true,
        slaCutOffTime: '06:00 AM',
        otifRate: 99.8,
        paymentTerms: 'Net 30 Days',
        outstandingAr: 420000,
        overdueDays: 0,
        creditLimit: 1200000,
        certifications: ['Bord Bia Quality Mark', 'DAFM Approved IE 388 EC', 'HACCP Certified', 'SQF Level 3', 'FSAI Audit Verified']
      },
      {
        id: 'cust-102',
        establishmentNumber: 'IE 892 EC',
        companyName: 'Tesco Ireland Distribution',
        sector: 'Meat & Beef Processing',
        stage: 'Active Supply Partner',
        primaryContact: { name: 'Sinead Brennan', title: 'Director of Irish Sourcing', email: 's.brennan@tesco.ie', phone: '+353 (0)1 249 5000' },
        facilityLocation: { city: 'Donabate', state: 'Co. Dublin' },
        coldChainSpec: 'Chilled Storage (0°C to 4°C)',
        monthlyVolumeMetricTons: 2400,
        annualContractValue: 4200000,
        hasBordBiaMark: true,
        slaCutOffTime: '05:30 AM',
        otifRate: 99.6,
        paymentTerms: 'Net 14 Days',
        outstandingAr: 310000,
        overdueDays: 0,
        creditLimit: 1500000,
        certifications: ['Bord Bia Quality Mark', 'DAFM Approved IE 892 EC', 'HACCP Certified', 'BRCGS Food Safety', 'IFS Food']
      },
      {
        id: 'cust-103',
        establishmentNumber: 'IE 311 EC',
        companyName: 'SuperValu (Musgrave Group)',
        sector: 'Meat & Beef Processing',
        stage: 'Active Supply Partner',
        primaryContact: { name: 'Liam McCarthy', title: 'Protein Supply Category Lead', email: 'liam.mccarthy@musgrave.ie', phone: '+353 (0)21 452 2100' },
        facilityLocation: { city: 'Cork', state: 'Co. Cork' },
        coldChainSpec: 'Deep Freeze (-25°C to -18°C)',
        monthlyVolumeMetricTons: 1600,
        annualContractValue: 2900000,
        hasBordBiaMark: true,
        slaCutOffTime: '06:00 AM',
        otifRate: 99.2,
        paymentTerms: 'Net 30 Days',
        outstandingAr: 380000,
        overdueDays: 0,
        creditLimit: 1000000,
        certifications: ['Bord Bia Quality Mark', 'DAFM Approved IE 311 EC', 'HACCP Certified', 'FSAI Compliant', 'Origin Green Ireland']
      },
      {
        id: 'cust-104',
        establishmentNumber: 'IE 405 EC',
        companyName: 'BWG Foods (Spar Ireland)',
        sector: 'Further Food Processing',
        stage: 'Contract Negotiation',
        primaryContact: { name: 'Aoife Kelly', title: 'Procurement Manager', email: 'a.kelly@bwg.ie', phone: '+353 (0)1 409 0300' },
        facilityLocation: { city: 'Walkinstown', state: 'Co. Dublin' },
        coldChainSpec: 'Chilled Storage (0°C to 4°C)',
        monthlyVolumeMetricTons: 920,
        annualContractValue: 1750000,
        hasBordBiaMark: true,
        slaCutOffTime: '07:00 AM',
        otifRate: 98.9,
        paymentTerms: 'Net 60 Days',
        outstandingAr: 540000,
        overdueDays: 12,
        creditLimit: 800000,
        certifications: ['Bord Bia Quality Mark', 'DAFM Approved IE 405 EC', 'HACCP Certified', 'FSAI Compliant']
      },
      {
        id: 'cust-105',
        establishmentNumber: 'IE 999 EC',
        companyName: 'Non-Compliant Trial Plant (Flagged)',
        sector: 'Meat & Beef Processing',
        stage: 'Plant & HACCP Audit',
        primaryContact: { name: 'Declan Byrne', title: 'Plant Supervisor', email: 'd.byrne@trialplant.ie', phone: '+353 (0)42 933 1111' },
        facilityLocation: { city: 'Dundalk', state: 'Co. Louth' },
        coldChainSpec: 'Deep Freeze (-25°C to -18°C)',
        monthlyVolumeMetricTons: 310,
        annualContractValue: 450000,
        hasBordBiaMark: false,
        slaCutOffTime: '08:00 AM',
        otifRate: 94.2,
        paymentTerms: 'Net 14 Days',
        outstandingAr: 120000,
        overdueDays: 28,
        creditLimit: 150000,
        certifications: ['HACCP Certified']
      }
    ];

    const PIPELINE_STAGES = [
      { id: 'Lead / Inbound', label: 'Lead / Inbound' },
      { id: 'Sample & Spec Review', label: 'Sample & QA' },
      { id: 'Plant & HACCP Audit', label: 'HACCP Audit' },
      { id: 'Contract Negotiation', label: 'Negotiation' },
      { id: 'Active Supply Partner', label: 'Active Partner' }
    ];

    let customers = [];
    let activeNavSection = 'companies'; // 'contacts' | 'companies' | 'deals' | 'tickets' | 'orders' | 'lists' | 'inbox' | 'calls' | 'tasks'
    let currentPerspective = 'ceo'; // 'ceo' | 'cfo' | 'qa' | 'crud'
    let currentDirectory = 'companies'; // 'companies' | 'contacts'
    let currentView = 'table'; // 'table' | 'board'
    let currentTab = 'all';
    let searchQuery = '';
    let sortField = 'companyName';
    let sortDirection = 'asc';
    let activeRecordDetail = null; // { type: 'contact' | 'company', customerId: string }
    let customerActivities = {}; // customerId -> array of activities

    function setPerspective(persp) {
      currentPerspective = persp;
      const ceoEl = document.getElementById('view-perspective-ceo');
      const cfoEl = document.getElementById('view-perspective-cfo');
      const qaEl = document.getElementById('view-perspective-qa');
      const crudEl = document.getElementById('directory-view-container');

      if (ceoEl) ceoEl.classList.toggle('hidden', persp !== 'ceo');
      if (cfoEl) cfoEl.classList.toggle('hidden', persp !== 'cfo');
      if (qaEl) qaEl.classList.toggle('hidden', persp !== 'qa');
      if (crudEl) crudEl.classList.toggle('hidden', persp !== 'crud');

      const btnCeo = document.getElementById('persp-btn-ceo');
      const btnCfo = document.getElementById('persp-btn-cfo');
      const btnQa = document.getElementById('persp-btn-qa');
      const btnCrud = document.getElementById('persp-btn-crud');

      const activeCls = ['text-white', 'bg-[#F58220]', 'shadow-sm'];
      const inactiveCls = ['text-slate-300', 'hover:text-white', 'hover:bg-blue-900/40'];

      [btnCeo, btnCfo, btnQa, btnCrud].forEach(b => {
        if (!b) return;
        b.classList.remove(...activeCls);
        b.classList.add(...inactiveCls);
      });

      if (persp === 'ceo' && btnCeo) { btnCeo.classList.remove(...inactiveCls); btnCeo.classList.add(...activeCls); }
      if (persp === 'cfo' && btnCfo) { btnCfo.classList.remove(...inactiveCls); btnCfo.classList.add(...activeCls); }
      if (persp === 'qa' && btnQa) { btnQa.classList.remove(...inactiveCls); btnQa.classList.add(...activeCls); }
      if (persp === 'crud' && btnCrud) { btnCrud.classList.remove(...inactiveCls); btnCrud.classList.add(...activeCls); }

      if (window.lucide) window.lucide.createIcons();
    }

    function openMockRecallModal() {
      const modal = document.getElementById('modal-mock-recall');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide) window.lucide.createIcons();
    }

    function closeMockRecallModal() {
      const modal = document.getElementById('modal-mock-recall');
      if (modal) modal.classList.add('hidden');
    }

    function downloadRecallAuditReport() {
      const docContent = "NOUVEM MEAT & PROTEIN ERP - MOCK RECALL AUDIT CERTIFICATE\\n" +
        "Target Batch: LOT-2026-IE-0941B (Irish Primal Beef Ribeye Cuts)\\n" +
        "FSAI / DAFM Approved Plant: IE 542 EC\\n" +
        "Bord Bia Quality Mark Status: Certified & Verified\\n" +
        "Recall Execution Time: 38 mins 14 secs (Legal Limit: 120 mins)\\n" +
        "Batch Total Volume: 14.20 Metric Tons\\n" +
        "Recovered / Quarantined Volume: 14.20 Metric Tons (100.0% Recovery Rate)\\n" +
        "Retail Accounts Locked: Dunnes Stores (IE 388 EC), Tesco Ireland (IE 892 EC)\\n" +
        "Status: FULL COMPLIANCE PASSED\\nAudit Certificate: FSAI-RECALL-IE542EC-20260312\\n";
      const blob = new Blob([docContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'FSAI_Mock_Recall_IE542EC_Certificate.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('已导出 FSAI 模拟召回审计存证');
    }

    function updateDublinClock() {
      try {
        const now = new Date();
        const dublinTimeStr = new Intl.DateTimeFormat('en-IE', {
          timeZone: 'Europe/Dublin',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(now);
        const clockEl = document.getElementById('standalone-dublin-clock');
        if (clockEl) clockEl.innerText = dublinTimeStr + ' IST';
      } catch (e) {}
    }

    function init() {
      try {
        const stored = localStorage.getItem('food_processor_crm_standalone_data');
        if (stored) customers = JSON.parse(stored);
        else { customers = [...DEMO_CUSTOMERS]; saveStorage(); }
      } catch (e) { customers = [...DEMO_CUSTOMERS]; }

      updateDublinClock();
      setInterval(updateDublinClock, 1000);

      // Initialize default sample timeline activities for Peter Example
      customerActivities['cust-100'] = [
        {
          id: 'act-1',
          type: 'Lifecycle',
          title: 'Lifecycle stage change: Lead to Marketing Qualified Lead',
          author: 'Sarah Lin',
          date: 'March 11, 2026 at 2:15 PM',
          body: 'Peter Example downloaded the Protein Processing Cold Chain SLA guide and confirmed plant inspection schedule.'
        },
        {
          id: 'act-2',
          type: 'Call',
          title: 'Cold-Chain QA Audit & Spec Call',
          author: 'Sarah Lin',
          date: 'March 10, 2026 at 10:30 AM',
          body: 'Discussed USDA establishment inspection criteria and deep-freeze capacity requirements for 850 MT throughput.'
        },
        {
          id: 'act-3',
          type: 'System',
          title: 'This contact was created',
          author: 'Sarah Lin',
          date: 'March 8, 2026 at 9:00 AM',
          body: 'Record imported via Inbound Food Processing Portal.'
        }
      ];

      // Keyboard Shortcuts (⌘1 to ⌘9) for Linear/Raycast/Stripe rail
      window.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey) {
          if (e.key === '1') { e.preventDefault(); switchNavSection('contacts'); }
          else if (e.key === '2') { e.preventDefault(); switchNavSection('companies'); }
          else if (e.key === '3') { e.preventDefault(); switchNavSection('deals'); }
          else if (e.key === '4') { e.preventDefault(); switchNavSection('tickets'); }
          else if (e.key === '5') { e.preventDefault(); switchNavSection('orders'); }
          else if (e.key === '6') { e.preventDefault(); switchNavSection('lists'); }
          else if (e.key === '7') { e.preventDefault(); switchNavSection('inbox'); }
          else if (e.key === '8') { e.preventDefault(); switchNavSection('calls'); }
          else if (e.key === '9') { e.preventDefault(); switchNavSection('tasks'); }
        }
      });

      render();
    }

    function saveStorage() {
      try { localStorage.setItem('food_processor_crm_standalone_data', JSON.stringify(customers)); } catch (e) {}
    }

    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toast-msg').innerText = msg;
      toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
      setTimeout(() => toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]'), 3000);
    }

    function getFilteredCustomers() {
      return customers.filter(c => {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          c.companyName.toLowerCase().includes(q) || 
          c.establishmentNumber.toLowerCase().includes(q) || 
          c.primaryContact.name.toLowerCase().includes(q) || 
          c.facilityLocation.city.toLowerCase().includes(q);
        
        let matchesTab = true;
        if (currentTab === 'meat') matchesTab = c.sector === 'Meat & Beef Processing';
        else if (currentTab === 'poultry') matchesTab = c.sector === 'Poultry Integration';
        else if (currentTab === 'seafood') matchesTab = c.sector === 'Seafood & Aquaculture';
        else if (currentTab === 'prepared') matchesTab = c.sector === 'Further Food Processing';
        else if (currentTab === 'high_volume') matchesTab = c.monthlyVolumeMetricTons >= 500;
        
        return matchesQuery && matchesTab;
      }).sort((a, b) => {
        const valA = a[sortField]; const valB = b[sortField];
        if (typeof valA === 'string') return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
    }

    function renderMetrics() {
      const active = customers.filter(c => c.stage === 'Active Supply Partner').length;
      const volume = customers.reduce((acc, c) => acc + c.monthlyVolumeMetricTons, 0);
      const val = customers.reduce((acc, c) => acc + c.annualContractValue, 0);

      document.getElementById('metric-active').innerText = \`\${active} Accounts\`;
      document.getElementById('metric-volume').innerText = \`\${volume.toLocaleString()} MT / mo\`;
      document.getElementById('metric-value').innerText = \`€\${(val / 1000000).toFixed(2)}M\`;
      document.getElementById('label-count-companies').innerText = \`Companies (\${customers.length})\`;
      document.getElementById('label-count-contacts').innerText = \`Contacts (\${customers.length})\`;
      document.getElementById('filter-count').innerText = getFilteredCustomers().length;
      document.getElementById('contacts-filter-count').innerText = getFilteredCustomers().length;
    }

    function renderTable() {
      const list = getFilteredCustomers();
      const tbody = document.getElementById('table-body');
      if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-slate-400">No matching food processor accounts found.</td></tr>';
        return;
      }
      tbody.innerHTML = list.map(c => \`
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="px-4 py-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">\${c.companyName.substring(0, 2).toUpperCase()}</div>
              <div>
                <button onclick="openRecordDetail('company', '\${c.id}')" class="font-semibold text-slate-900 hover:text-[#F58220] text-left">\${c.companyName}</button>
                <div class="text-[11px] text-slate-400 font-mono">\${c.establishmentNumber} • \${c.facilityLocation.city}, \${c.facilityLocation.state}</div>
              </div>
            </div>
          </td>
          <td class="px-4 py-3"><span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100">\${c.sector}</span></td>
          <td class="px-4 py-3"><span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">\${c.stage}</span></td>
          <td class="px-4 py-3">
            <button onclick="openRecordDetail('contact', '\${c.id}')" class="font-semibold text-blue-600 hover:underline block text-left">\${c.primaryContact.name}</button>
            <button onclick="openRecordDetail('contact', '\${c.id}')" class="text-[11px] text-slate-400 hover:underline block text-left">\${c.primaryContact.email}</button>
          </td>
          <td class="px-4 py-3 font-semibold text-slate-800">\${c.monthlyVolumeMetricTons.toLocaleString()} MT</td>
          <td class="px-4 py-3 font-semibold text-slate-900">€\${c.annualContractValue.toLocaleString()}</td>
          <td class="px-4 py-3 text-right">
            <div class="flex items-center justify-end gap-1">
              <button onclick="openRecordDetail('contact', '\${c.id}')" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Open Contact Record Page"><i data-lucide="contact" class="w-4 h-4"></i></button>
              <button onclick="openRecordDetail('company', '\${c.id}')" class="p-1.5 text-slate-600 hover:bg-slate-100 rounded" title="Open Company Record Page"><i data-lucide="building-2" class="w-4 h-4"></i></button>
              <button onclick="editCustomer('\${c.id}')" class="p-1.5 text-slate-400 hover:text-[#F58220] rounded" title="Edit"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
              <button onclick="deleteCustomer('\${c.id}')" class="p-1.5 text-slate-400 hover:text-red-600 rounded" title="Delete"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
          </td>
        </tr>
      \`).join('');
    }

    function renderContactsDirectory() {
      const list = getFilteredCustomers();
      const tbody = document.getElementById('contacts-table-body');
      if (list.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-slate-400">No matching contacts found.</td></tr>';
        return;
      }
      tbody.innerHTML = list.map(c => \`
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="px-4 py-3">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-xs">\${c.primaryContact.name.substring(0, 1)}</div>
              <div>
                <button onclick="openRecordDetail('contact', '\${c.id}')" class="font-bold text-slate-900 hover:text-blue-600 text-left block">\${c.primaryContact.name}</button>
                <span class="text-[11px] text-slate-400 block">\${c.primaryContact.title}</span>
              </div>
            </div>
          </td>
          <td class="px-4 py-3">
            <button onclick="openRecordDetail('company', '\${c.id}')" class="font-medium text-slate-800 hover:text-[#ff7a59] flex items-center gap-1.5">
              <i data-lucide="building-2" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>\${c.companyName}</span>
            </button>
            <span class="text-[10px] text-slate-400 block font-mono">\${c.establishmentNumber}</span>
          </td>
          <td class="px-4 py-3"><a href="mailto:\${c.primaryContact.email}" class="text-[#ff7a59] hover:underline">\${c.primaryContact.email}</a></td>
          <td class="px-4 py-3 text-slate-600">\${c.primaryContact.phone}</td>
          <td class="px-4 py-3"><span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">\${c.stage}</span></td>
          <td class="px-4 py-3 text-slate-600 font-medium">\${c.coldChainSpec}</td>
          <td class="px-4 py-3 text-right">
            <button onclick="openRecordDetail('contact', '\${c.id}')" class="px-3 py-1.5 text-xs font-semibold text-white bg-[#ff7a59] hover:bg-[#e06545] rounded shadow-2xs inline-flex items-center gap-1.5">
              <i data-lucide="contact" class="w-3.5 h-3.5"></i>
              <span>Open Contact Detail Page</span>
            </button>
          </td>
        </tr>
      \`).join('');
    }

    function renderBoard() {
      const list = getFilteredCustomers();
      const boardContainer = document.getElementById('container-board');
      boardContainer.innerHTML = PIPELINE_STAGES.map((col, idx) => {
        const colCustomers = list.filter(c => c.stage === col.id);
        return \`
          <div class="bg-slate-100/90 border border-slate-200 rounded-xl p-2.5 flex flex-col min-h-[500px]">
            <div class="p-2 border-b border-slate-200 mb-2 flex items-center justify-between">
              <span class="font-bold text-xs text-slate-800">\${col.label}</span>
              <span class="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-xs">\${colCustomers.length}</span>
            </div>
            <div class="space-y-2.5 flex-1">
              \${colCustomers.map(c => \`
                <div class="bg-white border border-slate-200 rounded-lg p-3 shadow-xs space-y-2">
                  <button onclick="openRecordDetail('company', '\${c.id}')" class="font-semibold text-xs text-slate-900 hover:text-[#ff7a59] text-left block">\${c.companyName}</button>
                  <button onclick="openRecordDetail('contact', '\${c.id}')" class="w-full text-left text-[11px] text-slate-600 hover:text-blue-600 flex items-center gap-1.5 py-1 px-1.5 bg-slate-50 border border-slate-100 rounded">
                    <span class="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[9px] flex items-center justify-center shrink-0">\${c.primaryContact.name.substring(0, 1)}</span>
                    <span class="truncate font-medium">\${c.primaryContact.name}</span>
                  </button>
                  <div class="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>\${c.monthlyVolumeMetricTons} MT</span>
                    <strong class="text-slate-900">€\${(c.annualContractValue / 1000).toFixed(0)}k</strong>
                  </div>
                  <div class="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                    \${idx > 0 ? \`<button onclick="advanceStage('\${c.id}', -1)" class="hover:text-slate-700">← Back</button>\` : '<span></span>'}
                    \${idx < PIPELINE_STAGES.length - 1 ? \`<button onclick="advanceStage('\${c.id}', 1)" class="hover:text-[#F58220] font-semibold text-slate-600">Next →</button>\` : '<span class="text-emerald-600 font-semibold">Active</span>'}
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        \`;
      }).join('');
    }

    function switchNavSection(sec) {
      activeNavSection = sec;
      activeRecordDetail = null;
      setPerspective('crud');

      // Update Floating Slim Rail active styles
      const railIds = ['contacts', 'companies', 'deals', 'tickets', 'orders', 'lists', 'inbox', 'calls', 'tasks'];
      railIds.forEach(id => {
        const btn = document.getElementById('rail-btn-' + id);
        if (btn) {
          if (id === sec) {
            btn.className = 'w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-white bg-[#F58220] shadow-md shadow-[#F58220]/30';
          } else {
            btn.className = 'w-10 h-10 rounded-xl flex items-center justify-center relative transition-all text-slate-400 hover:text-white hover:bg-slate-800/60';
          }
        }
      });

      // Update Top Nav button styles
      ['contacts', 'companies', 'deals', 'tickets', 'orders'].forEach(id => {
        const btn = document.getElementById('nav-btn-' + id);
        if (btn) {
          if (id === sec) {
            btn.className = 'px-2.5 py-1.5 rounded-md font-medium text-white bg-slate-700 transition-colors flex items-center gap-1.5';
          } else {
            btn.className = 'px-2.5 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-1.5';
          }
        }
      });

      if (sec === 'contacts') {
        currentDirectory = 'contacts';
      } else if (sec === 'companies') {
        currentDirectory = 'companies';
      }

      render();
    }

    function render() {
      renderMetrics();
      const dirView = document.getElementById('directory-view-container');
      const recView = document.getElementById('record-detail-container');
      const workspaceIds = ['deals', 'tickets', 'orders', 'lists', 'inbox', 'calls', 'tasks'];

      // Hide all workspace views first
      workspaceIds.forEach(id => {
        const el = document.getElementById(id + '-view-container');
        if (el) el.classList.add('hidden');
      });

      if (activeRecordDetail) {
        dirView.classList.add('hidden');
        recView.classList.remove('hidden');
        renderRecordDetail();
      } else if (activeNavSection === 'companies' || activeNavSection === 'contacts') {
        dirView.classList.remove('hidden');
        recView.classList.add('hidden');

        if (currentDirectory === 'contacts') {
          document.getElementById('container-table').classList.add('hidden');
          document.getElementById('container-board').classList.add('hidden');
          document.getElementById('container-contacts-dir').classList.remove('hidden');
          document.getElementById('view-mode-toggle-group').classList.add('hidden');
          renderContactsDirectory();
        } else {
          document.getElementById('container-contacts-dir').classList.add('hidden');
          document.getElementById('view-mode-toggle-group').classList.remove('hidden');
          if (currentView === 'table') {
            renderTable();
            document.getElementById('container-table').classList.remove('hidden');
            document.getElementById('container-board').classList.add('hidden');
          } else {
            renderBoard();
            document.getElementById('container-table').classList.add('hidden');
            document.getElementById('container-board').classList.remove('hidden');
          }
        }
      } else {
        // Render corresponding workspace view
        dirView.classList.add('hidden');
        recView.classList.add('hidden');
        const targetWorkspace = document.getElementById(activeNavSection + '-view-container');
        if (targetWorkspace) targetWorkspace.classList.remove('hidden');
      }
      lucide.createIcons();
    }

    // ================= Detailed Record Page Rendering =================
    function openRecordDetail(type, customerId) {
      activeRecordDetail = { type, customerId };
      setPerspective('crud');
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function closeRecordDetail() {
      activeRecordDetail = null;
      render();
    }

    function switchRecordMode() {
      if (!activeRecordDetail) return;
      activeRecordDetail.type = activeRecordDetail.type === 'contact' ? 'company' : 'contact';
      render();
    }

    function toggleAssociatedCompany() {
      if (!activeRecordDetail) return;
      activeRecordDetail.type = 'company';
      render();
    }

    function renderRecordDetail() {
      const customer = customers.find(c => c.id === activeRecordDetail.customerId) || customers[0];
      const isContact = activeRecordDetail.type === 'contact';

      document.getElementById('detail-back-label').innerText = isContact ? 'Contacts' : 'Companies';
      document.getElementById('detail-breadcrumb-title').innerText = isContact ? customer.primaryContact.name : customer.companyName;
      document.getElementById('btn-switch-record-mode').innerText = isContact ? 'Switch to Company View' : 'Switch to Contact View';

      if (isContact) {
        document.getElementById('detail-avatar').innerText = customer.primaryContact.name.substring(0, 2).toUpperCase();
        document.getElementById('detail-avatar').className = 'w-12 h-12 rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-bold flex items-center justify-center text-lg shadow-xs';
        document.getElementById('detail-main-name').innerText = customer.primaryContact.name;
        document.getElementById('detail-main-title').innerText = customer.primaryContact.title || 'Director';
        document.getElementById('detail-company-link').innerText = customer.companyName + ' ↗';
        document.getElementById('detail-info-email').innerText = customer.primaryContact.email;
        document.getElementById('detail-info-email').href = 'mailto:' + customer.primaryContact.email;
        document.getElementById('detail-info-phone').innerText = customer.primaryContact.phone;
      } else {
        document.getElementById('detail-avatar').innerText = customer.companyName.substring(0, 2).toUpperCase();
        document.getElementById('detail-avatar').className = 'w-12 h-12 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-lg shadow-xs';
        document.getElementById('detail-main-name').innerText = customer.companyName;
        document.getElementById('detail-main-title').innerText = customer.establishmentNumber + ' • ' + customer.sector;
        document.getElementById('detail-company-link').innerText = 'Primary: ' + customer.primaryContact.name;
        document.getElementById('detail-info-email').innerText = customer.primaryContact.email;
        document.getElementById('detail-info-phone').innerText = customer.primaryContact.phone;
      }

      document.getElementById('detail-stage-badge').innerText = customer.stage;
      document.getElementById('detail-info-stage').innerText = customer.stage;
      document.getElementById('detail-info-coldchain').innerText = customer.coldChainSpec;
      document.getElementById('detail-info-location').innerText = customer.facilityLocation.city + ', ' + customer.facilityLocation.state;
      
      // Breeze AI Summary
      document.getElementById('detail-ai-summary').innerText = 
        \`\${customer.primaryContact.name} is a key operational stakeholder at \${customer.companyName}. Facility operates under DAFM plant license \${customer.establishmentNumber} with \${customer.coldChainSpec}. Bord Bia Quality Mark status is \${customer.hasBordBiaMark ? 'VERIFIED' : 'PENDING'}. Currently at \${customer.stage} with €\${customer.annualContractValue.toLocaleString()} pipeline contract value and Net 30/Net 14 payment terms.\`;

      // Right column associated company
      document.getElementById('right-comp-avatar').innerText = customer.companyName.substring(0, 2).toUpperCase();
      document.getElementById('right-comp-name').innerText = customer.companyName;
      document.getElementById('right-comp-est').innerText = customer.establishmentNumber;
      document.getElementById('right-comp-volume').innerText = customer.monthlyVolumeMetricTons.toLocaleString() + ' MT';
      document.getElementById('right-deals-total').innerText = '€' + customer.annualContractValue.toLocaleString();
      document.getElementById('right-deal-val').innerText = '€' + customer.annualContractValue.toLocaleString();

      // Right column certs
      const certContainer = document.getElementById('right-certs-pill-list');
      certContainer.innerHTML = (customer.certifications || ['HACCP Certified', 'FSMA Compliant']).map(cert => \`
        <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">\${cert}</span>
      \`).join('');

      renderTimelineFeed();
    }

    function renderTimelineFeed() {
      const cid = activeRecordDetail ? activeRecordDetail.customerId : 'cust-100';
      const items = customerActivities[cid] || [
        {
          id: 'def-1',
          type: 'Lifecycle',
          title: 'Lifecycle stage set to Active Supply Partner',
          author: 'System',
          date: 'March 12, 2026',
          body: 'Cold chain compliance specifications verified and logged.'
        }
      ];

      const feed = document.getElementById('timeline-items-feed');
      feed.innerHTML = items.map(item => \`
        <div class="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-white hover:shadow-2xs transition-all">
          <div class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#ff7a59] shadow-2xs font-bold text-xs">
            \${item.type === 'Call' ? '📞' : item.type === 'Email' ? '✉️' : item.type === 'Note' ? '📝' : '⚡'}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-2">
              <span class="font-bold text-xs text-slate-900">\${item.title}</span>
              <span class="text-[10px] text-slate-400 shrink-0">\${item.date}</span>
            </div>
            <p class="text-xs text-slate-600 mt-1 leading-relaxed">\${item.body}</p>
            <div class="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
              <span>Logged by</span>
              <strong class="text-slate-600">\${item.author}</strong>
            </div>
          </div>
        </div>
      \`).join('');
    }

    function toggleActivityComposer() {
      const comp = document.getElementById('activity-composer');
      comp.classList.toggle('hidden');
    }

    function submitNewActivity() {
      if (!activeRecordDetail) return;
      const type = document.getElementById('composer-type').value;
      const title = document.getElementById('composer-title').value.trim() || (type + ' logged');
      const body = document.getElementById('composer-body').value.trim();

      if (!body) {
        alert('Please enter activity notes.');
        return;
      }

      const cid = activeRecordDetail.customerId;
      if (!customerActivities[cid]) customerActivities[cid] = [];

      customerActivities[cid].unshift({
        id: 'act-' + Date.now(),
        type,
        title,
        author: 'Sarah Lin (Provisions QA)',
        date: 'Just now',
        body
      });

      document.getElementById('composer-title').value = '';
      document.getElementById('composer-body').value = '';
      renderTimelineFeed();
      showToast('Activity logged successfully');
    }

    function quickActionClick(actionName) {
      document.getElementById('composer-type').value = actionName === 'WhatsApp' ? 'Note' : actionName;
      document.getElementById('activity-composer').classList.remove('hidden');
      document.getElementById('composer-title').value = actionName + ' with ' + document.getElementById('detail-main-name').innerText;
      document.getElementById('composer-body').focus();
    }

    function switchTimelineTab(tabName) {
      document.querySelectorAll('.timeline-tab').forEach(b => {
        b.className = 'timeline-tab py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5';
      });
      const activeBtn = document.querySelector(\`[data-tab="\${tabName}"]\`);
      if (activeBtn) activeBtn.className = 'timeline-tab py-3 border-b-2 border-[#ff7a59] text-[#ff7a59] flex items-center gap-1.5 font-bold';
      showToast('Filtered by ' + tabName);
    }

    function setDirectory(dir) {
      currentDirectory = dir;
      const compBtn = document.getElementById('toggle-dir-comp');
      const contBtn = document.getElementById('toggle-dir-cont');
      const navComp = document.getElementById('nav-btn-companies');
      const navCont = document.getElementById('nav-btn-contacts');

      if (dir === 'companies') {
        compBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all bg-white text-slate-900 shadow-xs';
        contBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all text-slate-500 hover:text-slate-900';
        navComp.className = 'px-3 py-1.5 rounded-md font-medium text-white bg-slate-700 transition-colors flex items-center gap-1.5';
        navCont.className = 'px-3 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-1.5';
        document.getElementById('directory-subtitle').innerText = 'Small business customer relationship & supply chain pipeline for protein and food processors';
      } else {
        contBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all bg-white text-slate-900 shadow-xs';
        compBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all text-slate-500 hover:text-slate-900';
        navCont.className = 'px-3 py-1.5 rounded-md font-medium text-white bg-slate-700 transition-colors flex items-center gap-1.5';
        navComp.className = 'px-3 py-1.5 rounded-md font-medium text-slate-300 hover:text-white hover:bg-slate-700/60 transition-colors flex items-center gap-1.5';
        document.getElementById('directory-subtitle').innerText = 'Key stakeholders, plant operations directors, food safety specialists, and cold chain managers';
      }
      activeRecordDetail = null;
      render();
    }

    function switchView(mode) {
      currentView = mode;
      const tableBtn = document.getElementById('btn-mode-table');
      const boardBtn = document.getElementById('btn-mode-board');
      if (mode === 'table') {
        tableBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-white text-slate-900 shadow-xs';
        boardBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900';
      } else {
        boardBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md bg-white text-slate-900 shadow-xs';
        tableBtn.className = 'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md text-slate-500 hover:text-slate-900';
      }
      render();
    }

    function setTabFilter(tab) {
      currentTab = tab;
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.className = 'tab-btn px-3 py-1.5 rounded-md whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-50';
      });
      const activeBtn = document.querySelector(\`[data-tab="\${tab}"]\`);
      if (activeBtn) activeBtn.className = 'tab-btn px-3 py-1.5 rounded-md whitespace-nowrap bg-slate-100 text-slate-900 font-semibold shadow-2xs';
      render();
    }

    function handleSearch(val) { searchQuery = val; render(); }
    function handleSortChange(val) { const [f, d] = val.split('-'); sortField = f; sortDirection = d; render(); }

    function advanceStage(id, delta) {
      const cust = customers.find(c => c.id === id);
      if (!cust) return;
      const curIdx = PIPELINE_STAGES.findIndex(s => s.id === cust.stage);
      const nextIdx = curIdx + delta;
      if (nextIdx >= 0 && nextIdx < PIPELINE_STAGES.length) {
        cust.stage = PIPELINE_STAGES[nextIdx].id;
        saveStorage();
        showToast(\`\${cust.companyName} stage updated to \${cust.stage}\`);
        render();
      }
    }

    function openCreateModal() {
      document.getElementById('modal-title').innerText = 'Create company';
      document.getElementById('form-id').value = '';
      document.getElementById('form-name').value = '';
      document.getElementById('form-est').value = 'USDA-EST-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('form-contact-name').value = '';
      document.getElementById('form-contact-email').value = '';
      document.getElementById('form-contact-phone').value = '';
      document.getElementById('form-contact-title').value = '';
      document.getElementById('form-city').value = '';
      document.getElementById('form-state').value = '';
      document.getElementById('company-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function editCustomer(id) {
      const c = customers.find(item => item.id === id);
      if (!c) return;
      document.getElementById('modal-title').innerText = 'Edit company';
      document.getElementById('form-id').value = c.id;
      document.getElementById('form-name').value = c.companyName;
      document.getElementById('form-est').value = c.establishmentNumber;
      document.getElementById('form-sector').value = c.sector;
      document.getElementById('form-contact-name').value = c.primaryContact.name;
      document.getElementById('form-contact-title').value = c.primaryContact.title;
      document.getElementById('form-contact-email').value = c.primaryContact.email;
      document.getElementById('form-contact-phone').value = c.primaryContact.phone;
      document.getElementById('form-city').value = c.facilityLocation.city;
      document.getElementById('form-state').value = c.facilityLocation.state || '';
      document.getElementById('form-volume').value = c.monthlyVolumeMetricTons;
      document.getElementById('form-contract').value = c.annualContractValue;
      document.getElementById('company-modal').classList.remove('hidden');
      lucide.createIcons();
    }

    function editCurrentRecord() {
      if (activeRecordDetail) editCustomer(activeRecordDetail.customerId);
    }

    function closeModal() { document.getElementById('company-modal').classList.add('hidden'); }

    function handleFormSubmit(e) {
      e.preventDefault();
      const id = document.getElementById('form-id').value;
      const payload = {
        companyName: document.getElementById('form-name').value.trim(),
        establishmentNumber: document.getElementById('form-est').value.trim(),
        sector: document.getElementById('form-sector').value,
        primaryContact: {
          name: document.getElementById('form-contact-name').value.trim(),
          title: document.getElementById('form-contact-title').value.trim(),
          email: document.getElementById('form-contact-email').value.trim(),
          phone: document.getElementById('form-contact-phone').value.trim()
        },
        facilityLocation: {
          city: document.getElementById('form-city').value.trim(),
          state: document.getElementById('form-state').value.trim()
        },
        coldChainSpec: document.getElementById('form-coldchain').value,
        monthlyVolumeMetricTons: Number(document.getElementById('form-volume').value) || 0,
        annualContractValue: Number(document.getElementById('form-contract').value) || 0,
        certifications: ['HACCP Certified', 'FSMA Compliant']
      };

      if (id) {
        const idx = customers.findIndex(c => c.id === id);
        if (idx !== -1) customers[idx] = { ...customers[idx], ...payload };
        showToast('Updated company');
      } else {
        customers.unshift({ ...payload, id: 'cust-' + Date.now(), stage: 'Lead / Inbound' });
        showToast('Created company');
      }
      saveStorage();
      closeModal();
      render();
    }

    function deleteCustomer(id) {
      const c = customers.find(item => item.id === id);
      if (!c) return;
      if (confirm(\`Delete \${c.companyName}?\`)) {
        customers = customers.filter(item => item.id !== id);
        saveStorage();
        if (activeRecordDetail && activeRecordDetail.customerId === id) activeRecordDetail = null;
        showToast('Deleted company');
        render();
      }
    }

    function resetDemoData() {
      if (confirm('Reset to demo data?')) {
        customers = JSON.parse(JSON.stringify(DEMO_CUSTOMERS));
        saveStorage();
        activeRecordDetail = null;
        render();
      }
    }

    function exportCSV() {
      const list = getFilteredCustomers();
      const csv = 'data:text/csv;charset=utf-8,Est,Company,Sector,Stage,Contact,Email,Phone,Volume,Contract\\n' + 
        list.map(c => \`"\${c.establishmentNumber}","\${c.companyName}","\${c.sector}","\${c.stage}","\${c.primaryContact.name}","\${c.primaryContact.email}","\${c.primaryContact.phone}",\${c.monthlyVolumeMetricTons},\${c.annualContractValue}\`).join('\\n');
      const link = document.createElement('a');
      link.setAttribute('href', encodeURI(csv));
      link.setAttribute('download', 'food_crm_contacts.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    window.onload = init;
  </script>
</body>
</html>
`;
