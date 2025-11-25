<template>
  <section
    id="fitur"
    ref="featureSection"
    class="relative w-full overflow-hidden pt-30 pb-28 bg-[#EEF4FF]"
  >
    <!-- ABSTRACT BACKGROUND -->
    <div
      class="absolute -top-32 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"
    ></div>

    <div
      class="absolute bottom-10 right-0 w-[380px] h-[380px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- STRUCTURE -->
    <div class="relative max-w-7xl mx-auto px-6 lg:px-12">
      <!-- TITLE -->
      <h2
        class="text-4xl font-extrabold text-[#3B6A9E] mb-14 text-center tracking-wide animate-hidden"
        ref="featureTitle"
      >
        Fitur Unggulan
      </h2>

      <!-- GRID CARDS -->
      <div
        ref="featureGrid"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center animate-hidden"
      >
        <FeatureCard
          title="Journey & Task"
          desc="Buat to-do list personal, catat target harian, dan progress perjalanan finansialmu."
          image="/assets/journey.webp"
        />

        <FeatureCard
          title="Event & Pengingat"
          desc="Tambahkan event penting seperti bayar kos, tagihan kuliah, dan reminder kegiatan."
          image="/assets/event.webp"
        />

        <FeatureCard
          title="Dashboard Harian"
          desc="Pantau kondisi keuangan harian dalam satu layar dengan data real-time."
          image="/assets/daily.webp"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FeatureCard from "../landing/FeatureCard.vue";

const featureSection = ref(null);
const featureTitle = ref(null);
const featureGrid = ref(null);

onMounted(() => {
  const elements = [featureTitle.value, featureGrid.value];

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

  elements.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
/* Nebula background */
section {
  background: radial-gradient(
      circle at 65% 20%,
      rgba(185, 211, 245, 0.75),
      transparent 60%
    ),
    radial-gradient(
      circle at 25% 85%,
      rgba(219, 233, 255, 0.55),
      transparent 60%
    ),
    #eef4ff;
}

/* Fade-in + smooth translate */
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
</style>
