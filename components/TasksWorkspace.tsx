'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  Building2,
  Users,
  Filter,
  CheckCircle2,
  Trash2
} from 'lucide-react';

export interface TaskItem {
  id: string;
  title: string;
  companyName: string;
  companyId: string;
  contactName: string;
  dueDate: string;
  priority: 'Urgent' | 'High' | 'Normal' | 'Low';
  completed: boolean;
  assignedTo: string;
  category: 'Contract' | 'HACCP Audit' | 'Cold Chain' | 'Procurement';
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Review signed Cold-Chain SLA addendum for Peter Example (Business Example)',
    companyName: 'Business Example',
    companyId: 'cust-100',
    contactName: 'Peter Example',
    dueDate: 'Today at 5:00 PM',
    priority: 'Urgent',
    completed: false,
    assignedTo: 'Sarah Lin',
    category: 'Cold Chain'
  },
  {
    id: 'task-2',
    title: 'Audit reefer temperature excursion log on Ticket TCK-8921 with Alex Rivera',
    companyName: 'Business Example',
    companyId: 'cust-100',
    contactName: 'Peter Example',
    dueDate: 'Today at 6:30 PM',
    priority: 'High',
    completed: false,
    assignedTo: 'Alex Rivera',
    category: 'HACCP Audit'
  },
  {
    id: 'task-3',
    title: 'Issue purchase order PO-2026-0842 dispatch confirmation (120 MT beef trimmings)',
    companyName: 'Apex Primal Beef & Fabricators',
    companyId: 'cust-101',
    contactName: 'Marcus Vance',
    dueDate: 'Tomorrow',
    priority: 'Normal',
    completed: false,
    assignedTo: 'Sarah Lin',
    category: 'Procurement'
  },
  {
    id: 'task-4',
    title: 'Schedule Q4 microbiological environmental swab walkthrough with Dr. Chen',
    companyName: 'Shenandoah Broiler Farms',
    companyId: 'cust-102',
    contactName: 'Elena Rostova',
    dueDate: 'Sep 18, 2026',
    priority: 'Normal',
    completed: false,
    assignedTo: 'Dr. Chen',
    category: 'HACCP Audit'
  },
  {
    id: 'task-5',
    title: 'Verify USDA FSIS Form 9060-5 sanitary certificates for Pacific Rim Marine',
    companyName: 'Pacific Rim Marine Harvest',
    companyId: 'cust-103',
    contactName: 'Capt. Donald Tanaka',
    dueDate: 'Sep 12, 2026',
    priority: 'Normal',
    completed: true,
    assignedTo: 'Sarah Lin',
    category: 'Contract'
  }
];

interface TasksWorkspaceProps {
  onOpenRecordDetail: (type: 'contact' | 'company', customerId: string) => void;
  showToast: (msg: string) => void;
}

export default function TasksWorkspace({
  onOpenRecordDetail,
  showToast
}: TasksWorkspaceProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<TaskItem['priority']>('High');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const updated = !t.completed;
        showToast(updated ? 'Task marked as complete' : 'Task marked as pending');
        return { ...t, completed: updated };
      }
      return t;
    }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle,
      companyName: 'Business Example',
      companyId: 'cust-100',
      contactName: 'Peter Example',
      dueDate: 'Tomorrow at 5:00 PM',
      priority: newPriority,
      completed: false,
      assignedTo: 'Sarah Lin',
      category: 'Cold Chain'
    };

    setTasks([newTask, ...tasks]);
    setIsCreateOpen(false);
    setNewTitle('');
    showToast('New task added to queue');
  };

  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tasks & Compliance Follow-ups</h1>
            <span className="text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              {pendingCount} Pending Tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational action items, contract redline reviews, and temperature verification sign-offs
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="px-3.5 py-2 bg-[#ff7a59] hover:bg-[#e06545] text-white text-xs font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'pending' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'completed' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-slate-900 text-white font-bold' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            All Tasks ({tasks.length})
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 flex items-start sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors ${
              task.completed ? 'bg-slate-50/40 opacity-70' : ''
            }`}
          >
            <div className="flex items-start sm:items-center gap-3 flex-1">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-0.5 sm:mt-0 text-slate-400 hover:text-[#ff7a59] transition-colors shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold text-slate-900 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-500">
                  <button
                    onClick={() => onOpenRecordDetail('company', task.companyId)}
                    className="hover:text-[#ff7a59] font-medium flex items-center gap-1"
                  >
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>{task.companyName}</span>
                  </button>
                  <span>•</span>
                  <span>Assignee: <strong>{task.assignedTo}</strong></span>
                  <span>•</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                    {task.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                task.priority === 'Urgent' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                task.priority === 'High' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {task.priority}
              </span>
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {task.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4">
            <h3 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-2">Add Compliance Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule pre-audit meeting with USDA inspector"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as TaskItem['priority'])}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="Urgent">🚨 Urgent</option>
                  <option value="High">⚠️ High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
