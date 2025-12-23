import { Suspense } from "react";
import JourneyClient from "./JourneyClient";
import JourneySkeleton from "./components/JourneySkeleton";

export default function JourneyPage() {
  return (
    <Suspense fallback={<JourneySkeleton />}>
      <JourneyClient />
    </Suspense>
  );
}
