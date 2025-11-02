"use client";

import { useState } from "react";

export type FaqDict = { title: string; items: { q: string; a: string }[] };

export default function Faq({ dict }: { dict: FaqDict }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">{dict.title}</h2>
        <div className="space-y-3">
          {dict.items.map((f, i) => (
            <div key={f.q} className="card">
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between"
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-muted">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && <div className="px-5 pb-5 text-sm text-muted">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
