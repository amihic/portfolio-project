"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionLink = { id: string; label: string };

const LINKS: SectionLink[] = [
  { id: "experience",  label: "PROFESSIONAL EXPERIENCE" },
  { id: "internships", label: "INTERNSHIPS" },
  { id: "projects",    label: "PROJECTS" },
  { id: "tech-stack",  label: "TECH STACK" },
  { id: "education",   label: "EDUCATION & LANGUAGES" },
  { id: "contact",     label: "CONTACT" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute("id");
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const onNavClick = (id?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (!id) {
      // scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const LinkItem = ({ id, label }: SectionLink) => {
    const isActive = active === id;
    return (
      <a
        href={`#${id}`}
        onClick={onNavClick(id)}
        className={`relative rounded-xl px-3 py-2 text-sm transition ${
          isActive ? "text-white" : "text-neutral-300 hover:text-white"
        }`}
      >
        <span>{label}</span>
        {isActive && (
          <motion.span
            layoutId="active-pill"
            className="absolute inset-0 -z-10 rounded-xl bg-white/10 backdrop-blur"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
      </a>
    );
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
      <nav className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-3 py-2">
          {/* Brand */}
          <button
            onClick={onNavClick(undefined)}
            className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-400 bg-clip-text text-transparent font-semibold">
              ALEKSA
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <LinkItem key={l.id} {...l} />
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-xl px-3 py-2 text-neutral-200 hover:text-white"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col">
                {LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={onNavClick(l.id)}
                    className={`relative px-4 py-3 text-sm ${
                      active === l.id ? "text-white bg-white/10" : "text-neutral-300 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={onNavClick(undefined)}
                  className="px-4 py-3 text-left text-sm text-yellow-300 hover:text-yellow-200"
                >
                  ← Back to top
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
