<script setup>
import { FolderOpen } from 'lucide-vue-next'
</script>

<template>
  <div class="col-span-full text-center py-20 border border-dashed border-dark-800 rounded-3xl bg-dark-900/20 backdrop-blur-md">
    <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-800 border border-dark-700 flex items-center justify-center">
      <FolderOpen class="w-10 h-10 text-slate-500" />
    </div>
    <h4 class="text-xl font-bold text-white mb-2">Belum Ada Karya</h4>
    <p class="text-slate-400 max-w-md mx-auto px-4">
      Tidak ada karya yang cocok dengan kata kunci atau kategori yang Anda pilih.
    </p>
  </div>
</template>
