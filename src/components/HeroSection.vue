<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  BookOpen,
  Github,
  Terminal,
  Code2,
  GitBranch,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Smartphone,
  Globe
} from 'lucide-vue-next'

const activeTab = ref('ecosystem')

const codeTabs = [
  { id: 'ecosystem', label: 'SmartOneDev.ts', icon: Code2 },
  { id: 'manifesto', label: 'Manifesto.vue', icon: Terminal }
]
</script>

<template>
  <section id="beranda" class="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
    <!-- Subtle Background Ambient Layer -->
    <div class="absolute inset-0 bg-[#0B0B0D] pointer-events-none">
      <div class="dev-grid absolute inset-0 opacity-40"></div>
      <!-- Subtle Ambient Glows (Material 3 Dark Tonal Accents, NOT harsh neon) -->
      <div class="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[140px]"></div>
      <div class="absolute top-1/3 right-10 w-[450px] h-[450px] bg-accent-orange/[0.05] rounded-full blur-[130px]"></div>
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-[#0B0B0D] to-transparent z-10"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        <!-- Left Column: Content & Direct Value Proposition -->
        <div class="lg:col-span-7 flex flex-col items-start text-left">
          
          <!-- Eyebrow Badge -->
          <div
            data-aos="fade-down"
            class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#18181B] border border-white/[0.08] shadow-sm mb-6"
          >
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span class="text-xs font-semibold text-slate-300 tracking-wide">
              SMKS ANTARTIKA 1 SIDOARJO
            </span>
            <span class="h-3 w-px bg-white/15"></span>
            <span class="text-xs font-bold text-primary tracking-wider uppercase">
              RPL Platform
            </span>
          </div>

          <!-- Main Heading (Strictly 2 Lines on All Resolutions) -->
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            class="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.35rem] xl:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.15] mb-6"
          >
            <span class="block whitespace-normal md:whitespace-nowrap">Ekosistem Developer Siswa</span>
            <span class="block mt-1 sm:mt-1.5 bg-gradient-to-r from-primary via-primary-glow to-accent-orange bg-clip-text text-transparent">
              SmartOneDev
            </span>
          </h1>

          <!-- Supporting Description -->
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            class="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed"
          >
            SmartOneDev adalah ruang bagi siswa Rekayasa Perangkat Lunak untuk belajar teknologi modern, membangun project nyata, berkolaborasi dalam tim terbuka, dan menunjukkan karya mereka kepada dunia industri.
          </p>

          <!-- Primary & Secondary CTA Buttons (Symmetrical Mobile & Desktop Layout) -->
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10"
          >
            <a
              href="#karya-preview"
              class="m3-btn-primary w-full sm:w-auto px-7 py-3.5 text-sm font-semibold rounded-xl group shadow-lg shadow-primary/20 flex items-center justify-center"
            >
              <span>Jelajahi Karya</span>
              <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <div class="grid grid-cols-2 sm:flex sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <RouterLink
                to="/learn"
                class="m3-btn-secondary px-5 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 text-center"
              >
                <BookOpen class="w-4 h-4 text-accent-orange" />
                <span>Mulai Belajar</span>
              </RouterLink>

              <a
                href="https://github.com/smartonesda"
                target="_blank"
                rel="noopener noreferrer"
                class="m3-btn-secondary px-5 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 text-center"
                title="GitHub Repositories"
              >
                <Github class="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <!-- Developer Ecosystem Tags -->
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            class="flex flex-wrap items-center gap-2 pt-6 border-t border-white/[0.08] w-full"
          >
            <span class="text-xs font-medium text-slate-500 mr-2">Disiplin Teknis:</span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181B] border border-white/[0.06] text-xs text-slate-300">
              <Globe class="w-3.5 h-3.5 text-blue-400" />
              Web Development
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181B] border border-white/[0.06] text-xs text-slate-300">
              <Smartphone class="w-3.5 h-3.5 text-emerald-400" />
              Mobile Apps
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181B] border border-white/[0.06] text-xs text-slate-300">
              <Cpu class="w-3.5 h-3.5 text-purple-400" />
              IoT & Systems
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#18181B] border border-white/[0.06] text-xs text-slate-300">
              <Layers class="w-3.5 h-3.5 text-primary" />
              Fullstack
            </span>
          </div>

        </div>

        <!-- Right Column: Interactive Developer Workspace Visual Mock -->
        <div class="lg:col-span-5 relative mt-4 lg:mt-0" data-aos="fade-left" data-aos-delay="200">
          
          <!-- Outer Surface Container -->
          <div class="relative bg-[#111113] border border-white/[0.1] rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80">
            
            <!-- Code Window Top Bar -->
            <div class="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-3">
              <!-- Window control dots -->
              <div class="flex items-center gap-1.5">
                <span class="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span class="w-3 h-3 rounded-full bg-green-500/80"></span>
                <span class="ml-2 text-[11px] font-mono text-slate-500">smartone-workspace</span>
              </div>

              <!-- Branch indicator -->
              <div class="flex items-center gap-1 px-2 py-0.5 rounded bg-[#18181B] border border-white/[0.06] text-[11px] font-mono text-slate-400">
                <GitBranch class="w-3 h-3 text-primary" />
                <span>main</span>
              </div>
            </div>

            <!-- Tab Switcher -->
            <div class="flex items-center gap-1 mb-4 bg-[#18181B] p-1 rounded-xl border border-white/[0.06]">
              <button
                v-for="tab in codeTabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg text-xs font-mono transition-all"
                :class="[
                  activeTab === tab.id
                    ? 'bg-[#202024] text-white shadow-sm border border-white/[0.08]'
                    : 'text-slate-400 hover:text-slate-200'
                ]"
              >
                <component :is="tab.icon" class="w-3.5 h-3.5" :class="activeTab === tab.id ? 'text-primary' : 'text-slate-500'" />
                <span>{{ tab.label }}</span>
              </button>
            </div>

            <!-- Code Editor Frame -->
            <div class="bg-[#0B0B0D] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/[0.06] overflow-x-auto min-h-[220px]">
              
              <!-- Tab 1: SmartOneDev.ts -->
              <div v-if="activeTab === 'ecosystem'" class="space-y-1.5 leading-relaxed">
                <p class="text-slate-500">// SmartOneDev Core Ecosystem Configuration</p>
                <p>
                  <span class="text-purple-400">export const</span>
                  <span class="text-blue-300"> smartOneDev</span>:
                  <span class="text-yellow-300"> Ecosystem</span> = {
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">institution:</span>
                  <span class="text-emerald-300"> 'SMKS Antartika 1 Sidoarjo'</span>,
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">department:</span>
                  <span class="text-emerald-300"> 'Rekayasa Perangkat Lunak'</span>,
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">students:</span>
                  <span class="text-accent-orange font-bold"> 500+</span>,
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">projects:</span>
                  <span class="text-accent-orange font-bold"> 120+</span>,
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">corePillars:</span> [
                  <span class="text-emerald-300">'Learn'</span>,
                  <span class="text-emerald-300">'Build'</span>,
                  <span class="text-emerald-300">'Collaborate'</span>
                  ],
                </p>
                <p class="pl-4">
                  <span class="text-slate-400">readyForIndustry:</span>
                  <span class="text-primary font-bold"> true</span>
                </p>
                <p>};</p>
              </div>

              <!-- Tab 2: Manifesto.vue -->
              <div v-else class="space-y-1.5 leading-relaxed">
                <p class="text-slate-500">&lt;!-- Student Developer Manifesto --&gt;</p>
                <p><span class="text-red-400">&lt;template&gt;</span></p>
                <p class="pl-4">
                  <span class="text-red-400">&lt;div</span> <span class="text-yellow-300">class</span>=<span class="text-emerald-300">"dev-journey"</span><span class="text-red-400">&gt;</span>
                </p>
                <p class="pl-8">
                  <span class="text-red-400">&lt;h3&gt;</span>Dari Siswa untuk Industri<span class="text-red-400">&lt;/h3&gt;</span>
                </p>
                <p class="pl-8">
                  <span class="text-red-400">&lt;p&gt;</span>Kode nyata, solusi nyata, masa depan nyata.<span class="text-red-400">&lt;/p&gt;</span>
                </p>
                <p class="pl-4"><span class="text-red-400">&lt;/div&gt;</span></p>
                <p><span class="text-red-400">&lt;/template&gt;</span></p>
              </div>
            </div>

            <!-- Floating Product Telemetry Chips -->
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div class="bg-[#18181B] border border-white/[0.08] rounded-xl p-3 flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div class="text-[11px] font-bold text-white">CI/CD Pipeline</div>
                  <div class="text-[10px] text-slate-400">All Tests Passing</div>
                </div>
              </div>

              <div class="bg-[#18181B] border border-white/[0.08] rounded-xl p-3 flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div class="text-[11px] font-bold text-white">Production Grade</div>
                  <div class="text-[10px] text-slate-400">Standardized Code</div>
                </div>
              </div>
            </div>

          </div>

          <!-- Subtle Decorative Backdrop Edge -->
          <div class="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent-orange/10 rounded-3xl blur-xl -z-10 opacity-70"></div>
        </div>

      </div>
    </div>
  </section>
</template>
