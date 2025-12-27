# SmartOneDev Frontend

Frontend aplikasi web SmartOneDev menggunakan **Vue.js 3** + **Vite** + **TailwindCSS**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 📁 Struktur Project

```
frontend/
├── public/
│   └── assets/images/      # Logo dan gambar statis
├── src/
│   ├── assets/css/         # Global styles (TailwindCSS)
│   ├── components/         # Reusable Vue components
│   │   ├── NavbarComponent.vue
│   │   ├── HeroSection.vue
│   │   ├── TechMarquee.vue
│   │   ├── AboutSection.vue
│   │   ├── GallerySection.vue
│   │   ├── CollaborationSection.vue
│   │   ├── FooterComponent.vue
│   │   └── SkeletonCard.vue
│   ├── views/              # Page components
│   │   ├── HomeView.vue         # Landing page publik
│   │   ├── LoginView.vue        # Halaman login admin
│   │   ├── DashboardView.vue    # Layout dashboard
│   │   ├── DashboardHome.vue    # Dashboard home
│   │   └── GalleryManagement.vue # CRUD gallery
│   ├── stores/             # Pinia state management
│   │   ├── auth.js         # Authentication state
│   │   └── gallery.js      # Gallery data state
│   ├── router/             # Vue Router config
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

---

## 🔗 Koneksi ke Backend

Frontend terhubung ke backend API melalui environment variable:

```env
VITE_API_URL=http://localhost:3000/api
```

> **Default:** Jika tidak di-set, akan menggunakan `http://localhost:3000/api`

### API Endpoints yang Digunakan

| Endpoint | Fungsi |
|----------|--------|
| `POST /api/auth/login` | Login admin |
| `GET /api/gallery` | Ambil data galeri |
| `POST /api/gallery` | Tambah project baru |
| `PUT /api/gallery/:id` | Update project |
| `DELETE /api/gallery/:id` | Hapus project |

---

## 🔐 Autentikasi

Sistem menggunakan **JWT Token** yang disimpan di `localStorage`:

```javascript
// Token disimpan setelah login berhasil
localStorage.setItem('token', 'jwt_token_here')

// Token dikirim di setiap request protected
headers: {
  'Authorization': 'Bearer ' + token
}
```

### Login Admin
```
Username: smartonedev
Password: smartonedev
```

---

## 📄 Halaman

| Route | Akses | Deskripsi |
|-------|-------|-----------|
| `/` | Public | Landing page dengan semua section |
| `/login` | Guest | Form login admin |
| `/dashboard` | Admin | Dashboard dengan stats overview |
| `/dashboard/gallery` | Admin | Kelola karya siswa (CRUD) |

---

## 🎨 Styling

Menggunakan **TailwindCSS** dengan custom theme:

- **Dark Theme:** Merah gelap (#050000, #1a0505)
- **Primary:** Merah (#dc2626)
- **Accent:** Emas (#f59e0b)
- **Animasi:** Marquee, gradient, pulse

---

## 📦 Dependencies

- `vue` - Framework frontend
- `vue-router` - Routing
- `pinia` - State management
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `lucide-vue-next` - Icon library
- `aos` - Scroll animations

---

## 🔧 Development

```bash
# Format code
npm run format

# Preview production build
npm run preview
```

---

## 📝 Notes

- Frontend dapat berjalan tanpa backend (menggunakan data fallback)
- Skeleton loading ditampilkan saat fetch data
- Responsive design untuk mobile dan desktop
