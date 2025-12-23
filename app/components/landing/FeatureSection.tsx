"use client";

import { useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";

export default function FeatureSection() {
  const featureSection = useRef<HTMLElement | null>(null);
  const featureTitle = useRef<HTMLHeadingElement | null>(null);
  const featureGrid = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = [featureTitle.current, featureGrid.current];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-show");
            entry.target.classList.remove("animate-hidden");
          } else {
            entry.target.classList.add("animate-hidden");
            entry.target.classList.remove("animate-show");
          }
        });
      },
      { threshold: 0.35 }
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="fitur"
      ref={featureSection}
      className="relative w-full overflow-hidden pt-30 pb-28 bg-[#EEF4FF]"
    >
      {/* ABSTRACT BACKGROUND */}
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"></div>
      <div className="absolute bottom-10 right-0 w-[380px] h-[380px] bg-[#C1D4EA]/30 rounded-full blur-3xl"></div>

      {/* STRUCTURE */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        {/* TITLE */}
        <h2
          ref={featureTitle}
          className="text-4xl font-extrabold text-[#3B6A9E] mb-14 text-center tracking-wide animate-hidden"
        >
          Fitur Unggulan
        </h2>

        {/* GRID CARDS */}
        <div
          ref={featureGrid}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center animate-hidden"
        >
          <FeatureCard
            title="Journey & Task"
            desc="Buat to-do list personal, catat target harian, dan progress perjalanan finansialmu."
            image="/journey.webp"
          />

          <FeatureCard
            title="Event & Pengingat"
            desc="Tambah event penting seperti bayar kos, tagihan kuliah, dan reminder kegiatan."
            image="/event.webp"
          />

          <FeatureCard
            title="Dashboard Harian"
            desc="Pantau kondisi keuangan harian dalam satu layar dengan data real-time."
            image="/daily.webp"
          />
        </div>
      </div>
    </section>
  );
}
