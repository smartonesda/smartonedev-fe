<script setup>
import { Globe, Smartphone, Gamepad2, Cpu, Layout, BookOpen, Users, Star, Eye } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const getGlowColor = (category) => {
  if (category === 'Game') return '#f59e0b'
  if (category === 'IoT') return '#ef4444'
  if (category === 'AI') return '#8b5cf6'
  return '#dc2626'
}

const iconMap = {
  'globe': Globe,
  'smartphone': Smartphone,
  'gamepad-2': Gamepad2,
  'cpu': Cpu,
  'layout': Layout,
  'book-open': BookOpen
}

const getIcon = (iconName) => {
  return iconMap[iconName] || Globe
}

const goToDetail = () => {
  sessionStorage.setItem('currentProject', JSON.stringify(props.project))
  router.push(`/project/${props.project.slug || props.project.id}`)
}
</script>

<template>
  <div 
    @click="goToDetail"
    class="project-card group bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 cursor-pointer flex flex-col h-full"
    :style="{ '--glow-color': getGlowColor(project.category) }"
  >
    <!-- Thumbnail with gradient & icon or image -->
    <div :class="`h-56 w-full bg-gradient-to-br ${project.bg_gradient || 'from-red-600 to-red-900'} relative flex items-center justify-center overflow-hidden shrink-0`">
      <!-- Image if available -->
      <img v-if="project.image" :src="project.image" :alt="project.title" loading="lazy"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

      <!-- Fallback: Abstract background pattern + icon -->
      <template v-else>
        <div class="absolute inset-0 opacity-20 bg-fixed"
          style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=')">
        </div>
        <component :is="getIcon(project.icon)"
          class="text-white/70 w-16 h-16 transition-transform duration-500 group-hover:scale-110 z-10 relative" />
      </template>

      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-20">
        <span class="flex items-center gap-2 bg-white text-dark-950 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-transform duration-300 hover:scale-105">
          <Eye class="w-4 h-4" />
          Lihat Detail
        </span>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6 relative flex flex-col flex-grow">
      <!-- Category & Collab Open Row -->
      <div class="flex justify-between items-start mb-4">
        <span
          class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-dark-950 border border-dark-700 transition-colors duration-300"
          :style="{ color: getGlowColor(project.category) }"
        >
          {{ project.category }}
        </span>
        <span v-if="project.collab_open"
          class="flex items-center gap-1 text-[10px] font-bold uppercase text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
          <Users class="w-3 h-3" />
          Open
        </span>
      </div>

      <!-- Title & Description -->
      <h3 class="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-1">
        {{ project.title }}
      </h3>
      <p class="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
        {{ project.description }}
      </p>

      <!-- Tech Stack Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span v-for="tech in project.tech?.slice(0, 3)" :key="tech"
          class="text-xs text-slate-300 bg-dark-950 border border-dark-700 px-2.5 py-1 rounded-md font-mono transition-colors duration-300">
          {{ tech }}
        </span>
        <span v-if="project.tech?.length > 3" class="text-xs text-slate-500">
          +{{ project.tech.length - 3 }}
        </span>
      </div>

      <!-- Footer Info -->
      <div class="flex items-center justify-between pt-4 border-t border-dark-700/50 mt-auto">
        <div class="flex items-center gap-2 text-slate-400 text-sm font-medium">
          <div class="w-7 h-7 rounded-md bg-gradient-to-tr from-dark-700 to-dark-800 flex items-center justify-center text-xs text-white font-bold border border-dark-600 shadow-inner">
            {{ project.author?.charAt(0) || 'U' }}
          </div>
          {{ project.author }}
        </div>
        <div class="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-1 rounded-lg">
          <Star class="w-4 h-4 fill-current" />
          {{ project.stars || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-card {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 30px -5px var(--glow-color);
  border-color: var(--glow-color);
}
</style>
