<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGalleryStore } from '@/stores/gallery'
import { useCategoryStore } from '@/stores/categories'
import axios from 'axios'
import { 
  ArrowLeft, 
  Save, 
  Loader2,
  Plus,
  X,
  Trash2,
  Upload,
  Globe,
  Smartphone,
  Gamepad2,
  Cpu,
  Layout,
  BookOpen,
  Image as ImageIcon,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Check
} from 'lucide-vue-next'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const route = useRoute()
const router = useRouter()
const galleryStore = useGalleryStore()
const categoryStore = useCategoryStore()

const isEditing = computed(() => route.params.id !== undefined)
const pageTitle = computed(() => isEditing.value ? 'Edit Karya' : 'Tambah Karya Baru')

const isLoading = ref(false)
const isSubmitting = ref(false)
const isUploading = ref(false)
const isUploadingScreenshot = ref(false)
const uploadError = ref('')
const screenshotError = ref('')
const imagePreview = ref('')
const originalImage = ref('') // Track original image for cleanup

// Toast notification
const toast = ref({ show: false, message: '', type: 'success' })
const showToast = (message, type = 'success') => {
  toast.value = { show: true, message, type }
  setTimeout(() => {
    toast.value.show = false
  }, 4000)
}

const formData = ref({
  title: '',
  category: 'Web App',
  description: '',
  image: '',
  screenshots: [],
  story: { problem: '', solution: '', impact: '' },
  timeline: [],
  team: [],
  tech: [],
  author: '',
  stars: 0,
  collab_open: false,
  bg_gradient: 'from-red-600 to-red-900',
  icon: 'globe',
  github_url: '',
  demo_url: '',
  login_credentials: []
})

const techInput = ref('')
const screenshotUrlInput = ref('')
const screenshotCaptionInput = ref('')

// Team inputs
const teamNameInput = ref('')
const teamRoleInput = ref('')

// Timeline inputs
const timelineDateInput = ref('')
const timelineEventInput = ref('')
const timelineDescInput = ref('')

// Credential inputs
const credLabelInput = ref('')
const credUsernameInput = ref('')
const credPasswordInput = ref('')
const credNoteInput = ref('')
const showCredPassword = ref(false)
const copiedField = ref(null)

// Categories now from store
const categories = computed(() => categoryStore.categories.map(c => c.name))
const gradients = [
  { value: 'from-red-600 to-red-900', label: 'Red', preview: 'bg-gradient-to-r from-red-600 to-red-900' },
  { value: 'from-red-500 to-stone-900', label: 'Red Stone', preview: 'bg-gradient-to-r from-red-500 to-stone-900' },
  { value: 'from-amber-600 to-red-900', label: 'Amber Red', preview: 'bg-gradient-to-r from-amber-600 to-red-900' },
  { value: 'from-orange-600 to-red-800', label: 'Orange Red', preview: 'bg-gradient-to-r from-orange-600 to-red-800' },
  { value: 'from-red-500 to-amber-700', label: 'Red Amber', preview: 'bg-gradient-to-r from-red-500 to-amber-700' },
  { value: 'from-stone-700 to-red-900', label: 'Stone Red', preview: 'bg-gradient-to-r from-stone-700 to-red-900' }
]
const icons = [
  { value: 'globe', label: 'Web', icon: Globe },
  { value: 'smartphone', label: 'Mobile', icon: Smartphone },
  { value: 'gamepad-2', label: 'Game', icon: Gamepad2 },
  { value: 'cpu', label: 'IoT', icon: Cpu },
  { value: 'layout', label: 'Layout', icon: Layout },
  { value: 'book-open', label: 'Book', icon: BookOpen }
]

// Load project data if editing
onMounted(async () => {
  // Start loading immediately to prevent flash
  isLoading.value = true
  
  try {
    // Fetch categories
    await categoryStore.fetchCategories()
    
    if (isEditing.value) {
      // Fetch from store or API
      await galleryStore.fetchProjects()
      const project = galleryStore.projects.find(p => p.id === route.params.id)
      if (project) {
        formData.value = {
          ...project,
          tech: Array.isArray(project.tech) ? [...project.tech] : [],
          screenshots: Array.isArray(project.screenshots) ? [...project.screenshots] : [],
          story: project.story || { problem: '', solution: '', impact: '' },
          timeline: Array.isArray(project.timeline) ? [...project.timeline] : [],
          team: Array.isArray(project.team) ? [...project.team] : [],
          login_credentials: Array.isArray(project.login_credentials) ? [...project.login_credentials] : []
        }
        imagePreview.value = project.image || ''
        originalImage.value = project.image || '' // Store original for comparison
      }
    }
  } catch (error) {
    console.error('Error loading:', error)
  } finally {
    isLoading.value = false
  }
})

