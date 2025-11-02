"use client";

import { useState } from "react";

const ITEMS = [
  { label: "Open account" },
  { label: "Cards" },
  { label: "Loans" },
  { label: "Exchange rates" },
  { label: "Branch & ATM" },
  { label: "Contact" },
];

export default function QuickActions() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ITEMS.map((i, idx) => (
            <button
              key={i.label}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              className={`card px-4 py-5 text-left transition ${active === idx ? "ring-2 ring-brand" : ""}`}
            >
              <div className="text-sm font-semibold">{i.label}</div>
              <div className="text-xs text-muted mt-1">Explore</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
