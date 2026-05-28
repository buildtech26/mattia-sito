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
