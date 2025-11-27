<template>
  <div class="w-full min-h-screen bg-white flex flex-col">
    <!-- Navbar -->
    <Navbar v-if="$route.meta.showNavbar !== false" />

    <!-- Halaman berubah sesuai router -->
    <router-view />

    <!-- Footer -->
    <Footer v-if="$route.meta.showFooter !== false" />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>
