<script setup>
import { RouterLink } from 'vue-router'
import { ChevronRight, Home } from 'lucide-vue-next'
</script>

<template>
  <nav class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6 flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-500">
    <RouterLink to="/" class="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
      <Home class="w-3.5 h-3.5" />
      Home
    </RouterLink>
    <ChevronRight class="w-4 h-4 shrink-0 text-slate-700" />
    <span class="text-primary font-bold">Karya</span>
  </nav>
</template>
