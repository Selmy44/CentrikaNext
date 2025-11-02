"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export default function ParticlesJSBackground() {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    // respect reduced motion
    if (typeof window !== "undefined") {
      const prefers = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefers) setEnable(true);
    }
  }, []);

  useEffect(() => {
    if (!enable) return;
    const host = document.getElementById("particles-js");
    if (!host) return;
    let raf = 0;
    let tx = 0, ty = 0, rx = 0, ry = 0; // target transforms
    let curX = 0, curY = 0, curRX = 0, curRY = 0;

    function lerp(a:number,b:number,t:number){ return a + (b-a)*t; }

    const onMove = (e: PointerEvent) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const nx = (e.clientX / vw) - 0.5;
      const ny = (e.clientY / vh) - 0.5;
      tx = nx * 24; // px (stronger parallax)
      ty = ny * 18; // px
      rx = -ny * 1.6; // deg
      ry = nx * 1.6;  // deg
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const vel = (y - lastY) * 0.12; // small vertical parallax
      ty += vel;
      lastY = y;
    };

    function frame(){
      raf = requestAnimationFrame(frame);
      curX = lerp(curX, tx, 0.1);
      curY = lerp(curY, ty, 0.1);
      curRX = lerp(curRX, rx, 0.14);
      curRY = lerp(curRY, ry, 0.14);
      host.style.transform = `translate3d(${curX}px, ${curY}px, 0) rotateX(${curRX}deg) rotateY(${curRY}deg)`;
    }
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); };
  }, [enable]);

  if (!enable) return null;

  return (
    <>
      <div id="particles-js" aria-hidden />
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          try {
            // @ts-expect-error - particlesJS is loaded from CDN
            if (window.particlesJS) {
              // @ts-expect-error - particlesJS is loaded from CDN
              window.particlesJS.load("particles-js", "/particles.json", function () {});
            }
          } catch {}
        }}
      />
    </>
  );
}
