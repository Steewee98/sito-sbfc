/* ============================================================
   SB FOOD — Download gate per gli strumenti PDF dell'Academy
   Flusso: click "Scarica" → modale (1 campo email + consenso) →
   submit valido → download IMMEDIATO nel browser + salvataggio lead.

   NB webview Instagram/Facebook: il download DEVE partire dentro il
   gesto utente (sincrono). Il salvataggio del lead e il pixel sono
   fire-and-forget e NON bloccano il download.

   Config per pagina (impostare prima di caricare questo file):
     window.SBFC_TOOL = {
       slug: 'checklist-apertura-chiusura',
       titolo: 'Checklist Apertura & Chiusura',
       pdfVuoto: '../assets/pdf/risorse/checklist-apertura-chiusura.pdf',
       pdfEsempio: '../assets/pdf/risorse/checklist-apertura-chiusura-esempio.pdf'
     };
   ============================================================ */
(function () {
  var DEFAULT_BACKEND = 'https://web-production-f3794.up.railway.app';
  function backendUrl() { return window.SBFC_BACKEND || DEFAULT_BACKEND; }
  // I download passano dal backend, che forza Content-Disposition: attachment
  // (il sito statico su Railway non riesce a settarlo -> su iOS aprirebbe l'anteprima).
  function pdfUrl(tipo) {
    var u = backendUrl() + '/api/strumenti/' + cfg.slug + '/pdf?tipo=' + tipo;
    if (IS_INAPP) u += '&inline=1';  // webview: PDF visualizzabile, poi Condividi → Salva
    return u;
  }
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var cfg = window.SBFC_TOOL || {};
  var pixelFired = false;

  // iOS (iPhone/iPad) ignora l'attributo `download` e apre il PDF in anteprima:
  // l'auto-download programmatico NON funziona. Su iOS mostriamo subito il
  // pulsante grande: il salvataggio parte dal tap reale + Content-Disposition
  // attachment (che nginx mette sui PDF modello).
  var IS_IOS = /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Browser in-app (Instagram/Facebook/…): NON hanno gestore download. Con
  // l'header attachment non scaricano né mostrano nulla. Per loro apriamo il PDF
  // in modalità inline (visualizzabile) in una nuova scheda: l'utente poi fa
  // Condividi → Salva su File.
  var IS_INAPP = /(FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Twitter|Snapchat|Pinterest|TikTok|musical_ly)/i.test(navigator.userAgent);

  function param(name) {
    try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; }
  }

  function triggerDownload(url, filename) {
    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', filename || '');
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 0);
  }

  function saveLead(email) {
    // Fire-and-forget. IMPORTANTISSIMO per il webview Instagram/Facebook:
    // usiamo sendBeacon con Blob text/plain -> richiesta "semplice", NIENTE
    // preflight CORS (il preflight OPTIONS nel browser in-app è inaffidabile e
    // faceva perdere gli eventi in silenzio). Lato Flask: get_json(force=True).
    var url = backendUrl() + '/api/lead-strumenti';
    var payload = JSON.stringify({
      email: email,
      strumento: cfg.slug,
      consenso_marketing: true,
      referrer: document.referrer || '',
      utm_source: param('utm_source'),
      utm_medium: param('utm_medium'),
      utm_campaign: param('utm_campaign')
    });
    try {
      if (navigator.sendBeacon) {
        var blob = new Blob([payload], { type: 'text/plain' });
        if (navigator.sendBeacon(url, blob)) return;
      }
    } catch (e) {}
    // Fallback (browser desktop non-webview: il preflight qui funziona)
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  function firePixel() {
    if (pixelFired) return;
    pixelFired = true;
    // Il pixel è consent-gated: window.fbq esiste solo dopo accettazione cookie.
    try { if (window.fbq) window.fbq('trackCustom', 'DownloadStrumento', { strumento: cfg.slug }); } catch (e) {}
  }

  function buildModal() {
    var privacyHref = (cfg.privacyHref || '../privacy-policy.html');
    var wrap = document.createElement('div');
    wrap.id = 'dlgate';
    wrap.className = 'dlgate';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="dlgate-card">' +
        '<button type="button" class="dlgate-close" aria-label="Chiudi">&times;</button>' +
        '<div class="dlgate-form">' +
          '<span class="dlgate-kicker">Download gratuito</span>' +
          '<h3 class="dlgate-title">Ricevi ' + (cfg.titolo || 'lo strumento') + '</h3>' +
          '<p class="dlgate-sub">Inserisci l\'email e il PDF parte subito. Nessuna mail da controllare.</p>' +
          '<form id="dlgate-formEl" novalidate>' +
            '<div class="dlgate-field">' +
              '<input type="email" id="dlgate-email" inputmode="email" autocomplete="email" ' +
                'placeholder="La tua email" aria-label="La tua email" required>' +
            '</div>' +
            '<label class="dlgate-consent">' +
              '<input type="checkbox" id="dlgate-consent" required>' +
              '<span>Acconsento a ricevere comunicazioni da SB Food Consulting ' +
                '(<a href="' + privacyHref + '" target="_blank" rel="noopener">privacy</a>).</span>' +
            '</label>' +
            '<p class="dlgate-error" id="dlgate-error" hidden></p>' +
            '<button type="submit" class="dlgate-submit">Scarica ora &rarr;</button>' +
          '</form>' +
        '</div>' +
        '<div class="dlgate-done" id="dlgate-done" hidden>' +
          '<div class="dlgate-done-icon">&#10003;</div>' +
          '<h3 class="dlgate-title">Ecco la tua scheda</h3>' +
          '<p class="dlgate-sub" id="dlgate-done-sub">Tocca il pulsante per scaricare il PDF:</p>' +
          '<div class="dlgate-fallback">' +
            '<a class="dlgate-fb-primary" id="dlgate-fb-vuoto" href="#">&#8595; Scarica il modello (PDF)</a>' +
            '<a class="dlgate-fb-secondary" id="dlgate-fb-esempio" href="#">Scarica l\'esempio compilato</a>' +
          '</div>' +
          '<p class="dlgate-tip" id="dlgate-tip" hidden>Si apre il PDF: tocca <strong>Condividi</strong> ' +
            '(l\'icona con la freccia) e poi <strong>“Salva su File”</strong>. ' +
            'Oppure apri questa pagina in Safari/Chrome per scaricarlo direttamente.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  function init() {
    if (!cfg.slug) return;
    var modal = buildModal();
    var card = modal.querySelector('.dlgate-card');
    var formWrap = modal.querySelector('.dlgate-form');
    var doneWrap = modal.querySelector('#dlgate-done');
    var form = modal.querySelector('#dlgate-formEl');
    var emailEl = modal.querySelector('#dlgate-email');
    var consentEl = modal.querySelector('#dlgate-consent');
    var errEl = modal.querySelector('#dlgate-error');

    function open() {
      formWrap.hidden = false;
      doneWrap.hidden = true;
      errEl.hidden = true;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { emailEl.focus(); }, 60);
    }
    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    window.SBFCopenGate = open;

    // Aggancia tutti i bottoni "Scarica" della pagina
    Array.prototype.forEach.call(document.querySelectorAll('[data-open-gate]'), function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); open(); });
    });

    modal.querySelector('.dlgate-close').addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = (emailEl.value || '').trim().toLowerCase();
      if (!EMAIL_RE.test(email)) {
        errEl.textContent = 'Inserisci un indirizzo email valido.';
        errEl.hidden = false;
        emailEl.focus();
        return;
      }
      if (!consentEl.checked) {
        errEl.textContent = 'Serve il consenso per scaricare lo strumento.';
        errEl.hidden = false;
        return;
      }
      errEl.hidden = true;

      // Prepara i link del pannello "fatto".
      var fbV = modal.querySelector('#dlgate-fb-vuoto');
      var fbE = modal.querySelector('#dlgate-fb-esempio');
      fbV.href = pdfUrl('vuoto');
      fbE.href = pdfUrl('esempio');
      if (IS_INAPP) {
        // webview: apri il PDF (inline) in una nuova scheda -> visualizzabile + Condividi/Salva
        fbV.target = '_blank'; fbV.rel = 'noopener';
        fbE.target = '_blank'; fbE.rel = 'noopener';
        modal.querySelector('#dlgate-tip').hidden = false;
        modal.querySelector('#dlgate-done-sub').textContent = 'Tocca per aprire il PDF:';
        modal.querySelector('#dlgate-fb-vuoto').innerHTML = 'Apri il modello (PDF)';
      }

      // Pixel Meta (una sola volta) + salvataggio lead in background (sendBeacon)
      firePixel();
      saveLead(email);

      // Mostra subito il pannello con i pulsanti
      formWrap.hidden = true;
      doneWrap.hidden = false;

      // Auto-download SOLO dove funziona in modo affidabile (desktop/Android non in-app).
      // iOS e webview: parte dal tap dell'utente sul pulsante.
      if (!IS_IOS && !IS_INAPP) {
        triggerDownload(pdfUrl('vuoto'), cfg.slug + '.pdf');
        setTimeout(function () { triggerDownload(pdfUrl('esempio'), cfg.slug + '-esempio.pdf'); }, 600);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
