# Strategia Email Marketing — SB Food Consulting

> Obiettivo: convertire i contatti raccolti tramite le **schede gratuite** in clienti dell'**Academy** (corsi) e del **Cruscotto dell'Imprenditore**, usando esclusivamente i codici sconto già esistenti.
> Documento di strategia (non implementazione). Ancorato ai prodotti e ai dati reali del backend.

---

## 1. Asset reali di partenza

### Prodotti in vendita
| Prodotto | Prezzo pieno | Con codice | Codice | Note |
|---|---|---|---|---|
| Modulo singolo Academy (1–5) | €19,90 | **€17,91** (−10%) | `SCHEDE10` | `pagamenti.py` `modulo-1..5` = 1990 cent |
| Corso completo (5 moduli) | €94,90 | **€85,41** (−10%) | `SCHEDE10` | `corso-completo` = 9490 cent |
| Cruscotto dell'Imprenditore (guida PDF, 24 pag.) | €25,00 | **€21,25** (−15%) | `CRUSCOTTO15` | `cruscotto-imprenditore` = 2500 cent, tipo `pdf` |

- I due codici sono **già referenziati nel sito** (`strumenti/download-gate.js`) e il checkout Stripe accetta i coupon (`allow_promotion_codes=True` in `backend_sbfc/routes/pagamenti.py`).
- ⚠️ **Da verificare che i coupon siano davvero creati lato Stripe** — se non esistono nel dashboard Stripe, al checkout il cliente non li può applicare. È il prerequisito n°1 prima di inviare qualsiasi email che li menziona.

### Contatti disponibili (backend)
| Sorgente | Tabella | Dati utili | Uso email marketing |
|---|---|---|---|
| Download schede | `LeadStrumento` | `email`, `strumento` (quale scheda), `consenso_marketing`, `consenso_at`, UTM, device, data | **Audience primaria** di questa strategia |
| Form contatti | `Contatto` | nome, email, telefono, `tipo_locale`, `stato` (nuovo→…→chiuso) | Lead caldi B2B, gestiti dal call center (Simone) |
| Acquisti Academy | `Studente` | chi ha già comprato ≥1 modulo | Upsell bundle / nuovi moduli |

> **Regola d'oro:** inviare solo a `LeadStrumento` con `consenso_marketing = true`. Il consenso è tracciato con timestamp (`consenso_at`) — è la nostra prova GDPR.

> ⚠️ **Azione 0 — contare i lead reali** prima di decidere cadenza e aggressività:
> ```sql
> SELECT strumento, COUNT(DISTINCT email) AS lead
> FROM lead_strumenti
> WHERE consenso_marketing = true
> GROUP BY strumento
> ORDER BY lead DESC;
> ```
> La strategia scala diversamente se sono 80 o 3.000 contatti.

---

## 2. Idea centrale

Il lead ha **assaggiato gratis** una scheda su un problema preciso.
- La **scheda** è il cucchiaino.
- Il **modulo Academy** corrispondente è il piatto (la Challenge da 14–30 giorni che risolve davvero quel problema).
- Il **Cruscotto** (€21,25) è la porta d'ingresso economica: trasforma un lead in cliente pagante a basso rischio → poi è più facile vendergli l'Academy.

**Non vendiamo tutto a tutti: abbiniamo l'offerta alla scheda scaricata.**

### Mappa scheda → offerta
| Scheda scaricata (`strumento`) | Dolore percepito | Modulo Academy da spingere | Prodotto ponte |
|---|---|---|---|
| `scheda-food-cost`, `quiz-numeri` | "Non so se guadagno davvero" | **Mod. 01 Controllo + 02 Costi** | **Cruscotto** (stesso tema: i numeri → conversione naturale) |
| `checklist-apertura-chiusura`, `manuale-operativo`, `checklist-pre-servizio`, `autovalutazione-team` | "Dipende tutto da me, non riesco a delegare" | **Mod. 03 Blocchi + 04 Accoglienza** | Corso completo |
| `scheda-ricetta` (+ checklist apertura) | "Sto per aprire / ho appena aperto" | **Mod. 05 Lancio** | Corso completo |

