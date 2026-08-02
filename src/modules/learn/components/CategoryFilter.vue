<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-wrap gap-2.5 items-center">
    <button 
      v-for="cat in categories" 
      :key="cat"
      @click="$emit('update:modelValue', cat)"
      class="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-200"
      :class="[
        modelValue === cat 
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
          : 'bg-dark-900/60 backdrop-blur-md text-slate-400 border-dark-800 hover:border-dark-700 hover:text-slate-200'
      ]"
    >
      {{ cat }}
    </button>
  </div>
</template>
