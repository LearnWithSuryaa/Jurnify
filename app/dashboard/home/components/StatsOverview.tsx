"use client";

import { Activity, Calendar, CheckCircle2, Target } from "lucide-react";
import { motion } from "framer-motion";

interface StatsOverviewProps {
  totalTasks: number;
  completionRate: number;
  taskStats: {
    pending: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
  todayEventsCount: number;
}

export default function StatsOverview({
  totalTasks,
  completionRate,
  taskStats,
  todayEventsCount,
}: StatsOverviewProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <motion.div variants={item}>
        <StatCard
          icon={Target}
          value={totalTasks}
          label="Total Tasks"
          footerLeft="Progress"
          footerRight={`${completionRate}%`}
          color="indigo"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          icon={Activity}
          value={taskStats.in_progress}
          label="In Progress"
          footerLeft="Status"
          footerRight="Active"
          color="blue"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          icon={CheckCircle2}
          value={taskStats.completed}
          label="Completed"
          footerLeft="Success Rate"
          footerRight={`${completionRate}%`}
          color="green"
        />
      </motion.div>
      <motion.div variants={item}>
        <StatCard
          icon={Calendar}
          value={todayEventsCount}
          label="Events Today"
          footerLeft="Schedule"
          footerRight="Today"
          color="orange"
        />
      </motion.div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  footerLeft,
  footerRight,
  color,
}: {
  icon: any;
  value: number | string;
  label: string;
  footerLeft: string;
  footerRight: string;
  color: "indigo" | "blue" | "green" | "orange";
}) {
  const colorStyles = {
    indigo: {
      bg: "bg-gradient-to-br from-indigo-50 to-indigo-100/80",
      icon: "bg-gradient-to-br from-[#3b6a9e] to-indigo-600",
      text: "text-[#3b6a9e]",
      border: "border-indigo-200/60",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/80",
      icon: "bg-gradient-to-br from-blue-500 to-cyan-500",
      text: "text-blue-600",
      border: "border-blue-200/60",
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-50 to-teal-100/80",
      icon: "bg-gradient-to-br from-emerald-500 to-teal-500",
      text: "text-emerald-600",
      border: "border-emerald-200/60",
    },
    orange: {
      bg: "bg-gradient-to-br from-amber-50 to-orange-100/80",
      icon: "bg-gradient-to-br from-amber-500 to-orange-500",
      text: "text-amber-600",
      border: "border-amber-200/60",
    },
  };

  const style = colorStyles[color];

  return (
    <div className={`relative overflow-hidden bg-white p-6 rounded-[2rem] shadow-sm border-2 ${style.border} hover:shadow-md hover:-translate-y-1 transition-all duration-300 group`}>
      <div className={`absolute top-0 right-0 w-24 h-24 ${style.bg} rounded-bl-[4rem] -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${style.icon} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{label}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xs font-medium text-slate-500">{footerLeft}</span>
          <span className={`text-sm font-bold ${style.text}`}>{footerRight}</span>
        </div>
      </div>
    </div>
  );
}
