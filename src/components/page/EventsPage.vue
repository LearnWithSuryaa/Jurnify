<template>
  <section
    class="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-linear-to-br from-[#F6FBFF] via-[#EEF7FF] to-[#F3F8FF]"
  >
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-6">
      <div class="space-y-1">
        <h1
          class="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
        >
          Calendar
        </h1>
        <p class="text-slate-600 text-sm">
          Kelola event Anda berdasarkan tanggal tertentu
        </p>
      </div>

      <div
        class="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md"
      >
        <button
          @click="goToday"
          class="text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg"
        >
          Today
        </button>

        <div class="flex items-center gap-2">
          <button
            @click="openMonthYearModal"
            class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition border border-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-slate-700"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 8v8h12V8H4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-medium"
              >{{ monthName }} {{ currentYear }}</span
            >
          </button>
        </div>

        <div class="flex items-center bg-white rounded-xl shadow-sm px-2 py-1">
          <button
            @click="prevMonth"
            class="p-2 rounded-md hover:bg-slate-50 transition"
          >
            ◀
          </button>
          <button
            @click="nextMonth"
            class="p-2 rounded-md hover:bg-slate-50 transition"
          >
            ▶
          </button>
        </div>
      </div>
    </div>

    <!-- SUMMARY BAR -->
    <div
      class="flex items-center justify-between bg-white/60 backdrop-blur-sm p-3 rounded-2xl shadow-sm mb-6"
    >
      <div class="flex items-center gap-3">
        <div class="text-sm text-slate-700">Events this month:</div>
        <div class="text-sm font-semibold text-slate-900">
          {{ eventsThisMonth }}
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div
          v-for="(count, c) in summaryByCategory"
          :key="c"
          class="text-xs px-2 py-1 rounded-full flex items-center gap-2"
          :class="categoryPillColor(c)"
        >
          <span
            class="w-2 h-2 rounded-full"
            :class="categoryDotColor(c)"
          ></span>
          <span class="font-medium">{{ c }}</span>
          <span class="text-slate-600">({{ count }})</span>
        </div>
      </div>
    </div>

    <!-- WEEK DAYS -->
    <div
      class="grid grid-cols-7 text-center text-xs md:text-sm font-semibold text-slate-600"
    >
      <div v-for="d in weekDays" :key="d" class="py-2">{{ d }}</div>
    </div>

    <!-- CALENDAR GRID -->
    <transition-group
      name="month"
      tag="div"
      class="grid grid-cols-7 mt-4 gap-3"
      :key="gridKey"
    >
      <div
        v-for="(day, index) in daysGrid"
        :key="dayKey(day, index)"
        @click="openDay(day)"
        class="rounded-2xl h-32 p-3 border transition cursor-pointer group bg-white/60 backdrop-blur-md shadow-sm hover:shadow-lg hover:scale-[1.01] flex flex-col"
        :class="dayClass(day)"
      >
        <div class="flex justify-between items-start">
          <span :class="dateLabelClass(day)">{{ day.date.getDate() }}</span>
          <span
            v-if="eventsForDay(day.date).length"
            class="text-[11px] px-2 py-1 rounded-md font-semibold truncate"
            :class="badgeContrast(eventsForDay(day.date).length)"
          >
            {{ eventsForDay(day.date).length }}
          </span>
        </div>

        <div class="mt-2 space-y-1 overflow-y-auto">
          <div
            v-for="ev in eventsForDay(day.date)"
            :key="ev.id"
            class="text-[11px] px-2 py-1 rounded-xl font-medium truncate flex items-center gap-2"
            :class="tagColor(ev.metadata?.category)"
          >
            <component
              :is="categoryIcon(ev.metadata?.category)"
              class="w-3 h-3 opacity-90"
            />
            <span class="truncate">{{ ev.title }}</span>
          </div>

          <div
            v-if="eventsForDay(day.date).length === 0"
            class="text-[11px] px-2 py-1 rounded-xl text-slate-400 italic"
          >
            No events
          </div>
        </div>
      </div>
    </transition-group>

    <!-- MODAL MONTH/YEAR PICKER -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showMonthYearModal"
          class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          @click="showMonthYearModal = false"
        >
          <div
            class="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl w-full max-w-md transform transition-all"
            @click.stop
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-slate-900">
                Pilih Bulan & Tahun
              </h3>
              <button
                @click="showMonthYearModal = false"
                class="text-slate-600 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <!-- Year Selector -->
            <div class="mb-6">
              <label class="text-sm text-slate-600 mb-2 block">Tahun</label>
              <div class="flex items-center gap-3">
                <button
                  @click="prevYear"
                  class="p-2 rounded-lg hover:bg-slate-100 transition"
                >
                  ◀
                </button>
                <div class="flex-1 text-center">
                  <span class="text-2xl font-bold text-slate-900">{{
                    currentYear
                  }}</span>
                </div>
                <button
                  @click="nextYear"
                  class="p-2 rounded-lg hover:bg-slate-100 transition"
                >
                  ▶
                </button>
              </div>
            </div>

            <!-- Month Grid -->
            <div>
              <label class="text-sm text-slate-600 mb-2 block">Bulan</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  v-for="(m, i) in monthsShort"
                  :key="m"
                  @click="pickMonthFromModal(i)"
                  :class="[
                    'px-4 py-3 rounded-xl text-sm transition font-medium',
                    i === currentMonth
                      ? 'bg-[#3B6A9E] text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100',
                  ]"
                >
                  {{ m }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>

    <!-- MODAL -->
    <teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          @keydown.esc="closeModal"
          tabindex="-1"
        >
          <div
            class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl transform transition-all overflow-hidden"
          >
            <!-- Header dengan gradient -->
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
                      {{ isEditMode ? "Edit Event" : "Tambah Event Baru" }}
                    </h2>
                  </div>
                  <div class="flex items-center gap-2 text-white/90">
                    <CalendarIcon class="w-4 h-4" />
                    <p class="text-sm font-medium">{{ selectedDateText }}</p>
                  </div>
                </div>
                <button
                  @click="closeModal"
                  class="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="px-8 py-6">
              <!-- If list exists show list first -->
              <div
                v-if="selectedDateEvents.length > 0 && !isEditMode"
                class="space-y-4"
              >
                <div class="flex items-center justify-between mb-4">
                  <h3
                    class="text-lg font-semibold text-slate-900 flex items-center gap-2"
                  >
                    <span class="w-2 h-2 bg-[#3B6A9E] rounded-full"></span>
                    Event yang sudah ada ({{ selectedDateEvents.length }})
                  </h3>
                  <button
                    @click="isEditMode = true"
                    class="flex items-center gap-2 px-4 py-2 bg-[#3B6A9E] text-white rounded-xl hover:bg-[#2f5680] transition text-sm font-medium"
                  >
                    <Plus class="w-4 h-4" />
                    Tambah Baru
                  </button>
                </div>

                <div class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  <div
                    v-for="ev in selectedDateEvents"
                    :key="ev.id"
                    class="group p-5 border-2 rounded-2xl bg-linear-to-br from-white to-slate-50 hover:shadow-lg hover:border-[#3B6A9E]/30 transition-all"
                  >
                    <div class="flex justify-between items-start gap-4">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                          <component
                            :is="categoryIcon(ev.metadata?.category)"
                            class="w-5 h-5 text-[#3B6A9E]"
                          />
                          <h4 class="font-bold text-lg text-slate-900">
                            {{ ev.title }}
                          </h4>
                        </div>
                        <p class="text-slate-600 text-sm mb-3">
                          {{ ev.description || "Tidak ada deskripsi" }}
                        </p>
                        <div
                          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                          :class="tagColor(ev.metadata?.category)"
                        >
                          <span
                            class="w-1.5 h-1.5 bg-white rounded-full"
                          ></span>
                          {{ ev.metadata?.category }}
                        </div>
                      </div>
                      <div class="flex flex-col gap-2">
                        <button
                          @click="startEdit(ev)"
                          class="flex items-center gap-2 px-4 py-2 bg-[#3B6A9E] text-white rounded-lg hover:bg-[#2f5680] transition text-sm font-medium"
                        >
                          <Edit3 class="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          @click="deleteEvent(ev.id)"
                          class="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                        >
                          <Trash2 class="w-4 h-4" />
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Add / Edit -->
              <div
                v-if="isEditMode || selectedDateEvents.length === 0"
                class="space-y-6"
              >
                <!-- Title Input dengan icon -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <MessageSquare class="w-4 h-4 text-[#3B6A9E]" />
                    Judul Event
                  </label>
                  <input
                    v-model="newEvent.title"
                    type="text"
                    placeholder="Masukkan judul event..."
                    class="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base font-medium placeholder:text-slate-400"
                  />
                </div>

                <!-- Description with icon -->
                <div class="space-y-2">
                  <label
                    class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <AlignLeft class="w-4 h-4 text-[#3B6A9E]" />
                    Deskripsi
                  </label>
                  <textarea
                    v-model="newEvent.desc"
                    rows="4"
                    placeholder="Tambahkan deskripsi event..."
                    class="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-slate-200 focus:border-[#3B6A9E] focus:bg-white outline-none transition text-base placeholder:text-slate-400 resize-none"
                  ></textarea>
                </div>

                <!-- Category Selection dengan design modern -->
                <div class="space-y-3">
                  <label
                    class="text-sm font-semibold text-slate-700 flex items-center gap-2"
                  >
                    <Tag class="w-4 h-4 text-[#3B6A9E]" />
                    Pilih Kategori
                  </label>
                  <div class="grid grid-cols-3 gap-3">
                    <button
                      v-for="c in categories"
                      :key="c"
                      @click="selectCategory(c)"
                      :class="[
                        'group relative px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-3',
                        newEvent.category === c
                          ? 'bg-linear-to-br from-[#3B6A9E] to-[#5a8bc4] border-[#3B6A9E] text-white shadow-lg scale-105'
                          : 'bg-white border-slate-200 hover:border-[#3B6A9E]/50 hover:shadow-md text-slate-700',
                      ]"
                    >
                      <component
                        :is="categoryIcon(c)"
                        :class="[
                          'w-7 h-7 transition-transform group-hover:scale-110',
                          newEvent.category === c
                            ? 'text-white'
                            : 'text-[#3B6A9E]',
                        ]"
                      />
                      <span class="text-sm font-bold capitalize">{{ c }}</span>
                      <div
                        v-if="newEvent.category === c"
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
                    @click="cancelEdit"
                    class="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition font-medium"
                  >
                    <X class="w-4 h-4" />
                    Batal
                  </button>
                  <button
                    @click="saveEvent"
                    class="px-8 py-3 rounded-xl bg-linear-to-r from-[#3B6A9E] to-[#5a8bc4] text-white hover:shadow-lg hover:scale-105 transition font-bold flex items-center gap-2"
                  >
                    <Check class="w-5 h-5" />
                    {{ newEvent.id ? "Update Event" : "Simpan Event" }}
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
import { ref, computed, onMounted} from "vue";
import {
  Calendar as CalendarIcon,
  Timer,
  UserRound,
  Pin,
  Edit3,
  Plus,
  X,
  MessageSquare,
  AlignLeft,
  Tag,
  Check,
  Trash2,
} from "lucide-vue-next";

