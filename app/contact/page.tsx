"use client";

import { Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="min-h-screen w-full bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] pt-20 pb-32 flex flex-col items-center px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-white/20 rounded-3xl blur-3xl rotate-12"></div>
      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-[#C1D4EA]/30 rounded-full blur-3xl"></div>

      {/* Tag */}
      <div className="text-sm px-5 py-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] font-semibold shadow-sm z-10 flex items-center gap-2">
        <Mail className="w-4 h-4" />
        Contact & Support
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#2F3A4B] leading-snug max-w-4xl mt-6 drop-shadow-sm z-10">
        We’re here to help you grow with Journify
      </h1>

      {/* Subtitle */}
      <p className="text-[#415167]/80 max-w-2xl text-center mt-4 z-10">
        Punya pertanyaan, saran, atau ingin berkolaborasi? Tim Journify siap
        mendengarkan dan membantu perjalanan produktivitasmu.
      </p>

      {/* CONTENT GRID */}
      <div className="mt-16 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 z-10">
        {/* LEFT: INFO */}
        <div className="space-y-6">
          {/* Info Card */}
          <div className="bg-white/25 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-xl p-6 transition-all hover:shadow-2xl">
            <h3 className="text-lg font-bold text-[#2F3A4B] mb-4">
              Informasi Kontak
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#3B6A9E]" />
                </div>
                <div>
                  <p className="text-xs text-[#415167]/70">Email</p>
                  <p className="font-semibold text-[#2F3A4B]">
                    support@journify.app
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#3B6A9E]" />
                </div>
                <div>
                  <p className="text-xs text-[#415167]/70">Location</p>
                  <p className="font-semibold text-[#2F3A4B]">Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-white/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#3B6A9E]" />
                </div>
                <div>
                  <p className="text-xs text-[#415167]/70">Response Time</p>
                  <p className="font-semibold text-[#2F3A4B]">≤ 24 jam kerja</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Note */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-lg p-6">
            <h4 className="font-semibold text-[#2F3A4B] mb-2">
              Butuh Bantuan Cepat?
            </h4>
            <p className="text-sm text-[#415167]/80">
              Untuk pertanyaan umum, bug report, atau masukan fitur, kirimkan
              pesan melalui form di samping. Kami membaca setiap pesan dengan
              serius.
            </p>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white/25 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-xl p-8 transition-all hover:shadow-2xl">
            <h3 className="text-xl font-bold text-[#2F3A4B] mb-6">
              Kirim Pesan ke Journify
            </h3>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Pesan terkirim! (Demo)");
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nama"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition placeholder:text-slate-400 text-slate-700"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition placeholder:text-slate-400 text-slate-700"
                />
              </div>

              <input
                type="text"
                placeholder="Subjek"
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition placeholder:text-slate-400 text-slate-700"
              />

              <textarea
                rows={5}
                placeholder="Tulis pesan Anda..."
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/50 focus:border-[#3B6A9E] outline-none transition resize-none placeholder:text-slate-400 text-slate-700"
              />

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  Kirim Pesan
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
