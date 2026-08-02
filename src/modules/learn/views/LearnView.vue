<script setup>
import { ref, onMounted, watch } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import GuidebookCard from '../components/GuidebookCard.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import SortDropdown from '../components/SortDropdown.vue'
import { GuidebookService } from '../services/guidebook.service.js'
import { useSeoMeta } from '@/composables/useSeoMeta'
import { BookOpen } from 'lucide-vue-next'

// SEO optimization config
useSeoMeta({
  title: 'Learn Center',
  description: 'Kumpulan guidebook resmi SmartOneDev untuk membantu siswa belajar teknologi modern secara terstruktur.',
  path: '/learn'
})

// UI Interaction State
const search = ref('')
const selectedCategory = ref('Semua')
const sortBy = ref('Featured')
const guidebooks = ref([])
const isLoading = ref(true)

// Static Constants
const categories = ['Semua', 'Programming', 'Backend', 'Frontend', 'Cloud', 'Deployment', 'AI']
const sortOptions = ['Featured', 'Newest', 'Alphabet']

// Async data fetcher
const fetchGuidebooks = async () => {
  isLoading.value = true
  try {
    guidebooks.value = await GuidebookService.queryGuidebooks({
      search: search.value,
      category: selectedCategory.value,
      sortBy: sortBy.value
    })
  } catch (error) {
    console.error('Failed to retrieve guidebook records:', error)
  } finally {
    isLoading.value = false
  }
}

// Reactivity watchers
watch([search, selectedCategory, sortBy], () => {
  fetchGuidebooks()
})

onMounted(() => {
  fetchGuidebooks()
})
</script>

<template>
  <div class="min-h-screen bg-dark-950 text-slate-200 selection:bg-primary/30 selection:text-white flex flex-col justify-between">
    <NavbarComponent />

    <!-- Hero Header Frame -->
    <header class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <!-- Background Gradients -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-accent-gold/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Floating Accent Emblem -->
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse-slow">
          <BookOpen class="w-4 h-4" />
          Katalog Panduan
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
          Learn <span class="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Center</span>
        </h1>
        <p class="max-w-2xl mx-auto text-base md:text-lg text-slate-400 leading-relaxed">
          Kumpulan guidebook resmi SmartOneDev untuk membantu siswa belajar teknologi modern secara terstruktur.
        </p>
      </div>
    </header>

    <!-- Content Workspace -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <!-- Search, Filters, and Sorting Toolbar -->
      <section class="flex flex-col gap-6 md:gap-8 mb-12">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchBar v-model="search" />
          <SortDropdown v-model="sortBy" :options="sortOptions" />
        </div>
        
        <div class="border-t border-dark-800/80 pt-6">
          <CategoryFilter v-model="selectedCategory" :categories="categories" />
        </div>
      </section>

      <!-- Dynamic Cards Grid -->
      <section class="relative">
        <!-- Loading State Spinner -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
          <p class="text-sm text-slate-500 font-medium">Memuat katalog panduan...</p>
        </div>

        <!-- Catalog List -->
        <div v-else-if="guidebooks.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div 
            v-for="guide in guidebooks" 
            :key="guide.id"
            class="h-full"
          >
            <GuidebookCard :guidebook="guide" />
          </div>
        </div>

        <!-- Catalog Empty State -->
        <div v-else class="text-center py-20 border border-dashed border-dark-800 rounded-3xl bg-dark-900/20 backdrop-blur-md">
          <BookOpen class="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-white mb-2">Guidebook Tidak Ditemukan</h3>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Kami tidak menemukan guidebook yang cocok dengan kriteria pencarian Anda. Coba ganti kata kunci atau pilih kategori lain.
          </p>
        </div>
      </section>
    </main>

    <FooterComponent />
  </div>
</template>
