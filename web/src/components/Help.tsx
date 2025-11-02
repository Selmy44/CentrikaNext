export type HelpDict = { title: string; items: { title: string; desc: string }[] };

export default function Help({ dict }: { dict: HelpDict }) {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{dict.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {dict.items.map((i) => (
            <div key={i.title} className="card p-5">
              <div className="text-lg font-semibold">{i.title}</div>
              <p className="text-sm text-muted mt-1">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