Il **Cruscotto** è trasversale (guida per qualsiasi imprenditore) ma converte meglio sul segmento **"numeri"**: stesso argomento, prezzo basso, sconto più alto (−15%).

### Tre segmenti operativi
1. **NUMERI** → food-cost, quiz-numeri
2. **SISTEMA** → checklist apertura/chiusura, manuale operativo, pre-servizio, autovalutazione team
3. **LANCIO** → scheda ricetta, checklist apertura

---

## 3. Sequenza di nurture (automatica, una email a settimana)

Parte dal giorno del download. **6 email, una a settimana** (cadenza fissa a 7 giorni → i lead ricevono al massimo una nostra email a settimana). L'email 0 (grazie + PDF + micro cross-sell Cruscotto) **esiste già** in `lead_strumenti.py`; questa sequenza la costruisce sopra e non conta nella cadenza settimanale.

**Ogni email ha un bottone (CTA) unico e cliccabile:** o porta a **comprare** un prodotto, o a **scaricare gratis una scheda che il lead non ha ancora** (usiamo il campo `strumento` per sapere quali possiede). Nessuna email "a vuoto": sempre un'azione da fare.

| # | Giorno | Oggetto (esempio) | Obiettivo | Bottone CTA |
|---|---|---|---|---|
| 0 | 0 | "Ecco la tua [scheda] 📎" | Consegna PDF (già attiva) | **↓ Scarica il PDF** |
| 1 | +7 | "Il modo giusto di usare la [scheda]" | Valore + engagement | **↓ Prendi anche la [altra scheda] gratis** (una che non ha) |
| 2 | +14 | "Il problema che questa scheda NON risolve da sola" | Aprire il gap → presentare il modulo | **→ Scopri il Modulo 0X** |
| 3 | +21 | "Da €25 a controllo totale in 30 min al mese" | **Vendita Cruscotto** (tripwire) | **🛒 Prendi il Cruscotto a €21,25** (`CRUSCOTTO15`) |
| 4 | +28 | "Le 14 azioni che cambiano il tuo [tema]" | **Vendita modulo** matchato al segmento | **🛒 Attiva il Modulo 0X a €17,91** (`SCHEDE10`) |
| 5 | +35 | "Perché prendere tutto il percorso conviene" | **Upsell bundle** | **🛒 Prendi il corso completo a €85,41** (`SCHEDE10`) |
| 6 | +42 | "Ultimo richiamo sul percorso" | Chiusura / recap offerta | **🛒 [prodotto più adatto al segmento]** |

→ Sequenza completa in **6 settimane**, una email a settimana.

**Regole della sequenza:**
- **Iscrizione legata alla persona (email), non al download.** Un lead entra nella sequenza **una sola volta**, al primo download. Se in seguito scarica un'**altra** scheda, riceve solo l'email 0 di consegna di quella scheda ma **NON viene re-iscritto**: resta al punto in cui è già arrivato. → nessuna email doppia. Tecnicamente: la tabella `EmailSequenza` ha una riga unica per `email`; il download controlla "esiste già una sequenza per questa email?" e in caso affermativo non ne crea un'altra.
- Il nuovo download **aggiorna** i dati del lead (schede possedute, eventuale segmento) senza toccare la posizione nella sequenza — così le CTA "scarica una scheda che non hai" restano corrette.
- Chi compra un prodotto **esce dal ramo che vende quel prodotto** (niente email che vendono ciò che ha già).
- Personalizzazione minima: `[scheda]`, `[altra scheda]` e `Modulo 0X` dipendono dal segmento (NUMERI/SISTEMA/LANCIO) e dalle schede già possedute.
- Tono: pratico, concreto, "da ristoratore a ristoratore". Nessun tecnicismo, focus sul tempo/soldi risparmiati (coerente con il tono food & hospitality).

---

## 4. Campagna broadcast sul backlog (contatti già in DB)

I lead già raccolti non passano dalla sequenza automatica → serve una **campagna di riattivazione one-shot**, **3 email in 10 giorni**, con i **soli codici esistenti**:

