"use client";

import { Clock, Activity, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskStatusGridProps {
  taskStats: {
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
}

export default function TaskStatusGrid({ taskStats }: TaskStatusGridProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          Status Tugas
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusBox
          icon={Clock}
          label="Pending"
          value={taskStats.pending}
          color="yellow"
          delay={0.1}
        />
        <StatusBox
          icon={Activity}
          label="Progress"
          value={taskStats.in_progress}
          color="blue"
          delay={0.2}
        />
        <StatusBox
          icon={CheckCircle2}
          label="Success"
          value={taskStats.completed}
          color="green"
          delay={0.3}
        />
        <StatusBox
          icon={XCircle}
          label="Cancelled"
          value={taskStats.cancelled}
          color="red"
          delay={0.4}
        />
      </div>
    </motion.div>
  );
}

function StatusBox({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: number;
  color: "yellow" | "blue" | "green" | "red";
  delay: number;
}) {
  const map = {
    yellow: "from-amber-100 to-orange-100 border-amber-200 text-amber-700 bg-gradient-to-br",
    blue: "from-blue-100 to-cyan-100 border-blue-200 text-blue-700 bg-gradient-to-br",
    green: "from-emerald-100 to-teal-100 border-emerald-200 text-emerald-700 bg-gradient-to-br",
    red: "from-rose-100 to-pink-100 border-rose-200 text-rose-700 bg-gradient-to-br",
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4 + delay }}
      className={`p-5 ${map[color]} rounded-2xl border-2 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Icon className="w-5 h-5 opacity-80" />
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</span>
      </div>
      <div className="text-4xl font-extrabold">{value}</div>
    </motion.div>
  );
}
