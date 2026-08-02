<script setup>
import { BookOpen, Github, Clock, Award } from 'lucide-vue-next'

defineProps({
  guidebook: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="group relative flex flex-col h-full bg-dark-900/60 backdrop-blur-xl border border-dark-800 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
    <!-- Spotlight Highlight -->
    <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <!-- Cover Image -->
    <div class="relative aspect-video w-full overflow-hidden bg-dark-950">
      <img 
        :src="guidebook.cover" 
        :alt="guidebook.title" 
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <!-- Featured Ribbon -->
      <div v-if="guidebook.featured" class="absolute top-3 left-3 bg-gradient-to-r from-primary to-orange-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1.5">
        <Award class="w-3.5 h-3.5" />
        Pilihan Utama
      </div>
    </div>

    <!-- Details Body -->
    <div class="flex flex-col flex-1 p-5">
      <!-- Badge Meta Row -->
      <div class="flex flex-wrap items-center gap-2 mb-3">
        <span class="bg-primary/15 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full border border-primary/20">
          {{ guidebook.category }}
        </span>
        <span class="bg-dark-800 text-slate-300 text-xs font-medium px-2.5 py-0.5 rounded-full border border-dark-700">
          {{ guidebook.technology }}
        </span>
        <span class="bg-dark-800 text-accent-gold text-xs font-medium px-2.5 py-0.5 rounded-full border border-dark-700">
          {{ guidebook.level }}
        </span>
      </div>

      <!-- Title & Time -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors duration-200 line-clamp-1">
          {{ guidebook.title }}
        </h3>
        <div class="flex items-center gap-1 text-slate-400 text-xs shrink-0 whitespace-nowrap pt-1">
          <Clock class="w-3.5 h-3.5 text-primary" />
          <span>{{ guidebook.estimatedTime }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed flex-1">
        {{ guidebook.description }}
      </p>

      <!-- CTA Action Button Layout -->
      <div class="grid grid-cols-2 gap-3 mt-auto">
        <a 
          :href="guidebook.url" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-orange-500 hover:from-primary/95 hover:to-orange-500/95 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <BookOpen class="w-4 h-4" />
          Belajar
        </a>
        <a 
          :href="guidebook.repository" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl border border-dark-700 hover:border-dark-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Github class="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>
