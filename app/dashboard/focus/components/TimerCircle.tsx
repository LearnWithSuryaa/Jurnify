"use client";

import { motion } from "framer-motion";

interface TimerCircleProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  mode: "focus" | "break";
}

export default function TimerCircle({
  progress,
  size = 300,
  strokeWidth = 12,
  mode,
}: TimerCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  const color = mode === "focus" ? "#3b6a9e" : "#10b981"; // Blue for focus, Green for break

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle (Animated) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
