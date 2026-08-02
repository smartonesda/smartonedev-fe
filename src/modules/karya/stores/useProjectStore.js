import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ProjectService } from '../services/project.service.js'

export const useProjectStore = defineStore('projectShowcase', () => {
  const projects = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchProjects = async () => {
    isLoading.value = true
    error.value = null
    try {
      projects.value = await ProjectService.getProjects()
    } catch (err) {
      error.value = 'Gagal memuat galeri karya'
    } finally {
      isLoading.value = false
    }
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects
  }
})
