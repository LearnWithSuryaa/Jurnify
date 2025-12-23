"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar as CalendarIcon,
  Timer,
  UserRound,
  Pin,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { createSupabaseClient } from "../../../lib/supabaseClient";
import MonthYearPickerModal from "./components/MonthYearPickerModal";
import EventFormModal, { Event } from "./components/EventFormModal";
import EventDetailModal from "./components/EventDetailModal";
import { useEvents } from "../../../hooks/useEvents";

// Icons Helper
const CategoryIcon = ({
  category,
  className,
}: {
  category?: string;
  className?: string;
}) => {
  const icons: Record<string, React.ElementType> = {
    meeting: CalendarIcon,
    deadline: Timer,
    personal: UserRound,
  };
  const Icon = icons[category || ""] || Pin;
  return <Icon className={className} />;
};

export default function EventsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseClient();

  // STATE
  const { events, mutate } = useEvents();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // MODALS
  const [showMonthYearModal, setShowMonthYearModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // SELECTION
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editInitialData, setEditInitialData] = useState<Partial<Event> | null>(
    null
  );

  // FETCH EVENTS

  // Deep Link
  useEffect(() => {
    const openId = searchParams.get("open");
    if (openId && events.length > 0) {
      const ev = events.find((e) => e.id === openId);
      if (ev) {
        setSelectedEvent(ev);
        setShowDetailModal(true);
      }
    }
  }, [searchParams, events]);

  // COMPUTED
  const monthName = useMemo(() => {
    return new Date(0, currentMonth).toLocaleString("id-ID", { month: "long" });
  }, [currentMonth]);

  const daysGrid = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDay = firstDay.getDay(); // 0 = Sun
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const days = [];

    // Prev Month Padding
    for (let i = 0; i < startDay; i++) {
      days.push({
        date: new Date(currentYear, currentMonth, i - startDay + 1),
        isCurrentMonth: false,
      });
    }

    // Current Month
    for (let d = 1; d <= lastDate; d++) {
      days.push({
        date: new Date(currentYear, currentMonth, d),
        isCurrentMonth: true,
      });
    }

    // Next Month Padding (Grid 6x7 = 42)
    while (days.length < 42) {
      days.push({
        date: new Date(
          currentYear,
          currentMonth + 1,
          days.length - startDay - lastDate + 1
        ),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentYear, currentMonth]);

  const normalizeDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getEventsForDay = (date: Date) => {
    const dateStr = normalizeDate(date);
    return events.filter((e) => e.event_date === dateStr);
  };

  const eventsThisMonth = useMemo(() => {
    return events.filter((e) => {
      const d = new Date(e.event_date + "T00:00:00");
      return (
        d.getMonth() === currentMonth && d.getFullYear() === currentYear
      );
    }).length;
  }, [events, currentMonth, currentYear]);

  const summaryByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    events.forEach((e) => {
      const d = new Date(e.event_date + "T00:00:00");
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        const c = e.metadata?.category || "uncategorized";
        map[c] = (map[c] || 0) + 1;
      }
    });
    return map;
  }, [events, currentMonth, currentYear]);

  // HANDLERS
  const handleSaveEvent = async (eventData: Partial<Event>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user || !selectedDate) return;

    try {
      const payload = {
        title: eventData.title,
        description: eventData.description,
        event_date: normalizeDate(selectedDate),
        user_id: user.id,
        metadata: eventData.metadata,
      };

      if (eventData.id) {
        // Update
        const { error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", eventData.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("events").insert(payload);
        if (error) throw error;
      }

      await mutate();
      setShowFormModal(false);
      setIsEditMode(false);
      setEditInitialData(null);
    } catch (error) {
      console.error("Save event error:", error);
      alert("Gagal menyimpan event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Hapus event ini?")) return;
    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      await mutate();
      setShowDetailModal(false);
    } catch (error) {
      console.error("Delete event error:", error);
      alert("Gagal menghapus event");
    }
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedEvent(null);
    router.replace("/dashboard/event", { scroll: false });
  };

  const openDay = (day: { date: Date; isCurrentMonth: boolean }) => {
    setSelectedDate(day.date);
    const dayEvents = getEventsForDay(day.date);

    // If events exist, open detail (or list logic if simplified)
    // Here we replicate the Vue logic: if events exist, show a "List + Add" modal?
    // The design shows a combined modal. For simplicity in this port, we will reuse EventFormModal
    // but we might need a "DayDetailModal" if we strictly follow Vue.
    // However, the provided Vue code shows a 'showModal' which handles both list and form.
    // Let's stick to: Click day -> Open Form Modal (Add New) for now, or List if strictly needed.
    // *Correction*: The Vue code has a list of existing events inside the 'showModal' when adding.
    // To keep it simple for this step: Click Day -> Open Form Modal.
    // If we want to view existing events, we click the *event pill* on the calendar.
    
    // Logic: Click empty space in day -> Add New
    setIsEditMode(false);
    setEditInitialData(null);
    setShowFormModal(true);
  };

  const openEventPill = (e: React.MouseEvent, ev: Event) => {
    e.stopPropagation();
    setSelectedEvent(ev);
    setShowDetailModal(true);
  };

  // HELPERS UI
  const tagColor = (category?: string) => {
    const colors: Record<string, string> = {
      meeting: "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white",
      deadline: "bg-gradient-to-r from-red-600 to-red-400 text-white",
      personal: "bg-gradient-to-r from-green-600 to-green-400 text-white",
    };
    return colors[category || ""] || "bg-slate-100 text-slate-700";
  };
  
  const categoryDotColor = (c: string) => {
    const colors: Record<string, string> = {
      meeting: "bg-[#3B6A9E]",
      deadline: "bg-red-500",
      personal: "bg-green-500",
    };
    return colors[c] || "bg-slate-400";
  };

  // Nav
  const changeMonth = (delta: number) => {
    let m = currentMonth + delta;
    let y = currentYear;
    if (m > 11) {
      m = 0;
      y++;
    } else if (m < 0) {
      m = 11;
      y--;
    }
    setCurrentMonth(m);
    setCurrentYear(y);
  };

  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Calendar
          </h1>
          <p className="text-slate-600 text-sm">
            Kelola event Anda berdasarkan tanggal tertentu
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md">
          <button
            onClick={() => {
              const now = new Date();
              setCurrentMonth(now.getMonth());
              setCurrentYear(now.getFullYear());
            }}
            className="text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
          >
            Today
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMonthYearModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition border border-slate-200"
            >
              <CalendarIcon className="w-5 h-5 text-slate-700" />
              <span className="text-sm font-medium">
                {monthName} {currentYear}
              </span>
            </button>
          </div>

          <div className="flex items-center bg-white rounded-xl shadow-sm px-2 py-1">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 rounded-md hover:bg-slate-50 transition"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 rounded-md hover:bg-slate-50 transition"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-3 rounded-2xl shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-700">Events this month:</div>
          <div className="text-sm font-semibold text-slate-900">
            {eventsThisMonth}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {Object.entries(summaryByCategory).map(([cat, count]) => (
            <div
              key={cat}
              className="text-xs px-2 py-1 rounded-full flex items-center gap-2 bg-white shadow-sm"
            >
              <span
                className={`w-2 h-2 rounded-full ${categoryDotColor(cat)}`}
              ></span>
              <span className="font-medium capitalize">{cat}</span>
              <span className="text-slate-600">({count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* WEEK DAYS */}
      <div className="grid grid-cols-7 text-center text-xs md:text-sm font-semibold text-slate-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-3">
        {daysGrid.map((day, idx) => {
          const isToday =
            day.date.toDateString() === new Date().toDateString();
          const dayEvents = getEventsForDay(day.date);

          return (
            <div
              key={idx}
              onClick={() => openDay(day)}
              className={`
                rounded-2xl h-32 p-3 border transition cursor-pointer group bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg hover:scale-[1.01] flex flex-col
                ${
                  !day.isCurrentMonth
                    ? "opacity-60 border-transparent"
                    : isToday
                    ? "border-[#3B6A9E] ring-1 ring-[#3B6A9E]/30"
                    : "border-gray-200"
                }
              `}
            >
              {/* DATE HEADER */}
              <div className="flex justify-between items-start">
                <span
                  className={`text-sm font-semibold ${
                    isToday
                      ? "text-white bg-[#3B6A9E] px-2 py-1 rounded-lg"
                      : "text-slate-700"
                  }`}
                >
                  {day.date.getDate()}
                </span>

                {dayEvents.length > 0 && (
                  <span
                    className={`text-[11px] px-2 py-1 rounded-md font-semibold truncate ${
                      dayEvents.length > 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {dayEvents.length}
                  </span>
                )}
              </div>

              {/* EVENTS LIST */}
              <div className="mt-2 space-y-1 overflow-y-auto custom-scrollbar">
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={(e) => openEventPill(e, ev)}
                    className={`text-[11px] px-2 py-1 rounded-xl font-medium truncate flex items-center gap-2 cursor-pointer ${tagColor(
                      ev.metadata?.category
                    )}`}
                  >
                    <CategoryIcon
                      category={ev.metadata?.category}
                      className="w-3 h-3 opacity-90"
                    />
                    <span className="truncate">{ev.title}</span>
                  </div>
                ))}
                
                {dayEvents.length === 0 && (
                    <div className="text-[11px] px-2 py-1 rounded-xl text-slate-400 italic">
                        No events
                    </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALS */}
      <MonthYearPickerModal
        isOpen={showMonthYearModal}
        onClose={() => setShowMonthYearModal(false)}
        currentMonth={currentMonth}
        currentYear={currentYear}
        onSelectMonth={(m) => {
          setCurrentMonth(m);
          setShowMonthYearModal(false);
        }}
        onYearChange={(delta) => setCurrentYear((y) => y + delta)}
      />

      <EventFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        selectedDate={selectedDate}
        initialData={editInitialData}
        isEditMode={isEditMode}
        onSave={handleSaveEvent}
      />



      <EventDetailModal
        isOpen={showDetailModal}
        onClose={closeDetailModal}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        onEdit={(ev) => {
          setEditInitialData(ev);
          setIsEditMode(true);
          setSelectedDate(new Date(ev.event_date + "T00:00:00"));
          setShowDetailModal(false);
          // Wait for modal transition
          setTimeout(() => setShowFormModal(true), 200);
        }}
      />
    </section>
  );
}
