"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Activity,
  XCircle,
  TrendingUp,
  AlertCircle,
  Target,
  Zap,
  Timer,
  ChevronRight,
  UserRound,
  Pin,
  ArrowRight,
  Award,
  BarChart3,
} from "lucide-react";

import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { useTasks } from "../../../hooks/useTasks";
import { useEvents } from "../../../hooks/useEvents";
import HomeSkeleton from "./components/HomeSkeleton";

/* =========================================================
   TYPE DEFINITIONS (IDENTIK LOGIC DARI VUE)
========================================================= */

type TaskStatus = "pending" | "in_progress" | "completed" | "cancelled";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date: string;
  created_at: string;
}

interface EventItem {
  id: string;
  title: string;
  event_date: string;
  start_time?: string;
  metadata?: {
    category?: string;
  };
}

/* =========================================================
   DATE UTILITIES (PORT LANGSUNG DARI VUE)
========================================================= */

const toLocalDate = (value: any): Date | null => { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!value) return null;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const d = new Date(value);
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  );
};

const dayKey = (value: any): number | null => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const d = toLocalDate(value);
  if (!d) return null;
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

const todayKey = () => dayKey(new Date())!;

const startOfLocalDay = (value: any = new Date()) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const d = toLocalDate(value)!;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const diffDaysLocal = (a: any, b: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const da = startOfLocalDay(a).getTime();
  const db = startOfLocalDay(b).getTime();
  return Math.round((da - db) / 86400000);
};

/* =========================================================
   PAGE (STRUKTUR, TATA LETAK, DAN CLASS 100% IDENTIK VUE)
========================================================= */

