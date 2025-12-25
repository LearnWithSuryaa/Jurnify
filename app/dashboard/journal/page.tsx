"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import JournalClient from "./JournalClient";

export default function JournalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JournalClient />
    </Suspense>
  );
}
