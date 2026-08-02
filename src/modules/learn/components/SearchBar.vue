<script setup>
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const clearSearch = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative w-full max-w-lg">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search class="h-5 w-5 text-slate-500" />
    </div>
    <input 
      type="text" 
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      placeholder="Cari berdasarkan judul, teknologi, atau kategori..." 
      class="block w-full pl-10 pr-10 py-3 bg-dark-900/60 backdrop-blur-md border border-dark-800 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl text-slate-200 placeholder-slate-500 text-sm transition-all outline-none"
    />
    <button 
      v-if="modelValue" 
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
    >
      <X class="h-5 w-5" />
    </button>
  </div>
</template>
