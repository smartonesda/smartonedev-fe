<script setup>
import { ref, onMounted } from 'vue'
import { useCategoryStore } from '@/stores/categories'
import { Plus, Pencil, Trash2, X, Loader2, Tag, AlertCircle } from 'lucide-vue-next'

const categoryStore = useCategoryStore()

// Modal state
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const formData = ref({ name: '', color: '#dc2626', icon: 'folder' })

// Toast
const toast = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 4000)
}

// Delete confirmation
const showDeleteModal = ref(false)
const deleteTarget = ref(null)

const colors = [
  '#dc2626', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'
]

const icons = [
  { value: 'folder', label: 'Folder' },
  { value: 'globe', label: 'Web' },
  { value: 'smartphone', label: 'Mobile' },
  { value: 'gamepad-2', label: 'Game' },
  { value: 'cpu', label: 'IoT' },
  { value: 'layout', label: 'Layout' },
  { value: 'book-open', label: 'Book' }
]

onMounted(() => {
  categoryStore.fetchCategories()
})

const openCreateModal = () => {
  isEditing.value = false
  editingId.value = null
  formData.value = { name: '', color: '#dc2626', icon: 'folder' }
  showModal.value = true
}

const openEditModal = (category) => {
  isEditing.value = true
  editingId.value = category.id
  formData.value = { 
    name: category.name, 
    color: category.color || '#dc2626', 
    icon: category.icon || 'folder' 
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  formData.value = { name: '', color: '#dc2626', icon: 'folder' }
}

const handleSubmit = async () => {
  if (!formData.value.name?.trim()) {
    showToast('Nama kategori wajib diisi!', 'error')
    return
  }

  let result
  if (isEditing.value) {
    result = await categoryStore.updateCategory(editingId.value, formData.value)
    if (result.success) {
      showToast('Kategori berhasil diupdate! ✓', 'success')
    }
  } else {
    result = await categoryStore.createCategory(formData.value)
    if (result.success) {
      showToast('Kategori berhasil ditambahkan! ✓', 'success')
    }
  }

  if (result.success) {
    closeModal()
  } else {
    showToast(result.message, 'error')
  }
}

const confirmDelete = (category) => {
  deleteTarget.value = category
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!deleteTarget.value) return
  
  const result = await categoryStore.deleteCategory(deleteTarget.value.id)
  if (result.success) {
    showToast('Kategori berhasil dihapus!', 'success')
  } else {
    showToast(result.message, 'error')
  }
  showDeleteModal.value = false
  deleteTarget.value = null
}
</script>

<template>
  <div>
    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition name="toast">
        <div 
          v-if="toast.show"
          class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm"
          :class="toast.type === 'success' 
            ? 'bg-green-500/90 border-green-400 text-white' 
            : 'bg-red-500/90 border-red-400 text-white'"
        >
          <span class="font-medium">{{ toast.message }}</span>
          <button @click="toast.show = false" class="hover:bg-white/20 rounded-full p-1">
            <X class="w-4 h-4" />
          </button>
        </div>
      </Transition>
    </Teleport>

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-white">Kelola Kategori</h1>
        <p class="text-slate-400 mt-1">Tambah, edit, atau hapus kategori project</p>
      </div>
      <button 
        @click="openCreateModal"
        class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/25"
      >
        <Plus class="w-5 h-5" />
        Tambah Kategori
      </button>
    </div>

    <!-- Categories Grid -->
    <div v-if="categoryStore.isLoading" class="flex items-center justify-center py-20">
      <Loader2 class="w-8 h-8 text-primary animate-spin" />
    </div>

    <div v-else-if="categoryStore.categories.length === 0" class="text-center py-20">
      <Tag class="w-16 h-16 text-slate-600 mx-auto mb-4" />
      <h3 class="text-xl font-bold text-white mb-2">Belum Ada Kategori</h3>
      <p class="text-slate-400">Klik tombol di atas untuk menambahkan kategori pertama</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="category in categoryStore.categories" 
        :key="category.id"
        class="bg-dark-900 border border-dark-700 rounded-xl p-5 hover:border-dark-600 transition-all group"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-lg flex items-center justify-center"
              :style="{ backgroundColor: category.color + '20' }"
            >
              <div 
                class="w-4 h-4 rounded-full"
                :style="{ backgroundColor: category.color }"
              ></div>
            </div>
            <div>
              <h3 class="text-white font-semibold">{{ category.name }}</h3>
              <p class="text-slate-500 text-sm">{{ category.slug }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              @click="openEditModal(category)"
              class="p-2 bg-dark-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
            >
              <Pencil class="w-4 h-4" />
            </button>
            <button 
              @click="confirmDelete(category)"
              class="p-2 bg-dark-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div class="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-bold text-white">
                {{ isEditing ? 'Edit Kategori' : 'Tambah Kategori' }}
              </h2>
              <button @click="closeModal" class="p-2 hover:bg-dark-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <X class="w-5 h-5" />
              </button>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Nama Kategori *</label>
                <input 
                  v-model="formData.name"
                  type="text"
                  placeholder="Contoh: UI/UX Design"
                  class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                />
              </div>

              <!-- Color -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Warna</label>
                <div class="flex gap-2">
                  <button
                    v-for="color in colors"
                    :key="color"
                    type="button"
                    @click="formData.color = color"
                    class="w-8 h-8 rounded-lg transition-transform hover:scale-110"
                    :class="formData.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-dark-900' : ''"
                    :style="{ backgroundColor: color }"
                  ></button>
                </div>
              </div>

              <!-- Icon -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Icon</label>
                <select 
                  v-model="formData.icon"
                  class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white focus:outline-none focus:border-primary"
                >
                  <option v-for="icon in icons" :key="icon.value" :value="icon.value">
                    {{ icon.label }}
                  </option>
                </select>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-2">
                <button 
                  type="button"
                  @click="closeModal"
                  class="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  :disabled="categoryStore.isLoading"
                  class="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Loader2 v-if="categoryStore.isLoading" class="w-4 h-4 animate-spin" />
                  {{ isEditing ? 'Update' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
          <div class="bg-dark-900 border border-dark-700 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle class="w-8 h-8 text-red-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Hapus Kategori?</h3>
              <p class="text-slate-400 mb-6">
                Apakah Anda yakin ingin menghapus kategori <span class="text-white font-medium">"{{ deleteTarget?.name }}"</span>?
              </p>
              <div class="flex gap-3">
                <button 
                  @click="showDeleteModal = false; deleteTarget = null"
                  class="flex-1 px-4 py-3 bg-dark-800 hover:bg-dark-700 text-white font-medium rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  @click="handleDelete"
                  :disabled="categoryStore.isLoading"
                  class="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Loader2 v-if="categoryStore.isLoading" class="w-4 h-4 animate-spin" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
