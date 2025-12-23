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
      <nav className="relative flex items-center justify-start px-3 py-3 h-[68px]">
        {/* LEFT PILL */}
        <div
          role="search"
          className="left-pill flex items-center gap-3 pl-5 pr-6 h-[50px] rounded-[14px] min-w-[360px] max-w-[680px] mr-5"
        >
          <span className={`label-text ${!anyIconHover ? "muted" : ""}`}>
            {currentLabel}
          </span>
        </div>

        {/* RIGHT ICONS */}
        <ul className="icons-list flex items-center gap-2 pr-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <button
                  className="icon-btn"
                  type="button"
                  aria-label={item.label}
                  onMouseEnter={() => onIconEnter(item.label)}
                  onMouseLeave={onIconLeave}
                  onFocus={() => onIconEnter(item.label)}
                  onBlur={onIconLeave}
                  onClick={(e) => smoothScroll(e, item.href)}
                >
                  <div className="icon-inner">
                    <Icon className="icon-svg" />
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
