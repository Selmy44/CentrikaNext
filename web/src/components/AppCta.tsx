import Image from "next/image";

export type AppCtaDict = { title: string; desc: string; appStore: string; googlePlay: string };

export default function AppCta({ dict }: { dict: AppCtaDict }) {
  return (
    <section className="py-10 md:py-16 bg-background-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{dict.title}</h2>
          <p className="text-muted mt-2 max-w-prose">{dict.desc}</p>
          <div className="mt-4 flex gap-3">
            <a className="btn btn-ghost" href="#">{dict.appStore}</a>
            <a className="btn btn-ghost" href="#">{dict.googlePlay}</a>
          </div>
        </div>
        <div className="relative h-56 md:h-72">
          <Image src="/app-phones.svg" alt="App" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
