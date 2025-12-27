import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useGalleryStore = defineStore('gallery', () => {
    const projects = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchProjects = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await axios.get(`${API_URL}/gallery`)
            projects.value = response.data.data || response.data || []
        } catch (err) {
            console.error('Failed to fetch projects:', err.message)
            error.value = 'Gagal memuat data dari server'
            projects.value = []
        } finally {
            isLoading.value = false
        }
    }

    const createProject = async (projectData) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${API_URL}/gallery`, projectData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const newProject = response.data.data || response.data
            projects.value.push(newProject)
            return newProject
        } catch (err) {
            console.error('Failed to create project:', err.message)
            error.value = 'Gagal membuat project'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateProject = async (id, projectData) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`${API_URL}/gallery/${id}`, projectData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const updatedProject = response.data.data || response.data
            const index = projects.value.findIndex(p => p.id === id)
            if (index !== -1) {
                projects.value[index] = updatedProject
            }
            return updatedProject
        } catch (err) {
            console.error('Failed to update project:', err.message)
            error.value = 'Gagal mengupdate project'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const deleteProject = async (id) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${API_URL}/gallery/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            projects.value = projects.value.filter(p => p.id !== id)
        } catch (err) {
            console.error('Failed to delete project:', err.message)
            error.value = 'Gagal menghapus project'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const uploadImage = async (file) => {
        const formData = new FormData()
        formData.append('image', file)

        const token = localStorage.getItem('token')

        const response = await axios.post(`${API_URL}/gallery/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })

        return response.data
    }

    return {
        projects,
        isLoading,
        error,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        uploadImage
    }
})
