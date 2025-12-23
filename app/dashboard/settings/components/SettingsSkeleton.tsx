import Skeleton from "../../../components/common/Skeleton";

export default function SettingsSkeleton() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 px-6 md:px-12 lg:px-16 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/40">
      {/* HEADER */}
      <div className="mb-8">
        <Skeleton width={200} height={48} className="mb-2" />
        <Skeleton width={300} height={20} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden group">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <Skeleton variant="circular" width={112} height={112} />
            </div>
            <Skeleton width={150} height={28} className="mx-auto mb-2" />
            <Skeleton width={200} height={20} className="mx-auto mb-6" />
            <Skeleton width="100%" height={44} />
          </div>

          {/* STATS CARD */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100">
            <Skeleton width={120} height={24} className="mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} width="100%" height={48} />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <Skeleton width={150} height={24} className="mb-2" />
            {/* Change Password */}
            <Skeleton width="100%" height={80} />
            {/* Email Section */}
            <Skeleton width="100%" height={80} />
          </div>

          {/* LOGOUT */}
          <div className="bg-gradient-to-br from-[#4A70A9] to-[#8FABD4] rounded-2xl p-6 flex items-center justify-between shadow-lg opacity-50">
             <div className="space-y-2">
                <Skeleton width={120} height={24} className="bg-white/40" />
                <Skeleton width={200} height={16} className="bg-white/40" />
             </div>
             <Skeleton width={100} height={48} className="bg-white/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
