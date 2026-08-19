<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import {
  Layers,
  ArrowRight,
  Star,
  Users,
  Eye,
  ExternalLink,
  Github,
  Globe,
  Smartphone,
  Gamepad2,
  Cpu,
  Layout,
  BookOpen
} from 'lucide-vue-next'
import { useProjectStore } from '@/modules/karya/stores/useProjectStore.js'

const router = useRouter()
const projectStore = useProjectStore()

// Fallback curated showcase if API is offline
const fallbackProjects = [
  {
    id: 1,
    slug: 'smartone-learning-portal',
    title: 'SmartOne Learning Portal',
    description: 'Platform manajemen pembelajaran daring terintegrasi untuk siswa RPL dengan fitur live coding playground, submission tugas otomatis, dan tracking kompetensi siswa.',
    category: 'Web App',
    image: null,
    bg_gradient: 'from-red-600 via-rose-700 to-zinc-900',
    tech: ['Vue.js 3', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Pinia'],
    author: 'Tim RPL Antartika',
    stars: 48,
    collab_open: true,
    featured: true,
    icon: 'globe'
  },
  {
    id: 2,
    slug: 'iot-smart-presensi-rfid',
    title: 'Smart Presensi RFID & IoT',
    description: 'Sistem absensi cerdas berbasis ESP32 dan RFID reader terintegrasi dengan bot Telegram dan dashboard real-time wali murid.',
    category: 'IoT',
    image: null,
    bg_gradient: 'from-amber-600 via-orange-700 to-zinc-900',
    tech: ['ESP32', 'C++', 'MQTT', 'Express.js'],
    author: 'Ahmad & Tim IoT',
    stars: 35,
    collab_open: true,
    featured: false,
    icon: 'cpu'
  },
  {
    id: 3,
    slug: 'antartika-mobile-guide',
    title: 'Antartika Mobile Student App',
    description: 'Aplikasi mobile penunjang informasi akademik, jadwal mata pelajaran, dan direktori karya siswa SMKS Antartika 1.',
    category: 'Mobile',
    image: null,
    bg_gradient: 'from-blue-600 via-indigo-700 to-zinc-900',
    tech: ['Flutter', 'Dart', 'REST API', 'Firebase'],
    author: 'Fajar Kurniawan',
    stars: 29,
    collab_open: false,
    featured: false,
    icon: 'smartphone'
  }
]

const displayProjects = computed(() => {
  if (projectStore.projects && projectStore.projects.length > 0) {
    return projectStore.projects
  }
  return fallbackProjects
})

const featuredProject = computed(() => {
  return displayProjects.value.find(p => p.featured) || displayProjects.value[0] || fallbackProjects[0]
})

const secondaryProjects = computed(() => {
  const feat = featuredProject.value
  return displayProjects.value.filter(p => p.id !== feat?.id && p.slug !== feat?.slug).slice(0, 2)
})

const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  'gamepad-2': Gamepad2,
  cpu: Cpu,
  layout: Layout,
  'book-open': BookOpen
}

const getIcon = (iconName) => iconMap[iconName] || Globe

const getCategoryColor = (category) => {
  if (category === 'IoT') return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  if (category === 'Mobile') return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
  if (category === 'Game') return 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  return 'text-primary bg-primary/10 border-primary/20'
}

const navigateToDetail = (project) => {
  if (project) {
    sessionStorage.setItem('currentProject', JSON.stringify(project))
    router.push(`/project/${project.slug || project.id}`)
  }
}

onMounted(async () => {
  if (projectStore.projects.length === 0) {
    try {
      await projectStore.fetchProjects()
    } catch (e) {
      // Handled via fallback
    }
  }
})
</script>

