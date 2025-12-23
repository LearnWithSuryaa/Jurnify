import { Suspense } from "react";
import JourneyClient from "./JourneyClient";

export default function JourneyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading journey...</div>}>
      <JourneyClient />
    </Suspense>
  );
}
