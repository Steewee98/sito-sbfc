/* ============================================================
   SB FOOD — Download gate per gli strumenti PDF dell'Academy
   Flusso: click "Scarica" → modale (1 campo email + consenso) →
   submit valido → download IMMEDIATO + salvataggio lead.

   Download iOS-safe: NON navighiamo al PDF cross-dominio (iOS Safari ci
   naviga sopra invece di scaricarlo). Il sito FETCHA i byte dal backend
   (CORS ok) e li fa scaricare come blob STESSO-DOMINIO, forzato come dato
   grezzo (octet-stream) così iOS lo salva invece di aprirlo in anteprima.
   I byte sono pre-caricati all'apertura del modale → download istantaneo.

   Browser in-app (Instagram/FB): non hanno gestore download → apriamo il
   PDF visualizzabile e l'utente fa Condividi → Salva su File.

   Config per pagina (impostare prima di caricare questo file):
     window.SBFC_TOOL = { slug, titolo, privacyHref };
   ============================================================ */
(function () {
  var DEFAULT_BACKEND = 'https://web-production-f3794.up.railway.app';
  var cfg = window.SBFC_TOOL || {};
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  var pixelFired = false;

  // Browser in-app (Instagram/Facebook/…): niente gestore download.
  var IS_INAPP = /(FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Twitter|Snapchat|Pinterest|TikTok|musical_ly)/i.test(navigator.userAgent);

  function backendUrl() { return window.SBFC_BACKEND || DEFAULT_BACKEND; }
  function pdfFetchUrl(tipo) { return backendUrl() + '/api/strumenti/' + cfg.slug + '/pdf?tipo=' + tipo; }
  // URL visualizzabile (inline) per il webview
  function pdfViewUrl(tipo) { return pdfFetchUrl(tipo) + '&inline=1'; }

  function param(name) {
    try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; }
  }

  // ---- Pre-fetch dei PDF (così il download è istantaneo al submit) ----
  var buffers = {};   // tipo -> ArrayBuffer
  var fetching = {};
  function prefetch(tipo) {
    if (IS_INAPP) return;                       // il webview usa la vista inline
    if (buffers[tipo] || fetching[tipo]) return;
    fetching[tipo] = true;
    fetch(pdfFetchUrl(tipo)).then(function (r) { return r.ok ? r.arrayBuffer() : null; })
      .then(function (b) { if (b) buffers[tipo] = b; fetching[tipo] = false; })
      .catch(function () { fetching[tipo] = false; });
  }

  // Download stesso-dominio: blob octet-stream + attributo download.
  function blobDownload(tipo, filename) {
    var buf = buffers[tipo];
    if (!buf) return false;
    try {
      var blob = new Blob([buf], { type: 'application/octet-stream' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        if (a.parentNode) a.parentNode.removeChild(a);
        URL.revokeObjectURL(url);
      }, 3000);
      return true;
    } catch (e) { return false; }
  }

  // Scarica: se i byte non sono pronti, li recupera e poi scarica.
  function doDownload(tipo, filename) {
    if (blobDownload(tipo, filename)) return;
    fetch(pdfFetchUrl(tipo)).then(function (r) { return r.ok ? r.arrayBuffer() : null; })
      .then(function (b) {
        if (b) { buffers[tipo] = b; if (blobDownload(tipo, filename)) return; }
        window.location.href = pdfViewUrl(tipo);   // ultimo fallback
      })
      .catch(function () { window.location.href = pdfViewUrl(tipo); });
  }

  function saveLead(email) {
    // Fire-and-forget via sendBeacon (text/plain) -> niente preflight CORS
    // (inaffidabile nel webview IG/FB). Lato Flask: get_json(force=True).
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
        if (navigator.sendBeacon(url, new Blob([payload], { type: 'text/plain' }))) return;
      }
    } catch (e) {}
    try {
      fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: payload, keepalive: true }).catch(function () {});
    } catch (e) {}
  }

  function firePixel() {
    if (pixelFired) return;
    pixelFired = true;
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
          '<p class="dlgate-sub" id="dlgate-done-sub">Se il download non parte, tocca qui:</p>' +
          '<div class="dlgate-fallback">' +
            '<a class="dlgate-fb-primary" id="dlgate-fb-vuoto" href="#">&#8595; Scarica il modello (PDF)</a>' +
            '<a class="dlgate-fb-secondary" id="dlgate-fb-esempio" href="#">Scarica l\'esempio compilato</a>' +
          '</div>' +
          '<p class="dlgate-tip" id="dlgate-tip" hidden>Si apre il PDF: tocca <strong>Condividi</strong> ' +
            '(l\'icona con la freccia in alto) e poi <strong>“Salva su File”</strong>.</p>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  function init() {
    if (!cfg.slug) return;
    var modal = buildModal();
    var formWrap = modal.querySelector('.dlgate-form');
    var doneWrap = modal.querySelector('#dlgate-done');
    var form = modal.querySelector('#dlgate-formEl');
    var emailEl = modal.querySelector('#dlgate-email');
    var consentEl = modal.querySelector('#dlgate-consent');
    var errEl = modal.querySelector('#dlgate-error');
    var fbV = modal.querySelector('#dlgate-fb-vuoto');
    var fbE = modal.querySelector('#dlgate-fb-esempio');

    function open() {
      formWrap.hidden = false;
      doneWrap.hidden = true;
      errEl.hidden = true;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // pre-carica i PDF: al submit il download è istantaneo
      prefetch('vuoto');
      prefetch('esempio');
      setTimeout(function () { emailEl.focus(); }, 60);
    }
    function close() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    window.SBFCopenGate = open;

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
        errEl.hidden = false; emailEl.focus(); return;
      }
      if (!consentEl.checked) {
        errEl.textContent = 'Serve il consenso per scaricare lo strumento.';
        errEl.hidden = false; return;
      }
      errEl.hidden = true;

      firePixel();
      saveLead(email);

      formWrap.hidden = true;
      doneWrap.hidden = false;

      if (IS_INAPP) {
        // Browser in-app: apre il PDF visualizzabile (il webview non scarica).
        fbV.href = pdfViewUrl('vuoto'); fbV.target = '_blank'; fbV.rel = 'noopener';
        fbE.href = pdfViewUrl('esempio'); fbE.target = '_blank'; fbE.rel = 'noopener';
        modal.querySelector('#dlgate-tip').hidden = false;
        modal.querySelector('#dlgate-done-sub').textContent = 'Ho aperto il PDF in una nuova scheda:';
        fbV.innerHTML = 'Riapri il modello (PDF)';
        fbE.innerHTML = 'Apri l\'esempio compilato';
        try { window.open(pdfViewUrl('vuoto'), '_blank'); } catch (e2) {}
      } else {
        // Safari/desktop/Android: download stesso-dominio (blob) — parte da solo.
        fbV.href = '#'; fbV.onclick = function (ev) { ev.preventDefault(); doDownload('vuoto', cfg.slug + '.pdf'); };
        fbE.href = '#'; fbE.onclick = function (ev) { ev.preventDefault(); doDownload('esempio', cfg.slug + '-esempio.pdf'); };
        doDownload('vuoto', cfg.slug + '.pdf');
        setTimeout(function () { doDownload('esempio', cfg.slug + '-esempio.pdf'); }, 900);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
