<script setup>
import { RouterLink } from 'vue-router'
import { BookOpen, Github, Clock, Award, ArrowRight, ExternalLink, Sparkles } from 'lucide-vue-next'
import guidebooksData from '@/modules/learn/data/guidebooks.js'

const featuredGuidebooks = guidebooksData.slice(0, 2)
</script>

<template>
  <section class="py-24 sm:py-32 relative bg-[#0B0B0D] border-t border-white/[0.06]">
    <!-- Background Ambient Layer -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute -top-32 right-1/4 w-96 h-96 bg-accent-orange/[0.04] rounded-full blur-[140px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14" data-aos="fade-up">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-accent-orange uppercase tracking-wider mb-4">
            <BookOpen class="w-3.5 h-3.5" />
            Learn Center
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Panduan Belajar <span class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">Terstruktur</span>
          </h2>
          <p class="text-base text-slate-400 leading-relaxed font-normal">
            Kumpulan materi dan guidebook resmi yang disusun secara praktis untuk mempercepat pemahaman teknologi dari level dasar hingga siap kerja.
          </p>
        </div>

        <RouterLink
          to="/learn"
          class="m3-btn-secondary shrink-0 self-start md:self-auto group"
        >
          <span>Lihat Semua Materi</span>
          <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </RouterLink>
      </div>

      <!-- Featured Guidebooks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        <div
          v-for="guide in featuredGuidebooks"
          :key="guide.id"
          data-aos="fade-up"
          class="group bg-[#111113] border border-white/[0.08] hover:border-white/[0.18] rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Guidebook Cover Image & Badges -->
          <div class="relative aspect-[16/9] w-full overflow-hidden bg-[#18181B]">
            <img
              :src="guide.cover"
              :alt="guide.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/20"></div>

            <div class="absolute top-4 left-4 flex items-center gap-2">
              <span v-if="guide.featured" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent-orange text-white shadow-lg">
                <Award class="w-3.5 h-3.5" />
                Featured Guide
              </span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0B0B0D]/80 backdrop-blur-md border border-white/10 text-slate-300">
                {{ guide.category }}
              </span>
            </div>

            <div class="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#0B0B0D]/80 backdrop-blur-md border border-white/10 text-slate-300">
              <Clock class="w-3.5 h-3.5 text-primary" />
              <span>{{ guide.estimatedTime }}</span>
            </div>
          </div>

          <!-- Guidebook Content Body -->
          <div class="p-6 sm:p-8 flex flex-col flex-1 justify-between">
            <div>
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                  {{ guide.technology }}
                </span>
                <span class="text-slate-600">•</span>
                <span class="text-xs font-mono text-slate-400">
                  Level: {{ guide.level }}
                </span>
              </div>

              <h3 class="text-2xl font-extrabold text-white mb-3 group-hover:text-primary transition-colors">
                {{ guide.title }}
              </h3>

              <p class="text-sm text-slate-400 leading-relaxed mb-6">
                {{ guide.description }}
              </p>
            </div>

            <!-- Action CTAs -->
            <div class="grid grid-cols-2 gap-3 pt-6 border-t border-white/[0.08]">
              <a
                :href="guide.url"
                target="_blank"
                rel="noopener noreferrer"
                class="m3-btn-primary !py-2.5 text-xs font-semibold justify-center"
              >
                <BookOpen class="w-3.5 h-3.5" />
                <span>Mulai Belajar</span>
              </a>

              <a
                :href="guide.repository"
                target="_blank"
                rel="noopener noreferrer"
                class="m3-btn-secondary !py-2.5 text-xs font-semibold justify-center"
              >
                <Github class="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
