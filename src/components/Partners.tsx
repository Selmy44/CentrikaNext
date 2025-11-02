import Image from "next/image";

type Partner = { name: string; src: string; href?: string };

const PARTNERS: Partner[] = [
  { name: "Virunga Express", src: "/brand/virunga%20express.jpeg" },
  { name: "Trinity Express", src: "/brand/trinity%20express.png" },
  { name: "RITCO", src: "/brand/ritco.jpeg" },
  { name: "Rwanda Cycling", src: "/brand/rwanda%20cycling.jpeg" },
  { name: "FERWABA", src: "/brand/ferwaba.jpeg" },
  { name: "Venue Solutions", src: "/brand/venue%20solutions.png" },
  { name: "UnionPay", src: "/brand/union%20pay.png" },
  { name: "YEGO", src: "/brand/yego.png" },
];

export default function Partners() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold">Our Trusted <span className="text-brand">Partners</span></h2>
          <p className="text-sm text-muted mt-2 max-w-3xl">Proud to work with leading organizations across Rwanda and Africa, delivering excellence together.</p>
        </div>

        <div className="logo-grid">
          {PARTNERS.map((p) => (
            <a key={p.name} className="logo-card" href={p.href || '#'} title={p.name} aria-label={p.name}>
              <Image src={p.src} alt={p.name} width={120} height={80} className="logo-img" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
