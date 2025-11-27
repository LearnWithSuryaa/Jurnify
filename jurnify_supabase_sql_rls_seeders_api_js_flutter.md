# Jurnify — Supabase SQL, RLS, Seeders & API (JS + Flutter)

---

## 1) Skema Database (Postgres SQL)

```sql
-- Enable pgcrypto for gen_random_uuid (Supabase biasanya sudah ada)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Enum for task status
CREATE TYPE task_status AS ENUM ('pending', 'progress', 'success');

-- 2. Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status task_status NOT NULL DEFAULT 'pending',
  due_date DATE NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb, -- flexible field untuk tags, priority, dll
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Optional: index for fast lookups by user + date
CREATE INDEX IF NOT EXISTS idx_events_user_eventdate ON events (user_id, event_date);
CREATE INDEX IF NOT EXISTS idx_tasks_user_duedate ON tasks (user_id, due_date);

-- 5. Trigger function to update `updated_at`
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
```

---

## 2) Row Level Security (RLS) — Supabase

Aktifkan RLS pada kedua tabel dan buat policy yang mengizinkan user hanya mengakses datanya sendiri.

```sql
-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies for tasks
CREATE POLICY "Allow logged-in users to insert their tasks" ON tasks
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow owners to select their tasks" ON tasks
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Allow owners to update their tasks" ON tasks
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow owners to delete their tasks" ON tasks
  FOR DELETE
  USING (user_id = auth.uid());

-- Policies for events
CREATE POLICY "Allow logged-in users to insert their events" ON events
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow owners to select their events" ON events
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Allow owners to update their events" ON events
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow owners to delete their events" ON events
  FOR DELETE
  USING (user_id = auth.uid());
```

> Catatan: Supabase `auth.uid()` tersedia ketika request memakai JWT dari Supabase Auth.

---

## 3) Query-Query Penting (Siap dipakai di client)

### 3.1 Home — Events hari ini
```sql
SELECT id, title, description, start_time, end_time, metadata
FROM events
WHERE user_id = auth.uid()
  AND event_date = CURRENT_DATE
ORDER BY start_time NULLS LAST, created_at DESC;
```

### 3.2 Home — Semua task (urut by due_date) dengan status
```sql
SELECT id, title, description, status, due_date, metadata
FROM tasks
WHERE user_id = auth.uid()
ORDER BY due_date ASC, created_at DESC;
```

### 3.3 Task page — grouped by status (client grouping juga bisa)
```sql
SELECT id, title, description, status, due_date
FROM tasks
WHERE user_id = auth.uid()
ORDER BY
  CASE status
    WHEN 'pending' THEN 1
    WHEN 'progress' THEN 2
    WHEN 'success' THEN 3
  END, due_date;
```

### 3.4 Cek event pada tanggal tertentu
```sql
SELECT id, title, description, start_time, end_time
FROM events
WHERE user_id = auth.uid()
  AND event_date = $1; -- parameter tanggal
```

### 3.5 Cek apakah ada event pada tanggal tertentu (boolean)
```sql
SELECT EXISTS(
  SELECT 1 FROM events WHERE user_id = auth.uid() AND event_date = $1
) AS has_event;
```

### 3.6 Insert Task (server/client via supabase-js)
```sql
-- contoh SQL (biasanya lewat client libs)
INSERT INTO tasks (user_id, title, description, status, due_date)
VALUES (auth.uid(), 'Contoh tugas', 'Deskripsi...', 'pending', '2025-12-01');
```

### 3.7 Insert Event
```sql
INSERT INTO events (user_id, title, description, event_date, start_time, end_time)
VALUES (auth.uid(), 'Meeting', 'Discuss X', '2025-12-01', '10:00', '11:00');
```

---

## 4) Dummy Seeder (SQL)

> Gunakan ini di SQL editor Supabase. Untuk `user_id`, ganti dengan `auth.users.id` yang sesuai, atau jalankan sebagai superuser hanya untuk development.

```sql
-- contoh UUID untuk development (ganti dengan user nyata)
-- user A
SELECT gen_random_uuid() AS example_uuid; -- lihat hasil dan copy jika mau

INSERT INTO tasks (id, user_id, title, description, status, due_date)
VALUES
  ('e1111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', 'Belajar algoritma', 'Selesaikan bab 3', 'pending', CURRENT_DATE),
  ('e2222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', 'Buat presentasi', 'Slide 1-10', 'progress', CURRENT_DATE + INTERVAL '2 day'),
  ('e3333333-3333-4333-8333-333333333333', 'bbbbbbbb-bbbb-4bbb-bbbb-bbbbbbbbbbbb', 'Checkout restoran', 'Survei lokasi', 'success', CURRENT_DATE - INTERVAL '3 day');

INSERT INTO events (id, user_id, title, description, event_date, start_time, end_time)
VALUES
  ('f1111111-1111-4111-8111-111111111111', 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', 'Rapim', 'Rapat pimpinan', CURRENT_DATE, '09:00', '10:00'),
  ('f2222222-2222-4222-8222-222222222222', 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa', 'Deadline Proposal', 'Submit proposal', CURRENT_DATE + INTERVAL '5 day', NULL, NULL);
```