import { supabase } from "../../lib/supabase.js";

// STATE
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthsLong = Array.from({ length: 12 }).map((_, i) =>
  new Date(0, i).toLocaleString("id-ID", { month: "long" })
);
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const gridKey = ref(0);

const showModal = ref(false);
const isEditMode = ref(false);
const showMonthYearModal = ref(false);

const selectedDate = ref(null);
const selectedDateEvents = ref([]);

const newEvent = ref({ id: null, title: "", desc: "", category: "" });
const events = ref([]);

const categories = ["meeting", "deadline", "personal"];

// REFS for click-away (not needed anymore)
// const monthPickerRef = ref(null);
// const monthToggleRef = ref(null);

// FETCH
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

onMounted(fetchEvents);
// COMPUTED
const monthName = computed(() => monthsLong[currentMonth.value]);
const daysGrid = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1);
  const startDay = firstDay.getDay();
  const lastDate = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push({
      date: new Date(currentYear.value, currentMonth.value, i - startDay + 1),
      isCurrentMonth: false,
    });
  }
  for (let d = 1; d <= lastDate; d++)
    days.push({
      date: new Date(currentYear.value, currentMonth.value, d),
      isCurrentMonth: true,
    });
  while (days.length < 42) {
    days.push({
      date: new Date(
        currentYear.value,
        currentMonth.value + 1,
        days.length - lastDate - startDay + 1
      ),
      isCurrentMonth: false,
    });
  }
  return days;
});

