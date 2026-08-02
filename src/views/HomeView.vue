<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import TechMarquee from '@/components/TechMarquee.vue'
import { defineAsyncComponent } from 'vue'
import { useSeoMeta } from '@/composables/useSeoMeta'

// Below-fold sections — loaded asynchronously to speed up initial render
const AboutSection = defineAsyncComponent(() => import('@/components/AboutSection.vue'))
const CollaborationSection = defineAsyncComponent(() => import('@/components/CollaborationSection.vue'))
const FooterComponent = defineAsyncComponent(() => import('@/components/FooterComponent.vue'))

useSeoMeta({
  title: 'Beranda',
  description:
    'SmartOneDev adalah wadah elit siswa Rekayasa Perangkat Lunak SMKS Antartika 1 Sidoarjo untuk showcase project, open source, dan kolaborasi.',
  path: '/',
})
</script>

<template>
  <div class="bg-dark-950 text-slate-200 selection:bg-primary/30 selection:text-white overflow-x-hidden">
    <NavbarComponent />
    <HeroSection />
    <TechMarquee />
    <AboutSection />
    <CollaborationSection />
    <FooterComponent />
  </div>
</template>
