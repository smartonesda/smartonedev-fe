<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Menu, X, Sparkles, ExternalLink, BookOpen, Layers, Trophy, Code2 } from 'lucide-vue-next'

const isScrolled = ref(false)
const isVisible = ref(true)
const isMobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()

// True if on home page (/)
const isHome = computed(() => route.path === '/')

const anchorLinks = [
  { hash: 'beranda', label: 'Beranda' },
  { hash: 'tentang', label: 'Tentang' },
  { hash: 'kolaborasi', label: 'Kolaborasi' },
]

const anchorHref = (hash) => (isHome.value ? `#${hash}` : `/#${hash}`)

const activeSection = ref('beranda')
const isKaryaActive = computed(() => route.path.startsWith('/karya') || route.path.startsWith('/project'))
const isTrackerActive = computed(() => route.path === '/tracker')
const isLearnActive = computed(() => route.path === '/learn')

let lastScrollY = 0
let ticking = false

const handleScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const currentScrollY = Math.max(0, window.scrollY)

    isScrolled.value = currentScrollY > 20

    // Smart Scroll-Up to Show & Scroll-Down to Hide
    if (isMobileMenuOpen.value) {
      isVisible.value = true
    } else if (currentScrollY <= 80) {
      isVisible.value = true
    } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
      // User is scrolling DOWN -> smoothly hide navbar
      isVisible.value = false
    } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 6) {
      // User is scrolling UP -> smoothly reveal navbar
      isVisible.value = true
    }

    lastScrollY = currentScrollY

    // Active section detection
    if (isHome.value) {
      const sections = ['kolaborasi', 'tentang', 'beranda']
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 240) {
            activeSection.value = sectionId
            break
          }
        }
      }
    }

    ticking = false
  })
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    isVisible.value = true
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    id="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
    :class="[
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none',
      isScrolled
        ? 'bg-[#0B0B0D]/90 backdrop-blur-xl shadow-lg shadow-black/30 py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Logo & School Brand -->
      <a href="/" class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
        <div class="relative flex items-center justify-center">
          <img
            src="/assets/images/dark-removebg-preview.png"
            alt="SmartOneDev Logo"
            class="h-12 sm:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            fetchpriority="high"
          />
        </div>
        <div class="hidden sm:flex flex-col">
          <span class="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
            SmartOne<span class="text-primary font-extrabold">Dev</span>
          </span>
          <span class="text-[10px] font-medium text-slate-400 -mt-1 tracking-wider uppercase">
            SMKS Antartika 1 Sidoarjo
          </span>
        </div>
      </a>

      <!-- Desktop Menu Items (Sleek pill container) -->
      <nav class="hidden lg:flex items-center gap-1 bg-[#18181B]/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/[0.08]" aria-label="Main Navigation">
        <a
          v-for="link in anchorLinks"
          :key="link.hash"
          :href="anchorHref(link.hash)"
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="[
            isHome && activeSection === link.hash
              ? 'bg-primary/15 text-primary font-semibold border border-primary/25 shadow-sm shadow-primary/10'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          ]"
        >
          {{ link.label }}
        </a>

        <div class="h-4 w-px bg-white/10 mx-1"></div>

        <RouterLink
          to="/karya"
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="[
            isKaryaActive
              ? 'bg-primary/15 text-primary font-semibold border border-primary/25 shadow-sm shadow-primary/10'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          ]"
        >
          Karya
        </RouterLink>

        <RouterLink
          to="/learn"
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="[
            isLearnActive
              ? 'bg-primary/15 text-primary font-semibold border border-primary/25 shadow-sm shadow-primary/10'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          ]"
        >
          Learn
        </RouterLink>

        <RouterLink
          to="/tracker"
          class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="[
            isTrackerActive
              ? 'bg-primary/15 text-primary font-semibold border border-primary/25 shadow-sm shadow-primary/10'
              : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
          ]"
        >
          Tracker
        </RouterLink>
      </nav>

      <!-- Desktop Right Action -->
      <div class="hidden lg:flex items-center gap-3">
        <a
          href="https://github.com/smartonesda"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-slate-400 hover:text-white hover:bg-[#18181B] rounded-xl border border-transparent hover:border-white/[0.08] transition-all"
          title="GitHub Repository"
          aria-label="GitHub Repository SmartOneDev"
        >
          <Code2 class="w-4 h-4" />
        </a>

        <a
          href="https://www.instagram.com/smkantartika1sda/?hl=id"
          target="_blank"
          rel="noopener noreferrer"
          class="m3-btn-primary !py-2 !px-4 !text-xs !rounded-full group"
        >
          <Sparkles class="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
          <span>Gabung</span>
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-2 lg:hidden">
        <a
          href="https://www.instagram.com/smkantartika1sda/?hl=id"
          target="_blank"
          rel="noopener noreferrer"
          class="m3-btn-primary !py-1.5 !px-3 !text-xs !rounded-full"
        >
          <Sparkles class="w-3 h-3" />
          <span>Gabung</span>
        </a>

        <button
          @click="toggleMobileMenu"
          class="p-2 text-slate-300 hover:text-white rounded-xl bg-[#18181B] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle Menu Navigation"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Overlay & Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed inset-x-0 top-[60px] bg-[#0B0B0D]/95 backdrop-blur-2xl shadow-2xl p-5 max-h-[calc(100vh-65px)] overflow-y-auto"
      >
        <div class="flex flex-col gap-1.5 mb-6">
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-1">
            Navigasi
          </span>
          <a
            v-for="link in anchorLinks"
            :key="link.hash"
            :href="anchorHref(link.hash)"
            @click="closeMobileMenu"
            class="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all"
            :class="[
              isHome && activeSection === link.hash
                ? 'bg-primary/15 text-primary font-semibold border border-primary/25'
                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
            ]"
          >
            <span>{{ link.label }}</span>
          </a>

          <div class="h-px bg-white/[0.06] my-2"></div>

          <RouterLink
            to="/karya"
            @click="closeMobileMenu"
            class="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all"
            :class="[
              isKaryaActive
                ? 'bg-primary/15 text-primary font-semibold border border-primary/25'
                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
            ]"
          >
            <span class="flex items-center gap-2.5">
              <Layers class="w-4 h-4 text-primary" />
              Karya Siswa
            </span>
          </RouterLink>

          <RouterLink
            to="/learn"
            @click="closeMobileMenu"
            class="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all"
            :class="[
              isLearnActive
                ? 'bg-primary/15 text-primary font-semibold border border-primary/25'
                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
            ]"
          >
            <span class="flex items-center gap-2.5">
              <BookOpen class="w-4 h-4 text-accent-gold" />
              Learn Center
            </span>
          </RouterLink>

          <RouterLink
            to="/tracker"
            @click="closeMobileMenu"
            class="flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all"
            :class="[
              isTrackerActive
                ? 'bg-primary/15 text-primary font-semibold border border-primary/25'
                : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
            ]"
          >
            <span class="flex items-center gap-2.5">
              <Trophy class="w-4 h-4 text-yellow-500" />
              Tracker Lomba
            </span>
          </RouterLink>
        </div>

        <div class="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
          <a
            href="https://github.com/smartonesda"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-btn-secondary w-full justify-center !py-2.5 text-xs"
          >
            <Code2 class="w-4 h-4" />
            <span>GitHub Repository</span>
          </a>
          <a
            href="https://www.instagram.com/smkantartika1sda/?hl=id"
            target="_blank"
            rel="noopener noreferrer"
            class="m3-btn-primary w-full justify-center !py-2.5 text-xs"
          >
            <Sparkles class="w-4 h-4" />
            <span>Gabung Komunitas</span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
