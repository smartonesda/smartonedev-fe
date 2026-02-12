<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCategoryStore } from '@/stores/categories'
import { Globe, Smartphone, Gamepad2, Cpu, Layout, BookOpen, Users, Star, Eye, FolderOpen } from 'lucide-vue-next'
import SkeletonCard from './SkeletonCard.vue'

const router = useRouter()
const categoryStore = useCategoryStore()

const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const activeFilter = ref('All')

// Dynamic filters from category store
const filters = computed(() => {
  const categoryNames = categoryStore.categories.map(c => c.name)
  return ['All', ...categoryNames]
})

onMounted(() => {
  categoryStore.fetchCategories()
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return props.projects
  }
  return props.projects.filter(p => p.category === activeFilter.value)
})

const setFilter = (filter) => {
  activeFilter.value = filter
}

const getGlowColor = (category) => {
  if (category === 'Game') return '#f59e0b'
  if (category === 'IoT') return '#ef4444'
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

const goToDetail = (project) => {
  sessionStorage.setItem('currentProject', JSON.stringify(project))
  router.push(`/project/${project.slug || project.id}`)
}
</script>

<template>
  <section id="karya" class="py-24 bg-dark-900 relative">
    <!-- Diagonal divider -->
    <div class="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
        class="relative block h-[60px] w-full fill-dark-950">
        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header & Filter -->
      <div class="flex flex-col md:flex-row justify-between items-end xs:items-center mb-16 gap-6">
        <div data-aos="fade-right">
          <h2 class="text-accent-gold font-bold tracking-wider uppercase mb-2">Showcase</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-white">Galeri Karya Siswa</h3>
        </div>

        <!-- Filter Buttons -->
        <div data-aos="fade-left" class="flex flex-wrap gap-3">
          <button v-for="filter in filters" :key="filter" @click="setFilter(filter)"
            class="filter-btn transition-all duration-300" :class="{ active: activeFilter === filter }">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Project Grid Container -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Skeleton loading -->
        <template v-if="isLoading">
          <SkeletonCard v-for="n in 6" :key="'skeleton-' + n" />
        </template>

        <!-- Empty State -->
        <template v-else-if="filteredProjects.length === 0">
          <div class="col-span-full text-center py-20">
            <div
              class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center">
              <FolderOpen class="w-12 h-12 text-slate-500" />
            </div>
            <h4 class="text-xl font-bold text-white mb-2">Belum Ada Karya</h4>
            <p class="text-slate-400 max-w-md mx-auto">
              Galeri karya siswa masih kosong. Karya-karya terbaik siswa RPL akan ditampilkan di sini.
            </p>
          </div>
        </template>

        <!-- Project Cards -->
        <template v-else>
          <div v-for="(project, index) in filteredProjects" :key="project.id" @click="goToDetail(project)"
            class="project-card group bg-dark-800 rounded-2xl overflow-hidden border border-dark-700 cursor-pointer"
            :style="{ '--glow-color': getGlowColor(project.category) }" data-aos="fade-up"
            :data-aos-delay="index * 100">
            <!-- Thumbnail with gradient & icon or image -->
            <div
              :class="`h-56 w-full bg-gradient-to-br ${project.bg_gradient || 'from-red-600 to-red-900'} relative flex items-center justify-center overflow-hidden`">
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
              <div
                class="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4 backdrop-blur-sm z-20">
                <span
                  class="flex items-center gap-2 bg-white text-dark-950 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-transform duration-300 hover:scale-105">
                  <Eye class="w-4 h-4" />
                  Lihat Detail
                </span>
              </div>
            </div>

            <div class="p-6 relative">
              <!-- Category Badge -->
              <div class="flex justify-between items-start mb-4">
                <span
                  class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-dark-950 border border-dark-700 transition-colors duration-300"
                  :style="{ color: getGlowColor(project.category) }">
                  {{ project.category }}
                </span>
                <span v-if="project.collab_open"
                  class="flex items-center gap-1 text-[10px] font-bold uppercase text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                  <Users class="w-3 h-3" />
                  Open
                </span>
              </div>

              <h3
                class="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-primary line-clamp-1">
                {{ project.title }}
              </h3>
              <p class="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
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
              <div class="flex items-center justify-between pt-4 border-t border-dark-700/50">
                <div class="flex items-center gap-2 text-slate-400 text-sm font-medium">
                  <div
                    class="w-7 h-7 rounded-md bg-gradient-to-tr from-dark-700 to-dark-800 flex items-center justify-center text-xs text-white font-bold border border-dark-600 shadow-inner">
                    {{ project.author?.charAt(0) || 'U' }}
                  </div>
                  {{ project.author }}
                </div>
                <div
                  class="flex items-center gap-1 text-yellow-500 text-sm font-bold bg-yellow-500/10 px-2 py-1 rounded-lg">
                  <Star class="w-4 h-4 fill-current" />
                  {{ project.stars || 0 }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
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

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgb(55 65 81);
  color: rgb(148 163 184);
  background-color: rgb(31 41 55);
  transition: all 0.3s;
}

.filter-btn:hover {
  background-color: rgb(55 65 81);
  color: white;
}

.filter-btn.active {
  background-color: #dc2626;
  border-color: #dc2626;
  color: white;
}
</style>
