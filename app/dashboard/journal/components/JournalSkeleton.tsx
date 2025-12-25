import Skeleton from "../../../components/common/Skeleton";

export default function JournalSkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
          <Skeleton width={200} height={40} className="mb-2" />
          <Skeleton width={300} height={20} />
        </div>
        <Skeleton width={160} height={48} className="rounded-2xl" />
      </div>

      {/* JOURNAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className="bg-white/60 backdrop-blur-md border border-white/50 rounded-3xl p-6 shadow-sm flex flex-col h-[280px]"
          >
            {/* Top Bar (Mood + Date) */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton width={120} height={32} className="rounded-full" />
              <div className="flex gap-2">
                 <Skeleton width={32} height={32} className="rounded-lg" />
                 <Skeleton width={32} height={32} className="rounded-lg" />
              </div>
            </div>

            {/* Content */}
            <Skeleton width="80%" height={28} className="mb-3" />
            <Skeleton width="100%" height={16} className="mb-2" />
            <Skeleton width="90%" height={16} className="mb-2" />
            <Skeleton width="60%" height={16} className="mb-auto" />

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100/50 flex items-center gap-2">
               <Skeleton width={16} height={16} variant="circular" />
               <Skeleton width={100} height={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
