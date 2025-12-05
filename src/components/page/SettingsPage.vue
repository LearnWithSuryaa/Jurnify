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
                :disabled="avatarUploading"
              />
            </label>
          </div>

          <h3 class="text-xl font-bold">
            {{ profileForm.full_name || displayEmail }}
          </h3>

          <p class="text-sm text-black/60 italic mb-1" v-if="profileForm.bio">
            {{ profileForm.bio }}
          </p>

          <p class="text-sm text-black/60 mb-4" v-else>Belum ada bio</p>

          <button
            @click="openEditProfile"
            class="w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
            :disabled="profileLoading"
          >
            <span v-if="profileLoading">Memuat...</span>
            <span v-else>Edit Profile</span>
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

          <div class="border rounded-xl p-4">
            <div class="flex items-center justify-between">
              <div>
                <strong>Email</strong>
                <p class="text-sm text-black/60">{{ displayEmail }}</p>
              </div>

              <div class="flex gap-2">
                <button
                  @click="showChangeEmailModal = true"
                  class="px-3 py-2 bg-[#4A70A9] text-white rounded-xl text-sm"
                >
                  Ganti Email
                </button>
                <button
                  @click="copyEmail"
                  class="px-3 py-2 border rounded-xl text-sm"
                >
                  Salin
                </button>
              </div>
            </div>
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
          <button @click="closeEditProfile"><X /></button>
        </div>

        <form @submit.prevent="saveProfile" class="space-y-4">
          <input
            v-model="profileForm.full_name"
            placeholder="Nama Lengkap"
            class="w-full border px-4 py-2 rounded-xl"
            :disabled="profileLoading"
          />

          <textarea
            v-model="profileForm.bio"
            rows="3"
            placeholder="Bio"
            class="w-full border px-4 py-2 rounded-xl"
            :disabled="profileLoading"
          />

          <!-- Email shown but read-only to avoid accidental edits -->
          <input
            :value="displayEmail"
            type="email"
            disabled
            class="w-full border px-4 py-2 rounded-xl bg-gray-100 cursor-not-allowed"
          />
          <p class="text-xs text-gray-500">
            Untuk mengubah email, gunakan tombol "Ganti Email".
          </p>

          <div class="flex gap-2">
            <button
              type="submit"
              class="flex-1 w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
              :disabled="profileLoading"
            >
              <span v-if="profileLoading">Menyimpan...</span>
              <span v-else>Simpan Perubahan</span>
            </button>

            <button
              type="button"
              @click="resetProfileForm"
              class="px-4 py-2 border rounded-xl"
              :disabled="profileLoading"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>

  <!-- CHANGE EMAIL MODAL -->
  <Transition name="modal-fade">
    <div
      v-if="showChangeEmailModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div class="bg-white rounded-2xl p-6 w-full max-w-md">
        <div class="flex justify-between mb-4">
          <h3 class="font-bold text-lg">Ganti Email</h3>
          <button @click="showChangeEmailModal = false"><X /></button>
        </div>

        <form @submit.prevent="submitChangeEmail" class="space-y-4">
          <input
            v-model="emailForm.newEmail"
            type="email"
            placeholder="Email baru"
            class="w-full border px-4 py-2 rounded-xl"
            required
            :disabled="emailLoading"
          />

          <!-- optional: ask for current password if you require re-auth -->
          <input
            v-model="emailForm.currentPassword"
            type="password"
            placeholder="Masukkan password saat ini (opsional)"
            class="w-full border px-4 py-2 rounded-xl"
            :disabled="emailLoading"
          />

          <div class="flex gap-2">
            <button
              class="flex-1 w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
              :disabled="emailLoading"
            >
              <span v-if="emailLoading">Mengirim perubahan...</span>
              <span v-else>Ganti Email</span>
            </button>

            <button
              type="button"
              @click="showChangeEmailModal = false"
              class="px-4 py-2 border rounded-xl"
              :disabled="emailLoading"
            >
              Batal
            </button>
          </div>

          <p class="text-xs text-gray-500">
            Setelah mengganti email, biasanya akan dikirimkan tautan verifikasi
            ke email baru. Ikuti instruksi yang dikirimkan. Anda mungkin perlu
            masuk ulang setelah verifikasi.
          </p>
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
            :disabled="passwordLoading"
          />

          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="Konfirmasi password"
            class="w-full border px-4 py-2 rounded-xl"
            required
            :disabled="passwordLoading"
          />

          <div class="flex gap-2">
            <button
              class="flex-1 w-full py-2.5 bg-[#4A70A9] text-white rounded-xl font-semibold"
              :disabled="passwordLoading"
            >
              <span v-if="passwordLoading">Menyimpan...</span>
              <span v-else>Ubah Password</span>
            </button>

            <button
              type="button"
              @click="cancelChangePassword"
              class="px-4 py-2 border rounded-xl"
              :disabled="passwordLoading"
            >
              Batal
            </button>
          </div>
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

