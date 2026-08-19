<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
  Minimize2,
  X,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check,
  ImageIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles
} from 'lucide-vue-next'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const route = useRoute()
const router = useRouter()

const project = ref(null)
const isLoading = ref(true)
const currentScreenshot = ref(0)
const isLightboxOpen = ref(false)
const zoomLevel = ref(1)

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
    setTimeout(() => {
      copiedField.value = null
    }, 2000)
  } catch (e) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copiedField.value = fieldKey
    setTimeout(() => {
      copiedField.value = null
    }, 2000)
  }
}

const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  'gamepad-2': Gamepad2,
  cpu: Cpu,
  layout: Layout,
  'book-open': BookOpen
}

const getIcon = (iconName) => {
  return iconMap[iconName] || Globe
}

const getGlowColor = (category) => {
  if (category === 'Game') return '#ff8a00'
  if (category === 'IoT') return '#3b82f6'
  if (category === 'AI') return '#8b5cf6'
  return '#f04444'
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
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push('/karya')
  }
}

// Compute normalized list of screenshots from project data
const screenshotsList = computed(() => {
  if (!project.value) return []

  let list = []
  const raw = project.value.screenshots

  if (Array.isArray(raw) && raw.length > 0) {
    list = raw
  } else if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) list = parsed
    } catch (e) {}
  }

  // If no screenshots array but main image exists, add image
  if (list.length === 0 && project.value.image) {
    list = [{ url: project.value.image, caption: `${project.value.title} — Tampilan Utama` }]
  }

  // Format list items to ensure consistent schema
  return list
    .map((item, idx) => {
      if (typeof item === 'string') {
        return { url: item, caption: `Screenshot ${idx + 1}` }
      }
      return {
        url: item.url || item.image || item.src,
        caption: item.caption || item.title || `Preview ${idx + 1}`
      }
    })
    .filter((item) => Boolean(item.url))
})

const nextScreenshot = () => {
  if (screenshotsList.value.length > 0) {
    currentScreenshot.value = (currentScreenshot.value + 1) % screenshotsList.value.length
    resetZoom()
  }
}

const prevScreenshot = () => {
  if (screenshotsList.value.length > 0) {
    currentScreenshot.value =
      currentScreenshot.value === 0
        ? screenshotsList.value.length - 1
        : currentScreenshot.value - 1
    resetZoom()
  }
}

const openLightbox = (index) => {
  currentScreenshot.value = index
  zoomLevel.value = 1
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  zoomLevel.value = 1
  document.body.style.overflow = ''
}

const zoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Math.min(3, +(zoomLevel.value + 0.5).toFixed(1))
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 1) {
    zoomLevel.value = Math.max(1, +(zoomLevel.value - 0.5).toFixed(1))
  }
}

const resetZoom = () => {
  zoomLevel.value = 1
}

const toggleZoom = () => {
  zoomLevel.value = zoomLevel.value === 1 ? 2 : 1
}

