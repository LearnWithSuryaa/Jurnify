"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { createSupabaseClient } from "../../../lib/supabaseClient";

type Mode = "focus" | "break";

interface TimerContextType {
  mode: Mode;
  timeLeft: number;
  isRunning: boolean;
  totalTime: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  switchMode: (mode: Mode) => void;
  formatTime: (seconds: number) => string;
  sessionsCompleted: number;
  totalFocusTime: number;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

const FOCUS_TIME = 25 * 60; // 25 mins
const BREAK_TIME = 5 * 60;  // 5 mins

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0); // in minutes
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createSupabaseClient();

  // Fetch today's stats on mount
  useEffect(() => {
    fetchTodayStats();
  }, []);

  const fetchTodayStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data, error } = await supabase
        .from("focus_logs")
        .select("duration")
        .eq("user_id", user.id)
        .gte("completed_at", today.toISOString());

      if (error) {
        console.error("Error fetching stats:", error.message || error);
        return;
      }

      const count = data?.length || 0;
      const totalMinutes = data?.reduce((acc, curr) => acc + curr.duration, 0) || 0;

      setSessionsCompleted(count);
      setTotalFocusTime(totalMinutes);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const persistSession = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const duration = Math.floor(FOCUS_TIME / 60); // 25 mins

      const { error } = await supabase.from("focus_logs").insert({
        user_id: user.id,
        task_id: selectedTaskId || null,
        duration: duration,
        completed_at: new Date().toISOString()
      });

      if (error) throw error;
      
      // refetch to ensure sync
      fetchTodayStats();

    } catch (err) {
      console.error("Failed to persist session:", err);
      // Fallback local update if network fails (optional, but good UX)
      setSessionsCompleted(p => p + 1);
      setTotalFocusTime(p => p + 25);
    }
  };

  const totalTime = mode === "focus" ? FOCUS_TIME : BREAK_TIME;

  const playSound = () => {
    const audio = new Audio("/music/announce.mp3");
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      playSound();
      
      if (mode === "focus") {
        persistSession(); // Persist to DB
        setMode("break");
        setTimeLeft(BREAK_TIME);
      } else {
        setMode("focus");
        setTimeLeft(FOCUS_TIME);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider
      value={{
        mode,
        timeLeft,
        isRunning,
        totalTime,
        toggleTimer,
        resetTimer,
        switchMode,
        formatTime,
        sessionsCompleted,
        totalFocusTime,
        selectedTaskId,
        setSelectedTaskId,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
