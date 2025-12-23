"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const heroSection = useRef<HTMLElement | null>(null);
  const heroContent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroSection.current || !heroContent.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            heroContent.current?.classList.add("animate-show");
            heroContent.current?.classList.remove("animate-hidden");
          } else {
            heroContent.current?.classList.add("animate-hidden");
            heroContent.current?.classList.remove("animate-show");
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(heroSection.current);

    return () => observer.disconnect();
  }, []);

  const scrollToFeature = () => {
    const section = document.getElementById("fitur");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={heroSection}
      className="relative w-full min-h-screen flex items-center pt-28 pb-20 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
    >
      {/* BACKGROUND SHAPES */}
      <div className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12" />

      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl" />

      {/* DIAGONAL SPLIT PANEL */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border-y border-white/20 shadow-2xl origin-top-left -skew-y-6" />

      {/* CONTENT */}
      <div
        ref={heroContent}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-hidden"
      >
        {/* LEFT TEXT */}
        <div className="flex flex-col gap-8 translate-y-4">
          <div className="px-5 py-2 w-fit flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm">
            <Sparkles className="w-4 h-4 stroke-[#2F3A4B]" />
            Productivity Reinvented
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#2F3A4B] drop-shadow-sm">
            Organize Smarter.<br />
            <span className="text-[#3B6A9E]">Live Better.</span>
          </h1>

          <p className="text-lg text-[#415167]/80 max-w-md">
            Kelola catatan, jadwal, dan jurnalmu dalam pengalaman yang lebih rapi,
            ekspresif, dan terasa personal. Produktivitas yang akhirnya sejalan
            dengan gayamu.
          </p>

          <div className="flex gap-4 mt-2">
            <Link
              href="/login"
              className="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 inline-block text-center cursor-pointer"
            >
              Mulai Sekarang
            </Link>

            <button
              onClick={scrollToFeature}
              className="px-8 py-3 cursor-pointer bg-white/20 backdrop-blur-xl border border-white/30 text-[#2F3A4B] rounded-2xl font-semibold shadow-sm hover:bg-white/30 transition-all active:scale-95"
            >
              Lihat Fitur
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="absolute -top-12 -left-6 w-72 h-72 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl rotate-6" />

          <div className="relative backdrop-blur-2xl bg-white/15 border border-white/20 shadow-2xl rounded-3xl p-6 lg:p-10 w-full max-w-md transform hover:scale-[1.02] transition-all">
            <Image
              src="/hero.webp"
              width={500}
              height={500}
              alt="Jurnify Illustration"
              className="w-full h-auto drop-shadow-2xl select-none floating"
            />
          </div>

          <div className="absolute -bottom-4 right-4 w-16 h-16 rounded-full bg-[#C9DAE8]/70 blur-lg opacity-70" />
          <div className="absolute -top-4 right-16 w-10 h-10 rounded-xl bg-[#AEC7DE] blur-sm opacity-60" />
        </div>
      </div>
    </section>
  );
}
