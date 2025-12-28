<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Eye, EyeOff, Lock, User, AlertCircle, Loader2 } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref('')

const isFormValid = computed(() => {
  return username.value.trim() !== '' && password.value.trim() !== ''
})

const handleLogin = async () => {
  if (!isFormValid.value) return
  
  error.value = ''
  isLoading.value = true
  
  try {
    const result = await authStore.login(username.value, password.value)
    if (result.success) {
      router.push('/dashboard')
    } else {
      error.value = result.message || 'Login gagal. Periksa kembali username dan password.'
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-dvh bg-dark-950 flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="cyber-grid absolute inset-0 opacity-20"></div>
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-gold/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
    </div>
    
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <a href="/" class="inline-block">
          <img 
            src="/assets/images/dark-removebg-preview.png" 
            alt="SmartOneDev Logo" 
            class="w-24 mx-auto mb-4"
          />
        </a>
        <h1 class="text-2xl font-bold text-white">Admin Login</h1>
        <p class="text-slate-400 mt-2">Masuk ke dashboard pengelolaan konten</p>
      </div>
      
      <!-- Login Card -->
      <div class="bg-dark-900/80 backdrop-blur-xl border border-dark-700 rounded-2xl p-8 shadow-2xl">
        <!-- Error Alert -->
        <div 
          v-if="error"
          class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-400"
        >
          <AlertCircle class="w-5 h-5 flex-shrink-0" />
          <span class="text-sm">{{ error }}</span>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User class="w-5 h-5 text-slate-500" />
              </div>
              <input
                id="username"
                v-model="username"
                type="text"
                placeholder="Masukkan username"
                class="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                :disabled="isLoading"
                autocomplete="off"
              />
            </div>
          </div>
          
          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="w-5 h-5 text-slate-500" />
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan password"
                class="w-full pl-10 pr-12 py-3 bg-dark-800 border border-dark-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Eye v-if="!showPassword" class="w-5 h-5" />
                <EyeOff v-else class="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-glow text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <span v-if="isLoading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
        </form>
        
        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <a 
            href="/" 
            class="text-slate-400 hover:text-primary text-sm transition-colors"
          >
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Override browser autofill styling */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(31 41 55) inset !important;
  -webkit-text-fill-color: white !important;
  border-color: rgb(55 65 81) !important;
  caret-color: white;
}
</style>
