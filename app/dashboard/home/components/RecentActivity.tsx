"use client";

import { TrendingUp, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface RecentActivityProps {
  recentTasks: any[];
  handleTaskClick: (taskId: string) => void;
}

export default function RecentActivity({ recentTasks, handleTaskClick }: RecentActivityProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          Aktivitas Terbaru
        </h2>
      </div>

      <div className="space-y-3">
        {recentTasks.map((task, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + (idx * 0.1) }}
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md hover:border-slate-200 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">
               {task.title.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-slate-900 truncate">
                {task.title}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Dibuat: {new Date(task.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </motion.div>
        ))}
        
        {recentTasks.length === 0 && (
           <div className="text-center py-8 text-slate-400">
               Belum ada aktivitas
           </div>
        )}
      </div>
    </motion.div>
  );
}
