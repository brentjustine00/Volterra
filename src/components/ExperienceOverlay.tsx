"use client";

import { MotionValue, motion, useTransform } from "framer-motion";

type Props = {
  progress: MotionValue<number>;
};

type Beat = {
  start: number;
  end: number;
  kicker: string;
  headline: string;
  sub: string;
};

const beats = [
  {
    start: 0,
    end: 0.25,
    kicker: "IGNITION",
    headline: "VOLTERRA X",
    sub: "Electric Power. Unleashed."
  },
  {
    start: 0.25,
    end: 0.5,
    kicker: "DESIGN",
    headline: "Aerodynamic Precision",
    sub: "Engineered for dominance."
  },
  {
    start: 0.5,
    end: 0.75,
    kicker: "PERFORMANCE",
    headline: "0–100 in 2.1s",
    sub: "Pure electric torque."
  },
  {
    start: 0.75,
    end: 1,
    kicker: "FINAL",
    headline: "The Future of Speed",
    sub: "Reserve Now."
  }
];

function BeatLayer({ beat, progress }: { beat: Beat; progress: MotionValue<number> }) {
  const opacity = useTransform(
    progress,
    [beat.start, beat.start + 0.06, beat.end - 0.06, beat.end],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute">
      <p className="text-xs tracking-[0.34em] uppercase text-white/70">
        <span className="text-neonBlue drop-shadow-[0_0_14px_rgba(0,214,255,.35)]">
          {beat.kicker}
        </span>
      </p>
      <h1 className="mt-4 [font-family:var(--font-orbitron),ui-sans-serif] text-4xl font-semibold leading-[1.05] md:text-6xl">
        {beat.headline}
      </h1>
      <p className="mt-5 text-base text-white/75 md:text-lg">{beat.sub}</p>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px w-12 bg-white/20" />
        <p className="text-xs tracking-[0.3em] uppercase text-white/55">
          Tesla × Lamborghini × Cyberpunk
        </p>
      </div>
    </motion.div>
  );
}

export default function ExperienceOverlay({ progress }: Props) {
  const vignetteOpacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.65, 0.45, 0.55, 0.72]);

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_35%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.75)_100%)]"
        style={{ opacity: vignetteOpacity }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
        <div className="max-w-2xl">
          {beats.map((beat) => (
            <BeatLayer key={beat.kicker} beat={beat} progress={progress} />
          ))}
        </div>
      </div>
    </div>
  );
}
