# CLAUDE.md — Padrão de sites da agência (Uriel Ribas)

## Stack
- **Framework:** Astro (TypeScript)
- **Hospedagem:** Cloudflare (Workers com static assets), deploy via GitHub → Cloudflare
- **CMS (opcional):** EmDash, só quando o cliente precisa publicar conteúdo
- **Estilo:** CSS próprio com tokens (variáveis CSS). Tailwind só se o projeto pedir.
- **Gerenciador de pacotes:** pnpm

## Dois modos de projeto
Confirme o modo no início de cada projeto, antes de escrever código.

### Modo A — Estático (sem CMS)
- Saída estática (`output: "static"`)
- O conteúdo fica em `src/content/` (Content Collections) ou direto nas páginas
- O cliente não edita. Atualizações são feitas pela agência.

### Modo B — Astro + EmDash (cliente publica)
- Integração `emdash/astro` com D1 (banco) e R2 (mídia)
- Todas as páginas são renderizadas no servidor
- O conteúdo vem de `getEmDashCollection()` (Live Collections)
- Criar um usuário admin para o cliente e documentar o acesso em `docs/acesso-cliente.md`, sem senhas
- Instalar só os plugins necessários e registrar cada um com sua justificativa

## Estrutura de pastas
```
src/
  components/    # componentes reutilizáveis (Header, Footer, CTA, Form...)
  layouts/       # Base.astro (SEO, fontes, scripts de tracking)
  pages/         # rotas
  content/       # (Modo A) conteúdo em Markdown/JSON
  styles/        # tokens.css, global.css
public/          # favicon, robots.txt, imagens fixas
docs/            # briefing.md, sitemap.md, acesso-cliente.md, changelog.md
```

## Entradas de cada projeto (em `docs/`)
- `briefing.md`: cliente, nicho, cidade/região, público, oferta, CTA principal, WhatsApp e telefone, cores, fontes, tom de voz
- `sitemap.md`: páginas, seções e a copy final
- Logos e imagens do cliente em `src/assets/`

Não invente dados do cliente (endereço, telefone, preços, depoimentos, números). Se faltar algo, use `[PREENCHER: ...]` e liste as pendências no final da tarefa.

## SEO (obrigatório)
- `<title>` e `meta description` únicos por página
- Um `<h1>` por página, com hierarquia de headings correta
- Canonical, Open Graph e Twitter Card
- `sitemap.xml` (via @astrojs/sitemap) e `robots.txt`
- Schema JSON-LD: `LocalBusiness` (ou subtipo do nicho) com NAP idêntico ao Google Business Profile, mais `FAQPage` quando houver FAQ
- URLs curtas em minúsculas com hífen
- `alt` descritivo em todas as imagens
- Idioma no `<html lang>`, com hreflang se o site for multilíngue

## Performance e qualidade
- Meta: Lighthouse 95+ em Performance, SEO, Acessibilidade e Boas Práticas (mobile)
- Imagens via `astro:assets` (`<Image />`), em WebP/AVIF, com dimensões definidas
- Pouco JavaScript no cliente. Ilhas (`client:*`) só quando necessário.
- Fontes self-hosted ou com `font-display: swap`
- Layout mobile-first, testado em 360px

## Conversão
- CTA principal visível na primeira dobra
- Botão flutuante de WhatsApp com mensagem pré-preenchida (link `wa.me`)
- Formulários enviam para o destino definido no briefing (ex.: webhook do GoHighLevel), com validação e mensagem de sucesso
- Telefone clicável (`tel:`)

## Tracking
- Scripts (GA4/GTM, Meta Pixel etc.) só se estiverem no briefing, carregados no `Base.astro`
- Eventos: clique no WhatsApp, clique no telefone, envio de formulário

## Deploy
- Branch `main` = produção. Usar branches para mudanças grandes.
- Configuração em `wrangler.jsonc`
- (Modo B) Bindings D1 e R2 declarados no wrangler, com nomes padrão `<cliente>-db` e `<cliente>-media`
- Nunca commitar segredos. Usar `.dev.vars` local (no `.gitignore`) e secrets da Cloudflare.
- Domínio: DNS do cliente na Cloudflare, ou CNAME apontando para o Worker

## Regras de trabalho
- Antes de codar, apresente um plano curto (páginas, componentes, modo A/B) e espere aprovação
- Rode `pnpm build` antes de considerar a tarefa pronta e corrija erros e avisos
- Registre as mudanças em `docs/changelog.md`
- Respostas curtas e em português
