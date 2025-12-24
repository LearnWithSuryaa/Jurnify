"use client";

import { Calendar, ChevronRight, Zap, Pin, Timer, UserRound } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CalendarWidgetProps {
  monthName: string;
  weekDays: string[];
  calendarDays: { date: Date; isCurrentMonth: boolean }[];
  isToday: (date: Date) => boolean;
  hasEvents: (date: Date) => boolean;
  todayEvents: any[];
  handleEventClick: (eventId: string) => void;
}

const categoryIcon = (category?: string) => {
  const icons: Record<string, any> = {
    meeting: Calendar,
    deadline: Timer,
    personal: UserRound,
  };
  return icons[category || ""] || Pin;
};

export default function CalendarWidget({
  monthName,
  weekDays,
  calendarDays,
  isToday,
  hasEvents,
  todayEvents,
  handleEventClick,
}: CalendarWidgetProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-1 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 h-fit"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3b6a9e]" />
          Kalender
        </h2>
        <Link
          href="/dashboard/events"
          className="text-xs font-bold text-[#3b6a9e] hover:text-[#2f5680] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
        >
          Lihat Semua
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="mb-4 text-center">
        <div className="text-lg font-bold text-slate-900 capitalize">{monthName}</div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d, i) => (
          <div
            key={i}
            className="text-center text-xs font-bold text-slate-400 py-2"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((day, idx) => (
          <button
            key={idx}
            className={[
              "relative aspect-square rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center",
              !day.isCurrentMonth ? "text-slate-300" : "text-slate-700",
              isToday(day.date)
                ? "bg-[#3b6a9e] text-white shadow-md shadow-blue-200"
                : "hover:bg-slate-100",
              hasEvents(day.date) && !isToday(day.date)
                ? "bg-blue-50 text-[#3b6a9e] font-bold"
                : "",
            ].join(" ")}
          >
            <span className="z-10">{day.date.getDate()}</span>
            {hasEvents(day.date) && (
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2">
                <div
                  className={`w-1 h-1 rounded-full ${
                    isToday(day.date) ? "bg-white" : "bg-[#3b6a9e]"
                  }`}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* TODAY EVENTS */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          Event Hari Ini
        </h3>

        {todayEvents.length > 0 ? (
          <div className="space-y-3">
            {todayEvents.map((ev) => {
              const Icon = categoryIcon(ev.metadata?.category);
              return (
                <div
                  key={ev.id}
                  onClick={() => handleEventClick(ev.id)}
                  className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-100 hover:border-slate-200 transition-all"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                    <Icon className="w-5 h-5 text-[#3b6a9e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {ev.title}
                    </div>
                    <div className="text-xs text-slate-500 capitalize">
                      {ev.metadata?.category || "Umum"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm font-medium">Tidak ada event hari ini</p>
            <p className="text-slate-400 text-xs mt-1">Waktunya fokus ke tugas! 💪</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
