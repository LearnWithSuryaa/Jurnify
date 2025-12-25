"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Task } from "../../../../hooks/useTasks";

interface ProductivityChartProps {
  tasks: Task[];
}

export default function ProductivityChart({ tasks }: ProductivityChartProps) {
  const data = useMemo(() => {
    const counts = {
      completed: tasks.filter((t) => t.status === "completed").length,
      in_progress: tasks.filter((t) => t.status === "in_progress").length,
      pending: tasks.filter((t) => t.status === "pending").length,
      cancelled: tasks.filter((t) => t.status === "cancelled").length,
    };

    return [
      { name: "Success", value: counts.completed, color: "#4ade80" },   // Green
      { name: "Progress", value: counts.in_progress, color: "#60a5fa" }, // Blue
      { name: "Pending", value: counts.pending, color: "#facc15" },     // Yellow
      { name: "Cancelled", value: counts.cancelled, color: "#f87171" }, // Red
    ].filter((item) => item.value > 0);
  }, [tasks]);

  if (tasks.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <p>Belum ada data task.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            itemStyle={{ color: '#334155', fontWeight: 600, fontSize: '12px' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-xs text-slate-600 font-medium ml-1">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
