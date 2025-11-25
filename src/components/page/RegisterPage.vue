<template>
  <section
    class="relative w-full min-h-screen flex items-center justify-center bg-linear-to-br from-[#E8EEF5] via-[#C8D9EA] to-[#9AB8D4] overflow-hidden"
  >
    <!-- ⭐ SUBTLE GRID -->
    <div class="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('/assets/grid.svg')]"></div>

    <!-- 🌟 RADIAL GLOW -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-[420px] h-[420px] bg-white/30 blur-[140px] rounded-full"></div>
    </div>

    <!-- FLOAT GLASS SHAPES -->
    <div class="absolute -top-20 left-24 w-64 h-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl rotate-12 animate-float-slow"></div>
    <div class="absolute bottom-10 right-16 w-52 h-52 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-xl animate-float"></div>
    <div class="absolute top-56 right-48 w-40 h-40 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl animate-float-x"></div>

    <!-- LIGHT SWEEP -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute left-[-200px] top-0 h-full w-[500px] rotate-12 bg-white/10 blur-3xl animate-sweep"></div>
    </div>

    <!-- WRAPPER -->
    <div class="relative z-20 w-full max-w-6xl px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <!-- TEXT LEFT -->
      <div v-motion="motionLeft" class="flex flex-col gap-8">
        <!-- Tag -->
        <div
          class="px-6 py-2 w-fit flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-xl border border-white/40 text-[#2F3A4B] text-sm font-semibold shadow-sm"
        >
          <UserPlus class="w-4 h-4 stroke-[#2F3A4B]" />
          Buat Ruang Kerja Baru
        </div>

        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight text-[#2F3A4B] drop-shadow-md">
          Mulai Perjalananmu,
          <br />
          <span class="text-[#3B6A9E]">di Jurnify.</span>
        </h1>

        <p class="text-lg text-[#415167]/90 max-w-md">
          Daftar dan bangun sistem kerjamu sendiri. Produktif, rapi, dan terasa pribadi.
        </p>
      </div>

      <!-- REGISTER FORM -->
      <div class="relative flex items-center justify-center">
        <div
          v-motion="motionRight"
          class="relative backdrop-blur-2xl bg-white/25 border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-3xl p-8 w-full max-w-md transition-all hover:scale-[1.015]"
        >
          <!-- BORDER LIGHT -->
          <div class="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"></div>

          <h2 class="text-3xl font-bold text-[#2F3A4B] mb-8">Daftar Akun</h2>

          <form @submit.prevent="handleRegister" class="flex flex-col gap-6">

            <!-- Email -->
            <div class="flex flex-col gap-1">
              <label class="text-[#2F3A4B] font-semibold">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="nama@email.com"
                class="px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl text-[#2F3A4B] focus:outline-none focus:ring-2 focus:ring-[#3B6A9E] transition-all"
              />
              <p v-if="errors.email" class="text-red-600 text-sm">{{ errors.email }}</p>
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1">
              <label class="text-[#2F3A4B] font-semibold">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Minimal 6 karakter"
                class="px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl text-[#2F3A4B] focus:outline-none focus:ring-2 focus:ring-[#3B6A9E] transition-all"
              />
              <p v-if="errors.password" class="text-red-600 text-sm">{{ errors.password }}</p>
            </div>

            <!-- Confirm Password -->
            <div class="flex flex-col gap-1">
              <label class="text-[#2F3A4B] font-semibold">Konfirmasi Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Ulangi password"
                class="px-4 py-3 rounded-2xl bg-white/40 border border-white/50 backdrop-blur-xl text-[#2F3A4B] focus:outline-none focus:ring-2 focus:ring-[#3B6A9E] transition-all"
              />
              <p v-if="errors.confirm" class="text-red-600 text-sm">{{ errors.confirm }}</p>
            </div>

            <!-- Error -->
            <p v-if="authError" class="text-red-600 text-sm">{{ authError }}</p>

            <!-- Button -->
            <button
              type="submit"
              class="w-full py-3 bg-[#3B6A9E] hover:bg-[#365F90] text-white rounded-2xl font-semibold shadow-md active:scale-95 transition-all"
              :disabled="loading"
            >
              {{ loading ? "Memproses..." : "Daftar" }}
            </button>

            <router-link
              to="/login"
              class="text-center text-[#2F3A4B]/70 hover:text-[#2F3A4B] text-sm mt-2 transition-opacity duration-300"
            >
              Sudah punya akun? Masuk sekarang
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
import { UserPlus } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

// ======================
// FORM STATE
// ======================
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  email: "",
  password: "",
  confirm: ""
});

const loading = ref(false);
const authError = ref("");

// ======================
// VALIDATION
// ======================
function validate() {
  errors.value.email = email.value ? "" : "Email tidak boleh kosong.";
  errors.value.password =
    password.value.length >= 6 ? "" : "Password minimal 6 karakter.";
  errors.value.confirm =
    password.value === confirmPassword.value
      ? ""
      : "Konfirmasi password tidak cocok.";

  return (
    !errors.value.email &&
    !errors.value.password &&
    !errors.value.confirm
  );
}

// ======================
// REGISTER HANDLER
// ======================
async function handleRegister() {
  authError.value = "";

  if (!validate()) return;

  loading.value = true;

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  });

  loading.value = false;

  if (error) {
    authError.value = error.message;
    return;
  }

  router.push("/login");
}

// ======================
// MOTION ANIMATIONS
// ======================
const motionLeft = {
  initial: { opacity: 0, x: -40 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

const motionRight = {
  initial: { opacity: 0, x: 40 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(20px); }
}
@keyframes float-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(18px); }
}
@keyframes sweep {
  0% { transform: translateX(-500px); }
  100% { transform: translateX(120%); }
}

.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-slow { animation: float-slow 9s ease-in-out infinite; }
.animate-float-x { animation: float-x 7s ease-in-out infinite; }
.animate-sweep { animation: sweep 8s linear infinite; }
</style>
