<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40"
  >
    <!-- Header with Greeting & Time -->
    <div class="mb-8">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h1
            class="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2"
          >
            Selamat Datang!
          </h1>
          <p class="text-slate-600 text-lg">
            {{ currentDateLong }}
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Total Tasks -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/40 hover:shadow-xl hover:scale-[1.02] transition-all group"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-14 h-14 bg-linear-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Target class="w-7 h-7 text-white" />
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-black">
              {{ totalTasks }}
            </div>
            <div class="text-xs text-slate-700 font-medium">Total Tasks</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between pt-4 border-t border-[#8FABD4]/30"
        >
          <span class="text-sm text-slate-700">Progress</span>
          <span class="text-sm font-bold text-[#4A70A9]">
            {{ completionRate }}%
          </span>
        </div>
      </div>

      <!-- Active Tasks -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/40 hover:shadow-xl hover:scale-[1.02] transition-all group"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-14 h-14 bg-linear-to-br from-[#4A70A9]/90 to-[#4A70A9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Activity class="w-7 h-7 text-white" />
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-black">
              {{ taskStats.in_progress }}
            </div>
            <div class="text-xs text-slate-700 font-medium">In Progress</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between pt-4 border-t border-[#8FABD4]/30"
        >
          <span class="text-sm text-slate-700">Status</span>
          <span class="text-sm font-bold text-[#4A70A9]">Active</span>
        </div>
      </div>

      <!-- Completed -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/40 hover:shadow-xl hover:scale-[1.02] transition-all group"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-14 h-14 bg-linear-to-br from-[#8FABD4] to-[#4A70A9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <CheckCircle2 class="w-7 h-7 text-white" />
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-black">
              {{ taskStats.completed }}
            </div>
            <div class="text-xs text-slate-700 font-medium">Completed</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between pt-4 border-t border-[#8FABD4]/30"
        >
          <span class="text-sm text-slate-700">Success Rate</span>
          <span class="text-sm font-bold text-[#4A70A9]">
            {{ completionRate }}%
          </span>
        </div>
      </div>

      <!-- Events Today -->
      <div
        class="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/40 hover:shadow-xl hover:scale-[1.02] transition-all group"
      >
        <div class="flex items-center justify-between mb-4">
          <div
            class="w-14 h-14 bg-linear-to-br from-[#8FABD4] to-[#4A70A9] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <Calendar class="w-7 h-7 text-white" />
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-black">
              {{ todayEvents.length }}
            </div>
            <div class="text-xs text-slate-700 font-medium">Events Today</div>
          </div>
        </div>
        <div
          class="flex items-center justify-between pt-4 border-t border-[#8FABD4]/30"
        >
          <span class="text-sm text-slate-700">Schedule</span>
          <span class="text-sm font-bold text-[#4A70A9]">Today</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Calendar Widget -->
      <div
        class="lg:col-span-1 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar class="w-6 h-6 text-[#3B6A9E]" />
            Kalender
          </h2>
          <RouterLink
            to="/dashboard/events"
            class="text-sm text-[#3B6A9E] hover:text-[#2f5680] font-semibold flex items-center gap-1"
          >
            Lihat Semua
            <ChevronRight class="w-4 h-4" />
          </RouterLink>
        </div>

        <div class="mb-4 text-center">
          <div class="text-lg font-bold text-slate-900">{{ monthName }}</div>
        </div>

        <!-- Week days -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="(d, i) in weekDays"
            :key="i"
            class="text-center text-xs font-semibold text-slate-600 py-2"
          >
            {{ d }}
          </div>
        </div>

        <!-- Calendar grid -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="(day, idx) in calendarDays"
            :key="idx"
            :class="[
              'relative aspect-square rounded-xl text-sm font-medium transition-all',
              !day.isCurrentMonth ? 'text-slate-300' : 'text-slate-700',
              isToday(day.date)
                ? 'bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] text-white shadow-md'
                : 'hover:bg-slate-50',
              hasEvents(day.date) && !isToday(day.date)
                ? 'bg-blue-50 border-2 border-blue-200'
                : '',
            ]"
          >
            {{ day.date.getDate() }}
            <div
              v-if="hasEvents(day.date)"
              class="absolute bottom-1 left-1/2 transform -translate-x-1/2"
            >
              <div
                :class="[
                  'w-1.5 h-1.5 rounded-full',
                  isToday(day.date) ? 'bg-white' : 'bg-blue-500',
                ]"
              />
            </div>
          </button>
        </div>

        <!-- Today's Events -->
        <div class="mt-6 pt-6 border-t border-slate-200">
          <h3
            class="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"
          >
            <Zap class="w-4 h-4 text-orange-500" />
            Event Hari Ini
          </h3>
          <div v-if="todayEvents.length > 0" class="space-y-2">
            <div
              v-for="ev in todayEvents"
              :key="ev.id"
              class="flex items-center gap-3 p-3 bg-linear-to-r from-blue-50 to-transparent rounded-xl"
            >
              <div
                class="w-8 h-8 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-lg flex items-center justify-center shrink-0"
              >
                <component
                  :is="categoryIcon(ev.metadata?.category)"
                  class="w-4 h-4 text-white"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-slate-900 truncate">
                  {{ ev.title }}
                </div>
                <div class="text-xs text-slate-600 capitalize">
                  {{ ev.metadata?.category }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-6 text-slate-400 text-sm">
            Tidak ada event hari ini
          </div>
        </div>
      </div>

      <!-- Tasks Overview -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Urgent Tasks -->
        <div
          class="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-red-200"
        >
          <div class="flex items-center justify-between mb-6">
            <h2
              class="text-2xl font-bold text-slate-900 flex items-center gap-3"
            >
              <AlertCircle class="w-6 h-6 text-red-500" />
              Tugas Mendesak
            </h2>
            <span
              class="px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-bold"
            >
              {{ urgentTasks.length }} Tugas
            </span>
          </div>

          <div
            v-if="urgentTasks.length > 0"
            class="space-y-3 max-h-[400px] overflow-y-auto pr-2"
          >
            <div
              v-for="task in urgentTasks"
              :key="task.id"
              class="group p-4 bg-linear-to-r from-red-50 to-transparent rounded-2xl border-2 border-red-100 hover:border-red-300 hover:shadow-md transition-all"
            >
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-base font-bold text-slate-900 mb-2 line-clamp-2"
                  >
                    {{ task.title }}
                  </h3>
                  <div class="flex items-center gap-3 text-sm flex-wrap">
                    <div class="flex items-center gap-2">
                      <Clock :class="getDaysUntilClass(task.due_date)" />
                      <span
                        :class="[
                          'font-semibold text-xs',
                          getDaysUntilTextClass(task.due_date),
                        ]"
                      >
                        {{ getDaysUntil(task.due_date) }}
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span
                        :class="[
                          'px-2.5 py-1 rounded-full text-xs font-bold',
                          task.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700',
                        ]"
                      >
                        {{
                          task.status === "pending" ? "Pending" : "In Progress"
                        }}
                      </span>
                    </div>
                  </div>
                </div>
                <RouterLink to="/dashboard/journey">
                  <button
                    class="cursor-pointer opacity-0 group-hover:opacity-100 transition p-2 hover:bg-white rounded-lg shrink-0"
                  >
                    <ChevronRight class="w-4 h-4 text-slate-600" />
                  </button>
                </RouterLink>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-slate-400">
            <Award class="w-12 h-12 mx-auto mb-3 text-green-400" />
            <div class="text-sm font-medium">Tidak ada tugas mendesak!</div>
            <div class="text-xs">Semua tugas dalam kendali</div>
          </div>
        </div>

        <!-- Task Status Overview -->
        <div
          class="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200"
        >
          <div class="flex items-center justify-between mb-6">
            <h2
              class="text-2xl font-bold text-slate-900 flex items-center gap-3"
            >
              <BarChart3 class="w-6 h-6 text-[#3B6A9E]" />
              Status Tugas
            </h2>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              class="p-4 bg-linear-to-br from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-200"
            >
              <div class="flex items-center gap-3 mb-2">
                <Clock class="w-5 h-5 text-yellow-600" />
                <span class="text-xs font-semibold text-yellow-700"
                  >Pending</span
                >
              </div>
              <div class="text-3xl font-bold text-yellow-700">
                {{ taskStats.pending }}
              </div>
            </div>

            <div
              class="p-4 bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200"
            >
              <div class="flex items-center gap-3 mb-2">
                <Activity class="w-5 h-5 text-blue-600" />
                <span class="text-xs font-semibold text-blue-700"
                  >Progress</span
                >
              </div>
              <div class="text-3xl font-bold text-blue-700">
                {{ taskStats.in_progress }}
              </div>
            </div>

            <div
              class="p-4 bg-linear-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200"
            >
              <div class="flex items-center gap-3 mb-2">
                <CheckCircle2 class="w-5 h-5 text-green-600" />
                <span class="text-xs font-semibold text-green-700"
                  >Success</span
                >
              </div>
              <div class="text-3xl font-bold text-green-700">
                {{ taskStats.completed }}
              </div>
            </div>

            <div
              class="p-4 bg-linear-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200"
            >
              <div class="flex items-center gap-3 mb-2">
                <XCircle class="w-5 h-5 text-red-600" />
                <span class="text-xs font-semibold text-red-700"
                  >Cancelled</span
                >
              </div>
              <div class="text-3xl font-bold text-red-700">
                {{ taskStats.cancelled }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div
        class="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <TrendingUp class="w-6 h-6 text-[#3B6A9E]" />
            Aktivitas Terbaru
          </h2>
        </div>

        <div class="space-y-3">
          <div
            v-for="task in recentTasks"
            :key="task.id"
            class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group"
          >
            <div
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                task.status === 'pending'
                  ? 'bg-yellow-100'
                  : task.status === 'in_progress'
                  ? 'bg-blue-100'
                  : task.status === 'completed'
                  ? 'bg-green-100'
                  : 'bg-red-100',
              ]"
            >
              <Clock
                v-if="task.status === 'pending'"
                class="w-5 h-5 text-yellow-600"
              />
              <Activity
                v-else-if="task.status === 'in_progress'"
                class="w-5 h-5 text-blue-600"
              />
              <CheckCircle2
                v-else-if="task.status === 'completed'"
                class="w-5 h-5 text-green-600"
              />
              <XCircle v-else class="w-5 h-5 text-red-600" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-slate-900 truncate">
                {{ task.title }}
              </div>
              <div class="text-xs text-slate-600">
                Dibuat {{ formatDate(task.created_at) }}
              </div>
            </div>
            <RouterLink
              :to="{
                path: '/dashboard/journey',
                query: { task: task.id },
              }"
            >
              <button
                class="opacity-0 cursor-pointer group-hover:opacity-100 transition p-2 hover:bg-white rounded-lg shrink-0"
              >
                <ChevronRight class="w-4 h-4 text-slate-600" />
              </button>
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div
        class="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-slate-200"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar class="w-6 h-6 text-[#3B6A9E]" />
            Event Mendatang
          </h2>
        </div>

        <div v-if="upcomingEvents.length > 0" class="space-y-3">
          <div
            v-for="ev in upcomingEvents"
            :key="ev.id"
            class="flex items-center gap-4 p-4 bg-linear-to-r from-blue-50 to-transparent rounded-2xl hover:shadow-md transition-shadow group cursor-pointer"
            @click="
              $router.push({ name: 'DashboardEvents', query: { open: ev.id } })
            "
          >
            <div
              class="w-10 h-10 bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] rounded-xl flex items-center justify-center shrink-0"
            >
              <component
                :is="categoryIcon(ev.metadata?.category)"
                class="w-5 h-5 text-white"
              />
            </div>

            <div class="flex-1 min-w-0">
              <div class="text-sm font-semibold text-slate-900 truncate">
                {{ ev.title }}
              </div>

              <div class="flex items-center gap-2 text-xs text-slate-600">
                <span class="capitalize">
                  {{ ev.metadata?.category || "event" }}
                </span>
                <span>•</span>
                <span>{{ formatDate(ev.event_date) }}</span>
                <span v-if="ev.start_time">
                  • {{ formatTime(ev.start_time) }}
                </span>
              </div>
            </div>

            <ArrowRight
              class="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        <div v-else class="text-center py-12 text-slate-400">
          <Calendar class="w-12 h-12 mx-auto mb-3" />
          <div class="text-sm font-medium">Tidak ada event mendatang</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Activity,
  XCircle,
  TrendingUp,
  AlertCircle,
  Target,
  Zap,
  Timer,
  ChevronRight,
  UserRound,
  Pin,
  ArrowRight,
  Award,
  BarChart3,
} from "lucide-vue-next";
import { supabase } from "../../lib/supabase.js";

