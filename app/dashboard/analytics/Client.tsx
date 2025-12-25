"use client";

import { motion } from "framer-motion";
import { BarChart2, TrendingUp, CheckCircle2, MessageSquare } from "lucide-react";
import { useJournals } from "../../../hooks/useJournals";
import { useTasks } from "../../../hooks/useTasks";
import MoodTrendChart from "./components/MoodTrendChart";
import ProductivityChart from "./components/ProductivityChart";

export default function AnalyticsClient() {
  const { journals, isLoading: loadingJournals } = useJournals();
  const { tasks, isLoading: loadingTasks } = useTasks();

  // Basic Stats
  const totalWords = journals.reduce((acc, curr) => acc + (curr.content?.split(/\s+/).length || 0), 0);
  const completionRate = tasks.length > 0 
    ? Math.round((tasks.filter(t => t.status === "completed").length / tasks.length) * 100) 
    : 0;

  const isLoading = loadingJournals || loadingTasks;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden"
    >
      {/* Background Blobs (Different style for analytics) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-100/50 rounded-2xl">
          <BarChart2 className="w-8 h-8 text-[#3b6a9e]" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Analytics
          </h1>
          <p className="text-slate-600 text-sm">
            Wawasan seputar mood dan produktivitas Anda.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Kata Ditulis</p>
            <h3 className="text-2xl font-black text-slate-800">{totalWords.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-green-100 text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Produktifitas Task</p>
            <h3 className="text-2xl font-black text-slate-800">{completionRate}%</h3>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Entri Jurnal</p>
            <h3 className="text-2xl font-black text-slate-800">{journals.length}</h3>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-slate-100"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Tren Perasaan (Mood)</h3>
            <p className="text-xs text-slate-500">Fluktuasi emosi dalam 14 entri terakhir</p>
          </div>
          <MoodTrendChart journals={journals} />
        </motion.div>

        {/* Task Distribution */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-slate-100"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Distribusi Tugas</h3>
            <p className="text-xs text-slate-500">Proporsi status tugas Anda saat ini</p>
          </div>
          <ProductivityChart tasks={tasks} />
        </motion.div>
      </div>
    </motion.section>
  );
}
