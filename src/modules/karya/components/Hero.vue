<script setup>
import { ref } from 'vue'
import { FolderGit2, Code2, Layers, Award } from 'lucide-vue-next'

const stats = [
  { id: 'project', label: 'Project', value: '120+', icon: FolderGit2, color: 'text-primary border-primary/20 bg-primary/5' },
  { id: 'developer', label: 'Developer', value: '35', icon: Code2, color: 'text-accent-gold border-accent-gold/20 bg-accent-gold/5' },
  { id: 'kategori', label: 'Kategori', value: '12', icon: Layers, color: 'text-purple-400 border-purple-500/20 bg-purple-500/5' },
  { id: 'lomba', label: 'Lomba', value: '18', icon: Award, color: 'text-green-400 border-green-500/20 bg-green-500/5' }
]
</script>

<template>
  <header class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
    <!-- Spotlight blur gradients -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />
    <div class="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/5 blur-3xl rounded-full pointer-events-none -z-10" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <!-- Badge element -->
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse-slow">
        <FolderGit2 class="w-4 h-4" />
        Katalog Karya Siswa
      </div>

      <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
        Galeri Karya <span class="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">SmartOneDev</span>
      </h1>
      <p class="max-w-3xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed mb-12">
        Kumpulan karya terbaik siswa Rekayasa Perangkat Lunak. Mulai dari Website, Mobile App, UI/UX, Game, hingga AI Project yang dikembangkan selama proses belajar.
      </p>

      <!-- Stats Grid Layout -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div 
          v-for="stat in stats" 
          :key="stat.id"
          class="p-5 rounded-2xl bg-dark-900/60 backdrop-blur-xl border border-dark-800 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-dark-700 hover:shadow-xl"
        >
          <div class="p-2.5 rounded-xl border mb-3" :class="stat.color">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <span class="text-3xl font-extrabold text-white mb-1 tracking-tight">{{ stat.value }}</span>
          <span class="text-xs font-medium text-slate-500 uppercase tracking-wider">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
