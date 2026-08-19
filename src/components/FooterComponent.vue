<script setup>
import { RouterLink } from 'vue-router'
import {
  Code2,
  Github,
  Instagram,
  Phone,
  ChevronRight,
  MapPin,
  Mail,
  Heart,
  Coffee,
  ArrowUpRight
} from 'lucide-vue-next'

const navLinks = [
  { href: '/#beranda', label: 'Beranda', isInternal: true },
  { href: '/#tentang', label: 'Tentang Ekosistem', isInternal: true },
  { href: '/karya', label: 'Galeri Karya Siswa', isRoute: true },
  { href: '/learn', label: 'Learn Center Guidebooks', isRoute: true },
  { href: '/tracker', label: 'Tracker Kompetisi Lomba', isRoute: true },
]
</script>

<template>
  <footer class="bg-[#08080A] pt-16 pb-8 border-t border-white/[0.08] relative text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        <!-- Column 1: Brand & Bio (5 Cols on LG) -->
        <div class="lg:col-span-5 flex flex-col items-start">
          <a href="/" class="flex items-center gap-3 mb-5 group">
            <img
              src="/assets/images/dark-removebg-preview.png"
              alt="SmartOneDev Logo"
              class="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div class="flex flex-col">
              <span class="text-lg font-bold text-white tracking-tight">
                SmartOne<span class="text-primary font-extrabold">Dev</span>
              </span>
              <span class="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                SMKS Antartika 1 Sidoarjo
              </span>
            </div>
          </a>

          <p class="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
            Wadah ekosistem siswa Rekayasa Perangkat Lunak untuk berinovasi, berbagi kode open-source, dan membangun portofolio produk nyata berstandar industri.
          </p>

          <!-- Social Icons Row -->
          <div class="flex items-center gap-3">
            <a
              href="https://github.com/smartonesda"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#18181B] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-white/[0.2] hover:bg-[#202024] transition-all"
              aria-label="GitHub SmartOneDev"
              title="GitHub Organization"
            >
              <Github class="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/rpl_smkantartika1sda/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#18181B] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-accent-orange hover:border-accent-orange/30 hover:bg-[#202024] transition-all"
              aria-label="Instagram RPL SMKS Antartika 1"
              title="Instagram RPL"
            >
              <Instagram class="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6281293920187"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-xl bg-[#18181B] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-400/30 hover:bg-[#202024] transition-all"
              aria-label="WhatsApp Contact"
              title="Hubungi Kami"
            >
              <Phone class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Column 2: Navigation Links (3 Cols on LG) -->
        <div class="lg:col-span-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-5">
            Eksplorasi Platform
          </h4>
          <ul class="space-y-3 text-sm">
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink
                v-if="link.isRoute"
                :to="link.href"
                class="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
              >
                <ChevronRight class="w-3.5 h-3.5 text-slate-600 group-hover:text-primary transition-colors" />
                <span>{{ link.label }}</span>
              </RouterLink>
              <a
                v-else
                :href="link.href"
                class="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
              >
                <ChevronRight class="w-3.5 h-3.5 text-slate-600 group-hover:text-primary transition-colors" />
                <span>{{ link.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Contact & Institution Info (4 Cols on LG) -->
        <div class="lg:col-span-4">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider mb-5">
            Kampus & Informasi
          </h4>
          <ul class="space-y-3.5 text-sm">
            <li class="flex items-start gap-3">
              <MapPin class="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span class="leading-relaxed text-slate-400 text-xs sm:text-sm">
                Jl. Raya Siwalanpanji, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252
              </span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-4 h-4 text-primary shrink-0" />
              <a
                href="mailto:smks.antartika1.sda@gmail.com"
                class="hover:text-white text-xs sm:text-sm transition-colors"
              >
                smks.antartika1.sda@gmail.com
              </a>
            </li>
            <li class="pt-2">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#18181B] border border-white/[0.06] text-xs text-slate-400">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Jurusan Rekayasa Perangkat Lunak
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom Footer Bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
      <p>
        &copy; 2025 SMKS Antartika 1 Sidoarjo. Hak Cipta Dilindungi.
      </p>
      <p class="flex items-center justify-center gap-1">
        Dibuat oleh 
        <a
          href="https://riskiputraalamzah.my.id"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold text-slate-400 hover:text-primary transition-colors underline decoration-slate-700 underline-offset-2"
        >
          Riski Putra Alamzah
        </a> 
        &amp; Tim SmartOneDev.
      </p>
    </div>
  </footer>
</template>
