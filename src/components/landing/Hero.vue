<template>
  <section
    ref="heroSection"
    class="relative w-full min-h-screen flex items-center pt-28 pb-20 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- BACKGROUND ABSTRACT SHAPES -->
    <div
      class="absolute -top-20 -left-20 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"
    ></div>

    <div
      class="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- DIAGONAL SPLIT PANEL -->
    <div
      class="absolute inset-0 bg-white/10 backdrop-blur-xl border-y border-white/20 shadow-2xl origin-top-left -skew-y-6"
    ></div>

    <!-- CONTENT -->
    <div
      ref="heroContent"
      class="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-hidden"
    >
      <!-- TEXT SIDE -->
      <div class="flex flex-col gap-8 translate-y-4">
        <!-- Tag -->
        <div
          class="px-5 py-2 w-fit flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
        >
          <Sparkles class="w-4 h-4 stroke-[#2F3A4B]" />
          Productivity Reinvented
        </div>

        <!-- Title -->
        <h1
          class="text-5xl md:text-6xl font-extrabold leading-tight text-[#2F3A4B] drop-shadow-sm"
        >
          Organize Smarter.
          <br />
          <span class="text-[#3B6A9E]">Live Better.</span>
        </h1>

        <p class="text-lg text-[#415167]/80 max-w-md">
          Kelola catatan, jadwal, dan jurnalmu dalam pengalaman yang lebih rapi,
          ekspresif, dan terasa personal. Produktivitas yang akhirnya sejalan
          dengan gayamu.
        </p>

        <!-- BUTTONS -->
        <div class="flex gap-4 mt-2">
          <router-link
            to="/register"
            class="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 inline-block text-center"
          >
            Mulai Sekarang
          </router-link>

          <button
            class="px-8 py-3 bg-white/20 backdrop-blur-xl border border-white/30 text-[#2F3A4B] rounded-2xl font-semibold shadow-sm hover:bg-white/30 transition-all active:scale-95"
          >
            Lihat Fitur
          </button>
        </div>
      </div>

      <!-- IMAGE SIDE -->
      <div class="relative flex items-center justify-center lg:justify-end">
        <!-- Floating Background Panel -->
        <div
          class="absolute -top-12 -left-6 w-72 h-72 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-xl rotate-6"
        ></div>

        <!-- Image Glass Container -->
        <div
          class="relative backdrop-blur-2xl bg-white/15 border border-white/20 shadow-2xl rounded-3xl p-6 lg:p-10 w-full max-w-md transform hover:scale-[1.02] transition-all"
        >
          <img
            src="/assets/hero.webp"
            alt="Jurnify Illustration"
            class="w-full h-auto drop-shadow-2xl select-none floating"
          />
        </div>

        <!-- Soft Accent Shapes -->
        <div
          class="absolute -bottom-4 right-4 w-16 h-16 rounded-full bg-[#C9DAE8]/70 blur-lg opacity-70"
        ></div>
        <div
          class="absolute -top-4 right-16 w-10 h-10 rounded-xl bg-[#AEC7DE] blur-sm opacity-60"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Sparkles } from "lucide-vue-next";

const heroSection = ref(null);
const heroContent = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroContent.value.classList.add("animate-show");
          heroContent.value.classList.remove("animate-hidden");
        } else {
          heroContent.value.classList.add("animate-hidden");
          heroContent.value.classList.remove("animate-show");
        }
      });
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(heroSection.value);
});
</script>

<style scoped>
/* Fade + Soft slide */
.animate-hidden {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-show {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.floating {
  animation: float 4.5s ease-in-out infinite;
}
</style>
