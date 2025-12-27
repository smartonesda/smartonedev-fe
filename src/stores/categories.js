import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useCategoryStore = defineStore('categories', () => {
    const categories = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchCategories = async () => {
        isLoading.value = true
        error.value = null

        try {
            const response = await axios.get(`${API_URL}/categories`)
            categories.value = response.data.data || []
        } catch (err) {
            console.error('Failed to fetch categories:', err.message)
            error.value = 'Gagal memuat kategori dari server'
            // Fallback to default categories if API fails
            categories.value = [
                { id: '1', name: 'Web App', slug: 'web-app', color: '#dc2626', icon: 'globe' },
                { id: '2', name: 'Mobile', slug: 'mobile', color: '#f59e0b', icon: 'smartphone' },
                { id: '3', name: 'Game', slug: 'game', color: '#10b981', icon: 'gamepad-2' },
                { id: '4', name: 'IoT', slug: 'iot', color: '#3b82f6', icon: 'cpu' }
            ]
        } finally {
            isLoading.value = false
        }
    }

    const createCategory = async (categoryData) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            const response = await axios.post(`${API_URL}/categories`, categoryData, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const newCategory = response.data.data
            categories.value.push(newCategory)
            return { success: true, data: newCategory }
        } catch (err) {
            console.error('Failed to create category:', err.message)
            const message = err.response?.data?.message || 'Gagal membuat kategori'
            error.value = message
            return { success: false, message }
        } finally {
            isLoading.value = false
        }
    }

    const updateCategory = async (id, categoryData) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            const response = await axios.put(`${API_URL}/categories/${id}`, categoryData, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            const updatedCategory = response.data.data
            const index = categories.value.findIndex(c => c.id === id)
            if (index !== -1) {
                categories.value[index] = updatedCategory
            }
            return { success: true, data: updatedCategory }
        } catch (err) {
            console.error('Failed to update category:', err.message)
            const message = err.response?.data?.message || 'Gagal mengupdate kategori'
            error.value = message
            return { success: false, message }
        } finally {
            isLoading.value = false
        }
    }

    const deleteCategory = async (id) => {
        isLoading.value = true
        error.value = null

        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${API_URL}/categories/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            categories.value = categories.value.filter(c => c.id !== id)
            return { success: true }
        } catch (err) {
            console.error('Failed to delete category:', err.message)
            const message = err.response?.data?.message || 'Gagal menghapus kategori'
            error.value = message
            return { success: false, message }
        } finally {
            isLoading.value = false
        }
    }

    return {
        categories,
        isLoading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
})
