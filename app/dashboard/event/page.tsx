import { Suspense } from "react";
import EventsClient from "./EventsClient";
import EventSkeleton from "./components/EventSkeleton";

export default function EventsPage() {
  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventsClient />
    </Suspense>
  );
}
