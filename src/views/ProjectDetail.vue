<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Users,
  Star,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Wrench,
  UserCircle,
  Globe,
  Smartphone,
  Gamepad2,
  Cpu,
  Layout,
  BookOpen,
  Maximize2,
  X
} from 'lucide-vue-next'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const route = useRoute()
const router = useRouter()

const project = ref(null)
const isLoading = ref(true)
const currentScreenshot = ref(0)
const isLightboxOpen = ref(false)

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

const getGlowColor = (category) => {
  if (category === 'Game') return '#f59e0b'
  if (category === 'IoT') return '#ef4444'
  return '#dc2626'
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  // Use router.back() when possible to restore scroll position
  // Otherwise, navigate to the gallery section directly
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ path: '/', hash: '#karya' })
  }
}

const nextScreenshot = () => {
  if (project.value?.screenshots) {
    currentScreenshot.value = (currentScreenshot.value + 1) % project.value.screenshots.length
  }
}

const prevScreenshot = () => {
  if (project.value?.screenshots) {
    currentScreenshot.value = currentScreenshot.value === 0
      ? project.value.screenshots.length - 1
      : currentScreenshot.value - 1
  }
}

const openLightbox = (index) => {
  currentScreenshot.value = index
  isLightboxOpen.value = true
}

const closeLightbox = () => {
  isLightboxOpen.value = false
}