// Keyboard navigation in lightbox
const handleKeyDown = (e) => {
  if (!isLightboxOpen.value) return

  if (e.key === 'Escape') {
    closeLightbox()
  } else if (e.key === 'ArrowRight') {
    nextScreenshot()
  } else if (e.key === 'ArrowLeft') {
    prevScreenshot()
  } else if (e.key === '+' || e.key === '=') {
    zoomIn()
  } else if (e.key === '-') {
    zoomOut()
  } else if (e.key === '0') {
    resetZoom()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeyDown)

  const slug = route.params.slug

  // 1. Try sessionStorage first
  const storedProject = sessionStorage.getItem('currentProject')
  if (storedProject) {
    try {
      const parsed = JSON.parse(storedProject)
      if (parsed.slug === slug || String(parsed.id) === slug) {
        project.value = parsed
        isLoading.value = false
        return
      }
    } catch (e) {}
  }

  // 2. Fallback: fetch from API
  try {
    const response = await axios.get(`${API_URL}/gallery`)
    const projects = response.data.data || response.data || []
    const found = projects.find((p) => p.slug === slug || String(p.id) === slug)
    if (found) {
      project.value = found
      sessionStorage.setItem('currentProject', JSON.stringify(found))
    }
  } catch (err) {
    console.error('Failed to fetch project by slug:', err.message)
  }

  isLoading.value = false
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="min-h-screen bg-[#0B0B0D] text-[#F5F5F5] selection:bg-primary/30 selection:text-white">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-screen">
      <div class="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-sm font-medium text-slate-400">Memuat detail proyek...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="!project" class="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div class="w-16 h-16 rounded-2xl bg-[#18181B] border border-white/[0.08] flex items-center justify-center mb-6 text-primary">
        <Layout class="w-8 h-8" />
      </div>
      <h1 class="text-3xl font-black text-white mb-3">Project Tidak Ditemukan</h1>
      <p class="text-slate-400 mb-8 max-w-md">Maaf, project yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <button
        @click="goBack"
        class="m3-btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Kembali ke Galeri</span>
      </button>
    </div>

    <!-- Project Detail Main Content -->
    <div v-else class="animate-fadeIn">
      
      <!-- Hero Header Banner -->
      <div
        :class="`relative min-h-[55vh] lg:min-h-[62vh] bg-gradient-to-br ${project.bg_gradient || 'from-red-600 via-rose-800 to-zinc-950'} flex items-end overflow-hidden`"
      >
        <!-- Background Cover Image if available -->
        <img
          v-if="project.image"
          :src="project.image"
          :alt="project.title"
          class="absolute inset-0 w-full h-full object-cover opacity-35"
        />

        <!-- Subtle Pattern & Backdrop Overlays -->
        <div class="dev-grid absolute inset-0 opacity-25"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/80 to-[#0B0B0D]/40"></div>

        <!-- Back Button -->
        <button
          @click="goBack"
          class="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-[#0B0B0D]/70 hover:bg-[#18181B] backdrop-blur-xl border border-white/[0.1] text-white rounded-full text-xs font-semibold transition-all z-20 shadow-lg group"
        >
          <ArrowLeft class="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Kembali</span>
        </button>

        <!-- Content Container -->
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 w-full">
          
          <!-- Category & Collab Badge -->
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span
              class="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#111113]/80 backdrop-blur-md border border-white/[0.12] text-white"
              :style="{ color: getGlowColor(project.category) }"
            >
              {{ project.category }}
            </span>

            <span
              v-if="project.collab_open"
              class="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400 bg-emerald-500/15 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/30"
            >
              <Users class="w-3.5 h-3.5" />
              Open Collaboration
            </span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight tracking-tight">
            {{ project.title }}
          </h1>

          <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Meta Info Bar -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/[0.08] text-xs sm:text-sm text-slate-400">
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4 text-primary" />
              <span>{{ formatDate(project.created_at) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UserCircle class="w-4 h-4 text-slate-300" />
              <span class="font-medium text-white">{{ project.author }}</span>
            </div>
            <div class="flex items-center gap-1.5 text-amber-400 font-bold px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
              <Star class="w-4 h-4 fill-current" />
              <span>{{ project.stars || 0 }} stars</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Main Content Workspace -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <!-- ================= SECTION: PREVIEW & SCREENSHOTS GALLERY (WITH ZOOM) ================= -->
        <section v-if="screenshotsList.length > 0" class="mb-20">
          <!-- Section Header -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                <ImageIcon class="w-3.5 h-3.5" />
                Galeri Antarmuka
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                Screenshot & Preview Visual
              </h2>
            </div>

            <div class="flex items-center gap-2 text-xs text-slate-400">
              <span class="px-2.5 py-1 rounded-lg bg-[#18181B] border border-white/[0.08] font-mono font-medium">
                {{ screenshotsList.length }} Preview Tersedia
              </span>
              <span class="hidden sm:inline text-slate-500">• Klik gambar untuk memperbesar (Zoom)</span>
            </div>
          </div>

          <!-- Featured Main Interactive Preview Viewer -->
          <div class="bg-[#111113] border border-white/[0.1] rounded-3xl p-4 sm:p-6 shadow-2xl mb-6">
            <!-- Active Image Container -->
            <div
              @click="openLightbox(currentScreenshot)"
              class="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[#0B0B0D] cursor-zoom-in group border border-white/[0.06] flex items-center justify-center"
            >
              <img
                :src="screenshotsList[currentScreenshot].url"
                :alt="screenshotsList[currentScreenshot].caption"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              <!-- Hover Zoom Banner Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <!-- Top Badge -->
                <div class="self-end">
                  <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0B0D]/90 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xl">
                    <Maximize2 class="w-3.5 h-3.5 text-primary" />
                    Buka Mode Zoom Fullscreen
                  </span>
                </div>

                <!-- Bottom Caption -->
                <div class="text-center">
                  <span class="text-xs font-mono text-primary uppercase font-bold tracking-wider mb-1 block">
                    Gambar {{ currentScreenshot + 1 }} dari {{ screenshotsList.length }}
                  </span>
                  <h3 class="text-lg font-bold text-white drop-shadow-md">
                    {{ screenshotsList[currentScreenshot].caption }}
                  </h3>
                </div>
              </div>

              <!-- Prev / Next Inline Quick Arrows -->
              <button
                v-if="screenshotsList.length > 1"
                @click.stop="prevScreenshot"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0B0D]/80 hover:bg-primary border border-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                title="Gambar Sebelumnya"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>
              <button
                v-if="screenshotsList.length > 1"
                @click.stop="nextScreenshot"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0B0D]/80 hover:bg-primary border border-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                title="Gambar Berikutnya"
              >
                <ChevronRight class="w-5 h-5" />
              </button>
            </div>

            <!-- Thumbnail Strip Row (Responsive on Mobile & Desktop) -->
            <div
              v-if="screenshotsList.length > 1"
              class="flex items-center gap-2 sm:gap-3 mt-4 overflow-x-auto pb-2 pt-1 px-1 justify-start sm:justify-center scroll-smooth no-scrollbar snap-x touch-pan-x"
            >
              <button
                v-for="(item, idx) in screenshotsList"
                :key="idx"
                @click="currentScreenshot = idx"
                class="relative w-20 sm:w-28 md:w-32 aspect-video rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                :class="[
                  currentScreenshot === idx
                    ? 'border-primary shadow-lg shadow-primary/25 scale-105 ring-1 ring-primary/40'
                    : 'border-white/[0.08] opacity-60 hover:opacity-100 hover:border-white/20'
                ]"
                :aria-label="`Pilih screenshot ${idx + 1}`"
              >
                <img :src="item.url" :alt="item.caption" class="w-full h-full object-cover" />
                <span
                  v-if="currentScreenshot === idx"
                  class="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-[#0B0B0D]"
                ></span>
              </button>
            </div>
          </div>

       
        </section>

        <!-- ================= STORY SECTION ================= -->
        <section v-if="project.story" class="mb-20">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <Lightbulb class="w-3.5 h-3.5" />
            Latar Belakang
          </div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-8">Cerita &amp; Dampak Proyek</h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Problem -->
            <div class="bg-[#111113] border border-red-500/20 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-red-500/40 transition-all">
              <span class="text-xs font-bold uppercase tracking-wider text-red-400">01. Masalah</span>
              <h3 class="text-lg font-bold text-white mt-2 mb-3">Apa yang Kami Temukan?</h3>
              <p class="text-sm text-slate-400 leading-relaxed">{{ project.story.problem || '-' }}</p>
            </div>

            <!-- Solution -->
            <div class="bg-[#111113] border border-blue-500/20 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-blue-500/40 transition-all">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-400">02. Solusi</span>
              <h3 class="text-lg font-bold text-white mt-2 mb-3">Bagaimana Memecahkannya?</h3>
              <p class="text-sm text-slate-400 leading-relaxed">{{ project.story.solution || '-' }}</p>
            </div>

            <!-- Impact -->
            <div class="bg-[#111113] border border-emerald-500/20 rounded-2xl p-6 sm:p-7 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">03. Dampak</span>
              <h3 class="text-lg font-bold text-white mt-2 mb-3">Hasil &amp; Manfaat</h3>
              <p class="text-sm text-slate-400 leading-relaxed">{{ project.story.impact || '-' }}</p>
            </div>
          </div>
        </section>

        <!-- ================= TIMELINE & SIDE INFO ================= -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          <!-- Timeline Column (7 Cols) -->
          <div class="lg:col-span-7">
            <section v-if="project.timeline?.length > 0" class="bg-[#111113] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
              <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2.5">
                <Calendar class="w-5 h-5 text-primary" />
                <span>Timeline Pengembangan</span>
              </h2>

              <div class="relative pl-4 border-l border-white/[0.1] ml-3 space-y-6">
                <div v-for="(item, index) in project.timeline" :key="index" class="relative pl-8 pb-4 last:pb-0">
                  <div class="absolute -left-[27px] top-1 w-8 h-8 rounded-xl bg-[#18181B] border border-white/[0.1] flex items-center justify-center text-xs font-bold text-primary">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <span class="text-xs font-mono font-bold text-primary uppercase tracking-wider">{{ item.date }}</span>
                    <h3 class="text-base font-bold text-white mt-0.5 mb-1">{{ item.title || item.event }}</h3>
                    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Side Info: Team & Tech (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-6">
            
            <!-- Team Card -->
            <section v-if="project.team?.length > 0" class="bg-[#111113] border border-white/[0.08] rounded-3xl p-6 sm:p-7">
              <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2.5">
                <Users class="w-4 h-4 text-primary" />
                <span>Tim Pengembang</span>
              </h2>

              <div class="space-y-3.5">
                <div v-for="member in project.team" :key="member.name" class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-[#18181B] border border-white/[0.08] flex items-center justify-center text-xs font-bold text-white">
                    {{ member.name?.charAt(0) || 'U' }}
                  </div>
                  <div>
                    <h4 class="text-sm font-bold text-white">{{ member.name }}</h4>
                    <p class="text-xs text-slate-500">{{ member.role }}</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Tech Stack Card -->
            <section class="bg-[#111113] border border-white/[0.08] rounded-3xl p-6 sm:p-7">
              <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2.5">
                <Wrench class="w-4 h-4 text-accent-orange" />
                <span>Tech Stack</span>
              </h2>

              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="text-xs font-mono text-slate-300 bg-[#18181B] border border-white/[0.08] px-3 py-1.5 rounded-lg"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Links -->
              <div class="pt-5 border-t border-white/[0.08] space-y-3">
                <a
                  v-if="project.github_url"
                  :href="project.github_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="m3-btn-secondary w-full justify-center !py-3 text-xs"
                >
                  <Github class="w-4 h-4" />
                  <span>Lihat Repository GitHub</span>
                </a>

                <a
                  v-if="project.demo_url"
                  :href="project.demo_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="m3-btn-primary w-full justify-center !py-3 text-xs font-bold shadow-lg shadow-primary/20"
                >
                  <ExternalLink class="w-4 h-4" />
                  <span>Buka Live Demo</span>
                </a>
              </div>
            </section>

            <!-- Demo Login Credentials Card (if available) -->
            <section
              v-if="project.login_credentials?.length > 0"
              class="bg-[#111113] border border-amber-500/30 rounded-3xl p-6 sm:p-7"
            >
              <h2 class="text-base font-bold text-white mb-1 flex items-center gap-2 text-amber-400">
                <KeyRound class="w-4 h-4" />
                <span>Akun Demo Login</span>
              </h2>
              <p class="text-xs text-slate-400 mb-4">Gunakan akun berikut untuk mencoba fitur aplikasi</p>

              <div class="space-y-3">
                <div
                  v-for="(cred, idx) in project.login_credentials"
                  :key="idx"
                  class="bg-[#18181B] border border-white/[0.08] rounded-xl p-3.5 space-y-2 text-xs"
                >
                  <div class="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                    {{ cred.label }}
                  </div>
                  <div class="flex items-center justify-between gap-2 font-mono">
                    <span class="text-slate-400">User:</span>
                    <code class="text-slate-200 bg-[#0B0B0D] px-2 py-0.5 rounded truncate">{{ cred.username }}</code>
                    <button
                      @click="copyToClipboard(cred.username, `user-${idx}`)"
                      class="text-slate-400 hover:text-white p-1"
                      title="Copy"
                    >
                      <Check v-if="copiedField === `user-${idx}`" class="w-3.5 h-3.5 text-emerald-400" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div class="flex items-center justify-between gap-2 font-mono">
                    <span class="text-slate-400">Pass:</span>
                    <code class="text-slate-200 bg-[#0B0B0D] px-2 py-0.5 rounded truncate">
                      {{ showPasswords[idx] ? cred.password : '••••••••' }}
                    </code>
                    <div class="flex items-center gap-1">
                      <button @click="toggleShowPassword(idx)" class="text-slate-400 hover:text-white p-1">
                        <Eye v-if="!showPasswords[idx]" class="w-3.5 h-3.5" />
                        <EyeOff v-else class="w-3.5 h-3.5" />
                      </button>
                      <button
                        @click="copyToClipboard(cred.password, `pass-${idx}`)"
                        class="text-slate-400 hover:text-white p-1"
                        title="Copy"
                      >
                        <Check v-if="copiedField === `pass-${idx}`" class="w-3.5 h-3.5 text-emerald-400" />
                        <Copy v-else class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>

    </div>

    <!-- ================= FULLSCREEN INTERACTIVE ZOOM LIGHTBOX MODAL ================= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isLightboxOpen && screenshotsList.length > 0"
          class="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-4 sm:p-6 select-none"
          @click="closeLightbox"
        >
          <!-- Top Toolbar -->
          <div class="flex items-center justify-between gap-4 z-20" @click.stop>
            <!-- Left Info -->
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full bg-[#18181B] border border-white/15 text-xs font-mono font-semibold text-white">
                {{ currentScreenshot + 1 }} / {{ screenshotsList.length }}
              </span>
              <span class="hidden sm:inline text-xs text-slate-300 font-medium truncate max-w-sm">
                {{ screenshotsList[currentScreenshot]?.caption }}
              </span>
            </div>

            <!-- Right Controls: Zoom In / Out / Reset / Close -->
            <div class="flex items-center gap-2">
              <div class="flex items-center bg-[#18181B] border border-white/15 rounded-xl p-1 gap-1">
                <button
                  @click="zoomOut"
                  class="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                  :disabled="zoomLevel <= 1"
                  title="Zoom Out (-)"
                >
                  <ZoomOut class="w-4 h-4" />
                </button>
                <button
                  @click="resetZoom"
                  class="px-2 py-1 text-xs font-mono font-bold text-primary hover:bg-white/10 rounded-lg transition-colors"
                  title="Reset Zoom (0)"
                >
                  {{ Math.round(zoomLevel * 100) }}%
                </button>
                <button
                  @click="zoomIn"
                  class="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                  :disabled="zoomLevel >= 3"
                  title="Zoom In (+)"
                >
                  <ZoomIn class="w-4 h-4" />
                </button>
              </div>

              <button
                @click="toggleZoom"
                class="p-2.5 rounded-xl bg-[#18181B] border border-white/15 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                :title="zoomLevel === 1 ? 'Zoom 2x' : 'Reset Zoom'"
              >
                <Maximize2 v-if="zoomLevel === 1" class="w-4 h-4" />
                <Minimize2 v-else class="w-4 h-4" />
              </button>

              <button
                @click="closeLightbox"
                class="p-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 border border-red-500/40 text-white transition-colors"
                title="Tutup (Esc)"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Main Zoom Stage / Canvas -->
          <div
            class="relative flex-1 flex items-center justify-center overflow-hidden my-4"
            @click.self="closeLightbox"
          >
            <!-- Previous Button -->
            <button
              v-if="screenshotsList.length > 1"
              @click.stop="prevScreenshot"
              class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#18181B]/80 hover:bg-primary border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-2xl"
              title="Sebelumnya (Arrow Left)"
            >
              <ChevronLeft class="w-6 h-6" />
            </button>

            <!-- Next Button -->
            <button
              v-if="screenshotsList.length > 1"
              @click.stop="nextScreenshot"
              class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#18181B]/80 hover:bg-primary border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-2xl"
              title="Berikutnya (Arrow Right)"
            >
              <ChevronRight class="w-6 h-6" />
            </button>

            <!-- Zoomable Image Viewport -->
            <div
              class="max-w-full max-h-[75vh] flex items-center justify-center transition-transform duration-200 ease-out"
              :style="{
                transform: `scale(${zoomLevel})`,
                cursor: zoomLevel > 1 ? 'grab' : 'zoom-in'
              }"
              @dblclick.stop="toggleZoom"
              @click.stop
            >
              <img
                :src="screenshotsList[currentScreenshot]?.url"
                :alt="screenshotsList[currentScreenshot]?.caption"
                class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-auto"
                draggable="false"
              />
            </div>
          </div>

          <!-- Bottom Caption & Thumbnail Selector Strip -->
          <div class="z-20 flex flex-col items-center gap-3 text-center" @click.stop>
            <p class="text-sm font-medium text-slate-300 max-w-2xl px-4">
              {{ screenshotsList[currentScreenshot]?.caption }}
            </p>

            <!-- Bottom Mini Thumbnail Strip (Responsive on Mobile & Desktop) -->
            <div
              v-if="screenshotsList.length > 1"
              class="flex items-center justify-start sm:justify-center gap-2 max-w-full overflow-x-auto py-1 px-3 scroll-smooth no-scrollbar snap-x"
            >
              <button
                v-for="(item, idx) in screenshotsList"
                :key="idx"
                @click="currentScreenshot = idx; resetZoom()"
                class="w-16 sm:w-20 aspect-video rounded-lg overflow-hidden shrink-0 border-2 transition-all snap-center focus:outline-none"
                :class="[
                  currentScreenshot === idx
                    ? 'border-primary scale-110 shadow-lg shadow-primary/30'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                ]"
              >
                <img :src="item.url" :alt="item.caption" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
