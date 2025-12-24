"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../../../hooks/useTasks";
import { useEvents } from "../../../hooks/useEvents";
import HomeSkeleton from "./components/HomeSkeleton";

// New Components
import DashboardHeader from "./components/DashboardHeader";
import StatsOverview from "./components/StatsOverview";
import CalendarWidget from "./components/CalendarWidget";
import UrgentTasks from "./components/UrgentTasks";
import TaskStatusGrid from "./components/TaskStatusGrid";
import RecentActivity from "./components/RecentActivity";
import UpcomingEvents from "./components/UpcomingEvents";

/* =========================================================
   TYPE DEFINITIONS
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
   DATE UTILITIES
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
   PAGE COMPONENT
   ========================================================= */

export default function DashboardHome() {
  const router = useRouter();
  
  // Data Fetching
  const { tasks: tasksData, isLoading: tasksLoading } = useTasks();
  const { events: eventsData, isLoading: eventsLoading } = useEvents();

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
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/50 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/60 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3b6a9e]/20 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[90px] mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <DashboardHeader currentDateLong={currentDateLong} />

      <StatsOverview
        totalTasks={totalTasks}
        completionRate={completionRate}
        taskStats={taskStats}
        todayEventsCount={todayEvents.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CalendarWidget
          monthName={monthName}
          weekDays={weekDays}
          calendarDays={calendarDays}
          isToday={isToday}
          hasEvents={hasEvents}
          todayEvents={todayEvents}
          handleEventClick={handleEventClick}
        />

        <div className="lg:col-span-2 space-y-6">
          <UrgentTasks
            urgentTasks={urgentTasks}
            handleTaskClick={handleTaskClick}
            diffDaysLocal={diffDaysLocal}
          />

          <TaskStatusGrid taskStats={taskStats} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity
          recentTasks={recentTasks}
          handleTaskClick={handleTaskClick}
        />
        <UpcomingEvents
          upcomingEvents={upcomingEvents}
          handleEventClick={handleEventClick}
        />
      </div>
    </section>
  );
}
