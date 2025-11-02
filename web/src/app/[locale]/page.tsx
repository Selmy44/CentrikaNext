import Hero from "@/components/Hero";
import ServicesFeatures from "@/components/ServicesFeatures";
import Products from "@/components/Products";
import Partners from "@/components/Partners";
import Help from "@/components/Help";
import Faq from "@/components/Faq";
import { getDictionary } from "@/i18n";

export default async function Home({ params }: { params: { locale: string } }) {
  const dict = await getDictionary(params.locale);
  return (
    <div className="font-sans">
      <Hero dict={{ badge: dict.carousel.badge, slides: dict.carousel.slides }} />
      <ServicesFeatures />
      {/* Interactive cards demo */}
      {/* <InteractiveCards items={SAMPLE_CARDS} /> */}
      <Products dict={dict.products} />
      {/* <Promos dict={dict.promos} /> */}
      <Partners />
      {/* <Tools dict={dict.tools} /> */}
      {/* <AppCta dict={dict.appCta} /> */}
      <Help dict={dict.help} />
      <Faq dict={dict.faq} />
    </div>
  );
}
