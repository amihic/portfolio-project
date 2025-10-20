"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      gestureOrientation: "vertical",
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy?.();
    };
  }, []);

  return <ParallaxProvider>{children}</ParallaxProvider>;
}
