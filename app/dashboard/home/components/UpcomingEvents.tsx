"use client";

import { Calendar, ArrowRight, Pin, Timer, UserRound } from "lucide-react";
import { motion } from "framer-motion";

interface UpcomingEventsProps {
  upcomingEvents: any[];
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

export default function UpcomingEvents({ upcomingEvents, handleEventClick }: UpcomingEventsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-500" />
          Event Mendatang
        </h2>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="space-y-3">
          {upcomingEvents.map((ev, idx) => {
            const Icon = categoryIcon(ev.metadata?.category);
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (idx * 0.1) }}
                key={ev.id}
                onClick={() => handleEventClick(ev.id)}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50/50 to-transparent rounded-2xl border border-blue-50 hover:border-blue-100 hover:shadow-md transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {ev.title}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {ev.event_date}
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2 group-hover:translate-x-0 shadow-sm">
                    <ArrowRight className="w-4 h-4 text-indigo-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-300" />
          <div className="text-sm font-medium">Tidak ada event mendatang</div>
          <div className="text-xs mt-1">Jadwalmu kosong melompong!</div>
        </div>
      )}
    </motion.div>
  );
}
