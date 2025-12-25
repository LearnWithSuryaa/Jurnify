"use client";

import { useTasks } from "../../../../hooks/useTasks";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

interface QuickTasksProps {
  onSelectTask: (taskId: string) => void;
  selectedTaskId: string | null;
}

export default function QuickTasks({ onSelectTask, selectedTaskId }: QuickTasksProps) {
  const { tasks, isLoading } = useTasks();

  // Filter pending/in_progress tasks
  const activeTasks = tasks.filter(
    (t) => t.status === "pending" || t.status === "in_progress"
  ).slice(0, 5); // Limit to 5 for "quick" view

  return (
    <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/40 p-6 flex flex-col shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5 text-blue-500" />
        Quick Tasks
      </h3>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar px-2 -mx-2">
        {isLoading ? (
          <div className="space-y-3">
             {[1,2,3].map(i => (
               <div key={i} className="h-12 bg-white/50 rounded-xl animate-pulse" />
             ))}
          </div>
        ) : activeTasks.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-10">
            Tidak ada tugas pending. <br/> Great job! 🎉
          </div>
        ) : (
          activeTasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTask(task.id)}
              className={`
                group p-3 rounded-xl border cursor-pointer transition-all duration-200
                ${selectedTaskId === task.id 
                  ? "bg-blue-50 border-blue-200 shadow-sm" 
                  : "bg-white/60 border-white/50 hover:bg-white hover:border-blue-100"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 ${selectedTaskId === task.id ? "text-blue-500" : "text-slate-400"}`}>
                   {selectedTaskId === task.id ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </div>
                <div>
                   <h4 className={`text-sm font-semibold line-clamp-1 ${selectedTaskId === task.id ? "text-blue-700" : "text-slate-700"}`}>
                     {task.title}
                   </h4>
                   <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                     {task.description || "Tanpa deskripsi"}
                   </p>
                </div>
                
                {selectedTaskId !== task.id && (
                  <ArrowRight className="w-4 h-4 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
