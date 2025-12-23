"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

export default function WhySection() {
  type WhyItem = {
    id: number;
    title: string;
    desc: string;
  };

  const cards = [
    {
      id: 1,
      large: true,
      title: "Desain Elegan & Bersih",
      desc: "Dirancang dengan estetika modern yang menenangkan, memadukan warna lembut, tipografi rapi, serta hierarki visual yang konsisten untuk menciptakan pengalaman antarmuka yang indah, nyaman, dan mudah dipahami sejak pertama kali digunakan.",
      accent:
        "-top-6 -right-10 w-32 h-32 bg-[#AEC7DE]/40 blur-2xl rounded-full opacity-70 group-hover:opacity-90 transition-all absolute",
    },
    {
      id: 2,
      title: "Super Ringan",
      desc: "Dikembangkan dengan performa sebagai prioritas utama, memastikan aplikasi tetap cepat, responsif, dan stabil bahkan pada perangkat dengan spesifikasi rendah tanpa lag, tanpa delay, hanya pengalaman yang mulus.",
      accent:
        "top-2 right-3 w-16 h-16 bg-[#C9DAE8]/60 blur-xl rounded-full absolute",
    },
    {
      id: 3,
      title: "Terintegrasi Cerdas",
      desc: "Seluruh fitur saling terhubung secara otomatis sehingga alur kerja terasa natural dan efisien. Tidak perlu berpindah menu atau melakukan langkah manual yang rumit—semua terjadi secara pintar di belakang layar.",
      accent:
        "bottom-0 right-0 w-20 h-20 bg-[#AEC7DE]/50 blur-xl rounded-full absolute",
    },
    {
      id: 4,
      title: "Keamanan Prioritas",
      desc: "Setiap data pengguna dilindungi menggunakan standar enkripsi modern dan praktik keamanan terkini, memastikan privasi tetap terjaga dan semua aktivitas berlangsung dengan aman tanpa kompromi.",
      accent:
        "bottom-3 right-3 w-12 h-12 bg-[#AEC7DE]/60 blur-lg rounded-full absolute",
    },
    {
      id: 5,
      title: "Support Maksimal",
      desc: "Tim support responsif yang selalu siap membantu kapan pun dibutuhkan baik untuk panduan penggunaan, pemecahan masalah, maupun konsultasi fitur agar pengalaman kamu selalu optimal.",
      accent:
        "bottom-3 right-3 w-12 h-12 bg-[#AEC7DE]/60 blur-lg rounded-full absolute",
    },
    {
      id: 6,
      title: "Selalu Berkembang",
      desc: "Aplikasi ini terus berkembang mengikuti kebutuhan pengguna dengan update rutin yang tidak hanya menambah fitur, tetapi juga meningkatkan stabilitas, keamanan, dan pengalaman penggunaan.",
      accent:
        "-bottom-4 right-6 w-20 h-20 bg-[#B9D4EA]/60 blur-xl rounded-full absolute",
    },
  ];

  const [selected, setSelected] = useState<WhyItem | null>(null);

  return (
    <section
      id="why"
      className="relative w-full py-32 bg-linear-to-br from-[#EDF3FA] via-[#D6E3F1] to-[#AFC9E3] overflow-hidden"
    >
      {/* background shapes */}
      <div className="absolute -top-28 -left-28 w-[420px] h-[420px] bg-white/30 rounded-3xl blur-[90px]" />
      <div className="absolute -bottom-20 -right-16 w-[340px] h-[340px] bg-[#C8D8EB]/40 rounded-full blur-[110px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <span className="px-5 py-2 w-fit mx-auto flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm">
            <Lightbulb className="w-4 h-4" />
            Mengapa Memilih Kami?
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#2F3A4B]">
            Semua yang Kamu Butuhkan{" "}
            <span className="text-[#3B6A9E]">Dalam Satu Tempat</span>
          </h2>
        </div>

        {/* >>> ANIMATED GRID <<< */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i * 0.12,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.04,
                rotate: card.id % 2 === 0 ? 1 : -1,
                transition: { duration: 0.2 },
              }}
              onClick={() => setSelected(card)}
              className="cursor-pointer bg-white/50 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-md hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold mb-3 text-[#2F3A4B]">
                {card.title}
              </h3>
              <p className="text-[#415167]/80 line-clamp-3">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* MODAL DETAIL */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white/60 max-w-lg w-[90%] rounded-2xl p-8 shadow-xl border border-white/40 relative"
              >
                <button
                  className="absolute top-3 right-3 bg-white/60 p-2 rounded-full"
                  onClick={() => setSelected(null)}
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-bold mb-4">{selected.title}</h3>
                <p className="text-[#415167]/85">{selected.desc}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
