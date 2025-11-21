<template>
  <section
    class="min-h-screen w-full bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] pt-20 pb-32 flex flex-col items-center px-6 relative overflow-hidden"
  >
    <!-- Background Shapes -->
    <div
      class="absolute -top-24 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"
    ></div>

    <div
      class="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- Tag -->
    <div
      class="text-sm px-5 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] font-semibold shadow-sm z-10"
    >
      <Rocket class="inline w-4 h-4 mr-1" />
      We’re Journify & Growing
    </div>

    <!-- Title -->
    <h1
      class="text-4xl md:text-5xl font-extrabold text-center text-[#2F3A4B] leading-snug max-w-4xl mt-6 drop-shadow-sm z-10"
    >
      We’ve got an entire team dedicated to supporting your daily growth
    </h1>

    <!-- Subtitle -->
    <p class="text-[#415167]/80 max-w-3xl text-center mt-4 z-10">
      Journify membantu kamu mencatat lebih konsisten, memantau progress, dan
      mendukung perjalanan produktivitas setiap hari.
    </p>

    <!-- CTA Buttons -->
    <div class="flex gap-4 mt-10 z-10">
      <button
        class="px-8 py-3 bg-white/20 backdrop-blur-xl border border-white/30 text-[#2F3A4B] rounded-2xl font-semibold shadow-md hover:bg-white/30 transition-all active:scale-95 flex items-center gap-2"
      >
        <PlayCircle class="w-4 h-4" />
        View Demo
      </button>

      <button
        class="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
      >
        <ArrowRight class="w-4 h-4" />
        Get Started
      </button>
    </div>

    <!-- TEAM GRID -->
    <div
      class="mt-20 w-full max-w-6xl grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center z-10"
    >
      <div
        v-for="(member, i) in team"
        :key="i"
        class="relative group w-60 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
      >
        <!-- light gradient reflection -->
        <div
          class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-50 transition-all duration-500 pointer-events-none"
        />

        <!-- image -->
        <img :src="member.image" class="w-full h-56 object-cover" />

        <!-- content -->
        <div
          class="px-4 py-4 bg-white/25 backdrop-blur-xl border-t border-white/20"
        >
          <h3 class="font-semibold text-[#2F3A4B] text-sm leading-tight">
            {{ member.name }}
          </h3>
          <p class="text-xs text-[#415167]/70">
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Rocket, PlayCircle } from "lucide-vue-next";

const team = [
  {
    name: "Richard Mills",
    role: "Progress Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
  },
  {
    name: "Viola Bassett",
    role: "Customer Success Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600",
  },
  {
    name: "Sophie Chamberlain",
    role: "Tracking Analyst",
    image: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=600",
  },
  {
    name: "Muhammad Surya",
    role: "Fullstack Developer",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600",
  },
];
</script>
