<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true
  }
})
</script>

<template>
  <span class="text-xs text-slate-300 bg-dark-950 border border-dark-700 px-2.5 py-1 rounded-md font-mono">
    {{ tag }}
  </span>
</template>
