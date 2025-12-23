"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("jurnify-cookie-consent");
    if (!consent) {
      // Delay sedikit agar animasinya smooth saat load
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("jurnify-cookie-consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[100] flex justify-center px-4 animate-show">
      <div className="w-full max-w-6xl bg-white/40 backdrop-blur-xl border border-white/50 p-4 md:p-5 rounded-[2rem] shadow-[0_8px_32px_rgba(31,38,135,0.15)] overflow-hidden relative group">
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/60 rounded-2xl flex items-center justify-center shrink-0 border border-white/60 shadow-sm hidden md:flex">
            <Cookie className="w-6 h-6 text-[#3B6A9E]" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              <span className="font-bold text-slate-900 block md:inline md:mr-2">Cookies, but good ones! 🍪</span>
              Supaya pengalaman pakai Jurnify makin mulus dan personal, kami butuh izin pakai cookies nih. Aman, data kamu prioritas kami!
            </p>
          </div>
          
          <button
            onClick={handleAccept}
            className="px-8 py-3 bg-[#3B6A9E] hover:bg-[#2f5680] text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-95 w-full md:w-auto md:min-w-[140px] cursor-pointer"
          >
            Oke, Paham
          </button>
        </div>
      </div>
    </div>
  );
}
