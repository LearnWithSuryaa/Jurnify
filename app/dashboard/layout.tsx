"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  Home,
  ClipboardList,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((p) => !p);

  const contentInner = useRef<HTMLDivElement>(null);

  const mainMenu = [
    { id: 1, label: "Home", icon: Home, path: "/dashboard/home" },
    {
      id: 2,
      label: "Journey",
      icon: ClipboardList,
      path: "/dashboard/journey",
    },
    { id: 3, label: "Events", icon: Calendar, path: "/dashboard/event" },
  ];

  const bottomMenu = [
    { id: 4, label: "Pengaturan", icon: Settings, path: "/dashboard/settings" },
    { id: 5, label: "Logout", icon: LogOut, path: "/" },
  ];

  const goTo = (path: string) => router.push(path);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";

    // exact match
    if (pathname === path) return true;

    // match sub-routes tapi tidak overlap
    return pathname.startsWith(path + "/");
  };

  // CONTENT REVEAL
  useEffect(() => {
    if (!contentInner.current) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contentInner.current?.classList.add("content-show");
            contentInner.current?.classList.remove("content-hide");
          }
        }),
      { threshold: 0.15 }
    );

    observer.observe(contentInner.current);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex bg-linear-to-br from-[#E6ECF5] via-[#C6D5EA] to-[#9AB8D4] overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`sidebar-base ${isCollapsed ? "sidebar-c" : "sidebar-e"}`}
      >
        {/* COLLAPSE BUTTON */}
        <button
          onClick={toggleSidebar}
          className={`sidebar-toggle ${isCollapsed ? "rotate-180" : ""}`}
        >
          <ChevronLeft className="w-4 h-4 text-[#2F3A4B]" />
        </button>

        {/* LOGO */}
        <div className={`logo-wrap ${isCollapsed ? "logo-c" : "logo-e"}`}>
          <img src="/logo.webp" alt="logo" className="w-10 h-10" />
          {!isCollapsed && <h1 className="logo-title">Jurnify</h1>}
        </div>

        {/* MAIN MENU */}
        <nav className={`menu-wrap ${isCollapsed ? "menu-c" : ""}`}>
          {mainMenu.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => goTo(item.path)}
                className={`menu-item
                  ${isActive(item.path) ? "menu-active" : "menu-normal"}
                  ${isCollapsed ? "menu-center" : ""}
                  menu-stagger-${i}
                `}
              >
                <Icon className="menu-icon" />
                {!isCollapsed && (
                  <span className="menu-label">{item.label}</span>
                )}

                {isCollapsed && !isActive(item.path) && (
                  <span className="tooltip">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* BOTTOM MENU */}
        <nav
          className={`menu-wrap border-t border-white/40 pt-4 ${
            isCollapsed ? "menu-c" : ""
          }`}
        >
          {bottomMenu.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => goTo(item.path)}
                className={`menu-item
                  ${isActive(item.path) ? "menu-active" : "menu-normal"}
                  ${isCollapsed ? "menu-center" : ""}
                  menu-stagger-${i + 3}
                `}
              >
                <Icon className="menu-icon" />
                {!isCollapsed && (
                  <span className="menu-label">{item.label}</span>
                )}

                {isCollapsed && !isActive(item.path) && (
                  <span className="tooltip">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div
        className={`content-base ${isCollapsed ? "content-c" : "content-e"}`}
      >
        <div ref={contentInner} className="content-anim">
          {children}
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        /* ---- Sidebar ---- */
        .sidebar-base {
          position: fixed;
          top: 1rem;
          left: 1rem;
          height: calc(100vh - 2rem);
          z-index: 30;
          padding: 2rem 1.5rem;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 1.5rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          transform-origin: left;
          transition: width 0.55s cubic-bezier(0.25, 0.8, 0.25, 1),
            transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
        }

        .sidebar-e {
          width: 270px;
          opacity: 1;
          transform: scaleX(1);
        }
        .sidebar-c {
          width: 82px;
          opacity: 0.94;
          transform: scaleX(0.97);
        }

        .sidebar-toggle {
          position: absolute;
          right: -0.75rem;
          top: 3.5rem;
          width: 34px;
          height: 34px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        /* ---- Logo ---- */
        .logo-wrap {
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .logo-e {
          gap: 0.75rem;
          justify-content: flex-start;
        }
        .logo-c {
          justify-content: center;
        }

        .logo-title {
          font-size: 26px;
          font-weight: 800;
          color: #233041;
          letter-spacing: -0.5px;
        }

        /* ---- Menu Styles ---- */
        .menu-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .menu-c {
          align-items: center;
        }

        .menu-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: 1px solid transparent;
          transition: background 0.28s ease, border 0.28s ease,
            transform 0.28s ease, opacity 0.3s ease;
        }

        .menu-normal {
          color: rgba(47, 58, 75, 0.75);
        }
        .menu-normal:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
          transform: scale(1.02);
        }

        .menu-active {
          background: #3b6a9e;
          color: white;
          border-color: transparent;
          box-shadow: 0 10px 22px rgba(59, 106, 158, 0.45);
        }

        .menu-center {
          justify-content: center;
        }

        .menu-icon {
          width: 24px;
          height: 24px;
        }

        .tooltip {
          position: absolute;
          left: 72px;
          background: #2f3a4b;
          color: white;
          font-size: 0.85rem;
          padding: 0.25rem 0.65rem;
          border-radius: 0.5rem;
          opacity: 0;
          white-space: nowrap;
          transform: translateX(-6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .menu-item:hover .tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        /* stagger delay */
        .menu-stagger-0 {
          transition-delay: 0.05s;
        }
        .menu-stagger-1 {
          transition-delay: 0.1s;
        }
        .menu-stagger-2 {
          transition-delay: 0.15s;
        }
        .menu-stagger-3 {
          transition-delay: 0.2s;
        }
        .menu-stagger-4 {
          transition-delay: 0.25s;
        }

        /* ---- Content ---- */
        .content-base {
          position: relative;
          z-index: 10;
          width: 100%;
          transition: margin-left 0.55s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .content-e {
          margin-left: 300px;
        }
        .content-c {
          margin-left: 115px;
        }

        .content-anim {
          padding: 5rem 2rem 4rem;
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .content-show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
