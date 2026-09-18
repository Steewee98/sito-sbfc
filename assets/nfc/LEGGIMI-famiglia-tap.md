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

## Cosa manca prima di poterli vendere

1. **Il catalogo del backend** (`routes/nfc.py`) conosce solo le tre placche
   recensioni: 35 base, 59 personalizzata, 79 con menù, 25 la copia extra.
   Menù e Wi-Fi come articoli a sé non esistono ancora.
2. **La micro-pagina** `tap.html` gestisce già più azioni, ma il Wi-Fi ha
   bisogno di una riga sua: iOS e Android si connettono con un profilo WPA
   scritto nel tag, non con un link — va deciso se il tag porta alla pagina o
   contiene direttamente la rete.
3. **Le foto per il negozio**: nello shop ci sono `shop/placca-chiara.jpg` e
   `placca-scura.jpg`. Per menù e Wi-Fi servono le due equivalenti.
