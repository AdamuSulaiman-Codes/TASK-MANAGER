import { FiSearch, FiPlus, FiFilter, FiCheckCircle, FiClock, FiCircle, FiLayers } from "react-icons/fi";
import type { User } from "../Auth/authData";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserTask, getUserTask, updateUserTask, type Priority, type Status } from "./backendFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toolBarActions } from "../Store/ToolBarSlice";
import { modalActions } from "../Store/ModalSlice";
import Modal from "../assets/Modal";
import AddTask from "../Components/AddTask";
import { tokenActions } from "../Store/TokenSlice";
import { useEffect } from "react";
import DeleteConfirmation from "../Components/DeleteConfirmation";
import EditTask from "../Components/EditTask";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TaskStatus = "COMPLETED" | "PENDING" | "NOT_STARTED";
export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface TaskCardProps {
  task: Task;
  onStart?: (id: number) => void;
  onComplete?: (id: number) => void;
  onReopen?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// ─── Summary Cards ─────────────────────────────────────────────────────────────
type DashboardSummaryProps = {
    userTasks: Task[],
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ userTasks }) => {
  const totalTasks = userTasks.length;
  const inProgress = userTasks.filter(task => task.status == "PENDING").length;
  const notStarted = userTasks.filter(task => task.status == "NOT_STARTED").length;
  const completed = userTasks.filter(task => task.status == "COMPLETED").length;


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
      label: "Pending",
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
type ToolBarRootState = {
  toolbar: {
    searchTerm: string;
    statusTerm: string;
    priorityTerm: string;
    selectedDate: string;
  }
};



// ─── Toolbar ───────────────────────────────────────────────────────────────────
const TaskToolbar: React.FC = () => {
  const searchTerm = useSelector((state: ToolBarRootState) => state.toolbar.searchTerm);
  const statusTerm = useSelector((state: ToolBarRootState) => state.toolbar.statusTerm);
  const priorityTerm = useSelector((state: ToolBarRootState) => state.toolbar.priorityTerm);
  const selectedDate = useSelector((state: ToolBarRootState) => state.toolbar.selectedDate);


  const dispach = useDispatch();

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispach(toolBarActions.onSearchTermChange(e.target.value));
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispach(toolBarActions.onStatusTermChange(e.target.value));
  }

  function handlePriorityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispach(toolBarActions.onPriorityTermChange(e.target.value));
  }
  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispach(toolBarActions.onDateChange(e.target.value));
  }

  function handleOpenAddTaskModal() {
    dispach(modalActions.openModal(<AddTask/>));
  }
  
  
  const statuses = ["PENDING", "COMPLETED", "NOT_STARTED"];
  const priorities = ["LOW", "MEDIUM", "HIGH"];

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
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button 
        onClick={handleOpenAddTaskModal}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition shadow-sm whitespace-nowrap">
          <FiPlus size={16} />
          New Task
        </button>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Status Dropdown */}
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium transition">
          <FiFilter size={13} className="text-slate-400" />
          <select
            value={statusTerm}
            onChange={handleStatusChange}
            className="bg-transparent outline-none text-slate-600 text-sm"
          >
            <option value="">Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-medium transition">
          <FiFilter size={13} className="text-slate-400" />
          <select
            value={priorityTerm}
            onChange={handlePriorityChange}
            className="bg-transparent outline-none text-slate-600 text-sm"
          >
            <option value="">Priority</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Sort button */}
        <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e)}
            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm"
            />
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
  task: { id, title, description, dueDate, priority, status },
}) => {
  const pCfg = priorityConfig[priority];
  const sCfg = statusConfig[status];

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  function handldeOpenDeleteModal() {
    // open delete confirmation modal
    dispatch(modalActions.openModal(
      <DeleteConfirmation
        isOpen={true}
        onConfirm={async() => {
            await deleteUserTask(id, localStorage.getItem("token"));
            await queryClient.refetchQueries({ queryKey: ["tasks"] });
            dispatch(modalActions.closeModal());
        } }
        onCancel={() => dispatch(modalActions.closeModal())}
      />
    ));
  }

  function handleOpenEditModal() {
    // open edit task modal (can reuse AddTask component with pre-filled data)

    const task: Task = {
        id,
        title,
        description,
        dueDate,
        priority,
        status,
        userId: id // or pass it from your TaskCard props
    };
    
    dispatch(modalActions.openModal(
      <EditTask 
      task={task} 
      taskId={id} 
      onSave={async() => {
        await updateUserTask(id, localStorage.getItem("token"), task);
        await queryClient.refetchQueries({ queryKey: ["tasks"] });
        dispatch(modalActions.closeModal());
      }}
      />
    ));
  }

  const primaryAction =
    status === "COMPLETED" ? { label: "Reopen",   handler: () => {}} :
    status === "PENDING"   ? { label: "Complete",  handler: () => {}} :
                             { label: "Start",     handler: () => {}};

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
          onClick={handleOpenEditModal}
          className="p-2 rounded-lg text-amber-500 hover:bg-amber-50 transition"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414A2 2 0 019 13z" />
          </svg>
        </button>
        <button
          onClick={handldeOpenDeleteModal}
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
type TaskGridProps = {
    userTasks: Task[],
}

function TaskGrid({userTasks}: TaskGridProps) {

  return (
    <div className="px-8 pb-10">
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">All Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
type RootState = {
  user: {
    user: User | null
  }
};

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO date string from backend
  priority: Priority;
  status: Status;
  userId: number;
};
type RootStateToken = {
  token: {
    token: string | null
  }
};

function DashBoardPage() {
  const user = useSelector((state : RootState) => state.user.user);
  const token = useSelector((state: RootStateToken) => state.token.token);
  const userId = user?.id;

  const dispatch = useDispatch();

  const searchTerm = useSelector((state: ToolBarRootState) => state.toolbar.searchTerm);
  const statusTerm = useSelector((state: ToolBarRootState) => state.toolbar.statusTerm);
  const priorityTerm = useSelector((state: ToolBarRootState) => state.toolbar.priorityTerm);
  const selectedDate = useSelector((state: ToolBarRootState) => state.toolbar.selectedDate);
  



  const {data: userTasks = [], isLoading, error} = useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getUserTask(userId, token),
    // enabled: !!userId,
    // staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (error instanceof Error && error.message === "Unauthorized") {
        dispatch(tokenActions.onLogOut());
    }
    }, [error, dispatch]);

  const filteredTasks = userTasks.filter(task => {
  // Search filter
  const matchesSearch =
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase());

  // Status filter
  const matchesStatus = statusTerm ? task.status === statusTerm : true;

  // Priority filter
  const matchesPriority = priorityTerm ? task.priority === priorityTerm : true;

  // Date filter
  const taskDate = new Date(task.dueDate);
  const today = new Date();
  const matchesFuture = taskDate >= today; // ignore past tasks

  const matchesSelectedDate = selectedDate
    ? taskDate >= new Date(selectedDate) // only tasks from selected date onward
    : true;

    return matchesSearch && matchesStatus && matchesPriority && matchesFuture && matchesSelectedDate;
    })  
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()); // nearest date first

  console.log(userTasks);
  console.log(filteredTasks);
  
  {isLoading && <p>Loading...</p>}


  return (
    <div className="bg-slate-50 min-h-screen">
      <Modal/>
      <DashboardSummary userTasks={filteredTasks}/>
      <TaskToolbar />
      <TaskGrid userTasks={filteredTasks}/>
    </div>
  );
}

export default DashBoardPage;