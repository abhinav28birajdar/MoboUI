'use client';

import { ReactNode, useEffect } from 'react';
// import Lenis from 'lenis'; // Optional: smooth scroll library - install with: npm install lenis

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Lenis smooth scroll can be enabled by uncommenting the import and this code:
    // const lenis = new Lenis({
    //   duration: 1.2,
    //   easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    //   orientation: 'vertical',
    //   gestureOrientation: 'vertical',
    //   smoothWheel: true,
    //   touchMultiplier: 2,
    // });
    //
    // function raf(time: number) {
    //   lenis.raf(time);
    //   requestAnimationFrame(raf);
    // }
    //
    // requestAnimationFrame(raf);
    //
    // return () => {
    //   lenis.destroy();
    // };
  }, []);

  return <>{children}</>;
}
