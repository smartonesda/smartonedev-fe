<script setup>
import { RouterLink } from 'vue-router'
import { Sparkles, ArrowRight, BookOpen, Layers, Heart } from 'lucide-vue-next'
</script>

<template>
  <section class="py-20 sm:py-28 relative bg-[#0B0B0D] overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Elevated Container with Subtle Gradient Edge -->
      <div
        data-aos="zoom-in"
        class="relative bg-gradient-to-b from-[#18181B] to-[#111113] border border-white/[0.12] rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-black/80 overflow-hidden"
      >
        <!-- Background Ambient Accents -->
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/[0.12] rounded-full blur-[120px] pointer-events-none"></div>
        <div class="absolute bottom-0 right-0 w-80 h-80 bg-accent-orange/[0.08] rounded-full blur-[100px] pointer-events-none"></div>

        <div class="relative z-10 max-w-3xl mx-auto">
          
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202024] border border-white/[0.08] text-xs font-semibold text-primary uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles class="w-3.5 h-3.5" />
            Masa Depan Developer Vokasi
          </div>

          <!-- Main Heading -->
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Bangun. Berkolaborasi. <br class="hidden sm:block" />
            <span class="bg-gradient-to-r from-primary via-primary-glow to-accent-orange bg-clip-text text-transparent">
              Tunjukkan Karya.
            </span>
          </h2>

          <!-- Supporting Text -->
          <p class="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-normal">
            SmartOneDev membantu siswa SMKS Antartika 1 Sidoarjo mengubah proses belajar menjadi pengalaman membangun produk digital nyata berstandar industri.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RouterLink
              to="/karya"
              class="m3-btn-primary w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl group shadow-xl shadow-primary/25"
            >
              <span>Jelajahi Galeri Karya</span>
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </RouterLink>

            <RouterLink
              to="/learn"
              class="m3-btn-secondary w-full sm:w-auto px-7 py-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <BookOpen class="w-4 h-4 text-accent-orange" />
              <span>Mulai Belajar</span>
            </RouterLink>
          </div>

          <!-- Small Trust Subtext -->
          <p class="text-xs text-slate-500 mt-8 font-medium">
            Dikembangkan oleh Jurusan Rekayasa Perangkat Lunak SMKS Antartika 1 Sidoarjo
          </p>

        </div>
      </div>

    </div>
  </section>
</template>
