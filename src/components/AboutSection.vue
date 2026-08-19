<script setup>
import { ref } from 'vue'
import {
  BookOpen,
  Hammer,
  TrendingUp,
  Users2,
  Sparkles,
  TerminalSquare,
  CheckCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-vue-next'

const activePillarIndex = ref(0)

const pillars = [
  {
    num: '01',
    title: 'LEARN',
    label: 'Belajar Teknologi Modern',
    description: 'Mempelajari teknologi standar industri terkini—mulai dari modern web framework, mobile apps, database, hingga cloud deployment.',
    icon: BookOpen,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    num: '02',
    title: 'BUILD',
    label: 'Membangun Project Nyata',
    description: 'Mengubah teori dan kodingan latihan menjadi produk digital fungsional yang menyelesaikan masalah nyata di sekolah dan masyarakat.',
    icon: Hammer,
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    num: '03',
    title: 'IMPROVE',
    label: 'Mengembangkan Kemampuan',
    description: 'Melakukan code review, continuous learning, optimasi performa, dan eksperimen dengan arsitektur software yang bersih.',
    icon: TrendingUp,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10'
  },
  {
    num: '04',
    title: 'COLLABORATE',
    label: 'Bekerja Bersama Lintas Angkatan',
    description: 'Menghilangkan sekat kelas. Senior membimbing adik tingkat, berbagi wawasan, dan bekerja dalam tim git workflow yang solid.',
    icon: Users2,
    color: 'text-accent-orange',
    bg: 'bg-accent-orange/10'
  },
  {
    num: '05',
    title: 'SHOWCASE',
    label: 'Menampilkan Karya ke Industri',
    description: 'Mempublikasikan dokumentasi, live demo, dan source code proyek sebagai portofolio profesional yang siap dilirik industri.',
    icon: Sparkles,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  }
]
</script>

<template>
  <section id="tentang" class="py-24 sm:py-32 relative bg-[#0B0B0D]">
    <!-- Subtle Background Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="dev-dots absolute inset-0 opacity-20"></div>
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-primary/[0.04] rounded-full blur-[140px] -translate-y-1/2"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div class="max-w-3xl mb-16 sm:mb-20" data-aos="fade-up">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/[0.08] text-xs font-semibold text-accent-orange uppercase tracking-wider mb-4">
          <Lightbulb class="w-3.5 h-3.5" />
          Filosofi & Ekosistem
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
          Lebih Dari Sekedar <span class="bg-gradient-to-r from-primary to-accent-orange bg-clip-text text-transparent">Barisan Kode.</span>
        </h2>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          SmartOneDev adalah inisiatif ekosistem developer siswa jurusan Rekayasa Perangkat Lunak (RPL) di SMKS Antartika 1 Sidoarjo. Kami merancang alur belajar terpadu yang menjembatani kurikulum vokasi dengan standar industri perangkat lunak modern.
        </p>
      </div>

      <!-- Main Layout: 5 Pillars Progression Grid + Interactive Manifesto -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left: 5 Modular Progression Steps -->
        <div class="lg:col-span-7 flex flex-col gap-3" data-aos="fade-right">
          <div
            v-for="(pillar, index) in pillars"
            :key="pillar.num"
            @mouseenter="activePillarIndex = index"
            @click="activePillarIndex = index"
            class="p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 sm:gap-5"
            :class="[
              activePillarIndex === index
                ? 'bg-[#18181B] border-primary/40 shadow-lg shadow-black/40 scale-[1.01]'
                : 'bg-[#111113]/70 border-white/[0.06] hover:bg-[#18181B]/50 hover:border-white/[0.12]'
            ]"
          >
            <!-- Step Badge Number -->
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300"
              :class="[
                activePillarIndex === index
                  ? `${pillar.bg} ${pillar.color} border-primary/30 font-bold`
                  : 'bg-[#18181B] text-slate-500 border-white/[0.06]'
              ]"
            >
              <component :is="pillar.icon" class="w-5 h-5" />
            </div>

            <!-- Content -->
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono font-bold" :class="activePillarIndex === index ? 'text-primary' : 'text-slate-500'">
                  {{ pillar.num }}
                </span>
                <span class="text-xs font-mono font-semibold text-slate-400">
                  / {{ pillar.title }}
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-white mb-1.5 transition-colors">
                {{ pillar.label }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {{ pillar.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Real Code Structure / School Manifesto Box -->
        <div class="lg:col-span-5 sticky top-28" data-aos="fade-left">
          <div class="bg-[#111113] border border-white/[0.1] rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            
            <!-- Header bar -->
            <div class="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <TerminalSquare class="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider">Student Ecosystem</h4>
                  <p class="text-[10px] text-slate-500 font-mono">ecosystem.config.ts</p>
                </div>
              </div>
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 font-semibold">
                Live & Active
              </span>
            </div>

            <!-- Manifesto Code block -->
            <div class="bg-[#0B0B0D] p-4 rounded-2xl border border-white/[0.06] font-mono text-xs text-slate-300 leading-relaxed mb-6 overflow-x-auto">
              <p class="text-slate-500">// Nilai Inti SMKS Antartika 1 Sidoarjo</p>
              <p><span class="text-purple-400">class</span> <span class="text-yellow-300">RplAntartikaEcosystem</span> {</p>
              <p class="pl-4"><span class="text-blue-300">readonly</span> school = <span class="text-emerald-300">"SMKS Antartika 1 Sidoarjo"</span>;</p>
              <p class="pl-4"><span class="text-blue-300">readonly</span> vision = <span class="text-emerald-300">"Unggul, Terampil, Mandiri"</span>;</p>
              <p class="pl-4"><span class="text-blue-300">readonly</span> stack = [<span class="text-emerald-300">"Web"</span>, <span class="text-emerald-300">"Mobile"</span>, <span class="text-emerald-300">"IoT"</span>, <span class="text-emerald-300">"AI"</span>];</p>
              <p class="pl-4 mt-2"><span class="text-purple-400">executeDevelopment</span>() {</p>
              <p class="pl-8 text-slate-400">return <span class="text-primary font-bold">"Build. Share. Inspire."</span>;</p>
              <p class="pl-4">}</p>
              <p>}</p>
            </div>

            <!-- Value Props Checklist -->
            <div class="space-y-3 pt-2">
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mentoring langsung dari guru pembimbing & senior RPL</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Akses ke repositori project open-source sekolah</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-slate-300">
                <CheckCircle class="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Persiapan matang untuk LKS, lomba IT, dan dunia kerja</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>
