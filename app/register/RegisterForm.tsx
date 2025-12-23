"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { UserPlus } from "lucide-react";

export default function RegisterForm() {
  const supabase = createSupabaseClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({ name: "", email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [exiting, setExiting] = useState(false);

  function validate() {
    const e = { name: "", email: "", password: "" };

    if (!name.trim()) e.name = "Nama tidak boleh kosong.";
    if (!email.trim()) e.email = "Email tidak boleh kosong.";

    if (password.length < 6) e.password = "Minimal 6 karakter.";

    setErrors(e);
    return !e.name && !e.email && !e.password;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");

    if (!validate()) return;

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message || "Terjadi kesalahan saat registrasi.");
      return;
    }

    // Trigger fade-out before redirect
    setExiting(true);

    setTimeout(() => {
      window.location.href = "/dashboard"; // atau onboarding
    }, 600);
  }

  async function loginWithGoogle() {
    setAuthError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/dashboard` },
    });

    setLoading(false);
    if (error) setAuthError("Gagal login dengan Google.");
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.section
          key="register"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-[#DEE7F2] via-[#C4D6EA] to-[#97B6D8] overflow-hidden"
        >
          {/* Background soft blobs */}
          <div className="absolute -top-32 -right-20 w-[360px] h-[360px] bg-white/30 blur-3xl rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-[#AEC7DE]/40 blur-3xl rounded-full opacity-50 animate-pulse"></div>

          <div className="relative z-20 w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Block */}
            <div className="flex flex-col gap-8">
              <div className="px-6 py-2 w-fit flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm text-[#2F3A4B] font-medium">
                <UserPlus className="w-4 h-4 stroke-[#2F3A4B]" />
                Buat Ruang Kerja Baru
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-5xl md:text-6xl font-extrabold leading-tight text-[#2F3A4B]"
              >
                Mulai Perjalananmu, <br />
                <span className="text-[#3B6A9E]">di Jurnify.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-[#415167]/90 max-w-md leading-relaxed"
              >
                Dapatkan ruang kerja personal untuk mencatat, merencanakan, dan
                menjaga konsistensi aktivitasmu setiap hari.
              </motion.p>
            </div>

            {/* Registration Form */}
            <motion.form
              onSubmit={handleRegister}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
              className="relative w-full max-w-md backdrop-blur-xl bg-white/35 border border-white/50 shadow-xl rounded-3xl p-8"
            >
              <h2 className="text-3xl font-bold text-[#2F3A4B] mb-8">
                Daftar Akun
              </h2>

              {/* Name */}
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-[#2F3A4B] font-semibold">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="px-4 py-3 rounded-2xl bg-white/60 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[#3B6A9E]"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-[#2F3A4B] font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="px-4 py-3 rounded-2xl bg-white/60 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[#3B6A9E]"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1 mb-5">
                <label className="text-[#2F3A4B] font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat password"
                  className="px-4 py-3 rounded-2xl bg-white/60 border border-white/70 focus:outline-none focus:ring-2 focus:ring-[#3B6A9E]"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              {authError && (
                <p className="text-red-600 text-sm mb-2">{authError}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-[#3B6A9E] text-white font-semibold shadow-md hover:bg-[#335c8b] cursor-pointer transition-all"
              >
                {loading ? "Mendaftarkan..." : "Buat Akun"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-black/30" />
                <span className="text-sm text-black/60">atau</span>
                <div className="flex-1 h-px bg-black/30" />
              </div>

              {/* Google */}
              <button
                type="button"
                onClick={loginWithGoogle}
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center gap-3 font-medium text-[#2F3A4B] shadow-sm hover:bg-white active:scale-[0.98] cursor-pointer transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.88-6.88C35.82 2.38 30.39 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.02 6.22C12.58 13.09 17.87 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.09 24.5c0-1.64-.15-3.22-.43-4.75H24v9.01h12.43c-.54 2.91-2.19 5.38-4.66 7.04l7.2 5.6C43.09 37.09 46.09 31.36 46.09 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.58 28.44a14.4 14.4 0 010-8.88l-8.02-6.22A24.01 24.01 0 000 24c0 3.89.93 7.56 2.56 10.78l8.02-6.34z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.91-5.78l-7.2-5.6c-2 1.36-4.56 2.16-8.71 2.16-6.13 0-11.42-3.59-13.42-8.44l-8.02 6.34C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Masuk dengan Google
              </button>

              {/* Register */}
              <a
                href="/login"
                className="block text-center text-[#2F3A4B]/70 hover:text-[#2F3A4B] mt-4 text-sm"
              >
                Sudah punya akun? Masuk sekarang
              </a>
            </motion.form>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
