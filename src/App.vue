<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
import BugReportButton from '@/components/BugReportButton.vue'

const transitionName = ref('slide-right')
const router = useRouter()

// Detect navigation direction for slide transitions
router.beforeEach((to, from) => {
  // If going to home (back from detail) → slide-left
  // If going to project-detail → slide-right
  if (to.name === 'home' && from.name === 'project-detail') {
    transitionName.value = 'slide-left'
  } else if (to.name === 'project-detail') {
    transitionName.value = 'slide-right'
  } else {
    transitionName.value = 'fade'
  }
})
</script>

<template>
  <div class="page-wrapper">
    <RouterView v-slot="{ Component, route }">
      <Transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <!-- Global Floating Bug Report Button -->
    <BugReportButton />
  </div>
</template>

<style>
/* Prevent horizontal overflow during slide transitions */
.page-wrapper {
  overflow-x: hidden;
  position: relative;
}

/* Slide Right — forward navigation (to project detail) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Slide Left — back navigation (to home) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Fade — default for other navigations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
