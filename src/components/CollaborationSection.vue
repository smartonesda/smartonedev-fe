<script setup>
import { Users, FolderGit, GitCommit, Trophy, GitPullRequest, GitBranchPlus } from 'lucide-vue-next'

const stats = [
  { icon: Users, value: '500+', label: 'Siswa Aktif', color: 'text-primary', hoverBorder: 'hover:border-primary/50' },
  { icon: FolderGit, value: '120+', label: 'Repo Project', color: 'text-accent-gold', hoverBorder: 'hover:border-accent-gold/50' },
  { icon: GitCommit, value: '5k+', label: 'Total Commits', color: 'text-primary-glow', hoverBorder: 'hover:border-primary-glow/50' },
  { icon: Trophy, value: '15+', label: 'Penghargaan', color: 'text-yellow-500', hoverBorder: 'hover:border-orange-500/50' }
]
</script>

<template>
  <section id="kolaborasi" class="py-24 relative overflow-hidden">
    <div class="absolute inset-0 bg-dark-950">
      <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] translate-y-1/2 translate-x-1/2"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Stats Counter -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-dark-800 pb-12" data-aos="fade-up">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center p-6 bg-dark-900/50 rounded-2xl border border-dark-800 transition-colors group"
          :class="stat.hoverBorder"
        >
          <component :is="stat.icon" :class="`w-10 h-10 ${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`" />
          <div class="text-4xl font-black text-white mb-1">{{ stat.value }}</div>
          <div class="sm:text-sm text-[10px] text-slate-400 font-bold uppercase tracking-widest">{{ stat.label }}</div>
        </div>
      </div>

      <!-- CTA Box -->
      <div
        data-aos="zoom-in"
        class="bg-gradient-to-br from-dark-900 to-dark-950 border border-primary/20 rounded-3xl p-8 md:p-16 overflow-hidden relative shadow-2xl shadow-primary/5"
      >
        <div class="absolute top-0 right-0 -mt-12 -mr-12 text-dark-800 opacity-50">
          <GitPullRequest class="w-64 h-64" />
        </div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 text-center md:text-left">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Siap Untuk <span class="text-primary">Berkolaborasi?</span>
            </h2>
            <p class="text-slate-300 text-lg mb-8 max-w-xl">
              Jangan biarkan kodinganmu hanya tersimpan di laptop. Bergabunglah dengan repositori sekolah,
              jadilah kontributor, dan bangun portofoliomu sekarang.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="https://github.com/smartonesda"
                target="_blank"
                class="bg-primary hover:bg-primary-glow text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/50 hover:-translate-y-1"
              >
                <GitBranchPlus class="w-5 h-5" />
                Mulai Berkontribusi
              </a>
            </div>
          </div>

          <!-- Terminal Simulation -->
          <div class="flex-1 w-full max-w-lg">
            <div class="mockup-code bg-dark-950 border border-dark-800 rounded-xl overflow-hidden shadow-xl font-mono text-sm text-left relative group">
              <!-- Glowing border effect -->
              <div class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-gold rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

              <div class="relative bg-dark-950 p-6">
                <div class="flex gap-2 mb-4 border-b border-dark-800 pb-4 items-center">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="text-slate-500 ml-2 text-xs">bash — 80x24</span>
                </div>
                <p class="text-slate-300 mb-2">$ git clone <span class="text-primary break-all">https://github.com/smartonesda/awesome-project.git</span></p>
                <p class="text-accent-gold italic">Cloning into 'awesome-project'...</p>
                <p class="text-slate-400">remote: Enumerating objects: 104, done.</p>
                <p class="text-slate-400">remote: Total 104 (delta 35), reused 0 (delta 0)</p>
                <p class="text-green-400">Receiving objects: 100% (104/104), done.</p>
                <p class="text-slate-300 mt-4">$ cd awesome-project && npm install</p>
                <p class="text-slate-300">$ <span class="animate-pulse bg-slate-200 w-2 h-5 inline-block align-middle"></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
