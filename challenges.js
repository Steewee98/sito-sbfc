/* ============================================================
   SB FOOD ACADEMY — CHALLENGE DEI MODULI
   Contenuto statico. Una challenge per modulo (1..5).
   Reso nel modal lezione (apriLezione(N,5)) e nella pagina
   challenge-preview.html / challenge-print.html.

   NOTA: i passaggi "come si fa" sono una PROPOSTA operativa.
   Le voci contrassegnate con ⚠️ sono da validare da Stefano/Simone
   (materia di competenza: formule, obblighi, procedure specifiche).
   ============================================================ */

window.CHALLENGES = {

  /* ─────────────────────────────────────────────────────────
     MODULO 01 — Hai davvero il controllo del tuo ristorante?
     ───────────────────────────────────────────────────────── */
  1: {
    modulo: 1,
    nome: "La Challenge del Controllo",
    durata: 14,
    promessa: "In 14 giorni smetti di guidare a occhio. Alla fine sai ogni mattina quanto hai incassato, quanto ti è costato e quanto ti resta — in 5 minuti, senza aspettare il commercialista.",
    strumenti: [
      { nome: "Scheda Food Cost", href: "academy.html#risorse" },
      { nome: "Quiz — I Numeri del Locale", href: "academy.html#risorse" }
    ],
    settimane: [
      {
        titolo: "Misura ciò che oggi non guardi",
        giorni: [
          { n: 1, titolo: "Segna l'incasso di oggi", come: [
            "A fine servizio scrivi l'incasso totale della giornata su un quaderno o un foglio dedicato.",
            "Solo il numero, ogni giorno. Niente app per ora: prima l'abitudine, poi lo strumento." ] },
          { n: 2, titolo: "Conta i coperti e calcola lo scontrino medio", come: [
            "Segna quante persone hai servito oggi.",
            "Dividi l'incasso per i coperti: hai lo scontrino medio. Annota entrambi accanto all'incasso." ] },
          { n: 3, titolo: "Separa incasso cucina e bevande", come: [
            "Dividi l'incasso di oggi tra cucina e bar/bevande.",
            "Ti serve per capire da dove arriva il margine e dove no." ] },
          { n: 4, titolo: "Conta le ore di lavoro della giornata", come: [
            "Somma le ore effettive di tutto il personale in turno, le tue comprese.",
            "Segna il numero totale. È la base per capire quanto ti costa il servizio." ] },
          { n: 5, titolo: "Metti nero su bianco i costi fissi mensili", come: [
            "Elenca affitto, utenze, stipendi fissi, finanziamenti, commercialista.",
            "Sommali e dividi per i giorni di apertura del mese: è quanto ti costa accendere le luci ogni giorno." ] },
          { n: 6, titolo: "Calcola il tuo punto di pareggio giornaliero", come: [
            "Parti dai costi fissi/giorno del Giorno 5.",
            "Aggiungi la stima del costo merce sull'incasso (la % che paghi in materie prime).",
            "⚠️ La formula esatta del food cost target va confermata con Simone: qui basta una stima di massima per avere un ordine di grandezza." ] },
          { n: 7, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Rileggi i 6 numeri raccolti. Quale non conoscevi prima di iniziare?",
            "Qual è stato il giorno che ha incassato meno, e perché?",
            "Scrivi una frase: cosa hai capito del tuo locale che una settimana fa non sapevi." ] }
        ]
      },
      {
        titolo: "Costruisci il cruscotto",
        giorni: [
          { n: 8, titolo: "Crea la tua tabella settimanale", come: [
            "Sette righe (i giorni), tre colonne: incasso, coperti, scontrino medio.",
            "Carta o Excel, indifferente. L'importante è che sia una sola pagina." ] },
          { n: 9, titolo: "Aggiungi il food cost dei piatti forti", come: [
            "Usa la Scheda Food Cost dell'Academy su 3 piatti di punta.",
            "Riporta la percentuale media in una nuova colonna della tabella." ] },
          { n: 10, titolo: "Aggiungi l'incidenza del costo del personale", come: [
            "Ore lavorate × costo orario medio = costo personale del giorno.",
            "Dividilo per l'incasso: è l'incidenza in percentuale. Mettila in colonna." ] },
          { n: 11, titolo: "Fissa le tue 3 soglie di allarme", come: [
            "Scrivi i tre numeri rossi: scontrino medio minimo, food cost massimo %, costo personale massimo %.",
            "Sotto/sopra queste soglie, il giorno va guardato." ] },
          { n: 12, titolo: "Fai il primo controllo dei 5 minuti", come: [
            "Ogni mattina compila la riga del giorno prima.",
            "Cinque minuti, caffè in mano. Nient'altro." ] },
          { n: 13, titolo: "Confronta la settimana con le soglie", come: [
            "Guarda quali giorni hanno sforato una delle tre soglie.",
            "Cerchia in rosso. Chiediti cosa è successo in quei giorni." ] },
          { n: 14, titolo: "Bilancio finale", tipo: "bilancio", come: [
            "Cosa è cambiato in 14 giorni nel modo in cui guardi il locale?",
            "Fissa l'appuntamento fisso: i 5 minuti di controllo ogni mattina, tutti i giorni.",
            "Un locale sotto controllo non è quello senza problemi: è quello dove i problemi li vedi il giorno stesso, non a fine mese." ] }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────
     MODULO 02 — Stai pagando per i risultati giusti?
     ───────────────────────────────────────────────────────── */
  2: {
    modulo: 2,
    nome: "La Challenge dei Costi che Rendono",
    durata: 14,
    promessa: "In 14 giorni smetti di pagare a scatola chiusa. Alla fine sai quali costi ti portano clienti e margine, e quali stai solo subendo per abitudine.",
    strumenti: [
      { nome: "Scheda Food Cost", href: "academy.html#risorse" }
    ],
    settimane: [
      {
        titolo: "Metti in fila ogni spesa",
        giorni: [
          { n: 1, titolo: "Scrivi tutte le spese fisse", come: [
            "Prendi l'estratto conto dell'ultimo mese ed elenca ogni uscita ricorrente.",
            "Nome della voce + importo mensile. Non saltarne nessuna, nemmeno le piccole." ] },
          { n: 2, titolo: "Ordina dalla più cara alla più piccola", come: [
            "Metti le voci in colonna, dalla più pesante alla più leggera.",
            "Di solito le prime cinque pesano l'80% del totale. Segnale." ] },
          { n: 3, titolo: "Per ogni spesa scrivi cosa ti rende", come: [
            "Accanto a ogni voce scrivi, in numeri, cosa ottieni: clienti, risparmio, tempo, sicurezza.",
            "Se non sai rispondere, non inventare: metti un punto interrogativo." ] },
          { n: 4, titolo: "Isola i \"non lo so\"", come: [
            "Raccogli tutte le voci con il punto interrogativo.",
            "Sono i tuoi primi sospetti: costi che paghi senza sapere cosa ti danno." ] },
          { n: 5, titolo: "Chiedi i numeri a chi ti fa marketing", come: [
            "Agenzia, social, pubblicità: quanti contatti o prenotazioni ti hanno portato l'ultimo mese?",
            "⚠️ Se non sanno dirti un numero, il problema non sei tu che chiedi: è chi non misura ciò che ti vende." ] },
          { n: 6, titolo: "Conta cosa usi davvero del gestionale/software", come: [
            "Elenca le funzioni che usi ogni giorno.",
            "Elenca quelle che paghi e non tocchi mai. Il secondo elenco è denaro fermo." ] },
          { n: 7, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Quali 3 spese non riesci a giustificare in numeri?",
            "Sono i bersagli della settimana 2. Scrivili in cima al foglio." ] }
        ]
      },
      {
        titolo: "Intervieni",
        giorni: [
          { n: 8, titolo: "Prepara la telefonata di rinegoziazione", come: [
            "Per la spesa più cara, scrivi su un foglio: cosa paghi, cosa ottieni, cosa vuoi ottenere.",
            "Entri nella chiamata con i numeri, non con le sensazioni." ] },
          { n: 9, titolo: "Chiedi 3 preventivi alternativi", come: [
            "Per una fornitura chiave, chiama due alternative più il tuo attuale fornitore.",
            "Confronta a parità di qualità, non solo di prezzo." ] },
          { n: 10, titolo: "Rinegozia il fornitore numero uno", come: [
            "Chiama, porta i numeri, chiedi condizioni migliori o un risultato misurabile.",
            "⚠️ La leva della trattativa dipende dal tuo volume e dal settore: qui l'obiettivo è aprire il dialogo, non spuntare per forza uno sconto." ] },
          { n: 11, titolo: "Taglia un costo inutile", come: [
            "Scegli una voce che non ti rende nulla e disdicila oggi.",
            "Anche una piccola: serve a rompere l'abitudine di pagare per inerzia." ] },
          { n: 12, titolo: "Metti un obiettivo a chi ti vende risultati", come: [
            "All'agenzia o al consulente di': \"questo mese voglio X, come lo misuriamo insieme?\".",
            "Un fornitore di risultati che accetta di essere misurato è un buon fornitore." ] },
          { n: 13, titolo: "Ricalcola il risparmio", come: [
            "Somma quanto hai liberato in un mese con le mosse di questi giorni.",
            "Moltiplica per 12: è il risparmio annuo. Di solito sorprende." ] },
          { n: 14, titolo: "Bilancio finale", tipo: "bilancio", come: [
            "Quanto hai recuperato in totale?",
            "Quale fornitore va tenuto d'occhio nei prossimi 90 giorni?",
            "Regola da tenere: ogni costo o ti porta clienti, o ti fa risparmiare, o ti fa dormire. Se non fa nessuna delle tre, va rimesso in discussione." ] }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────
     MODULO 03 — Cosa ti blocca dal crescere?
     ───────────────────────────────────────────────────────── */
  3: {
    modulo: 3,
    nome: "La Challenge dei 3 Blocchi",
    durata: 30,
    promessa: "In 30 giorni trovi il vero collo di bottiglia del tuo locale e lo rimuovi con un sistema — non con più ore tue.",
    strumenti: [
      { nome: "Checklist Apertura & Chiusura", href: "academy.html#risorse" },
      { nome: "Template Manuale Operativo", href: "academy.html#risorse" }
    ],
    settimane: [
      {
        titolo: "Trova il collo di bottiglia",
        giorni: [
          { n: 1, titolo: "Descrivi la giornata tipo", come: [
            "Scrivi passo passo cosa succede da apertura a chiusura.",
            "Dove ti fermi sempre? Dove torni indietro? Segnalo." ] },
          { n: 2, titolo: "Segna ogni volta che qualcosa si inceppa", come: [
            "Per un giorno intero, annota ogni intoppo: ordine sbagliato, attesa, litigio, macchina rotta.",
            "Non giudicare, registra. A fine giornata avrai una lista onesta." ] },
          { n: 3, titolo: "Chiedi al team dov'è il problema", come: [
            "Una domanda a ciascuno: \"cosa ti fa perdere più tempo durante il servizio?\".",
            "Ascolta senza difenderti. Chi lavora sul pezzo il blocco lo conosce già." ] },
          { n: 4, titolo: "Guarda i numeri dei tempi", come: [
            "Nel momento di picco, cronometra 5 uscite: quanto ci mette un piatto dalla comanda al tavolo?",
            "Un tempo che si allunga nei picchi è un collo di bottiglia che si vede." ] },
          { n: 5, titolo: "Individua il momento peggiore della giornata", come: [
            "Qual è la fascia in cui tutto si rompe? Il venerdì sera? Il cambio turno? L'arrivo delle comande insieme?",
            "Scrivi quando, non solo cosa." ] },
          { n: 6, titolo: "Dai un nome al collo di bottiglia", come: [
            "Scrivi in una frase qual è IL blocco principale: cucina lenta, sala scoperta, tu che sei ovunque.",
            "Uno solo, il più grosso. Gli altri vengono dopo." ] },
          { n: 7, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Il blocco che hai trovato è di processo, di persone, o sei tu il collo di bottiglia?",
            "Questa risposta decide come lavori le prossime tre settimane." ] }
        ]
      },
      {
        titolo: "Sistema il processo",
        giorni: [
          { n: 8, titolo: "Scomponi il processo bloccato", come: [
            "Prendi il collo di bottiglia e spezzalo nei singoli passi.",
            "Dove esattamente si perde tempo? Isola il passaggio, non tutto il processo." ] },
          { n: 9, titolo: "Elimina un passaggio inutile", come: [
            "C'è uno step che si fa \"perché si è sempre fatto\"?",
            "Toglilo per un giorno e osserva se qualcosa peggiora davvero." ] },
          { n: 10, titolo: "Riorganizza le postazioni", come: [
            "Sposta ciò che serve più vicino a chi lo usa.",
            "Meno passi fisici = meno tempo perso. Guarda dove il team cammina a vuoto." ] },
          { n: 11, titolo: "Scrivi la sequenza giusta", come: [
            "Metti su carta l'ordine corretto delle operazioni per quel processo.",
            "Una sequenza scritta è ripetibile; una in testa no." ] },
          { n: 12, titolo: "Fai una prova a locale chiuso", come: [
            "Prova la nuova sequenza col team prima del servizio.",
            "Meglio scoprire cosa non torna a sala vuota che con i clienti seduti." ] },
          { n: 13, titolo: "Applica al servizio vero", come: [
            "Usa la nuova sequenza per un servizio intero.",
            "Annota cosa non torna: si aggiusta domani, non si torna al vecchio." ] },
          { n: 14, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Il processo è migliorato? Di quanto, in tempo o in errori?",
            "Se non è cambiato nulla, forse il blocco vero era un altro: torna al Giorno 6." ] }
        ]
      },
      {
        titolo: "Togliti dal centro",
        giorni: [
          { n: 15, titolo: "Elenca cosa fai solo tu", come: [
            "Scrivi tutte le cose che \"solo tu sai fare\" nel locale.",
            "Ogni voce di questa lista è un rischio: se stai male, si ferma." ] },
          { n: 16, titolo: "Scegli una cosa da delegare", come: [
            "Prendine una a basso rischio e alta frequenza (qualcosa che capita spesso e se sbagliato non è un dramma).",
            "Si comincia da lì, non dalla cosa più delicata." ] },
          { n: 17, titolo: "Mettila su carta", come: [
            "Scrivi la procedura passo passo, come per un nuovo assunto che non sa nulla.",
            "Usa il Template Manuale Operativo dell'Academy come traccia." ] },
          { n: 18, titolo: "Insegnala a una persona", come: [
            "Mostragliela una volta facendola tu.",
            "La seconda volta la fa lui mentre tu guardi." ] },
          { n: 19, titolo: "Lascia che sbagli", come: [
            "Fatti da parte. Correggi solo dopo, non durante.",
            "⚠️ Vale per compiti dove l'errore non danneggia il cliente né la sicurezza: quelli critici restano controllati." ] },
          { n: 20, titolo: "Verifica il risultato", come: [
            "Il compito è fatto bene senza di te?",
            "Se no, di solito manca un pezzo nella procedura scritta: aggiungilo." ] },
          { n: 21, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Quante ore a settimana ti sei liberato?",
            "Cosa deleghi la prossima settimana? Scegli già la prossima voce della lista." ] }
        ]
      },
      {
        titolo: "Consolida il sistema",
        giorni: [
          { n: 22, titolo: "Raccogli le procedure scritte", come: [
            "Metti insieme in un unico posto tutto ciò che hai messo su carta finora.",
            "È l'inizio del tuo manuale operativo." ] },
          { n: 23, titolo: "Crea la checklist di apertura", come: [
            "Usa la Checklist Apertura & Chiusura dell'Academy e adattala al tuo locale.",
            "Solo i controlli che contano davvero, in ordine." ] },
          { n: 24, titolo: "Crea la checklist di chiusura", come: [
            "Stessa cosa per la fine giornata.",
            "Una chiusura fatta bene è metà dell'apertura del giorno dopo." ] },
          { n: 25, titolo: "Assegna i responsabili", come: [
            "Ogni checklist ha un nome accanto, non \"il team\".",
            "Un compito di tutti è un compito di nessuno." ] },
          { n: 26, titolo: "Fai girare il sistema senza di te", come: [
            "Per un servizio, tieniti in disparte e lascia lavorare il sistema.",
            "⚠️ Resta comunque presente in caso di necessità: è una prova, non un salto nel vuoto." ] },
          { n: 27, titolo: "Correggi i buchi", come: [
            "Dove si è inceppato, aggiorna la procedura o la checklist.",
            "Il sistema si migliora dopo l'uso, non prima." ] },
          { n: 28, titolo: "Fissa il punto di controllo settimanale", come: [
            "30 minuti a settimana per verificare che il sistema tenga.",
            "Stesso giorno, stessa ora. Se non è in agenda, non succede." ] },
          { n: 29, titolo: "Scrivi il tuo prossimo blocco", come: [
            "Qual è il prossimo collo di bottiglia da affrontare?",
            "Rimuovere un blocco ne fa emergere un altro: è normale, è crescita." ] },
          { n: 30, titolo: "Bilancio finale", tipo: "bilancio", come: [
            "Cosa funziona ora senza di te che un mese fa non funzionava?",
            "Crescere non è aprire un secondo locale: è far funzionare al massimo quello che hai." ] }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────
     MODULO 04 — L'Arte di Accogliere nel Food
     ───────────────────────────────────────────────────────── */
  4: {
    modulo: 4,
    nome: "La Challenge dell'Accoglienza",
    durata: 30,
    promessa: "In 30 giorni l'accoglienza smette di dipendere dal tuo umore e diventa un sistema — stesso standard per ogni cliente, ogni giorno, anche senza di te.",
    strumenti: [
      { nome: "Checklist Pre-Servizio", href: "academy.html#risorse" },
      { nome: "Quiz del Team", href: "academy.html#risorse" },
      { nome: "Auto-valutazione del Team", href: "academy.html#risorse" }
    ],
    settimane: [
      {
        titolo: "Mappa ogni momento di contatto",
        giorni: [
          { n: 1, titolo: "Elenca i momenti di contatto", come: [
            "Scrivi in ordine: arrivo, attesa, accompagnamento al tavolo, ordinazione, servizio, conto, uscita, ritorno.",
            "Ogni momento è un punto in cui il cliente si fa un'idea di te." ] },
          { n: 2, titolo: "Osserva l'arrivo come farebbe un cliente", come: [
            "Entra dalla porta principale come se fosse la prima volta.",
            "Cosa vedi, cosa senti, quanto aspetti prima che qualcuno ti noti? Annota." ] },
          { n: 3, titolo: "Cronometra l'attesa", come: [
            "Misura quanto passa da quando un cliente entra a quando viene accolto.",
            "Fallo in tre momenti diversi della giornata. La media dice la verità." ] },
          { n: 4, titolo: "Ascolta come si prende l'ordine", come: [
            "Osserva un tuo cameriere mentre prende una comanda.",
            "Cosa dice? Consiglia qualcosa? Guarda negli occhi? Sorride?" ] },
          { n: 5, titolo: "Guarda il momento del conto", come: [
            "Come viene portato il conto? Con quali tempi dopo la richiesta?",
            "C'è un saluto, un grazie, o finisce lì?" ] },
          { n: 6, titolo: "Segui l'uscita e il ritorno", come: [
            "Cosa si dice a un cliente quando esce?",
            "Cosa fai, in concreto, perché torni? Se la risposta è \"niente\", l'hai trovato il punto debole." ] },
          { n: 7, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Quale momento di contatto è il più debole oggi?",
            "Da lì partirà il lavoro della settimana 2." ] }
        ]
      },
      {
        titolo: "Costruisci lo standard",
        giorni: [
          { n: 8, titolo: "Definisci lo standard dell'arrivo", come: [
            "In quanti secondi il cliente viene accolto, con quale frase, da chi.",
            "Scrivi la frase esatta. \"Buonasera, benvenuti\" detto sempre vale più di mille sorrisi a caso." ] },
          { n: 9, titolo: "Definisci lo standard dell'attesa", come: [
            "Dove aspettano, cosa gli offri, come li tieni aggiornati sui tempi.",
            "Un'attesa gestita non pesa; un'attesa muta sì." ] },
          { n: 10, titolo: "Definisci lo standard dell'ordinazione", come: [
            "Come si presenta il menu, cosa si consiglia sempre, come si gestiscono le domande.",
            "Decidi 1-2 piatti che il team consiglia in automatico." ] },
          { n: 11, titolo: "Definisci lo standard del servizio al tavolo", come: [
            "Da che lato si serve, cosa si dice appoggiando il piatto, quando si torna a controllare.",
            "⚠️ Le regole di servizio (lato, sequenza) dipendono dallo stile del locale: qui conta la coerenza, non l'etichetta formale." ] },
          { n: 12, titolo: "Definisci lo standard del conto e del saluto", come: [
            "Tempi di risposta alla richiesta del conto e frase di commiato.",
            "L'ultima impressione è quella che il cliente racconta agli altri." ] },
          { n: 13, titolo: "Metti tutto in una scheda", come: [
            "Una sola pagina: i momenti in colonna, lo standard accanto a ciascuno.",
            "Appoggiati alla Checklist Pre-Servizio dell'Academy per la parte operativa." ] },
          { n: 14, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Lo standard è chiaro anche a chi non c'era quando l'hai scritto?",
            "Fallo leggere a una persona del team e chiedi se saprebbe applicarlo." ] }
        ]
      },
      {
        titolo: "Insegna il sistema",
        giorni: [
          { n: 15, titolo: "Presenta lo standard al team", come: [
            "Riunisci il team e spiega il perché prima del cosa.",
            "Chi capisce il motivo applica; chi impara a memoria dimentica." ] },
          { n: 16, titolo: "Allena l'arrivo", come: [
            "Prove pratiche del momento arrivo, una persona alla volta.",
            "Ripetere finché diventa naturale, non recitato." ] },
          { n: 17, titolo: "Allena l'ordinazione e il consiglio", come: [
            "Role-play: un membro del team fa il cliente, un altro prende l'ordine e consiglia.",
            "Si allena come lo sport: a secco, prima della partita." ] },
          { n: 18, titolo: "Allena la gestione del reclamo", come: [
            "Cosa si dice e si fa quando un cliente non è contento.",
            "⚠️ La linea su rimborsi/omaggi la decidi tu: il team deve sapere fin dove può arrivare da solo." ] },
          { n: 19, titolo: "Fai il Quiz del Team", come: [
            "Usa il Quiz del Team dell'Academy per vedere cosa è passato davvero.",
            "Il quiz non serve a giudicare le persone, ma a capire dove hai spiegato male." ] },
          { n: 20, titolo: "Correggi le lacune", come: [
            "Dove il team ha sbagliato il quiz, ri-allena quel punto.",
            "Meglio tre punti fatti bene che dieci fatti a metà." ] },
          { n: 21, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Il team sa ripetere lo standard senza leggerlo?",
            "Se sì, hai smesso di essere l'unico che sa accogliere." ] }
        ]
      },
      {
        titolo: "Allena e verifica",
        giorni: [
          { n: 22, titolo: "Fai una prova di servizio completa", come: [
            "Simulazione a locale chiuso, dall'arrivo al saluto finale.",
            "Tutti ai posti, come in una partita vera." ] },
          { n: 23, titolo: "Osserva un servizio vero in silenzio", come: [
            "Non intervenire. Prendi appunti momento per momento.",
            "Vedrai cose che, lavorando, non vedi mai." ] },
          { n: 24, titolo: "Dai un feedback a ciascuno", come: [
            "A ogni persona: una cosa che va bene, una da migliorare.",
            "Concreto e sul comportamento, mai sulla persona." ] },
          { n: 25, titolo: "Chiedi il parere dei clienti", come: [
            "A 5 clienti, una sola domanda: \"com'è stata l'accoglienza oggi?\".",
            "⚠️ Scegli il momento giusto (fine pasto, clima disteso): la domanda diretta funziona solo se non è invadente." ] },
          { n: 26, titolo: "Fai l'auto-valutazione del team", come: [
            "Usa l'Auto-valutazione del Team dell'Academy.",
            "Come si vedono loro rispetto a come li vedi tu? Le differenze sono oro." ] },
          { n: 27, titolo: "Nomina un responsabile dell'accoglienza", come: [
            "Chi controlla che lo standard tenga quando tu non ci sei.",
            "Un sistema senza un responsabile si spegne in due settimane." ] },
          { n: 28, titolo: "Aggiorna lo standard", come: [
            "Correggi la scheda con quello che hai imparato in questi giorni.",
            "Lo standard è vivo: cambia con il locale." ] },
          { n: 29, titolo: "Fissa la verifica mensile", come: [
            "Una volta al mese: ri-osservi un servizio e ri-alleni i punti deboli.",
            "Mettilo in agenda ora, con una data." ] },
          { n: 30, titolo: "Bilancio finale", tipo: "bilancio", come: [
            "L'accoglienza è la stessa in un giorno pieno e quando non ci sei tu?",
            "L'accoglienza non è gentilezza: è un sistema che si costruisce, si insegna e si replica." ] }
        ]
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────
     MODULO 05 — Come prepararsi al lancio del tuo locale
     ───────────────────────────────────────────────────────── */
  5: {
    modulo: 5,
    nome: "La Challenge dei 30 Giorni al Lancio",
    durata: 30,
    promessa: "In 30 giorni arrivi all'apertura con tutto pronto e sotto controllo — i primi 90 giorni decidono tutto, e tu non li lasci al caso.",
    strumenti: [
      { nome: "Checklist Apertura & Chiusura", href: "academy.html#risorse" },
      { nome: "Scheda Ricetta Standard", href: "academy.html#risorse" },
      { nome: "Scheda Food Cost", href: "academy.html#risorse" },
      { nome: "Template Manuale Operativo", href: "academy.html#risorse" },
      { nome: "Checklist Pre-Servizio", href: "academy.html#risorse" }
    ],
    settimane: [
      {
        titolo: "Le fondamenta",
        giorni: [
          { n: 1, titolo: "Scrivi il concept in una frase", come: [
            "Chi sei, per chi, cosa offri di diverso. Una riga sola.",
            "Se non entra in una riga, non è ancora chiaro nemmeno a te." ] },
          { n: 2, titolo: "Definisci il cliente tipo", come: [
            "Chi entra, quando, quanto spende, perché dovrebbe tornare.",
            "Un locale per tutti è un locale per nessuno." ] },
          { n: 3, titolo: "Fissa i numeri di partenza", come: [
            "Coperti previsti, scontrino medio target, incasso obiettivo giornaliero.",
            "Sono ipotesi, ma scritte: serviranno da metro dal primo giorno." ] },
          { n: 4, titolo: "Costruisci il menu di apertura", come: [
            "Pochi piatti, fatti bene. Elenca i piatti forti su cui punti.",
            "Un menu corto si esegue meglio e si controlla nel food cost." ] },
          { n: 5, titolo: "Calcola il food cost di ogni piatto", come: [
            "Usa la Scheda Food Cost dell'Academy su tutto il menu.",
            "Un piatto senza food cost calcolato è un prezzo tirato a indovinare." ] },
          { n: 6, titolo: "Fissa i prezzi", come: [
            "Dal food cost al prezzo, tenendo il margine target che ti sei dato.",
            "⚠️ Il moltiplicatore giusto dipende da format e zona: qui l'importante è che ogni prezzo nasca da un numero, non dal locale accanto." ] },
          { n: 7, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "I numeri stanno in piedi? Il menu regge il food cost target?",
            "Se qui i conti non tornano, si sistemano ora — non dopo l'apertura." ] }
        ]
      },
      {
        titolo: "Il locale e i fornitori",
        giorni: [
          { n: 8, titolo: "Disegna il flusso del locale", come: [
            "Dove entra il cliente, dove passa il cibo, dove si muove il team.",
            "I percorsi che si incrociano diventano intoppi ogni sera." ] },
          { n: 9, titolo: "Fai la lista delle attrezzature", come: [
            "Cosa serve in cucina e in sala, diviso in: essenziale per aprire / si aggiunge dopo.",
            "Non tutto serve il giorno uno: proteggi la cassa di partenza." ] },
          { n: 10, titolo: "Seleziona i fornitori chiave", come: [
            "Almeno due preventivi per ogni fornitura principale.",
            "Guarda affidabilità e continuità, non solo il prezzo del primo ordine." ] },
          { n: 11, titolo: "Standardizza le ricette", come: [
            "Usa la Scheda Ricetta Standard per ogni piatto del menu.",
            "Ingredienti, grammature, procedura: così il piatto è uguale a chiunque lo faccia." ] },
          { n: 12, titolo: "Definisci le scorte di partenza", come: [
            "Quanto ordinare per la prima settimana senza riempire il magazzino.",
            "Le scorte in eccesso al lancio sono soldi fermi e sprechi in arrivo." ] },
          { n: 13, titolo: "Verifica permessi e documenti", come: [
            "Fai la checklist di tutto ciò che serve per aprire in regola.",
            "⚠️ Gli obblighi (SCIA, HACCP, autorizzazioni) vanno verificati con il tuo consulente: qui serve solo assicurarsi che nessuno sia dimenticato." ] },
          { n: 14, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Il locale è pronto a far girare il menu che hai deciso?",
            "Cosa manca ancora tra spazi, attrezzature e forniture?" ] }
        ]
      },
      {
        titolo: "Il team",
        giorni: [
          { n: 15, titolo: "Definisci di chi hai bisogno", come: [
            "Quanti in cucina e quanti in sala per i coperti che hai previsto.",
            "Meglio partire giusti e crescere, che partire larghi e tagliare." ] },
          { n: 16, titolo: "Scrivi i ruoli", come: [
            "Chi fa cosa, una riga per ruolo.",
            "Ruoli chiari il primo giorno evitano il caos delle prime settimane." ] },
          { n: 17, titolo: "Prepara il manuale operativo", come: [
            "Usa il Template Manuale Operativo dell'Academy.",
            "Anche essenziale va bene: le procedure chiave scritte, non tutto perfetto." ] },
          { n: 18, titolo: "Forma il team sul menu", come: [
            "Assaggio di ogni piatto e come si racconta al cliente.",
            "Un cameriere che ha assaggiato vende; uno che legge il menu no." ] },
          { n: 19, titolo: "Forma il team sull'accoglienza", come: [
            "Lo standard dei momenti di contatto, dall'arrivo al saluto.",
            "Se hai fatto la Challenge dell'Accoglienza, qui riusi lo standard già pronto." ] },
          { n: 20, titolo: "Prova un servizio a vuoto", come: [
            "Simulazione senza clienti, tutti ai posti, dall'inizio alla fine.",
            "Gli errori scoperti a secco non costano clienti." ] },
          { n: 21, titolo: "Bilancio della settimana", tipo: "bilancio", come: [
            "Il team sa cosa fare senza che glielo dici tu momento per momento?",
            "Dove serve ancora la tua voce, serve ancora una procedura." ] }
        ]
      },
      {
        titolo: "Il pre-lancio",
        giorni: [
          { n: 22, titolo: "Prepara la checklist di apertura e chiusura", come: [
            "Usa la Checklist Apertura & Chiusura dell'Academy, adattata al tuo locale.",
            "Dal primo giorno si apre e si chiude con un metodo, non a memoria." ] },
          { n: 23, titolo: "Prepara la checklist pre-servizio", come: [
            "Usa la Checklist Pre-Servizio: cosa deve essere pronto prima che entri il primo cliente.",
            "Il servizio si vince nei 30 minuti prima che inizi." ] },
          { n: 24, titolo: "Fai una prova con clienti veri", come: [
            "Soft opening a inviti: amici, famiglia, conoscenti.",
            "Serve gente vera seduta ai tavoli, non un'altra prova a vuoto." ] },
          { n: 25, titolo: "Raccogli i problemi della prova", come: [
            "Cosa si è rotto? Tempi di uscita, cucina, sala, cassa.",
            "Scrivi tutto senza addolcire: è l'ultima occasione a costo zero." ] },
          { n: 26, titolo: "Correggi prima dell'apertura vera", come: [
            "Sistema i 3 problemi più gravi emersi dalla prova.",
            "Non serve risolvere tutto: serve non aprire con i buchi grossi." ] },
          { n: 27, titolo: "Prepara la comunicazione del lancio", come: [
            "Cosa dici, dove e quando per far sapere che apri.",
            "⚠️ Canali e messaggio dipendono dal tuo pubblico e zona: qui basta avere un piano, non improvvisare il giorno prima." ] },
          { n: 28, titolo: "Definisci come misuri i primi giorni", come: [
            "Quali numeri guardi da subito: incasso, coperti, scontrino medio, food cost.",
            "Sono gli stessi della Challenge del Controllo: parti già misurando." ] },
          { n: 29, titolo: "Ultimo controllo generale", come: [
            "Gira tutte le checklist una volta, dall'apertura al pre-servizio.",
            "Un giro completo il giorno prima toglie metà dell'ansia del giorno uno." ] },
          { n: 30, titolo: "Bilancio finale", tipo: "bilancio", come: [
            "Sei pronto ad aprire con un sistema, non con la speranza?",
            "I primi 90 giorni definiscono tutto: ci arrivi con un metodo in mano." ] }
        ]
      }
    ]
  }

};

/* ============================================================
   RENDERING
   ============================================================ */

(function () {
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function romano(n) {
    return ["", "I", "II", "III", "IV", "V", "VI"][n] || String(n);
  }

  var PROG_KEY = 'sb_challenge_progress';
  function readChlProgress(moduloId) {
    try {
      var all = JSON.parse(localStorage.getItem(PROG_KEY) || '{}');
      return all['m' + moduloId] || {};
    } catch (e) { return {}; }
  }
  function writeChlProgress(moduloId, obj) {
    try {
      var all = JSON.parse(localStorage.getItem(PROG_KEY) || '{}');
      if (Object.keys(obj).length) all['m' + moduloId] = obj; else delete all['m' + moduloId];
      localStorage.setItem(PROG_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  window.readChlProgress = readChlProgress;

  // Segna/desegna un giorno come fatto e aggiorna il contatore + barra.
  window.toggleChlDay = function (btn) {
    var mod = btn.getAttribute('data-mod');
    var day = btn.getAttribute('data-day');
    var prog = readChlProgress(mod);
    var nowDone = !prog[day];
    if (nowDone) prog[day] = 1; else delete prog[day];
    writeChlProgress(mod, prog);
    btn.setAttribute('aria-pressed', nowDone);
    var dayEl = btn.closest('.chl-day');
    if (dayEl) dayEl.classList.toggle('is-done', nowDone);
    updateChlProgress(mod);
  };

  function updateChlProgress(mod) {
    var prog = readChlProgress(mod);
    var done = Object.keys(prog).length;
    var counter = document.getElementById('chl-progress-' + mod);
    if (counter) {
      var total = parseInt(counter.getAttribute('data-total'), 10) || 0;
      counter.textContent = done + '/' + total + ' completati';
      var fill = document.getElementById('chl-prog-fill-' + mod);
      if (fill && total) fill.style.width = Math.round(done / total * 100) + '%';
    }
  }

  // Render di una singola challenge. opts.open = indice settimana aperta (default 0);
  // opts.expandAll = true per stampa/preview (tutte le settimane aperte, niente accordion).
  window.renderChallengeHTML = function (moduloId, opts) {
    opts = opts || {};
    var c = window.CHALLENGES[moduloId];
    if (!c) return '<p>Challenge non disponibile.</p>';

    var expandAll = !!opts.expandAll;
    var openIndex = typeof opts.open === 'number' ? opts.open : 0;
    var totGiorni = c.settimane.reduce(function (a, s) { return a + s.giorni.length; }, 0);

    var prog = readChlProgress(moduloId);
    var doneCount = Object.keys(prog).length;
    var pct = totGiorni ? Math.round(doneCount / totGiorni * 100) : 0;

    var h = '';
    h += '<div class="chl">';

    // Intro
    h += '<div class="chl-intro">';
    h += '<div class="chl-meta">';
    h += '<span class="chl-badge">🏆 Challenge</span>';
    h += '<span class="chl-durata">' + c.durata + ' giorni · ' + totGiorni + ' azioni</span>';
    h += '</div>';
    h += '<h2 class="chl-nome">' + esc(c.nome) + '</h2>';
    h += '<p class="chl-promessa">' + esc(c.promessa) + '</p>';

    // Progresso (spunte salvate in localStorage — per dispositivo)
    h += '<div class="chl-prog-wrap no-print">';
    h += '<div class="chl-prog-bar"><span class="chl-prog-fill" id="chl-prog-fill-' + moduloId + '" style="width:' + pct + '%"></span></div>';
    h += '<span class="chl-progress" id="chl-progress-' + moduloId + '" data-total="' + totGiorni + '">' + doneCount + '/' + totGiorni + ' completati</span>';
    h += '</div>';
    if (!opts.forPrint) {
      h += '<div class="chl-actions">';
      h += '<a class="chl-pdf" href="challenge-print.html?m=' + moduloId + '" target="_blank" rel="noopener">↓ Scarica / Stampa la challenge (PDF)</a>';
      h += '</div>';
    }
    h += '</div>';

    // Settimane
    c.settimane.forEach(function (sett, i) {
      var aperta = expandAll || i === openIndex;
      h += '<div class="chl-week' + (aperta ? ' is-open' : '') + '">';
      if (expandAll) {
        h += '<div class="chl-week-head chl-week-head--static">';
      } else {
        h += '<button type="button" class="chl-week-head" onclick="toggleChlWeek(this)">';
      }
      h += '<span class="chl-week-tag">Settimana ' + romano(i + 1) + '</span>';
      h += '<span class="chl-week-title">' + esc(sett.titolo) + '</span>';
      if (!expandAll) h += '<span class="chl-week-chevron" aria-hidden="true">▾</span>';
      h += expandAll ? '</div>' : '</button>';

      h += '<div class="chl-week-body">';
      sett.giorni.forEach(function (g) {
        var isBil = g.tipo === 'bilancio';
        var done = !!prog[g.n];
        h += '<div class="chl-day' + (isBil ? ' chl-day--bilancio' : '') + (done ? ' is-done' : '') + '">';
        h += '<button type="button" class="chl-day-num" data-mod="' + moduloId + '" data-day="' + g.n + '" onclick="toggleChlDay(this)" aria-pressed="' + done + '" title="Segna come fatto">';
        h += '<span class="chl-num-n">' + g.n + '</span><span class="chl-num-check" aria-hidden="true">✓</span>';
        h += '</button>';
        h += '<div class="chl-day-body">';
        h += '<div class="chl-day-label">' + (isBil ? 'Giorno ' + g.n + ' · Bilancio' : 'Giorno ' + g.n) + '</div>';
        h += '<h4 class="chl-day-title">' + esc(g.titolo) + '</h4>';
        if (g.come && g.come.length) {
          h += '<ul class="chl-day-how">';
          g.come.forEach(function (step) { h += '<li>' + esc(step) + '</li>'; });
          h += '</ul>';
        }
        h += '</div></div>';
      });
      h += '</div>';   // week-body
      h += '</div>';   // week
    });

    // Strumenti
    if (c.strumenti && c.strumenti.length) {
      h += '<div class="chl-tools">';
      h += '<div class="chl-tools-title">Strumenti dell\'Academy per questa challenge</div>';
      h += '<div class="chl-tools-list">';
      c.strumenti.forEach(function (t) {
        h += '<a class="chl-tool" href="' + esc(t.href) + '">' + esc(t.nome) + '</a>';
      });
      h += '</div></div>';
    }

    h += '<p class="chl-disclaimer">Le indicazioni operative sono una guida di partenza, da adattare al tuo locale.</p>';
    h += '</div>';
    return h;
  };

  window.toggleChlWeek = function (btn) {
    var week = btn.closest('.chl-week');
    if (week) week.classList.toggle('is-open');
  };
})();
