"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Home", href: "#home" },
  { label: "Performance", href: "#performance" },
  { label: "Design", href: "#design" },
  { label: "Technology", href: "#technology" },
  { label: "Gallery", href: "#gallery" },
  { label: "Specs", href: "#specs" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        className={[
          "mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4",
          "transition duration-300",
          scrolled
            ? "rounded-b-2xl border-b border-white/10 bg-black/35 backdrop-blur-xl"
            : "bg-transparent"
        ].join(" ")}
      >
        <a
          href="#"
          className="group inline-flex items-center gap-3 text-sm tracking-[0.28em] uppercase"
        >
          <span className="inline-block h-2 w-2 rounded-sm bg-neonBlue shadow-neon transition group-hover:rotate-12" />
          <span className="[font-family:var(--font-orbitron),ui-sans-serif] text-white/90 group-hover:text-white">
            VOLTERRA X
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group text-xs tracking-[0.26em] uppercase text-white/70 transition hover:text-white"
            >
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-neonBlue shadow-neon transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        <a
          href="#reserve"
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs tracking-[0.24em] uppercase text-white/85 backdrop-blur-xl transition hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:text-white"
        >
          Reserve Now
        </a>
      </div>
    </motion.header>
  );
}
