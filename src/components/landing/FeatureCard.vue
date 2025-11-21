<template>
  <div
    ref="card"
    class="relative feature-card bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl rounded-3xl p-8 transition-all duration-300"
  >
    <!-- Glass Light Reflection -->
    <div
      ref="shine"
      class="absolute inset-0 rounded-3xl pointer-events-none shine-layer"
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 flex flex-col items-center text-center"
      ref="content"
    >
      <!-- Title -->
      <h3 class="text-2xl font-bold text-[#4A75A9] mb-4 depth-1">
        {{ title }}
      </h3>

      <!-- Image / Asset -->
      <img
        :src="image"
        alt="visual"
        class="w-28 h-28 object-contain mb-4 depth-2 transition-transform duration-300"
      />

      <!-- Description -->
      <p class="text-black/70 text-sm leading-relaxed depth-3">
        {{ desc }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

defineProps({
  title: String,
  desc: String,
  points: Array,
  image: String,
});

const card = ref(null);
const shine = ref(null);
const content = ref(null);

onMounted(() => {
  const el = card.value;
  const shineLayer = shine.value;
  const depthWrapper = content.value;

  if (!el) return;

  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;

  const ROT_MAX = 10; // 🎯 batas aman (10 derajat)

  function onMove(e) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    targetX = (x / rect.width) * ROT_MAX;
    targetY = (y / rect.height) * ROT_MAX * -1;

    // Update shine
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    shineLayer.style.background = `
      radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.25), transparent 60%)
    `;
  }

  function animate() {
    // Smooth Lerp
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    el.style.transform = `
      perspective(1000px)
      rotateY(${currentX}deg)
      rotateX(${currentY}deg)
      translateY(-10px)
    `;

    // Depth Parallax (multi-layer)
    const layers = depthWrapper.querySelectorAll("[class*='depth-']");
    layers.forEach((layer) => {
      const depth = Number(layer.className.match(/depth-(\d)/)?.[1] || 1);
      layer.style.transform = `
        translateZ(${depth * 6}px)
        translateX(${currentX * depth * 0.4}px)
        translateY(${currentY * -depth * 0.4}px)
      `;
    });

    // Shadow follows tilt
    el.style.boxShadow = `
      ${-currentX * 2}px ${currentY * 2}px 40px rgba(0,0,0,0.15)
    `;

    requestAnimationFrame(animate);
  }

  function reset() {
    targetX = 0;
    targetY = 0;
    shineLayer.style.background = "transparent";
  }

  window.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", reset);

  animate();

  onBeforeUnmount(() => {
    window.removeEventListener("mousemove", onMove);
  });
});
</script>

<style scoped>
.feature-card {
  transform-style: preserve-3d;
  will-change: transform;
}

/* Shine Layer */
.shine-layer {
  transition: background 0.2s ease;
}

/* Depth Elements */
.depth-1,
.depth-2,
.depth-3 {
  will-change: transform;
  position: relative;
}
</style>
