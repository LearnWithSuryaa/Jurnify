<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-6">
      <div class="space-y-1">
        <h1
          class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
        >
          Journey
        </h1>
        <p class="text-slate-600 text-sm">
          Kelola tugas Anda dan pantau progres perjalanan
        </p>
      </div>

      <button
        @click="openAddModal"
        class="flex items-center gap-2 bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition font-semibold"
      >
        <Plus class="w-5 h-5" />
        Tambah Task
      </button>
    </div>

    <!-- SUMMARY BAR -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div
        class="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-yellow-400"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600 mb-1">Pending</p>
            <p class="text-3xl font-bold text-slate-900">
              {{ tasksByStatus.pending }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"
          >
            <Clock class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-blue-400"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600 mb-1">In Progress</p>
            <p class="text-3xl font-bold text-slate-900">
              {{ tasksByStatus.in_progress }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
          >
            <Activity class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-green-400"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600 mb-1">Success</p>
            <p class="text-3xl font-bold text-slate-900">
              {{ tasksByStatus.completed }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
          >
            <CheckCircle2 class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div
        class="bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border-l-4 border-red-400"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-600 mb-1">Cancelled</p>
            <p class="text-3xl font-bold text-slate-900">
              {{ tasksByStatus.cancelled }}
            </p>
          </div>
          <div
            class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"
          >
            <XCircle class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- FILTER TABS -->
    <div
      class="flex items-center gap-2 mb-6 bg-white/60 backdrop-blur-sm p-2 rounded-2xl shadow-sm w-fit"
    >
      <button
        v-for="status in [
          'all',
          'pending',
          'in_progress',
          'completed',
          'cancelled',
        ]"
        :key="status"
        @click="filterStatus = status"
        :class="[
          'px-6 py-2.5 rounded-xl text-sm font-semibold transition-all',
          filterStatus === status
            ? 'bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-100',
        ]"
      >
        {{
          status === "all"
            ? "Semua"
            : status === "pending"
            ? "Pending"
            : status === "in_progress"
            ? "Progress"
            : status === "completed"
            ? "Success"
            : "Cancelled"
        }}
      </button>
    </div>

    <!-- TASKS GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        @click="openDetailModal(task)"
        class="group cursor-pointer bg-white/60 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-xl border-2 transition-all duration-300 overflow-hidden hover:scale-[1.02]"
        :class="taskBorderColor(task.status)"
      >
        <!-- Status Badge -->
        <div class="p-5 pb-3">
          <div class="flex items-start justify-between mb-3">
            <span
              class="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2"
              :class="statusBadgeColor(task.status)"
            >
              <component :is="statusIcon(task.status)" class="w-3.5 h-3.5" />
              {{
                task.status === "pending"
                  ? "Pending"
                  : task.status === "in_progress"
                  ? "Progress"
                  : task.status === "completed"
                  ? "Success"
                  : "Cancelled"
              }}
            </span>
            <button
              @click.stop="openEditModal(task)"
              class="opacity-0 group-hover:opacity-100 transition p-2 hover:bg-slate-100 rounded-lg"
            >
              <Edit3 class="w-4 h-4 text-slate-600" />
            </button>
          </div>

          <!-- Task Title -->
          <h3 class="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
            {{ task.title }}
          </h3>

          <!-- Task Description -->
          <p class="text-sm text-slate-600 line-clamp-3 mb-4">
            {{ task.description || "Tidak ada deskripsi" }}
          </p>

          <!-- Footer Info -->
          <div
            class="flex items-center justify-between pt-3 border-t border-slate-200"
          >
            <div class="flex flex-col gap-1 text-xs text-slate-500">
              <div class="flex items-center gap-2">
                <Calendar class="w-3.5 h-3.5" />
                <span>Dibuat: {{ formatDate(task.created_at) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Clock class="w-3.5 h-3.5" />
                <span class="font-semibold text-slate-700"
                  >Deadline: {{ formatDate(task.due_date) }}</span
                >
              </div>
            </div>
            <ChevronRight
              class="w-5 h-5 text-slate-400 group-hover:text-[#3B6A9E] transition"
            />
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredTasks.length === 0"
        class="col-span-full flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          class="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4"
        >
          <ListTodo class="w-12 h-12 text-slate-400" />
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">Belum ada task</h3>
        <p class="text-slate-600 mb-6">
          Mulai tambahkan task untuk melacak progres Anda
        </p>
        <button
          @click="openAddModal"
          class="flex items-center gap-2 bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition font-semibold"
        >
          <Plus class="w-5 h-5" />
          Tambah Task Pertama
        </button>
      </div>
    </div>

    <!-- MODAL ADD/EDIT -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showFormModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          @click="closeFormModal"
        >
          <div
            class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all overflow-hidden"
            @click.stop
          >
            <!-- Header -->
            <div
              class="bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] px-8 py-6 text-white"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <component
                      :is="isEditMode ? Edit3 : Plus"
                      class="w-8 h-8"
                    />
                    <h2 class="text-3xl font-bold">
                      {{ isEditMode ? "Edit Task" : "Tambah Task Baru" }}
                    </h2>
                  </div>
                  <p class="text-sm text-white/90">
                    Kelola tugas perjalanan Anda
                  </p>
                </div>
                <button
                  @click="closeFormModal"
                  class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Form Content -->
            <div class="px-8 py-6 space-y-6">
              <!-- Title -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <MessageSquare class="w-4 h-4 text-[#3B6A9E]" />
                  Judul Task
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.title"
                  type="text"
                  placeholder="Masukkan judul task..."
                  class="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium placeholder:text-slate-400"
                />
              </div>

              <!-- Description -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <AlignLeft class="w-4 h-4 text-[#3B6A9E]" />
                  Deskripsi Task
                </label>
                <textarea
                  v-model="formData.description"
                  rows="4"
                  placeholder="Tambahkan deskripsi task..."
                  class="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              <!-- Due Date -->
              <div class="space-y-2">
                <label
                  class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Calendar class="w-4 h-4 text-[#3B6A9E]" />
                  Tanggal Deadline
                  <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.due_date"
                  type="date"
                  class="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium"
                />
              </div>

              <!-- Status -->
              <div class="space-y-3">
                <label
                  class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Tag class="w-4 h-4 text-[#3B6A9E]" />
                  Status Task
                </label>
                <div class="grid grid-cols-4 gap-3">
                  <button
                    v-for="status in statusOptions"
                    :key="status.value"
                    @click="formData.status = status.value"
                    type="button"
                    :class="[
                      'group relative px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3',
                      formData.status === status.value
                        ? 'border-[#3B6A9E] shadow-lg scale-105 ' +
                          status.bgActive
                        : 'bg-white border-slate-200 hover:border-[#3B6A9E]/50 hover:shadow-md',
                    ]"
                  >
                    <component
                      :is="status.icon"
                      :class="[
                        'w-7 h-7 transition-transform group-hover:scale-110',
                        formData.status === status.value
                          ? status.iconActive
                          : status.iconDefault,
                      ]"
                    />
                    <span
                      :class="[
                        'text-sm font-bold capitalize',
                        formData.status === status.value
                          ? status.textActive
                          : 'text-slate-700',
                      ]"
                    >
                      {{ status.label }}
                    </span>
                    <div
                      v-if="formData.status === status.value"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                    >
                      <Check class="w-4 h-4 text-[#3B6A9E]" />
                    </div>
                  </button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-3 justify-end pt-4 border-t">
                <button
                  @click="closeFormModal"
                  type="button"
                  class="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition font-medium"
                >
                  <X class="w-4 h-4" />
                  Batal
                </button>
                <button
                  @click="saveTask"
                  type="button"
                  class="px-8 py-3 rounded-xl bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white hover:shadow-lg hover:scale-105 transition font-bold flex items-center gap-2"
                >
                  <Check class="w-5 h-5" />
                  {{ isEditMode ? "Update Task" : "Simpan Task" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- MODAL DETAIL -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showDetailModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          @click="closeDetailModal"
        >
          <div
            class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all overflow-hidden"
            @click.stop
          >
            <!-- Header -->
            <div
              class="px-8 py-6 text-white"
              :class="detailHeaderColor(selectedTask?.status)"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-3">
                    <component
                      :is="statusIcon(selectedTask?.status)"
                      class="w-8 h-8"
                    />
                    <span
                      class="px-4 py-1.5 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm capitalize"
                    >
                      {{
                        selectedTask?.status === "pending"
                          ? "Pending"
                          : selectedTask?.status === "in_progress"
                          ? "In Progress"
                          : selectedTask?.status === "completed"
                          ? "Completed"
                          : "Cancelled"
                      }}
                    </span>
                  </div>
                  <h2 class="text-3xl font-bold mb-2">
                    {{ selectedTask?.title }}
                  </h2>
                  <div class="space-y-1 text-white/90 text-sm">
                    <div class="flex items-center gap-2">
                      <Calendar class="w-4 h-4" />
                      <span
                        >Dibuat:
                        {{ formatDate(selectedTask?.created_at) }}</span
                      >
                    </div>
                    <div class="flex items-center gap-2">
                      <Clock class="w-4 h-4" />
                      <span class="font-semibold"
                        >Deadline:
                        {{ formatDate(selectedTask?.due_date) }}</span
                      >
                    </div>
                  </div>
                </div>
                <button
                  @click="closeDetailModal"
                  class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="px-8 py-6">
              <div class="space-y-6">
                <!-- Description -->
                <div>
                  <h3
                    class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"
                  >
                    <AlignLeft class="w-4 h-4 text-[#3B6A9E]" />
                    Deskripsi
                  </h3>
                  <p
                    class="text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200"
                  >
                    {{ selectedTask?.description || "Tidak ada deskripsi" }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="flex items-center gap-3 pt-4 border-t">
                  <button
                    @click="editFromDetail"
                    class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#3B6A9E] text-white rounded-xl hover:bg-[#2f5680] transition font-semibold"
                  >
                    <Edit3 class="w-5 h-5" />
                    Edit Task
                  </button>
                  <button
                    @click="deleteTask(selectedTask.id)"
                    class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition font-semibold"
                  >
                    <Trash2 class="w-5 h-5" />
                    Hapus Task
                  </button>
                </div>
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
  Plus,
  Clock,
  Activity,
  CheckCircle2,
  Calendar,
  Edit3,
  Trash2,
  X,
  Check,
  MessageSquare,
  AlignLeft,
  Tag,
  ChevronRight,
  ListTodo,
  XCircle,
} from "lucide-vue-next";

import { supabase } from "../../lib/supabase.js";

// STATE
const tasks = ref([]);
const showFormModal = ref(false);
const showDetailModal = ref(false);
const isEditMode = ref(false);
const selectedTask = ref(null);
const filterStatus = ref("all");

const formData = ref({
  id: null,
  title: "",
  description: "",
  status: "pending",
  due_date: "",
});

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    bgActive: "bg-gradient-to-br from-yellow-400 to-yellow-500",
    iconActive: "text-white",
    iconDefault: "text-yellow-600",
    textActive: "text-white",
  },
  {
    value: "in_progress",
    label: "Progress",
    icon: Activity,
    bgActive: "bg-gradient-to-br from-blue-500 to-blue-600",
    iconActive: "text-white",
    iconDefault: "text-blue-600",
    textActive: "text-white",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
    bgActive: "bg-gradient-to-br from-green-500 to-green-600",
    iconActive: "text-white",
    iconDefault: "text-green-600",
    textActive: "text-white",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    bgActive: "bg-gradient-to-br from-red-500 to-red-600",
    iconActive: "text-white",
    iconDefault: "text-red-600",
    textActive: "text-white",
  },
];

