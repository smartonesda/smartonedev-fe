<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useGalleryStore } from '@/stores/gallery'
import { Bug } from 'lucide-vue-next'

// Below-fold sections — loaded asynchronously to speed up initial render
const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
const GallerySection = defineAsyncComponent(() => import('@/components/GallerySection.vue'))
const CollaborationSection = defineAsyncComponent(() => import('@/components/CollaborationSection.vue'))
const FooterComponent = defineAsyncComponent(() => import('@/components/FooterComponent.vue'))

const galleryStore = useGalleryStore()
const isLoading = ref(true)

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdVzbUcWMzn6oMhFkY8yxCu8XxkEkRhgNsdujlG2yZIpBCBHw/viewform?usp=publish-editor'

onMounted(async () => {
  isLoading.value = true
  await galleryStore.fetchProjects()
  isLoading.value = galleryStore.isLoading
})
</script>

<template>
  <div class="bg-dark-950 text-slate-200 selection:bg-primary/30 selection:text-white overflow-x-hidden">
    <NavbarComponent />
    <HeroSection />
    <TechMarquee />
    <AboutSection />
    <GallerySection :projects="galleryStore.projects" :isLoading="galleryStore.isLoading" />
    <CollaborationSection />
    <FooterComponent />

    <!-- Floating Bug Report Button -->
    <div class="fixed bottom-6 right-6 z-50 group">
      <!-- Tooltip -->
      <div class="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-lg text-xs text-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Laporkan Masalah
      </div>
      <a
        :href="FORM_URL"
        target="_blank"
        rel="noopener noreferrer"
        class="w-12 h-12 flex items-center justify-center rounded-full bg-dark-900 border border-dark-700 hover:border-primary/60 hover:bg-primary/10 text-slate-400 hover:text-primary shadow-lg hover:shadow-primary/20 transition-all"
      >
        <Bug class="w-5 h-5" />
      </a>
    </div>
  </div>
</template>
