import { FiSearch, FiPlus, FiFilter, FiCheckCircle, FiClock, FiCircle, FiLayers } from "react-icons/fi";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskStatus = "COMPLETED" | "PENDING" | "NOT_STARTED";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  onStart?: (id: string) => void;
  onComplete?: (id: string) => void;
  onReopen?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// ─── Summary Cards ─────────────────────────────────────────────────────────────

const DashboardSummary: React.FC = () => {
  const totalTasks = 6;
  const inProgress = 2;
  const notStarted = 3;
  const completed = 1;

  const cards = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <FiLayers size={20} />,
      color: "text-slate-700",
      bg: "bg-slate-100",
      border: "border-slate-200",
    },
    {
      label: "In Progress",
      value: inProgress,
      icon: <FiClock size={20} />,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
    },
    {
      label: "Not Started",
      value: notStarted,
      icon: <FiCircle size={20} />,
      color: "text-slate-500",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
    {
      label: "Completed",
      value: completed,
      icon: <FiCheckCircle size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  return (
    <div className="px-8 pt-10 pb-6">
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Manage and track all your tasks in one place</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`rounded-2xl border ${card.border} bg-white p-5 shadow-sm flex flex-col gap-3`}
          >
            <div className={`w-9 h-9 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
              {card.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{card.label}</p>
              <p className={`text-3xl font-bold mt-0.5 ${card.color}`}>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Toolbar ───────────────────────────────────────────────────────────────────

const TaskToolbar: React.FC = () => {
  return (
    <div className="px-8 py-4 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition shadow-sm whitespace-nowrap">
          <FiPlus size={16} />
          New Task
        </button>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2">
        {["Status", "Priority"].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium transition"
          >
            <FiFilter size={13} className="text-slate-400" />
            {label}
          </button>
        ))}
        <button className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-sm font-medium transition">
          Sort: Deadline
        </button>
      </div>
    </div>
  );
};

// ─── Task Card ─────────────────────────────────────────────────────────────────

const priorityConfig: Record<TaskPriority, { label: string; className: string }> = {
  HIGH:   { label: "High",   className: "bg-red-100 text-red-600 border border-red-200" },
  MEDIUM: { label: "Medium", className: "bg-amber-100 text-amber-600 border border-amber-200" },
  LOW:    { label: "Low",    className: "bg-slate-100 text-slate-500 border border-slate-200" },
};

const statusConfig: Record<TaskStatus, { label: string; className: string }> = {
  COMPLETED:   { label: "Completed",   className: "bg-emerald-100 text-emerald-700" },
  PENDING:     { label: "In Progress", className: "bg-amber-100 text-amber-700" },
  NOT_STARTED: { label: "Not Started", className: "bg-slate-100 text-slate-500" },
};

const TaskCard: React.FC<TaskCardProps> = ({
  id, title, description, priority, status, dueDate,
  onStart, onComplete, onReopen, onEdit, onDelete,
}) => {
  const pCfg = priorityConfig[priority];
  const sCfg = statusConfig[status];

  const primaryAction =
    status === "COMPLETED" ? { label: "Reopen",   handler: () => onReopen?.(id) } :
    status === "PENDING"   ? { label: "Complete",  handler: () => onComplete?.(id) } :
                             { label: "Start",     handler: () => onStart?.(id) };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-800 leading-snug flex-1">{title}</h3>
        <span className={`shrink-0 px-2.5 py-0.5 text-xs rounded-full font-semibold capitalize ${pCfg.className}`}>
          {pCfg.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{description}</p>

      {/* Status + Due */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className={`px-2.5 py-1 rounded-full font-medium ${sCfg.className}`}>{sCfg.label}</span>
        <span className="text-slate-400">· Due {dueDate}</span>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={primaryAction.handler}
          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium py-2 rounded-lg transition"
        >
          {primaryAction.label}
        </button>
        <button
          onClick={() => onEdit?.(id)}
          className="p-2 rounded-lg text-amber-500 hover:bg-amber-50 transition"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414A2 2 0 019 13z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete?.(id)}
          className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M3 7h18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ─── Task Grid ─────────────────────────────────────────────────────────────────

function TaskGrid() {
  const tasks: TaskCardProps[] = [
    {
      id: "1",
      title: "Mobile responsive design",
      description: "Ensure all pages are fully responsive on mobile devices",
      priority: "HIGH",
      status: "COMPLETED",
      dueDate: "Feb 24, 2026",
    },
    {
      id: "2",
      title: "Design system refactor",
      description: "Update design tokens and component variants for consistency",
      priority: "HIGH",
      status: "PENDING",
      dueDate: "Feb 28, 2026",
    },
    {
      id: "3",
      title: "Database optimization",
      description: "Add indexes and optimize queries for better performance",
      priority: "MEDIUM",
      status: "NOT_STARTED",
      dueDate: "Mar 8, 2026",
    },
  ];

  return (
    <div className="px-8 pb-10">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">All Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

function DashBoardPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <DashboardSummary />
      <TaskToolbar />
      <TaskGrid />
    </div>
  );
}

export default DashBoardPage;