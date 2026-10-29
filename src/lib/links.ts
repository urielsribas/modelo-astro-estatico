import { site } from "@/site.config";

/** Link wa.me com mensagem pré-preenchida. Retorna "" se não houver WhatsApp. */
export function whatsappLink(message: string = site.contact.whatsappMessage): string {
  if (!site.contact.whatsapp) return "";
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Link tel: a partir do telefone em E.164. */
export function phoneLink(): string {
  return site.contact.phone ? `tel:${site.contact.phone}` : "";
}

/** Formata +5521999999999 como (21) 99999-9999 para exibição. */
export function phoneDisplay(): string {
  const d = site.contact.phone.replace(/\D/g, "").replace(/^55/, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return site.contact.phone;
}
