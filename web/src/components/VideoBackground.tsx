"use client";

import { useEffect, useMemo, useState } from "react";

export default function VideoBackground() {
  const [enabled, setEnabled] = useState(true);
  const prefersReduced = useMemo(
    () => (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) || false,
    []
  );

  useEffect(() => {
    if (prefersReduced) setEnabled(false);
  }, [prefersReduced]);

  if (!enabled) return null;

  return (
    <video
      aria-hidden
      playsInline
      autoPlay
      muted
      loop
      preload="auto"
      poster="/brand/slide0.png"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -5,
        filter: "saturate(115%) contrast(108%) brightness(100%)",
        pointerEvents: "none",
      }}
    >
      <source src="/brand/back1.mp4" type="video/mp4" />
      <source src="/brand/back2.mp4" type="video/mp4" />
      <source src="/brand/back3.mp4" type="video/mp4" />
      <source src="/brand/back4.mp4" type="video/mp4" />
      <source src="/brand/back5.mp4" type="video/mp4" />
      <source src="/brand/back1.webm" type="video/webm" />
    </video>
  );
}
