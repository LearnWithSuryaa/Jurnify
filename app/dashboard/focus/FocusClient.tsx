"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Target, Coffee } from "lucide-react";
import TimerCircle from "./components/TimerCircle";
import QuickTasks from "./components/QuickTasks";
import Scratchpad from "./components/Scratchpad";
import TaskSelector from "./components/TaskSelector";
import DailyFocusStats from "./components/DailyFocusStats";
import { useTimer } from "../context/TimerContext";

export default function FocusClient() {
  const { 
    mode, 
    timeLeft, 
    isRunning, 
    totalTime, 
    toggleTimer, 
    resetTimer, 
    switchMode, 
    formatTime,
    selectedTaskId,
    setSelectedTaskId
  } = useTimer();

  const progress = timeLeft / totalTime;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        stiffness: 50,
        damping: 15
      }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="relative w-full min-h-[calc(100vh-6rem)] md:min-h-screen pt-4 pb-12 px-4 md:px-8 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden flex flex-col"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <motion.div variants={itemVariants} className="w-full flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-[#3b6a9e]" />
            Focus Mode
          </h1>
          <p className="text-slate-600 text-sm">
            Central Command
          </p>
        </div>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
        
        {/* LEFT COLUMN: Quick Tasks */}
        <motion.div variants={itemVariants} className="lg:col-span-3 h-full min-h-[300px]">
           <QuickTasks 
             selectedTaskId={selectedTaskId} 
             onSelectTask={setSelectedTaskId} 
           />
        </motion.div>

        {/* CENTER COLUMN: Timer & Controls */}
        <motion.div variants={itemVariants} className="lg:col-span-6 flex flex-col items-center justify-start pt-4">
           {/* Task Selector (Active Context) */}
           <div className="w-full max-w-lg mb-6 z-20">
              <TaskSelector 
                selectedTaskId={selectedTaskId} 
                onSelect={setSelectedTaskId} 
              />
           </div>

           {/* Timer */}
           <div className="relative mb-6 scale-90 md:scale-100">
             <TimerCircle progress={progress} mode={mode} />
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-6xl font-black tabular-nums tracking-tight ${mode === "focus" ? "text-slate-800" : "text-emerald-600 focus-transition"}`}>
                  {formatTime(timeLeft)}
                </span>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-2">
                  {mode === "focus" ? "Fokus" : "Istirahat"}
                </span>
             </div>
           </div>

           {/* Controls */}
           <div className="flex items-center gap-4 mb-8">
             <button
               onClick={toggleTimer}
               className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                 isRunning 
                  ? "bg-amber-100 text-amber-600 hover:bg-amber-200" 
                  : "bg-[#3b6a9e] text-white hover:bg-[#2c527a]"
               }`}
             >
               {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
             </button>

             <button
               onClick={resetTimer}
               className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition-colors"
             >
               <RotateCcw className="w-5 h-5" />
             </button>
           </div>

           {/* Mode Switcher */}
           <div className="flex gap-2 bg-white/50 p-1 rounded-xl mb-6">
              <button 
                onClick={() => switchMode("focus")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${mode === "focus" ? "bg-white shadow-sm text-[#3b6a9e]" : "text-slate-500 hover:bg-white/50"}`}
              >
                <Target className="w-4 h-4" />
                Fokus
              </button>
              <button 
                onClick={() => switchMode("break")}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 ${mode === "break" ? "bg-white shadow-sm text-emerald-600" : "text-slate-500 hover:bg-white/50"}`}
              >
                <Coffee className="w-4 h-4" />
                Istirahat
              </button>
           </div>
           
           {/* Daily Stats */}
           <div className="w-full">
             <DailyFocusStats />
           </div>
        </motion.div>

        {/* RIGHT COLUMN: Scratchpad */}
        <motion.div variants={itemVariants} className="lg:col-span-3 h-full min-h-[300px]">
           <Scratchpad selectedTaskId={selectedTaskId} />
        </motion.div>

      </div>
    </motion.section>
  );
}

