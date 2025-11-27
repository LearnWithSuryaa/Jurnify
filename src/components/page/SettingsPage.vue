<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-linear-to-br from-[#F6FBFF] via-[#EEF7FF] to-[#F3F8FF]"
  >
    <!-- HEADER -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
            Settings
          </h1>
          <p class="text-slate-600 text-lg">Kelola preferensi dan akun Anda</p>
        </div>
      </div>
    </div>

    <!-- SETTINGS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT COLUMN - Profile Card -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Profile -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="text-center">
            <div
              class="w-24 h-24 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User class="w-12 h-12 text-white" />
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-1">
              {{ userEmail || "User" }}
            </h3>
            <p class="text-sm text-slate-600 mb-4">Journey User</p>

            <button
              @click="showEditProfileModal = true"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3B6A9E] text-white rounded-xl hover:bg-[#2f5680] transition font-semibold"
            >
              <Edit3 class="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <h3
            class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"
          >
            <BarChart3 class="w-5 h-5 text-[#3B6A9E]" />
            Statistik Akun
          </h3>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Total Tasks</span>
              <span class="text-lg font-bold text-slate-900">
                {{ totalTasks }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Total Events</span>
              <span class="text-lg font-bold text-slate-900">
                {{ totalEvents }}
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm text-slate-600">Completed</span>
              <span class="text-lg font-bold text-green-600">
                {{ completedTasks }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN - Settings Options -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Account Settings -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-xl flex items-center justify-center"
            >
              <UserCog class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Akun</h2>
              <p class="text-xs text-slate-600">Kelola informasi akun Anda</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-[#3B6A9E]/30 transition-all group cursor-pointer"
              @click="showChangePasswordModal = true"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-[#3B6A9E]/10 transition"
                  >
                    <Lock
                      class="w-5 h-5 text-slate-600 group-hover:text-[#3B6A9E] transition"
                    />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">Ganti Password</h4>
                    <p class="text-xs text-slate-600">
                      Ubah password akun Anda
                    </p>
                  </div>
                </div>
                <ChevronRight
                  class="w-5 h-5 text-slate-400 group-hover:text-[#3B6A9E] transition"
                />
              </div>
            </div>

            <div
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-[#3B6A9E]/30 transition-all group cursor-pointer"
              @click="showEditProfileModal = true"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-[#3B6A9E]/10 transition"
                  >
                    <Mail
                      class="w-5 h-5 text-slate-600 group-hover:text-[#3B6A9E] transition"
                    />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">Email</h4>
                    <p class="text-xs text-slate-600">
                      {{ userEmail || "Belum ada email" }}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  class="w-5 h-5 text-slate-400 group-hover:text-[#3B6A9E] transition"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <Settings class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Preferensi</h2>
              <p class="text-xs text-slate-600">Sesuaikan pengalaman Anda</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-purple-300 transition-all"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                  >
                    <Bell class="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">Notifikasi</h4>
                    <p class="text-xs text-slate-600">
                      Terima pengingat untuk task dan event
                    </p>
                  </div>
                </div>
                <button
                  @click="toggleNotifications"
                  :class="[
                    'relative w-12 h-6 rounded-full transition-colors',
                    notifications ? 'bg-[#3B6A9E]' : 'bg-slate-300',
                  ]"
                >
                  <div
                    :class="[
                      'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform',
                      notifications ? 'translate-x-6' : 'translate-x-0.5',
                    ]"
                  ></div>
                </button>
              </div>
            </div>

            <div
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-purple-300 transition-all"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                  >
                    <Moon class="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">Dark Mode</h4>
                    <p class="text-xs text-slate-600">
                      Tema gelap untuk mata Anda
                    </p>
                  </div>
                </div>
                <button
                  @click="toggleDarkMode"
                  :class="[
                    'relative w-12 h-6 rounded-full transition-colors',
                    darkMode ? 'bg-[#3B6A9E]' : 'bg-slate-300',
                  ]"
                >
                  <div
                    :class="[
                      'absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform',
                      darkMode ? 'translate-x-6' : 'translate-x-0.5',
                    ]"
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Data & Privacy -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center"
            >
              <Shield class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Data & Privasi</h2>
              <p class="text-xs text-slate-600">Kelola data dan privasi Anda</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-green-300 transition-all group cursor-pointer"
              @click="exportData"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                  >
                    <Download class="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">Export Data</h4>
                    <p class="text-xs text-slate-600">
                      Download semua data Anda
                    </p>
                  </div>
                </div>
                <ChevronRight
                  class="w-5 h-5 text-slate-400 group-hover:text-green-600 transition"
                />
              </div>
            </div>

            <div
              class="p-4 rounded-xl border-2 border-red-100 hover:border-red-300 transition-all group cursor-pointer"
              @click="confirmDeleteAccount"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
                  >
                    <Trash2 class="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-red-600">Hapus Akun</h4>
                    <p class="text-xs text-slate-600">
                      Hapus akun dan semua data secara permanen
                    </p>
                  </div>
                </div>
                <ChevronRight
                  class="w-5 h-5 text-slate-400 group-hover:text-red-600 transition"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Logout Button -->
        <div
          class="bg-linear-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
              >
                <LogOut class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-lg font-bold">Keluar dari Akun</h3>
                <p class="text-sm text-white/80">
                  Logout dari aplikasi Journey
                </p>
              </div>
            </div>
            <button
              @click="handleLogout"
              class="px-6 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-all font-semibold flex items-center gap-2"
            >
              <LogOut class="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL EDIT PROFILE -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showEditProfileModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          @click="showEditProfileModal = false"
        >
          <div
            class="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all overflow-hidden"
            @click.stop
          >
            <div
              class="bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] px-8 py-6 text-white"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold">Edit Profile</h2>
                  <p class="text-sm text-white/80">
                    Update informasi profil Anda
                  </p>
                </div>
                <button
                  @click="showEditProfileModal = false"
                  class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <div>
                <label class="text-sm font-semibold text-slate-700 mb-2 block"
                  >Email</label
                >
                <input
                  v-model="profileForm.email"
                  type="email"
                  placeholder="email@example.com"
                  class="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition"
                />
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  @click="showEditProfileModal = false"
                  class="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition font-semibold"
                >
                  Batal
                </button>
                <button
                  @click="saveProfile"
                  class="flex-1 px-4 py-3 bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white rounded-xl hover:shadow-lg transition font-semibold"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- MODAL CHANGE PASSWORD -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showChangePasswordModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          @click="showChangePasswordModal = false"
        >
          <div
            class="bg-white rounded-3xl shadow-2xl w-full max-w-md transform transition-all overflow-hidden"
            @click.stop
          >
            <div
              class="bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] px-8 py-6 text-white"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-2xl font-bold">Ganti Password</h2>
                  <p class="text-sm text-white/80">Update password akun Anda</p>
                </div>
                <button
                  @click="showChangePasswordModal = false"
                  class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <div class="p-6 space-y-4">
              <div>
                <label class="text-sm font-semibold text-slate-700 mb-2 block"
                  >Password Lama</label
                >
                <input
                  v-model="passwordForm.oldPassword"
                  type="password"
                  placeholder="Masukkan password lama"
                  class="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-slate-700 mb-2 block"
                  >Password Baru</label
                >
                <input
                  v-model="passwordForm.newPassword"
                  type="password"
                  placeholder="Masukkan password baru"
                  class="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition"
                />
              </div>

              <div>
                <label class="text-sm font-semibold text-slate-700 mb-2 block"
                  >Konfirmasi Password</label
                >
                <input
                  v-model="passwordForm.confirmPassword"
                  type="password"
                  placeholder="Konfirmasi password baru"
                  class="w-full px-4 py-3 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition"
                />
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  @click="showChangePasswordModal = false"
                  class="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition font-semibold"
                >
                  Batal
                </button>
                <button
                  @click="changePassword"
                  class="flex-1 px-4 py-3 bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white rounded-xl hover:shadow-lg transition font-semibold"
                >
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  User,
  Edit3,
  Settings,
  Bell,
  Moon,
  Shield,
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  X,
  Lock,
  Mail,
  UserCog,
  BarChart3,
} from "lucide-vue-next";
import { supabase } from "../../lib/supabase.js";
import { useRouter } from "vue-router";

const router = useRouter();

// STATE
const userEmail = ref("");
const notifications = ref(true);
const darkMode = ref(false);
const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);

const profileForm = ref({ email: "" });

const passwordForm = ref({
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
});

// 📌 TASKS & EVENTS (seperti di Dashboard)
const tasks = ref([]);
const events = ref([]);

// FETCH TASKS ala Dashboard
const fetchTasks = async () => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  tasks.value = data || [];
};