<template>
  <section id="karya-preview" class="py-24 sm:py-32 relative bg-[#0B0B0D] border-t border-white/[0.06]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header with Direct Action Link -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" data-aos="fade-up">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-primary uppercase tracking-wider mb-4">
            <Layers class="w-3.5 h-3.5" />
            Galeri Portofolio
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Karya Unggulan <span class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">Siswa RPL</span>
          </h2>
          <p class="text-base text-slate-400 leading-relaxed font-normal">
            Hasil eksplorasi, riset teknologi, dan inovasi nyata yang dibangun oleh siswa SMKS Antartika 1 Sidoarjo untuk memecahkan persoalan dunia nyata.
          </p>
        </div>

        <RouterLink
          to="/karya"
          class="m3-btn-secondary shrink-0 self-start md:self-auto group"
        >
          <span>Lihat Semua Karya</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>

      <!-- Bento / Editorial Showcase Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <!-- Main Featured Project (Prominent Left/Top Card - 7 Cols) -->
        <div
          v-if="featuredProject"
          data-aos="fade-up"
          data-aos-delay="100"
          @click="navigateToDetail(featuredProject)"
          class="lg:col-span-7 group bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl overflow-hidden shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          <!-- Project Visual Banner -->
          <div :class="`relative h-64 sm:h-80 w-full bg-gradient-to-br ${featuredProject.bg_gradient || 'from-red-600 to-zinc-900'} overflow-hidden flex items-center justify-center`">
            <img
              v-if="featuredProject.image"
              :src="featuredProject.image"
              :alt="featuredProject.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <template v-else>
              <div class="absolute inset-0 opacity-15 dev-grid"></div>
              <component
                :is="getIcon(featuredProject.icon)"
                class="w-24 h-24 text-white/40 transition-transform duration-500 group-hover:scale-110"
              />
            </template>

            <!-- Floating Badges on Banner -->
            <div class="absolute top-4 left-4 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0B0B0D]/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
                ★ Pilihan Utama
              </span>
              <span :class="`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg ${getCategoryColor(featuredProject.category)}`">
                {{ featuredProject.category }}
              </span>
            </div>

            <div v-if="featuredProject.collab_open" class="absolute top-4 right-4">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 shadow-lg">
                <Users class="w-3.5 h-3.5" />
                Open Collab
              </span>
            </div>

            <!-- Hover Preview Overlay -->
            <div class="absolute inset-0 bg-[#0B0B0D]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center">
              <span class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#0B0B0D] font-bold text-sm shadow-2xl transition-transform duration-200 group-hover:scale-105">
                <Eye class="w-4 h-4" />
                Explore Project
              </span>
            </div>
          </div>

          <!-- Featured Project Details -->
          <div class="p-6 sm:p-8 flex flex-col flex-1 justify-between">
            <div>
              <div class="flex items-center justify-between gap-4 mb-3">
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-primary transition-colors">
                  {{ featuredProject.title }}
                </h3>
                <div class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold shrink-0">
                  <Star class="w-3.5 h-3.5 fill-current" />
                  <span>{{ featuredProject.stars || 0 }}</span>
                </div>
              </div>

              <p class="text-sm sm:text-base text-slate-400 mb-6 leading-relaxed line-clamp-3">
                {{ featuredProject.description }}
              </p>

              <!-- Tech Stack Tags -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in featuredProject.tech?.slice(0, 5)"
                  :key="tech"
                  class="text-xs font-mono px-3 py-1 rounded-lg bg-[#18181B] border border-white/[0.08] text-slate-300"
                >
                  {{ tech }}
                </span>
                <span v-if="featuredProject.tech?.length > 5" class="text-xs font-mono text-slate-500 self-center">
                  +{{ featuredProject.tech.length - 5 }}
                </span>
              </div>
            </div>

            <!-- Footer Bar -->
            <div class="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
              <div class="flex items-center gap-2 font-medium">
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent-orange flex items-center justify-center text-white font-bold text-[10px]">
                  {{ featuredProject.author?.charAt(0) || 'R' }}
                </div>
                <span>{{ featuredProject.author }}</span>
              </div>
              
              <span class="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Lihat Detail Project &rarr;
              </span>
            </div>
          </div>
        </div>

        <!-- Secondary Projects Column (5 Cols, 2 Stacked Cards) -->
        <div class="lg:col-span-5 flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
          <div
            v-for="proj in secondaryProjects"
            :key="proj.id"
            @click="navigateToDetail(proj)"
            class="group bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl p-6 sm:p-7 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between flex-1"
          >
            <div>
              <!-- Top Row: Category & Stars -->
              <div class="flex items-center justify-between gap-2 mb-3">
                <span :class="`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(proj.category)}`">
                  {{ proj.category }}
                </span>
                <div class="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star class="w-3.5 h-3.5 fill-current" />
                  <span>{{ proj.stars || 0 }}</span>
                </div>
              </div>

              <!-- Title & Description -->
              <h4 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {{ proj.title }}
              </h4>
              <p class="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed line-clamp-2">
                {{ proj.description }}
              </p>

              <!-- Tech Tags -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                <span
                  v-for="tech in proj.tech?.slice(0, 3)"
                  :key="tech"
                  class="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[#18181B] border border-white/[0.06] text-slate-300"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Footer Author & Action -->
            <div class="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span class="font-medium truncate max-w-[140px]">{{ proj.author }}</span>
              <span class="text-slate-300 font-semibold group-hover:text-primary flex items-center gap-1 transition-colors">
                Detail &rarr;
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
