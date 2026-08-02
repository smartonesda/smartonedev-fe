<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Menu, X, Sparkles } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const route = useRoute()
const router = useRouter()

// True kalau sedang di halaman home (/)
const isHome = computed(() => route.path === '/')

// Anchor links for Home landing page ONLY
const anchorLinks = [
  { hash: 'beranda', label: 'Beranda' },
  { hash: 'tentang', label: 'Tentang' },
  { hash: 'kolaborasi', label: 'Kolaborasi' },
]

const anchorHref = (hash) => isHome.value ? `#${hash}` : `/#${hash}`

const activeSection = ref('beranda')
const isKaryaActive = computed(() => route.path === '/karya')
const isTrackerActive = computed(() => route.path === '/tracker')
const isLearnActive = computed(() => route.path === '/learn')

let ticking = false
const handleScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    isScrolled.value = window.scrollY > 20

    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      const sectionTop = section.offsetTop
      if (window.scrollY >= sectionTop - 200) {
        activeSection.value = section.getAttribute('id')
      }
    })

    if (window.scrollY < 200) {
      activeSection.value = 'beranda'
    }
    ticking = false
  })
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav id="navbar" class="fixed w-full z-50 transition-all duration-300" :class="[
    isScrolled
      ? 'bg-dark-950/90 backdrop-blur-md shadow-lg py-2'
      : 'bg-transparent py-4'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <img src="/assets/images/dark-removebg-preview.png" alt="SmartOneDev Logo" class="sm:w-20 w-16 object-contain"
          fetchpriority="high" />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8 font-medium">
        <a
          v-for="link in anchorLinks"
          :key="link.hash"
          :href="anchorHref(link.hash)"
          class="nav-link"
          :class="{ active: isHome && activeSection === link.hash }"
        >
          {{ link.label }}
        </a>
        <RouterLink
          to="/karya"
          class="nav-link"
          :class="{ active: isKaryaActive }"
        >
          Karya
        </RouterLink>
        <RouterLink
          to="/learn"
          class="nav-link"
          :class="{ active: isLearnActive }"
        >
          Learn
        </RouterLink>
        <RouterLink
          to="/tracker"
          class="nav-link"
          :class="{ active: isTrackerActive }"
        >
          Tracker Lomba
        </RouterLink>
        <a href="https://www.instagram.com/smkantartika1sda/?hl=id" target="_blank"
          class="bg-gradient-to-r from-primary to-accent-gold hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center gap-2">
          <Sparkles class="w-4 h-4" />
          Gabung
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden text-white p-2">
        <Menu v-if="!isMobileMenuOpen" class="w-7 h-7" />
        <X v-else class="w-7 h-7" />
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div v-show="isMobileMenuOpen"
      class="md:hidden absolute w-full bg-dark-900/95 backdrop-blur-xl border-b border-dark-800 p-4 flex flex-col gap-4 shadow-2xl">
      <a
        v-for="link in anchorLinks"
        :key="link.hash"
        :href="anchorHref(link.hash)"
        @click="closeMobileMenu"
        class="text-white p-2 hover:bg-dark-800 rounded-lg"
        :class="{ 'text-primary': isHome && activeSection === link.hash }"
      >
        {{ link.label }}
      </a>
      <RouterLink
        to="/karya"
        @click="closeMobileMenu"
        class="text-white p-2 hover:bg-dark-800 rounded-lg"
        :class="{ 'text-primary': isKaryaActive }"
      >
        Karya
      </RouterLink>
      <RouterLink
        to="/learn"
        @click="closeMobileMenu"
        class="text-white p-2 hover:bg-dark-800 rounded-lg"
        :class="{ 'text-primary': isLearnActive }"
      >
        Learn
      </RouterLink>
      <RouterLink
        to="/tracker"
        @click="closeMobileMenu"
        class="text-white p-2 hover:bg-dark-800 rounded-lg"
        :class="{ 'text-primary': isTrackerActive }"
      >
        Tracker Lomba
      </RouterLink>
      <a href="https://www.instagram.com/smkantartika1sda/?hl=id" target="_blank"
        class="bg-gradient-to-r from-primary to-accent-gold hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center gap-2 justify-center">
        <Sparkles class="w-4 h-4" />
        Gabung
      </a>
    </div>
  </nav>
</template>