// FETCH TASKS
const fetchTasks = async () => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch tasks error:", error);
    tasks.value = [];
    return;
  }

  tasks.value = data || [];
};

onMounted(fetchTasks);

// COMPUTED
const tasksByStatus = computed(() => ({
  pending: tasks.value.filter((t) => t.status === "pending").length,
  in_progress: tasks.value.filter((t) => t.status === "in_progress").length,
  completed: tasks.value.filter((t) => t.status === "completed").length,
  cancelled: tasks.value.filter((t) => t.status === "cancelled").length,
}));

const filteredTasks = computed(() => {
  if (filterStatus.value === "all") return tasks.value;
  return tasks.value.filter((t) => t.status === filterStatus.value);
});

// HELPERS
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const statusIcon = (status) => {
  const icons = {
    pending: Clock,
    in_progress: Activity,
    completed: CheckCircle2,
    cancelled: XCircle,
  };
  return icons[status] || Clock;
};

const statusBadgeColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return colors[status] || "bg-slate-100 text-slate-700";
};

const taskBorderColor = (status) => {
  const colors = {
    pending: "border-yellow-200 hover:border-yellow-400",
    in_progress: "border-blue-200 hover:border-blue-400",
    completed: "border-green-200 hover:border-green-400",
    cancelled: "border-red-200 hover:border-red-400",
  };
  return colors[status] || "border-slate-200";
};

