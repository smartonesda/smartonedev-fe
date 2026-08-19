<script setup>
import { defineAsyncComponent } from 'vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import StatsSection from '@/components/StatsSection.vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

// Asynchronously load below-fold sections for optimized initial render
const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
const FeaturedProjectsSection = defineAsyncComponent(() => import('@/components/FeaturedProjectsSection.vue'))
const LearnSection = defineAsyncComponent(() => import('@/components/LearnSection.vue'))
const CollaborationSection = defineAsyncComponent(() => import('@/components/CollaborationSection.vue'))
const FinalCtaSection = defineAsyncComponent(() => import('@/components/FinalCtaSection.vue'))
const FooterComponent = defineAsyncComponent(() => import('@/components/FooterComponent.vue'))

useSeoMeta({
  title: 'Beranda — Ekosistem Developer Siswa RPL',
  description:
    'SmartOneDev adalah ekosistem developer siswa Rekayasa Perangkat Lunak SMKS Antartika 1 Sidoarjo untuk showcase project, open source, dan kolaborasi produk digital nyata.',
  path: '/',
})
</script>

<template>
  <div class="bg-[#0B0B0D] text-[#F5F5F5] selection:bg-primary/25 selection:text-white min-h-screen flex flex-col justify-between overflow-x-hidden">
    <!-- Navbar Component -->
    <NavbarComponent />

    <!-- Main Landing Sections Flow -->
    <main class="flex-grow">
      <!-- Section 1: Hero -->
      <HeroSection />

      <!-- Section 2: Marquee Stack -->
      <TechMarquee />

      <!-- Section 3: Statistics -->
      <StatsSection />

      <!-- Section 4: About / What is SmartOneDev -->
      <AboutSection />

      <!-- Section 5: Featured Projects Showcase -->
      <FeaturedProjectsSection />

      <!-- Section 6: Learn Center Preview -->
      <LearnSection />

      <!-- Section 7: Community & Collaboration -->
      <CollaborationSection />

      <!-- Section 8: Final Call to Action -->
      <FinalCtaSection />
    </main>

    <!-- Section 9: Footer -->
    <FooterComponent />
  </div>
</template>
