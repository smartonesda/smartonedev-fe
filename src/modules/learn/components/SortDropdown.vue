<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown, SlidersHorizontal } from 'lucide-vue-next'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (opt) => {
  emit('update:modelValue', opt)
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <!-- Trigger Button -->
    <button 
      @click="toggleDropdown"
      class="flex items-center gap-2 px-4 py-2.5 bg-dark-900/60 backdrop-blur-md border border-dark-800 hover:border-dark-700 rounded-xl text-slate-300 text-xs md:text-sm font-semibold transition-all duration-200 outline-none"
    >
      <SlidersHorizontal class="w-4 h-4 text-primary" />
      <span>Urutkan: {{ modelValue }}</span>
      <ChevronDown class="w-4 h-4 text-slate-500 transform transition-transform" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Dropdown Panel -->
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-dark-900 border border-dark-800 shadow-2xl z-20 overflow-hidden"
      >
        <div class="py-1">
          <button 
            v-for="opt in options" 
            :key="opt"
            @click="selectOption(opt)"
            class="block w-full text-left px-4 py-2 text-sm transition-colors duration-200"
            :class="[
              modelValue === opt 
                ? 'bg-primary/10 text-primary font-bold' 
                : 'text-slate-400 hover:bg-dark-800 hover:text-slate-200'
            ]"
          >
            {{ opt }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
