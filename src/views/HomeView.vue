<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import { defineAsyncComponent, ref, onMounted } from 'vue'
import { useGalleryStore } from '@/stores/gallery'

// Below-fold sections — loaded asynchronously to speed up initial render
const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
const GallerySection = defineAsyncComponent(() => import('@/components/GallerySection.vue'))
const CollaborationSection = defineAsyncComponent(() => import('@/components/CollaborationSection.vue'))
const FooterComponent = defineAsyncComponent(() => import('@/components/FooterComponent.vue'))

const galleryStore = useGalleryStore()
const isLoading = ref(true)

onMounted(async () => {
  // Simulate loading or fetch from API
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
  </div>
</template>