// Tech stack functions
const addTech = () => {
  if (techInput.value.trim() && !formData.value.tech.includes(techInput.value.trim())) {
    formData.value.tech.push(techInput.value.trim())
    techInput.value = ''
  }
}

const removeTech = (tech) => {
  formData.value.tech = formData.value.tech.filter(t => t !== tech)
}

// Screenshot functions
const addScreenshot = () => {
  if (screenshotUrlInput.value.trim()) {
    if (!formData.value.screenshots) formData.value.screenshots = []
    formData.value.screenshots.push({
      url: screenshotUrlInput.value.trim(),
      caption: screenshotCaptionInput.value.trim() || 'Screenshot'
    })
    screenshotUrlInput.value = ''
    screenshotCaptionInput.value = ''
    screenshotError.value = ''
  }
}

// Helper to detect images managed by our backend storage (Cloudinary)
const isManagedStorageUrl = (url) => {
  if (!url || typeof url !== 'string') return false
  return url.includes('res.cloudinary.com') || url.includes('cloudinary.com')
}

const extractFilenameFromUrl = (url) => {
  const cleanUrl = url.split('?')[0]
  const urlParts = cleanUrl.split('/')
  return urlParts[urlParts.length - 1]
}

const removeScreenshot = async (index) => {
  const screenshot = formData.value.screenshots[index]
  
  // If it's an uploaded image (managed storage URL), delete from storage
  if (isManagedStorageUrl(screenshot?.url)) {
    try {
      const filename = extractFilenameFromUrl(screenshot.url)
      
      const token = localStorage.getItem('token')
      await axios.delete(`${API_URL}/gallery/image/${encodeURIComponent(filename)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    } catch (error) {
      console.error('Failed to delete image from storage:', error)
      // Continue with removal from array even if storage delete fails
    }
  }
  
  formData.value.screenshots.splice(index, 1)
}

// Team functions
const addTeamMember = () => {
  if (teamNameInput.value.trim()) {
    if (!formData.value.team) formData.value.team = []
    formData.value.team.push({
      name: teamNameInput.value.trim(),
      role: teamRoleInput.value.trim() || 'Member',
      avatar: null
    })
    teamNameInput.value = ''
    teamRoleInput.value = ''
  }
}

const removeTeamMember = (index) => {
  formData.value.team.splice(index, 1)
}

// Timeline functions
const addTimelineEvent = () => {
  if (timelineDateInput.value.trim() && timelineEventInput.value.trim()) {
    if (!formData.value.timeline) formData.value.timeline = []
    formData.value.timeline.push({
      date: timelineDateInput.value.trim(),
      event: timelineEventInput.value.trim(),
      description: timelineDescInput.value.trim() || ''
    })
    timelineDateInput.value = ''
    timelineEventInput.value = ''
    timelineDescInput.value = ''
  }
}

const removeTimelineEvent = (index) => {
  formData.value.timeline.splice(index, 1)
}

// Upload functions
const uploadImage = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    uploadError.value = 'Format tidak didukung'
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'Max 5MB'
    return
  }

  isUploading.value = true
  uploadError.value = ''

  try {
    // Delete old image from storage if it was uploaded to managed storage
    if (isManagedStorageUrl(formData.value.image)) {
      try {
        const oldFilename = extractFilenameFromUrl(formData.value.image)
        const token = localStorage.getItem('token')
        await axios.delete(`${API_URL}/gallery/image/${encodeURIComponent(oldFilename)}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      } catch (e) {
        console.error('Failed to delete old image:', e)
      }
    }

    const formDataUpload = new FormData()
    formDataUpload.append('image', file)
    const token = localStorage.getItem('token')
    
    const response = await axios.post(`${API_URL}/gallery/upload`, formDataUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      formData.value.image = response.data.data.url
      imagePreview.value = response.data.data.url
    }
  } catch (error) {
    uploadError.value = 'Upload gagal'
  } finally {
    isUploading.value = false
  }
}