const dayKey = (day, index) => `${day.date.toDateString()}-${index}`;

const selectedDateText = computed(() =>
  selectedDate.value
    ? selectedDate.value.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""
);

const eventsThisMonth = computed(() => {
  const m = currentMonth.value;
  const y = currentYear.value;
  return events.value.filter(
    (e) =>
      new Date(e.event_date).getMonth() === m &&
      new Date(e.event_date).getFullYear() === y
  ).length;
});

const summaryByCategory = computed(() => {
  const m = currentMonth.value;
  const y = currentYear.value;
  const map = {};
  events.value
    .filter(
      (e) =>
        new Date(e.event_date).getMonth() === m &&
        new Date(e.event_date).getFullYear() === y
    )
    .forEach((ev) => {
      const c = ev.metadata?.category || "uncategorized";
      map[c] = (map[c] || 0) + 1;
    });
  return map;
});

// HELPERS
const eventsForDay = (date) => {
  const match = date.toISOString().split("T")[0];
  return events.value.filter((ev) => ev.event_date === match);
};

const dayClass = (day) => {
  if (!day.isCurrentMonth) return "opacity-60 border-transparent";
  if (day.date.toDateString() === today.toDateString())
    return "border-[#3B6A9E] ring-1 ring-[#3B6A9E]/30";
  return "border-gray-200";
};

