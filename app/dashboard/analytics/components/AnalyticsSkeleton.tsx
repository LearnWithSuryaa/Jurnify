import Skeleton from "../../../components/common/Skeleton";

export default function AnalyticsSkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton width={56} height={56} className="rounded-2xl" />
        <div>
          <Skeleton width={200} height={40} className="mb-2" />
          <Skeleton width={300} height={20} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm flex items-center gap-4">
            <Skeleton width={48} height={48} className="rounded-xl" />
            <div className="flex-1">
              <Skeleton width={120} height={16} className="mb-2" />
              <Skeleton width={80} height={32} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Trend Skeleton */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-slate-100 h-[400px]">
          <div className="mb-6">
            <Skeleton width={180} height={24} className="mb-2" />
            <Skeleton width={240} height={16} />
          </div>
          <div className="w-full h-72 flex items-end gap-2 px-4 pb-4">
             {/* Fake Bars/Line */}
             <Skeleton width="100%" height="100%" className="rounded-xl" />
          </div>
        </div>

        {/* Productivity Skeleton */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] shadow-sm border border-slate-100 h-[400px]">
          <div className="mb-6">
            <Skeleton width={160} height={24} className="mb-2" />
            <Skeleton width={200} height={16} />
          </div>
          <div className="w-full h-72 flex items-center justify-center">
             <Skeleton width={200} height={200} variant="circular" />
          </div>
        </div>
      </div>
    </section>
  );
}
