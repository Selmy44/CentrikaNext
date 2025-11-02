type Product = { title: string; description: string; cta: string };
export type ProductsDict = { title: string; items: Product[] };

export default function Products({ dict }: { dict: ProductsDict }) {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60" style={{
        background: "radial-gradient(600px 300px at 20% 0%, rgba(255,255,255,0.06), transparent), radial-gradient(700px 300px at 100% 10%, rgba(255,255,255,0.04), transparent)"
      }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">{dict.title}</h2>
            <p className="text-sm text-muted mt-1">Platforms crafted for transport, events, and seamless customer experiences.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {dict.items.map((p, idx) => (
            <div key={p.title} className="card-animated">
              <article className="inner p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="hex-badge">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      {idx === 0 && <path d="M3 6h18v12H3z"/>}
                      {idx === 1 && <path d="M6 4h12v16H6z"/>}
                      {idx === 2 && <path d="M4 7l8-4 8 4v10l-8 4-8-4z"/>}
                      {idx === 3 && <path d="M7 4h10l3 4v12H4V4z"/>}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                </div>
                <p className="text-sm text-muted flex-1">{p.description}</p>
                <a className="btn btn-primary mt-5 w-max" href="#">{p.cta}</a>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
