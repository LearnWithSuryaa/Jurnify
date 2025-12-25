"use client";

import { CheckCircle2, ChevronDown, ListTodo } from "lucide-react";
import { useState } from "react";
import { useTasks, Task } from "../../../../hooks/useTasks";
import { motion, AnimatePresence } from "framer-motion";

interface TaskSelectorProps {
  selectedTaskId: string | null;
  onSelect: (taskId: string | null) => void;
}

export default function TaskSelector({ selectedTaskId, onSelect }: TaskSelectorProps) {
  const { tasks } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  // Filter tasks: only pending or in_progress
  const activeTasks = tasks.filter((t) => ["pending", "in_progress"].includes(t.status));
  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <div className="relative w-full max-w-md mx-auto z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/50 backdrop-blur-sm border border-white/60 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className={`p-2 rounded-xl transition-colors ${selectedTask ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
            {selectedTask ? <CheckCircle2 className="w-5 h-5" /> : <ListTodo className="w-5 h-5" />}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 font-medium mb-0.5">
              {selectedTask ? "Sedang Mengerjakan" : "Pilih Tugas"}
            </p>
            <p className={`font-bold truncate ${selectedTask ? "text-slate-800" : "text-slate-400"}`}>
              {selectedTask ? selectedTask.title : "Tidak ada tugas dipilih"}
            </p>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-20 max-h-60 overflow-y-auto custom-scrollbar"
            >
              <div className="p-2 space-y-1">
                <button
                  onClick={() => {
                    onSelect(null);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-3 ${!selectedTaskId ? "bg-slate-50" : ""}`}
                >
                   <div className="p-1.5 rounded-lg bg-slate-100 text-slate-400">
                     <ListTodo className="w-4 h-4" />
                   </div>
                   <span className="text-sm font-medium text-slate-600">Free Mode (Tanpa Tugas)</span>
                </button>

                {activeTasks.length > 0 ? (
                  activeTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => {
                        onSelect(task.id);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-3 group/item ${selectedTaskId === task.id ? "bg-blue-50" : ""}`}
                    >
                      <div className={`p-1.5 rounded-lg ${task.status === "in_progress" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${selectedTaskId === task.id ? "text-blue-700" : "text-slate-700"}`}>
                          {task.title}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                   <div className="px-4 py-8 text-center text-slate-400 text-sm">
                     Tidak ada tugas pending.
                   </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
