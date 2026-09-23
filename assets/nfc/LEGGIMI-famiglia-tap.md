# La famiglia del tap

Tre oggetti, un solo gesto: il cliente avvicina il telefono e succede qualcosa.
Stessa grammatica visiva su tutti — cornice sottile arancio, icona del telefono
con le onde, «Appoggia qui», titolo in Playfair, chiusa in corsivo, firma in
fondo. Cambia solo **dove porta il tap**, e quello lo dice l'icona sopra la firma.

| Pezzo | Formato | Dove sta | Il tap porta a |
|---|---|---|---|
| Placca recensioni | A6, 105×148 | al conto, in cassa | Google, TripAdvisor, TheFork |
| Tag menù | A6, 105×148 | sul tavolo | il menù digitale |
| Placchetta Wi-Fi | A7, 74×105 | sul tavolo o al banco | connessione automatica |

Il Wi-Fi è più piccolo perché in un locale ne basta una o due, mentre menù e
recensioni stanno su ogni tavolo: il formato dice già quanto pesa nella sala.

## I file

Ogni pezzo esiste in due varianti, scura e chiara, come la placca originale.

    placca-nfc-a6.html        menu-a6.html        wifi-a7.html
    placca-nfc-a6-light.html  menu-a6-light.html  wifi-a7-light.html

I PDF pronti per la tipografia sono in `print/`, già con 3 mm di abbondanza
per lato (A6 → 111×154, A7 → 80×111). Si rigenerano aprendo l'HTML e
stampando nel formato corrispondente.

## In vendita nello shop (23 set 2026)

Menù e Wi-Fi si aggiungono alla placca recensioni dal configuratore di
`placca-nfc.html` (blocco «Il resto del tavolo»), con il Kit sala a −10 €.
Prezzi in `backend_sbfc/routes/nfc.py` (`PEZZI`, `KIT`); promozioni in
`PROMOZIONI-FAMIGLIA-TAP.md`.

**Un solo slug per ordine, un URL per tipo di pezzo** — il gestionale li mostra già:

    placca recensioni   tap.html?p=<slug>
    tag menù            tap.html?p=<slug>&t=menu   → apre dritto il menù
    placchetta Wi-Fi    tap.html?p=<slug>&t=wifi   → rete + password da copiare

Il Wi-Fi porta a una pagina e non a un record WPA nel tag: iPhone non legge
le reti Wi-Fi via NFC, e così la password si cambia senza riscrivere il tag.

Foto dello shop in `shop/` (`menu-*.jpg`, `wifi-*.jpg`), generate dagli HTML
di stampa con Puppeteer.

## Ancora aperto

- Menù e Wi-Fi **da soli** (senza placca) non si comprano dal configuratore:
  passano dal box richieste.
- Menù e Wi-Fi **personalizzati** con il logo: solo su preventivo; il PDF
  automatico del gestionale copre soltanto la placca recensioni.
