"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [atBottom, setAtBottom] = useState(false);
  const year = new Date().getFullYear();

  const checkScroll = () => {
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    // Kalau halaman terlalu pendek → footer jangan muncul
    if (pageHeight <= viewportHeight + 50) {
      setAtBottom(false);
      return;
    }

    // Kalau belum scroll sama sekali → jangan muncul
    if (scrollTop === 0) {
      setAtBottom(false);
      return;
    }

    // Muncul ketika sudah mencapai bottom
    setAtBottom(scrollTop + viewportHeight >= pageHeight - 2);
  };

  const scrollHome = () => {
    setAtBottom(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll, { passive: true });

    // Biarkan layout settle
    setTimeout(checkScroll, 50);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <footer
      className={`footer-wrap fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[min(900px,92%)]
        ${atBottom ? "footer-fade-enter" : "footer-fade-leave"}
      `}
    >
      <div className="footer-inner flex items-center justify-between py-4 px-8 rounded-[36px]">
        {/* Brand */}
        <span className="footer-text font-semibold">Journify</span>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <button
            onClick={scrollHome}
            className="hover:text-black transition cursor-pointer"
          >
            Home
          </button>

          <Link href="/about" className="hover:text-black transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-black transition">
            Contact
          </Link>
        </nav>

        {/* Year & tagline */}
        <span className="footer-text">
          © {year} <span className="px-5">#CatatAjaDulu</span>
        </span>
      </div>
    </footer>
  );
}
