<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-linear-to-br from-[#F6FBFF] via-[#EEF7FF] to-[#F3F8FF]"
  >
    <!-- HEADER WITH GREETING -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
            {{ greeting }}, User! 👋
          </h1>
          <p class="text-slate-600 text-lg">{{ currentDateText }}</p>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <div class="text-right">
            <p class="text-sm text-slate-600">Produktivitas Hari Ini</p>
            <div class="flex items-center gap-2">
              <div class="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  class="h-full bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] rounded-full transition-all duration-500"
                  :style="{ width: productivityPercent + '%' }"
                ></div>
              </div>
              <span class="text-sm font-bold text-slate-900">
                {{ productivityPercent }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK STATS -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <!-- Total Tasks -->
      <div
        class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all group"
      >
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <ListTodo class="w-6 h-6 text-white" />
          </div>
          <span
            class="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
            >Total</span
          >
        </div>
        <h3 class="text-3xl font-extrabold text-slate-900 mb-1">
          {{ totalTasks }}
        </h3>
        <p class="text-sm text-slate-600">Total Tasks</p>
      </div>

      <!-- Pending -->
      <div
        class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border-2 border-transparent hover:border-yellow-400/50 transition-all group"
      >
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 bg-linear-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Clock class="w-6 h-6 text-white" />
          </div>
          <span
            class="text-xs font-semibold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full"
            >Pending</span
          >
        </div>
        <h3 class="text-3xl font-extrabold text-slate-900 mb-1">
          {{ pendingTasks }}
        </h3>
        <p class="text-sm text-slate-600">Menunggu</p>
      </div>

      <!-- In Progress -->
      <div
        class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border-2 border-transparent hover:border-blue-400/50 transition-all group"
      >
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Activity class="w-6 h-6 text-white" />
          </div>
          <span
            class="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full"
            >Progress</span
          >
        </div>
        <h3 class="text-3xl font-extrabold text-slate-900 mb-1">
          {{ inProgressTasks }}
        </h3>
        <p class="text-sm text-slate-600">Sedang Berjalan</p>
      </div>

      <!-- Completed -->
      <div
        class="bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-md border-2 border-transparent hover:border-green-400/50 transition-all group"
      >
        <div class="flex items-center justify-between mb-3">
          <div
            class="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <CheckCircle2 class="w-6 h-6 text-white" />
          </div>
          <span
            class="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full"
            >Selesai</span
          >
        </div>
        <h3 class="text-3xl font-extrabold text-slate-900 mb-1">
          {{ completedTasks }}
        </h3>
        <p class="text-sm text-slate-600">Berhasil</p>
      </div>
    </div>

    <!-- MAIN GRID -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- LEFT -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Mini Calendar -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-lg font-bold text-slate-900 flex items-center gap-2"
            >
              <CalendarIcon class="w-5 h-5 text-[#3B6A9E]" />
              {{ monthName }} {{ currentYear }}
            </h2>
            <div class="flex gap-1">
              <button
                @click="prevMonth"
                class="p-1.5 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button
                @click="nextMonth"
                class="p-1.5 hover:bg-slate-100 rounded-lg transition"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-1 text-center text-xs mb-2">
            <div
              v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
              :key="day"
              class="text-slate-600 font-semibold py-1"
            >
              {{ day }}
            </div>
          </div>

          <div class="grid grid-cols-7 gap-1">
            <div
              v-for="(day, index) in miniCalendarDays"
              :key="index"
              :class="[
                'aspect-square flex items-center justify-center text-xs rounded-lg transition-all cursor-pointer',
                day.isCurrentMonth
                  ? 'text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400',
                day.isToday
                  ? 'bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] text-white font-bold shadow-md'
                  : '',
                day.hasEvents ? 'font-bold' : '',
              ]"
            >
              <div class="relative">
                {{ day.date }}
                <div
                  v-if="day.hasEvents && !day.isToday"
                  class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#3B6A9E] rounded-full"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Events -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-10 h-10 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-xl flex items-center justify-center"
            >
              <CalendarCheck class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-slate-900">Event Hari Ini</h2>
              <p class="text-xs text-slate-600">
                {{ todayEvents.length }} event
              </p>
            </div>
          </div>

          <div v-if="todayEvents.length === 0" class="text-center py-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <CalendarX class="w-8 h-8 text-slate-400" />
            </div>
            <p class="text-sm text-slate-600">Tidak ada event hari ini</p>
          </div>

          <div v-else class="space-y-3 max-h-[300px] overflow-y-auto">
            <div
              v-for="event in todayEvents"
              :key="event.id"
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-[#3B6A9E]/30 transition-all group"
            >
              <div class="flex items-start gap-3">
                <component
                  :is="categoryIcon(event.metadata?.category)"
                  class="w-5 h-5 text-[#3B6A9E] mt-0.5"
                />
                <div class="flex-1">
                  <h4 class="font-bold text-slate-900 mb-1">
                    {{ event.title }}
                  </h4>
                  <p class="text-xs text-slate-600 mb-2">
                    {{ event.description || "Tidak ada deskripsi" }}
                  </p>
                  <span
                    class="inline-block text-[10px] px-2 py-1 rounded-full font-semibold"
                    :class="tagColor(event.metadata?.category)"
                  >
                    {{ event.metadata?.category }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Upcoming Deadlines -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-red-400/30 transition-all"
        >
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2">
              <div
                class="w-10 h-10 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center"
              >
                <AlertCircle class="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-slate-900">
                  Deadline Mendekat
                </h2>
                <p class="text-xs text-slate-600">7 hari ke depan</p>
              </div>
            </div>
            <span
              class="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold"
              >{{ upcomingDeadlines.length }} tasks</span
            >
          </div>

          <div v-if="upcomingDeadlines.length === 0" class="text-center py-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <CheckCircle2 class="w-8 h-8 text-slate-400" />
            </div>
            <p class="text-sm text-slate-600">Tidak ada deadline mendekat</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="task in upcomingDeadlines"
              :key="task.id"
              class="p-4 rounded-xl bg-linear-to-br from-white to-red-50 border-2 border-red-100 hover:border-red-300 transition-all group"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      class="px-2 py-1 rounded-full text-xs font-bold"
                      :class="statusBadgeColor(task.status)"
                    >
                      {{ statusLabel(task.status) }}
                    </span>
                    <span class="text-xs text-red-600 font-semibold">
                      {{ daysUntilDeadline(task.due_date) }}
                    </span>
                  </div>
                  <h4 class="font-bold text-slate-900 mb-1">
                    {{ task.title }}
                  </h4>
                  <p class="text-xs text-slate-600 line-clamp-2 mb-2">
                    {{ task.description || "Tidak ada deskripsi" }}
                  </p>
                  <div class="flex items-center gap-2 text-xs text-slate-500">
                    <Clock class="w-3.5 h-3.5" />
                    <span>Deadline: {{ formatDate(task.due_date) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Tasks -->
        <div
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-md p-6 border-2 border-transparent hover:border-[#3B6A9E]/30 transition-all"
        >
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2">
              <div
                class="w-10 h-10 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-xl flex items-center justify-center"
              >
                <ListTodo class="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-slate-900">Task Terbaru</h2>
                <p class="text-xs text-slate-600">5 task terakhir</p>
              </div>
            </div>
            <router-link
              to="/dashboard/journey"
              class="text-sm text-[#3B6A9E] hover:text-[#2f5680] font-semibold flex items-center gap-1 transition-all hover:gap-2"
            >
              Lihat Semua
              <ChevronRight class="w-4 h-4" />
            </router-link>
          </div>

          <div v-if="recentTasks.length === 0" class="text-center py-8">
            <div
              class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3"
            >
              <ListTodo class="w-8 h-8 text-slate-400" />
            </div>
            <p class="text-sm text-slate-600">Belum ada task</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="task in recentTasks"
              :key="task.id"
              class="p-4 rounded-xl border-2 border-slate-100 hover:border-[#3B6A9E]/30 transition-all group"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <component
                      :is="statusIcon(task.status)"
                      class="w-4 h-4"
                      :class="statusIconColor(task.status)"
                    />
                    <span
                      class="px-2 py-1 rounded-full text-xs font-bold"
                      :class="statusBadgeColor(task.status)"
                    >
                      {{ statusLabel(task.status) }}
                    </span>
                  </div>
                  <h4 class="font-bold text-slate-900 mb-1">
                    {{ task.title }}
                  </h4>
                  <p class="text-xs text-slate-600 line-clamp-2 mb-2">
                    {{ task.description || "Tidak ada deskripsi" }}
                  </p>
                  <div class="flex items-center gap-3 text-xs text-slate-500">
                    <div class="flex items-center gap-1">
                      <CalendarIcon class="w-3.5 h-3.5" />
                      <span>{{ formatDate(task.created_at) }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Clock class="w-3.5 h-3.5" />
                      <span>{{ formatDate(task.due_date) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- QUICK ACTIONS -->
        <div
          class="bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-2xl shadow-lg p-6 text-white"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <Zap class="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 class="text-lg font-bold">Quick Actions</h2>
              <p class="text-xs text-white/80">Akses cepat ke fitur utama</p>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all group text-left"
            >
              <Plus
                class="w-6 h-6 mb-2 group-hover:scale-110 transition-transform"
              />
              <p class="text-sm font-bold">Tambah Task</p>
              <p class="text-xs text-white/80">Buat task baru</p>
            </button>

            <button
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all group text-left"
            >
              <CalendarPlus
                class="w-6 h-6 mb-2 group-hover:scale-110 transition-transform"
              />
              <p class="text-sm font-bold">Tambah Event</p>
              <p class="text-xs text-white/80">Buat event baru</p>
            </button>

            <button
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all group text-left"
            >
              <TrendingUp
                class="w-6 h-6 mb-2 group-hover:scale-110 transition-transform"
              />
              <p class="text-sm font-bold">Lihat Progress</p>
              <p class="text-xs text-white/80">Analisis task</p>
            </button>

            <button
              class="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl p-4 transition-all group text-left"
            >
              <CalendarIcon
                class="w-6 h-6 mb-2 group-hover:scale-110 transition-transform"
              />
              <p class="text-sm font-bold">Kalender</p>
              <p class="text-xs text-white/80">Lihat semua event</p>
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
  Calendar as CalendarIcon,
  Clock,
  Activity,
  CheckCircle2,
  ListTodo,
  Plus,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CalendarCheck,
  CalendarX,
  Zap,
  CalendarPlus,
  TrendingUp,
  Timer,
  UserRound,
  Pin,
} from "lucide-vue-next";

import { supabase } from "../../lib/supabase.js";

// STATE
const tasks = ref([]);
const events = ref([]);
const currentMonth = ref(new Date().getMonth());
const currentYear = ref(new Date().getFullYear());

const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// FETCH DATA
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

onMounted(() => {
  fetchTasks();
  fetchEvents();
});

// COMPUTED
const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Selamat Pagi";
  if (hour < 18) return "Selamat Siang";
  return "Selamat Malam";
});

const currentDateText = computed(() => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date().toLocaleDateString("id-ID", options);
});

const monthName = computed(() => monthNames[currentMonth.value]);

const totalTasks = computed(() => tasks.value.length);
const pendingTasks = computed(
  () => tasks.value.filter((t) => t.status === "pending").length
);
const inProgressTasks = computed(
  () => tasks.value.filter((t) => t.status === "in_progress").length
);
const completedTasks = computed(
  () => tasks.value.filter((t) => t.status === "completed").length
);

const productivityPercent = computed(() => {
  if (totalTasks.value === 0) return 0;
  return Math.round((completedTasks.value / totalTasks.value) * 100);
});

const todayEvents = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return events.value.filter((e) => e.event_date === today);
});

const upcomingDeadlines = computed(() => {
  const today = new Date();
  const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  return tasks.value
    .filter((t) => {
      if (t.status === "completed") return false;
      const dueDate = new Date(t.due_date);
      return dueDate >= today && dueDate <= sevenDaysLater;
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 3);
});

const recentTasks = computed(() => {
  return tasks.value.slice(0, 5);
});

const miniCalendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const lastDate = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
  const startDay = firstDay.getDay();

  const days = [];
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  // Previous month days
  for (let i = 0; i < startDay; i++) {
    const date = new Date(
      currentYear.value,
      currentMonth.value,
      i - startDay + 1
    );
    days.push({
      date: date.getDate(),
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    });
  }

  // Current month days
  for (let d = 1; d <= lastDate; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d);
    const dateStr = date.toISOString().split("T")[0];
    days.push({
      date: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      hasEvents: events.value.some((e) => e.event_date === dateStr),
    });
  }

  // Next month days
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: i,
      isCurrentMonth: false,
      isToday: false,
      hasEvents: false,
    });
  }

  return days;
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