const detailHeaderColor = (status) => {
  const colors = {
    pending: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    in_progress: "bg-gradient-to-r from-blue-500 to-blue-600",
    completed: "bg-gradient-to-r from-green-500 to-green-600",
    cancelled: "bg-gradient-to-r from-red-500 to-red-600",
  };
  return colors[status] || "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4]";
};

// MODAL HANDLERS
const openAddModal = () => {
  isEditMode.value = false;
  formData.value = {
    id: null,
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  };
  showFormModal.value = true;
};

const openEditModal = (task) => {
  if (!task || !task.id) {
    console.error("Task data is invalid:", task);
    return;
  }

  isEditMode.value = true;
  formData.value = {
    id: task.id,
    title: task.title || "",
    description: task.description || "",
    status: task.status || "pending",
    due_date: task.due_date || "",
  };
  showFormModal.value = true;
};

const closeFormModal = () => {
  showFormModal.value = false;
  isEditMode.value = false;
  formData.value = {
    id: null,
    title: "",
    description: "",
    status: "pending",
    due_date: "",
  };
};

const openDetailModal = (task) => {
  selectedTask.value = task;
  showDetailModal.value = true;
};

const closeDetailModal = () => {
  showDetailModal.value = false;
  selectedTask.value = null;
};

const editFromDetail = () => {
  const taskToEdit = { ...selectedTask.value };
  closeDetailModal();
  setTimeout(() => {
    openEditModal(taskToEdit);
  }, 100);
};

