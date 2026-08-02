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
  // Check if there is a previous history state within the SPA to go back to.
  // Otherwise, default to the root URL (/) to prevent navigating out of the site.
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push('/')
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
              <h3 class="text-xl font-bold text-white mt-2 mb-4">Bagaimana Kami Memecahkannya?</h3>
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

        <!-- Timeline & Team -->
        <div class="grid lg:grid-cols-3 gap-8 mb-20">
          <!-- Timeline -->
          <div class="lg:col-span-2">
            <section v-if="project.timeline?.length > 0" class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Calendar class="w-5 h-5 text-primary" />
                </span>
                Timeline Development
              </h2>

              <div class="relative pl-4 border-l border-dark-700 ml-4 space-y-8">
                <div v-for="(item, index) in project.timeline" :key="index" class="relative pl-12 pb-8 last:pb-0">
                  <!-- Timeline dot -->
                  <div
                    class="absolute left-[-25px] top-1.5 w-12 h-12 rounded-xl bg-dark-800 border-2 border-dark-700 flex items-center justify-center text-white font-bold group-hover:border-primary transition-colors">
                    {{ index + 1 }}
                  </div>

                  <div>
                    <span class="text-xs font-bold text-primary uppercase tracking-wider">{{ item.date }}</span>
                    <h3 class="text-lg font-bold text-white mt-1 mb-2">{{ item.title }}</h3>
                    <p class="text-slate-400 text-sm leading-relaxed">{{ item.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Side info (Team & Tech) -->
          <div class="space-y-8">
            <!-- Team -->
            <section v-if="project.team?.length > 0" class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
              <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users class="w-5 h-5 text-primary" />
                </span>
                Tim Pengembang
              </h2>

              <div class="space-y-4">
                <div v-for="member in project.team" :key="member.name" class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-gradient-to-tr from-dark-750 to-dark-800 flex items-center justify-center text-white font-bold border border-dark-700">
                    {{ member.name.charAt(0) }}
                  </div>
                  <div>
                    <h4 class="text-white font-bold text-sm">{{ member.name }}</h4>
                    <p class="text-xs text-slate-500">{{ member.role }}</p>
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

            <!-- Demo Login Credentials -->
            <section v-if="project.login_credentials?.length > 0"
              class="bg-dark-900 border border-amber-900/40 rounded-2xl p-8 relative overflow-hidden">
              <!-- Decorative glow -->
              <div class="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none">
              </div>

              <h2 class="text-xl font-bold text-white mb-1 flex items-center gap-3">
                <span class="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <KeyRound class="w-5 h-5 text-amber-400" />
                </span>
                Demo Login
              </h2>
              <p class="text-slate-500 text-xs mb-6 ml-13">Gunakan akun berikut untuk mencoba demo</p>

              <div class="space-y-4">
                <div v-for="(cred, idx) in project.login_credentials" :key="idx"
                  class="bg-dark-800 border border-dark-700 rounded-xl p-4 space-y-3">
                  <!-- Label -->
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">
                      <KeyRound class="w-3 h-3" />
                      {{ cred.label }}
                    </span>
                    <span v-if="cred.note" class="text-xs text-slate-500 italic truncate">{{ cred.note }}</span>
                  </div>

                  <!-- Username row -->
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-slate-500 w-16 shrink-0 font-medium">User</span>
                    <div class="flex-1 flex items-center gap-1.5 min-w-0">
                      <code
                        class="flex-1 text-xs text-slate-200 font-mono bg-dark-900/70 px-2.5 py-1.5 rounded-lg truncate border border-dark-700">
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
                      <code
                        class="flex-1 text-xs text-slate-200 font-mono bg-dark-900/70 px-2.5 py-1.5 rounded-lg truncate border border-dark-700">
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
