import { Dict } from "@/i18n";

const dict: Dict = {
  header: {
    nav: { personal: "Solutions", business: "Services", private: "Products", about: "Company" },
    actions: { search: "Search", login: "Login" },
    featured: { badge: "Featured", title: "Innovations", desc: "Explore our latest platforms and services.", cta: "Learn more" },
    mega: {
      personal: [
        { title: "Solutions", links: [
          { label: "Transport Solutions", href: "/solutions/transport" },
          { label: "Event Solutions", href: "/solutions/events" },
        ]},
      ],
      business: [
        { title: "Services", links: [
          { label: "Software Development", href: "/services/software-development" },
          { label: "Call Center", href: "/services/call-center" },
        ]},
      ],
      private: [
        { title: "Products", links: [
          { label: "Safaribus Cards", href: "/products/safaribus-cards" },
          { label: "Safaribus", href: "/products/safaribus" },
          { label: "Ticqet", href: "/products/ticqet" },
          { label: "KeyKiosk", href: "/products/keykiosk" },
        ]},
      ],
      about: [
        { title: "Company", links: [
          { label: "Our Story", href: "/company/our-story" },
          { label: "Values", href: "/company/values" },
          { label: "Team", href: "/company/team" },
          { label: "Partners", href: "/company/partners" },
          { label: "Careers", href: "/company/careers" },
        ]},
      ],
    },
  },
  carousel: {
    badge: "Technology",
    slides: [
      { title: "Welcome to Centrika", subtitle: "Delivering Tomorrow's Solutions Today!", cta: "Explore solutions" },
      { title: "Platform products", subtitle: "From transport to events, our platforms power experiences.", cta: "View products" },
      { title: "Expert services", subtitle: "Custom software and support designed for scale.", cta: "See services" },
    ],
  },
  products: {
    title: "Our Innovative Products",
    items: [
      { title: "Safaribus", description: "Smart mobility platform for fleets and ticketing.", cta: "Learn more" },
      { title: "Safaribus Card", description: "Secure contactless card for seamless transit.", cta: "Learn more" },
      { title: "TICQet", description: "Digital ticketing for events and venues.", cta: "Learn more" },
      { title: "KeyKiosk", description: "Self‑service kiosks for payments and access.", cta: "Learn more" },
    ],
  },
  promos: { titleBase: "Featured", desc: "Latest launches and announcements.", cta: "Learn more" },
  tools: { title: "Resources", items: ["Docs", "Status", "Brand", "Contact"], explore: "Open" },
  appCta: { title: "Build with Centrika", desc: "Integrate our platforms and services into your products.", appStore: "Get in touch", googlePlay: "See docs" },
  help: {
    title: "How can we help?",
    items: [
      { title: "Contact sales", desc: "Talk to our team." },
      { title: "Support", desc: "We’re here to help." },
      { title: "Careers", desc: "Join Centrika." },
      { title: "Partners", desc: "Work with us." },
      { title: "Security", desc: "Report a concern." },
      { title: "Press", desc: "Media inquiries." },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      { q: "What does Centrika do?", a: "We build platforms for transport, events, and customer engagement, plus custom software services." },
      { q: "How do we get started?", a: "Contact sales or explore our products to find the right fit." },
      { q: "Do you offer enterprise support?", a: "Yes, with SLAs and dedicated success managers." },
    ],
  },
  footer: {
    copySuffix: "All rights reserved.",
    languageLabel: "Language",
    bankingTitle: "Solutions",
    banking: ["Transport", "Events", "Customer Support"],
    servicesTitle: "Services",
    services: ["Software Development", "Call Center"],
    companyTitle: "Products",
    company: ["Safaribus", "Safaribus Cards", "TICQet", "KeyKiosk"],
    legalTitle: "Company",
    legal: ["Our Story", "Our Vision & Values", "Our Team", "Partners", "Careers"],
    insightsTitle: "Insights",
    insights: ["In the news", "Announcements"],
  },
};

export default dict;
