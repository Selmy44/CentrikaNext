"use client";

import { useEffect, useRef } from "react";

// Lightweight canvas particles connecting to nearest neighbors (constellation)
// - Renders behind content; respects prefers-reduced-motion
// - Color adapts to theme via CSS variables read from computed styles
export default function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // no particles for reduced motion

    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize(){
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize); ro.observe(document.body);

    // Theme-aware colors from CSS variables
    const baseHue = 225.0; // fallback blue hue

    const N = Math.min(160, Math.floor(w * h / 11000));
    const pts: {x:number;y:number;vx:number;vy:number;shape:number;rot:number}[] = [];
    for (let i=0;i<N;i++){
      pts.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.35,
        vy: (Math.random()-0.5)*0.35,
        shape: Math.random()<0.2 ? 1 : 0, // 0 circle, 1 triangle
        rot: Math.random()*Math.PI*2,
      });
    }

    const mouse = { x: w*0.5, y: h*0.5, active: false };
    const onMove = (e: PointerEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerleave", onLeave);

    // Scroll parallax influence
    let lastY = window.scrollY; let scrollVel = 0;
    const onScroll = () => { const y = window.scrollY; scrollVel = (y - lastY) * 0.02; lastY = y; };
    window.addEventListener('scroll', onScroll, { passive: true });

    let raf = 0;
    const t0 = performance.now();
    function frame(){
      raf = requestAnimationFrame(frame);
      const t = (performance.now() - t0) / 1000;
      ctx.clearRect(0,0,w,h);

      // Update
      for (const p of pts){
        p.x += p.vx; p.y += p.vy + scrollVel*0.3; p.rot += 0.01*(p.shape); // triangles rotate
        if (p.x < -20) p.x = w+20; if (p.x > w+20) p.x = -20;
        if (p.y < -20) p.y = h+20; if (p.y > h+20) p.y = -20;

        // Very light mouse gravity
        if (mouse.active){
          const dx = mouse.x - p.x, dy = mouse.y - p.y; const d = Math.hypot(dx,dy) + 0.001;
          const f = Math.min(40/d, 0.12);
          p.vx += (dx/d)*f*0.08; p.vy += (dy/d)*f*0.08;
        }
      }

      // Draw links with animated hue shift
      for (let i=0;i<N;i++){
        for (let j=i+1;j<i+8 && j<N;j++){
          const a = pts[i], b = pts[(i+j)%N];
          const dx = a.x-b.x, dy = a.y-b.y; const d = Math.hypot(dx,dy);
          if (d < 140){
            const hue = baseHue + Math.sin(t*0.6 + i*0.15)*18.0;
            ctx.strokeStyle = `hsl(${hue}deg 75% 60%)`;
            ctx.globalAlpha = Math.max(0, 0.22 - d/650);
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
      }

      // Draw dots / triangles
      for (const [idx,p] of pts.entries()){
        const hue = baseHue + Math.sin(t*0.7 + idx*0.12)*22.0;
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = `hsl(${hue}deg 85% 62%)`;
        if (p.shape === 0){
          ctx.beginPath(); ctx.arc(p.x,p.y,1.2,0,Math.PI*2); ctx.fill();
        } else {
          ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
          ctx.beginPath(); ctx.moveTo(0,-3); ctx.lineTo(2.6,1.5); ctx.lineTo(-2.6,1.5); ctx.closePath(); ctx.fill();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    }
    raf = requestAnimationFrame(frame);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerleave", onLeave); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{ position:"fixed", inset:0, zIndex:-3, pointerEvents:"none" }}
    />
  );
}