---

## 5) Supabase REST / PostgREST

Supabase menyediakan REST endpoint otomatis di `/rest/v1/`.

Contoh:
- `GET /rest/v1/tasks?user_id=eq.{user_uuid}` — ambil tasks user
- `GET /rest/v1/events?event_date=eq.2025-12-01` — ambil events pada tanggal

**Headers wajib:** `Authorization: Bearer <ACCESS_TOKEN>` dan `apikey: <anon-or-service-key>` tergantung kasus.


---

## 6) Example: supabase-js (JavaScript / Vue) — pola umum

```js
// install: npm i @supabase/supabase-js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseKey = process.env.VUE_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// 1. Ambil events hari ini
export async function fetchTodaysEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_date', new Date().toISOString().slice(0,10));
  if (error) throw error;
  return data;
}

// 2. Ambil tasks user
export async function fetchTasks() {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('due_date', { ascending: true });
  if (error) throw error;
  return data;
}

// 3. Tambah Task
export async function addTask({ title, description, due_date }) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ title, description, due_date }]);
  if (error) throw error;
  return data;
}

// 4. Tambah atau edit Event (edit bila id tersedia)
export async function upsertEvent(event) {
  if (event.id) {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', event.id);
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('events')
      .insert([event]);
    if (error) throw error;
    return data;
  }
}
```

> Catatan: jangan kirim `user_id` dari client; Supabase akan otomatis menambahkan `auth.uid()` pada policy check, sehingga kamu harus rely pada server-side to set user or rely on policies `WITH CHECK (user_id = auth.uid())` — jika ingin auto-set `user_id` dari client insert, client harus include `user_id: auth.user()?.id`. Sebagai praktik aman, biarkan backend/service function yang men-attach user_id.

---

## 7) Example: Flutter (Dart) — supabase_flutter

```dart
// pubspec: supabase_flutter: ^0.2.9 (cek versi terbaru saat implementasi)
import 'package:supabase_flutter/supabase_flutter.dart';

final supabase = Supabase.instance.client;

// 1. Ambil events hari ini
Future<List<Map<String, dynamic>>> fetchTodaysEvents() async {
  final dateStr = DateTime.now().toIso8601String().substring(0,10);
  final res = await supabase
    .from('events')
    .select()
    .eq('event_date', dateStr)
    .order('start_time');
  if (res.error != null) throw res.error!;
  return List<Map<String, dynamic>>.from(res.data);
}

// 2. Add Task
Future<void> addTask({required String title, String? description, required String dueDate}) async {
  final res = await supabase.from('tasks').insert({
    'title': title,
    'description': description,
    'due_date': dueDate,
  });
  if (res.error != null) throw res.error!;
}

// 3. Upsert Event
Future<void> upsertEvent(Map<String, dynamic> event) async {
  if (event.containsKey('id')) {
    final res = await supabase.from('events').update(event).eq('id', event['id']);
    if (res.error != null) throw res.error!;
  } else {
    final res = await supabase.from('events').insert(event);
    if (res.error != null) throw res.error!;
  }
}
```

> Catatan Flutter: Pastikan user sudah sign-in sehingga request membawa JWT.

---

## 8) UI / UX considerations & server-side helpers

- **Client grouping vs server grouping**: Ambil semua task dan group di client berdasarkan `status` untuk UI lebih responsif.
- **Conflict on event_date**: jika kamu ingin menampilkan pilihan "tambah" or "edit" saat tanggal sudah ada event, di client lakukan `SELECT EXISTS` atau ambil list events untuk tanggal tsb.
- **Recurring events**: jika butuh, buat tabel terpisah `recurring_events` atau kolom `recurrence` di `events.metadata`.
- **Notifications**: gunakan Supabase Edge Functions atau external cron untuk mengirim notifikasi/email.

---

## 9) Bonus: contoh Supabase Edge Function (pseudo)

Gunakan Edge Function untuk operasi sensitif (mis. selalu set user_id berdasarkan jwt). Berikut pseudocode ide:

```js
// Edge function: create-task.js (Node)
import { createClient } from '@supabase/supabase-js';
export default async (req, res) => {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const jwt = req.headers.authorization?.split('Bearer ')[1];
  const { title, description, due_date } = req.body;
  // decode jwt to get user id (or use supabase auth admin)
  const userId = decodeJwtAndGetSub(jwt);
  const { data, error } = await supabase.from('tasks').insert([{ user_id: userId, title, description, due_date }]);
  return res.json({ data, error });
}
```
