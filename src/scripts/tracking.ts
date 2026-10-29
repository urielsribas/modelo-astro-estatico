/**
 * Eventos de conversão. Qualquer elemento com data-track="nome" dispara o evento
 * no clique. Links wa.me e tel: são rastreados automaticamente.
 * Envia para dataLayer (GTM), gtag (GA4) e fbq (Meta Pixel) se existirem.
 */
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void };
const w = window as W;

export function track(event: string, params: Record<string, unknown> = {}) {
  w.dataLayer?.push({ event, ...params });
  w.gtag?.("event", event, params);
  if (w.fbq) {
    const metaMap: Record<string, string> = { whatsapp_click: "Contact", phone_click: "Contact", form_submit: "Lead" };
    w.fbq("track", metaMap[event] ?? "CustomEvent", params);
  }
}

document.addEventListener("click", (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-track]");
  if (!el) return;
  const href = el.getAttribute("href") ?? "";
  const name =
    el.dataset.track ??
    (href.includes("wa.me") ? "whatsapp_click" : href.startsWith("tel:") ? "phone_click" : null);
  if (name) track(name, { location: el.dataset.trackLocation ?? location.pathname });
});