export default function DashboardHome() {
  const router = useRouter();
  /* ================= FETCH (REPLACED WITH SWR) ================= */
  const { tasks: tasksData, isLoading: tasksLoading } = useTasks();
  const { events: eventsData, isLoading: eventsLoading } = useEvents();

  // Mapping to local interfaces if needed, or just casting
  // The hook returns mostly compatible types. 
  // We can just use them directly or alias them.
  const tasks = (tasksData || []) as unknown as Task[]; 
  const events = (eventsData || []) as unknown as EventItem[];

  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate] = useState(new Date());

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  useEffect(() => {
    const i = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  /* ================= COMPUTED ================= */

  const currentDateLong = useMemo(
    () =>
      currentTime.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [currentTime]
  );

  const monthName = useMemo(
    () =>
      selectedDate.toLocaleString("id-ID", {
        month: "long",
        year: "numeric",
      }),
    [selectedDate]
  );

  const taskStats = useMemo(
    () => ({
      pending: tasks.filter((t) => t.status === "pending").length,
      in_progress: tasks.filter((t) => t.status === "in_progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      cancelled: tasks.filter((t) => t.status === "cancelled").length,
    }),
    [tasks]
  );

  const totalTasks = tasks.length;
  const completionRate = totalTasks
    ? Math.round((taskStats.completed / totalTasks) * 100)
    : 0;

  const todayEvents = useMemo(() => {
    const today = todayKey();
    return events.filter((ev) => dayKey(ev.event_date) === today);
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const today = todayKey();
    return events
      .filter((ev) => {
        const d = dayKey(ev.event_date)!;
        return d > today;
      })
      .sort((a, b) => dayKey(a.event_date)! - dayKey(b.event_date)!);
  }, [events]);

  const urgentTasks = useMemo(
    () =>
      tasks.filter((t) => {
        if (["completed", "cancelled"].includes(t.status)) return false;
        const diff = diffDaysLocal(t.due_date, new Date());
        return diff >= -5 && diff <= 5;
      }),
    [tasks]
  );

  const recentTasks = useMemo(
    () =>
      [...tasks]
        .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
        .slice(0, 5),
    [tasks]
  );

  const calendarDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push({
        date: new Date(year, month, i - startDay + 1),
        isCurrentMonth: false,
      });
    }

    for (let d = 1; d <= lastDate; d++) {
      days.push({ date: new Date(year, month, d), isCurrentMonth: true });
    }

    return days;
  }, [selectedDate]);

  const hasEvents = (date: Date) =>
    events.some((ev) => dayKey(ev.event_date) === dayKey(date));

  const isToday = (date: Date) => dayKey(date) === todayKey();

  const categoryIcon = (category?: string) => {
    const icons: Record<string, any> = { // eslint-disable-line @typescript-eslint/no-explicit-any
      meeting: Calendar,
      deadline: Timer,
      personal: UserRound,
    };
    return icons[category || ""] || Pin;
  };

  /* ================= NAV HANDLERS ================= */
  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/journey?task=${taskId}`);
  };

  const handleEventClick = (eventId: string) => {
    router.push(`/dashboard/event?open=${eventId}`);
  };

  /* ================= RENDER ================= */

  if (tasksLoading || eventsLoading) {
    return <HomeSkeleton />;
  }

  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
              Siap Produktif? ✨
            </h1>
            <p className="text-slate-600 text-lg">{currentDateLong}</p>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Target}
          value={totalTasks}
          label="Total Tasks"
          footerLeft="Progress"
          footerRight={`${completionRate}%`}
        />
        <StatCard
          icon={Activity}
          value={taskStats.in_progress}
          label="In Progress"
          footerLeft="Status"
          footerRight="Active"
        />
        <StatCard
          icon={CheckCircle2}
          value={taskStats.completed}
          label="Completed"
          footerLeft="Success Rate"
          footerRight={`${completionRate}%`}
        />
        <StatCard
          icon={Calendar}
          value={todayEvents.length}
          label="Events Today"
          footerLeft="Schedule"
          footerRight="Today"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* CALENDAR WIDGET */}
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#3B6A9E]" />
              Kalender
            </h2>
            <Link
              href="/dashboard/events"
              className="text-sm text-[#3B6A9E] hover:text-[#2f5680] font-semibold flex items-center gap-1"
            >
              Lihat Semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-4 text-center">
            <div className="text-lg font-bold text-slate-900">{monthName}</div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((d, i) => (
              <div
                key={i}
                className="text-center text-xs font-semibold text-slate-600 py-2"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => (
              <button
                key={idx}
                className={[
                  "relative aspect-square rounded-xl text-sm font-medium transition-all",
                  !day.isCurrentMonth ? "text-slate-300" : "text-slate-700",
                  isToday(day.date)
                    ? "bg-gradient-to-br from-[#3B6A9E] to-[#5a8bc4] text-white shadow-md"
                    : "hover:bg-slate-50",
                  hasEvents(day.date) && !isToday(day.date)
                    ? "bg-blue-50 border-2 border-blue-200"
                    : "",
                ].join(" ") + " cursor-pointer"}
              >
                {day.date.getDate()}
                {hasEvents(day.date) && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isToday(day.date) ? "bg-white" : "bg-blue-500"
                      }`}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* TODAY EVENTS */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-500" />
              Event Hari Ini
            </h3>

            {todayEvents.length > 0 ? (
              <div className="space-y-2">
                {todayEvents.map((ev) => {
                  const Icon = categoryIcon(ev.metadata?.category);
                  return (
                    <div
                      key={ev.id}
                      onClick={() => handleEventClick(ev.id)}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-transparent rounded-xl cursor-pointer hover:bg-blue-50/80 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 truncate">
                          {ev.title}
                        </div>
                        <div className="text-xs text-slate-600 capitalize">
                          {ev.metadata?.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-sm">
                Tidak ada event hari ini
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* URGENT TASKS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-red-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Tugas Mendesak
              </h2>
              <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                {urgentTasks.length} Tugas
              </span>
            </div>

            {urgentTasks.length > 0 ? (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {urgentTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task.id)}
                    className="group p-4 bg-gradient-to-r from-red-50 to-transparent rounded-2xl border-2 border-red-100 hover:border-red-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-3.5 h-3.5 text-red-500" />
                          <span className={`text-xs font-bold ${diffDaysLocal(task.due_date, new Date()) < 0 ? "text-red-700 underline" : "text-red-600"}`}>
                            {(() => {
                                const diff = diffDaysLocal(task.due_date, new Date());
                                if (diff < 0) return `Telat ${Math.abs(diff)} hari`;
                                if (diff === 0) return "Hari ini";
                                return `Kurang ${diff} hari`;
                            })()}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                          {task.title}
                        </h3>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Award className="w-12 h-12 mx-auto mb-3 text-green-400" />
                <div className="text-sm font-medium">Aman, nggak ada deadline mepet! 🎉</div>
                <div className="text-xs">Kamu bisa chill atau lanjutin pending task lainnya.</div>
              </div>
            )}
          </div>

          {/* TASK STATUS */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-[#3B6A9E]" />
                Status Tugas
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatusBox
                icon={Clock}
                label="Pending"
                value={taskStats.pending}
                color="yellow"
              />
              <StatusBox
                icon={Activity}
                label="Progress"
                value={taskStats.in_progress}
                color="blue"
              />
              <StatusBox
                icon={CheckCircle2}
                label="Success"
                value={taskStats.completed}
                color="green"
              />
              <StatusBox
                icon={XCircle}
                label="Cancelled"
                value={taskStats.cancelled}
                color="red"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT ACTIVITY */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-[#3B6A9E]" />
              Aktivitas Terbaru
            </h2>
          </div>

          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task.id)}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {task.title}
                  </div>
                  <div className="text-xs text-slate-600">
                    Dibuat: {new Date(task.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING EVENTS */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#3B6A9E]" />
              Event Mendatang
            </h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((ev) => {
                const Icon = categoryIcon(ev.metadata?.category);
                return (
                  <div
                    key={ev.id}
                    onClick={() => handleEventClick(ev.id)}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-2xl hover:shadow-md transition-shadow group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {ev.title}
                      </div>
                      <div className="text-xs text-slate-600">
                        {ev.event_date}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-3" />
              <div className="text-sm font-medium">Tidak ada event mendatang</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SHARED COMPONENTS (IDENTIK STYLE VUE)
========================================================= */

function StatCard({
  icon: Icon,
  value,
  label,
  footerLeft,
  footerRight,
}: {
  icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  value: number | string;
  label: string;
  footerLeft: string;
  footerRight: string;
}) { // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/40 hover:shadow-xl hover:scale-[1.02] transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-black">{value}</div>
          <div className="text-xs text-slate-700 font-medium">{label}</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#8FABD4]/30">
        <span className="text-sm text-slate-700">{footerLeft}</span>
        <span className="text-sm font-bold text-[#4A70A9]">{footerRight}</span>
      </div>
    </div>
  );
}

function StatusBox({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string;
  value: number;
  color: "yellow" | "blue" | "green" | "red";
}) {
  const map = {
    yellow: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700",
    blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    green: "from-green-50 to-green-100 border-green-200 text-green-700",
    red: "from-red-50 to-red-100 border-red-200 text-red-700",
  };

  return (
    <div
      className={`p-4 bg-gradient-to-br ${map[color]} rounded-2xl border-2`}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
