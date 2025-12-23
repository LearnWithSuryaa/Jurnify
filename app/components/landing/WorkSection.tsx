"use client";

import { useEffect, useRef, useState } from "react";
import { Settings } from "lucide-react";

const steps = [
  {
    title: "1. Mulai dengan Journey & Task",
    desc: "Buat journey atau task personal untuk mencatat target harian, tujuan jangka panjang, dan progress perjalananmu.",
  },
  {
    title: "2. Tambahkan Event Penting",
    desc: "Masukkan event penting seperti bayar kos, tagihan kuliah, dan kegiatan penting agar semua tersimpan dalam satu tempat.",
  },
  {
    title: "3. Aktifkan Pengingat Otomatis",
    desc: "Jurnify memberi pengingat otomatis untuk setiap event dan aktivitas penting yang kamu jadwalkan.",
  },
  {
    title: "4. Pantau dari Dashboard Harian",
    desc: "Lihat kondisi keuangan harian, aktivitas, dan performa secara real-time.",
  },
  {
    title: "5. Kelola Workspace Sesuai Gayamu",
    desc: "Gunakan halaman, blok, dan folder layaknya buku harian pribadi.",
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting;

          // Animate TITLE
          setTitleVisible(isVisible);

          // Animate each STEP (with stagger)
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisibleSteps((prev) => {
                const next = [...prev];
                next[i] = isVisible;
                return next;
              });
            }, i * 180); // stagger
          });
        });
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Animations (enter + exit)
  const anim = (visible: boolean) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(50px)",
    transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full py-36 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
    >
      {/* Background Shapes */}
      <div className="absolute -top-28 -left-20 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"></div>
      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 flex flex-col gap-20">
        {/* TITLE */}
        <div className="text-center flex flex-col gap-4">
          <span
            style={anim(titleVisible)}
            className="px-5 py-2 w-fit mx-auto flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
          >
            <Settings className="w-4 h-4 stroke-[#2F3A4B]" />
            Cara Kerja
          </span>

          <h2
            style={anim(titleVisible)}
            className="text-4xl md:text-5xl font-extrabold text-[#2F3A4B]"
          >
            Bagaimana Sistem Ini Bekerja
          </h2>

          <p
            style={anim(titleVisible)}
            className="text-[#415167]/80 max-w-2xl mx-auto text-lg"
          >
            Alur kerja yang rapi, intuitif, dan didesain agar kamu memahami
            proses tanpa kebingungan.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative w-full flex flex-col items-center">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-linear-to-b from-[#3B6A9E] via-[#6FA3D1] to-[#B9D3EA] rounded-full opacity-70"></div>

          {steps.map((step, i) => (
            <div
              key={i}
              style={anim(visibleSteps[i])}
              className={`relative w-full flex mb-24 ${
                i % 2 === 0 ? "justify-start pr-[55%]" : "justify-end pl-[55%]"
              }`}
            >
              <div className="relative backdrop-blur-2xl bg-white/20 border border-white/30 shadow-xl rounded-3xl p-6 w-full max-w-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                {/* Dot */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white/60 backdrop-blur-xl rounded-full border border-white shadow-md ${
                    i % 2 === 0 ? "-right-[38px]" : "-left-[38px]"
                  }`}
                />

                <h3 className="text-2xl font-bold text-[#2F3A4B]">
                  {step.title}
                </h3>
                <p className="text-[#415167]/80 mt-2">{step.desc}</p>

                <div
                  className={`absolute w-10 h-10 bg-[#C9DAE8]/70 rounded-xl blur-md opacity-60 ${
                    i % 2 === 0 ? "right-4 bottom-0" : "left-4 bottom-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
