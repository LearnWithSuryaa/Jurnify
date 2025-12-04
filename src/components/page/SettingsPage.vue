<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40"
  >
    <!-- HEADER -->
    <div class="mb-8">
      <h1 class="text-4xl md:text-5xl font-extrabold text-black mb-2">
        Settings
      </h1>
      <p class="text-black/60 text-lg">Kelola preferensi dan akun Anda</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT -->
      <div class="space-y-6">
        <!-- PROFILE -->
        <div class="bg-white/80 rounded-2xl p-6 shadow-md text-center">
          <div class="relative w-24 h-24 mx-auto mb-4 group">
            <img
              v-if="profileForm.avatar_url"
              :src="profileForm.avatar_url"
              class="w-24 h-24 rounded-full object-cover border"
            />
            <div
              v-else
              class="w-24 h-24 bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-full flex items-center justify-center"
            >
              <User class="w-12 h-12 text-white" />
            </div>

            <!-- Overlay -->
            <label
              class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 cursor-pointer transition"
            >
              Ganti
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleAvatarUpload"
              />
            </label>
          </div>

          <h3 class="text-xl font-bold">
            {{ profileForm.full_name || userEmail }}
          </h3>

          <p class="text-sm text-black/60 italic mb-1" v-if="profileForm.bio">
            {{ profileForm.bio }}
          </p>

          <p class="text-sm text-black/60 mb-4" v-else>Belum ada bio</p>

          <button
            @click="showEditProfileModal = true"
            class="w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
          >
            Edit Profile
          </button>
        </div>

        <!-- STATS -->
        <div class="bg-white/80 rounded-2xl p-6 shadow-md">
          <h3 class="font-bold mb-4">Statistik Akun</h3>

          <div class="flex justify-between">
            <span>Total Tasks</span>
            <strong>{{ totalTasks }}</strong>
          </div>
          <div class="flex justify-between">
            <span>Total Events</span>
            <strong>{{ totalEvents }}</strong>
          </div>
          <div class="flex justify-between">
            <span>Completed</span>
            <strong class="text-[#4A70A9]">{{ completedTasks }}</strong>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white/80 rounded-2xl p-6 shadow-md space-y-3">
          <div
            class="border rounded-xl p-4 cursor-pointer"
            @click="showChangePasswordModal = true"
          >
            <strong>Ganti Password</strong>
            <p class="text-sm text-black/60">Ubah password akun</p>
          </div>

          <div
            class="border rounded-xl p-4 cursor-pointer"
            @click="showEditProfileModal = true"
          >
            <strong>Email</strong>
            <p class="text-sm text-black/60">{{ userEmail }}</p>
          </div>
        </div>

        <!-- LOGOUT -->
        <div
          class="bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl p-6 text-white flex justify-between"
        >
          <div>
            <h3 class="font-bold">Keluar dari Akun</h3>
            <p class="text-sm opacity-80">Logout dari aplikasi</p>
          </div>

          <button
            @click="handleLogout"
            class="px-6 py-3 bg-white/20 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- EDIT PROFILE MODAL -->
  <Transition name="modal-fade">
    <div
      v-if="showEditProfileModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <div class="flex justify-between mb-4">
          <h3 class="font-bold text-lg">Edit Profile</h3>
          <button @click="showEditProfileModal = false"><X /></button>
        </div>

        <form @submit.prevent="saveProfile" class="space-y-4">
          <input
            v-model="profileForm.full_name"
            placeholder="Nama Lengkap"
            class="w-full border px-4 py-2 rounded-xl"
          />

          <textarea
            v-model="profileForm.bio"
            rows="3"
            placeholder="Bio"
            class="w-full border px-4 py-2 rounded-xl"
          />

          <input
            v-model="profileForm.email"
            type="email"
            required
            placeholder="Email"
            class="w-full border px-4 py-2 rounded-xl"
          />

          <button
            class="w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  </Transition>

  <!-- CHANGE PASSWORD MODAL -->
  <Transition name="modal-fade">
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <div class="flex justify-between mb-4">
          <h3 class="font-bold text-lg">Ganti Password</h3>
          <button @click="showChangePasswordModal = false"><X /></button>
        </div>

        <form @submit.prevent="changePassword" class="space-y-4">
          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="Password baru"
            class="w-full border px-4 py-2 rounded-xl"
            required
          />

          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Konfirmasi password"
            class="w-full border px-4 py-2 rounded-xl"
            required
          />

          <button
            class="w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
          >
            Ubah Password
          </button>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { User, X } from "lucide-vue-next";
import { supabase } from "../../lib/supabase";
import { useRouter } from "vue-router";

const router = useRouter();

const userEmail = ref("");
const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);

const profileForm = ref({
  email: "",
  full_name: "",
  bio: "",
  avatar_url: "",
});

const passwordForm = ref({
  newPassword: "",
  confirmPassword: "",
});

const tasks = ref([]);
const events = ref([]);

const totalTasks = computed(() => tasks.value.length);
const totalEvents = computed(() => events.value.length);
const completedTasks = computed(
  () => tasks.value.filter((t) => t.status === "completed").length
);

onMounted(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  userEmail.value = user.email;
  profileForm.value.email = user.email;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    profileForm.value.full_name = profile.full_name;
    profileForm.value.bio = profile.bio;
    profileForm.value.avatar_url = profile.avatar_url;
  }

  const { data: t } = await supabase.from("tasks").select("*");
  const { data: e } = await supabase.from("events").select("*");

  tasks.value = t || [];
  events.value = e || [];
});

const saveProfile = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (profileForm.value.email !== user.email) {
    await supabase.auth.updateUser({ email: profileForm.value.email });
  }

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: profileForm.value.full_name,
    bio: profileForm.value.bio,
    updated_at: new Date(),
  });

  userEmail.value = profileForm.value.email;
  showEditProfileModal.value = false;
  alert("Profile berhasil diperbarui");
};

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // generate nama file acak (best practice untuk production)
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  // ambil profile lama untuk menghapus avatar lama
  const { data: currentProfile } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();

  // upload file baru
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false, // jangan overwrite
      contentType: file.type,
    });

  if (uploadError) {
    console.error(uploadError);
    alert("Upload avatar gagal");
    return;
  }

  // ambil public url
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  const newUrl = `${data.publicUrl}?t=${Date.now()}`; // cache-busting

  // simpan ke database
  await supabase
    .from("profiles")
    .update({ avatar_url: newUrl })
    .eq("id", user.id);

  // hapus avatar lama jika ada
  if (currentProfile && currentProfile.avatar_url) {
    try {
      const oldPath = currentProfile.avatar_url
        .split("/avatars/")
        .pop()
        .split("?")[0];

      if (oldPath && oldPath !== filePath) {
        await supabase.storage.from("avatars").remove([oldPath]);
      }
    } catch (err) {
      console.warn("Gagal menghapus avatar lama:", err);
    }
  }

  profileForm.value.avatar_url = newUrl;
};

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert("Password tidak cocok");
    return;
  }

  if (passwordForm.value.newPassword.length < 6) {
    alert("Password minimal 6 karakter");
    return;
  }

  await supabase.auth.updateUser({
    password: passwordForm.value.newPassword,
  });

  passwordForm.value.newPassword = "";
  passwordForm.value.confirmPassword = "";
  showChangePasswordModal.value = false;

  alert("Password berhasil diubah");
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
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
