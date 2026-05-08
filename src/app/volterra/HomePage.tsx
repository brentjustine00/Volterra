"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import HeroLoop from "@/components/HeroLoop";
import Navbar from "@/components/Navbar";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);
}

function SectionShell({
  id,
  kicker,
  title,
  desc,
  children
}: {
  id: string;
  kicker: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative">
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-grid [background-size:88px_88px] opacity-15" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-28">
        <div className="mb-10 flex items-center justify-between">
          <div className="h-px flex-1 bg-gradient-to-r from-neonBlue/55 via-electricPurple/25 to-transparent" />
          <div className="ml-5 text-[11px] tracking-[0.34em] uppercase text-white/45">{id}</div>
        </div>
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.34em] uppercase text-white/60">{kicker}</p>
            <h2 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-3xl font-semibold leading-tight md:text-5xl">
              {title}
            </h2>
            {desc ? <p className="mt-5 max-w-2xl text-white/70">{desc}</p> : null}
          </div>
          <div className="hidden md:block text-xs tracking-[0.34em] uppercase text-white/50">
            VOLTERRA X SYSTEMS
          </div>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function GlassCard({
  title,
  value,
  desc
}: {
  title: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <div className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-neonBlue/18 via-electricPurple/12 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <p className="text-xs tracking-[0.3em] text-white/60 uppercase">{title}</p>
        <p className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-3xl font-semibold text-white">
          {value}
        </p>
        <p className="mt-3 text-sm text-white/70">{desc}</p>
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  body,
  open,
  onToggle
}: {
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full text-left"
      aria-expanded={open}
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-xl transition hover:border-white/20">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm tracking-[0.22em] uppercase text-white/85">{title}</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neonBlue shadow-neon" />
            <span className="text-xs tracking-[0.3em] uppercase text-white/50">
              {open ? "Close" : "Open"}
            </span>
          </div>
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-4 text-sm text-white/70">{body}</p>
        </motion.div>
      </div>
    </button>
  );
}

export default function HomePage() {
  const [showStickyReserve, setShowStickyReserve] = useState(false);
  const [rangeMiles, setRangeMiles] = useState(420);
  const [chargeMinutes, setChargeMinutes] = useState(18);
  const [powerHp, setPowerHp] = useState(1020);
  const [activeColor, setActiveColor] = useState<"neon" | "purple" | "ice">("neon");
  const [faqOpen, setFaqOpen] = useState<number>(0);
  const [driveMode, setDriveMode] = useState<"track" | "street" | "stealth">("track");

  const accent = useMemo(() => {
    if (activeColor === "purple") return { a: "#8A2BE2", b: "#00D6FF" };
    if (activeColor === "ice") return { a: "#9AF7FF", b: "#8A2BE2" };
    return { a: "#00D6FF", b: "#8A2BE2" };
  }, [activeColor]);

  useEffect(() => {
    const onScroll = () => setShowStickyReserve(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/70 to-black" />

      <main>
        <HeroLoop />

        {/* Sticky conversion CTA */}
        <motion.div
          initial={false}
          animate={{ y: showStickyReserve ? 0 : 80, opacity: showStickyReserve ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-x-0 bottom-5 z-40 mx-auto w-full max-w-6xl px-6 md:hidden"
        >
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-sm bg-neonBlue shadow-neon" />
              <div>
                <div className="text-xs tracking-[0.28em] uppercase text-white/70">VOLTERRA X</div>
                <div className="text-sm text-white/85">Reserve priority access</div>
              </div>
            </div>
            <a
              href="#reserve"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs tracking-[0.24em] uppercase text-white/85 backdrop-blur-xl transition hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:text-white"
            >
              Reserve
            </a>
          </div>
        </motion.div>

        <SectionShell
          id="performance"
          kicker="PERFORMANCE"
          title="Instant torque. Zero delay."
          desc="A launch profile engineered for repeatable brutality - traction logic, thermal strategy, and aero synchronized in real time."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <GlassCard title="0-100" value="2.1s" desc="Dual-motor launch control. Grip-first algorithm." />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <GlassCard title="Peak Power" value={`${formatNumber(powerHp)} hp`} desc="Thermal-tuned output curve." />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <GlassCard title="Top Speed" value="217 mph" desc="Aero-limited stability profile." />
            </motion.div>
          </div>

          <div className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:grid-cols-2 md:items-center md:p-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">TUNE</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                Build your performance tier.
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Adjust targets to preview configuration intent. This is a UI demo - specs are illustrative.
              </p>
            </div>
            <div className="grid gap-5">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs tracking-[0.3em] uppercase text-white/60">Power</div>
                  <div className="text-sm text-white/85">{formatNumber(powerHp)} hp</div>
                </div>
                <input
                  aria-label="Power"
                  className="mt-4 w-full accent-[var(--neon-blue)]"
                  type="range"
                  min={840}
                  max={1180}
                  step={10}
                  value={powerHp}
                  onChange={(e) => setPowerHp(Number(e.target.value))}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs tracking-[0.3em] uppercase text-white/60">Range</div>
                  <div className="text-sm text-white/85">{formatNumber(rangeMiles)} mi</div>
                </div>
                <input
                  aria-label="Range"
                  className="mt-4 w-full accent-[var(--electric-purple)]"
                  type="range"
                  min={290}
                  max={520}
                  step={5}
                  value={rangeMiles}
                  onChange={(e) => setRangeMiles(Number(e.target.value))}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs tracking-[0.3em] uppercase text-white/60">Fast Charge</div>
                  <div className="text-sm text-white/85">{chargeMinutes} min</div>
                </div>
                <input
                  aria-label="Fast Charge"
                  className="mt-4 w-full accent-[var(--neon-blue)]"
                  type="range"
                  min={12}
                  max={32}
                  step={1}
                  value={chargeMinutes}
                  onChange={(e) => setChargeMinutes(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="design"
          kicker="DESIGN"
          title="Aerodynamic precision. Aggressive silhouette."
          desc="Sharp planes, low nose, and a canopy cockpit - designed to read like a concept render under neon light."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Active Intake",
                v: "Adaptive cooling",
                d: "Thermal headroom when you push. Flush when you cruise."
              },
              {
                t: "Carbon Core",
                v: "Rigid chassis",
                d: "High torsional stiffness for precision steering feel."
              },
              {
                t: "Light Signature",
                v: "Neon blade",
                d: "A recognizable outline for night-city presence."
              }
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <GlassCard title={c.t} value={c.v} desc={c.d} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Drive Modes</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                Choose the mood. Change the UI.
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Tap a mode to preview cockpit behavior. This increases interactivity and keeps users exploring.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {[
                  { label: "Track", id: "track" as const },
                  { label: "Street", id: "street" as const },
                  { label: "Stealth", id: "stealth" as const }
                ].map((m) => {
                  const active = driveMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setDriveMode(m.id)}
                      className={[
                        "rounded-full border px-4 py-2 text-xs tracking-[0.24em] uppercase backdrop-blur-xl transition",
                        active
                          ? "border-neonBlue/60 bg-neonBlue/10 text-white"
                          : "border-white/15 bg-white/5 text-white/75 hover:border-neonBlue/45 hover:text-white"
                      ].join(" ")}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/40 p-7 backdrop-blur-xl md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Cockpit Response</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                {driveMode === "track"
                  ? "Sharper. Louder. Faster."
                  : driveMode === "street"
                    ? "Smooth control. Daily-ready."
                    : "Low glow. Minimal signals."}
              </h3>
              <p className="mt-4 text-sm text-white/70">
                {driveMode === "track"
                  ? "Throttle map tightens, aero becomes aggressive, and UI elevates key telemetry."
                  : driveMode === "street"
                    ? "Comfort bias, calmer motion, and simplified prompts for focus."
                    : "Reduced interface glow, stealthy contrasts, and minimal HUD language."}
              </p>
              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {[
                  { k: "Aero", v: driveMode === "track" ? "High" : driveMode === "street" ? "Auto" : "Low" },
                  { k: "UI Glow", v: driveMode === "track" ? "Neon" : driveMode === "street" ? "Balanced" : "Muted" },
                  { k: "Response", v: driveMode === "track" ? "Instant" : driveMode === "street" ? "Smooth" : "Silent" }
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-xs tracking-[0.3em] uppercase text-white/60">{s.k}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="ownership"
          kicker="OWNERSHIP"
          title="From reserve to delivery."
          desc="A guided funnel: clear steps, reduced uncertainty, and repeated CTAs at the right moments."
        >
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { k: "1. Reserve", v: "Priority hold", d: "Refundable deposit to lock your place." },
              { k: "2. Configure", v: "Build spec", d: "Choose tier, colorway, interior, aero." },
              { k: "3. Confirm", v: "Finalize", d: "Production slot + delivery estimate." },
              { k: "4. Deliver", v: "Handoff", d: "White-glove onboarding and app setup." }
            ].map((step, i) => (
              <motion.div
                key={step.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <p className="text-xs tracking-[0.3em] uppercase text-white/60">{step.k}</p>
                <p className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-xl text-white">
                  {step.v}
                </p>
                <p className="mt-3 text-sm text-white/70">{step.d}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#reserve"
              className="inline-flex items-center justify-center rounded-full border border-neonBlue/40 bg-neonBlue/10 px-6 py-3 text-xs tracking-[0.24em] uppercase text-white/90 transition hover:border-neonBlue/70 hover:bg-neonBlue/15"
            >
              Reserve now
            </a>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs tracking-[0.24em] uppercase text-white/85 transition hover:border-neonBlue/60 hover:bg-neonBlue/10 hover:text-white"
            >
              Read FAQ
            </a>
          </div>
        </SectionShell>

        <SectionShell
          id="technology"
          kicker="TECHNOLOGY"
          title="Control systems that think ahead."
          desc="Torque vectoring, active aero, and chassis intelligence modeled like an aircraft — constant micro-corrections for stability and feel."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Colorways</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                Neon reflections, selectable accents.
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Pick a mood. Accent colors shift interface glow to increase “premium” perception.
              </p>

              <div className="mt-7 flex items-center gap-3">
                {[
                  { id: "neon" as const, label: "Neon Blue" },
                  { id: "purple" as const, label: "Electric Purple" },
                  { id: "ice" as const, label: "Ice Plasma" }
                ].map((c) => {
                  const active = activeColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveColor(c.id)}
                      className={[
                        "rounded-full border px-4 py-2 text-xs tracking-[0.24em] uppercase backdrop-blur-xl transition",
                        active
                          ? "border-neonBlue/60 bg-neonBlue/10 text-white"
                          : "border-white/15 bg-white/5 text-white/75 hover:border-neonBlue/45 hover:text-white"
                      ].join(" ")}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <div
                className="mt-8 rounded-2xl border border-white/10 bg-black/45 p-6"
                style={{
                  boxShadow: `0 0 24px ${accent.a}22, 0 0 48px ${accent.b}18`
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-[0.3em] uppercase text-white/60">Interface Glow</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: accent.a }} />
                    <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: accent.b }} />
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/70">
                  Designed for dark environments: night drives, studio lighting, and cinematic trailers.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <GlassCard title="800V System" value="Ultra-Fast" desc="Lower heat, higher sustained performance." />
              <GlassCard title="Vectoring" value="4D Control" desc="Yaw + traction logic tuned per surface." />
              <GlassCard title="Aero" value="Active Surfaces" desc="Downforce when you need it; glide when you don’t." />
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="gallery"
          kicker="GALLERY"
          title="Cinematic angles. Neon reflections."
          desc="A scrollable gallery grid with hover glow and filmic gradients — built for shareability."
        >
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[12, 28, 48, 70, 92, 114, 128, 144].map((n, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: [0.2, 0.8, 0.2, 1] }}
                className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <Image
                  alt={`VOLTERRA X render ${n}`}
                  src={`/sequence/car/${String(n).padStart(4, "0")}.jpg`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-90 transition duration-500 group-hover:opacity-100 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" />
                <div className="pointer-events-none absolute -inset-20 bg-gradient-to-br from-neonBlue/18 via-electricPurple/12 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="specs"
          kicker="SPECS"
          title="Numbers that convert."
          desc="A spec block designed for clarity, comparison, and action — the exact moment buyers decide."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <GlassCard title="Estimated Range" value={`${formatNumber(rangeMiles)} mi`} desc="Variable by wheel, temp, and mode." />
            <GlassCard title="Fast Charge" value={`${chargeMinutes} min`} desc="10–80% in a cinematic pit stop." />
            <GlassCard title="Battery" value="108 kWh" desc="High-discharge architecture." />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Social Proof</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                “Feels like a launch sequence.”
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Designed for high intent: short copy, clear metrics, and a constant path back to Reserve.
              </p>
              <div className="mt-7 grid grid-cols-3 gap-4">
                {[
                  { k: "Preorders", v: "7,420" },
                  { k: "Waitlist", v: "18k" },
                  { k: "Rating", v: "4.9" }
                ].map((s) => (
                  <div key={s.k} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <p className="text-xs tracking-[0.3em] uppercase text-white/60">{s.k}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60">Lead Capture</p>
              <h3 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-2xl font-semibold">
                Get priority allocation.
              </h3>
              <p className="mt-4 text-sm text-white/70">
                Enter your email to unlock color tiers + launch edition updates.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  aria-label="Email address for waitlist"
                  className="h-11 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-neonBlue/60"
                />
                <button
                  type="submit"
                  className="h-11 rounded-xl border border-neonBlue/40 bg-neonBlue/10 px-5 text-xs tracking-[0.24em] uppercase text-white/90 transition hover:border-neonBlue/70 hover:bg-neonBlue/15"
                >
                  Join Waitlist
                </button>
              </form>
              <p className="mt-3 text-xs text-white/45">
                No spam. Just launch updates and limited builds.
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionShell
          id="features"
          kicker="MORE FEATURES"
          title="Beyond the drive."
          desc="Every detail refined. Explore the advanced capabilities that define the VOLTERRA X."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: "OTA Updates",
                v: "Always Evolving",
                d: "Over-the-air firmware updates enhance performance and UI over time."
              },
              {
                t: "Biometric Entry",
                v: "Seamless Access",
                d: "Facial and fingerprint recognition for instant driver profiling."
              },
              {
                t: "Smart Suspension",
                v: "Predictive Comfort",
                d: "Scans the road ahead to pre-adjust damping rates."
              }
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <GlassCard title={c.t} value={c.v} desc={c.d} />
              </motion.div>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="faq"
          kicker="FAQ"
          title="Clear objections. Fast answers."
          desc="Remove friction: pricing, delivery, and reservation flow — the essentials for conversion."
        >
          <div className="grid gap-4">
            {[
              {
                t: "How does reservation work?",
                b: "Reserve to secure priority allocation. You’ll receive configuration access and updates as production tiers open."
              },
              {
                t: "Is this a real vehicle?",
                b: "This build is a cinematic product concept + UI demo. Use it as a premium landing template for real launches."
              },
              {
                t: "Can I customize performance and color?",
                b: "Yes — the page includes interactive controls (power/range/charge) and accent colorways to preview feel."
              }
            ].map((it, i) => (
              <AccordionItem
                key={it.t}
                title={it.t}
                body={it.b}
                open={faqOpen === i}
                onToggle={() => setFaqOpen((prev) => (prev === i ? -1 : i))}
              />
            ))}
          </div>
        </SectionShell>

        <section id="reserve" className="relative">
          <div className="pointer-events-none absolute inset-0 bg-glow opacity-65" />
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-28 pt-10">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-black/40 p-10 backdrop-blur-xl md:p-14">
              <div className="pointer-events-none absolute -inset-40 bg-gradient-to-br from-neonBlue/25 via-electricPurple/20 to-transparent blur-3xl opacity-70" />
              <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm tracking-[0.28em] text-white/70 uppercase">Reserve</p>
                  <h2 className="mt-3 font-semibold leading-tight [font-family:var(--font-orbitron),ui-sans-serif] text-3xl md:text-5xl">
                    The Future of Speed.
                  </h2>
                  <p className="mt-4 text-white/70 max-w-xl">
                    Claim a build slot. Get early access to performance tiers, colorways, and limited launch editions.
                  </p>
                </div>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm tracking-[0.22em] uppercase backdrop-blur-xl transition hover:border-neonBlue/60 hover:bg-neonBlue/10"
                >
                  <span className="text-white/90 group-hover:text-white">Reserve Now</span>
                  <span className="ml-3 inline-block h-1.5 w-1.5 rounded-full bg-neonBlue shadow-neon" />
                </a>
              </div>
              <div className="relative mt-10 grid gap-4 md:grid-cols-3">
                {[
                  { k: "Deposit", v: "$500", d: "Refundable priority hold." },
                  { k: "Delivery", v: "Q4", d: "Rolling tiers by region." },
                  { k: "Access", v: "Instant", d: "Unlock configuration flow." }
                ].map((c) => (
                  <div key={c.k} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <p className="text-xs tracking-[0.3em] uppercase text-white/60">{c.k}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{c.v}</p>
                    <p className="mt-2 text-sm text-white/65">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="relative border-t border-white/10 bg-black/40" role="contentinfo">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 md:py-16">
            <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
              <div className="md:col-span-2">
                <div className="[font-family:var(--font-orbitron),ui-sans-serif] text-xl tracking-[0.28em] uppercase text-white/90">
                  VOLTERRA X
                </div>
                <p className="mt-4 max-w-sm text-sm text-white/60">
                  Electric Power. Unleashed. Experience the pinnacle of automotive engineering and cinematic design.
                </p>
                <div className="mt-6 flex gap-4">
                  <a href="#" aria-label="Follow us on Twitter" className="text-white/60 hover:text-neonBlue transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Follow us on Instagram" className="text-white/60 hover:text-neonBlue transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Follow us on YouTube" className="text-white/60 hover:text-neonBlue transition">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-widest text-white uppercase">Vehicles</h4>
                <ul className="mt-4 grid gap-3 text-sm text-white/60">
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Volterra X</a></li>
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Volterra S</a></li>
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Concepts</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-widest text-white uppercase">Discover</h4>
                <ul className="mt-4 grid gap-3 text-sm text-white/60">
                  <li><a href="#performance" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Performance</a></li>
                  <li><a href="#technology" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Technology</a></li>
                  <li><a href="#gallery" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Gallery</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold tracking-widest text-white uppercase">Company</h4>
                <ul className="mt-4 grid gap-3 text-sm text-white/60">
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Contact</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} VOLTERRA X. All rights reserved.</p>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Privacy Policy</a>
                <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Terms of Service</a>
                <a href="#" className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-neonBlue rounded px-1 -ml-1">Cookie Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
