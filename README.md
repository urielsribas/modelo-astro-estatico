# Modelo Astro estático (Modo A)

Base para sites de clientes sem CMS. Padrões em `CLAUDE.md`.

## Novo projeto
1. No GitHub: **Use this template** → repo com o slug do cliente.
2. Preencher `docs/briefing.md` e `docs/sitemap.md`.
3. Ajustar `src/site.config.ts` (dados do cliente) e `src/styles/tokens.css` (cores e fontes).
4. Trocar `name` em `wrangler.jsonc` pelo slug do cliente.
5. Cloudflare → Workers & Pages → Create → Import a repository. Build: `pnpm build`, deploy: `npx wrangler deploy`.

## Comandos
| Comando | O que faz |
|---|---|
| `pnpm dev` | Servidor local |
| `pnpm build` | Checagem de tipos + build em `dist/` |
| `pnpm preview` | Roda o build localmente no runtime da Cloudflare |
| `pnpm deploy` | Build + deploy manual |

## Motion
Atributos prontos (ver `src/styles/motion.css`):
- `data-reveal="up|down|left|right|fade|scale|clip"` entrada ao rolar
- `data-stagger="80"` no pai, atraso escalonado nos filhos
- `data-parallax="0.2"` deslocamento ao rolar
- `data-count="120"` contador animado
- Transição entre páginas via View Transitions (CSS)
- `<Marquee items={[...]} />` faixa rolando

Tudo respeita `prefers-reduced-motion`. Para timelines complexas, adicionar GSAP só no projeto que precisar.
