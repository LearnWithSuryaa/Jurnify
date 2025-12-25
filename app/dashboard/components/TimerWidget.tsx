"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTimer } from "../context/TimerContext";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X, Target, MousePointer2 } from "lucide-react";

export default function TimerWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const { timeLeft, isRunning, toggleTimer, formatTime, mode, resetTimer, totalTime } = useTimer();

  // Hide widget if on Focus page
  const isFocusPage = pathname === "/dashboard/focus";

  // Logic: Show if running OR if session is in progress (timeLeft < totalTime)
  const isSessionActive = timeLeft < totalTime || isRunning;
  
  if (isFocusPage || !isSessionActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -50, opacity: 0, scale: 0.9 }}
        drag
        dragConstraints={{ left: 0, top: 0, right: 0, bottom: 500 }}
        className="fixed top-4 right-4 md:right-8 z-50 flex items-center gap-3 bg-white/40 backdrop-blur-xl border border-white/50 p-2 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-move group"
      >
        {/* Icon based on mode */}
        <div 
           onClick={() => router.push("/dashboard/focus")}
           className={`p-2 rounded-xl cursor-pointer transition-colors ${mode === "focus" ? "bg-blue-500/10 text-blue-600" : "bg-emerald-500/10 text-emerald-600"}`}
        >
          <Target className="w-5 h-5" />
        </div>

        {/* Time Display */}
        <div 
          onClick={() => router.push("/dashboard/focus")}
          className="cursor-pointer"
        >
          <p className="text-xs font-medium text-slate-500 uppercase leading-none mb-0.5">
            {mode}
          </p>
          <p className="text-lg font-bold text-slate-800 tabular-nums leading-none">
            {formatTime(timeLeft)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {/* Play/Pause */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTimer();
            }}
            className="w-8 h-8 rounded-full bg-white/50 hover:bg-white text-slate-700 flex items-center justify-center transition-colors shadow-sm"
          >
            {isRunning ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Close (Only if paused) */}
          {!isRunning && (
            <button
               onClick={(e) => {
                  e.stopPropagation();
                  resetTimer();
               }}
               className="w-6 h-6 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-500 flex items-center justify-center transition-colors shadow-sm ml-1"
               title="Akhiri Sesi"
            >
               <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
