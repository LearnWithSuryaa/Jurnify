import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Mail, AlertTriangle } from "lucide-react";

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (email: string) => Promise<void>;
}

export default function ChangeEmailModal({
  isOpen,
  onClose,
  onSave,
}: ChangeEmailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setNewEmail("");
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    
    setLoading(true);
    try {
      await onSave(newEmail);
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
            <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-[#4A70A9]" />
            </div>
            <h3 className="font-bold text-lg text-slate-800">Ganti Email</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition"
            type="button"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-blue-50/50 p-3 rounded-lg flex gap-3 items-start border border-blue-100">
            <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Setelah mengganti email, tautan verifikasi akan dikirim ke email
              baru (dan mungkin email lama). Anda harus memverifikasi email baru
              sebelum perubahan diterapkan sepenuhnya.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Baru
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="contoh@email.com"
              className="w-full border border-slate-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A70A9]/20 focus:border-[#4A70A9] transition"
              required
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-[#4A70A9] hover:bg-[#345c99] text-white rounded-xl font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Mengirim...
                </span>
              ) : (
                "Ganti Email"
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium transition"
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
