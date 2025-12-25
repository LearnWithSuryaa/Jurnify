import { Suspense } from "react";
import AnalyticsClient from "./Client";
import AnalyticsSkeleton from "./components/AnalyticsSkeleton";

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsClient />
    </Suspense>
  );
}
