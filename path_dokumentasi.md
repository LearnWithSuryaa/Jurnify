# 📘 **Routing & Path Documentation – Jurnify App (Next.js App Router)**

Versi: **Stabil · Lengkap · AI-Friendly**

Dokumentasi ini menggambarkan seluruh struktur path yang digunakan oleh aplikasi Jurnify. Setiap path dikategorikan berdasarkan fitur, fungsi, dan letak file dalam struktur folder Next.js App Router (`app/`).

---

# 🏛 **1. Global Routing Structure**

```
app/
 ├─ layout.tsx                → Global layout
 ├─ page.tsx                  → Landing page (/)
 ├─ login/
 │   └─ page.tsx              → /login
 ├─ dashboard/
 │   ├─ layout.tsx            → Layout khusus dashboard
 │   ├─ page.tsx              → /dashboard  (Home)
 │   ├─ journey/
 │   │    └─ page.tsx         → /dashboard/journey
 │   ├─ event/
 │   │    └─ page.tsx         → /dashboard/event
 │   └─ settings/
 │        └─ page.tsx         → /dashboard/settings
 ├─ api/
 │   └─ ...                   → API Routes (server-side)
 └─ (asset files)
```

---

# 🧭 **2. Path List (Complete)**

## **2.1 Public Routes**

| Path     | Deskripsi            | Akses  |
| -------- | -------------------- | ------ |
| `/`      | Landing page utama   | Publik |
| `/login` | Halaman Auth (login) | Publik |

---

## **2.2 Protected Routes (Dashboard Area)**

Semua path ini **wajib login**, dan dilindungi oleh middleware/proxy.

| Path                  | File                          | Deskripsi                       |
| --------------------- | ----------------------------- | ------------------------------- |
| `/dashboard`          | `dashboard/page.tsx`          | Home Dashboard ✨                |
| `/dashboard/journey`  | `dashboard/journey/page.tsx`  | Fitur manajemen tugas (Journey) |
| `/dashboard/event`    | `dashboard/event/page.tsx`    | Fitur menambah Event/Kegiatan   |
| `/dashboard/settings` | `dashboard/settings/page.tsx` | Pengaturan akun                 |

---

# 🧱 **3. Path Semantik Aplikasi**

Dokumentasi semantik agar AI lain memahami konteks setiap halaman.

### **Home Dashboard – `/dashboard`**

* Menampilkan ringkasan aktivitas pengguna
* Entry point utama setelah login

### **Journey – `/dashboard/journey`**

* Modul untuk tugas/aktivitas jangka panjang
* Mendukung Create / Update / List Task

### **Event – `/dashboard/event`**

* Modul penjadwalan event / kegiatan
* Tempat pengguna membuat event baru

### **Settings – `/dashboard/settings`**

* Manajemen akun
* Preferensi aplikasi

---

# ⚙️ **4. Sidebar Active State Rules**

Untuk sidebar, path aktif dihitung berdasarkan:

```ts
isActive(path) {
  return pathname === path || pathname.startsWith(path + "/");
}
```

Penjelasan AI-friendly:

* Path dianggap aktif jika **sama persis** dengan halaman saat ini.
* Path juga aktif jika halaman berada **di dalam sub-folder path tersebut**.
* Pengecualian khusus: `/` hanya aktif bila `pathname === "/"`.

---

# 🔐 **5. Auth Protection (Proxy/Middleware Documentation)**

Semua path yang dimulai dengan:

```
/dashboard
```

dibatasi dengan aturan:

* Jika **tidak ada session** → redirect ke `/login`
* Jika sudah login dan mengakses `/login` → redirect ke `/dashboard`

Aturan ini terdefinisi melalui:

```ts
matcher: ["/dashboard/:path*", "/login"]
```

---

# 🔌 **6. API Route Structure**

Semua komunikasi Supabase disarankan melalui:

```
/api/dashboard/... 
/api/journey/...  
/api/event/...    
```

Karakteristik:

* Server-side optimized
* Terima request dari client
* Menggunakan caching di server
* Mengurangi request langsung ke Supabase

---

# 🧩 **7. Future-Proof Routing Guidelines (AI Guide)**

Untuk pengembangan ke depan:

* Seluruh modul baru sebaiknya mengikuti format:

  ```
  /dashboard/<module>
  ```
* Jangan buat nested lebih dari 1 tingkat kecuali dibutuhkan:

  ```
  /dashboard/<module>/<id>    ← valid
  /dashboard/<module>/<id>/<extra> ← hindari jika tidak perlu
  ```
* Semua halaman dalam dashboard harus berada dalam:

  ```
  app/dashboard/
  ```

---

# 🎯 **8. Short Summary That Another AI Can Parse**

```
ROOT ROUTES:
  /                 → Public Landing
  /login            → Auth

DASHBOARD (PROTECTED):
  /dashboard               → Dashboard Home
  /dashboard/journey       → Tasks (Journey module)
  /dashboard/event         → Events module
  /dashboard/settings      → User settings

RULES:
  - /dashboard/* requires authenticated session
  - /login redirects to /dashboard if already authenticated
  - Active menu state uses exact match + startsWith logic
```

---

# ☑️ Dokumen ini sudah lengkap

Jika kamu mau, aku bisa:

* membuat versi README.md
* membuat versi Notion template
* membuat arsitektur folder yang lengkap (feature-based / modular)
* membuat flow diagram (ASCII / SVG)
* menambahkan struktur API lengkap
* atau menyesuaikan dengan style enterprise

Mau dilanjutkan ke mana?
