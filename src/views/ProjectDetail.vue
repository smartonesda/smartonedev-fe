<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useSeoMeta } from '@/composables/useSeoMeta'
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
  X,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-vue-next'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const route = useRoute()
const router = useRouter()

const project = ref(null)
const isLoading = ref(true)
const currentScreenshot = ref(0)
const isLightboxOpen = ref(false)

// Credentials state
const showPasswords = ref({})
const copiedField = ref(null)

const toggleShowPassword = (index) => {
  showPasswords.value[index] = !showPasswords.value[index]
}

const copyToClipboard = async (text, fieldKey) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = fieldKey
    setTimeout(() => { copiedField.value = null }, 2000)
  } catch (e) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copiedField.value = fieldKey
    setTimeout(() => { copiedField.value = null }, 2000)
  }
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
    if (parsed.slug === slug || String(parsed.id) === slug) {
      project.value = parsed
      useSeoMeta({
        title: parsed.title,
        description: parsed.description || ('Lihat detail project ' + parsed.title + ' \u2014 karya siswa RPL SmartOneDev SMKS Antartika 1 Sidoarjo.'),
        image: parsed.image || undefined,
        path: '/project/' + (parsed.slug || parsed.id),
      })
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
      useSeoMeta({
        title: found.title,
        description: found.description || ('Lihat detail project ' + found.title + ' \u2014 karya siswa RPL SmartOneDev SMKS Antartika 1 Sidoarjo.'),
        image: found.image || undefined,
        path: '/project/' + (found.slug || found.id),
      })
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
      <h1 class="text-4xl font-bold text-white mb-4">404</h1>
      <p class="text-slate-400 mb-8">Project tidak ditemukan.</p>
      <button @click="goBack" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-glow transition-colors">
        Kembali
      </button>
    </div>

    <!-- Project Detail -->
    <div v-else class="animate-fadeIn">
      <!-- Top Bar -->
      <div class="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-dark-950/80 backdrop-blur-md border-b border-dark-800">
        <button @click="goBack" class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <div class="w-9 h-9 rounded-full bg-dark-800 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
            <ArrowLeft class="w-5 h-5" />
          </div>
          <span class="font-medium text-sm hidden sm:block">Kembali</span>
        </button>

        <div class="flex items-center gap-3">
          <a v-if="project.github_url" :href="project.github_url" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 text-slate-300 hover:text-white transition-all text-sm font-medium">
            <Github class="w-4 h-4" />
            <span class="hidden sm:block">GitHub</span>
          </a>
          <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noopener noreferrer"
            class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary hover:text-primary-glow transition-all text-sm font-medium">
            <ExternalLink class="w-4 h-4" />
            <span class="hidden sm:block">Live Demo</span>
          </a>
        </div>
      </div>

      <!-- Hero -->
      <div class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950"></div>
        <div v-if="project.image" class="absolute inset-0">
          <img :src="project.image" :alt="project.title"
            class="w-full h-full object-cover opacity-10 blur-sm" />
        </div>
        <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div class="flex items-start gap-4 mb-6">
            <div v-if="project.image" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-dark-700 flex-shrink-0 shadow-xl"
              :style="{ boxShadow: `0 0 30px ${getGlowColor(project.category?.name)}40` }">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-800 border-2 border-dark-700 flex items-center justify-center flex-shrink-0">
              <component :is="getIcon(project.category?.icon)" class="w-8 h-8 text-primary" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-2">
                <span v-if="project.category" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <component :is="getIcon(project.category.icon)" class="w-3 h-3" />
                  {{ project.category.name }}
                </span>
                <span v-if="project.featured" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Star class="w-3 h-3" />
                  Featured
                </span>
              </div>
              <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">{{ project.title }}</h1>
            </div>
          </div>

          <p class="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">{{ project.description }}</p>

          <!-- Meta Info -->
          <div class="flex flex-wrap gap-4 text-sm text-slate-400">
            <div v-if="project.team_members?.length" class="flex items-center gap-1.5">
              <Users class="w-4 h-4 text-primary" />
              <span>{{ project.team_members.length }} Anggota</span>
            </div>
            <div v-if="project.created_at" class="flex items-center gap-1.5">
              <Calendar class="w-4 h-4 text-primary" />
              <span>{{ formatDate(project.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-10">

        <!-- Screenshots -->
        <section v-if="project.screenshots?.length">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Maximize2 class="w-5 h-5 text-primary" />
            Screenshot
          </h2>
          <div class="relative rounded-2xl overflow-hidden border border-dark-700 bg-dark-900">
            <img :src="project.screenshots[currentScreenshot].url"
              :alt="project.screenshots[currentScreenshot].caption"
              class="w-full max-h-[500px] object-contain cursor-pointer"
              @click="openLightbox(currentScreenshot)" />
            <div v-if="project.screenshots[currentScreenshot].caption"
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-950/90 to-transparent px-4 py-3">
              <p class="text-sm text-slate-300">{{ project.screenshots[currentScreenshot].caption }}</p>
            </div>
            <button v-if="project.screenshots.length > 1" @click="prevScreenshot"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
              <ChevronLeft class="w-5 h-5" />
            </button>
            <button v-if="project.screenshots.length > 1" @click="nextScreenshot"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-dark-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors">
              <ChevronRight class="w-5 h-5" />
            </button>
          </div>

          <!-- Thumbnail strip -->
          <div v-if="project.screenshots.length > 1" class="flex gap-2 mt-3 overflow-x-auto pb-1">
            <button v-for="(shot, idx) in project.screenshots" :key="idx"
              @click="currentScreenshot = idx"
              class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all"
              :class="idx === currentScreenshot ? 'border-primary' : 'border-dark-700 opacity-60 hover:opacity-100'">
              <img :src="shot.url" :alt="shot.caption" class="w-full h-full object-cover" />
            </button>
          </div>
        </section>

        <!-- Tech Stack -->
        <section v-if="project.tech_stack?.length">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Wrench class="w-5 h-5 text-primary" />
            Tech Stack
          </h2>
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in project.tech_stack" :key="tech"
              class="px-3 py-1.5 rounded-lg bg-dark-800 border border-dark-700 text-slate-300 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors">
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- Features -->
        <section v-if="project.features?.length">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-primary" />
            Fitur Utama
          </h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <div v-for="(item, idx) in project.features" :key="idx"
              class="p-4 rounded-xl bg-dark-900 border border-dark-700 hover:border-primary/30 transition-colors">
              <h3 class="font-semibold text-white mb-1">{{ item.title || item }}</h3>
              <p v-if="item.description" class="text-slate-400 mt-2 text-sm">{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- Team Members -->
        <section v-if="project.team_members?.length">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Users class="w-5 h-5 text-primary" />
            Tim Pengembang
          </h2>
          <div class="flex flex-wrap gap-3">
            <div v-for="member in project.team_members" :key="member"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-900 border border-dark-700">
              <UserCircle class="w-5 h-5 text-primary flex-shrink-0" />
              <span class="text-slate-200 text-sm font-medium">{{ member }}</span>
            </div>
          </div>
        </section>

        <!-- Demo Credentials -->
        <section v-if="project.credentials?.length">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <KeyRound class="w-5 h-5 text-primary" />
            Demo Credentials
          </h2>
          <div class="space-y-3">
            <div v-for="(cred, idx) in project.credentials" :key="idx"
              class="p-4 rounded-xl bg-dark-900 border border-dark-700">
              <p v-if="cred.role" class="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{{ cred.role }}</p>
              <div class="space-y-2">
                <!-- Username row -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-slate-500 w-16 shrink-0 font-medium">User</span>
                  <div class="flex-1 flex items-center gap-1.5 min-w-0">
                    <code class="flex-1 text-xs text-slate-200 font-mono bg-dark-900/70 px-2.5 py-1.5 rounded-lg truncate border border-dark-700">
                      {{ cred.username }}
                    </code>
                    <button @click="copyToClipboard(cred.username, `user-${idx}`)"
                      class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-all" :class="copiedField === `user-${idx}`
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-dark-700 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400'"
                      title="Copy username">
                      <Check v-if="copiedField === `user-${idx}`" class="w-3.5 h-3.5" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <!-- Password row -->
                <div class="flex items-center gap-2">
                  <span class="text-xs text-slate-500 w-16 shrink-0 font-medium">Pass</span>
                  <div class="flex-1 flex items-center gap-1.5 min-w-0">
                    <code class="flex-1 text-xs text-slate-200 font-mono bg-dark-900/70 px-2.5 py-1.5 rounded-lg truncate border border-dark-700">
                      {{ showPasswords[idx] ? cred.password : '•'.repeat(Math.min(cred.password?.length || 8, 12)) }}
                    </code>
                    <!-- Toggle show -->
                    <button @click="toggleShowPassword(idx)"
                      class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-dark-700 hover:bg-dark-600 text-slate-400 hover:text-slate-200 transition-all"
                      :title="showPasswords[idx] ? 'Sembunyikan' : 'Tampilkan'">
                      <Eye v-if="!showPasswords[idx]" class="w-3.5 h-3.5" />
                      <EyeOff v-else class="w-3.5 h-3.5" />
                    </button>
                    <!-- Copy -->
                    <button @click="copyToClipboard(cred.password, `pass-${idx}`)"
                      class="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-all" :class="copiedField === `pass-${idx}`
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-dark-700 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400'"
                      title="Copy password">
                      <Check v-if="copiedField === `pass-${idx}`" class="w-3.5 h-3.5" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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

