<script setup>
import { Users, FolderGit, GitCommit, Trophy, ArrowUpRight } from 'lucide-vue-next'

const stats = [
  {
    icon: Users,
    value: '500+',
    label: 'Siswa Aktif',
    description: 'Komunitas developer RPL lintas angkatan',
    color: 'text-primary',
    bgBadge: 'bg-primary/10'
  },
  {
    icon: FolderGit,
    value: '120+',
    label: 'Project Nyata',
    description: 'Aplikasi Web, Mobile, IoT & Game',
    color: 'text-accent-orange',
    bgBadge: 'bg-accent-orange/10'
  },
  {
    icon: GitCommit,
    value: '5K+',
    label: 'Git Commits',
    description: 'Aktivitas pengembangan & open source',
    color: 'text-emerald-400',
    bgBadge: 'bg-emerald-400/10'
  },
  {
    icon: Trophy,
    value: '15+',
    label: 'Penghargaan',
    description: 'Prestasi lomba IT & kompetisi vokasi',
    color: 'text-yellow-400',
    bgBadge: 'bg-yellow-400/10'
  }
]
</script>

<template>
  <section class="py-16 relative border-b border-white/[0.06] bg-[#0B0B0D]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Stats Container Bar with Subtle Surface & Separators -->
      <div
        data-aos="fade-up"
        class="bg-[#111113] border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-black/40"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="flex flex-col justify-between lg:px-6 first:lg:pl-2 last:lg:pr-2 group"
          >
            <!-- Icon & Label Row -->
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2.5">
                <div :class="`w-9 h-9 rounded-xl ${stat.bgBadge} flex items-center justify-center border border-white/[0.06] transition-transform duration-300 group-hover:scale-110`">
                  <component :is="stat.icon" :class="`w-4 h-4 ${stat.color}`" />
                </div>
                <span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {{ stat.label }}
                </span>
              </div>
            </div>

            <!-- Number Value -->
            <div class="mb-2">
              <span class="text-4xl sm:text-5xl font-black text-white tracking-tight group-hover:text-slate-100 transition-colors">
                {{ stat.value }}
              </span>
            </div>

            <!-- Description -->
            <p class="text-xs text-slate-400 leading-relaxed font-normal">
              {{ stat.description }}
            </p>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>