const daysUntilDeadline = (dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Hari ini!";
  if (diff === 1) return "Besok";
  if (diff < 0) return "Terlambat!";
  return `${diff} hari lagi`;
};

const statusLabel = (status) => {
  const labels = {
    pending: "Pending",
    in_progress: "Progress",
    completed: "Selesai",
  };
  return labels[status] || status;
};

const statusIcon = (status) => {
  const icons = {
    pending: Clock,
    in_progress: Activity,
    completed: CheckCircle2,
  };
  return icons[status] || Clock;
};

const statusIconColor = (status) => {
  const colors = {
    pending: "text-yellow-600",
    in_progress: "text-blue-600",
    completed: "text-green-600",
  };
  return colors[status] || "text-slate-600";
};

const statusBadgeColor = (status) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    in_progress: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
  };
  return colors[status] || "bg-slate-100 text-slate-700";
};

const categoryIcon = (category) => {
  const icons = {
    meeting: CalendarIcon,
    deadline: Timer,
    personal: UserRound,
  };
  return icons[category] || Pin;
};

const tagColor = (category) => {
  return (
    {
      meeting: "bg-blue-100 text-blue-700",
      deadline: "bg-red-100 text-red-700",
      personal: "bg-green-100 text-green-700",
    }[category] || "bg-slate-100 text-slate-700"
  );
};

// NAVIGATION
const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
};

const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
