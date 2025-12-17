"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import SpotifyMini from "./Spotify";

const links = [
  { label: "PROJECTS", href: "#projects" },
  { label: "RESUME", href: "https://drive.google.com/file/d/1nl0942jxqTrDcQVXpuhQyjc-evjdWP1U/view" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#footer" },
];

export default function Navbar() {
  /* ---------- Scroll hide/show ---------- */
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
};


  const controlNavbar = () => {
    const currentY = window.scrollY;

    // Show immediately when scrolling back up
    if (currentY < lastY) {
      setVisible(true);
    }

    // Hide only after scrolling down past 80 px
    if (currentY > 80 && currentY > lastY) {
      setVisible(false);
    }

    setLastY(currentY);
  };

  useEffect(() => {
    const handler = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(controlNavbar, 80);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("scroll", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [lastY]);

  /* ---------- Mobile menu ---------- */
  const [mobileOpen, setMobileOpen] = useState(false);

  /* ---------- Live clock ---------- */
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* ---------- Desktop Navbar ---------- */}
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:py-3
                       backdrop-blur-xl bg-neutral-900/70 border-b border-neutral-800/50
                       shadow-xl shadow-black/20 rounded-b-xl"
          >
            {/* Grain overlay (subtle texture) */}
            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="h-full w-full bg-[linear-gradient(to_right,#0f0f0f_2px,transparent_2px)] bg-size[4px_4px] mix-blend-overlay" />
            </div>

            {/* Left – Logo */}
            <a
              href="/"
              className="relative z-10 text-lg font-semibold tracking-wider text-white
                         after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0
                         after:bg-linear-to-r after:from-accent after:to-yellow-400
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              uK
            </a>

            {/* Center – Links (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-9 text-sm font-light tracking-widest">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => handleScroll(l.href)}
                  className="relative text-gray-300 transition-colors duration-200 hover:text-white
                             after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0
                             after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right – Sound + Time */}
            <div className="relative z-10 flex items-center gap-4 text-xs -mr-18 md:mr-0 md:text-sm">
              <SpotifyMini />

              <span className="hidden md:block font-mono text-gray-300">{fmt}</span>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden relative z-10 text-white"
            >
              <Menu className="h-6 w-6" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ---------- Mobile Drawer ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-80 bg-neutral-900/95 backdrop-blur-2xl
                         border-l border-neutral-800/70 p-8 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end mb-12 text-white"
              >
                <X className="h-7 w-7" />
              </button>

              <nav className="flex flex-col gap-6 text-lg font-light tracking-widest">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => {setMobileOpen(false); handleScroll(l.href)}}
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex items-center gap-4 text-sm">
                <SpotifyMini />
                <span className="font-mono text-gray-300">{fmt}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
