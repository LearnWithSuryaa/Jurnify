"use client";

import { useState } from "react";
import { Plus, Book, Trash2, Edit3, Calendar, Smile, Meh, Frown, Heart, Clock, AlignLeft, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useJournals, Journal } from "../../../hooks/useJournals";
import { createSupabaseClient } from "../../../lib/supabaseClient";
import JournalFormModal from "./components/JournalFormModal";

export default function JournalClient() {
  const { journals, mutate } = useJournals();
  const supabase = createSupabaseClient();

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<Partial<Journal> | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const openCreateModal = () => {
    setIsEditMode(false);
    setSelectedJournal(null);
    setShowModal(true);
  };

  const openEditModal = (journal: Journal) => {
    setIsEditMode(true);
    setSelectedJournal(journal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJournal(null);
  };

  const handleSave = async (data: Partial<Journal>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Login required");

    try {
      if (data.id) {
        // Update
        const { error } = await supabase
          .from("journals")
          .update({
            title: data.title,
            content: data.content,
            mood: data.mood,
          })
          .eq("id", data.id);
        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from("journals").insert({
          user_id: user.id,
          title: data.title,
          content: data.content,
          mood: data.mood,
        });
        if (error) throw error;
      }
      await mutate();
      closeModal();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus jurnal ini?")) return;
    try {
      const { error } = await supabase.from("journals").delete().eq("id", id);
      if (error) throw error;
      await mutate();
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Helper render mood icon
  const getMoodIcon = (mood: string) => {
    const iconProps = { className: "w-5 h-5" };
    switch (mood) {
      case 'happy': return <Smile {...iconProps} className="w-5 h-5 text-green-500" />;
      case 'sad': return <Frown {...iconProps} className="w-5 h-5 text-blue-500" />;
      case 'grateful': return <Heart {...iconProps} className="w-5 h-5 text-rose-500" />;
      case 'neutral': return <Meh {...iconProps} className="w-5 h-5 text-yellow-500" />;
      default: return <Book {...iconProps} className="w-5 h-5 text-slate-400" />;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#3b6a9e]/20 rounded-full blur-[100px] mix-blend-multiply animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000" />
      </div>

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
      >
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Journal
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Catat momen, ide, dan rasa syukurmu setiap hari.
          </p>
        </div>
        <button 
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#3B6A9E] to-[#5a8bc4] text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Tulis Jurnal</span>
        </button>
      </motion.div>

      {/* Content Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {journals.map((journal, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + (idx * 0.05) }}
            key={journal.id}
            className="group relative bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] flex flex-col h-full"
          >
            {/* Mood & Date */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 shadow-sm">
                <span className="flex items-center justify-center">{getMoodIcon(journal.mood)}</span>
                <span className="h-4 w-px bg-slate-300 mx-1" />
                <span className="text-xs">{formatDate(journal.created_at)}</span>
              </div>
              
              {/* Actions (visible on hover) */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openEditModal(journal)}
                  className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(journal.id)}
                  className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
              {journal.title}
            </h3>
            <p className="text-slate-600 line-clamp-4 text-sm leading-relaxed mb-4 flex-grow">
              {journal.content}
            </p>

            <div className="mt-auto pt-4 border-t border-slate-100/50 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5" title="Waktu dibuat">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{formatTime(journal.created_at)}</span>
                 </div>
                 <div className="flex items-center gap-1.5" title="Jumlah kata">
                    <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
                    <span>{journal.content ? journal.content.split(/\s+/).filter(Boolean).length : 0} kata</span>
                 </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); handleCopy(journal.content, journal.id); }}
                className="flex items-center gap-1.5 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors text-slate-400 hover:text-slate-700"
                title="Salin isi jurnal"
              >
                {copiedId === journal.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span className="text-green-600 font-medium">Disalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}

        {/* Empty State */}
        {journals.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-20 flex flex-col items-center justify-center text-center"
          >
             <div className="w-20 h-20 bg-blue-50/80 rounded-full flex items-center justify-center mb-6 shadow-sm">
              <Book className="w-10 h-10 text-[#3b6a9e]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Belum ada jurnal
            </h3>
            <p className="text-slate-600">
              Mulai hari ini dengan cerita pertamamu.
            </p>
          </motion.div>
        )}
      </motion.div>

      <JournalFormModal 
        isOpen={showModal}
        onClose={closeModal}
        onSave={handleSave}
        initialData={selectedJournal}
        isEditMode={isEditMode}
      />
    </motion.section>
  );
}
