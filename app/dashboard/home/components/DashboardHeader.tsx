"use client";

import { motion } from "framer-motion";

interface DashboardHeaderProps {
  currentDateLong: string;
}

export default function DashboardHeader({ currentDateLong }: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-start justify-between mb-4"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 bg-gradient-to-r from-[#3b6a9e] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Siap Produktif? ✨
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            {currentDateLong}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            "Selesaikan tugasmu satu per satu, dan nikmati prosesnya!" 🚀
          </p>
        </div>
      </motion.div>
    </div>
  );
}
