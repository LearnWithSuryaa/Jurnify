import Skeleton from "../../../components/common/Skeleton";

export default function EventSkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton width={180} height={36} />
          <Skeleton width={250} height={20} />
        </div>
        <div className="flex items-center gap-3">
            <Skeleton width={80} height={40} />
            <Skeleton width={140} height={40} />
            <div className="flex gap-1">
                <Skeleton width={40} height={40} />
                <Skeleton width={40} height={40} />
            </div>
        </div>
      </div>

      {/* SUMMARY BAR */}
      <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm p-3 rounded-2xl shadow-sm mb-6">
        <div className="flex gap-3">
            <Skeleton width={120} height={20} />
            <Skeleton width={40} height={20} />
        </div>
        <div className="flex gap-3">
            {[1, 2, 3].map(i => <Skeleton key={i} width={80} height={24} variant="circular" />)}
        </div>
      </div>

      {/* DAYS GRID */}
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="rounded-2xl h-32 p-3 bg-white/40 border border-white/50 backdrop-blur-md shadow-sm">
             <div className="flex justify-between mb-2">
                <Skeleton width={24} height={24} variant="circular" />
             </div>
             <div className="space-y-2">
                <Skeleton width="90%" height={16} />
                <Skeleton width="60%" height={16} />
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
