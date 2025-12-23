import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, User } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    full_name: string;
    bio: string;
    email: string;
  };
  onSave: (data: { full_name: string; bio: string }) => Promise<void>;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  initialData,
  onSave,
}: EditProfileModalProps) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: initialData.full_name || "",
        bio: initialData.bio || "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800">Edit Profile</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="Nama Lengkap"
              className="w-full border border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A70A9]/20 focus:border-[#4A70A9] transition"
              disabled={loading}
              maxLength={120}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              placeholder="Bio"
              className="w-full border border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A70A9]/20 focus:border-[#4A70A9] transition resize-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              value={initialData.email}
              type="email"
              disabled
              className="w-full border border-slate-200 px-4 py-2 rounded-xl bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-xs text-slate-500 mt-1">
              Untuk mengubah email, gunakan tombol &quot;Ganti Email&quot; di halaman
              utama.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#4A70A9] hover:bg-[#345c99] text-white rounded-xl font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : (
                "Simpan Perubahan"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition cursor-pointer"
              disabled={loading}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
