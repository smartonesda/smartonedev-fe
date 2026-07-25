import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views — only HomeView is eagerly loaded (landing page)
import HomeView from '@/views/HomeView.vue'
const LoginView = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const DashboardHome = () => import('@/views/DashboardHome.vue')
const GalleryManagement = () => import('@/views/GalleryManagement.vue')
const CategoryManagement = () => import('@/views/CategoryManagement.vue')
const TrackerLomba = () => import('@/views/TrackerLomba.vue')

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
      path: '/tracker',
      name: 'tracker-lomba',
      component: TrackerLomba,
      meta: { title: 'Tracker Lomba' }
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
      meta: { title: 'Detail Project', transition: 'slide-right' }
    },
    // Catch-all redirect
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(savedPosition), 350)
      })
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 400)
      })
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve({ top: 0 }), 350)
    })
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
