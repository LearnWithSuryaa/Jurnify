<template>
  <section id="fitur" class="relative w-full overflow-hidden pt-30 pb-28">
    <!-- Soft Gradient Separator (antara Hero -> Features) -->
    <div
      class="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- Section Container -->
    <div class="relative max-w-6xl mx-auto px-6">
      <!-- Judul -->
      <h2
        class="text-4xl font-extrabold text-[#3B6A9E] mb-14 text-center tracking-wide"
      >
        Fitur Unggulan
      </h2>

      <!-- Grid Cards -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center"
      >
        <FeatureCard
          title="Journey & Task"
          desc="Buat to-do list personal, catat target harian, dan progress perjalanan finansialmu."
          image="/assets/journey.png"
        />

        <FeatureCard
          title="Event & Pengingat"
          desc="Tambahkan event penting seperti bayar kos, tagihan kuliah, dan reminder kegiatan."
          image="/assets/event.png"
        />

        <FeatureCard
          title="Dashboard Harian"
          desc="Pantau kondisi keuangan harian dalam satu layar dengan data real-time."
          image="/assets/daily.png"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from "../landing/FeatureCard.vue";
</script>

<style scoped>
/* Tambahan vibe nebula lembut */
section {
  background: radial-gradient(
      circle at 60% 20%,
      rgba(185, 211, 245, 0.75),
      transparent 60%
    ),
    radial-gradient(
      circle at 30% 80%,
      rgba(219, 233, 255, 0.55),
      transparent 60%
    ),
    #eef4ff;
}
</style>
