<template>
  <section
    id="work"
    class="relative w-full py-36 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- BACKGROUND ABSTRACT SHAPES -->
    <div
      class="absolute -top-28 -left-20 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"
    ></div>
    <div
      class="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- CONTENT WRAPPER -->
    <div
      class="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 flex flex-col gap-20"
    >
      <!-- TITLE -->
      <div class="text-center flex flex-col gap-4">
        <span
          ref="badge"
          class="section-title-item px-5 py-2 w-fit mx-auto flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
          :style="titleStyle"
        >
          <Settings class="w-4 h-4 stroke-[#2F3A4B]" />
          Cara Kerja
        </span>

        <h2
          ref="title"
          class="section-title-item text-4xl md:text-5xl font-extrabold text-[#2F3A4B] drop-shadow-sm"
          :style="titleStyle"
        >
          Bagaimana Sistem Ini Bekerja
        </h2>

        <p
          ref="description"
          class="section-title-item text-[#415167]/80 max-w-2xl mx-auto text-lg"
          :style="titleStyle"
        >
          Alur kerja yang rapi, intuitif, dan didesain agar kamu memahami proses
          tanpa kebingungan.
        </p>
      </div>

      <!-- VERTICAL TIMELINE -->
      <div class="relative w-full flex flex-col items-center">
        <!-- Center Vertical Line -->
        <div
          class="absolute top-0 h-full w-1 bg-linear-to-b from-[#3B6A9E] via-[#6FA3D1] to-[#B9D3EA] rounded-full opacity-70"
        ></div>

        <!-- STEP ITEM -->
        <div
          v-for="(step, i) in steps"
          :key="i"
          class="relative w-full flex mb-24 step-item"
          :class="
            i % 2 === 0 ? 'justify-start pr-[55%]' : 'justify-end pl-[55%]'
          "
          :style="getStepStyle(i)"
        >
          <div
            class="relative backdrop-blur-2xl bg-white/20 border border-white/30 shadow-xl rounded-3xl p-6 w-full max-w-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <!-- Dot -->
            <div
              class="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white/60 backdrop-blur-xl rounded-full border border-white shadow-md"
              :class="i % 2 === 0 ? '-right-[38px]' : '-left-[38px]'"
            ></div>

            <h3 class="text-2xl font-bold text-[#2F3A4B]">{{ step.title }}</h3>
            <p class="text-[#415167]/80 mt-2 text-base leading-relaxed">
              {{ step.desc }}
            </p>

            <div
              class="absolute w-10 h-10 bg-[#C9DAE8]/70 rounded-xl blur-md opacity-60"
              :class="i % 2 === 0 ? 'right-4 bottom-0' : 'left-4 bottom-0'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Settings } from "lucide-vue-next";

const steps = [
  {
    title: "1. Mulai dengan Journey & Task",
    desc: "Buat journey atau task personal untuk mencatat target harian, tujuan jangka panjang, dan progress perjalananmu.",
  },
  {
    title: "2. Tambahkan Event Penting",
    desc: "Masukkan event seperti bayar kos, tagihan kuliah, dan kegiatan penting agar semua tersimpan dalam satu tempat.",
  },
  {
    title: "3. Aktifkan Pengingat Otomatis",
    desc: "Jurnify akan memberi pengingat otomatis untuk setiap event dan aktivitas penting yang kamu jadwalkan.",
  },
  {
    title: "4. Pantau dari Dashboard Harian",
    desc: "Lihat kondisi keuangan harian, aktivitas, dan performa secara real-time dalam dashboard yang rapi dan bersih.",
  },
  {
    title: "5. Kelola Workspace Sesuai Gayamu",
    desc: "Gunakan halaman, blok, dan folder layaknya buku harian pribadi untuk menyusun informasi secara fleksibel dan personal.",
  },
];

const isVisible = ref(false);
const titleStyle = ref({
  opacity: 0,
  transform: "translateY(20px)",
  transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
});

const stepStyles = ref(
  steps.map(() => ({
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
  }))
);

let observer = null;

const getStepStyle = (index) => {
  return stepStyles.value[index];
};

onMounted(() => {
  const section = document.getElementById("work");

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;

          // Animate title
          setTimeout(() => {
            titleStyle.value = {
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            };
          }, 100);

          // Animate steps with stagger
          steps.forEach((_, i) => {
            setTimeout(() => {
              stepStyles.value[i] = {
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
              };
            }, 300 + i * 150);
          });
        } else {
          isVisible.value = false;

          // Reset title
          titleStyle.value = {
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.5s ease-in, transform 0.5s ease-in",
          };

          // Reset steps
          steps.forEach((_, i) => {
            setTimeout(() => {
              stepStyles.value[i] = {
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.5s ease-in, transform 0.5s ease-in",
              };
            }, i * 100);
          });
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
</script>

<style scoped>
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
