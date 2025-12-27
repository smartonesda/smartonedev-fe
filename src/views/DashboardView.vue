<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  LayoutDashboard, 
  Images, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Home,
  Tag
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(true)
const isMobileMenuOpen = ref(false)

const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    route: '/dashboard',
    active: computed(() => router.currentRoute.value.path === '/dashboard')
  },
  { 
    icon: Images, 
    label: 'Galeri Karya', 
    route: '/dashboard/gallery',
    active: computed(() => router.currentRoute.value.path.startsWith('/dashboard/gallery'))
  },
  { 
    icon: Tag, 
    label: 'Kelola Kategori', 
    route: '/dashboard/categories',
    active: computed(() => router.currentRoute.value.path === '/dashboard/categories')
  }
]

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (route) => {
  router.push(route)
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="h-screen bg-dark-950 flex overflow-hidden">
    <!-- Sidebar (Desktop) - Fixed -->
    <aside 
      class="hidden lg:flex flex-col bg-dark-900 border-r border-dark-800 transition-all duration-300 h-screen sticky top-0"
      :class="isSidebarOpen ? 'w-64' : 'w-20'"
    >
      <!-- Logo -->
      <div class="p-4 border-b border-dark-800 flex items-center justify-between">
        <a href="/" class="flex items-center gap-3" v-if="isSidebarOpen">
          <img 
            src="/assets/images/dark-removebg-preview.png" 
            alt="SmartOneDev" 
            class="w-10 h-10 object-contain"
          />
          <span class="font-bold text-white">SmartOne</span>
        </a>
        <img 
          v-else
          src="/assets/images/dark-removebg-preview.png" 
          alt="SmartOneDev" 
          class="w-10 h-10 object-contain mx-auto"
        />
        <button 
          @click="toggleSidebar"
          class="text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight 
            class="w-5 h-5 transition-transform" 
            :class="{ 'rotate-180': isSidebarOpen }"
          />
        </button>
      </div>
      
      <!-- Menu Items -->
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.route">
            <button
              @click="navigateTo(item.route)"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              :class="[
                item.active.value 
                  ? 'bg-primary text-white' 
                  : 'text-slate-400 hover:bg-dark-800 hover:text-white'
              ]"
            >
              <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
              <span v-if="isSidebarOpen" class="font-medium">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <!-- User Section -->
      <div class="p-4 border-t border-dark-800">
        <div class="flex items-center gap-3 mb-4" v-if="isSidebarOpen">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-gold flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p class="text-white font-medium text-sm">Admin</p>
            <p class="text-slate-500 text-xs">smartonedev</p>
          </div>
        </div>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut class="w-5 h-5 flex-shrink-0" />
          <span v-if="isSidebarOpen" class="font-medium">Logout</span>
        </button>
      </div>
    </aside>
    
    <!-- Mobile Header -->
    <div class="lg:hidden fixed top-0 left-0 right-0 z-50 bg-dark-900 border-b border-dark-800">
      <div class="flex items-center justify-between p-4">
        <a href="/" class="flex items-center gap-2">
          <img 
            src="/assets/images/dark-removebg-preview.png" 
            alt="SmartOneDev" 
            class="w-8 h-8 object-contain"
          />
          <span class="font-bold text-white">SmartOne</span>
        </a>
        <button 
          @click="toggleMobileMenu"
          class="text-white p-2"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen"
        class="bg-dark-900 border-t border-dark-800 p-4"
      >
        <nav class="space-y-2">
          <button
            v-for="item in menuItems" 
            :key="item.route"
            @click="navigateTo(item.route)"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
            :class="[
              item.active.value 
                ? 'bg-primary text-white' 
                : 'text-slate-400 hover:bg-dark-800 hover:text-white'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span class="font-medium">{{ item.label }}</span>
          </button>
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut class="w-5 h-5" />
            <span class="font-medium">Logout</span>
          </button>
        </nav>
      </div>
    </div>
    
    <!-- Main Content - Scrollable -->
    <main class="flex-1 lg:ml-0 mt-16 lg:mt-0 h-screen overflow-y-auto">
      <div class="p-6 lg:p-8">
        <!-- Breadcrumb -->
        <div class="mb-8 flex items-center gap-2 text-sm text-slate-400">
          <Home class="w-4 h-4" />
          <ChevronRight class="w-4 h-4" />
          <span class="text-white">{{ router.currentRoute.value.meta?.title || 'Dashboard' }}</span>
        </div>
        
        <!-- Page Content -->
        <router-view />
      </div>
    </main>
  </div>
</template>
