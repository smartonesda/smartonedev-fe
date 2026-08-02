<script setup>
import { Search } from 'lucide-vue-next'
import SortDropdown from '@/modules/learn/components/SortDropdown.vue'

const props = defineProps({
  search: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'All'
  },
  sortBy: {
    type: String,
    default: 'Terbaru'
  },
  categories: {
    type: Array,
    required: true
  },
  sortOptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:search', 'update:category', 'update:sortBy'])
</script>

<template>
  <div class="flex flex-col gap-6 md:gap-8">
    <!-- Search & Sort Row -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="relative w-full max-w-lg">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search class="h-5 w-5 text-slate-500" />
        </div>
        <input 
          type="text" 
          :value="search"
          @input="emit('update:search', $event.target.value)"
          placeholder="Cari project..." 
          class="block w-full pl-10 pr-4 py-3 bg-dark-900/60 backdrop-blur-md border border-dark-800 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 rounded-2xl text-slate-200 placeholder-slate-500 text-sm transition-all outline-none"
        />
      </div>
      
      <SortDropdown 
        :modelValue="sortBy" 
        @update:modelValue="emit('update:sortBy', $event)" 
        :options="sortOptions" 
      />
    </div>

    <!-- Category Pills Row -->
    <div class="border-t border-dark-800/80 pt-6">
      <div class="flex flex-wrap gap-2.5 items-center">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="emit('update:category', cat)"
          class="px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-200"
          :class="[
            category === cat 
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
              : 'bg-dark-900/60 backdrop-blur-md text-slate-400 border-dark-800 hover:border-dark-700 hover:text-slate-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>
  </div>
</template>
