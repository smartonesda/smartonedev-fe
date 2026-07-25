<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<template>
  <div class="min-h-screen bg-dark-950 flex flex-col">
    <!-- Top Bar — mirip ProjectDetail -->
    <div
      class="sticky top-0 z-10 flex items-center gap-4 px-4 sm:px-6 lg:px-8 py-4 bg-dark-950/80 backdrop-blur-md border-b border-dark-800"
    >
      <button
        @click="goBack"
        class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <div
          class="w-9 h-9 rounded-full bg-dark-800 group-hover:bg-primary/20 flex items-center justify-center transition-colors"
        >
          <ArrowLeft class="w-5 h-5" />
        </div>
        <span class="font-medium text-sm hidden sm:block">Kembali</span>
      </button>

      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        <h1 class="text-white font-bold text-base sm:text-lg tracking-tight">Tracker Lomba</h1>
      </div>
    </div>

    <!-- Iframe — full remaining height -->
    <div class="flex-1 relative overflow-hidden">
      <iframe
        src="https://script.google.com/macros/s/AKfycbw2tfDmyhh8kT9zzzud83Sbuif-3POkQDt9NWWAFerPxPZXs1ozSP_hP5fUJ04nPTTZbQ/exec"
        class="absolute left-0 h-full w-full border-0"
        allow="fullscreen"
        loading="lazy"
        title="Tracker Lomba SmartOneDev"
      ></iframe>
    </div>
  </div>
</template>
