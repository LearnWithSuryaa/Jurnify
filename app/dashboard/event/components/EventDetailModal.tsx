"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar as CalendarIcon, Timer, UserRound, Pin } from "lucide-react";
import type { Event } from "./EventFormModal";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => Promise<void>;
}

const tagColor = (category?: string) => {
  const colors: Record<string, string> = {
    meeting: "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white",
    deadline: "bg-gradient-to-r from-red-600 to-red-400 text-white",
    personal: "bg-gradient-to-r from-green-600 to-green-400 text-white",
  };
  return colors[category || ""] || "bg-slate-100 text-slate-700";
};

const CategoryIcon = ({ category, className }: { category?: string; className?: string }) => {
  const icons: Record<string, React.ElementType> = {
    meeting: CalendarIcon,
    deadline: Timer,
    personal: UserRound,
  };
  const Icon = icons[category || ""] || Pin;
  return <Icon className={className} />;
};

export default function EventDetailModal({
  isOpen,
  onClose,
  event,
  onEdit,
  onDelete,
}: EventDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!isOpen || !event || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-[0_8px_40px_-4px_rgba(0,0,0,0.2)] overflow-hidden animate-[modalIn_0.18s_ease_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800 leading-tight">
            {event.title}
          </h3>

          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 space-y-4">
          {/* Description */}
          <p className="text-slate-600 leading-relaxed">
            {event.description || "Tidak ada deskripsi"}
          </p>

          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CalendarIcon className="w-4 h-4 text-[#3B6A9E]" />
            {event.event_date
              ? new Date(event.event_date + "T00:00:00").toLocaleDateString(
                  "id-ID",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )
              : ""}
          </div>

          {/* Category */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${tagColor(
              event.metadata?.category
            )}`}
          >
            <CategoryIcon category={event.metadata?.category} className="w-4 h-4" />
            <span className="capitalize">{event.metadata?.category || "Uncategorized"}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Tutup
          </button>

          <button
            onClick={() => {
                if (event.id) onDelete(event.id);
                onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition shadow-sm font-medium"
          >
            Hapus
          </button>

          <button
            onClick={() => {
              onEdit(event);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-[#3B6A9E] text-white hover:bg-[#345d8a] transition shadow-sm font-medium"
          >
            Edit
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
