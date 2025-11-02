import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

export type FooterDict = {
  copySuffix: string;
  languageLabel: string;
  bankingTitle: string; banking: string[];
  servicesTitle: string; services: string[];
  companyTitle: string; company: string[];
  legalTitle: string; legal: string[];
};

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="mt-20 footer-shell">
      {/* Top area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Powered by / brand */}
          <div className="space-y-4">
            <div className="text-[11px] uppercase tracking-wide text-muted">Powered by</div>
            <div className="flex items-center gap-3">
              <Image src="/brand/centrika-logo.png" alt="Centrika" width={48} height={48} className="rounded-md object-contain" />
              <div className="text-xs text-muted leading-snug max-w-[180px]">Delivering Tomorrow&apos;s solutions Today.</div>
            </div>
          </div>

          {/* Columns using existing info (unchanged content) */}
          <div>
            <div className="text-sm font-semibold text-foreground mb-3">{dict.bankingTitle}</div>
            <ul className="space-y-2 text-sm text-muted">
              {dict.banking.map((label) => (
                <li key={label}><a className="hover:text-foreground" href="#">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground mb-3">{dict.servicesTitle}</div>
            <ul className="space-y-2 text-sm text-muted">
              {dict.services.map((label) => (
                <li key={label}><a className="hover:text-foreground" href="#">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground mb-3">{dict.companyTitle}</div>
            <ul className="space-y-2 text-sm text-muted">
              {dict.company.map((label) => (
                <li key={label}><a className="hover:text-foreground" href="#">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground mb-3">Contact Us</div>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2h4l2 5-3 1a11 11 0 0 0 6 6l1-3 5 2v4a2 2 0 0 1-2 2h-1c-8.8 0-16-7.2-16-16V4a2 2 0 0 1 2-2z"/></svg> 2838</li>
              <li className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2H2v20l7-7h13z"/></svg> +250788123099</li>
              <li className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M16 8a6 6 0 1 1-8 8"/></svg> +250787272036</li>
              <li className="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 7l9 6 9-6"/></svg> info@centrika.rw</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      {/* Bottom strip */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Centrika Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href="#">Terms and Conditions</a>
            <a className="hover:underline" href="#">Privacy</a>
            <span className="text-foreground/60">{dict.languageLabel}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
