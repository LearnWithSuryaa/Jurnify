"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Smile, Meh, Frown, Heart } from "lucide-react";
import { Journal } from "../../../../hooks/useJournals";

interface JournalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Journal>) => Promise<void>;
  initialData?: Partial<Journal> | null;
  isEditMode: boolean;
}

export default function JournalFormModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditMode,
}: JournalFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("happy");

  useEffect(() => {
    if (isOpen) {
      if (initialData && isEditMode) {
        setTitle(initialData.title || "");
        setContent(initialData.content || "");
        setMood(initialData.mood || "happy");
      } else {
        setTitle("");
        setContent("");
        setMood("happy");
      }
    }
  }, [isOpen, initialData, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await onSave({
        ...(isEditMode && initialData ? { id: initialData.id } : {}),
        title,
        content,
        mood,
      });
    } catch {
      // Error handled by parent
      setLoading(false);
    } finally {
      // Parent should close, but if not we stop loading
    }
  };

  const moods = [
    { id: "happy", icon: Smile, label: "Senang", color: "text-green-500 bg-green-50 border-green-200" },
    { id: "neutral", icon: Meh, label: "Biasa", color: "text-yellow-500 bg-yellow-50 border-yellow-200" },
    { id: "sad", icon: Frown, label: "Sedih", color: "text-blue-500 bg-blue-50 border-blue-200" },
    { id: "grateful", icon: Heart, label: "Bersyukur", color: "text-rose-500 bg-rose-50 border-rose-200" },
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/50"
            >
              <div className="bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] px-6 py-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {isEditMode ? <Save className="w-5 h-5" /> : <Smile className="w-5 h-5" />}
                  {isEditMode ? "Edit Jurnal" : "Tulis Jurnal Baru"}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                
                {/* Mood Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bagaimana perasaanmu?
                  </label>
                  <div className="flex gap-3">
                    {moods.map((m) => {
                      const Icon = m.icon;
                      const isSelected = mood === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setMood(m.id)}
                          className={`
                            flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all cursor-pointer
                            ${isSelected ? m.color + " border-current shadow-sm scale-105" : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-200"}
                          `}
                        >
                          <Icon className={`w-8 h-8 ${isSelected ? "scale-110" : ""}`} />
                          <span className="text-xs font-medium">{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Cerita
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Hari yang menyenangkan di taman..."
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#3b6a9e] focus:bg-white focus:ring-2 focus:ring-[#3b6a9e]/20 outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Content Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Isi Jurnal
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan semua pikiran dan perasaanmu di sini..."
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#3b6a9e] focus:bg-white focus:ring-2 focus:ring-[#3b6a9e]/20 outline-none transition-all placeholder:text-gray-400 min-h-[150px] resize-none"
                    required
                  />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white font-bold shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Simpan
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
