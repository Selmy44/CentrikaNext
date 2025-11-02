"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { id: number; title: string; subtitle: string; cta: string; image: string };

export type CarouselDict = { badge: string; slides: { title: string; subtitle: string; cta: string }[] };

export default function Carousel({ dict }: { dict: CarouselDict }) {
  // Map text slides and attach hero images (first slide uses real brand image)
  const BACKS = [
    "/brand/back1.jpeg",
    "/brand/back2.jpeg",
    "/brand/back3.jpeg",
    "/brand/back4.jpeg",
    "/brand/back5.jpeg",
  ];

  const SLIDES: Slide[] = dict.slides.map((s, i) => ({
    id: i + 1,
    ...s,
    image: i === 0 ? "/brand/slide0.png" : BACKS[(i - 1) % BACKS.length],
  }));

  const chipLabels = ["Safaribus Card", "Centrika Platform", "Centrika Services"]; // overlay labels for first 3 slides

  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goto = (i: number) => setIndex((i + SLIDES.length) % SLIDES.length);

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div className="relative rounded-lg ring-1 ring-(--ring) bg-surface overflow-hidden">
          <div className="relative grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="text-xs font-semibold tracking-wider text-brand uppercase">{dict.badge}</div>
              <h2 className="text-3xl md:text-5xl font-semibold mt-2 leading-tight">{SLIDES[index].title}</h2>
              <p className="text-muted mt-3 max-w-prose text-base">{SLIDES[index].subtitle}</p>
              <div className="mt-6 flex items-center gap-2">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.id}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${index === i ? "bg-brand w-8" : "bg-black/10 w-2"}`}
                    onClick={() => goto(i)}
                  />
                ))}
              </div>
            </div>

            {/* Image side with subtle parallax container */}
            <div className="relative h-[360px] md:h-[520px]">
              <div className="absolute inset-0 transition-transform duration-700 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
                <div className="flex h-full" style={{ width: `${SLIDES.length * 100}%` }}>
                  {SLIDES.map((s, i) => (
                    <div key={s.id} className="relative" style={{ width: `${100 / SLIDES.length}%` }}>
                      <Image src={s.image} alt="Hero visual" fill className="object-cover" priority={s.id === 1} />
                      {/* Accent blocks to echo the provided design */}
                      <div className="absolute -top-6 right-16 h-10 w-10 bg-brand/10 rounded-md" />
                      <div className="absolute top-2 right-6 h-8 w-12 bg-brand/20 rounded-md" />
                      {/* Gradient vignette for readability */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-black/10 to-transparent" />
                      {/* Glass chip label bottom-right for each slide */}
                      <div className="absolute bottom-6 right-6 backdrop-blur bg-white/40 text-[#0b1430] rounded-full pl-4 pr-5 py-2 ring-1 ring-white/50 shadow-md flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h.01M11 12h.01M15 12h2"/></svg>
                        <span className="text-sm font-medium">{chipLabels[i] ?? "Centrika"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