onMounted(async () => {
  const slug = route.params.slug

  // 1. Try sessionStorage first (fast path from GallerySection navigation)
  const storedProject = sessionStorage.getItem('currentProject')
  if (storedProject) {
    const parsed = JSON.parse(storedProject)
    // Verify the stored project matches the current slug
    if (parsed.slug === slug || String(parsed.id) === slug) {
      project.value = parsed
      isLoading.value = false
      return
    }
  }

  // 2. Fallback: fetch from API (handles direct URL access / hard reload)
  try {
    const response = await axios.get(`${API_URL}/gallery`)
    const projects = response.data.data || response.data || []
    const found = projects.find(p => p.slug === slug || String(p.id) === slug)
    if (found) {
      project.value = found
      // Cache it in sessionStorage for subsequent navigations
      sessionStorage.setItem('currentProject', JSON.stringify(found))
    }
  } catch (err) {
    console.error('Failed to fetch project by slug:', err.message)
  }

  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-dark-950">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!project" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 class="text-4xl font-bold text-white mb-4">Project Tidak Ditemukan</h1>
      <p class="text-slate-400 mb-8">Maaf, project yang Anda cari tidak tersedia.</p>
      <button @click="goBack"
        class="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-glow text-white rounded-lg font-bold transition-colors">
        <ArrowLeft class="w-5 h-5" />
        Kembali ke Galeri
      </button>
    </div>

    <!-- Project Detail -->
    <div v-else class="animate-fadeIn">
      <!-- Hero Header -->
      <div
        :class="`relative min-h-[60vh] bg-gradient-to-br ${project.bg_gradient || 'from-red-600 to-red-900'} flex items-end overflow-hidden`">
        <!-- Image if available -->
        <img v-if="project.image" :src="project.image" :alt="project.title"
          class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/70 to-dark-950/30"></div>

        <!-- Back Button -->
        <button @click="goBack"
          class="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-dark-950/50 backdrop-blur-md border border-white/10 text-white rounded-full font-medium hover:bg-dark-950/70 transition-all z-20">
          <ArrowLeft class="w-4 h-4" />
          Kembali
        </button>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            {{ project.title }}
          </h1>

          <p class="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/10">
            <div class="flex items-center gap-2 text-slate-400">
              <Calendar class="w-5 h-5" />
              <span class="font-medium">{{ formatDate(project.created_at) }}</span>
            </div>
            <div class="flex items-center gap-2 text-slate-400">
              <UserCircle class="w-5 h-5" />
              <span class="font-medium">{{ project.author }}</span>
            </div>
            <div class="flex items-center gap-2 text-yellow-500 font-bold">
              <Star class="w-5 h-5 fill-current" />
              {{ project.stars || 0 }} stars
            </div>
            <span
              class="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-dark-950/50 backdrop-blur-md border border-white/10"
              :style="{ color: getGlowColor(project.category) }">
              {{ project.category }}
            </span>
            <span v-if="project.collab_open"
              class="flex items-center gap-1.5 text-xs font-bold uppercase text-green-400 bg-green-400/10 px-4 py-1.5 rounded-full border border-green-400/20">
              <Users class="w-3.5 h-3.5" />
              Open Collaboration
            </span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <!-- Story Section -->
        <section v-if="project.story" class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lightbulb class="w-6 h-6 text-primary" />
            </span>
            Cerita Project
          </h2>

          <div class="grid md:grid-cols-3 gap-8">
            <!-- Problem -->
            <div
              class="bg-gradient-to-br from-red-950/50 to-dark-900 border border-red-900/30 rounded-2xl p-8 relative overflow-hidden group hover:border-red-500/50 transition-all duration-300">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-colors">
              </div>
              <span class="text-red-400 text-sm font-bold uppercase tracking-wider">Masalah</span>
              <h3 class="text-xl font-bold text-white mt-2 mb-4">Apa yang Kami Temukan?</h3>
              <p class="text-slate-400 leading-relaxed relative z-10">{{ project.story.problem || '-' }}</p>
            </div>

            <!-- Solution -->
            <div
              class="bg-gradient-to-br from-blue-950/50 to-dark-900 border border-blue-900/30 rounded-2xl p-8 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors">
              </div>
              <span class="text-blue-400 text-sm font-bold uppercase tracking-wider">Solusi</span>
              <h3 class="text-xl font-bold text-white mt-2 mb-4">Apa yang Kami Buat?</h3>
              <p class="text-slate-400 leading-relaxed relative z-10">{{ project.story.solution || '-' }}</p>
            </div>

            <!-- Impact -->
            <div
              class="bg-gradient-to-br from-green-950/50 to-dark-900 border border-green-900/30 rounded-2xl p-8 relative overflow-hidden group hover:border-green-500/50 transition-all duration-300">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-colors">
              </div>
              <span class="text-green-400 text-sm font-bold uppercase tracking-wider">Dampak</span>
              <h3 class="text-xl font-bold text-white mt-2 mb-4">Apa Hasilnya?</h3>
              <p class="text-slate-400 leading-relaxed relative z-10">{{ project.story.impact || '-' }}</p>
            </div>
          </div>
        </section>

        <!-- Screenshots -->
        <section v-if="project.screenshots?.length > 0" class="mb-20">
          <h2 class="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <span class="w-12 h-12 rounded-xl bg-accent-gold/20 flex items-center justify-center">
              <Maximize2 class="w-6 h-6 text-accent-gold" />
            </span>
            Screenshots
          </h2>

          <!-- Main Screenshot -->
          <div class="relative rounded-2xl overflow-hidden mb-4 cursor-pointer group"
            @click="openLightbox(currentScreenshot)">
            <img v-if="project.screenshots[currentScreenshot]?.url" :src="project.screenshots[currentScreenshot].url"
              :alt="project.screenshots[currentScreenshot].caption" class="w-full h-auto max-h-[600px] object-cover" />
            <div
              class="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/50 transition-colors flex items-center justify-center">
              <span
                class="opacity-0 group-hover:opacity-100 bg-white/90 text-dark-950 px-4 py-2 rounded-full font-bold transition-opacity">
                <Maximize2 class="w-5 h-5 inline mr-2" />
                Perbesar
              </span>
            </div>
          </div>

          <!-- Thumbnails -->
          <div class="flex justify-center gap-2 sm:gap-4 overflow-x-auto pb-2 px-2 -mx-2">
            <button v-for="(screenshot, index) in project.screenshots" :key="index" @click="currentScreenshot = index"
              class="flex-shrink-0 w-20 h-14 sm:w-32 sm:h-20 rounded-lg overflow-hidden border-2 transition-all"
              :class="currentScreenshot === index ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'">
              <img :src="screenshot.url" :alt="screenshot.caption" class="w-full h-full object-cover" />
            </button>
          </div>

          <!-- Caption -->
          <p class="text-center text-slate-400 mt-4">
            {{ project.screenshots[currentScreenshot]?.caption }}
          </p>

          <!-- Nav Arrows -->
          <div class="flex justify-center gap-4 mt-6">
            <button @click="prevScreenshot" class="p-3 bg-dark-800 hover:bg-dark-700 rounded-full transition-colors">
              <ChevronLeft class="w-6 h-6 text-white" />
            </button>
            <button @click="nextScreenshot" class="p-3 bg-dark-800 hover:bg-dark-700 rounded-full transition-colors">
              <ChevronRight class="w-6 h-6 text-white" />
            </button>
          </div>
        </section>

        <!-- Timeline & Team -->
        <div class="grid lg:grid-cols-3 gap-8 mb-20">
          <!-- Timeline -->
          <div class="lg:col-span-2">
            <section v-if="project.timeline?.length > 0" class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar class="w-6 h-6 text-primary" />
                Perjalanan Project
              </h2>

              <div class="relative">
                <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-dark-700"></div>

                <div v-for="(item, index) in project.timeline" :key="index" class="relative pl-12 pb-8 last:pb-0">
                  <div
                    class="absolute left-0 w-8 h-8 rounded-full bg-dark-800 border-2 border-primary flex items-center justify-center">
                    <div class="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div
                    class="bg-dark-800 rounded-xl p-6 border border-dark-700 hover:border-primary/30 transition-colors">
                    <span class="text-primary text-sm font-bold">{{ item.date }}</span>
                    <h3 class="text-white font-bold text-lg mt-1">{{ item.event }}</h3>
                    <p class="text-slate-400 mt-2">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Team & Tech -->
          <div class="space-y-8">
            <!-- Team -->
            <section v-if="project.team?.length > 0" class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Users class="w-6 h-6 text-accent-gold" />
                Tim Pengembang
              </h2>

              <div class="space-y-4">
                <div v-for="(member, index) in project.team" :key="index" class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-lg">
                    {{ member.name?.charAt(0) || '?' }}
                  </div>
                  <div>
                    <p class="text-white font-medium">{{ member.name }}</p>
                    <p class="text-slate-400 text-sm">{{ member.role }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Tech Stack -->
            <section class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Wrench class="w-6 h-6 text-accent-gold" />
                Tech Stack
              </h2>
              <div class="flex flex-wrap gap-3">
                <span v-for="tech in project.tech" :key="tech"
                  class="text-sm text-slate-300 bg-dark-800 border border-dark-700 px-4 py-2 rounded-lg font-mono hover:border-primary/50 hover:text-white transition-colors">
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="mt-8 pt-6 border-t border-dark-700 space-y-3">
                <a v-if="project.github_url" :href="project.github_url" target="_blank"
                  class="flex items-center justify-center gap-3 w-full px-6 py-3 bg-dark-800 hover:bg-dark-700 border border-dark-700 text-white rounded-xl font-medium transition-colors">
                  <Github class="w-5 h-5" />
                  Lihat Repository
                </a>
                <a v-if="project.demo_url" :href="project.demo_url" target="_blank"
                  class="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-primary to-primary-glow text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                  <ExternalLink class="w-5 h-5" />
                  Lihat Demo Live
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div v-if="isLightboxOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-md"
        @click="closeLightbox">
        <button
          class="absolute top-6 right-6 w-12 h-12 bg-dark-800 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors"
          @click="closeLightbox">
          <X class="w-6 h-6" />
        </button>

        <div class="max-w-6xl max-h-[90vh] mx-4" @click.stop>
          <img v-if="project?.screenshots?.[currentScreenshot]?.url" :src="project.screenshots[currentScreenshot].url"
            :alt="project.screenshots[currentScreenshot].caption"
            class="max-w-full max-h-[80vh] object-contain rounded-lg" />

          <p class="text-center text-slate-400 mt-4">
            {{ project?.screenshots?.[currentScreenshot]?.caption }}
          </p>
        </div>

        <!-- Nav arrows in lightbox -->
        <button @click.stop="prevScreenshot"
          class="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
          <ChevronLeft class="w-8 h-8" />
        </button>
        <button @click.stop="nextScreenshot"
          class="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-dark-800 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
          <ChevronRight class="w-8 h-8" />
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out;
}
</style>
