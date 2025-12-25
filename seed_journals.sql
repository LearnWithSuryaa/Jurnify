-- SEED DATA FOR JOURNALS
-- PENTING: Ganti 'YOUR_USER_UUID_HERE' dengan UUID user Anda yang sebenarnya.
-- Anda bisa mendapatkannya di tabel auth.users atau via dashboard Supabase.

INSERT INTO public.journals (user_id, title, content, mood, created_at) VALUES
-- Hari ini
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Semangat Pagi!', 'Hari ini saya bangun pagi dengan energi penuh. Siap menaklukkan semua tugas!', 'happy', NOW()),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Sedikit lelah di sore hari', 'Meeting berturut-turut membuatku cukup lelah, tapi senang project A selesai.', 'neutral', NOW() - INTERVAL '6 hours'),

-- Kemarin
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Refleksi Diri', 'Kemarin adalah hari yang berat, banyak ekspektasi yang tidak terpenuhi.', 'sad', NOW() - INTERVAL '1 day'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Bersyukur atas Keluarga', 'Makan malam bersama keluarga membuat semua beban hilang.', 'grateful', NOW() - INTERVAL '1 day 4 hours'),

-- 2 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Project Baru', 'Sangat antusias memulai inisiatif baru di kantor.', 'happy', NOW() - INTERVAL '2 days'),

-- 3 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Hujan Sepanjang Hari', 'Cuaca mendung membuat mood agak mellow. Menghabiskan waktu dengan membaca buku.', 'neutral', NOW() - INTERVAL '3 days'),

-- 4 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Kecewa dengan Hasil', 'Sudah berusaha keras tapi hasilnya belum maksimal. Perlu evaluasi lagi.', 'sad', NOW() - INTERVAL '4 days'),

-- 5 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Olaraga Pagi', 'Berhasil lari 5km hari ini! Rasanya luar biasa.', 'happy', NOW() - INTERVAL '5 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Belajar Hal Baru', 'Mempelajari React Server Components, sangat menantang tapi seru.', 'happy', NOW() - INTERVAL '5 days 5 hours'),

-- 6 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Ketenangan', 'Meditasi pagi sangat membantu menjernihkan pikiran.', 'grateful', NOW() - INTERVAL '6 days'),

-- 7 Hari lalu (Seminggu yang lalu)
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Bingung Menentukan Pilihan', 'Ada dua tawaran menarik, sulit untuk memilih salah satunya.', 'neutral', NOW() - INTERVAL '7 days'),

-- 10 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Reuni Teman Lama', 'Bertemu teman SMA, bernostalgia masa-masa indah.', 'happy', NOW() - INTERVAL '10 days'),

-- 12 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Kehilangan Dompet', 'Sial sekali hari ini, dompet tertinggal di taksi.', 'sad', NOW() - INTERVAL '12 days'),

-- 13 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Membantu Orang Asing', 'Merasakan kepuasan batin setelah membantu turis yang tersesat.', 'grateful', NOW() - INTERVAL '13 days'),

-- 14 Hari lalu
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Awal Bulan yang Baik', 'Menyusun rencana bulan ini dengan optimis.', 'happy', NOW() - INTERVAL '14 days');
