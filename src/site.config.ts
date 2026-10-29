/**
 * Configuração central do site.
 * Tudo que é dado do cliente fica aqui. Componentes, SEO e schema leem deste arquivo.
 * Valores "[PREENCHER: ...]" precisam ser trocados antes do lançamento.
 */
export const site = {
  name: "[PREENCHER: nome do negócio]",
  url: "https://example.com", // domínio final, sem barra no fim
  lang: "pt-BR",
  locale: "pt_BR",
  description: "[PREENCHER: descrição padrão do site, até 155 caracteres]",
  ogImage: "/og.jpg", // 1200x630 em /public

  // Tipo schema.org: LocalBusiness ou subtipo (Restaurant, Dentist, HairSalon...)
  schemaType: "LocalBusiness",

  contact: {
    phone: "", // formato E.164: +5521999999999
    whatsapp: "", // só números: 5521999999999
    whatsappMessage: "Olá! Vim pelo site e gostaria de mais informações.",
    email: "",
  },

  // NAP idêntico ao Google Business Profile
  address: {
    street: "",
    district: "",
    city: "",
    state: "",
    postalCode: "",
    country: "BR",
  },
  geo: { lat: null as number | null, lng: null as number | null },
  mapsUrl: "",

  // Formato schema.org: "Mo-Fr 09:00-18:00"
  openingHours: [] as string[],
  priceRange: "",

  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
  },

  // Destino dos formulários (ex.: webhook do GoHighLevel). Vazio = formulário desativado.
  formWebhook: "",

  // Tracking: só preencher se estiver no briefing
  tracking: {
    gtmId: "", // GTM-XXXXXXX
    ga4Id: "", // G-XXXXXXXXXX (use GTM OU GA4 direto)
    metaPixelId: "",
  },

  nav: [
    { label: "Início", href: "/" },
    { label: "Contato", href: "/#contato" },
  ],
};

export type Site = typeof site;
