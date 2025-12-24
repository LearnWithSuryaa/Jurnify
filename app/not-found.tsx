"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn } from "lucide-react";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function NotFound() {
  const [targetLink, setTargetLink] = useState("/");
  const [isCheckComplete, setIsCheckComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setIsLoggedIn(true);
          setTargetLink("/dashboard/home");
        } else {
            setIsLoggedIn(false);
            setTargetLink("/");
        }
      } catch (error) {
        console.warn("Auth check failed in 404, defaulting to guest navigation");
      } finally {
        setIsCheckComplete(true);
      }
    };
    checkSession();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col font-sans">
      
      {/* SKY SECTION (Top ~65%) */}
      <div className="absolute inset-x-0 top-0 h-[65%] bg-gradient-to-b from-[#3b6a9e] via-[#8CAACE] to-[#dbeafe] flex items-end justify-center overflow-hidden">
        {/* Cloud Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-soft-light">
           <Image
            src="/assets/cloud.webp"
            alt="Cloud Background"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* 404 Text - Situated on the horizon line */}
        <div className="absolute bottom-[-2%] z-0 select-none pointer-events-none w-full text-center">
            <motion.h1 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[35vw] font-bold text-white/30 leading-none tracking-tighter"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                404
            </motion.h1>
        </div>

        {/* Smooth Horizon Gradient Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-white via-white/60 to-transparent z-10 pointer-events-none" />
      </div>

      {/* GROUND SECTION (Bottom ~35%) */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-white z-10">
           {/* Clean white base */}
      </div>

      {/* COMPOSITION STACK (Spanning Sky & Ground) */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pt-[10vh]">
         
         {/* Jurnio - Standing on the "Ground" 
             Adjust margin-bottom to align feet visually with the white/blue horizon line 
         */}
         <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] mb-6 translate-y-[20px]"
        >
            <Image
                src="/assets/jurnio.webp"
                alt="Jurnio Monster"
                fill
                sizes="(max-width: 768px) 300px, 450px"
                className="object-contain drop-shadow-2xl"
                priority
            />
        </motion.div>

        {/* Typography - On White Ground */}
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-5 px-4 pb-12"
        >
            <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold text-slate-800 tracking-tight">
                    Oops! Tersesat yah?
                </h2>
                <p className="text-slate-500 text-base md:text-xl font-medium max-w-lg mx-auto leading-relaxed">
                   Sepertinya Jurnio membawamu terlalu jauh <br className="hidden md:block"/>
                   dari halaman yang seharusnya.
                </p>
            </div>

            <div className="pt-2">
                <Link 
                    href={targetLink}
                    className="inline-flex items-center justify-center px-10 py-4 bg-[#3b6a9e] text-white rounded-full font-bold text-lg md:text-xl transition-all hover:scale-105 hover:bg-[#2c5280] shadow-xl shadow-blue-900/10 active:scale-95"
                >
                    Ajak Jurnio Pulang!
                </Link>
            </div>
        </motion.div>
      </div>

      {/* Top Left Logo */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 left-8 md:top-12 md:left-12 z-50 flex items-center gap-3"
      >
        <div className="text-white"> 
             <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
             </svg>
        </div>
        <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Jurnify</span>
      </motion.div>

      {/* Top Right Login Button (Only if NOT logged in) */}
      {/* Hide button while checking to prevent flicker, or show skeleton? 
          For "Github-like" clean UX, showing nothing until confirmed is safer than flashing Login.
          Or show it if we assume guest first. 
          Let's verify isCheckComplete to avoid flicker. 
       */}
      {isCheckComplete && !isLoggedIn && (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-8 right-8 md:top-12 md:right-12 z-50"
        >
            <Link
            href="/login"
            className="flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full font-medium transition-all text-sm shadow-sm border border-white/20"
            >
            <LogIn className="w-4 h-4" />
            Login
            </Link>
        </motion.div>
      )}

    </div>
  );
}
