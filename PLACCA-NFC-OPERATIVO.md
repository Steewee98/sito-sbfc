# Placca NFC — guida operativa (evasione ordini)

> Cosa fare, ordine per ordine, dal pagamento alla spedizione.
> Il negozio è su `placca-nfc.html`, gli ordini si gestiscono in `admin.html` → **Placche NFC**.

---

## 1. Il link da scrivere sul tag

Per ogni ordine il sistema genera uno **slug** (identificativo del locale). Il link è sempre questo, con lo slug al posto della parte finale:

```
https://www.sbfoodconsulting.com/tap.html?p=SLUG-DEL-LOCALE
```

Lo slug si legge nel gestionale, sotto il nome del locale, e nella scheda che si apre con **Dettagli** (dove c'è anche il pulsante **Apri pagina tap** per provarla).

**Esempio reale, già attivo** (ordine di prova, cancellabile):

```
https://www.sbfoodconsulting.com/tap.html?p=trattoria-del-tap-demo-0a63
```

### Perché il link è fatto così

- **Sul tag non finiscono mai i dati del cliente, solo questo indirizzo.** I link recensioni, il menù, i colori stanno nel database e vengono letti al momento del tap.
- **Il tag non si riscrive mai più.** Se il cliente cambia link Google, apre un profilo TheFork o cambia menù, si modifica dal gestionale e la placca già consegnata punta subito alla cosa nuova.
- **Un tag per locale.** Lo slug è unico, quindi due clienti non possono avere lo stesso tag. Se un locale ordina più placche (es. una per tavolo), tutte portano lo **stesso** link: sono copie della stessa placca, non placche diverse.
- **Ogni tap viene contato** e il numero compare nel gestionale, colonna Tap. È il dato da mostrare al cliente per fargli vedere che lo strumento gira.

### Cosa vede il cliente dopo il tap

- **Un solo link recensioni e niente menù** → si apre direttamente la pagina delle recensioni, senza passaggi intermedi.
- **Più link, oppure il menù** → si apre una pagina con il nome del locale e i pulsanti (Google, TripAdvisor, TheFork, Menù), nei colori scelti dal cliente e con il suo logo se lo ha caricato.

---

## 2. Come si scrive il tag

App **NFC Tools** di wakdev (su Android è più comoda per scrivere; su iPhone serve comunque l'app, la lettura invece è nativa).

1. Apri NFC Tools → scheda **Scrivi** → **Aggiungi un record** → **URL/URI**.
2. Incolla il link dell'ordine, per intero, `https://` compreso.
3. **Scrivi**, poi avvicina il tag: su Android l'antenna sta nella parte alta del retro, su iPhone sul bordo superiore.
4. **Prova con un altro telefono**: deve aprire la pagina senza che nessuno installi niente.
5. Metti in **sola lettura** solo alla fine, quando il tag è testato e sta per essere spedito: è irreversibile e serve a evitare che qualcuno lo riscriva. Durante le prove lascialo riscrivibile.

Per un semplice indirizzo basta un **NTAG213** (144 byte). NTAG215 o 216 servono solo se un domani vorrai scriverci contenuti più pesanti, tipo una vCard.

---

## 3. Il giro completo di un ordine

| # | Passo | Dove |
|---|---|---|
| 1 | Il cliente ordina e paga | `placca-nfc.html` → Stripe |
| 2 | Arriva l'avviso per email e l'ordine compare con stato **pagato** | email + gestionale |
| 3 | Solo per le personalizzate: prepari l'anteprima e la mandi al cliente, aspetti l'ok | fuori dal sistema |
| 4 | Scarichi il PDF dalla scheda e lo mandi al tipografo | gestionale, Dettagli → Scarica PDF |
| 5 | Scrivi il tag col link dell'ordine e provi con un telefono | NFC Tools |
| 6 | Sposti lo stato su **in lavorazione**, poi **spedito** e infine **consegnato** | gestionale, menu a tendina |
| 7 | Se in seguito il cliente cambia un link, lo correggi e salvi | gestionale, Dettagli → Salva link |

### Cosa trovi in Dettagli

A sinistra c'è sempre **la grafica dell'ordine**, così non devi ricostruirla dai campi:

- **Versione Base** → l'immagine della placca chiara o scura effettivamente scelta, con il badge della variante e il percorso del file di stampa da usare (`assets/nfc/placca-nfc-a6.html` per la scura, `placca-nfc-a6-light.html` per la chiara).
- **Versioni personalizzate** → la placca ricostruita come l'ha configurata il cliente: colori scelti, testo, logo e foto caricati, e i portali che ha attivato. È la stessa bozza che vedeva lui mentre ordinava, quindi sai subito cosa si aspetta. Logo e foto vanno comunque impaginati a mano sul file di stampa vero.

Sotto l'anteprima c'è il pulsante **Scarica PDF per la stampa**: genera il file da mandare al tipografo, formato **111 × 154 mm**, cioè A6 finito più 3 mm di abbondanza per lato. È vettoriale con i font incorporati, quindi si può ingrandire senza perdere qualità e non serve che il tipografo abbia Playfair o Inter installati. Il nome del file contiene già il locale, per esempio `placca-trattoria-del-tap-A6.pdf`.

Cosa contiene il PDF, a seconda della versione:

- **Base** → la grafica SB Food con la texture di fondo, chiara o scura secondo la scelta.
- **Personalizzate** → i colori del cliente, il suo testo, il suo logo e la sua foto di sfondo, e solo le icone dei portali che ha indicato. Se ha preso la versione col menù, compare anche il riquadro "Menù digitale".

Controlla sempre il PDF prima di mandarlo in stampa: se il cliente ha caricato una foto a bassa risoluzione, è qui che si vede.

A destra, in ordine: il link da scrivere sul tag con il pulsante Copia, cosa apre il tap e quanti tap ha già registrato, il cliente, l'indirizzo di spedizione, il pagamento, i file caricati da scaricare, le note e i campi per correggere i link.

---

## 4. Cose da sapere

- **Gli ordini non pagati** restano nascosti: si vedono scegliendo "Abbandonati" dal filtro. Sono carrelli lasciati a metà, non ordini.
- **L'indirizzo di spedizione** lo raccoglie Stripe al pagamento e compare in tabella. Se manca, il cliente non ha completato il pagamento.
- **Le richieste fuori catalogo** (tante placche, formati diversi, grafica propria) arrivano nella scheda **Richieste**, con il contatore di quelle da leggere.
- **La pagina del tap non va indicizzata** ed è già marcata `noindex`: è uno strumento, non una pagina del sito.
- **Se cancelli un ordine dal gestionale, il tag di quel cliente smette di funzionare.** Cancella solo le prove.

---

## 5. Ordine di prova attivo

| Voce | Valore |
|---|---|
| Locale | Trattoria del Tap (DEMO) |
| Link del tag | `https://www.sbfoodconsulting.com/tap.html?p=trattoria-del-tap-demo-0a63` |
| Versione | Personalizzata + Menù, 2 pezzi, 104 € |
| Stato | in lavorazione |

Serve per provare la scrittura di un tag vero senza toccare un ordine di un cliente. Quando non serve più, si elimina da **Dettagli → Elimina**.
