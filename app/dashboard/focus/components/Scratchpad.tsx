import { useState, useEffect, useRef } from "react";
import { PenLine, Loader2, Bold, Italic, List, CheckSquare, Clock } from "lucide-react";
import { createSupabaseClient } from "../../../../lib/supabaseClient";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import { useTimer } from "../../context/TimerContext";

interface ScratchpadProps {
  selectedTaskId: string | null;
}

export default function Scratchpad({ selectedTaskId }: ScratchpadProps) {
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createSupabaseClient();
  const isLoadedRef = useRef(false);
  const { isRunning, timeLeft, formatTime } = useTimer();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: ({ editor }) => {
            return selectedTaskId ? "Catatan khusus untuk tugas ini..." : "Tulis ide kilat di sini...";
        },
      }),
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-sm prose-slate max-w-none focus:outline-none min-h-[150px]',
        },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
       handleSave(editor.getHTML());
    },
  });

  // Load content when selectedTaskId changes
  useEffect(() => {
    isLoadedRef.current = false;
    if (editor) {
        editor.commands.setContent(""); // Clear first
    }

    async function loadNotes() {
      let loadedContent = "";
      if (!selectedTaskId) {
        // Load from LocalStorage
        loadedContent = localStorage.getItem("focus_scratchpad_html") || "";
      } else {
        // Load from Database
        try {
            const { data, error } = await supabase
                .from("tasks")
                .select("notes")
                .eq("id", selectedTaskId)
                .single();
            
            if (data && !error) {
                loadedContent = data.notes || "";
            }
        } catch (error) {
            console.error("Error loading task notes:", error);
        }
      }

      if (editor) {
          editor.commands.setContent(loadedContent);
          isLoadedRef.current = true;
      }
    }

    loadNotes();
  }, [selectedTaskId, editor]);

  // Debounced Save Function
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSave = (htmlContent: string) => {
    if (!isLoadedRef.current) return;

    setIsSaving(true);
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      if (!selectedTaskId) {
        // Save to LocalStorage
        localStorage.setItem("focus_scratchpad_html", htmlContent);
        setIsSaving(false);
      } else {
        // Save to Database
        try {
            await supabase
                .from("tasks")
                .update({ notes: htmlContent })
                .eq("id", selectedTaskId);
        } catch (error) {
            console.error("Error saving task notes:", error);
        } finally {
            setIsSaving(false);
        }
      }
    }, 1000); 
  };

  const insertTime = () => {
    if (!editor) return;
    
    let timeStr = "";
    
    if (isRunning) {
        // Smart Context: Use Timer Countdown if running
        timeStr = ` <strong>${formatTime(timeLeft)}</strong> `;
    } else {
        // Fallback: Use Local Time
        const now = new Date();
        const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        timeStr = ` ${formattedTime} `;
    }

    editor.chain().focus().insertContent(timeStr).run();
  };

  if (!editor) {
    return null; 
  }

  return (
    <div className="w-full h-full bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 p-5 overflow-hidden flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      
      {/* Header & Tools */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <PenLine className={`w-4 h-4 ${selectedTaskId ? "text-emerald-600" : "text-amber-500"}`} />
            <span className="tracking-tight">{selectedTaskId ? "Task Draft" : "Quick Notes"}</span>
        </h3>

        {/* Toolbar */}
        <div className="flex bg-slate-100/50 rounded-lg p-1 gap-1 items-center border border-slate-200/50">
            
            <button 
                onClick={() => editor.chain().focus().toggleBold().run()} 
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-1.5 rounded-md transition-all duration-200 ${editor.isActive('bold') ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/60 text-slate-500 hover:text-slate-700'}`} 
                title="Bold"
            >
                <Bold className="w-3.5 h-3.5" />
            </button>
            <button 
                onClick={() => editor.chain().focus().toggleItalic().run()} 
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded-md transition-all duration-200 ${editor.isActive('italic') ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/60 text-slate-500 hover:text-slate-700'}`} 
                title="Italic"
            >
                <Italic className="w-3.5 h-3.5" />
            </button>
            
            <div className="w-px h-4 bg-slate-200 mx-0.5" />
            
            <button 
                onClick={() => editor.chain().focus().toggleBulletList().run()} 
                className={`p-1.5 rounded-md transition-all duration-200 ${editor.isActive('bulletList') ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/60 text-slate-500 hover:text-slate-700'}`} 
                title="Bullet List"
            >
                <List className="w-3.5 h-3.5" />
            </button>
            <button 
                onClick={() => editor.chain().focus().toggleTaskList().run()} 
                className={`p-1.5 rounded-md transition-all duration-200 ${editor.isActive('taskList') ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/60 text-slate-500 hover:text-slate-700'}`} 
                title="Task List"
            >
                <CheckSquare className="w-3.5 h-3.5" />
            </button>
            
            <div className="w-px h-4 bg-slate-200 mx-0.5" />

            <button 
                onClick={insertTime} 
                className="p-1.5 hover:bg-white/60 rounded-md text-slate-500 hover:text-slate-700 transition-all duration-200" 
                title={isRunning ? "Insert Timer" : "Insert Local Time"}
            >
                <Clock className="w-3.5 h-3.5" />
            </button>

        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden bg-white/40 rounded-2xl border border-white/50 shadow-inner p-0 cursor-text group" onClick={() => editor.chain().focus().run()}>
         <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-5">
             <EditorContent editor={editor} />
         </div>

         {/* Auto-save status */}
         <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[10px] text-slate-400 font-medium pointer-events-none bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm border border-slate-100 z-10 transition-opacity duration-300">
            {isSaving ? (
                <>
                    <Loader2 className="w-2.5 h-2.5 animate-spin text-indigo-500" />
                    <span className="text-indigo-500">Saving...</span>
                </>
            ) : (
                <span className="opacity-60">Synced</span>
            )}
         </div>
      </div>
       
       {/* Global styles override for Tiptap specifically in this component */}
      <style jsx global>{`
        /* Fix List Styling */
        .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.2rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }
        .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.2rem;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .ProseMirror ul[data-type="taskList"] {
            list-style: none;
            padding: 0;
            margin-top: 0.5rem;
        }
        .ProseMirror ul[data-type="taskList"] li {
            display: flex;
            gap: 0.6rem;
            align-items: flex-start;
            margin-bottom: 0.4rem;
        }
        .ProseMirror ul[data-type="taskList"] li > label {
            flex: 0 0 auto;
            margin-right: 0;
            user-select: none;
            cursor: pointer;
            margin-top: 0.15rem;
        }
        .ProseMirror ul[data-type="taskList"] li > div {
            flex: 1 1 auto;
        }
        /* Remove default p margins inside task list to align with checkbox */
        .ProseMirror ul[data-type="taskList"] li > div > p {
            margin-top: 0;
            margin-bottom: 0;
        }

         /* Checkbox styling */
        .ProseMirror input[type="checkbox"] {
            appearance: none;
            background-color: #fff;
            margin: 0;
            font: inherit;
            color: currentColor;
            width: 1.1em;
            height: 1.1em;
            border: 1.5px solid #cbd5e1;
            border-radius: 0.35em;
            display: grid;
            place-content: center;
            transition: all 0.2s ease;
            cursor: pointer;
        }
        
        .ProseMirror input[type="checkbox"]::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em #fff;
            transform-origin: center;
            clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }
        
        .ProseMirror input[type="checkbox"]:checked {
            background-color: #10b981;
            border-color: #10b981;
        }
        
        .ProseMirror input[type="checkbox"]:checked::before {
            transform: scale(1);
        }

        /* Placeholder styling */
        .ProseMirror p.is-editor-empty:first-child::before {
            color: #94a3b8;
            content: attr(data-placeholder);
            float: left;
            height: 0;
            pointer-events: none;
        }

        /* Prose overrides for cleaner look */
        .ProseMirror {
            outline: none;
        }
        .ProseMirror p {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
            line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
