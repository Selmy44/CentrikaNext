export type PromosDict = { titleBase: string; desc: string; cta: string };

export default function Promos({ dict }: { dict: PromosDict }) {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <article key={i} className="relative card overflow-hidden">
            <div className="aspect-5/3 w-full bg-brand-50"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">{dict.titleBase} {i}</h3>
              <p className="text-sm text-muted">{dict.desc}</p>
              <button className="btn btn-ghost mt-4">{dict.cta}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
