<template>
  <div
    class="relative w-full h-screen overflow-hidden bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4]"
  >
    <!-- FLOATING SHAPES BACKGROUND -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-24 w-64 h-64 bg-white/20 rounded-3xl blur-3xl animate-float-slow"></div>
      <div class="absolute bottom-32 right-20 w-72 h-72 bg-white/10 rounded-full blur-2xl animate-float"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-[#ffffff30] rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div class="relative flex h-full w-full">
      <!-- SIDEBAR -->
      <aside
        class="z-20 w-72 h-full bg-white/20 border-r border-white/30 backdrop-blur-2xl shadow-2xl flex flex-col p-6 rounded-r-3xl animate-slide-left"
      >
        <h1
          class="text-2xl font-bold text-[#2F3A4B] mb-10 tracking-wide drop-shadow-sm"
        >
          Jurnify
        </h1>

        <!-- UPDATED MENU -->
        <nav class="flex flex-col gap-2 text-[#2F3A4B]">
          <RouterLink
            v-for="item in menu"
            :key="item.to"
            :to="item.to"
            class="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all backdrop-blur-xl border border-white/10 bg-white/10 hover:bg-white/20 hover:border-white/30"
            :class="{
              'bg-white/25 border-white/40 shadow-md':
                $route.path.startsWith(item.to),
            }"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 opacity-70 group-hover:opacity-100 transition"
            />
            <span class="font-medium">{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- LOGOUT -->
        <div class="mt-auto">
          <button
            @click="logout"
            class="w-full px-4 py-3 bg-white/20 border border-white/20 rounded-xl backdrop-blur-lg shadow hover:bg-white/30 text-[#2F3A4B] transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      <!-- MAIN CONTENT -->
      <main
        class="flex-1 h-full relative p-10 overflow-y-auto animate-fade-up"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter, useRoute } from "vue-router";
import { supabase } from "../../lib/supabase";

import {
  Home,
  MapPinned,
  CalendarClock,
  Settings,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

/* Updated Menu sesuai fitur */
const menu = [
  { label: "Home", to: "/dashboard", icon: Home },
  {
    label: "Journey & Tasks",
    to: "/page/JourneyPage",
    icon: MapPinned,
  },
  {
    label: "Events & Pengingat",
    to: "/dashboard/events",
    icon: CalendarClock,
  },
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: Settings,
  },
];

async function logout() {
  await supabase.auth.signOut();
  router.push("/");
}
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-slow {
  animation: float 10s ease-in-out infinite;
}
.animate-slide-left {
  animation: slide-left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.animate-fade-up {
  animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
@keyframes slide-left {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
