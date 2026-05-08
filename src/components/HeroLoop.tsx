"use client";

import { motion } from "framer-motion";

export default function HeroLoop() {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid [background-size:92px_92px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-25 hero-scanlines" />

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-end px-6 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs tracking-[0.34em] uppercase text-white/70">
            <span className="text-neonBlue drop-shadow-[0_0_14px_rgba(0,214,255,.35)]">
              VOLTERRA X
            </span>
          </p>
          <h1 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-5xl font-semibold leading-[1.02] md:text-7xl">
            Electric Power. Unleashed.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
            A hypercar interface built like a film trailer — aggressive, neon, and alive.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#reserve"
              className="group inline-flex items-center justify-center rounded-full border border-neonBlue/40 bg-neonBlue/10 px-7 py-3 text-xs tracking-[0.24em] uppercase text-white/90 backdrop-blur-xl transition hover:border-neonBlue/70 hover:bg-neonBlue/15"
            >
              Reserve Now
              <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-neonBlue shadow-neon" />
            </a>
            <a
              href="#performance"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-xs tracking-[0.24em] uppercase text-white/85 backdrop-blur-xl transition hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:text-white"
            >
              Explore Specs
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4 text-[11px] tracking-[0.32em] uppercase text-white/60">
            <div className="h-px w-10 bg-white/20" />
            <span>Electric Power. Unleashed.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