const dateLabelClass = (day) => {
  let base = "text-sm font-semibold";
  if (day.date.toDateString() === today.toDateString())
    base += " text-white bg-[#3B6A9E] px-2 py-1 rounded-lg";
  else base += " text-slate-700";
  return base;
};

const badgeContrast = (n) =>
  n > 2
    ? "bg-orange-100 text-orange-700 px-2 rounded-md"
    : "bg-slate-100 text-slate-700 px-2 rounded-md";

const tagColor = (category) =>
  ({
    meeting: "bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white",
    deadline: "bg-gradient-to-r from-red-600 to-red-400 text-white",
    personal: "bg-gradient-to-r from-green-600 to-green-400 text-white",
  }[category] || "bg-slate-100 text-slate-700");

const categoryPillColor = (c) =>
  ({
    meeting: "bg-white shadow-sm",
    deadline: "bg-white shadow-sm",
    personal: "bg-white shadow-sm",
  }[c] || "bg-white");

const categoryDotColor = (c) =>
  ({
    meeting: "bg-[#3B6A9E]",
    deadline: "bg-red-500",
    personal: "bg-green-500",
  }[c] || "bg-slate-400");

const categoryIcon = (c) => {
  const icons = {
    meeting: CalendarIcon,
    deadline: Timer,
    personal: UserRound,
  };
  return icons[c] || Pin;
};