// FETCH EVENTS ala Dashboard
const fetchEvents = async () => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true });

  events.value = data || [];
};

// 📌 COMPUTED JUMLAH TASK & EVENT
const totalTasks = computed(() => tasks.value.length);
const totalEvents = computed(() => events.value.length);
const completedTasks = computed(
  () => tasks.value.filter((t) => t.status === "completed").length
);

// FETCH USER DATA
const fetchUserData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    userEmail.value = user.email;
    profileForm.value.email = user.email;
  }
};

// ON MOUNT (ambil data seperti dashboard)
onMounted(() => {
  fetchUserData();
  fetchTasks();
  fetchEvents();
});

// FUNCTIONS
const toggleNotifications = () => {
  notifications.value = !notifications.value;
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

const saveProfile = async () => {
  if (!profileForm.value.email) {
    alert("Email tidak boleh kosong!");
    return;
  }

  try {
    const { error } = await supabase.auth.updateUser({
      email: profileForm.value.email,
    });

    if (error) throw error;

    alert("Profile berhasil diupdate!");
    showEditProfileModal.value = false;
    await fetchUserData();
  } catch (error) {
    alert("Gagal update profile: " + error.message);
  }
};

const changePassword = async () => {
  if (!passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    alert("Semua field harus diisi!");
    return;
  }

  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("Password baru dan konfirmasi tidak cocok!");
    return;
  }

  if (passwordForm.value.newPassword.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: passwordForm.value.newPassword,
    });

    if (error) throw error;

    alert("Password berhasil diubah!");
    showChangePasswordModal.value = false;
    passwordForm.value = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  } catch (error) {
    alert("Gagal ubah password: " + error.message);
  }
};

const exportData = () => {
  alert("Fitur export data akan segera hadir!");
};

const confirmDeleteAccount = () => {
  if (
    confirm(
      "Apakah Anda yakin ingin menghapus akun? Semua data akan hilang permanen!"
    )
  ) {
    deleteAccount();
  }
};

const deleteAccount = async () => {
  try {
    const { error } = await supabase.auth.admin.deleteUser(
      (
        await supabase.auth.getUser()
      ).data.user.id
    );

    if (error) throw error;

    alert("Akun berhasil dihapus");
    router.push("/login");
  } catch (error) {
    alert("Gagal menghapus akun: " + error.message);
  }
};

const handleLogout = async () => {
  if (confirm("Apakah Anda yakin ingin logout?")) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      alert("Gagal logout: " + error.message);
    }
  }
};
</script>

<style scoped>
.modal-fade-enter-active {
  animation: modalIn 0.18s ease forwards;
}
@keyframes modalIn {
  from {
    transform: translateY(8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