/* ================= STATE ================= */
const tasks = ref([]);
const events = ref([]);
const currentTime = ref(new Date());
const selectedDate = ref(new Date());
const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
let timeInterval = null;

/* ============================================================
   TIMEZONE-SAFE DATE CORE (WAJIB – JANGAN UBAH)
============================================================ */

/**
 * Konversi input ke Date LOCAL (aman untuk YYYY-MM-DD Supabase)
 */
const toLocalDate = (value) => {
  if (!value) return null;

  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  const d = new Date(value);
  return new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  );
};

/**
 * Key integer unik per hari (timezone-safe)
 * contoh: 20251204
 */
const dayKey = (value) => {
  const d = toLocalDate(value);
  if (!d) return null;
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

const todayKey = () => dayKey(new Date());

const startOfLocalDay = (value = new Date()) => {
  const d = toLocalDate(value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

const diffDaysLocal = (a, b) => {
  const da = startOfLocalDay(a).getTime();
  const db = startOfLocalDay(b).getTime();
  return Math.round((da - db) / 86400000);
};

/* ================= FETCH DATA ================= */
const fetchData = async () => {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;

  const { data: tasksData } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  tasks.value = tasksData || [];

  const { data: eventsData } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true });

  events.value = eventsData || [];
};

/* ================= LIFECYCLE ================= */
onMounted(() => {
  fetchData();
  timeInterval = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onBeforeUnmount(() => {
  if (timeInterval) clearInterval(timeInterval);
});

/* ================= COMPUTED ================= */
const currentTimeFormatted = computed(() =>
  currentTime.value.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
);

const currentDateLong = computed(() =>
  currentTime.value.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
);

const monthName = computed(() =>
  selectedDate.value.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  })
);

/* ================= CALENDAR ================= */
const calendarDays = computed(() => {
  const year = selectedDate.value.getFullYear();
  const month = selectedDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0).getDate();
  const startDay = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push({
      date: new Date(year, month, i - startDay + 1),
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= lastDate; d++) {
    days.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    });
  }

  return days;
});

