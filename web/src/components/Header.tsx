"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
type NavKey = "Personal" | "Business" | "Private" | "About" | null;

const NAV = (dict: HeaderDict) => [
  { label: dict.nav.personal, key: "Personal", href: "/" as const },
  { label: dict.nav.business, key: "Business", href: "#" as const },
  { label: dict.nav.private, key: "Private", href: "#" as const },
  { label: dict.nav.about, key: "About", href: "#" as const },
];

const MEGA = (dict: HeaderDict): Record<Exclude<NavKey, null>, { sections: MegaSection[] }> => ({
  Personal: { sections: dict.mega.personal },
  Business: { sections: dict.mega.business },
  Private: { sections: dict.mega.private },
  About: { sections: dict.mega.about },
});

type MegaSection = { title: string; links: { label: string; href: string }[] };
export type HeaderDict = {
  nav: { personal: string; business: string; private: string; about: string };
  actions: { search: string; login: string };
  featured: { badge: string; title: string; desc: string; cta: string };
  mega: {
    personal: MegaSection[];
    business: MegaSection[];
    private: MegaSection[];
    about: MegaSection[];
  };
};

export default function Header({ dict }: { dict: HeaderDict }) {
  const [openMobile, setOpenMobile] = useState(false);
  const [active, setActive] = useState<NavKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openWithDelay = (key: NavKey) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActive(key), 80);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setActive(null), 120);
  };

  const params = useParams();
  const locale = (params?.locale as string) || "en";
  return (
    <header className={`sticky top-0 z-50 border-b border-white/10 bg-background/80 header-blur ${scrolled ? "shadow-sm" : "shadow-none"}`}>
      <div
        className="mx-auto container px-4 sm:px-6 lg:px-8"
        onMouseLeave={closeWithDelay}
      >
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image src="/brand/centrika-logo.png" alt="Centrika" width={28} height={28} />
              <span className="font-semibold text-lg">Centrika</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 uppercase tracking-wide text-sm" role="menubar" aria-label="Main">
            <Link href={`/${locale}`} className="text-foreground/80 hover:text-foreground">Home</Link>
            {NAV(dict).map((item) => (
              <button
                key={item.key}
                onMouseEnter={() => openWithDelay(item.key as NavKey)}
                onFocus={() => setActive(item.key as NavKey)}
                className={`nav-item hover:text-foreground px-1 ${active === (item.key as NavKey) ? "text-foreground" : "text-foreground/80"}`}
                aria-expanded={active === (item.key as NavKey)}
                aria-haspopup
                role="menuitem"
              >
                <span>{item.label}</span>
                <svg className="chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            ))}
            <Link href={`/${locale}#contact`} className="text-foreground/80 hover:text-foreground">Contacts</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <button className="icon-btn" aria-label={dict.actions.search} onClick={() => setSearchOpen(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            </button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-background-soft"
            aria-label="Toggle menu"
            onClick={() => setOpenMobile((v) => !v)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={openMobile ? "M18 6L6 18M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"} />
            </svg>
          </button>
        </div>

        {active && (
          <div className="hidden md:block" onMouseEnter={() => openWithDelay(active)} onMouseLeave={closeWithDelay}>
            <div className="submenu-bar">
              <div className="submenu-panel">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                  {MEGA(dict)[active].sections.map((sec) => (
                    <div key={sec.title}>
                      <div className="font-semibold text-foreground mb-3">{sec.title}</div>
                      <ul className="space-y-2 text-sm">
                        {sec.links.map((l) => (
                          <li key={l.label}>
                            <Link href={l.href} className="submenu-link">
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {openMobile && (
        <div className="md:hidden border-t border-black/5 dark:border-white/10">
          <div className="px-4 py-4 space-y-2">
            <Link href={`/${locale}`} className="block py-2 text-foreground/90">Home</Link>
            {NAV(dict).map((item) => (
              <Link key={item.key} href={item.href} className="block py-2 text-foreground/90">
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label={dict.actions.search}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
              </button>
            </div>
          </div>
        </div>
      )}


      {searchOpen && (
        <div className="fixed inset-0 z-60 bg-black/40" onClick={() => setSearchOpen(false)}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20" onClick={(e) => e.stopPropagation()}>
            <div className="card p-4">
              <label className="block text-sm font-medium mb-2">{dict.actions.search}</label>
              <input
                autoFocus
                type="text"
                placeholder="Rechercher des produits, des services..."
                className="w-full rounded-md border border-black/10 dark:border-white/10 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
              />
              <div className="mt-4 text-sm text-muted">Populaire : Cartes de crédit, Comptes, Crédits</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
