<script setup>
import { Code2, FileCode, Coffee, Atom, Database, Server, Smartphone, GitBranch } from 'lucide-vue-next'

const techItems = [
  { icon: Code2, name: 'HTML5', color: 'text-primary' },
  { icon: FileCode, name: 'CSS3', color: 'text-blue-500' },
  { icon: Coffee, name: 'JavaScript', color: 'text-yellow-400' },
  { icon: Atom, name: 'React', color: 'text-cyan-400' },
  { icon: Database, name: 'Laravel', color: 'text-red-500' },
  { icon: Server, name: 'PHP', color: 'text-indigo-500' },
  { icon: Smartphone, name: 'Flutter', color: 'text-blue-400' },
  { icon: GitBranch, name: 'Git', color: 'text-primary-glow' }
]
</script>

<template>
  <div class="bg-dark-900 py-8 border-y border-dark-800 overflow-hidden relative z-20">
    <div class="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-dark-900 to-transparent z-10"></div>
    <div class="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-dark-900 to-transparent z-10"></div>

    <div class="flex w-full overflow-hidden">
      <div class="animate-marquee flex gap-16 items-center whitespace-nowrap py-2">
        <!-- First set -->
        <span v-for="(tech, index) in techItems" :key="'first-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          {{ tech.name }}
        </span>
        <!-- Second set for seamless loop -->
        <span v-for="(tech, index) in techItems" :key="'second-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          {{ tech.name }}
        </span>
        <!-- Third set for extra seamless -->
        <span v-for="(tech, index) in techItems" :key="'third-' + index" class="tech-item">
          <component :is="tech.icon" :class="tech.color" />
          {{ tech.name }}
        </span>
      </div>
    </div>
  </div>
</template>
