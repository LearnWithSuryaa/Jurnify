"use client";

import {
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Edit3,
  Trash2,
  X,
  AlignLeft,
  XCircle,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import type { Task } from "./TaskFormModal";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: () => void;
  onDelete: (id: string) => Promise<void>;
}

const detailHeaderColor = (status: string | undefined) => {
  if (!status) return "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4]";
  const colors = {
    pending: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    in_progress: "bg-gradient-to-r from-blue-500 to-blue-600",
    completed: "bg-gradient-to-r from-green-500 to-green-600",
    cancelled: "bg-gradient-to-r from-red-500 to-red-600",
  };
  return (
    colors[status as keyof typeof colors] ||
    "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4]"
  );
};

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
}: TaskDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!isOpen || !task || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all overflow-hidden animate-[modalIn_0.18s_ease_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-8 py-6 text-white ${detailHeaderColor(task.status)}`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {/* Icon Logic */}
                {task.status === "pending" && <Clock className="w-8 h-8" />}
                {task.status === "in_progress" && (
                  <Activity className="w-8 h-8" />
                )}
                {task.status === "completed" && (
                  <CheckCircle2 className="w-8 h-8" />
                )}
                {task.status === "cancelled" && (
                  <XCircle className="w-8 h-8" />
                )}
                {!["pending", "in_progress", "completed", "cancelled"].includes(
                  task.status
                ) && <Clock className="w-8 h-8" />}

                <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm capitalize">
                  {task.status === "pending"
                    ? "Pending"
                    : task.status === "in_progress"
                    ? "In Progress"
                    : task.status === "completed"
                    ? "Completed"
                    : "Cancelled"}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-2">{task.title}</h2>
              <div className="space-y-1 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Dibuat: {formatDate(task.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">
                    Deadline: {formatDate(task.due_date)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-[#3B6A9E]" />
                Deskripsi
              </h3>
              <p className="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {task.description || "Tidak ada deskripsi"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <button
                onClick={onEdit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#3B6A9E] text-white rounded-xl hover:bg-[#2f5680] transition font-semibold cursor-pointer"
              >
                <Edit3 className="w-5 h-5" />
                Edit Task
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-semibold cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
                Hapus Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
