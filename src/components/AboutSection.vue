<script setup>
import { Rocket, Users2, TerminalSquare } from 'lucide-vue-next'
</script>

<template>
  <section id="tentang" class="py-24 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div data-aos="fade-right">
          <h2 class="text-accent-gold font-bold tracking-wider uppercase mb-2">Tentang Kami</h2>
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Lebih Dari Sekedar <span class="text-primary">Barisan Kode.</span>
          </h3>
          <p class="text-slate-400 text-lg leading-relaxed mb-8">
            SmartOneDev adalah inisiatif kolektif siswa jurusan Rekayasa Perangkat Lunak (RPL) SMKS Antartika
            1 Sidoarjo. Kami percaya bahwa cara terbaik untuk belajar adalah dengan membangun proyek nyata
            dan berkolaborasi.
          </p>

          <div class="space-y-6">
            <div class="flex gap-4 items-start group">
              <div class="bg-dark-800 p-3 rounded-lg border border-dark-700 group-hover:border-primary transition-colors">
                <Rocket class="text-primary w-6 h-6" />
              </div>
              <div>
                <h4 class="text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                  Inovasi Berkelanjutan
                </h4>
                <p class="text-slate-500">
                  Mendorong siswa untuk menciptakan solusi digital yang relevan dengan masalah di sekitar sekolah dan masyarakat.
                </p>
              </div>
            </div>
            <div class="flex gap-4 items-start group">
              <div class="bg-dark-800 p-3 rounded-lg border border-dark-700 group-hover:border-accent-gold transition-colors">
                <Users2 class="text-accent-gold w-6 h-6" />
              </div>
              <div>
                <h4 class="text-white font-bold text-xl mb-1 group-hover:text-accent-gold transition-colors">
                  Kolaborasi Lintas Angkatan
                </h4>
                <p class="text-slate-500">
                  Menghilangkan sekat antar kelas. Senior membimbing junior, junior memberikan perspektif segar.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Representation -->
        <div data-aos="fade-left" class="relative">
          <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent-gold/20 blur-3xl rounded-full"></div>
          <div class="relative bg-dark-900/50 border border-dark-700/50 backdrop-blur-xl rounded-2xl p-8 overflow-hidden shadow-2xl">
            <div class="absolute top-0 right-0 p-4 text-dark-700">
              <TerminalSquare class="w-12 h-12 opacity-50" />
            </div>
            <pre class="font-mono text-sm text-slate-300 overflow-x-auto">
<span class="text-primary">class</span> <span class="text-accent-gold">SmartOneDev</span> {
  <span class="text-primary">constructor</span>() {
    <span class="text-accent-gold">this</span>.school = <span class="text-green-400">"SMKS Antartika 1 Sidoarjo"</span>;
    <span class="text-accent-gold">this</span>.passion = [<span class="text-green-400">"Coding"</span>, <span class="text-green-400">"Problem Solving"</span>];
  }

  <span class="text-primary">mission</span>() {
    <span class="text-accent-gold">return</span> <span class="text-green-400">"Build, Share, Inspire."</span>;
  }
}

<span class="text-slate-500">// Let's build the future together.</span>
</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
