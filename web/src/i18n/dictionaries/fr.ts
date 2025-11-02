import { Dict } from "@/i18n";

const dict: Dict = {
  header: {
    nav: { personal: "Solutions", business: "Services", private: "Produits", about: "Entreprise" },
    actions: { search: "Recherche", login: "Se connecter" },
    featured: { badge: "À la une", title: "Innovations", desc: "Découvrez nos dernières plateformes et services.", cta: "En savoir plus" },
    mega: {
      personal: [
        { title: "Solutions", links: [
          { label: "Solutions Transport", href: "/solutions/transport" },
          { label: "Solutions Événementielles", href: "/solutions/events" },
        ]},
      ],
      business: [
        { title: "Services", links: [
          { label: "Développement logiciel", href: "/services/software-development" },
          { label: "Centre d’appel", href: "/services/call-center" },
        ]},
      ],
      private: [
        { title: "Produits", links: [
          { label: "Safaribus Cards", href: "/products/safaribus-cards" },
          { label: "Safaribus", href: "/products/safaribus" },
          { label: "TICQet", href: "/products/ticqet" },
          { label: "KeyKiosk", href: "/products/keykiosk" },
        ]},
      ],
      about: [
        { title: "Entreprise", links: [
          { label: "Notre histoire", href: "/company/our-story" },
          { label: "Notre vision & valeurs", href: "/company/values" },
          { label: "Notre équipe", href: "/company/team" },
          { label: "Partenaires", href: "/company/partners" },
          { label: "Carrières", href: "/company/careers" },
        ]},
      ],
    },
  },
  carousel: {
    badge: "Technologie",
    slides: [
      { title: "Bienvenue chez Centrika", subtitle: "Concevoir aujourd’hui les solutions de demain !", cta: "Découvrir les solutions" },
      { title: "Produits plateforme", subtitle: "Du transport aux événements, nos plateformes alimentent les expériences.", cta: "Voir les produits" },
      { title: "Services experts", subtitle: "Logiciels sur mesure et support à l’échelle.", cta: "Voir les services" },
    ],
  },
  products: {
    title: "Nos produits innovants",
    items: [
      { title: "Safaribus", description: "Plateforme de mobilité intelligente pour flottes et billetterie.", cta: "En savoir plus" },
      { title: "Safaribus Card", description: "Carte sans contact sécurisée pour un transit fluide.", cta: "En savoir plus" },
      { title: "TICQet", description: "Billetterie numérique pour événements et lieux.", cta: "En savoir plus" },
      { title: "KeyKiosk", description: "Bornes libre‑service pour paiements et accès.", cta: "En savoir plus" },
    ],
  },
  promos: { titleBase: "À la une", desc: "Derniers lancements et annonces.", cta: "En savoir plus" },
  tools: { title: "Ressources", items: ["Docs", "Statut", "Marque", "Contact"], explore: "Ouvrir" },
  appCta: { title: "Construire avec Centrika", desc: "Intégrez nos plateformes et services dans vos produits.", appStore: "Nous contacter", googlePlay: "Voir la doc" },
  help: {
    title: "Comment pouvons‑nous vous aider ?",
    items: [
      { title: "Contacter les ventes", desc: "Parlez à notre équipe." },
      { title: "Support", desc: "Nous sommes là pour vous aider." },
      { title: "Carrières", desc: "Rejoindre Centrika." },
      { title: "Partenaires", desc: "Travailler avec nous." },
      { title: "Sécurité", desc: "Signaler un problème." },
      { title: "Presse", desc: "Demandes média." },
    ],
  },
  faq: {
    title: "FAQ",
    items: [
      { q: "Que fait Centrika ?", a: "Nous créons des plateformes pour le transport, les événements et l’engagement client, ainsi que des services logiciels sur mesure." },
      { q: "Comment démarrer ?", a: "Contactez les ventes ou explorez nos produits pour trouver la bonne solution." },
      { q: "Proposez‑vous un support entreprise ?", a: "Oui, avec des SLA et des responsables succès dédiés." },
    ],
  },
  footer: {
    copySuffix: "Tous droits réservés.",
    languageLabel: "Langue",
    bankingTitle: "Solutions",
    banking: ["Transport", "Événements", "Support client"],
    servicesTitle: "Services",
    services: ["Développement logiciel", "Centre d’appel"],
    companyTitle: "Produits",
    company: ["Safaribus", "Safaribus Cards", "TICQet", "KeyKiosk"],
    legalTitle: "Entreprise",
    legal: ["Notre histoire", "Notre vision & valeurs", "Notre équipe", "Partenaires", "Carrières"],
  },
};

export default dict;