/* UI state */
const userEmail = ref("");
const displayEmail = computed(() => userEmail.value || "—");
const showEditProfileModal = ref(false);
const showChangePasswordModal = ref(false);
const showChangeEmailModal = ref(false);

const profileLoading = ref(false);
const avatarUploading = ref(false);
const emailLoading = ref(false);
const passwordLoading = ref(false);

/* Forms */
const profileForm = ref({
  full_name: "",
  bio: "",
  avatar_url: "",
});

const emailForm = ref({
  newEmail: "",
  currentPassword: "", // optional: used if you want to re-authenticate
});

const passwordForm = ref({
  newPassword: "",
  confirmPassword: "",
});

/* Data lists */
const tasks = ref([]);
const events = ref([]);

const totalTasks = computed(() => tasks.value.length);
const totalEvents = computed(() => events.value.length);
const completedTasks = computed(
  () => tasks.value.filter((t) => t.status === "completed").length
);

/* Helpers */
function alertSuccess(message) {
  // replace with your app's toast/notification
  alert(message);
}
function alertError(message) {
  // replace with your app's toast/notification
  alert(message);
}

/* Fetch initial data */
onMounted(async () => {
  await loadUserAndProfile();
  await loadStats();
});

async function loadUserAndProfile() {
  profileLoading.value = true;
  try {
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) {
      // not authenticated
      router.push("/login");
      return;
    }
    userEmail.value = user.email || "";

    // load profile row
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("full_name, bio, avatar_url")
      .eq("id", user.id)
      .single();

    if (profileErr && profileErr.code !== "PGRST116") {
      // PGRST116 = no rows found; ignore if not present
      throw profileErr;
    }

    if (profile) {
      profileForm.value.full_name = profile.full_name || "";
      profileForm.value.bio = profile.bio || "";
      profileForm.value.avatar_url = profile.avatar_url || "";
    }
  } catch (err) {
    console.error("loadUserAndProfile:", err);
    alertError("Gagal memuat profil. Coba refresh.");
  } finally {
    profileLoading.value = false;
  }
}

async function loadStats() {
  try {
    const { data: t } = await supabase.from("tasks").select("*");
    const { data: e } = await supabase.from("events").select("*");
    tasks.value = t || [];
    events.value = e || [];
  } catch (err) {
    console.warn("loadStats:", err);
  }
}

/* Edit Profile */
function openEditProfile() {
  showEditProfileModal.value = true;
}
function closeEditProfile() {
  showEditProfileModal.value = false;
  // reset to last saved
  loadUserAndProfile();
}
function resetProfileForm() {
  loadUserAndProfile();
  showEditProfileModal.value = false;
}

const saveProfile = async () => {
  profileLoading.value = true;
  try {
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) {
      alertError("User tidak terautentikasi");
      return;
    }

    // Validate (example: full_name length)
    if (
      profileForm.value.full_name &&
      profileForm.value.full_name.length > 120
    ) {
      alertError("Nama terlalu panjang (max 120 karakter)");
      return;
    }

    // Only touch profiles table here (no email updates)
    const payload = {
      id: user.id,
      full_name: profileForm.value.full_name || null,
      bio: profileForm.value.bio || null,
      avatar_url: profileForm.value.avatar_url || null,
      updated_at: new Date(),
    };

    const { error: upsertErr } = await supabase
      .from("profiles")
      .upsert(payload);
    if (upsertErr) throw upsertErr;

    alertSuccess("Profil berhasil diperbarui");
    showEditProfileModal.value = false;
    // refresh
    await loadUserAndProfile();
  } catch (err) {
    console.error("saveProfile:", err);
    alertError("Gagal menyimpan profil");
  } finally {
    profileLoading.value = false;
  }
};

