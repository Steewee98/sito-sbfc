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
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var cfg = window.SBFC_TOOL || {};
  var pixelFired = false;

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
          '<h3 class="dlgate-title">Il download è partito</h3>' +
          '<p class="dlgate-sub">Se non è partito da solo, tocca qui sotto:</p>' +
          '<div class="dlgate-fallback">' +
            '<a class="dlgate-fb-primary" id="dlgate-fb-vuoto" href="#" download>Scarica il modello</a>' +
            '<a class="dlgate-fb-secondary" id="dlgate-fb-esempio" href="#" target="_blank" rel="noopener">Apri l\'esempio compilato</a>' +
          '</div>' +
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

      // 1) DOWNLOAD SINCRONO (dentro il gesto utente — cruciale per webview IG/FB)
      triggerDownload(cfg.pdfVuoto, cfg.slug + '.pdf');
      setTimeout(function () { triggerDownload(cfg.pdfEsempio, cfg.slug + '-esempio.pdf'); }, 600);

      // 2) Pixel Meta (una sola volta)
      firePixel();

      // 3) Salvataggio lead in background (non blocca il download)
      saveLead(email);

      // 4) Pannello "fatto" con fallback tap-link (nessuna schermata di attesa)
      var fbV = modal.querySelector('#dlgate-fb-vuoto');
      var fbE = modal.querySelector('#dlgate-fb-esempio');
      fbV.href = cfg.pdfVuoto; fbV.setAttribute('download', cfg.slug + '.pdf');
      fbE.href = cfg.pdfEsempio;
      formWrap.hidden = true;
      doneWrap.hidden = false;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
