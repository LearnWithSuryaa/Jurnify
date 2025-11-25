<template>
  <section
    id="why"
    ref="whySection"
    class="relative w-full py-32 bg-linear-to-br from-[#EDF3FA] via-[#D6E3F1] to-[#AFC9E3] overflow-hidden"
  >
    <!-- BACKGROUND SHAPES (SELALU TAMPIL, TANPA ANIMASI) -->
    <div
      class="absolute -top-28 -left-28 w-[420px] h-[420px] bg-white/30 rounded-3xl blur-[90px] rotate-12"
    ></div>

    <div
      class="absolute -bottom-20 -right-16 w-[340px] h-[340px] bg-[#C8D8EB]/40 rounded-full blur-[110px]"
    ></div>

    <!-- CONTENT YANG DI-ANIMASI -->
    <div
      :class="isVisible ? 'animate-show' : 'animate-hide'"
      class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12"
    >
      <!-- HEADER -->
      <div class="text-center mb-20">
        <span
          class="px-5 py-2 w-fit mx-auto flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
        >
          <Lightbulb class="w-4 h-4 stroke-[#2F3A4B]" />
          Mengapa Memilih Kami?
        </span>

        <h2
          class="mt-6 text-4xl md:text-5xl font-extrabold text-[#2F3A4B] tracking-tight"
        >
          Semua yang Kamu Butuhkan
          <span class="text-[#3B6A9E]">Dalam Satu Tempat</span>
        </h2>

        <p
          class="text-[#415167]/75 max-w-2xl mx-auto mt-4 text-lg leading-relaxed"
        >
          Dirancang dengan kenyamanan & estetika modern. Satu platform untuk
          seluruh kebutuhan produktivitas kamu.
        </p>
      </div>

      <!-- DRAGGABLE BENTO GRID -->
      <draggable
        v-model="cards"
        item-key="id"
        animation="260"
        ghost-class="opacity-40"
        handle=".drag-handle"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[280px]"
      >
        <template #item="{ element }">
          <div
            :class="[
              'relative group p-8 rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:scale-[1.015] transition-all duration-300 overflow-hidden',
              element.large ? 'col-span-1 lg:col-span-2' : '',
            ]"
          >
            <!-- DRAG HANDLE -->
            <div
              class="drag-handle absolute top-4 left-4 flex flex-col gap-[3px] opacity-40 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            >
              <span class="flex gap-[3px]">
                <span class="w-1.5 h-1.5 bg-[#2F3A4B]/30 rounded-sm"></span>
                <span class="w-1.5 h-1.5 bg-[#2F3A4B]/30 rounded-sm"></span>
              </span>
              <span class="flex gap-[3px]">
                <span class="w-1.5 h-1.5 bg-[#2F3A4B]/30 rounded-sm"></span>
                <span class="w-1.5 h-1.5 bg-[#2F3A4B]/30 rounded-sm"></span>
              </span>
            </div>

            <!-- Accent Shape -->
            <div
              v-if="element.accent"
              class="absolute"
              :class="element.accent"
            ></div>

            <h3
              class="text-xl md:text-2xl font-bold text-[#2F3A4B] mb-3 leading-tight"
            >
              {{ element.title }}
            </h3>

            <p class="text-[#415167]/80 leading-relaxed">
              {{ element.desc }}
            </p>
          </div>
        </template>
      </draggable>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Lightbulb } from "lucide-vue-next";
import draggable from "vuedraggable";

const cards = ref([
  {
    id: 1,
    large: true,
    title: "Desain Elegan & Bersih",
    desc: "Dibangun dengan fokus pada kenyamanan mata, konsistensi warna, dan struktur visual yang rapi.",
    accent:
      "-top-6 -right-10 w-32 h-32 bg-[#AEC7DE]/40 blur-2xl rounded-full opacity-70 group-hover:opacity-90 transition-all absolute",
  },
  {
    id: 2,
    title: "Super Ringan",
    desc: "Cepat dan responsif bahkan di perangkat berspesifikasi rendah.",
    accent:
      "top-2 right-3 w-16 h-16 bg-[#C9DAE8]/60 blur-xl rounded-full absolute",
  },
  {
    id: 3,
    title: "Terintegrasi Cerdas",
    desc: "Workflow mulus dan tidak perlu berpindah manual.",
    accent:
      "bottom-0 right-0 w-20 h-20 bg-[#AEC7DE]/50 blur-xl rounded-full absolute",
  },
  {
    id: 4,
    title: "Keamanan Prioritas",
    desc: "Menggunakan enkripsi modern untuk data pengguna.",
    accent:
      "bottom-3 right-3 w-12 h-12 bg-[#AEC7DE]/60 blur-lg rounded-full absolute",
  },
  {
    id: 5,
    title: "Support Maksimal",
    desc: "Tim support selalu siap membantu.",
    accent:
      "bottom-3 right-3 w-12 h-12 bg-[#AEC7DE]/60 blur-lg rounded-full absolute",
  },
]);

const whySection = ref(null);
const isVisible = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    { threshold: 0.25 }
  );

  if (whySection.value) observer.observe(whySection.value);
});

onBeforeUnmount(() => {
  if (observer && whySection.value) observer.unobserve(whySection.value);
});
</script>

<style scoped>
/* ANIMASI MASUK */
@keyframes fadeUpIn {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ANIMASI KELUAR */
@keyframes fadeUpOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(30px) scale(0.98);
  }
}

/* STATE */
.animate-show {
  animation: fadeUpIn 0.8s ease-out forwards;
}

.animate-hide {
  animation: fadeUpOut 0.6s ease-out forwards;
}

/* Drag hint */
@keyframes subtleWiggle {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

.drag-hint {
  animation: subtleWiggle 1.8s ease-in-out infinite;
}
.drag-hint:hover {
  animation: none;
}
</style>
