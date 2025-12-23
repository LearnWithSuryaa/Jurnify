import Skeleton from "../../../components/common/Skeleton";

export default function JourneySkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-4 overflow-x-hidden">
      {/* HEADER */}
      <div className="px-6 md:px-12 lg:px-16 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton width={200} height={40} className="mb-2" />
          <Skeleton width={300} height={20} />
        </div>
        <div className="flex gap-3">
            <Skeleton width={100} height={44} />
            <Skeleton width={140} height={44} />
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="px-6 md:px-12 lg:px-16 pb-12 overflow-x-auto">
        <div className="flex gap-6 min-w-[1000px]">
          {[1, 2, 3, 4].map((col) => (
            <div key={col} className="flex-1 min-w-[280px]">
              {/* Column Header */}
              <div className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Skeleton width={24} height={24} variant="circular" />
                    <Skeleton width={80} height={20} />
                </div>
                <Skeleton width={20} height={20} variant="circular" />
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {[1, 2, 3].map((card) => (
                  <div key={card} className="bg-white/60 p-4 rounded-2xl border border-white/50 shadow-sm">
                    <div className="flex justify-between mb-3">
                        <Skeleton width={60} height={20} />
                        <Skeleton width={20} height={20} variant="circular" />
                    </div>
                    <Skeleton width="100%" height={24} className="mb-2" />
                    <Skeleton width="70%" height={16} className="mb-4" />
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200/50">
                        <Skeleton width={80} height={16} />
                        <Skeleton width={24} height={24} variant="circular" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