// NAV
const prevMonth = () => {
  currentMonth.value--;
  if (currentMonth.value < 0) {
    currentMonth.value = 11;
    currentYear.value--;
  }
  gridKey.value++;
};
const nextMonth = () => {
  currentMonth.value++;
  if (currentMonth.value > 11) {
    currentMonth.value = 0;
    currentYear.value++;
  }
  gridKey.value++;
};
const prevYear = () => {
  currentYear.value--;
  gridKey.value++;
};
const nextYear = () => {
  currentYear.value++;
  gridKey.value++;
};
const pickMonthFromModal = (i) => {
  currentMonth.value = i;
  showMonthYearModal.value = false;
  gridKey.value++;
};
const openMonthYearModal = () => {
  showMonthYearModal.value = true;
};

const goToday = () => {
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
  gridKey.value++;
};

// CRUD
const openDay = (day) => {
  selectedDate.value = day.date;
  const match = day.date.toISOString().split("T")[0];
  selectedDateEvents.value = events.value.filter(
    (ev) => ev.event_date === match
  );
  isEditMode.value = selectedDateEvents.value.length === 0;
  // reset newEvent
  newEvent.value = { id: null, title: "", desc: "", category: "" };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  isEditMode.value = false;
  selectedDateEvents.value = [];
};

const selectCategory = (c) => {
  newEvent.value.category = c;
};
const startEdit = (ev) => {
  newEvent.value = {
    id: ev.id,
    title: ev.title,
    desc: ev.description,
    category: ev.metadata?.category || "",
  };
  isEditMode.value = true;
};
const cancelEdit = () => {
  if (selectedDateEvents.value.length > 0) {
    isEditMode.value = false;
    newEvent.value = { id: null, title: "", desc: "", category: "" };
  } else closeModal();
};

const saveEvent = async () => {
  if (!newEvent.value.title || !newEvent.value.category)
    return alert("Judul & kategori harus diisi");
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return alert("User not signed in");
  const payload = {
    user_id: user.id,
    title: newEvent.value.title,
    description: newEvent.value.desc,
    event_date: selectedDate.value.toISOString().split("T")[0],
    metadata: { category: newEvent.value.category },
  };
  if (newEvent.value.id) {
    await supabase
      .from("events")
      .update({
        title: newEvent.value.title,
        description: newEvent.value.desc,
        metadata: { category: newEvent.value.category },
      })
      .eq("id", newEvent.value.id);
  } else {
    await supabase.from("events").insert(payload);
  }
  await fetchEvents();
  closeModal();
};

const deleteEvent = async (id) => {
  if (!confirm("Hapus event ini?")) return;
  await supabase.from("events").delete().eq("id", id);
  await fetchEvents();
};

onMounted(async () => {
  await getData(); // fetch API / DB
  emit("loaded");
});

// click-away for month picker - not needed anymore
// const onDocumentClick = (e) => {
//   const pickerEl = monthPickerRef.value;
//   const toggleEl = monthToggleRef.value;
//   if (!pickerEl || !toggleEl) return;
//   if (pickerEl.contains(e.target) || toggleEl.contains(e.target)) return;
//   showMonthPicker.value = false;
// };

// onMounted(() => {
//   document.addEventListener("click", onDocumentClick);
// });
// onBeforeUnmount(() => {
//   document.removeEventListener("click", onDocumentClick);
// });

// watchers: not needed anymore
// watch([currentMonth, currentYear], () => {
//   showMonthPicker.value = false;
// });
</script>

<style scoped>
.month-enter-active,
.month-leave-active {
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.month-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.month-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

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

.peer-placeholder-shown\:top-3 {
  top: 0.75rem;
}
.peer-placeholder-shown\:text-sm {
  font-size: 0.875rem;
}
</style>
