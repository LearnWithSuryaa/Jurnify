<template>
  <div class="bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-md">
    <h2 class="text-lg font-bold mb-3 text-gray-800">{{ title }}</h2>

    <div v-if="list.length === 0" class="text-gray-500 text-sm">
      No tasks here.
    </div>

    <div
      v-for="task in list"
      :key="task.id"
      class="p-4 rounded-xl mb-3 cursor-pointer bg-white hover:bg-gray-100 border transition shadow-sm"
      @click="$emit('click-task', task)"
    >
      <p class="font-medium text-gray-800">{{ task.title }}</p>
      <p class="text-xs mt-1 text-gray-500 truncate">{{ task.description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  list: Array,
});
defineEmits(["click-task"]);
</script>
