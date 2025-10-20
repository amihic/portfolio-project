"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Dot = { id: number; top: number; left: number; delay: number; float: number; sway: number; speed: number };

export default function BackgroundFX() {
  const [vw, setVw] = useState(1920);
  const [vh, setVh] = useState(1080);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 120, damping: 14, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 120, damping: 14, mass: 0.7 });

  const [dots, setDots] = useState<Dot[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // generiši tačkice SAMO na klijentu
    const gen: Dot[] = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 1.2,
      float: 24 + Math.random() * 36,
      sway: 12 + Math.random() * 24,
      speed: 1.2 + Math.random() * 1.1,
    }));
    setDots(gen);

    const onResize = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX - vw / 2) / (vw / 2);
      const ny = (e.clientY - vh / 2) / (vh / 2);
      mx.set(nx);
      my.set(ny);
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <— prazno: izvršava se samo na klijentu, jednom

  const offset = (multX: number, multY?: number) => ({
    x: sx.get() * multX,
    y: sy.get() * (multY ?? multX),
  });

  // Opcija: dok se ne mount-uje, vrati samo prazan container (ili null)
  if (!mounted) {
    return <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none" />;
  }

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none">
      {/* glow blobs */}
      <motion.div style={offset(-48, -32)} className="absolute -top-32 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25"
        animate={{ opacity: [0.18, 0.28, 0.18] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <div className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.8), rgba(99,102,241,0) 70%)" }} />
      </motion.div>

      <motion.div style={offset(40, 28)} className="absolute top-24 -right-28 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-25"
        animate={{ opacity: [0.15, 0.3, 0.15] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
        <div className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(34,211,238,0.75), rgba(34,211,238,0) 70%)" }} />
      </motion.div>

      <motion.div style={offset(-24, 40)} className="absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-20"
        animate={{ opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <div className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(217,70,239,0.7), rgba(217,70,239,0) 70%)" }} />
      </motion.div>

      {/* dots layer with parallax */}
      <motion.div style={offset(18, 14)}>
        {dots.map((d) => (
          <motion.span
            key={d.id}
            className="absolute h-[3px] w-[3px] rounded-full bg-white/30"
            style={{ top: `${d.top}%`, left: `${d.left}%` }}
            animate={{ y: [0, -d.float, 0], x: [0, d.sway, -d.sway, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: d.speed, repeat: Infinity, ease: "easeInOut", delay: d.delay }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35))]" />
    </div>
  );
}
