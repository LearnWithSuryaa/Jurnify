"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Plus,
  Edit3,
  Calendar as CalendarIcon,
  MessageSquare,
  AlignLeft,
  Tag,
  Check,
  Timer,
} from "lucide-react";
import {
  UserRound,
  Pin,
} from "lucide-react";

export interface Event {
  id: string | null; // UUID
  title: string;
  description: string | null;
  event_date: string; // YYYY-MM-DD
  user_id?: string;
  metadata?: {
    category?: string;
  };
  created_at?: string;
}

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  initialData?: Partial<Event> | null;
  isEditMode: boolean;
  onSave: (event: Partial<Event>) => Promise<void>;
}

const categories = ["meeting", "deadline", "personal"];

const categoryIcon = (c: string) => {
  const icons: Record<string, React.ElementType> = {
    meeting: CalendarIcon,
    deadline: Timer,
    personal: UserRound,
  };
  return icons[c] || Pin;
};

export default function EventFormModal({
  isOpen,
  onClose,
  selectedDate,
  initialData,
  isEditMode,
  onSave,
}: EventFormModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && initialData) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          title: initialData.title || "",
          description: initialData.description || "",
          category: initialData.metadata?.category || "",
        });
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFormData({
          title: "",
          description: "",
          category: "",
        });
      }
    }
  }, [isOpen, isEditMode, initialData]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) return;
    await onSave({
      id: initialData?.id,
      title: formData.title,
      description: formData.description,
      metadata: { category: formData.category },
    });
  };

  const selectedDateText = selectedDate
    ? selectedDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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
        {/* Header dengan gradient */}
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
                  {isEditMode ? "Edit Event" : "Tambah Event Baru"}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <CalendarIcon className="w-4 h-4" />
                <p className="text-sm font-medium">{selectedDateText}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#3B6A9E]" />
              Judul Event
            </label>
            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              type="text"
              placeholder="Masukkan judul event..."
              className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-[#3B6A9E]" />
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              placeholder="Tambahkan deskripsi event..."
              className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#3B6A9E]" />
              Pilih Kategori
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((c) => {
                const Icon = categoryIcon(c);
                const isSelected = formData.category === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFormData({ ...formData, category: c })}
                    className={`
                      group relative px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3
                      ${
                        isSelected
                          ? "bg-gradient-to-br from-[#3B6A9E] to-[#5a8bc4] border-[#3B6A9E] text-white shadow-lg scale-105"
                          : "bg-white border-slate-200 hover:border-[#3B6A9E]/50 hover:shadow-md text-slate-700"
                      }
                    `}
                  >
                    <Icon
                      className={`w-7 h-7 transition-transform group-hover:scale-110 ${
                        isSelected ? "text-white" : "text-[#3B6A9E]"
                      }`}
                    />
                    <span className="text-sm font-bold capitalize">{c}</span>
                    {isSelected && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <Check className="w-4 h-4 text-[#3B6A9E]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition font-medium"
            >
              <X className="w-4 h-4" />
              Batal
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white hover:shadow-lg hover:scale-105 transition font-bold flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              {isEditMode ? "Update Event" : "Simpan Event"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
