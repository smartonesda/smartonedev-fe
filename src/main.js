import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import './assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize AOS — disabled on mobile to prevent "missing sections" issue
AOS.init({
    duration: 600,
    once: true,
    offset: 50,
    disable: () => window.innerWidth < 768,
})

app.mount('#app')
