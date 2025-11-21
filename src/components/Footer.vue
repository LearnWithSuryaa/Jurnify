<!-- Footer.vue -->
<template>
  <transition name="footer-fade">
    <footer
      v-if="atBottom"
      class="footer-wrap fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[min(900px,92%)]"
    >
      <div
        class="footer-inner flex items-center justify-between py-4 px-8 rounded-[36px]"
      >
        <!-- Brand -->
        <span class="footer-text font-semibold">Journify</span>

        <!-- Navigation -->
        <nav class="flex items-center gap-6 text-sm font-medium text-gray-600">
          <router-link
            to="/"
            @click="scrollHome"
            class="hover:text-black transition"
          >
            Home
          </router-link>
          <router-link to="/about" class="hover:text-black transition"
            >About</router-link
          >
          <a href="#" class="hover:text-black transition">Contact</a>
        </nav>

        <!-- Year & tagline -->
        <span class="footer-text">
          © {{ year }} <span class="px-5">#CatatAjaDulu</span>
        </span>
      </div>
    </footer>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const year = new Date().getFullYear();
const atBottom = ref(false);

const checkScroll = () => {
  const scrollTop = window.scrollY;
  const viewportHeight = window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  atBottom.value = scrollTop + viewportHeight >= pageHeight - 5;
};

const scrollHome = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  checkScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.footer-wrap {
  pointer-events: auto;
}

.footer-inner {
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(22px) saturate(180%);
  -webkit-backdrop-filter: blur(22px) saturate(180%);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08), 0 18px 38px rgba(0, 0, 0, 0.12);
}

.footer-text {
  font-size: 15px;
  font-weight: 500;
  color: rgba(70, 70, 70, 0.55);
  transition: color 180ms ease;
}

.footer-text:hover {
  color: rgba(60, 60, 60, 0.75);
}

/* ============================
   TRANSITION ANIMATION
============================ */
.footer-fade-enter-active,
.footer-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.footer-fade-enter-from,
.footer-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.footer-fade-enter-to,
.footer-fade-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
