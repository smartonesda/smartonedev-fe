<script setup>
import {
  GitPullRequest,
  GitBranchPlus,
  Github,
  Users2,
  Share2,
  CheckCircle2,
  GitCommit,
  ArrowUpRight,
  Code2,
  HeartHandshake
} from 'lucide-vue-next'

const collabPillars = [
  {
    icon: GitPullRequest,
    title: 'Open Source Workflow',
    description: 'Praktik langsung standar industri: fork repository, buat feature branch, buka PR, dan jalankan automated tests.'
  },
  {
    icon: HeartHandshake,
    title: 'Peer Review & Mentoring',
    description: 'Senior memberikan feedback konstruktif lewat code review untuk mengasah kualitas kode dan arsitektur bersama.'
  },
  {
    icon: Users2,
    title: 'Kolaborasi Multidisiplin',
    description: 'Gabungkan keahlian UI/UX designer, frontend developer, backend engineer, dan tester dalam satu sprint proyek.'
  }
]
</script>

<template>
  <section id="kolaborasi" class="py-24 sm:py-32 relative bg-[#0B0B0D] border-t border-white/[0.06] overflow-hidden">
    <!-- Ambient Backdrop Layer -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="dev-grid absolute inset-0 opacity-30"></div>
      <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[140px]"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="max-w-3xl mb-16" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-primary uppercase tracking-wider mb-4">
          <GitBranchPlus class="w-3.5 h-3.5" />
          Komunitas & Kontribusi
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Siap Untuk <span class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">Berkolaborasi?</span>
        </h2>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Jangan biarkan kodingan dan inovasimu hanya tersimpan di komputer pribadi. Bergabunglah dalam organisasi GitHub sekolah, bangun portofolio tim, dan jadilah kontributor aktif.
        </p>
      </div>

      <!-- Main Content Grid: 3 Pillars + Interactive Git PR Simulation -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left: Collaboration Pillars (5 Cols) -->
        <div class="lg:col-span-5 flex flex-col gap-6" data-aos="fade-right">
          <div
            v-for="item in collabPillars"
            :key="item.title"
            class="bg-[#111113] border border-white/[0.08] hover:border-white/[0.16] p-6 rounded-2xl transition-all duration-300 flex items-start gap-4"
          >
            <div class="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-base font-bold text-white mb-1.5">{{ item.title }}</h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">{{ item.description }}</p>
            </div>
          </div>

          <!-- Direct CTA -->
          <div class="pt-2">
            <a
              href="https://github.com/smartonesda"
              target="_blank"
              rel="noopener noreferrer"
              class="m3-btn-primary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl group shadow-lg shadow-primary/25"
            >
              <Github class="w-4 h-4" />
              <span>Mulai Berkontribusi di GitHub</span>
              <ArrowUpRight class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <!-- Right: Real Interactive GitHub Pull Request Simulation (7 Cols) -->
        <div class="lg:col-span-7" data-aos="fade-left">
          <div class="bg-[#111113] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            <!-- Git PR Header -->
            <div class="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                  <GitPullRequest class="w-3.5 h-3.5" />
                  Open #42
                </span>
                <span class="text-xs sm:text-sm font-bold text-white font-mono truncate max-w-[200px] sm:max-w-xs">
                  feat: integrate real-time student activity feed
                </span>
              </div>
              <span class="text-[11px] font-mono text-slate-500 shrink-0">v2.4.0</span>
            </div>

            <!-- Workflow Activity Timeline -->
            <div class="space-y-4 font-mono text-xs mb-6">
              <!-- Item 1: Branch created -->
              <div class="flex items-start gap-3 text-slate-300">
                <div class="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <GitCommit class="w-3.5 h-3.5" />
                </div>
                <div class="flex-1">
                  <p><span class="text-slate-400 font-sans">Commit dari</span> <span class="text-white font-bold">@fajar-antartika</span>: <span class="text-slate-300">"add WebSocket client listener"</span></p>
                  <p class="text-[10px] text-slate-500 font-mono">hash: 7f83a21 • 2 files changed</p>
                </div>
              </div>

              <!-- Item 2: Automated Tests -->
              <div class="flex items-start gap-3 text-slate-300">
                <div class="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 class="w-3.5 h-3.5" />
                </div>
                <div class="flex-1">
                  <p><span class="text-white font-bold">GitHub Actions CI/CD</span>: <span class="text-emerald-400">All checks passed (12 test suites)</span></p>
                  <p class="text-[10px] text-slate-500 font-mono">Vite build: 2.8s • Linting: 0 errors</p>
                </div>
              </div>

              <!-- Item 3: Senior Review -->
              <div class="flex items-start gap-3 text-slate-300">
                <div class="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <CheckCircle2 class="w-3.5 h-3.5" />
                </div>
                <div class="flex-1">
                  <p><span class="text-slate-400 font-sans">Review disetujui oleh</span> <span class="text-accent-orange font-bold">@lead-mentor-rpl</span>: <span class="text-slate-300">"Clean structure, ready to merge!"</span></p>
                </div>
              </div>
            </div>

            <!-- Terminal Mockup Bottom Box -->
            <div class="bg-[#0B0B0D] p-4 rounded-xl border border-white/[0.06] font-mono text-xs text-slate-400 leading-relaxed overflow-x-auto">
              <div class="flex items-center gap-2 text-slate-500 mb-2 border-b border-white/[0.06] pb-2 text-[11px]">
                <span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
                <span class="ml-1">bash terminal</span>
              </div>
              <p class="text-slate-300">$ git clone https://github.com/smartonesda/smartonedev.git</p>
              <p class="text-slate-300">$ cd smartonedev &amp;&amp; npm install</p>
              <p class="text-emerald-400">$ npm run dev &rarr; http://localhost:5173</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
