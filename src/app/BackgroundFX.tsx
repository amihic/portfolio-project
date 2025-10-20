"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Dot = {
  id: number;
  baseTopPct: number;
  baseLeftPct: number;
  ampX: number;
  ampY: number;
  speed: number;
  phase: number;
  r: number;
};

export default function BackgroundFX() {
  const [mounted, setMounted] = useState(false);
  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number | null>(null);

  // Parallax input
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 16, mass: 0.6 });

  useEffect(() => setMounted(true), []);

  // Screen + inputs
  useEffect(() => {
    if (!mounted) return;
    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX - vw / 2) / (vw / 2);
      const ny = (e.clientY - vh / 2) / (vh / 2);
      mx.set(nx);
      my.set(ny);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      const nx = (t.clientX - vw / 2) / (vw / 2);
      const ny = (t.clientY - vh / 2) / (vh / 2);
      mx.set(nx);
      my.set(ny);
    };
    const onScroll = () => {
      const ny = (window.scrollY % vh) / vh;
      my.set(ny * 2 - 1);
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mounted, vw, vh, mx, my]);

  const isCoarse = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia?.("(pointer: coarse)").matches : false),
    []
  );

  const RANGE_BOOST = isCoarse ? 2.1 : 1.5;

  // GENERISANJE TAČAKA — smanjio sam bazni radijus ~15–20% za diskretniji izgled
  useEffect(() => {
    if (!mounted) return;

    const count = isCoarse ? 70 : 55;
    const dots: Dot[] = Array.from({ length: count }).map((_, i) => {
      const r =
        (isCoarse ? 2.2 + Math.random() * 1.6 : 1.6 + Math.random() * 1.2) *
        0.55; // ↓ bilo 0.75 — smanji još ako želiš
      const ampX = (isCoarse ? 36 : 26) + Math.random() * (isCoarse ? 26 : 18);
      const ampY = (isCoarse ? 36 : 26) + Math.random() * (isCoarse ? 26 : 18);
      const speed = (isCoarse ? 1.3 : 1.0) + Math.random() * 0.7;
      return {
        id: i,
        baseTopPct: Math.random() * 100,
        baseLeftPct: Math.random() * 100,
        ampX,
        ampY,
        speed,
        phase: Math.random() * Math.PI * 2,
        r,
      };
    });
    dotsRef.current = dots;
  }, [mounted, isCoarse]);

  // CANVAS CRTANJE
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resizeCanvas = () => {
      canvas.width = Math.floor(vw * dpr);
      canvas.height = Math.floor(vh * dpr);
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();

    let lastTs = performance.now();

    const draw = (ts: number) => {
      const dt = Math.max(0.001, Math.min(0.05, (ts - lastTs) / 1000));
      lastTs = ts;

      ctx.clearRect(0, 0, vw, vh);

      const px = sx.get() * 20 * RANGE_BOOST;
      const py = sy.get() * 20 * RANGE_BOOST;

      const positions: { x: number; y: number; r: number }[] = [];
      for (const d of dotsRef.current) {
        const bx = (d.baseLeftPct / 100) * vw;
        const by = (d.baseTopPct / 100) * vh;

        d.phase += d.speed * dt * 0.9;
        const x = bx + Math.cos(d.phase) * d.ampX + px;
        const y = by + Math.sin(d.phase * 1.1) * d.ampY + py;

        positions.push({ x, y, r: d.r });
      }

      // LINIJE — smanjena providnost i debljina
      const MAX_DIST = isCoarse ? 180 : 140;
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const base = 0.22; // ↓ bilo ~0.5 * (1 - d/MAX_DIST). Manje vidljivo.
            const alpha = base * (1 - dist / MAX_DIST);
            ctx.strokeStyle = `rgba(255,255,255,${alpha * (isCoarse ? 0.45 : 0.55)})`;
            ctx.lineWidth = isCoarse ? 0.6 : 0.5; // ↓ bilo 0.8 / 0.7
            ctx.beginPath();
            ctx.moveTo(positions[i].x, positions[i].y);
            ctx.lineTo(positions[j].x, positions[j].y);
            ctx.stroke();
          }
        }
      }

      // TAČKE — niža providnost
      for (const p of positions) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.28)"; // ↓ bilo 0.85
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, vw, vh, sx, sy, RANGE_BOOST, isCoarse]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Glow blobs */}
      <motion.div
        style={{ x: sx.get() * -40 * RANGE_BOOST, y: sy.get() * -30 * RANGE_BOOST }}
        className="absolute -top-32 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25 will-change-transform"
        animate={{ opacity: [0.22, 0.36, 0.22] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.82), rgba(99,102,241,0) 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: sx.get() * 32 * RANGE_BOOST, y: sy.get() * 24 * RANGE_BOOST }}
        className="absolute top-24 -right-28 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-25 will-change-transform"
        animate={{ opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.78), rgba(34,211,238,0) 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ x: sx.get() * -26 * RANGE_BOOST, y: sy.get() * 30 * RANGE_BOOST }}
        className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20 will-change-transform"
        animate={{ opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(217,70,239,0.72), rgba(217,70,239,0) 70%)",
          }}
        />
      </motion.div>

      {/* CONSTELLATION CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Depth overlay — možeš pojačati do 0.45–0.5 za još diskretnije tačke */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(0,0,0,0.42))]" />
    </div>
  );
}
