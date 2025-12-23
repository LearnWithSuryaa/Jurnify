import Image from "next/image";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";
import Footer from "../components/common/Footer";

// Data anggota tim — dapat di-fetch via server actions/API bila perlu
const team = [
  {
    name: "Zaskia Ramadhani",
    role: "Copywriter",
    image: "",
  },
  {
    name: "Vanisa Putri",
    role: "Content Creator",
    image: "",
  },
  {
    name: "Apunk Febri",
    role: "Interviewer Preparation",
    image: "/assets/apunk.webp",
  },
  {
    name: "Muhammad Surya",
    role: "Full-Stack Engineer | UI/UX Designer",
    image: "/assets/surya.webp",
  },
];

export const metadata = {
  title: "About — Journify",
  description:
    "Kami memiliki tim yang berdedikasi untuk mendukung perkembangan produktivitasmu setiap hari.",
};

export default function AboutPage() {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] pt-20 pb-32 flex flex-col items-center px-6 relative overflow-hidden">

      {/* Background Shapes */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12" />
      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl" />

      {/* Tag */}
      <div className="text-sm px-5 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] font-semibold shadow-sm z-10">
        <Rocket className="inline w-4 h-4 mr-1" />
        We’re Journify & Growing
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#2F3A4B] leading-snug max-w-4xl mt-6 drop-shadow-sm z-10">
        We’ve got an entire team dedicated to supporting your daily growth
      </h1>

      {/* Subtitle */}
      <p className="text-[#415167]/80 max-w-3xl text-center mt-4 z-10">
        Journify membantu kamu mencatat lebih konsisten, memantau progress,
        dan mendukung perjalanan produktivitas setiap hari.
      </p>

      {/* CTA */}
      <div className="flex gap-4 mt-10 z-10">
        <Link href="/login">
          <button className="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
            <ArrowRight className="w-4 h-4" />
            Get Started
          </button>
        </Link>
      </div>

      {/* TEAM GRID */}
      <div className="mt-20 w-full max-w-6xl grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center z-10">
        {team.map((member, index) => (
          <div
            key={index}
            className="relative group w-60 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Light gradient reflection */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-50 transition-all duration-500 pointer-events-none" />

            {/* Image */}
            <Image
              src={member.image}
              alt={member.name}
              width={240}
              height={240}
              className="w-full h-56 object-cover"
            />

            {/* Content */}
            <div className="px-4 py-4 bg-white/25 backdrop-blur-xl border-t border-white/20">
              <h3 className="font-semibold text-[#2F3A4B] text-sm leading-tight">
                {member.name}
              </h3>
              <p className="text-xs text-[#415167]/70">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </section>
  );
}
