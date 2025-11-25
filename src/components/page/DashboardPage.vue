<template>
  <section
    class="w-full min-h-screen px-8 py-12 bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] relative overflow-hidden"
  >
    <!-- Background Shapes -->
    <div class="absolute -top-20 -left-10 w-[380px] h-[380px] bg-white/20 rounded-3xl blur-3xl rotate-12"></div>
    <div class="absolute bottom-10 right-0 w-[340px] h-[340px] bg-[#C1D4EA]/30 rounded-full blur-3xl"></div>
    <div class="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto flex flex-col gap-10">
      <!-- Header -->
      <DashboardHeader />

      <!-- Feature Cards -->
      <DashboardFeatureCards />

      <!-- Main Dashboard Content -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        <DashboardEvents class="lg:col-span-4" />
        <DashboardTasks class="lg:col-span-8" />
      </div>
    </div>
  </section>
</template>

<script setup>
// Import Child Components
/*import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import DashboardFeatureCards from "@/components/dashboard/DashboardFeatureCards.vue";
import DashboardEvents from "@/components/dashboard/DashboardEvents.vue";
import DashboardTasks from "@/components/dashboard/DashboardTasks.vue";
*/
</script>

<style scoped>
</style>
