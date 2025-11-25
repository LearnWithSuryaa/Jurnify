<template>
  <section
    id="faq"
    class="relative w-full py-32 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- Floating BG Shapes -->
    <div
      class="absolute -top-24 left-10 w-[300px] h-[300px] bg-white/30 backdrop-blur-xl rounded-full blur-3xl opacity-40"
    ></div>
    <div
      class="absolute bottom-0 right-10 w-[260px] h-[260px] bg-white/20 rounded-full blur-[90px] opacity-50"
    ></div>

    <!-- Title -->
    <div
      class="relative z-10 text-center mb-20 max-w-xl mx-auto flex flex-col gap-3"
    >
      <h2
        class="section-title-item-faq text-4xl font-bold text-slate-800 tracking-tight opacity-0 translate-y-4"
      >
        Kenali Jurnify Lebih Dalam
      </h2>

      <p
        class="section-title-item-faq text-slate-600 text-lg leading-relaxed opacity-0 translate-y-4"
      >
        Kumpulan pertanyaan yang sering ditanyakan oleh para pengguna awal.
      </p>
    </div>

    <!-- FAQ List -->
    <div class="relative z-10 max-w-3xl mx-auto flex flex-col gap-6 px-6">
      <div
        v-for="(item, i) in faqItems"
        :key="i"
        class="faq-card-item faq-card glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 opacity-0 translate-y-6"
        @click="toggle(i)"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-slate-800 font-semibold text-lg tracking-tight">
            {{ item.q }}
          </h3>

          <!-- Chevron -->
          <svg
            :class="[
              'transition-transform duration-300',
              { 'rotate-180': openIndex === i },
            ]"
            width="22"
            height="22"
            fill="none"
            stroke="#1a2b3c"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>

        <!-- Answer -->
        <div
          ref="answers"
          class="overflow-hidden transition-[height] duration-300 ease"
          :style="{
            height: openIndex === i ? contentHeights[i] + 'px' : '0px',
          }"
        >
          <p class="text-slate-700 mt-4 leading-relaxed">
            {{ item.a }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { animate, stagger } from "motion";

const openIndex = ref(null);
const contentHeights = ref([]);
const answers = ref([]);

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

let observer = null;

onMounted(() => {
  // Hitung tinggi konten untuk animasi expand FAQ
  nextTick(() => {
    contentHeights.value = answers.value.map((el) => el.scrollHeight);
  });

  // Intersection Animation
  const section = document.getElementById("faq");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const titles = document.querySelectorAll(".section-title-item-faq");
        const faqCards = document.querySelectorAll(".faq-card-item");

        if (entry.isIntersecting) {
          // TITLE IN
          animate(
            titles,
            { opacity: [0, 1], y: [20, 0] },
            { delay: stagger(0.1), duration: 0.6, easing: "ease-out" }
          );

          // CARD IN
          animate(
            faqCards,
            { opacity: [0, 1], y: [20, 0] },
            { delay: stagger(0.12), duration: 0.7, easing: "ease-out" }
          );
        } else {
          // TITLE OUT
          animate(
            titles,
            { opacity: [1, 0], y: [0, 20] },
            { delay: stagger(0.1), duration: 0.5, easing: "ease-in" }
          );

          // CARD OUT
          animate(
            faqCards,
            { opacity: [1, 0], y: [0, 20] },
            { delay: stagger(0.1), duration: 0.5, easing: "ease-in" }
          );
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "-10% 0px -10% 0px",
    }
  );

  observer.observe(section);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>

<style scoped>
.faq-card-item {
  opacity: 0;
  transform: translateY(20px);
}

.section-title-item-faq {
  opacity: 0;
  transform: translateY(20px);
}

.glass-card {
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(18px);
  box-shadow: 0 8px 28px rgba(30, 60, 90, 0.12),
    0 4px 14px rgba(30, 60, 90, 0.08);
}
</style>
