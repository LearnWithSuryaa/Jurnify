<template>
  <div class="w-full min-h-screen bg-white flex flex-col">
    <!-- Navbar -->
    <Navbar v-if="$route.meta.showNavbar !== false" />

    <!-- Halaman berubah sesuai router -->
    <router-view />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<style>
/* Style global opsional */
</style>
