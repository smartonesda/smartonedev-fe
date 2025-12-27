import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null)
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

    const isAuthenticated = computed(() => !!token.value)

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            })

            if (response.data.success) {
                token.value = response.data.token
                user.value = response.data.user

                localStorage.setItem('token', token.value)
                localStorage.setItem('user', JSON.stringify(user.value))

                // Set default auth header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

                return { success: true }
            }

            return { success: false, message: response.data.message }
        } catch (error) {
            console.error('Login error:', error)
            const message = error.response?.data?.message || 'Login gagal. Periksa koneksi Anda.'
            return { success: false, message }
        }
    }

    const logout = async () => {
        token.value = null
        user.value = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')

        delete axios.defaults.headers.common['Authorization']
    }

    const checkAuth = () => {
        if (token.value) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            return true
        }
        return false
    }

    // Initialize auth header on store creation
    checkAuth()

    return {
        token,
        user,
        isAuthenticated,
        login,
        logout,
        checkAuth
    }
})
