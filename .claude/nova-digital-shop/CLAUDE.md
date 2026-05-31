@AGENTS.md

## Regola: Documento di progetto prima di ogni implementazione

Prima di sviluppare qualsiasi nuova funzionalità o implementazione:
1. Verifica la data odierna (che trovi nel system prompt sotto `currentDate`)
2. Crea un documento in `/docs/` nominato `YYYY-MM-DD-nome-funzione.md`
3. Il documento deve descrivere:
   - Obiettivo della funzionalità
   - Approccio tecnico (file da modificare/creare, architettura)
   - Dettaglio delle modifiche previste
4. Mostra il documento all'utente e attendi la sua conferma scritta prima di procedere con l'implementazione

## SEO — Completata il 2026-05-31

Ottimizzazione SEO completa eseguita:

- **CSV prodotti** (`prodotti-shopify.csv`): SEO Title e Description riscritti con keyword ricche per tutti i 10 prodotti
- **Layout globale** (`layout.tsx`): OG tags, Twitter Cards, Robots meta, Organization JSON-LD schema
- **Homepage** (`page.tsx`): WebSite JSON-LD schema + SearchAction
- **Product page** (`products/[handle]/page.tsx`): generateMetadata() dinamico, Product schema, BreadcrumbList
- **Products listing** (`products/page.tsx`): Metadata specifico
- **Collection page** (`collections/[handle]/page.tsx`): generateMetadata() dinamico per ogni collezione, BreadcrumbList
- **Sitemap** (`sitemap.ts`): dinamica, già esistente — URL base corretto
- **Robots** (`robots.ts`): URL base corretto
- **Deploy**: su Vercel (https://mattia-sito.vercel.app)