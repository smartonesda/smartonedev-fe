<template>
  <div class="project-card group bg-dark-800 rounded-2xl overflow-hidden border border-dark-700">
    <!-- Thumbnail skeleton -->
    <div class="h-56 w-full skeleton"></div>
    
    <div class="p-6">
      <!-- Category badge skeleton -->
      <div class="flex justify-between items-start mb-4">
        <div class="skeleton h-6 w-20 rounded-full"></div>
        <div class="skeleton h-5 w-16 rounded-full"></div>
      </div>
      
      <!-- Title skeleton -->
      <div class="skeleton h-7 w-3/4 rounded mb-3"></div>
      
      <!-- Description skeleton -->
      <div class="space-y-2 mb-6">
        <div class="skeleton h-4 w-full rounded"></div>
        <div class="skeleton h-4 w-5/6 rounded"></div>
      </div>
      
      <!-- Tech stack skeleton -->
      <div class="flex flex-wrap gap-2 mb-6">
        <div class="skeleton h-6 w-16 rounded-md"></div>
        <div class="skeleton h-6 w-20 rounded-md"></div>
        <div class="skeleton h-6 w-14 rounded-md"></div>
      </div>
      
      <!-- Footer skeleton -->
      <div class="flex items-center justify-between pt-4 border-t border-dark-700/50">
        <div class="flex items-center gap-2">
          <div class="skeleton w-7 h-7 rounded-md"></div>
          <div class="skeleton h-4 w-24 rounded"></div>
        </div>
        <div class="skeleton h-6 w-12 rounded-lg"></div>
      </div>
    </div>
  </div>
</template>
