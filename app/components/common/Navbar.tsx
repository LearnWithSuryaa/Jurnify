"use client";

import { useState } from "react";
import {
  HelpCircle,
  LayoutDashboard,
  FileQuestion,
  Workflow,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Navbar() {
  const links: NavItem[] = [
    { label: "Fitur", href: "#fitur", icon: LayoutDashboard },
    { label: "Mengapa Kami?", href: "#why", icon: HelpCircle },
    { label: "Cara Kerja", href: "#work", icon: Workflow },
    { label: "FAQ", href: "#faq", icon: FileQuestion },
  ];

  const DEFAULT_LABEL = "Journify #CatatAjaDulu";
  const [currentLabel, setCurrentLabel] = useState(DEFAULT_LABEL);
  const [anyIconHover, setAnyIconHover] = useState(false);

  const onIconEnter = (label: string) => {
    setCurrentLabel(label);
    setAnyIconHover(true);
  };

  const onIconLeave = () => {
    setCurrentLabel(DEFAULT_LABEL);
    setAnyIconHover(false);
  };

  const smoothScroll = (
    e: React.MouseEvent<HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      role="banner"
      className={`spotlight-wrap fixed top-10 left-1/2 -translate-x-1/2 z-9999 w-[min(900px,92%)] ${
        anyIconHover ? "is-hovered" : ""
      }`}
    >
      <nav className="relative flex items-center justify-between px-2 md:px-3 py-3 h-[68px]">
        {/* LEFT PILL */}
        <div
          role="search"
          className="left-pill flex items-center gap-2 pl-4 pr-4 md:pl-5 md:pr-6 h-[50px] rounded-[14px] flex-1 min-w-0 md:min-w-[360px] md:max-w-[680px] mr-2 md:mr-5 overflow-hidden"
        >
          <span className={`label-text text-lg md:text-2xl truncate ${!anyIconHover ? "muted" : ""}`}>
            {currentLabel}
          </span>
        </div>

        {/* RIGHT ICONS */}
        <ul className="icons-list flex items-center gap-1 md:gap-2 pr-1 shrink-0 overflow-x-auto no-scrollbar py-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label} className="shrink-0">
                <button
                  className="icon-btn w-10 h-10 md:w-[46px] md:h-[46px]"
                  type="button"
                  aria-label={item.label}
                  onMouseEnter={() => onIconEnter(item.label)}
                  onMouseLeave={onIconLeave}
                  onFocus={() => onIconEnter(item.label)}
                  onBlur={onIconLeave}
                  onClick={(e) => smoothScroll(e, item.href)}
                >
                  <div className="icon-inner w-10 h-10 md:w-[46px] md:h-[46px]">
                    <Icon className="icon-svg w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
