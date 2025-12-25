import { Suspense } from "react";
import FocusClient from "./FocusClient";

export default function FocusPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Memuat mode fokus...</div>}>
      <FocusClient />
    </Suspense>
  );
}
