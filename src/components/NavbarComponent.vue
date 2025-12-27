<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, Sparkles } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#karya', label: 'Karya' },
  { href: '#kolaborasi', label: 'Kolaborasi' }
]

const activeSection = ref('beranda')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
  
  // Scroll spy
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
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    id="navbar"
    class="fixed w-full z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-dark-950/90 backdrop-blur-md shadow-lg py-2' 
        : 'bg-transparent py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2 group">
        <img
          src="/assets/images/dark-removebg-preview.png"
          alt="SmartOneDev Logo"
          class="sm:w-20 w-16 object-contain"
        />
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8 font-medium">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :class="{ active: activeSection === link.href.slice(1) }"
        >
          {{ link.label }}
        </a>
        <a
          href="https://www.instagram.com/smkantartika1sda/?hl=id"
          target="_blank"
          class="bg-gradient-to-r from-primary to-accent-gold hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center gap-2"
        >
          <Sparkles class="w-4 h-4" />
          Gabung
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-white p-2"
      >
        <Menu v-if="!isMobileMenuOpen" class="w-7 h-7" />
        <X v-else class="w-7 h-7" />
      </button>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden absolute w-full bg-dark-900/95 backdrop-blur-xl border-b border-dark-800 p-4 flex flex-col gap-4 shadow-2xl"
    >
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        @click="closeMobileMenu"
        class="text-white p-2 hover:bg-dark-800 rounded-lg"
        :class="{ 'text-primary': activeSection === link.href.slice(1) }"
      >
        {{ link.label }}
      </a>
      <a
        href="https://www.instagram.com/smkantartika1sda/?hl=id"
        target="_blank"
        class="bg-gradient-to-r from-primary to-accent-gold hover:opacity-90 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-95 flex items-center gap-2 justify-center"
      >
        <Sparkles class="w-4 h-4" />
        Gabung
      </a>
    </div>
  </nav>
</template>
