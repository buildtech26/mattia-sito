# Harvest-style Redesign per NovaFlow Shop

**Data:** 2026-05-31
**Progetto:** NovaFlow Shop

---

## Obiettivo

Replicare lo stile visivo e la struttura del sito Harvest (www.getharvest.com) per il sito NovaFlow Shop, sostituendo i prodotti Harvest con i nostri prodotti digitali (Notion template, Canva template, Automations, Lightroom presets).

## Design System Harvest (da replicare)

### Colori
- **Arancione primario**: `#fa5d00` (CTA, link, accenti)
- **Testo scuro**: `#1d1e1c`
- **Sfondo**: `#ffffff`
- **Sfondo card**: tone caldi/warm
- **Footer**: testo su bianco

### Tipografia
- **Headings**: Besley (serif) - similar a Georgia/Playfair Display
- **Body**: System font stack

### Stile distintivo
- Bordi arrotondati gentili (16px per bottoni)
- Spaziatura generosa
- Card con sfondo warm
- Icone in alto nelle feature card
- Testimonial con layout a card
- Numeri statistici grandi

---

## File da modificare

| File | Modifica |
|------|----------|
| `app/globals.css` | Aggiungere stili Harvest: header, hero, feature-grid, bento-grid, footer, testimonial, animazioni |
| `app/layout.tsx` | Header Harvest-style (logo, nav links, CTA buttons) + footer Harvest-style |
| `app/page.tsx` | Homepage completa: hero, feature-grid, stacked slideshow, bento-grid, trust numbers, testimonial, subfooter |
| `app/products/page.tsx` | Griglia prodotti con stile Harvest |
| `app/products/[handle]/page.tsx` | Pagina prodotto Harvest-style |
| `lib/product-content.ts` | Espandere contenuti per tutte le sezioni |

---

## Struttura Homepage

### 1. Header (Navigation)
- Logo "NovaFlow" a sinistra
- Nav links: Products, Categories, Downloads
- CTA buttons: "Book a demo" (ghost) + "Shop Now" (primary arancione)

### 2. Hero Section
- Headline: "Turn your ideas into" + rotating word (products, templates, presets, workflows)
- Subheading: descrizione del negozio
- Email signup: "Your email" + "Get started" → iscrizione newsletter
- Hero image: placeholder/screenshot del prodotto
- Customer logos: marche fittizie (placeholder)

### 3. Feature Grid ("All your products in one marketplace")
- 4 card: Notion Templates, Canva Templates, Automations, Lightroom Presets
- Ogni card: icona, titolo, descrizione, "Learn more"

### 4. Stacked Slideshow (categorie in dettaglio)
- Tab per ogni categoria con feature list + screenshot

### 5. Bento Grid ("Everything you need to boost your creativity")
- Griglia mista 4+6 colonne con highlight prodotti

### 6. Trust Numbers
- Stats: prodotti, template, clienti felici, uptime

### 7. Testimonials (placeholder)
- Card carosello con recensioni fittizie

### 8. Subfooter CTA
- "Ready to boost your productivity?" + "Try NovaFlow free"

### 9. Footer
- 3 colonne: Shop, Community, Company
- Social links
- Copyright

---

## Dettaglio implementazione

### `globals.css`
- Variabili colore Harvest
- Header styles (rb-nav, rb-nav-wrap)
- Hero styles (hero-columns, hero-headline)
- Feature grid styles (.feature-grid, .feature-block.warm)
- Bento grid styles
- Testimonial carousel
- Footer styles
- Animazioni rotating word, counter, ecc.
- Media queries responsive

### `layout.tsx`
- Header con navigazione a mega-menu (desktop) / hamburger (mobile)
- Footer con 3 colonne + social + legal
- Mantenere CartProvider e componenti carrello

### `page.tsx`
- Sostituire intera homepage con layout Harvest
- Contenuti placeholder per prodotti NovaFlow
- Include animazione rotating words, counter, carosello

### Attenzione ai dettagli Harvest
- Skip to content link
- Animazione parole che ruotano nell'hero
- Counter animati sulle statistiche
- Carosello testimonials scroll orizzontale
- Arrow buttons per scroll
- Bento grid asimmetrico
- Subfooter con app download buttons
- Mobile accordion footer