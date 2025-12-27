<script setup>
import { ArrowRight, Github } from 'lucide-vue-next'
</script>

<template>
  <section id="beranda" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0 bg-dark-950">
      <div class="cyber-grid absolute inset-0 opacity-30"></div>
      <!-- Glowing Orbs -->
      <div
        class="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse-slow"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary-glow/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
      ></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <!-- Badge -->
      <div
        data-aos="fade-down"
        class="inline-flex items-center gap-2 bg-dark-900/80 border border-primary/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 shadow-lg shadow-primary/10"
      >
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
        </span>
        <span class="text-sm text-primary-glow font-semibold tracking-wide uppercase">
          SMKS ANTARTIKA 1 SIDOARJO
        </span>
      </div>

      <!-- Main Title -->
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
      >
        The Next Gen of <br />
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-glow to-accent-gold bg-[length:200%_auto] animate-gradient-x">
          Tech Innovators
        </span>
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
      >
        Wadah kolaborasi siswa Rekayasa Perangkat Lunak untuk berinovasi, berbagi kode, dan membangun solusi
        teknologi masa depan. Dari SMKS Antartika 1 Sidoarjo untuk dunia.
      </p>

      <!-- CTAs -->
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        class="flex flex-col sm:flex-row gap-5 justify-center items-center"
      >
        <a
          href="#karya"
          class="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent-gold p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-950 font-bold w-full sm:w-auto"
        >
          <span
            class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-dark-950 px-8 py-1 text-sm font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-transparent group-hover:text-white gap-2"
          >
            Eksplorasi Karya
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        <a
          href="https://github.com/smartonesda"
          target="_blank"
          class="flex items-center justify-center gap-2 bg-dark-800/50 hover:bg-dark-800 border border-dark-700 hover:border-slate-500 text-white px-8 h-14 rounded-full text-sm font-bold transition-all w-full sm:w-auto backdrop-blur-md"
        >
          <Github class="w-5 h-5" />
          GitHub Repository
        </a>
      </div>
    </div>
  </section>
</template>
