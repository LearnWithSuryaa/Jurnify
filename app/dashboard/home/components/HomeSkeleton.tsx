import Skeleton from "../../../components/common/Skeleton";

export default function HomeSkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="mb-8">
        <Skeleton width={300} height={48} className="mb-2" />
        <Skeleton width={200} height={24} />
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border-2 border-[#8FABD4]/20 flex flex-col justify-between h-40">
             <div className="flex justify-between items-start">
                <Skeleton width={56} height={56} className="rounded-2xl" />
                <div className="flex flex-col items-end gap-1">
                    <Skeleton width={40} height={36} />
                    <Skeleton width={60} height={16} />
                </div>
             </div>
             <div className="flex justify-between border-t border-[#8FABD4]/20 pt-4 mt-2">
                <Skeleton width={50} height={16} />
                <Skeleton width={30} height={16} />
             </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* CALENDAR WIDGET */}
        <div className="lg:col-span-1 bg-white/80 p-6 rounded-3xl shadow-lg h-[500px]">
           <div className="flex justify-between mb-6">
               <Skeleton width={120} height={24} />
               <Skeleton width={80} height={20} />
           </div>
           <Skeleton width="100%" height={24} className="mb-4" />
           <div className="grid grid-cols-7 gap-2 mb-6">
                {Array.from({length: 35}).map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
           </div>
           <Skeleton width="100%" height={20} className="mb-3" />
           <Skeleton width="100%" height={60} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
             {/* URGENT TASKS */}
             <div className="bg-white/80 p-6 rounded-3xl shadow-lg h-[240px]">
                 <div className="flex justify-between mb-6">
                    <Skeleton width={180} height={28} />
                    <Skeleton width={80} height={28} variant="circular" />
                 </div>
                 <div className="space-y-3">
                     {[1, 2].map(i => <Skeleton key={i} width="100%" height={70} />)}
                 </div>
             </div>

             {/* STATUS BOXES */}
             <div className="bg-white/80 p-6 rounded-3xl shadow-lg">
                 <Skeleton width={150} height={28} className="mb-6" />
                 <div className="grid grid-cols-4 gap-4">
                     {[1, 2, 3, 4].map(i => <Skeleton key={i} width="100%" height={100} />)}
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
}
