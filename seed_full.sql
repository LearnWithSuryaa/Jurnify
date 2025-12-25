-- SEED DATA FOR JOURNALS (FULL MONTH)
INSERT INTO public.journals (user_id, title, content, mood, created_at) VALUES
-- MINGGU 1 (Terbaru)
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Semangat Pagi!', 'Hari ini saya bangun pagi dengan energi penuh. Siap menaklukkan semua tugas!', 'happy', NOW()),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Sedikit lelah di sore hari', 'Meeting berturut-turut membuatku cukup lelah, tapi senang project A selesai.', 'neutral', NOW() - INTERVAL '6 hours'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Refleksi Diri', 'Kemarin adalah hari yang berat, banyak ekspektasi yang tidak terpenuhi.', 'sad', NOW() - INTERVAL '1 day'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Bersyukur atas Keluarga', 'Makan malam bersama keluarga membuat semua beban hilang.', 'grateful', NOW() - INTERVAL '1 day 4 hours'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Project Baru', 'Sangat antusias memulai inisiatif baru di kantor.', 'happy', NOW() - INTERVAL '2 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Hujan Sepanjang Hari', 'Cuaca mendung membuat mood agak mellow. Menghabiskan waktu dengan membaca buku.', 'neutral', NOW() - INTERVAL '3 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Mencoba Resep Baru', 'Masak nasi goreng spesial untuk makan malam. Rasanya lumayan!', 'happy', NOW() - INTERVAL '3 days 5 hours'),

-- MINGGU 2
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Kecewa dengan Hasil', 'Sudah berusaha keras tapi hasilnya belum maksimal. Perlu evaluasi lagi.', 'sad', NOW() - INTERVAL '4 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Olaraga Pagi', 'Berhasil lari 5km hari ini! Rasanya luar biasa.', 'happy', NOW() - INTERVAL '5 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Belajar Hal Baru', 'Mempelajari React Server Components, sangat menantang tapi seru.', 'happy', NOW() - INTERVAL '5 days 5 hours'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Ketenangan', 'Meditasi pagi sangat membantu menjernihkan pikiran.', 'grateful', NOW() - INTERVAL '6 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Bingung Menentukan Pilihan', 'Ada dua tawaran menarik, sulit untuk memilih salah satunya.', 'neutral', NOW() - INTERVAL '7 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Film Bagus', 'Nonton film Interstellar lagi, masih merinding.', 'happy', NOW() - INTERVAL '8 days'),

-- MINGGU 3
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Reuni Teman Lama', 'Bertemu teman SMA, bernostalgia masa-masa indah.', 'happy', NOW() - INTERVAL '10 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Deadline Menumpuk', 'Stres berat hari ini karena banyak deadline yang berdekatan.', 'sad', NOW() - INTERVAL '11 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Kehilangan Dompet', 'Sial sekali hari ini, dompet tertinggal di taksi.', 'sad', NOW() - INTERVAL '12 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Membantu Orang Asing', 'Merasakan kepuasan batin setelah membantu turis yang tersesat.', 'grateful', NOW() - INTERVAL '13 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Awal Bulan yang Baik', 'Menyusun rencana bulan ini dengan optimis.', 'happy', NOW() - INTERVAL '14 days'),

-- MINGGU 4 (Agar grafik lebih panjang)
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Liburan Singkat', 'Pergi ke pantai sebentar untuk melepas penat.', 'grateful', NOW() - INTERVAL '16 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Sakit Flu', 'Badan rasanya tidak enak semua, harus istirahat total.', 'sad', NOW() - INTERVAL '18 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Sembuh', 'Akhirnya bisa beraktivitas normal lagi setelah 2 hari bed rest.', 'grateful', NOW() - INTERVAL '20 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Presentasi Sukses', 'Berhasil meyakinkan klien untuk deal projek besar!', 'happy', NOW() - INTERVAL '22 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Macet Total', 'Jakarta macetnya nggak wajar hari ini. Capek di jalan.', 'sad', NOW() - INTERVAL '24 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Gaji Masuk', 'Waktunya belanja kebutuhan bulanan dan menabung.', 'happy', NOW() - INTERVAL '25 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Biasa Saja', 'Hari yang standar, rutinitas kerja - pulang - tidur.', 'neutral', NOW() - INTERVAL '28 days');

-- SEED DATA FOR TASKS (Agar chart Tasks Productivity tidak kosong)
INSERT INTO public.tasks (user_id, title, description, status, due_date, created_at) VALUES
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Selesaikan Laporan Bulanan', 'Laporan keuangan dan performa tim', 'completed', NOW() + INTERVAL '2 days', NOW()),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Redesain Halaman Login', 'Update UI sesuai style guide baru', 'in_progress', NOW() + INTERVAL '5 days', NOW()),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Fix Bug di Safari', 'Layout berantakan di browser Safari mobile', 'pending', NOW() + INTERVAL '1 day', NOW()),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Meeting dengan Client B', 'Diskusi requirement fase 2', 'completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '5 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Daftar Gym', 'Mulai hidup sehat tahun ini', 'cancelled', NOW() - INTERVAL '10 days', NOW() - INTERVAL '15 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Belajar TypeScript', 'Ikut course online advanced TS', 'in_progress', NOW() + INTERVAL '1 month', NOW() - INTERVAL '2 days'),
('de69806e-ddb5-4fd8-86b9-eb784d99a448', 'Beli Kado Ulang Tahun', 'Untuk adik, budget 500rb', 'pending', NOW() + INTERVAL '1 week', NOW());