/* Avatar upload */
const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  avatarUploading.value = true;
  try {
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr) throw userErr;
    if (!user) throw new Error("User tidak ditemukan");

    // sanitize & generate filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // get current avatar to delete later
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single();

    // upload file (upsert true to allow reupload of same path if needed)
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      // if conflict, try upsert true (edge case)
      if (
        uploadError.message &&
        uploadError.message.includes("file already exists")
      ) {
        const { error: retryErr } = await supabase.storage
          .from("avatars")
          .upload(filePath, file, { upsert: true });
        if (retryErr) throw retryErr;
      } else {
        throw uploadError;
      }
    }

    // get public url
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const newUrl = `${data.publicUrl}?t=${Date.now()}`;

    // update profile row
    const { error: updateErr } = await supabase
      .from("profiles")
      .update({ avatar_url: newUrl, updated_at: new Date() })
      .eq("id", user.id);

    if (updateErr) throw updateErr;

    // attempt delete old avatar if different
    if (currentProfile && currentProfile.avatar_url) {
      try {
        const prefix = "/avatars/";
        const idx = currentProfile.avatar_url.indexOf(prefix);
        if (idx !== -1) {
          // extract path after /avatars/
          const oldPathWithQuery = currentProfile.avatar_url.slice(
            idx + prefix.length
          );
          const oldPath = oldPathWithQuery.split("?")[0];
          if (oldPath && oldPath !== filePath) {
            await supabase.storage.from("avatars").remove([oldPath]);
          }
        }
      } catch (err) {
        console.warn("Gagal menghapus avatar lama:", err);
      }
    }

    profileForm.value.avatar_url = newUrl;
    alertSuccess("Avatar berhasil diunggah");
  } catch (err) {
    console.error("handleAvatarUpload:", err);
    alertError("Upload avatar gagal");
  } finally {
    avatarUploading.value = false;
    // clear file input (if needed)
    event.target.value = "";
  }
};

/* Change Email flow */
const submitChangeEmail = async () => {
  emailLoading.value = true;
  try {
    const newEmail = (emailForm.value.newEmail || "").trim().toLowerCase();
    if (!newEmail) {
      alertError("Masukkan email baru");
      return;
    }
    if (newEmail === userEmail.value) {
      alertError("Email baru sama dengan email saat ini");
      return;
    }

    // optional: re-auth with password provided (not implemented server-side here)
    // call supabase updateUser - this typically sends verification email
    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      // common: need re-auth, invalid email, or rate limits
      throw error;
    }

    // inform user: verification required
    alertSuccess(
      "Permintaan perubahan email terkirim. Silakan cek email baru untuk verifikasi. Setelah verifikasi, login ulang mungkin diperlukan."
    );

    // reflect in UI only after verification; do not overwrite userEmail immediately.
    showChangeEmailModal.value = false;
    emailForm.value.newEmail = "";
    emailForm.value.currentPassword = "";

    // optionally refresh user object
    // await loadUserAndProfile(); // do not overwrite userEmail until verified
  } catch (err) {
    console.error("submitChangeEmail:", err);
    alertError(err?.message || "Gagal mengganti email");
  } finally {
    emailLoading.value = false;
  }
};

/* Change password */
const changePassword = async () => {
  passwordLoading.value = true;
  try {
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      alertError("Password tidak cocok");
      return;
    }

    if (passwordForm.value.newPassword.length < 6) {
      alertError("Password minimal 6 karakter");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordForm.value.newPassword,
    });

    if (error) throw error;

    passwordForm.value.newPassword = "";
    passwordForm.value.confirmPassword = "";
    showChangePasswordModal.value = false;
    alertSuccess("Password berhasil diubah");
  } catch (err) {
    console.error("changePassword:", err);
    alertError(err?.message || "Gagal mengganti password");
  } finally {
    passwordLoading.value = false;
  }
};

function cancelChangePassword() {
  passwordForm.value.newPassword = "";
  passwordForm.value.confirmPassword = "";
  showChangePasswordModal.value = false;
}

/* Misc */
async function handleLogout() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.warn("signOut error", err);
  } finally {
    router.push("/login");
  }
}

function copyEmail() {
  if (!userEmail.value) return;
  navigator.clipboard
    .writeText(userEmail.value)
    .then(() => alertSuccess("Email disalin ke clipboard"))
    .catch(() => alertError("Gagal menyalin email"));
}

/* Expose to template */
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
