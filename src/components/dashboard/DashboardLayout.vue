<template>
  <section
    ref="dashboardSection"
    class="relative w-full min-h-screen flex bg-linear-to-br from-[#E6ECF5] via-[#C6D5EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- SIDEBAR -->
    <aside
      :class="[
        'fixed top-4 left-4 h-[calc(100vh-2rem)] z-30 px-6 py-8 bg-white/25 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-3xl flex flex-col transition-all duration-300',
        isCollapsed ? 'w-[82px] items-center px-4' : 'w-[270px]',
      ]"
    >
      <!-- COLLAPSE BUTTON -->
      <button
        @click="toggleSidebar"
        class="absolute -right-3 top-14 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-105 transition-all"
        :class="{ 'rotate-180': isCollapsed }"
      >
        <ChevronLeftIcon class="w-4 h-4 text-[#2F3A4B]" />
      </button>

      <!-- LOGO -->
      <div
        class="mb-8 flex items-center transition-all duration-300"
        :class="isCollapsed ? 'justify-center' : 'gap-3'"
      >
        <img src="/assets/logo.webp" alt="logo" class="w-10 h-10" />
        <h1
          v-if="!isCollapsed"
          class="text-[26px] font-extrabold text-[#233041] tracking-tight"
        >
          Jurnify
        </h1>
      </div>

      <!-- MAIN MENU -->
      <nav
        :class="[
          'flex flex-col gap-2 transition-all',
          isCollapsed && 'items-center',
        ]"
      >
        <button
          v-for="item in mainMenu"
          :key="item.id"
          @click="goTo(item.path)"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold relative border"
          :class="[
            isActive(item.path)
              ? 'bg-[#3B6A9E] text-white shadow-lg border-transparent cursor-default'
              : 'text-[#2F3A4B]/75 border-transparent hover:border-white/40 hover:bg-white/40 hover:shadow-xl active:scale-[0.97]',
            isCollapsed && 'justify-center',
          ]"
        >
          <component :is="item.icon" class="w-6 h-6 transition-all" />
          <span v-if="!isCollapsed">{{ item.label }}</span>

          <!-- Tooltip hanya untuk NON-ACTIVE -->
          <span
            v-if="isCollapsed && !isActive(item.path)"
            class="absolute left-[72px] bg-[#2F3A4B] text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all"
          >
            {{ item.label }}
          </span>
        </button>
      </nav>

      <div class="flex-1"></div>

      <!-- BOTTOM MENU -->
      <nav
        :class="[
          'flex flex-col gap-2 pt-4 border-t border-white/40',
          isCollapsed && 'items-center',
        ]"
      >
        <button
          v-for="item in bottomMenu"
          :key="item.id"
          @click="goTo(item.path)"
          class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold relative border"
          :class="[
            isActive(item.path)
              ? 'bg-[#3B6A9E] text-white shadow-lg border-transparent cursor-default'
              : 'text-[#2F3A4B]/75 border-transparent hover:border-white/40 hover:bg-white/40 hover:shadow-xl active:scale-[0.97]',
            isCollapsed && 'justify-center',
          ]"
        >
          <component :is="item.icon" class="w-6 h-6" />
          <span v-if="!isCollapsed">{{ item.label }}</span>

          <span
            v-if="isCollapsed && !isActive(item.path)"
            class="absolute left-[72px] bg-[#2F3A4B] text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all"
          >
            {{ item.label }}
          </span>
        </button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <div
      :class="[
        'relative z-10 w-full transition-all duration-300',
        isCollapsed ? 'ml-[115px]' : 'ml-[300px]',
      ]"
    >
      <div ref="contentInner" class="px-8 pt-20 pb-16 animate-hidden">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import {
  HomeIcon,
  ClipboardListIcon,
  CalendarIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronLeftIcon,
} from "lucide-vue-next";

/* STATE SIDEBAR */
const isCollapsed = ref(false);
const toggleSidebar = () => (isCollapsed.value = !isCollapsed.value);

/* ROUTING */
const router = useRouter();
const route = useRoute();

const dashboardSection = ref(null);
const contentInner = ref(null);

/* MENU DATA */
const mainMenu = [
  { id: 1, label: "Home", icon: HomeIcon, path: "/dashboard" },
  {
    id: 2,
    label: "Journey",
    icon: ClipboardListIcon,
    path: "/dashboard/journey",
  },
  { id: 3, label: "Events", icon: CalendarIcon, path: "/dashboard/events" },
];

const bottomMenu = [
  {
    id: 4,
    label: "Pengaturan",
    icon: SettingsIcon,
    path: "/dashboard/settings",
  },
  { id: 5, label: "Logout", icon: LogOutIcon, path: "/" },
];

const goTo = (path) => router.push(path);
const isActive = (path) => route.path === path;

/* SCROLL ANIMATION */
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          contentInner.value.classList.add("animate-show");
          contentInner.value.classList.remove("animate-hidden");
        }
      }),
    { threshold: 0.2 }
  );

  observer.observe(contentInner.value);
});
</script>

<style scoped>
/* Fade and soft slide */
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

/* Rotate transition for button */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