const uploadScreenshot = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    screenshotError.value = 'Format tidak didukung'
    return
  }

  isUploadingScreenshot.value = true
  screenshotError.value = ''

  try {
    const formDataUpload = new FormData()
    formDataUpload.append('image', file)
    const token = localStorage.getItem('token')
    
    const response = await axios.post(`${API_URL}/gallery/upload`, formDataUpload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.data.success) {
      if (!formData.value.screenshots) formData.value.screenshots = []
      formData.value.screenshots.push({
        url: response.data.data.url,
        caption: screenshotCaptionInput.value.trim() || `Screenshot ${formData.value.screenshots.length + 1}`
      })
      screenshotCaptionInput.value = ''
    }
  } catch (error) {
    screenshotError.value = 'Upload gagal'
  } finally {
    isUploadingScreenshot.value = false
  }
}

// Submit form
const handleSubmit = async () => {
  // Validation
  if (!formData.value.title?.trim()) {
    showToast('Judul wajib diisi!', 'error')
    return
  }
  if (!formData.value.category) {
    showToast('Kategori wajib dipilih!', 'error')
    return
  }
  if (!formData.value.description?.trim()) {
    showToast('Deskripsi wajib diisi!', 'error')
    return
  }
  if (!formData.value.author?.trim()) {
    showToast('Author/Tim wajib diisi!', 'error')
    return
  }

  isSubmitting.value = true
  try {
    // Cleanup: If image changed and old image was from managed storage, delete it
    if (isEditing.value && isManagedStorageUrl(originalImage.value)) {
      if (formData.value.image !== originalImage.value) {
        try {
          const oldFilename = extractFilenameFromUrl(originalImage.value)
          const token = localStorage.getItem('token')
          await axios.delete(`${API_URL}/gallery/image/${encodeURIComponent(oldFilename)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        } catch (e) {
          console.error('Failed to cleanup old image:', e)
        }
      }
    }

    if (isEditing.value) {
      await galleryStore.updateProject(formData.value.id, formData.value)
      showToast('Karya berhasil diupdate! 🎉', 'success')
    } else {
      await galleryStore.createProject(formData.value)
      showToast('Karya berhasil ditambahkan! 🎉', 'success')
    }
    setTimeout(() => {
      router.push('/dashboard/gallery')
    }, 1500)
  } catch (error) {
    console.error('Error saving:', error)
    showToast('Gagal menyimpan karya. Coba lagi.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  router.push('/dashboard/gallery')
}

// ──────────────────────────────────────────
// Login Credentials functions
// ──────────────────────────────────────────
const addCredential = () => {
  if (!credUsernameInput.value.trim() || !credPasswordInput.value.trim()) return
  if (!formData.value.login_credentials) formData.value.login_credentials = []
  formData.value.login_credentials.push({
    label: credLabelInput.value.trim() || 'Demo Account',
    username: credUsernameInput.value.trim(),
    password: credPasswordInput.value.trim(),
    note: credNoteInput.value.trim()
  })
  credLabelInput.value = ''
  credUsernameInput.value = ''
  credPasswordInput.value = ''
  credNoteInput.value = ''
  showCredPassword.value = false
}

const removeCredential = (index) => {
  formData.value.login_credentials.splice(index, 1)
}

const copyToClipboard = async (text, fieldKey) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = fieldKey
    setTimeout(() => { copiedField.value = null }, 2000)
  } catch (e) {
    console.error('Copy failed:', e)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto overflow-x-hidden">
    <!-- Toast Notification -->
    <Teleport to="body">
      <Transition name="toast">
        <div 
          v-if="toast.show"
          class="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-sm animate-slideIn"
          :class="toast.type === 'success' 
            ? 'bg-green-500/90 border-green-400 text-white' 
            : 'bg-red-500/90 border-red-400 text-white'"
        >
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
    <div class="flex items-center gap-4 mb-8">
      <button 
        @click="goBack"
        class="p-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
      </button>
      <div>
        <h1 class="text-3xl font-bold text-white">{{ pageTitle }}</h1>
        <p class="text-slate-400">Lengkapi informasi project di bawah ini</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="space-y-4 sm:space-y-6">
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <div class="flex items-center justify-center py-12">
          <div class="text-center">
            <Loader2 class="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            <p class="text-slate-400">Memuat data...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
      <!-- Basic Info Card -->
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span class="text-primary font-bold">1</span>
          </div>
          Informasi Dasar
        </h2>
        
        <div class="space-y-6">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Judul Project *</label>
            <input
              v-model="formData.title"
              type="text"
              required
              class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Masukkan nama project..."
            />
          </div>
          
          <!-- Category & Author -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Kategori *</label>
              <select
                v-model="formData.category"
                class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Author / Tim</label>
              <input
                v-model="formData.author"
                type="text"
                class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Nama pembuat..."
              />
            </div>
          </div>
          
          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Deskripsi</label>
            <textarea
              v-model="formData.description"
              rows="4"
              class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Jelaskan tentang project ini..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Media Card -->
      <div class="bg-dark-900 border border-dark-800 rounded-2xl p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <span class="text-green-400 font-bold">2</span>
          </div>
          Media & Gambar
        </h2>
        
        <div class="space-y-6">
          <!-- Main Image -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Gambar Utama</label>
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Preview -->
              <div class="w-full sm:w-48 h-40 sm:h-32 bg-dark-800 rounded-xl overflow-hidden border border-dark-700 flex-shrink-0">
                <img 
                  v-if="imagePreview" 
                  :src="imagePreview" 
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-slate-500">
                  <ImageIcon class="w-8 h-8" />
                </div>
              </div>
              
              <!-- Upload Controls -->
              <div class="flex-1 space-y-3">
                <input
                  v-model="formData.image"
                  type="url"
                  class="w-full px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                  placeholder="https://example.com/image.jpg"
                  @input="imagePreview = formData.image"
                />
                
                <!-- OR Divider -->
                <div class="flex items-center gap-3">
                  <div class="flex-1 h-px bg-dark-700"></div>
                  <span class="text-xs text-slate-500 font-medium">ATAU</span>
                  <div class="flex-1 h-px bg-dark-700"></div>
                </div>
                
                <label 
                  class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg cursor-pointer transition-colors"
                  :class="{ 'opacity-50': isUploading }"
                >
                  <Loader2 v-if="isUploading" class="w-4 h-4 animate-spin" />
                  <Upload v-else class="w-4 h-4" />
                  <span class="font-medium">{{ isUploading ? 'Uploading...' : 'Upload File' }}</span>
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="uploadImage"
                    :disabled="isUploading"
                  />
                </label>
                <p v-if="uploadError" class="text-red-400 text-xs">{{ uploadError }}</p>
              </div>
            </div>
          </div>
          
          <!-- Screenshots -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Screenshots Carousel
              <span class="text-slate-500 font-normal ml-1">({{ formData.screenshots?.length || 0 }})</span>
            </label>
            
            <!-- Screenshots Grid -->
            <div v-if="formData.screenshots?.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-4">
              <div 
                v-for="(ss, idx) in formData.screenshots" 
                :key="idx"
                class="relative group aspect-video bg-dark-800 rounded-lg overflow-hidden border border-dark-700"
              >
                <img :src="ss.url" :alt="ss.caption" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button type="button" @click="removeScreenshot(idx)" class="p-1.5 bg-red-500 rounded-full">
                    <Trash2 class="w-3 h-3 text-white" />
                  </button>
                </div>
                <div class="absolute bottom-0 inset-x-0 bg-dark-950/80 px-1 py-0.5 text-[10px] text-center truncate">
                  {{ ss.caption }}
                </div>
              </div>
            </div>
            
            <!-- Add Screenshot -->
            <div class="bg-dark-800/50 border border-dark-700 rounded-xl p-3 sm:p-4 space-y-3 overflow-hidden">
              <p class="text-sm text-slate-400">Tambah screenshot baru:</p>
              
              <!-- Step 1: Caption (always visible) -->
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Caption</label>
                <input
                  v-model="screenshotCaptionInput"
                  type="text"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                  placeholder="Contoh: Home Screen, Login Page"
                />
              </div>
              
              <!-- Step 2: Image Source Options -->
              <div class="space-y-3">
                <!-- Option 1: URL -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-slate-400">Opsi 1: Link URL</label>
                  <div class="flex gap-2">
                    <input
                      v-model="screenshotUrlInput"
                      type="url"
                      class="flex-1 min-w-0 px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                      placeholder="https://..."
                    />
                    <button 
                      type="button" 
                      @click="addScreenshot" 
                      class="flex-shrink-0 px-3 sm:px-4 py-2.5 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors"
                      title="Tambah dari URL"
                    >
                      <Plus class="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                
                <!-- Option 2: Upload -->
                <div class="space-y-1.5">
                  <label class="block text-xs font-medium text-slate-400">Opsi 2: Upload File</label>
                  <label class="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg cursor-pointer transition-colors">
                    <Loader2 v-if="isUploadingScreenshot" class="w-4 h-4 animate-spin" />
                    <Upload v-else class="w-4 h-4" />
                    <span class="font-medium text-sm">{{ isUploadingScreenshot ? 'Uploading...' : 'Pilih File' }}</span>
                    <input type="file" accept="image/*" class="hidden" @change="uploadScreenshot" :disabled="isUploadingScreenshot" />
                  </label>
                </div>
              </div>
              
              <p v-if="screenshotError" class="text-red-400 text-xs">{{ screenshotError }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack Card -->
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
            <span class="text-yellow-400 font-bold">3</span>
          </div>
          Tech Stack & Styling
        </h2>
        
        <div class="space-y-6">
          <!-- Tech Stack -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Tech Stack</label>
            <div class="flex gap-2 mb-3">
              <input
                v-model="techInput"
                type="text"
                @keydown.enter.prevent="addTech"
                class="flex-1 min-w-0 px-4 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                placeholder="React, Laravel, Flutter..."
              />
              <button type="button" @click="addTech" class="flex-shrink-0 px-3 sm:px-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors">
                <Plus class="w-5 h-5 text-white" />
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in formData.tech" 
                :key="tech"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/20 border border-primary/30 text-primary rounded-full text-sm font-medium"
              >
                {{ tech }}
                <button type="button" @click="removeTech(tech)" class="hover:text-red-400 transition-colors">
                  <X class="w-3.5 h-3.5" />
                </button>
              </span>
            </div>
          </div>
          
          <!-- Gradient & Icon -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Gradient Background</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="grad in gradients"
                  :key="grad.value"
                  type="button"
                  @click="formData.bg_gradient = grad.value"
                  class="h-12 rounded-lg border-2 transition-all"
                  :class="[
                    grad.preview,
                    formData.bg_gradient === grad.value ? 'border-white scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  ]"
                  :title="grad.label"
                ></button>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Icon</label>
              <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                <button
                  v-for="ic in icons"
                  :key="ic.value"
                  type="button"
                  @click="formData.icon = ic.value"
                  class="h-12 flex items-center justify-center rounded-lg border-2 transition-all"
                  :class="formData.icon === ic.value ? 'border-primary bg-primary/20' : 'border-dark-700 bg-dark-800 hover:border-dark-600'"
                  :title="ic.label"
                >
                  <component :is="ic.icon" class="w-5 h-5" :class="formData.icon === ic.value ? 'text-primary' : 'text-slate-400'" />
                </button>
              </div>
            </div>
          </div>
          
          <!-- Stars & Collab -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Stars</label>
              <input
                v-model.number="formData.stars"
                type="number"
                min="0"
                class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white focus:outline-none focus:border-primary"
              />
            </div>
            <div class="flex items-center">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="formData.collab_open"
                  type="checkbox"
                  class="w-5 h-5 rounded border-dark-600 bg-dark-800 text-primary focus:ring-primary focus:ring-offset-0"
                />
                <span class="text-slate-300">Open for Collaboration</span>
              </label>
            </div>
          </div>
          
          <!-- URLs -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">GitHub URL</label>
              <input
                v-model="formData.github_url"
                type="url"
                class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-300 mb-2">Demo URL</label>
              <input
                v-model="formData.demo_url"
                type="url"
                class="w-full px-4 py-3 bg-dark-800 border border-dark-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                placeholder="https://demo.example.com"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Story & Team Card (Step 4) -->
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <span class="text-purple-400 font-bold">4</span>
          </div>
          Story & Tim Pengembang
        </h2>
        
        <div class="space-y-6">
          <!-- Story - Problem/Solution/Impact -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-3">Cerita Project (Problem → Solution → Impact)</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs text-red-400 mb-1.5 font-medium">🎯 Masalah</label>
                <textarea
                  v-model="formData.story.problem"
                  rows="4"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-red-400 resize-none"
                  placeholder="Apa masalah yang ingin diselesaikan?"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs text-blue-400 mb-1.5 font-medium">💡 Solusi</label>
                <textarea
                  v-model="formData.story.solution"
                  rows="4"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Bagaimana project ini menyelesaikannya?"
                ></textarea>
              </div>
              <div>
                <label class="block text-xs text-green-400 mb-1.5 font-medium">📈 Dampak</label>
                <textarea
                  v-model="formData.story.impact"
                  rows="4"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-green-400 resize-none"
                  placeholder="Apa hasil/dampak positifnya?"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Team Members -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Tim Pengembang
              <span class="text-slate-500 font-normal ml-1">({{ formData.team?.length || 0 }} anggota)</span>
            </label>
            
            <!-- Team Grid -->
            <div v-if="formData.team?.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 mb-4">
              <div 
                v-for="(member, idx) in formData.team" 
                :key="idx"
                class="relative group bg-dark-800 border border-dark-700 rounded-lg p-2 sm:p-3 text-center"
              >
                <div class="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-1.5 sm:mb-2 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                  {{ member.name.charAt(0).toUpperCase() }}
                </div>
                <p class="text-xs sm:text-sm text-white font-medium truncate">{{ member.name }}</p>
                <p class="text-[10px] sm:text-xs text-slate-400 truncate">{{ member.role }}</p>
                <button
                  type="button"
                  @click="removeTeamMember(idx)"
                  class="absolute top-1 right-1 p-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <!-- Add Team Member -->
            <div class="space-y-2">
              <div class="flex flex-col sm:flex-row gap-2">
                <input
                  v-model="teamNameInput"
                  type="text"
                  class="flex-1 min-w-0 px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                  placeholder="Nama anggota..."
                />
                <input
                  v-model="teamRoleInput"
                  type="text"
                  class="w-full sm:w-32 px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                  placeholder="Role (opsional)"
                />
              </div>
              <button 
                type="button" 
                @click="addTeamMember" 
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-colors"
              >
                <Plus class="w-4 h-4" />
                <span class="font-medium text-sm">Tambah Anggota</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline Card (Step 5) -->
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <span class="text-cyan-400 font-bold">5</span>
          </div>
          Perjalanan Pengembangan
        </h2>
        
        <div class="space-y-4">
          <!-- Timeline Events -->
          <div v-if="formData.timeline?.length > 0" class="space-y-3">
            <div 
              v-for="(event, idx) in formData.timeline" 
              :key="idx"
              class="relative flex gap-3 sm:gap-4 bg-dark-800 border border-dark-700 rounded-lg p-3 sm:p-4 group"
            >
              <div class="flex-shrink-0">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                  {{ idx + 1 }}
                </div>
              </div>
              <div class="flex-1 min-w-0 overflow-hidden">
                <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                  <span class="text-xs text-cyan-400 font-medium">{{ event.date }}</span>
                  <span class="text-white font-medium text-sm sm:text-base truncate">{{ event.event }}</span>
                </div>
                <p v-if="event.description" class="text-xs sm:text-sm text-slate-400 line-clamp-2">{{ event.description }}</p>
              </div>
              <button
                type="button"
                @click="removeTimelineEvent(idx)"
                class="absolute top-2 right-2 p-1 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
              >
                <X class="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <!-- Add Timeline Event -->
          <div class="space-y-2">
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                v-model="timelineDateInput"
                type="text"
                class="w-full sm:w-28 px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                placeholder="Okt 2024"
              />
              <input
                v-model="timelineEventInput"
                type="text"
                class="flex-1 min-w-0 px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
                placeholder="Event (mis: Development)"
              />
            </div>
            <input
              v-model="timelineDescInput"
              type="text"
              class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-primary"
              placeholder="Deskripsi (opsional)"
            />
            <button 
              type="button" 
              @click="addTimelineEvent" 
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 rounded-lg transition-colors"
            >
              <Plus class="w-4 h-4" />
              <span class="font-medium text-sm">Tambah Event</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Login Credentials Card (Step 6) -->
      <div class="bg-dark-900 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-8">
        <h2 class="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <span class="text-amber-400 font-bold">6</span>
          </div>
          Demo Login Credentials
        </h2>
        <p class="text-slate-500 text-sm mb-6 ml-10">
          Opsional — isi jika demo live membutuhkan login. Akan tampil di halaman detail project.
        </p>

        <div class="space-y-4">
          <!-- Credentials List -->
          <div v-if="formData.login_credentials?.length > 0" class="space-y-3">
            <div
              v-for="(cred, idx) in formData.login_credentials"
              :key="idx"
              class="relative group flex flex-col gap-2 bg-dark-800 border border-amber-900/30 rounded-xl p-4"
            >
              <!-- Label Badge -->
              <div class="flex items-center justify-between">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wide">
                  <KeyRound class="w-3 h-3" />
                  {{ cred.label }}
                </span>
                <button
                  type="button"
                  @click="removeCredential(idx)"
                  class="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </div>
              <!-- Username -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 w-20 shrink-0">Username</span>
                <code class="flex-1 text-sm text-slate-200 font-mono bg-dark-900/60 px-2.5 py-1 rounded-lg truncate">
                  {{ cred.username }}
                </code>
              </div>
              <!-- Password -->
              <div class="flex items-center gap-2">
                <span class="text-xs text-slate-500 w-20 shrink-0">Password</span>
                <code class="flex-1 text-sm text-slate-200 font-mono bg-dark-900/60 px-2.5 py-1 rounded-lg truncate">
                  {{ cred.password }}
                </code>
              </div>
              <!-- Note -->
              <p v-if="cred.note" class="text-xs text-slate-400 italic mt-1">📝 {{ cred.note }}</p>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-8 border-2 border-dashed border-dark-700 rounded-xl text-slate-500"
          >
            <KeyRound class="w-10 h-10 mb-2 opacity-30" />
            <p class="text-sm">Belum ada kredensial demo</p>
          </div>

          <!-- Add Credential Form -->
          <div class="bg-dark-800/50 border border-dark-700 rounded-xl p-4 space-y-3">
            <p class="text-sm font-medium text-slate-300">Tambah kredensial baru:</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Label -->
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Label / Role</label>
                <input
                  v-model="credLabelInput"
                  type="text"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Admin, Guest, User..."
                />
              </div>
              <!-- Note -->
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Catatan (opsional)</label>
                <input
                  v-model="credNoteInput"
                  type="text"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Akses penuh, hanya baca..."
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Username -->
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Username / Email *</label>
                <input
                  v-model="credUsernameInput"
                  type="text"
                  class="w-full px-3 py-2.5 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="admin@demo.com"
                />
              </div>
              <!-- Password -->
              <div>
                <label class="block text-xs font-medium text-slate-400 mb-1.5">Password *</label>
                <div class="relative">
                  <input
                    v-model="credPasswordInput"
                    :type="showCredPassword ? 'text' : 'password'"
                    class="w-full px-3 py-2.5 pr-10 bg-dark-800 border border-dark-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="password123"
                  />
                  <button
                    type="button"
                    @click="showCredPassword = !showCredPassword"
                    class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Eye v-if="!showCredPassword" class="w-4 h-4" />
                    <EyeOff v-else class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="addCredential"
              :disabled="!credUsernameInput.trim() || !credPasswordInput.trim()"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus class="w-4 h-4" />
              <span class="font-medium text-sm">Tambah Kredensial</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Submit Actions -->
      <div class="flex gap-4 justify-end">
        <button
          type="button"
          @click="goBack"
          class="px-6 py-3 bg-dark-800 hover:bg-dark-700 text-slate-300 font-medium rounded-xl transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
        >
          <Loader2 v-if="isSubmitting" class="w-5 h-5 animate-spin" />
          <Save v-else class="w-5 h-5" />
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Project' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Toast Animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out;
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
