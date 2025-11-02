import Link from "next/link";

export type ToolsDict = { title: string; items: string[]; explore: string };

export default function Tools({ dict }: { dict: ToolsDict }) {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">{dict.title}</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {dict.items.map((title) => (
            <Link key={title} href="#" className="card p-5 hover:ring-black/10 dark:hover:ring-white/20 transition">
              <div className="text-lg font-semibold">{title}</div>
              <div className="text-sm text-muted">{dict.explore}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
