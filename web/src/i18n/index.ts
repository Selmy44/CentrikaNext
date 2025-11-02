export type Dict = {
  header: import("@/components/Header").HeaderDict;
  carousel: { slides: { title: string; subtitle: string; cta: string }[]; badge: string };
  products: { title: string; items: { title: string; description: string; cta: string }[] };
  promos: { titleBase: string; desc: string; cta: string };
  tools: { title: string; items: string[]; explore: string };
  appCta: { title: string; desc: string; appStore: string; googlePlay: string };
  help: { title: string; items: { title: string; desc: string }[] };
  faq: { title: string; items: { q: string; a: string }[] };
  footer: {
    copySuffix: string;
    languageLabel: string;
    bankingTitle: string; banking: string[];
    servicesTitle: string; services: string[];
    companyTitle: string; company: string[];
    legalTitle: string; legal: string[];
  };
};

export async function getDictionary(locale: string): Promise<Dict> {
  switch (locale) {
    case "en":
      return (await import("./dictionaries/en")).default as Dict;
    default:
      return (await import("./dictionaries/fr")).default as Dict;
  }
}
