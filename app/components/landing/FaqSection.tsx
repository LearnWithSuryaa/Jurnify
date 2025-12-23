"use client";

import { useEffect, useRef, useState } from "react";

const faqItems = [
  {
    q: "Apa itu Jurnify?",
    a: "Jurnify adalah aplikasi workspace personal yang membantu kamu mengatur catatan, proyek, task, dan alur kerja dalam satu tempat. Dirancang sebagai alternatif ringan seperti Notion namun dengan pengalaman yang lebih fokus, intuitif, dan cepat.",
  },
  {
    q: "Bagaimana Jurnify menyimpan data saya?",
    a: "Jurnify menggunakan Supabase untuk menyimpan data. Supabase menyediakan database PostgreSQL yang aman dan modern dengan autentikasi bawaan. Semua data disimpan secara terstruktur dan hanya dapat diakses oleh akun kamu sendiri.",
  },
  {
    q: "Apakah aplikasi ini gratis?",
    a: "Ya. Selama masa pengembangan (Early Access), Jurnify 100% gratis untuk semua pengguna tanpa batasan fitur. Setelah versi stabil dirilis, fitur dasar akan tetap gratis selamanya.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Ya, data Anda aman. Supabase menerapkan enkripsi, autentikasi aman, serta kontrol akses berbasis peran untuk melindungi setiap permintaan data. Selain itu, Jurnify hanya menggunakan data sesuai kebutuhan fungsi aplikasi dan tidak menyimpan, membaca, atau membagikannya ke pihak mana pun tanpa persetujuan Anda.",
  },
  {
    q: "Apakah Jurnify akan memiliki aplikasi mobile?",
    a: "Iya. Saat ini versi mobile sedang dirancang. Setelah fitur inti stabil, aplikasi untuk iOS dan Android akan memasuki tahap pengembangan.",
  },
  {
    q: "Bagaimana jika saya menemukan bug atau ingin memberikan masukan?",
    a: "Kamu bisa menghubungi tim melalui halaman feedback atau Discord komunitas. Semua masukan sangat membantu karena Jurnify sedang aktif dikembangkan.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // const contentRefs = useRef<(HTMLDivElement | null)[]>([]); // Removed unused ref

  const faqRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = faqRef.current;
    if (!section) return;

    const titles = Array.from(
      section.querySelectorAll(".faq-title-anim")
    ) as HTMLElement[];

    const cards = Array.from(
      section.querySelectorAll(".faq-card-anim")
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Title stagger
            titles.forEach((el, idx) => {
              setTimeout(() => el.classList.add("in-view"), idx * 120);
            });

            // FAQ card stagger
            cards.forEach((el, idx) => {
              setTimeout(() => el.classList.add("in-view"), idx * 120);
            });
          } else {
            titles.forEach((el) => el.classList.remove("in-view"));
            cards.forEach((el) => el.classList.remove("in-view"));
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={faqRef}
      id="faq"
      className="relative w-full py-32 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
    >
      {/* Floating Shapes */}
      <div className="absolute -top-24 left-10 w-[300px] h-[300px] bg-white/30 backdrop-blur-xl rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-10 w-[260px] h-[260px] bg-white/20 rounded-full blur-[90px] opacity-50"></div>

      {/* Title */}
      <div className="relative z-10 text-center mb-20 max-w-xl mx-auto flex flex-col gap-3">
        <h2 className="faq-title-anim text-4xl font-bold text-slate-800 tracking-tight">
          Kenali Jurnify Lebih Dalam
        </h2>
        <p className="faq-title-anim text-slate-600 text-lg leading-relaxed">
          Kumpulan pertanyaan yang sering ditanyakan oleh para pengguna awal.
        </p>
      </div>

      {/* FAQ List */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 px-6">
        {faqItems.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      onClick={onToggle}
      className="faq-card-anim glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-slate-800 font-semibold text-lg tracking-tight">
          {item.q}
        </h3>

        <svg
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="22"
          height="22"
          fill="none"
          stroke="#1a2b3c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Answer */}
      <div
        style={{
          height: `${height}px`,
        }}
        className="overflow-hidden transition-[height] duration-300 ease"
      >
        <div ref={contentRef} className="pt-4 text-slate-700 leading-relaxed">
          {item.a}
        </div>
      </div>
    </div>
  );
}

