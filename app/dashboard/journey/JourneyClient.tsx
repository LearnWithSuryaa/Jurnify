"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Edit3,
  ListTodo,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { createSupabaseClient } from "../../../lib/supabaseClient";
import TaskFormModal, { Task } from "./components/TaskFormModal";
import TaskDetailModal from "./components/TaskDetailModal";
import { useTasks } from "../../../hooks/useTasks";

export default function JourneyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseClient();

  // STATE
  const { tasks, mutate } = useTasks();
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [editingTaskData, setEditingTaskData] = useState<Partial<Task> | null>(
    null
  );

  // Deep Linking Effect
  useEffect(() => {
    // This effect runs when tasks are populated and searchParams change
    const taskId = searchParams.get("task");
    if (!taskId || tasks.length === 0) return;

    const task = tasks.find((t) => t.id === taskId);
    if (task && selectedTask?.id !== task.id) {
      setSelectedTask(task);
      setShowDetailModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, searchParams]);

  // COMPUTED
  const tasksByStatus = useMemo(
    () => ({
      pending: tasks.filter((t) => t.status === "pending").length,
      in_progress: tasks.filter((t) => t.status === "in_progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      cancelled: tasks.filter((t) => t.status === "cancelled").length,
    }),
    [tasks]
  );

  const filteredTasks = useMemo(() => {
    if (filterStatus === "all") return tasks;
    return tasks.filter((t) => t.status === filterStatus);
  }, [filterStatus, tasks]);

  // HELPERS
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const statusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      in_progress: Activity,
      completed: CheckCircle2,
      cancelled: XCircle,
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const statusBadgeColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      in_progress: "bg-blue-100 text-blue-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      colors[status as keyof typeof colors] || "bg-slate-100 text-slate-700"
    );
  };

  const taskBorderColor = (status: string) => {
    const colors = {
      pending: "border-yellow-200 hover:border-yellow-400",
      in_progress: "border-blue-200 hover:border-blue-400",
      completed: "border-green-200 hover:border-green-400",
      cancelled: "border-red-200 hover:border-red-400",
    };
    return colors[status as keyof typeof colors] || "border-slate-200";
  };

  // MODAL HANDLERS
  const openAddModal = () => {
    setIsEditMode(false);
    setEditingTaskData(null);
    setShowFormModal(true);
  };

  const openEditModal = (task: Task) => {
    setIsEditMode(true);
    setEditingTaskData(task);
    setShowFormModal(true);
  };

  const closeFormModal = () => {
    setShowFormModal(false);
    setIsEditMode(false);
    setEditingTaskData(null);
  };

  const openDetailModal = (task: Task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTask(null);
    router.replace("/dashboard/journey", { scroll: false });
  };

  const editFromDetail = () => {
    if (!selectedTask) return;
    const taskToEdit = { ...selectedTask };
    closeDetailModal();
    // Use timeout to allow modal animation to clear if needed, similar to original logic
    setTimeout(() => {
      openEditModal(taskToEdit);
    }, 100);
  };

  // CRUD OPERATIONS
  const handleSaveTask = async (taskData: Partial<Task>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("User not signed in");
      return;
    }

    try {
      if (taskData.id) {
        // Update
        const { error } = await supabase
          .from("tasks")
          .update({
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            due_date: taskData.due_date,
          })
          .eq("id", taskData.id);

        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("tasks").insert({
          user_id: user.id,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          due_date: taskData.due_date,
        });

        if (error) throw error;
      }

      await mutate();
      closeFormModal();
    } catch (error: unknown) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Hapus task ini?")) return;

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", id);
      if (error) throw error;

      await mutate();
      closeDetailModal();
    } catch (error: unknown) {
      console.error(error);
      alert((error as Error).message);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3b6a9e]/20 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[90px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      {/* HEADER */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Journey
          </h1>
          <p className="text-slate-600 text-sm">
            Kelola tugas Anda dan pantau progres perjalanan
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition font-semibold cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Tambah Task
        </button>
      </motion.div>

      {/* SUMMARY BAR */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-600 mb-1 truncate">Pending</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                {tasksByStatus.pending}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-blue-400">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-600 mb-1 truncate">In Progress</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                {tasksByStatus.in_progress}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-600 mb-1 truncate">Success</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                {tasksByStatus.completed}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-red-400">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-600 mb-1 truncate">Cancelled</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900">
                {tasksByStatus.cancelled}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* FILTER TABS */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full overflow-x-auto no-scrollbar pb-2 mb-4"
      >
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-sm w-max">
          {[
            "all",
            "pending",
            "in_progress",
            "completed",
            "cancelled",
          ].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`
                px-4 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap
                ${
                  filterStatus === status
                    ? "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white shadow-md transform scale-105"
                    : "text-slate-600 hover:bg-slate-100"
                }
              `}
            >
              {status === "all"
                ? "Semua"
                : status === "pending"
                ? "Pending"
                : status === "in_progress"
                ? "Progress"
                : status === "completed"
                ? "Success"
                : "Cancelled"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* TASKS GRID */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTasks.map((task, idx) => {
          const StatusIcon = statusIcon(task.status);
          return (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + (idx * 0.05) }}
              key={task.id}
              onClick={() => openDetailModal(task)}
              className={`group cursor-pointer bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl border-2 transition-all duration-300 overflow-hidden hover:scale-[1.02] ${taskBorderColor(
                task.status
              )}`}
            >
              {/* Status Badge */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 ${statusBadgeColor(
                      task.status
                    )}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {task.status === "pending"
                      ? "Pending"
                      : task.status === "in_progress"
                      ? "Progress"
                      : task.status === "completed"
                      ? "Success"
                      : "Cancelled"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(task);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Task Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {task.title}
                </h3>

                {/* Task Description */}
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                  {task.description || "Tidak ada deskripsi"}
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <div className="flex flex-col gap-1 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Dibuat: {formatDate(task.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-semibold text-slate-700">
                        Deadline: {formatDate(task.due_date)}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#3B6A9E] transition" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ListTodo className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Belum ada task
            </h3>
            <p className="text-slate-600 mb-6">
              Mulai tambahkan task untuk melacak progres Anda
            </p>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition font-semibold cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Tambah Task Pertama
            </button>
          </div>
        )}
      </motion.div>

      {/* Component Modals */}
      <TaskFormModal
        isOpen={showFormModal}
        onClose={closeFormModal}
        onSave={handleSaveTask}
        initialData={editingTaskData}
        isEditMode={isEditMode}
      />

      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        task={selectedTask}
        onEdit={editFromDetail}
        onDelete={handleDeleteTask}
      />
    </motion.section>
  );
}