/* ================= EVENTS (FIXED & SAFE) ================= */

// ✅ EVENT HARI INI
const todayEvents = computed(() => {
  const today = todayKey();
  return events.value.filter((ev) => dayKey(ev.event_date) === today);
});

// ✅ EVENT MENDATANG (H+1 s/d H+7)
const upcomingEvents = computed(() => {
  const today = todayKey();

  return events.value
    .filter((ev) => {
      const d = dayKey(ev.event_date);
      return d > today && d <= today + 7;
    })
    .sort((a, b) => dayKey(a.event_date) - dayKey(b.event_date))
    .slice(0, 5);
});

/* ================= TASKS ================= */
const taskStats = computed(() => ({
  pending: tasks.value.filter((t) => t.status === "pending").length,
  in_progress: tasks.value.filter((t) => t.status === "in_progress").length,
  completed: tasks.value.filter((t) => t.status === "completed").length,
  cancelled: tasks.value.filter((t) => t.status === "cancelled").length,
}));

const totalTasks = computed(() => tasks.value.length);

const completionRate = computed(() =>
  totalTasks.value
    ? Math.round((taskStats.value.completed / totalTasks.value) * 100)
    : 0
);

// ✅ TASK URGENT (±5 hari)
const urgentTasks = computed(() =>
  tasks.value.filter((t) => {
    if (["completed", "cancelled"].includes(t.status)) return false;
    const diff = diffDaysLocal(t.due_date, new Date());
    return diff >= -5 && diff <= 5;
  })
);

