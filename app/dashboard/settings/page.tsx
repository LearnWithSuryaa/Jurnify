"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, Lock, Mail, Copy, Camera } from "lucide-react";
import { createSupabaseClient } from "../../../lib/supabaseClient";
import EditProfileModal from "./components/EditProfileModal";
import ChangeEmailModal from "./components/ChangeEmailModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import SettingsSkeleton from "./components/SettingsSkeleton";

export default function Settings() {
  const router = useRouter();
  const supabase = createSupabaseClient();

  // STATE
  const [user, setUser] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [profile, setProfile] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalEvents: 0,
    completedTasks: 0,
  });
  
  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // MODALS
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace("/login");
          return;
        }
        setUser(user);

        // Fetch Profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        setProfile(profile);


        // However, standard Supabase count is efficient if we use 'count' option.
        // But here we need to filter tasks by status 'completed'.
        // Let's do a more efficient separate count query for completed tasks.
        
        const { count: totalTasks } = await supabase
            .from("tasks")
            .select("*", { count: "exact", head: true });

        const { count: completedTasks } = await supabase
            .from("tasks")
            .select("*", { count: "exact", head: true })
            .eq("status", "completed");

        const { count: totalEvents } = await supabase
            .from("events")
            .select("*", { count: "exact", head: true });

        setStats({
            totalTasks: totalTasks || 0,
            totalEvents: totalEvents || 0,
            completedTasks: completedTasks || 0
        });

      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  // HANDLERS
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setAvatarUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;

      // Upload
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      // Update Profile
      const { error: updateError } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            avatar_url: publicUrl,
            updated_at: new Date().toISOString()
        });
        
      if (updateError) throw updateError;

      // Update local state
      setProfile({ ...profile, avatar_url: publicUrl });
      alert("Avatar berhasil diperbarui!");

    } catch (error) {
      console.error("Avatar upload error:", error);
      alert("Gagal mengupload avatar");
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleUpdateProfile = async (data: { full_name: string; bio: string }) => {
    if (!user) return;
    
    const { error } = await supabase
        .from("profiles")
        .upsert({
            id: user.id,
            ...data,
            updated_at: new Date().toISOString()
        });

    if (error) {
        alert("Gagal memperbarui profil");
        throw error;
    }

    setProfile({ ...profile, ...data });
    alert("Profil berhasil diperbarui!");
  };

  const handleUpdateEmail = async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email });
    if (error) {
        alert("Gagal mengirim permintaan ganti email: " + error.message);
        throw error;
    }
    alert("Cek email baru Anda untuk verifikasi!");
  };

  const handleUpdatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
        alert("Gagal mengganti password: " + error.message);
        throw error;
    }
    alert("Password berhasil diubah!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const copyEmail = () => {
    if (user?.email) {
        navigator.clipboard.writeText(user.email);
        alert("Email disalin!");
    }
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2">
          Settings
        </h1>
        <p className="text-slate-600 text-lg">Kelola preferensi dan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          
          {/* PROFILE CARD */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden group">
            <div className="relative w-28 h-28 mx-auto mb-4 group/avatar">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md bg-slate-100"
                  alt="Avatar"
                />
              ) : (
                <div className="w-28 h-28 bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-full flex items-center justify-center border-4 border-white shadow-md text-white">
                  <User size={48} />
                </div>
              )}

              {/* Avatar Overlay */}
              <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover/avatar:opacity-100 cursor-pointer transition-all duration-200">
                <Camera className="w-8 h-8 text-white/90" />
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={avatarUploading}
                />
              </label>

              {avatarUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 z-10">
                    <div className="p-2 bg-white/20 rounded-full animate-spin border-2 border-white/50 border-t-white"></div>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-800">
              {profile?.full_name || user?.email?.split('@')[0]}
            </h3>
            
            {profile?.bio ? (
                <p className="text-sm text-slate-600 italic mb-6 line-clamp-2 px-4">
                    &quot;{profile.bio}&quot;
                </p>
            ) : (
                <p className="text-sm text-slate-400 mb-6 italic">Belum ada bio</p>
            )}

            <button
              onClick={() => setShowEditProfile(true)}
              className="w-full py-2.5 bg-[#4A70A9] hover:bg-[#3b5d8f] text-white rounded-xl font-semibold transition shadow-sm active:scale-[0.98] cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          {/* STATS CARD */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#4A70A9] rounded-full"></span>
                Statistik Akun
            </h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl">
                    <span className="text-slate-600 text-sm">Total Tasks</span>
                    <strong className="text-slate-900">{stats.totalTasks}</strong>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50/80 rounded-xl">
                    <span className="text-slate-600 text-sm">Total Events</span>
                    <strong className="text-slate-900">{stats.totalEvents}</strong>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50/80 rounded-xl">
                    <span className="text-green-700 text-sm font-medium">Completed</span>
                    <strong className="text-green-700">{stats.completedTasks}</strong>
                </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-slate-400 rounded-full"></span>
                Keamanan & Akun
            </h3>

            {/* Change Password */}
            <div 
                onClick={() => setShowChangePassword(true)}
                className="group border border-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-50/80 hover:border-slate-200 transition flex items-center justify-between"
            >
                <div>
                    <strong className="text-slate-800 group-hover:text-[#4A70A9] transition">Ganti Password</strong>
                    <p className="text-sm text-slate-500">Ubah password akun demi keamanan</p>
                </div>
                <Lock className="w-5 h-5 text-slate-300 group-hover:text-[#4A70A9] transition" />
            </div>

            {/* Email Section */}
            <div className="border border-slate-100 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#4A70A9] rounded-full">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <strong className="text-slate-800 block">Email</strong>
                        <p className="text-sm text-slate-500 flex items-center gap-2">
                            {user?.email}
                            <button onClick={copyEmail} className="p-1 hover:bg-slate-100 rounded-md transition text-slate-400 hover:text-slate-600 cursor-pointer" title="Salin">
                                <Copy className="w-3 h-3" />
                            </button>
                        </p>
                    </div>
                </div>

                <button
                  onClick={() => setShowChangeEmail(true)}
                  className="px-4 py-2 border border-slate-200 hover:border-[#4A70A9] hover:text-[#4A70A9] rounded-xl text-sm font-medium transition bg-white cursor-pointer"
                >
                  Ganti Email
                </button>
              </div>
            </div>
          </div>

          {/* LOGOUT */}
          <div
            className="bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl p-6 text-white flex items-center justify-between shadow-lg shadow-[#4A70A9]/20"
          >
            <div>
              <h3 className="font-bold text-lg">Keluar dari Akun</h3>
              <p className="text-sm opacity-90 text-blue-50">Logout dari sesi aplikasi saat ini</p>
            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initialData={{
            full_name: profile?.full_name || "",
            bio: profile?.bio || "",
            email: user?.email || ""
        }}
        onSave={handleUpdateProfile}
      />

      <ChangeEmailModal
        isOpen={showChangeEmail}
        onClose={() => setShowChangeEmail(false)}
        onSave={handleUpdateEmail}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSave={handleUpdatePassword}
      />

    </section>
  );
}
