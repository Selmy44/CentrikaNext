"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const locales = ["fr", "en"] as const;

type Locale = typeof locales[number];

function switchLocaleInPath(path: string, to: Locale) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return `/${to}`;
  if (locales.includes(parts[0] as Locale)) {
    parts[0] = to;
  } else {
    parts.unshift(to);
  }
  return `/${parts.join("/")}`;
}

const FLAGS = {
  fr: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="6.67" height="16" fill="#0055A4" rx="1"/>
      <rect x="8.67" y="4" width="6.67" height="16" fill="#FFFFFF"/>
      <rect x="15.33" y="4" width="6.67" height="16" fill="#EF4135" rx="1"/>
      <rect x="2" y="4" width="20" height="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" rx="1"/>
    </svg>
  ),
  en: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" fill="#B22234" rx="1"/>
      <rect x="2" y="4" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="6.46" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="8.92" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="11.38" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="13.85" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="16.31" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="18.77" width="20" height="1.23" fill="#FFFFFF"/>
      <rect x="2" y="4" width="8" height="7.38" fill="#3C3B6E"/>
      <rect x="2" y="4" width="20" height="16" stroke="currentColor" strokeWidth="0.5" opacity="0.15" rx="1"/>
    </svg>
  ),
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const params = useParams();
  const pathname = usePathname() || "/";
  const current = (params?.locale as Locale) || "fr";
  const other: Locale = current === "fr" ? "en" : "fr";
  const href = switchLocaleInPath(pathname, other);

  return (
    <Link 
      href={href} 
      prefetch 
      className={`lang-switcher ${className || ""}`}
      title={other === "en" ? "Switch to English" : "Passer en Français"}
    >
      {FLAGS[other]}
      <span className="lang-label">{other.toUpperCase()}</span>
    </Link>
  );
}