1. **Riattivazione + valore** — "Abbiamo trasformato le schede in un percorso completo": annuncio dell'Academy, nessuna pressione, si ricorda chi siamo e cosa hanno scaricato.
2. **Offerta** — presentazione dell'offerta principale del loro segmento:
   - segmento NUMERI → **Cruscotto `CRUSCOTTO15` (€21,25)** come primo passo + Mod. 01/02;
   - segmenti SISTEMA / LANCIO → **modulo matchato `SCHEDE10` (€17,91)** o corso completo (€85,41).
3. **Chiusura** — recap dell'offerta + spinta finale sul prodotto più adatto.

**Urgenza senza codici nuovi:** poiché usiamo solo `SCHEDE10`/`CRUSCOTTO15`, l'urgenza si crea sul **momento** ("apertura del percorso", "posti/edizione", finestra della campagna), non su una scadenza finta del codice. Se in futuro si vuole una vera scadenza, si può impostare una *data di fine* sul coupon in Stripe — ma resta fuori da questa strategia per scelta.

---

## 5. KPI e misurazione (infrastruttura già presente)

Il gestionale ha già la sezione **Email con statistiche Resend** (consegna/aperture/click via webhook `POST /api/webhook/resend`, modello `EmailInvio`, `routes/email_stats.py`).

Da monitorare per ogni email:
- **Deliverability**: % consegnate, bounce, spam.
- **Open rate** — target IT sano: >35%.
- **Click rate** — target: >3%.
- **Conversioni Stripe attribuite** — la metrica che conta. Attribuzione pulita tramite:
  - UTM `utm_source=email&utm_campaign=<nome>` sui link,
  - lettura dei coupon usati nei pagamenti (`SCHEDE10` / `CRUSCOTTO15`).

**Suppression list** (obbligatoria): escludere chi ha già comprato quel prodotto (`Studente`, `Pagamento`) e gestire l'unsubscribe (obbligo legale + protezione della reputazione del dominio su Resend).

---

## 6. Cosa serve tecnicamente per eseguirla (roadmap, non fatta qui)

1. **Verificare/creare i coupon in Stripe**: `SCHEDE10` (−10% su prodotti Academy), `CRUSCOTTO15` (−15% sul Cruscotto). Prerequisito assoluto.
2. **Motore di invio sequenze**: oggi il backend ha `services/email_service.py` + Resend, ma **non** un sistema di sequenze schedulate. Da aggiungere:
   - tabella `EmailSequenza` **con riga unica per `email`** (campi: email, segmento, step corrente, `prossimo_invio_at`, stato) → è ciò che impedisce le email doppie;
   - all'atto del download: se **non** esiste già una sequenza per quell'email → creala (step 0); se esiste già → **non** ri-iscrivere, aggiorna solo schede possedute/segmento;
   - job giornaliero (cron Railway) che seleziona le sequenze con `prossimo_invio_at <= oggi`, invia l'email dello step, poi fissa `prossimo_invio_at = oggi + 7 giorni` (cadenza settimanale);
   - logica di uscita dal ramo su acquisto (stop email che vendono un prodotto già comprato).
3. **Template email**: 6 (nurture) + 3 (broadcast), declinati sui 3 segmenti. Coerenti con i template esistenti in `backend_sbfc/templates/`.
4. **Link con UTM + coupon** in ogni CTA per l'attribuzione.
5. **Unsubscribe + suppression** integrati.

---

## 7. Sintesi in una riga

Segmentiamo i lead per **scheda scaricata** → li nutriamo con **una email a settimana per 6 settimane**, ognuna con un bottone (compra o scarica una scheda che non ha) → offriamo prima il **Cruscotto a €21,25** (ingresso facile) e poi il **modulo Academy a €17,91** o il **corso completo a €85,41**, misurando tutto via coupon + UTM. Ogni lead entra nel loop **una sola volta** (iscrizione per email, non per download → niente doppioni). Solo codici esistenti: `SCHEDE10` e `CRUSCOTTO15`.
