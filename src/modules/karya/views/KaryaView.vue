<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import Hero from '../components/Hero.vue'
import FilterBar from '../components/FilterBar.vue'
import ProjectGrid from '../components/ProjectGrid.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
import { useProjectStore } from '../stores/useProjectStore.js'
import { useCategoryStore } from '@/stores/categories'
import { ProjectService } from '../services/project.service.js'
import { useSeoMeta } from '@/composables/useSeoMeta'

// Setup page specific meta tags
useSeoMeta({
  title: 'Karya Siswa',
  description: 'Kumpulan karya terbaik siswa Rekayasa Perangkat Lunak SMKS Antartika 1 Sidoarjo.',
  path: '/karya',
})

const projectStore = useProjectStore()
const categoryStore = useCategoryStore()

// State registers
const search = ref('')
const selectedCategory = ref('All')
const sortBy = ref('Terbaru')

// Static options mapping
const sortOptions = ['Terbaru', 'Populer', 'Nama A-Z']

const categories = computed(() => {
  const categoryNames = categoryStore.categories.map((c) => c.name)
  return ['All', ...categoryNames]
})

// Resolve queries dynamically on client side
const filteredProjects = computed(() => {
  return ProjectService.filterProjects(projectStore.projects, {
    search: search.value,
    category: selectedCategory.value,
    sortBy: sortBy.value,
  })
})

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    await projectStore.fetchProjects()
  }
  if (categoryStore.categories.length === 0) {
    await categoryStore.fetchCategories()
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-dark-950 text-slate-200 selection:bg-primary/30 selection:text-white flex flex-col justify-between"
  >
    <NavbarComponent />

    <!-- Breadcrumb Location tracker -->

    <!-- Hero Introduction -->
    <Hero />

    <!-- Core Gallery Content workspace -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <FilterBar
        v-model:search="search"
        v-model:category="selectedCategory"
        v-model:sortBy="sortBy"
        :categories="categories"
        :sortOptions="sortOptions"
        class="mb-12"
      />

      <ProjectGrid :projects="filteredProjects" :isLoading="projectStore.isLoading" />
    </main>

    <FooterComponent />
  </div>
</template>
