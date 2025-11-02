"use client";

import { useEffect, useRef } from "react";

export type InteractiveCardItem = {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export function InteractiveCards({
  items,
  staggerMs = 40,
}: {
  items: InteractiveCardItem[];
  staggerMs?: number;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="i-grid">
          {items.map((item, i) => (
            <Card key={i} item={item} delay={i * staggerMs} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item, delay }: { item: InteractiveCardItem; delay: number }) {
  const ref = useRef<HTMLAnchorElement | HTMLDivElement | null>(null);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!el || prefersReduced.current) return;
    

    let raf = 0;
    // use Event as the listener parameter type so it matches addEventListener's overloads,
    // then narrow to PointerEvent inside the handler.
    const handle = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = el.getBoundingClientRect();
      const x = (pe.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
      const y = (pe.clientY - rect.top) / rect.height - 0.5;
      const rotX = Math.max(Math.min(-y * 4, 4), -4);
      const rotY = Math.max(Math.min(x * 4, 4), -4);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tiltX", rotX.toFixed(2) + "deg");
        el.style.setProperty("--tiltY", rotY.toFixed(2) + "deg");
      });
    };
    const reset = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--tiltX", "0deg");
      el.style.setProperty("--tiltY", "0deg");
    };

    el.addEventListener("pointermove", handle);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", handle);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  const content = (
    <div className="i-card" style={{ animationDelay: `${delay}ms` }}>
      {item.icon && <div className="i-card-icon" aria-hidden>{item.icon}</div>}
      <div className="i-card-title">{item.title}</div>
      {item.subtitle && <div className="i-card-sub">{item.subtitle}</div>}
      <div className="i-card-cta" aria-hidden>
        <span>View</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={item.href} className="i-card-wrap" tabIndex={0}>
        {content}
      </a>
    );
  }
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="i-card-wrap" tabIndex={0} role="button" onClick={item.onClick}>
      {content}
    </div>
  );
}

// Sample usage data for the page
export const SAMPLE_CARDS: InteractiveCardItem[] = [
  { title: "Analytics", subtitle: "Realtime", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3v18h18"/><path d="M7 13l3 3 7-7"/></svg>, href: "#" },
  { title: "Payments", subtitle: "PCI‑DSS", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>, href: "#" },
  { title: "Mobility", subtitle: "Transit", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></svg>, href: "#" },
  { title: "Security", subtitle: "ISO 27001", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"/></svg>, href: "#" },
  { title: "Events", subtitle: "Ticketing", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>, href: "#" },
  { title: "APIs", subtitle: "SDKs", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>, href: "#" },
  { title: "Support", subtitle: "24/7", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 13a9 9 0 1 1 18 0v5a2 2 0 0 1-2 2h-3v-6h5"/><path d="M3 18a2 2 0 0 0 2 2h3v-6H3"/></svg>, href: "#" },
  { title: "Insights", subtitle: "Dashboards", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12h4v8H3zM10 3h4v17h-4zM17 9h4v11h-4z"/></svg>, href: "#" },
];
