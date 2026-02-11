import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardHome from '@/views/DashboardHome.vue'
import GalleryManagement from '@/views/GalleryManagement.vue'
import CategoryManagement from '@/views/CategoryManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Beranda' }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login', guest: true }
    },
    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardHome,
          meta: { title: 'Dashboard', requiresAuth: true }
        },
        {
          path: 'gallery',
          name: 'gallery-management',
          component: GalleryManagement,
          meta: { title: 'Galeri Karya', requiresAuth: true }
        },
        {
          path: 'gallery/create',
          name: 'gallery-create',
          component: () => import('@/views/ProjectForm.vue'),
          meta: { title: 'Tambah Karya', requiresAuth: true }
        },
        {
          path: 'gallery/edit/:id',
          name: 'gallery-edit',
          component: () => import('@/views/ProjectForm.vue'),
          meta: { title: 'Edit Karya', requiresAuth: true }
        },
        {
          path: 'categories',
          name: 'category-management',
          component: CategoryManagement,
          meta: { title: 'Kelola Kategori', requiresAuth: true }
        }
      ]
    },
    {
      path: '/project/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetail.vue'),
      meta: { title: 'Detail Project' }
    },
    // Catch-all redirect
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Setup axios interceptor for session expiry handling (runs once)
  authStore.setupInterceptors(router)

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Redirect authenticated users away from login page
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'dashboard' })
    return
  }

  // Update document title
  document.title = to.meta.title
    ? `${to.meta.title} | SmartOneDev`
    : 'SmartOneDev'

  next()
})

export default router
