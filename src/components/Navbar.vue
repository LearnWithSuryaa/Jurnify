<template>
  <header
    class="spotlight-wrap fixed top-10 left-1/2 -translate-x-1/2 z-9999 w-[min(900px,92%)]"
    role="banner"
  >
    <nav class="relative flex items-center justify-start px-3 py-3 h-[68px]">
      <!-- LEFT: Spotlight-style search pill -->
      <div
        class="left-pill flex items-center gap-3 pl-5 pr-6 h-[50px] rounded-[14px] min-w-[360px] max-w-[680px] mr-5"
        role="search"
      >
        <span class="label-text" :class="{ muted: !anyIconHover }">
          {{ currentLabel }}
        </span>
      </div>

      <!-- RIGHT ICONS -->
      <ul class="icons-list flex items-center gap-2 pr-1">
        <li v-for="item in links" :key="item.label">
          <button
            class="icon-btn"
            @mouseenter="onIconEnter(item.label)"
            @mouseleave="onIconLeave"
            @focus="onIconEnter(item.label)"
            @blur="onIconLeave"
            @click="(e) => smoothScroll(e, item.href)"
            type="button"
            :aria-label="item.label"
          >
            <div class="icon-inner">
              <component :is="item.icon" class="icon-svg" />
            </div>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import {
  HelpCircle,
  LayoutDashboard,
  FileQuestion,
  Workflow,
} from "lucide-vue-next";

/* NAV ITEMS */
const links = [
  { label: "Fitur", href: "#fitur", icon: LayoutDashboard },
  { label: "Mengapa Kami?", href: "#why", icon: HelpCircle },
  { label: "Cara Kerja", href: "#work", icon: Workflow },
  { label: "FAQ", href: "#faq", icon: FileQuestion },
];

const DEFAULT_LABEL = "Journify #CatatAjaDulu";
const currentLabel = ref(DEFAULT_LABEL);
const anyIconHover = ref(false);

function onIconEnter(label) {
  currentLabel.value = label;
  anyIconHover.value = true;
}
function onIconLeave() {
  currentLabel.value = DEFAULT_LABEL;
  anyIconHover.value = false;
}

function smoothScroll(e, href) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
/* ===============================
   ROOT NAV WRAPPER
================================= */
.spotlight-nav {
  pointer-events: auto;
  border-radius: 36px;

  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.55);

  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05), 0 18px 38px rgba(0, 0, 0, 0.1);

  transition: transform 200ms ease, box-shadow 180ms ease;
}

.spotlight-nav.is-hovered {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08), 0 28px 65px rgba(0, 0, 0, 0.14);
}

/* ===============================
   NAV INTERNAL PADDING FIX
================================= */
.spotlight-wrap nav {
  padding-left: 12px !important;
  padding-right: 12px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ===============================
   SPOTLIGHT SEARCH PILL (FIXED)
================================= */
.left-pill {
  flex: 1; /* ☆ pusatkan auto-flex */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 10px 18px;
  height: 50px;
  border-radius: 30px;

  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.6);

  box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.7),
    0 6px 18px rgba(0, 0, 0, 0.08);

  min-width: 0; /* ☆ hilangkan pemaksaan lebar */
}

/* Label mirip gaya Apple */
.label-text {
  font-size: 24px;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.38);
  transition: color 180ms ease;
}

.label-text:not(.muted) {
  color: rgba(80, 80, 80, 0.6);
}

/* ===============================
   RIGHT ICONS
================================= */
.icons-list {
  display: flex;
  gap: 6px;
  padding-right: 0px;
}

.icon-btn {
  width: 46px;
  height: 46px;
  padding: 0;
  border: none;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: transparent;
  cursor: pointer;
}

.icon-inner {
  width: 46px;
  height: 46px;
  border-radius: 9999px;

  /* Soft frosted glass */
  background: rgba(215, 230, 255, 0.55);

  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.65);

  box-shadow: inset 0 2px 2px rgba(255, 255, 255, 0.75),
    0 8px 18px rgba(0, 0, 0, 0.06);

  display: grid;
  place-items: center;
  transition: transform 150ms ease, background 150ms ease;
}

/* Hover feel like macOS */
.icon-btn:hover .icon-inner {
  background: rgba(240, 250, 255, 0.75);
  transform: translateY(-2px);
}

.spotlight-wrap nav {
  padding-left: 50px !important;
  padding-right: 40px !important;
}

.left-pill {
  min-width: 480px;
}

.icons-list .icon-btn,
.icons-list .icon-inner {
  width: 54px;
  height: 54px;
}
</style>
