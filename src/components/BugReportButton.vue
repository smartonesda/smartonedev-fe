<script setup>
import { Bug } from 'lucide-vue-next'
import { useBugReport } from '@/composables/useBugReport'

const { FORM_URL, shouldShow } = useBugReport()
</script>

<template>
  <div v-if="shouldShow" class="fixed bottom-6 right-6 z-50 group">
    <!-- Tooltip -->
    <div class="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-lg text-xs text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
      Laporkan Masalah
    </div>
    <a
      :href="FORM_URL"
      target="_blank"
      rel="noopener noreferrer"
      class="w-12 h-12 flex items-center justify-center rounded-full bg-dark-900 border border-dark-700 hover:border-primary/60 hover:bg-primary/10 text-slate-400 hover:text-primary shadow-lg hover:shadow-primary/20 transition-all cursor-pointer"
    >
      <Bug class="w-5 h-5" />
    </a>
  </div>
</template>
