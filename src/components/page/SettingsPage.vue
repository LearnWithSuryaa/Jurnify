<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40"
  >
    <!-- HEADER -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-black mb-2">
            Settings
          </h1>
          <p class="text-black/60 text-lg">Kelola preferensi dan akun Anda</p>
        </div>
      </div>
    </div>

    <!-- SETTINGS GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT COLUMN -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Profile -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#8FABD4]/40 transition-all"
        >
          <div class="text-center">
            <div
              class="w-24 h-24 bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <User class="w-12 h-12 text-white" />
            </div>

            <h3 class="text-xl font-bold text-black mb-1">
              {{ userEmail || "User" }}
            </h3>
            <p class="text-sm text-black/60 mb-4">Journey User</p>

            <button
              @click="showEditProfileModal = true"
              class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#4A70A9] hover:bg-[#3f6194] text-white rounded-xl transition font-semibold"
            >
              <Edit3 class="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#8FABD4]/40 transition-all"
        >
          <h3 class="text-lg font-bold text-black mb-4 flex items-center gap-2">
            <BarChart3 class="w-5 h-5 text-[#4A70A9]" />
            Statistik Akun
          </h3>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-black/60">Total Tasks</span>
              <span class="text-lg font-bold text-black">
                {{ totalTasks }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-sm text-black/60">Total Events</span>
              <span class="text-lg font-bold text-black">
                {{ totalEvents }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-sm text-black/60">Completed</span>
              <span class="text-lg font-bold text-[#4A70A9]">
                {{ completedTasks }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Account Settings -->
        <div
          class="bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#8FABD4]/40 transition-all"
        >
          <div class="flex items-center gap-3 mb-5">
            <div
              class="w-10 h-10 bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-xl flex items-center justify-center"
            >
              <UserCog class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-black">Akun</h2>
              <p class="text-xs text-black/60">Kelola informasi akun Anda</p>
            </div>
          </div>

          <div class="space-y-3">
            <div
              class="p-4 rounded-xl border-2 border-black/10 hover:border-[#4A70A9]/40 transition-all group cursor-pointer"
              @click="showChangePasswordModal = true"
            >
              <div class="flex justify-between items-center">
                <div class="flex gap-3 items-center">
                  <div
                    class="w-10 h-10 bg-[#8FABD4]/20 rounded-lg flex items-center justify-center"
                  >
                    <Lock class="w-5 h-5 text-[#4A70A9]" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-black">Ganti Password</h4>
                    <p class="text-xs text-black/60">Ubah password akun Anda</p>
                  </div>
                </div>
                <ChevronRight class="w-5 h-5 text-[#4A70A9]" />
              </div>
            </div>

            <div
              class="p-4 rounded-xl border-2 border-black/10 hover:border-[#4A70A9]/40 transition-all group cursor-pointer"
              @click="showEditProfileModal = true"
            >
              <div class="flex justify-between items-center">
                <div class="flex gap-3 items-center">
                  <div
                    class="w-10 h-10 bg-[#8FABD4]/20 rounded-lg flex items-center justify-center"
                  >
                    <Mail class="w-5 h-5 text-[#4A70A9]" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-black">Email</h4>
                    <p class="text-xs text-black/60">
                      {{ userEmail || "Belum ada email" }}
                    </p>
                  </div>
                </div>
                <ChevronRight class="w-5 h-5 text-[#4A70A9]" />
              </div>
            </div>
          </div>
        </div>

        <!-- Logout Button -->
        <div
          class="bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl shadow-lg p-6 text-white"
        >
          <div class="flex items-center justify-between">
            <div class="flex gap-3 items-center">
              <div
                class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <LogOut class="w-6 h-6" />
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
              class="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all font-semibold flex items-center gap-2"
            >
              <LogOut class="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
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
