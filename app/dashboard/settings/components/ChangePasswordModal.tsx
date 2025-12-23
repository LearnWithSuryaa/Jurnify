import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, KeyRound } from "lucide-react";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string) => Promise<void>;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const [mounted, setMounted] = useState(false);
  const [passwords, setPasswords] = useState({
    new: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPasswords({ new: "", confirm: "" });
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (passwords.new.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    try {
      await onSave(passwords.new);
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
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 rounded-lg">
                <KeyRound className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Ganti Password</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition cursor-pointer"
            type="button"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-xl flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password Baru
            </label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              placeholder="Minimal 6 karakter"
              className="w-full border border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A70A9]/20 focus:border-[#4A70A9] transition"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Konfirmasi Password
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              placeholder="Ulangi password baru"
              className="w-full border border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A70A9]/20 focus:border-[#4A70A9] transition"
              required
              disabled={loading}
            />
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
                "Ubah Password"
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
