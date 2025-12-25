"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Journal } from "../../../../hooks/useJournals";

interface MoodTrendChartProps {
  journals: Journal[];
}

export default function MoodTrendChart({ journals }: MoodTrendChartProps) {
  const data = useMemo(() => {
    // 1. Sort journals by date ascending
    const sorted = [...journals].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // 2. Map mood to value
    const moodValue = (mood: string) => {
      switch (mood) {
        case "happy": return 4;
        case "grateful": return 3;
        case "neutral": return 2;
        case "sad": return 1;
        default: return 2;
      }
    };

    // 3. Take last 14 entries for clearer chart
    const recent = sorted.slice(-14);

    return recent.map((j) => ({
      date: new Date(j.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      value: moodValue(j.mood),
      mood: j.mood,
      title: j.title || "Tanpa judul",
    }));
  }, [journals]);

  if (journals.length < 2) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <p>Butuh minimal 2 jurnal untuk melihat tren.</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 text-xs">
          <p className="font-bold text-slate-700 mb-1">{label}</p>
          <p className="text-slate-600 mb-1">Mood: <span className="font-semibold capitalize">{payload[0].payload.mood}</span></p>
          <p className="text-slate-400 italic max-w-[150px] truncate">{payload[0].payload.title}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b6a9e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b6a9e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 10, fill: '#64748b' }} 
            axisLine={false}
            tickLine={false}
            dy={10}
          />
          <YAxis hide domain={[0, 5]} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#3b6a9e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorMood)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
