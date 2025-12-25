"use client";

import { useTimer } from "../../context/TimerContext";
import { CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function DailyFocusStats() {
  const { sessionsCompleted, totalFocusTime } = useTimer();

  return (
    <div className="flex gap-4 w-full max-w-lg justify-center mt-12 mb-6 mx-auto">
      {/* Sessions Count */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex-1 bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-sm flex flex-col items-center gap-2 group hover:bg-white/80 transition-colors"
      >
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="text-center">
            <span className="block text-2xl font-bold text-slate-800 tabular-nums">
                {sessionsCompleted}
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Sesi Selesai
            </span>
        </div>
      </motion.div>

      {/* Focus Time */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex-1 bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-sm flex flex-col items-center gap-2 group hover:bg-white/80 transition-colors"
      >
        <div className="p-3 rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
          <Clock className="w-6 h-6" />
        </div>
        <div className="text-center">
            <span className="block text-2xl font-bold text-slate-800 tabular-nums">
                {totalFocusTime}
            </span>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Menit Fokus
            </span>
        </div>
      </motion.div>
    </div>
  );
}
