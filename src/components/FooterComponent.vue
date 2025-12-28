<script setup>
import { Code2, Github, Instagram, Phone, ChevronRight, MapPin, Mail, Heart, Coffee } from 'lucide-vue-next'

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang Kami' },
  { href: '#karya', label: 'Galeri Karya' },
  { href: 'https://github.com/smartonesda', label: 'GitHub', external: true }
]
</script>

<template>
  <footer class="bg-dark-950 pt-16 border-t border-dark-800 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <div class="bg-gradient-to-br from-primary to-accent-gold p-1.5 rounded-lg shadow-lg shadow-primary/20">
              <Code2 class="text-white w-5 h-5" />
            </div>
            <span class="text-xl font-extrabold text-white tracking-tight">SmartOneDev</span>
          </div>
          <p class="text-slate-400 leading-relaxed mb-6 max-w-sm">
            Komunitas Developer Siswa SMKS Antartika 1 Sidoarjo. Membangun masa depan melalui inovasi
            teknologi dan semangat kolaborasi terbuka.
          </p>
          <div class="flex gap-4">
            <a
              href="https://github.com/smartonesda"
              target="_blank"
              class="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
            >
              <Github class="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/rpl_smkantartika1sda/"
              target="_blank"
              class="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-slate-400 hover:bg-accent-gold hover:text-white transition-all"
            >
              <Instagram class="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6281293920187"
              target="_blank"
              class="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all"
            >
              <Phone class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 class="text-white font-bold text-lg mb-6">Navigasi</h4>
          <ul class="space-y-3 text-slate-400">
            <li v-for="link in navLinks" :key="link.href">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                class="hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                <ChevronRight class="w-4 h-4" />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-lg mb-6">Kontak Sekolah</h4>
          <ul class="space-y-4 text-slate-400">
            <li class="flex items-start gap-3">
              <MapPin class="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <span>Siwalanpanji, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252</span>
            </li>
            <li class="flex items-center gap-3">
              <Mail class="w-5 h-5 text-primary flex-shrink-0" />
              <a href="mailto:smks.antartika1.sda@gmail.com" class="hover:text-white transition-colors">
                smks.antartika1.sda@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="bg-dark-900 py-6 border-t border-dark-800 text-center text-sm text-slate-500">
      <p>
        Dibuat dengan 
        <Heart class="w-4 h-4 inline text-red-500 fill-red-500" /> 
        dan 
        <Coffee class="w-4 h-4 inline text-yellow-500" /> 
        oleh 
        <b>
          <a href="https://riskiputraalamzah.my.id" target="_blank" rel="noopener noreferrer" class="hover:text-primary">
            Riski Putra Alamzah
          </a>
        </b> 
        & Tim SmartOneDev.
      </p>
      <p class="mt-2">&copy; 2025 SMKS Antartika 1 Sidoarjo. All rights reserved.</p>
    </div>
  </footer>
</template>
