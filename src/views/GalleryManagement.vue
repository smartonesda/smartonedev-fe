<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  AlertTriangle,
  Star,
  Users,
  ExternalLink,
  X
} from 'lucide-vue-next'

const router = useRouter()
const galleryStore = useGalleryStore()

const isDeleteModalOpen = ref(false)
const isDeleting = ref(false)
const projectToDelete = ref(null)

// Toast notification
const toast = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

onMounted(() => {
  galleryStore.fetchProjects()
})

const goToCreate = () => {
  router.push('/dashboard/gallery/create')
}

const goToEdit = (project) => {
  router.push(`/dashboard/gallery/edit/${project.id}`)
}

const openDeleteModal = (project) => {
  projectToDelete.value = project
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  projectToDelete.value = null
}

const confirmDelete = async () => {
  if (projectToDelete.value) {
    const deletedTitle = projectToDelete.value.title
    isDeleting.value = true
    try {
      await galleryStore.deleteProject(projectToDelete.value.id)
      closeDeleteModal()
      showToast(`"${deletedTitle}" berhasil dihapus! 🗑️`, 'success')
    } catch (error) {
      console.error('Error deleting project:', error)
      showToast('Gagal menghapus karya. Coba lagi.', 'error')
    } finally {
      isDeleting.value = false
    }
  }
}
</script>

<template>
  <div>
    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="toast.show"
          class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm"
          :class="toast.type === 'success'
            ? 'bg-green-500/90 border-green-400 text-white'
            : 'bg-red-500/90 border-red-400 text-white'">
          <div class="w-6 h-6 flex items-center justify-center rounded-full bg-white/20">
            <span v-if="toast.type === 'success'" class="text-lg">✓</span>
            <span v-else class="text-lg">!</span>
          </div>
          <span class="font-medium">{{ toast.message }}</span>
          <button @click="toast.show = false" class="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors">
            <X class="w-4 h-4" />
          </button>
        </div>
      </Transition>
    </Teleport>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Galeri Karya</h1>
        <p class="text-slate-400">Kelola project dan karya siswa</p>
      </div>
      <button @click="goToCreate"
        class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/25">
        <Plus class="w-5 h-5" />
        Tambah Karya
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="galleryStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden">
        <div class="h-40 skeleton"></div>
        <div class="p-5 space-y-3">
          <div class="skeleton h-6 w-3/4 rounded"></div>
          <div class="skeleton h-4 w-full rounded"></div>
          <div class="skeleton h-4 w-2/3 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in galleryStore.projects" :key="project.id"
        class="bg-dark-900 border border-dark-800 rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
        <!-- Thumbnail -->
        <div :class="`h-40 bg-gradient-to-br ${project.bg_gradient} relative overflow-hidden`">
          <!-- Show image if available -->
          <img v-if="project.image" :src="project.image" :alt="project.title"
            class="absolute inset-0 w-full h-full object-cover" />

          <!-- Hover overlay with actions -->
          <div
            class="absolute inset-0 bg-dark-950/0 group-hover:bg-dark-950/70 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button @click="goToEdit(project)"
              class="p-3 bg-white rounded-xl text-dark-950 hover:scale-110 transition-transform shadow-lg" title="Edit">
              <Pencil class="w-5 h-5" />
            </button>
            <button @click="openDeleteModal(project)"
              class="p-3 bg-red-500 rounded-xl text-white hover:scale-110 transition-transform shadow-lg" title="Hapus">
              <Trash2 class="w-5 h-5" />
            </button>
          </div>

          <!-- Category Badge -->
          <div class="absolute top-3 left-3">
            <span
              class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dark-950/80 backdrop-blur-sm text-white">
              {{ project.category }}
            </span>
          </div>

          <!-- Collab Badge -->
          <div v-if="project.collab_open" class="absolute top-3 right-3">
            <span
              class="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 backdrop-blur-sm text-green-400 border border-green-500/30">
              <Users class="w-3 h-3" />
              Open
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <h3 class="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span v-for="tech in project.tech?.slice(0, 3)" :key="tech"
              class="text-xs text-slate-300 bg-dark-800 border border-dark-700 px-2 py-0.5 rounded font-mono">
              {{ tech }}
            </span>
            <span v-if="project.tech?.length > 3" class="text-xs text-slate-500">
              +{{ project.tech.length - 3 }}
            </span>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-dark-800">
            <span class="text-sm text-slate-400">{{ project.author }}</span>
            <div class="flex items-center gap-1 text-yellow-500 text-sm font-bold">
              <Star class="w-4 h-4 fill-current" />
              {{ project.stars || 0 }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="galleryStore.projects.length === 0" class="col-span-full text-center py-16">
        <div class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-dark-800 flex items-center justify-center">
          <Plus class="w-10 h-10 text-slate-500" />
        </div>
        <p class="text-slate-400 mb-4 text-lg">Belum ada karya yang ditambahkan</p>
        <button @click="goToCreate"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/25">
          <Plus class="w-5 h-5" />
          Tambah Karya Pertama
        </button>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-dark-950/80 backdrop-blur-sm" @click="closeDeleteModal"></div>
        <div class="relative bg-dark-900 border border-dark-800 rounded-2xl w-full max-w-md p-8 shadow-2xl">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle class="w-8 h-8 text-red-500" />
            </div>
            <h3 class="text-xl font-bold text-white mb-2">Hapus Karya?</h3>
            <p class="text-slate-400 mb-6">
              Apakah Anda yakin ingin menghapus <strong class="text-white">{{ projectToDelete?.title }}</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div class="flex gap-3">
              <button @click="closeDeleteModal"
                class="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-slate-300 font-medium rounded-xl transition-colors">
                Batal
              </button>
              <button @click="confirmDelete" :disabled="isDeleting"
                class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50">
                <Loader2 v-if="isDeleting" class="w-5 h-5 animate-spin" />
                <Trash2 v-else class="w-5 h-5" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
