<script setup>
import { Code2, FileCode, Coffee, Atom, Database, Server, Smartphone, GitBranch, Cpu, Terminal } from 'lucide-vue-next'

const techItems = [
  { icon: Code2, name: 'HTML5 & CSS3', color: 'text-primary' },
  { icon: Coffee, name: 'JavaScript ES6+', color: 'text-yellow-400' },
  { icon: Terminal, name: 'TypeScript', color: 'text-blue-400' },
  { icon: Atom, name: 'Vue & React', color: 'text-cyan-400' },
  { icon: Server, name: 'Node.js & Express', color: 'text-emerald-400' },
  { icon: Database, name: 'Laravel & PHP', color: 'text-red-400' },
  { icon: Smartphone, name: 'Flutter & Kotlin', color: 'text-blue-400' },
  { icon: GitBranch, name: 'Git & GitHub Workflow', color: 'text-accent-orange' },
  { icon: Cpu, name: 'IoT & Microcontrollers', color: 'text-purple-400' }
]
</script>

<template>
  <div class="bg-[#0e0e11] py-6 border-y border-white/[0.06] overflow-hidden relative z-20">
    <!-- Edge Gradients for Smooth In/Out Fades -->
    <div class="absolute left-0 top-0 h-full w-24 sm:w-40 bg-gradient-to-r from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 h-full w-24 sm:w-40 bg-gradient-to-l from-[#0e0e11] via-[#0e0e11]/80 to-transparent z-10 pointer-events-none"></div>

    <div class="flex w-full overflow-hidden">
      <div class="animate-marquee flex gap-8 sm:gap-12 items-center whitespace-nowrap py-1">
        <!-- First set -->
        <span v-for="(tech, index) in techItems" :key="'first-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          <span>{{ tech.name }}</span>
        </span>
        <!-- Second set for seamless continuous loop -->
        <span v-for="(tech, index) in techItems" :key="'second-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          <span>{{ tech.name }}</span>
        </span>
        <!-- Third set -->
        <span v-for="(tech, index) in techItems" :key="'third-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          <span>{{ tech.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
