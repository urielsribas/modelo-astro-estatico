/**
 * Motion leve, sem dependências (~1 KB). Ver src/styles/motion.css para o uso.
 * Para animações mais complexas (timelines, scroll pinning), adicionar GSAP
 * só no projeto que precisar: `pnpm add gsap`.
 */
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initReveal() {
  document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
    const step = Number(parent.dataset.stagger) || 80;
    parent.querySelectorAll<HTMLElement>("[data-reveal]").forEach((child, i) => {
      if (!child.dataset.revealDelay) child.style.setProperty("--reveal-delay", `${i * step}ms`);
    });
  });
  document.querySelectorAll<HTMLElement>("[data-reveal-delay]").forEach((el) => {
    el.style.setProperty("--reveal-delay", `${el.dataset.revealDelay}ms`);
  });

  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (reduced || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}

function initParallax() {
  const els = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
  if (reduced || !els.length) return;
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) continue;
      const speed = Number(el.dataset.parallax) || 0.2;
      const offset = (r.top + r.height / 2 - vh / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function initCounters() {
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  if (!els.length) return;
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const fmt = new Intl.NumberFormat(document.documentElement.lang || "pt-BR");
    if (reduced) { el.textContent = fmt.format(target); return; }
    const start = performance.now();
    const dur = Number(el.dataset.countDuration) || 1600;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { run(e.target as HTMLElement); io.unobserve(e.target); }
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
}

initReveal();
initParallax();
initCounters();
