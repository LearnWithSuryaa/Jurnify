"use client";

import { AlertCircle, ChevronRight, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

interface Task {
    id: string;
    title: string;
    due_date: string;
    [key: string]: any;
}

interface UrgentTasksProps {
  urgentTasks: Task[];
  handleTaskClick: (taskId: string) => void;
  diffDaysLocal: (a: any, b: any) => number;
}

export default function UrgentTasks({
  urgentTasks,
  handleTaskClick,
  diffDaysLocal,
}: UrgentTasksProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          Tugas Mendesak
        </h2>
        <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">
          {urgentTasks.length} Tugas
        </span>
      </div>

      {urgentTasks.length > 0 ? (
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {urgentTasks.map((task, idx) => (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * idx }}
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
              className="group p-4 bg-rose-50 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-md hover:bg-rose-100/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span className={`text-xs font-bold ${
                      diffDaysLocal(task.due_date, new Date()) < 0 
                      ? "text-rose-700 underline decoration-rose-400" 
                      : "text-rose-600"
                    }`}>
                      {(() => {
                          const diff = diffDaysLocal(task.due_date, new Date());
                          if (diff < 0) return `Telat ${Math.abs(diff)} hari`;
                          if (diff === 0) return "Hari ini banget!";
                          return `Kurang ${diff} hari`;
                      })()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-relaxed">
                    {task.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 shadow-sm">
                    <ChevronRight className="w-4 h-4 text-rose-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-slate-50 rounded-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-slate-900 font-bold mb-1">Aman, nggak ada deadline mepet! 🎉</div>
          <div className="text-xs text-slate-500">Kamu bisa chill atau lanjutin pending task lainnya.</div>
        </div>
      )}
    </motion.div>
  );
}
