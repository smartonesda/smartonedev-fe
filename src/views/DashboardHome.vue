<script setup>
import { ref, computed, onMounted } from 'vue'
import { Images, FolderGit, TrendingUp, Clock } from 'lucide-vue-next'
import { useGalleryStore } from '@/stores/gallery'

const galleryStore = useGalleryStore()
const isLoading = ref(true)

// Fetch data on mount
onMounted(async () => {
  isLoading.value = true
  await galleryStore.fetchProjects()
  isLoading.value = false
})

const stats = computed(() => [
  {
    icon: Images,
    label: 'Total Karya',
    value: galleryStore.projects.length,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: FolderGit,
    label: 'Repo Aktif',
    value: galleryStore.projects.filter(p => p.collab_open).length,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  {
    icon: TrendingUp,
    label: 'Total Stars',
    value: galleryStore.projects.reduce((acc, p) => acc + (p.stars || 0), 0),
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    icon: Clock,
    label: 'Update Terakhir',
    value: getLastUpdate(),
    color: 'text-accent-gold',
    bgColor: 'bg-accent-gold/10'
  }
])

// Get last update time
function getLastUpdate() {
  if (galleryStore.projects.length === 0) return '-'
  const sorted = [...galleryStore.projects].sort((a, b) => 
    new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)
  )
  const lastDate = new Date(sorted[0]?.updated_at || sorted[0]?.created_at)
  const now = new Date()
  const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hari Ini'
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari lalu`
  return lastDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
    <p class="text-slate-400 mb-8">Selamat datang di panel admin SmartOneDev</p>
    
    <!-- Stats Grid - Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="n in 4" 
        :key="n"
        class="bg-dark-900 border border-dark-800 rounded-xl p-6"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg skeleton"></div>
          <div class="flex-1">
            <div class="h-7 w-16 skeleton rounded mb-2"></div>
            <div class="h-4 w-24 skeleton rounded"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Stats Grid - Loaded -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-dark-900 border border-dark-800 rounded-xl p-6 hover:border-primary/30 transition-colors"
      >
        <div class="flex items-center gap-4">
          <div :class="`p-3 rounded-lg ${stat.bgColor}`">
            <component :is="stat.icon" :class="`w-6 h-6 ${stat.color}`" />
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
            <p class="text-sm text-slate-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="bg-dark-900 border border-dark-800 rounded-xl p-6">
      <h2 class="text-xl font-bold text-white mb-4">Aksi Cepat</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link 
          to="/dashboard/gallery"
          class="flex items-center gap-3 p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
        >
          <Images class="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <span class="text-slate-300 group-hover:text-white transition-colors">Kelola Galeri Karya</span>
        </router-link>
        <a 
          href="https://github.com/smartonesda"
          target="_blank"
          class="flex items-center gap-3 p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors group"
        >
          <FolderGit class="w-5 h-5 text-accent-gold group-hover:scale-110 transition-transform" />
          <span class="text-slate-300 group-hover:text-white transition-colors">Buka GitHub</span>
        </a>
      </div>
    </div>
  </div>
</template>
