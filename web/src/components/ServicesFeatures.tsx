type Feature = { title: string; desc: string; href: string; icon: string };

const FEATURES: Feature[] = [
  { title: "Transport Solutions", desc: "Digital ticketing and payment systems for public transport with QR and contactless validation.", href: "#", icon: "bus" },
  { title: "Events Management", desc: "End‑to‑end event ticketing, real‑time analytics, and seamless attendee experiences.", href: "#", icon: "calendar" },
  { title: "Customer Support", desc: "24/7 multilingual call center with dedicated teams and quality assurance.", href: "#", icon: "headset" },
  { title: "Software Development", desc: "Custom apps and platforms built with robust engineering and cloud‑native tech.", href: "#", icon: "code" },
];

function Icon({ name }: { name: string }) {
  switch (name) {
    case "bus":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h.01M11 12h.01M15 12h2"/><circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></svg>;
    case "calendar":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case "headset":
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 13a9 9 0 1 1 18 0v5a2 2 0 0 1-2 2h-3v-6h5"/><path d="M3 18a2 2 0 0 0 2 2h3v-6H3"/></svg>;
    default:
      return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>;
  }
}

export default function ServicesFeatures() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">Amazing <span className="text-brand">Services & Features</span> For You</h2>
          <div className="mt-2 mx-auto h-1 w-16 bg-brand rounded-full" />
        </div>

        <div className="grid gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <a key={f.title} href={f.href} className="feature-card">
              <div className="feature-card-inner">
                <div className="flex items-center gap-3 mb-3">
                  <div className="feature-icon bg-brand-50 text-brand">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{f.title}</h3>
                </div>
                <p className="text-sm leading-6 text-muted">{f.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-brand">Read More <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
