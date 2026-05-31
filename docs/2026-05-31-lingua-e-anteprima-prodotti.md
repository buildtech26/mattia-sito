# Miglioramento prodotti: lingua inglese e anteprima contenuto

**Data:** 2026-05-31
**Progetto:** NovaFlow Shop

---

## Obiettivo

Due miglioramenti per i prodotti digitali:

1. **Uniformare la lingua in inglese** — alcune descrizioni e titoli sono in italiano (es. "Fattura Automatica", "Prendi il controllo delle tue finanze"), vanno tradotti.
2. **Aggiungere anteprima del prodotto** — mostrare all'utente cosa riceve quando acquista (screenshot, mockup, "what's inside"), migliorando la trasparenza e la conversione.

---

## 1. Traduzioni in inglese

### File da modificare: `prodotti-shopify.csv`

| Prodotto | Cosa cambia |
|----------|-------------|
| **Finance & Budget Tracker** | Descrizione italiana → inglese |
| **Fattura Automatica** | Nome da "Fattura Automatica (Make + Google Sheets)" → "Auto Invoice (Make + Google Sheets)", descrizione italiana → inglese |
| **Tutti i prodotti** | SEO Title da "Schedule your life..." a titoli specifici per ogni prodotto |

### SEO Title da correggere

Attualmente TUTTI i prodotti hanno lo stesso SEO Title: `"Schedule your life with this comprehensive Notion dashboard"` — errato per Canva, Automation e Lightroom.

Verranno riscritti con titoli pertinenti per ogni categoria.

---

## 2. Anteprima prodotto

### Cosa manca oggi

La pagina prodotto (`products/[handle]/page.tsx`) mostra:
- Immagini (placeholder)
- Titolo e prezzo
- Descrizione HTML
- "What's included" statico generico

Manca:
- **Screenshot/mockup reali** di ciò che si riceve
- **Lista dettagliata** dei file inclusi (es. "20 .xmp files", "PDF guide", "link to template")
- **Anteprima visiva** interattiva o gallery

### Approccio tecnico

Creeremo un concetto di **"Digital Product Preview"** — una sezione nella pagina prodotto che mostri:

1. **Gallery immagini** (già presente ma da popolare con immagini reali invece di placeholder)
2. **What's Inside** — lista dettagliata dei file/contenuti specifici del prodotto
3. **Preview mockup** — immagine che mostra il prodotto "in azione" (es. il template Notion aperto, i preset applicati a una foto)

### File da modificare

| File | Modifica |
|------|----------|
| `prodotti-shopify.csv` | Traduzioni in inglese, correzioni SEO title |
| `app/products/[handle]/page.tsx` | Aggiungere sezione "What's Inside" dinamica per tipo di prodotto |
| Eventuale `lib/product-content.ts` | Mappatura contenuti per tipo di prodotto (cosa include ogni prodotto) |

### Dettaglio "What's Inside" per categoria

**Notion Templates:**
- Template Notion duplicabile
- PDF guide all'installazione
- Video tutorial (link)

**Canva Templates:**
- 50 template Canva modificabili
- Link al brand kit
- Guida rapida PDF

**Automations (Make):**
- Blueprint Make (.json)
- Istruzioni configurazione PDF
- Video walkthrough (link)

**Lightroom Presets:**
- 15/20 file .xmp/.dng
- Guida installazione PDF
- Before/After esempi

---

## Prossimi passi

1. ✅ Tu approvi il piano
2. Aggiorno il CSV con traduzioni e SEO title
3. Creo il file di configurazione "what's inside" per tipo
4. Aggiorno la pagina prodotto con anteprima dinamica
5. Ricarico i prodotti su Shopify