const recentTasks = computed(() =>
  [...tasks.value]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)
);

/* ================= CALENDAR HELPERS ================= */
const eventsForDay = (date) =>
  events.value.filter((ev) => dayKey(ev.event_date) === dayKey(date));

const hasEvents = (date) =>
  events.value.some((ev) => dayKey(ev.event_date) === dayKey(date));

const isToday = (date) => dayKey(date) === todayKey();

/* ================= UI HELPERS ================= */
const categoryIcon = (category) => {
  const icons = {
    meeting: Calendar,
    deadline: Timer,
    personal: UserRound,
  };
  return icons[category] || Pin;
};

const formatDate = (dateStr) =>
  toLocalDate(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });

const formatTime = (timeStr) => timeStr?.slice(0, 5) || "";

const getDaysUntil = (dateStr) => {
  const diff = diffDaysLocal(dateStr, new Date());

  if (diff < 0) return `Terlambat ${Math.abs(diff)} hari`;
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Besok";
  return `${diff} hari lagi`;
};

const getDaysUntilClass = (dateStr) => {
  const d = diffDaysLocal(dateStr, new Date());

  if (d < 0) return "text-red-600 w-4 h-4";
  if (d === 0) return "text-orange-600 w-4 h-4";
  if (d <= 2) return "text-yellow-600 w-4 h-4";
  return "text-slate-600 w-4 h-4";
};

const getDaysUntilTextClass = (dateStr) => {
  const d = diffDaysLocal(dateStr, new Date());

  if (d < 0) return "text-red-600";
  if (d === 0) return "text-orange-600";
  if (d <= 2) return "text-yellow-600";
  return "text-slate-600";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar untuk area yang scrollable */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
