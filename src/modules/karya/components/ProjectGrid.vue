<script setup>
import ProjectCard from './ProjectCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  projects: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="relative">
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <SkeletonCard v-for="n in 6" :key="'skeleton-' + n" />
    </div>

    <div v-else-if="projects.length === 0">
      <EmptyState />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="(project, index) in projects" 
        :key="project.id"
        data-aos="fade-up"
        :data-aos-delay="index * 50"
      >
        <ProjectCard :project="project" />
      </div>
    </div>
  </div>
</template>
