<template>
  <section
    class="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- Subtle Grid -->
    <div
      class="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('/assets/grid.svg')]"
    ></div>

    <!-- Radial Glow Center -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div
        class="w-[420px] h-[420px] bg-white/30 blur-[140px] rounded-full"
      ></div>
    </div>

    <!-- Floating Glass Island -->
    <div
      class="absolute -top-20 left-24 w-64 h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl rotate-12 animate-float-slow"
    ></div>
    <div
      class="absolute bottom-10 right-16 w-52 h-52 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-xl animate-float"
    ></div>
    <div
      class="absolute top-56 right-48 w-40 h-40 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl animate-float-x"
    ></div>

    <!-- Diagonal Light Sweep -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        class="absolute left-[-200px] top-0 h-full w-[500px] rotate-12 bg-white/10 blur-3xl animate-sweep"
      ></div>
    </div>

    <!-- CONTENT WRAPPER -->
    <div
      class="relative z-20 w-full max-w-6xl px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
    >
      <!-- LEFT TEXT -->
      <div v-motion="motionLeft" class="flex flex-col gap-8">
        <div
          class="px-6 py-2 w-fit flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
        >
          <LogInIcon class="w-4 h-4 stroke-[#2F3A4B]" />
          Masuk ke Ruang Kerjamu
        </div>

        <h1
          class="text-5xl md:text-6xl font-extrabold leading-tight text-[#2F3A4B] drop-shadow-md"
        >
          Produktivitas,
          <br />
          <span class="text-[#3B6A9E]">yang Lebih Personal.</span>
        </h1>

        <p class="text-lg text-[#415167]/90 max-w-md">
          Jurnify membantu kamu menyusun pikiran, tugas, catatan, dan memori
          hidupmu. Kini, akses semuanya dengan lebih cepat dan lebih indah.
        </p>
      </div>

      <!-- LOGIN FORM -->
      <div class="relative flex items-center justify-center">
        <div
          v-motion="motionRight"
          class="relative backdrop-blur-2xl bg-white/25 border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 w-full max-w-md transition-all hover:scale-[1.015]"
        >
          <div
            class="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"
          ></div>

          <h2 class="text-3xl font-bold text-[#2F3A4B] mb-8">Masuk</h2>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-6">
            <!-- Email -->
            <div class="flex flex-col gap-1">
              <label class="text-[#2F3A4B] font-semibold">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="nama@email.com"
                class="px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl text-[#2F3A4B] focus:outline-none focus:ring-2 focus:ring-[#3B6A9E] transition-all"
              />
              <p v-if="errors.email" class="text-red-600 text-sm">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1">
              <label class="text-[#2F3A4B] font-semibold">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl text-[#2F3A4B] focus:outline-none focus:ring-2 focus:ring-[#3B6A9E] transition-all"
              />
              <p v-if="errors.password" class="text-red-600 text-sm">
                {{ errors.password }}
              </p>
            </div>

            <p v-if="authError" class="text-red-600 text-sm">{{ authError }}</p>

            <!-- Button Email Login -->
            <button
              type="submit"
              class="w-full py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md active:scale-95 transition-all"
              :disabled="loading"
            >
              {{ loading ? "Memproses..." : "Masuk" }}
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-1">
              <div class="flex-1 h-px bg-black/40"></div>
              <span class="text-sm text-black/60 font-medium">atau</span>
              <div class="flex-1 h-px bg-black/40"></div>
            </div>

            <!-- ✅ Google Login (TAMBAHAN) -->
            <button
              type="button"
              @click="loginWithGoogle"
              :disabled="loading"
              class="w-full py-3 flex items-center justify-center gap-3 rounded-2xl bg-white/70 hover:bg-white border border-white/70 backdrop-blur-xl shadow-sm text-[#2F3A4B] font-semibold transition-all active:scale-95"
            >
              <svg class="w-5 h-5" viewBox="0 0 48 48">
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

            <router-link
              to="/register"
              class="text-center text-[#2F3A4B]/70 hover:text-[#2F3A4B] text-sm mt-2 transition-opacity duration-300"
            >
              Belum punya akun? Daftar sekarang
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../../lib/supabase";
import { LogInIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const authError = ref("");

const errors = ref({
  email: "",
  password: "",
});

function validate() {
  errors.value.email = email.value ? "" : "Email tidak boleh kosong.";
  errors.value.password = password.value ? "" : "Password tidak boleh kosong.";
  return !errors.value.email && !errors.value.password;
}

async function handleLogin() {
  authError.value = "";
  if (!validate()) return;
  loading.value = true;

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  loading.value = false;

  if (error) {
    authError.value = "Email atau password salah.";
    return;
  }

  router.push("/dashboard");
}

/* TAMBAHAN GOOGLE LOGIN */
async function loginWithGoogle() {
  authError.value = "";
  loading.value = true;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  loading.value = false;
  if (error) authError.value = "Gagal login dengan Google.";
}

const motionLeft = {
  initial: { opacity: 0, x: -40 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, easing: "ease-out" },
  },
};

const motionRight = {
  initial: { opacity: 0, x: 40 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, easing: "ease-out" },
  },
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-16px);
  }
}
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}
@keyframes float-x {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(18px);
  }
}
@keyframes sweep {
  0% {
    transform: translateX(-500px);
  }
  100% {
    transform: translateX(120%);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-slow {
  animation: float-slow 9s ease-in-out infinite;
}
.animate-float-x {
  animation: float-x 7s ease-in-out infinite;
}
.animate-sweep {
  animation: sweep 8s linear infinite;
}
</style>
