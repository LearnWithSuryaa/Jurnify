"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Edit3,
  X,
  Check,
  MessageSquare,
  AlignLeft,
  Tag,
  XCircle,
} from "lucide-react";
import { createPortal } from "react-dom";

// You might want to move these to a shared types file later
export interface Task {
  id: string; // UUID
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  due_date: string;
  created_at: string;
  user_id: string;
}

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => Promise<void>;
  initialData?: Partial<Task> | null;
  isEditMode: boolean;
}

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    bgActive: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    iconActive: "text-white",
    iconDefault: "text-yellow-600",
    textActive: "text-white",
  },
  {
    value: "in_progress",
    label: "Progress",
    icon: Activity,
    bgActive: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconActive: "text-white",
    iconDefault: "text-blue-600",
    textActive: "text-white",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    bgActive: "bg-gradient-to-br from-green-500 to-green-600",
    iconActive: "text-white",
    iconDefault: "text-green-600",
    textActive: "text-white",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    bgActive: "bg-gradient-to-br from-red-500 to-red-600",
    iconActive: "text-white",
    iconDefault: "text-red-600",
    textActive: "text-white",
  },
] as const;

export default function TaskFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditMode,
}: TaskFormModalProps) {
  const [formData, setFormData] = useState<{
    id: string | null;
    title: string;
    description: string;
    status: Task["status"];
    due_date: string;
  }>({
    id: null,
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Update form data when initialData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialData && isEditMode) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
            id: initialData.id || null,
          title: initialData.title || "",
          description: initialData.description || "",
          status: initialData.status || "pending",
          due_date: initialData.due_date || "",
        });
      } else {
        // Reset for add mode
        setFormData({
          id: null,
          title: "",
          description: "",
          status: "pending",
          due_date: "",
        });
      }
    }
  }, [isOpen, initialData, isEditMode]);

  const handleSave = async () => {
    // Basic validation
    if (!formData.title.trim()) {
       // We can use a toast here ideally, keeping alert for now as per original
       alert("Judul task harus diisi!");
       return;
    }
    if (!formData.due_date) {
        alert("Tanggal deadline harus diisi!");
        return;
    }

    await onSave({
      ...formData,
      id: formData.id ?? undefined,
    });
  };

  if (!isOpen || !mounted) return null;

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
        <div className="bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] px-8 py-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {isEditMode ? (
                  <Edit3 className="w-8 h-8" />
                ) : (
                  <Plus className="w-8 h-8" />
                )}

                <h2 className="text-3xl font-bold">
                  {isEditMode ? "Edit Task" : "Tambah Task Baru"}
                </h2>
              </div>
              <p className="text-sm text-white/90">
                Kelola tugas perjalanan Anda
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#3B6A9E]" />
              Judul Task
              <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              placeholder="Masukkan judul task..."
              className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-[#3B6A9E]" />
              Deskripsi Task
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              placeholder="Tambahkan deskripsi task..."
              className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3B6A9E]" />
              Tanggal Deadline
              <span className="text-red-500">*</span>
            </label>
            <input
              value={formData.due_date}
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
              type="date"
              className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium"
            />
          </div>

          {/* Status */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#3B6A9E]" />
              Status Task
            </label>
            <div className="grid grid-cols-4 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() =>
                    setFormData({ ...formData, status: status.value })
                  }
                  type="button"
                  className={`
                    group relative px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3
                    ${
                      formData.status === status.value
                        ? "border-[#3B6A9E] shadow-lg scale-105 " +
                          status.bgActive
                        : "bg-white border-slate-200 hover:border-[#3B6A9E]/50 hover:shadow-md"
                    }
                  `}
                >
                  <status.icon
                    className={`
                    w-7 h-7 transition-transform group-hover:scale-110
                    ${
                      formData.status === status.value
                        ? status.iconActive
                        : status.iconDefault
                    }
                  `}
                  />
                  <span
                    className={`
                    text-sm font-bold capitalize
                    ${
                      formData.status === status.value
                        ? status.textActive
                        : "text-slate-700"
                    }
                  `}
                  >
                    {status.label}
                  </span>
                  {formData.status === status.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 text-[#3B6A9E]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 justify-end pt-4 border-t">
            <button
              onClick={onClose}
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition font-medium"
            >
              <X className="w-4 h-4" />
              Batal
            </button>
            <button
              onClick={handleSave}
              type="button"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white hover:shadow-lg hover:scale-105 transition font-bold flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {isEditMode ? "Update Task" : "Simpan Task"}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes modalIn {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
