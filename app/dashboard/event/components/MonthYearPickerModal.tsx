"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MonthYearPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMonth: number;
  currentYear: number;
  onSelectMonth: (monthIndex: number) => void;
  onYearChange: (increment: number) => void;
}

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MonthYearPickerModal({
  isOpen,
  onClose,
  currentMonth,
  currentYear,
  onSelectMonth,
  onYearChange,
}: MonthYearPickerModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-md transform transition-all animate-[modalIn_0.18s_ease_forwards]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            Pilih Bulan & Tahun
          </h3>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Year Selector */}
        <div className="mb-6">
          <label className="text-sm text-slate-600 mb-2 block">Tahun</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onYearChange(-1)}
              className="p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              ◀
            </button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-bold text-slate-900">
                {currentYear}
              </span>
            </div>
            <button
              onClick={() => onYearChange(1)}
              className="p-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Month Grid */}
        <div>
          <label className="text-sm text-slate-600 mb-2 block">Bulan</label>
          <div className="grid grid-cols-3 gap-2">
            {monthsShort.map((m, i) => (
              <button
                key={m}
                onClick={() => onSelectMonth(i)}
                className={`
                  px-4 py-3 rounded-xl text-sm transition font-medium cursor-pointer
                  ${
                    i === currentMonth
                      ? "bg-[#3B6A9E] text-white shadow-md"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }
                `}
              >
                {m}
              </button>
            ))}
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