// CRUD OPERATIONS
const saveTask = async () => {
  if (!formData.value.title.trim()) {
    alert("Judul task harus diisi!");
    return;
  }

  if (!formData.value.due_date) {
    alert("Tanggal deadline harus diisi!");
    return;
  }

  const user = (await supabase.auth.getUser()).data.user;
  if (!user) {
    alert("User not signed in");
    return;
  }

  try {
    if (formData.value.id) {
      // Update existing task
      const { error } = await supabase
        .from("tasks")
        .update({
          title: formData.value.title.trim(),
          description: formData.value.description?.trim() || null,
          status: formData.value.status,
          due_date: formData.value.due_date,
        })
        .eq("id", formData.value.id);

      if (error) {
        console.error("Update error:", error);
        alert(`Error updating task: ${error.message}`);
        return;
      }
    } else {
      // Insert new task
      const payload = {
        user_id: user.id,
        title: formData.value.title.trim(),
        description: formData.value.description?.trim() || null,
        status: formData.value.status,
        due_date: formData.value.due_date,
      };

      const { error } = await supabase.from("tasks").insert(payload);

      if (error) {
        console.error("Insert error:", error);
        alert(`Error creating task: ${error.message}`);
        return;
      }
    }

    await fetchTasks();
    closeFormModal();
  } catch (error) {
    console.error("Save task error:", error);
    alert(`Error: ${error.message}`);
  }
};

const deleteTask = async (id) => {
  if (!confirm("Hapus task ini?")) return;

  try {
    const { error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      alert(`Error: ${error.message}`);
      return;
    }

    await fetchTasks();
    closeDetailModal();
  } catch (error) {
    console.error("Delete task error:", error);
    alert(`Error: ${error.message}`);
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

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
