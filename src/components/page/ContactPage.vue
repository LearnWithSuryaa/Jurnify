<template>
  <section
    class="min-h-screen w-full bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] pt-20 pb-32 flex flex-col items-center px-6 relative overflow-hidden"
  >
    <!-- Background Shapes -->
    <div
      class="absolute -top-24 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"
    ></div>
    <div
      class="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"
    ></div>

    <!-- Tag -->
    <div
      class="text-sm px-5 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] font-semibold shadow-sm z-10"
    >
      <Mail class="inline w-4 h-4 mr-1" />
      Contact & Support
    </div>

    <!-- Title -->
    <h1
      class="text-4xl md:text-5xl font-extrabold text-center text-[#2F3A4B] leading-snug max-w-4xl mt-6 drop-shadow-sm z-10"
    >
      We’re here to help you grow with Journify
    </h1>

    <!-- Subtitle -->
    <p class="text-[#415167]/80 max-w-2xl text-center mt-4 z-10">
      Punya pertanyaan, saran, atau ingin berkolaborasi? Tim Journify siap
      mendengarkan dan membantu perjalanan produktivitasmu.
    </p>

    <!-- CONTENT GRID -->
    <div
      class="mt-16 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 z-10"
    >
      <!-- LEFT: INFO -->
      <div class="space-y-6">
        <!-- Info Card -->
        <div
          class="bg-white/25 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-xl p-6 transition-all hover:shadow-2xl"
        >
          <h3 class="text-lg font-bold text-[#2F3A4B] mb-4">
            Informasi Kontak
          </h3>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div
                class="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center"
              >
                <Mail class="w-5 h-5 text-[#3B6A9E]" />
              </div>
              <div>
                <p class="text-xs text-[#415167]/70">Email</p>
                <p class="font-semibold text-[#2F3A4B]">support@journify.app</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center"
              >
                <MapPin class="w-5 h-5 text-[#3B6A9E]" />
              </div>
              <div>
                <p class="text-xs text-[#415167]/70">Location</p>
                <p class="font-semibold text-[#2F3A4B]">Indonesia</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div
                class="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center"
              >
                <Clock class="w-5 h-5 text-[#3B6A9E]" />
              </div>
              <div>
                <p class="text-xs text-[#415167]/70">Response Time</p>
                <p class="font-semibold text-[#2F3A4B]">≤ 24 jam kerja</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Note -->
        <div
          class="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-6"
        >
          <h4 class="font-semibold text-[#2F3A4B] mb-2">
            Butuh Bantuan Cepat?
          </h4>
          <p class="text-sm text-[#415167]/80">
            Untuk pertanyaan umum, bug report, atau masukan fitur, kirimkan
            pesan melalui form di samping. Kami membaca setiap pesan dengan
            serius.
          </p>
        </div>
      </div>

      <!-- RIGHT: FORM -->
      <div class="lg:col-span-2">
        <div
          class="bg-white/25 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-xl p-8 transition-all hover:shadow-2xl"
        >
          <h3 class="text-xl font-bold text-[#2F3A4B] mb-6">
            Kirim Pesan ke Journify
          </h3>

          <form class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama"
                class="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition"
              />
              <input
                type="email"
                placeholder="Email"
                class="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition"
              />
            </div>

            <input
              type="text"
              placeholder="Subjek"
              class="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition"
            />

            <textarea
              rows="5"
              placeholder="Tulis pesan Anda..."
              class="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition resize-none"
            />

            <div class="flex justify-end pt-2">
              <button
                type="submit"
                class="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                Kirim Pesan
                <Send class="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Mail, MapPin, Clock, Send } from "lucide-vue-next";
</script>
