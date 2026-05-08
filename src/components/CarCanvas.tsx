"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  frameCount: number;
  basePath: string;
  mode?: "scroll" | "auto";
  progress?: number;
  fps?: number;
};

type CacheEntry = {
  img: HTMLImageElement;
  ready: boolean;
  error?: true;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function frameSrc(basePath: string, frameIndex1Based: number) {
  const name = String(frameIndex1Based).padStart(4, "0");
  return `${basePath}/${name}.jpg`;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;
  if (!iw || !ih) return;

  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

export default function CarCanvas({
  progress,
  frameCount,
  basePath,
  mode = "scroll",
  fps
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cacheRef = useRef<Map<number, CacheEntry>>(new Map());
  const rafRef = useRef<number | null>(null);
  const lastDrawnRef = useRef<number>(-1);
  const targetIndexRef = useRef<number>(1);
  const drawRef = useRef<(() => void) | null>(null);

  const [preferReduced, setPreferReduced] = useState(false);

  const frameUrls = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => frameSrc(basePath, i + 1));
  }, [basePath, frameCount]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPreferReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const maxConcurrent = preferReduced ? 2 : 6;

  const ensureCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const parent = canvas.parentElement;
    if (!parent) return null;

    const rect = parent.getBoundingClientRect();
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    return { ctx, w, h };
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      drawRef.current?.();
    });
  }, []);

  const loadFrame = useCallback(
    (frameIndex1Based: number) => {
    const existing = cacheRef.current.get(frameIndex1Based);
    if (existing) return existing;

    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    const entry: CacheEntry = { img, ready: false };
    cacheRef.current.set(frameIndex1Based, entry);
    img.onload = () => {
      entry.ready = true;
      scheduleDraw();
    };
    img.onerror = () => {
      entry.ready = false;
      entry.error = true;
    };
    img.src = frameUrls[frameIndex1Based - 1]!;
    return entry;
    },
    [frameUrls, scheduleDraw]
  );

  const warmCache = useCallback(
    (center: number) => {
    const radius = preferReduced ? 2 : 10;
    let inFlight = 0;
    for (let i = center - radius; i <= center + radius; i++) {
      if (i < 1 || i > frameCount) continue;
      const entry = cacheRef.current.get(i);
      if (entry?.ready || entry?.error) continue;
      if (inFlight >= maxConcurrent) break;
      loadFrame(i);
      inFlight++;
    }
    },
    [frameCount, loadFrame, maxConcurrent, preferReduced]
  );

  const draw = useCallback(() => {
    const canvasInfo = ensureCanvasSize();
    if (!canvasInfo) return;
    const { ctx, w, h } = canvasInfo;

    const idx = targetIndexRef.current;
    const entry = loadFrame(idx);
    warmCache(idx);
    if (!entry.ready) return;
    if (lastDrawnRef.current === idx) return;

    lastDrawnRef.current = idx;
    drawCover(ctx, entry.img, w, h);
  }, [ensureCanvasSize, loadFrame, warmCache]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const initial = 1;
    targetIndexRef.current = initial;
    loadFrame(1);
    warmCache(1);
    scheduleDraw();

    const onResize = () => scheduleDraw();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [frameUrls, loadFrame, scheduleDraw, warmCache]);

  useEffect(() => {
    const resolvedMode = mode ?? "scroll";
    if (resolvedMode !== "scroll") return;
    const p = typeof progress === "number" ? progress : 0;
    const idx = clamp(Math.round(p * (frameCount - 1)) + 1, 1, frameCount);
    targetIndexRef.current = idx;
    scheduleDraw();
  }, [progress, frameCount, mode, scheduleDraw]);

  useEffect(() => {
    const resolvedMode = mode ?? "scroll";
    if (resolvedMode !== "auto") return;

    const resolvedFps = clamp(fps ?? 24, 8, 48);
    const intervalMs = Math.round(1000 / resolvedFps);
    let current = targetIndexRef.current || 1;

    const id = window.setInterval(() => {
      current = current + 1;
      if (current > frameCount) current = 1;
      targetIndexRef.current = current;
      scheduleDraw();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [fps, frameCount, mode, scheduleDraw]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-label="VOLTERRA X cinematic sequence"
      role="img"
    />
  );
}
