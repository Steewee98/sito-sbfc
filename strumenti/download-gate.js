/* ============================================================
   SB FOOD — Download gate per gli strumenti PDF dell'Academy
   Flusso: click "Scarica" → modale (email + consenso) → submit →
   download IMMEDIATO + salvataggio lead + cross-sell delle altre schede.

   Download iOS-safe: il sito FETCHA i byte dal backend (CORS ok) e li fa
   scaricare come blob STESSO-DOMINIO (octet-stream) così iOS li salva invece
   di navigare al dominio del backend. PDF pre-caricati = download istantaneo.

   Browser in-app (Instagram/FB): non hanno gestore download → apriamo il PDF
   visualizzabile (Condividi → Salva su File).

   Config per pagina: window.SBFC_TOOL = { slug, titolo, privacyHref };
   ============================================================ */
(function () {
  var DEFAULT_BACKEND = 'https://web-production-f3794.up.railway.app';
  var cfg = window.SBFC_TOOL || {};
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  // Schede scaricabili (per il cross-sell). Aggiungere qui i nuovi strumenti
  // quando avranno PDF + pagina dedicata.
  var TOOLS = window.SBFC_TOOLS || [
    { slug: 'checklist-apertura-chiusura', label: 'Checklist Apertura & Chiusura' },
    { slug: 'scheda-food-cost', label: 'Scheda Food Cost' },
    { slug: 'scheda-ricetta', label: 'Scheda Ricetta' },
    { slug: 'checklist-pre-servizio', label: 'Checklist Pre-Servizio' },
    { slug: 'quiz-numeri', label: 'Quiz — I Numeri del Locale' },
    { slug: 'autovalutazione-team', label: 'Scheda Autovalutazione Team' }
  ];

  var IS_INAPP = /(FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|Twitter|Snapchat|Pinterest|TikTok|musical_ly)/i.test(navigator.userAgent);

  var leadEmail = '';          // email inserita (per il cross-sell senza reinserirla)
  var pixelFired = {};         // slug -> true (un evento per scheda)

  function backendUrl() { return window.SBFC_BACKEND || DEFAULT_BACKEND; }
  function pdfFetchUrl(slug, tipo) { return backendUrl() + '/api/strumenti/' + slug + '/pdf?tipo=' + tipo; }
  function pdfViewUrl(slug, tipo) { return pdfFetchUrl(slug, tipo) + '&inline=1'; }

  function param(name) {
    try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; }
  }

  // ---- Pre-fetch / download stesso-dominio ----
  var buffers = {};   // 'slug|tipo' -> ArrayBuffer
  var fetching = {};
  function prefetch(slug, tipo) {
    if (IS_INAPP) return;
    var k = slug + '|' + tipo;
    if (buffers[k] || fetching[k]) return;
    fetching[k] = true;
    fetch(pdfFetchUrl(slug, tipo)).then(function (r) { return r.ok ? r.arrayBuffer() : null; })
      .then(function (b) { if (b) buffers[k] = b; fetching[k] = false; })
      .catch(function () { fetching[k] = false; });
  }
  function blobDownload(slug, tipo, filename) {
    var buf = buffers[slug + '|' + tipo];
    if (!buf) return false;
    try {
      var url = URL.createObjectURL(new Blob([buf], { type: 'application/octet-stream' }));
      var a = document.createElement('a');
      a.href = url; a.download = filename; a.rel = 'noopener';
      document.body.appendChild(a); a.click();
      setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); URL.revokeObjectURL(url); }, 3000);
      return true;
    } catch (e) { return false; }
  }
  function doDownload(slug, tipo, filename) {
    if (blobDownload(slug, tipo, filename)) return;
    fetch(pdfFetchUrl(slug, tipo)).then(function (r) { return r.ok ? r.arrayBuffer() : null; })
      .then(function (b) {
        if (b) { buffers[slug + '|' + tipo] = b; if (blobDownload(slug, tipo, filename)) return; }
        window.location.href = pdfViewUrl(slug, tipo);
      })
      .catch(function () { window.location.href = pdfViewUrl(slug, tipo); });
  }

  function saveLead(email, slug) {
    var url = backendUrl() + '/api/lead-strumenti';
    var payload = JSON.stringify({
      email: email, strumento: slug, consenso_marketing: true,
      referrer: document.referrer || '',
      utm_source: param('utm_source'), utm_medium: param('utm_medium'), utm_campaign: param('utm_campaign')
    });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([payload], { type: 'text/plain' }))) return;
    } catch (e) {}
    try { fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: payload, keepalive: true }).catch(function () {}); } catch (e) {}
  }

  function firePixel(slug) {
    if (pixelFired[slug]) return;
    pixelFired[slug] = true;
    try { if (window.fbq) window.fbq('trackCustom', 'DownloadStrumento', { strumento: slug }); } catch (e) {}
  }

  // Consegna una scheda: lead + pixel + download (o apertura nel webview)
  function deliver(slug, label) {
    if (leadEmail) saveLead(leadEmail, slug);
    firePixel(slug);
    if (IS_INAPP) {
      try { window.open(pdfViewUrl(slug, 'vuoto'), '_blank'); } catch (e) {}
    } else {
      doDownload(slug, 'vuoto', slug + '.pdf');
    }
  }

  function buildModal() {
    var privacyHref = (cfg.privacyHref || '../privacy-policy.html');
    var wrap = document.createElement('div');
    wrap.id = 'dlgate'; wrap.className = 'dlgate';
    wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true'); wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML =
      '<div class="dlgate-card">' +
        '<button type="button" class="dlgate-close" aria-label="Chiudi">&times;</button>' +
        '<div class="dlgate-form">' +
          '<span class="dlgate-kicker">Download gratuito</span>' +
          '<h3 class="dlgate-title">Ricevi ' + (cfg.titolo || 'lo strumento') + '</h3>' +
          '<p class="dlgate-sub">Inserisci l\'email e il PDF parte subito. Nessuna mail da controllare.</p>' +
          '<form id="dlgate-formEl" novalidate>' +
            '<div class="dlgate-field">' +
              '<input type="email" id="dlgate-email" inputmode="email" autocomplete="email" placeholder="La tua email" aria-label="La tua email" required>' +
            '</div>' +
            '<label class="dlgate-consent">' +
              '<input type="checkbox" id="dlgate-consent" required>' +
              '<span>Acconsento a ricevere comunicazioni da SB Food Consulting (<a href="' + privacyHref + '" target="_blank" rel="noopener">privacy</a>).</span>' +
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
          '<p class="dlgate-tip" id="dlgate-tip" hidden>Si apre il PDF: tocca <strong>Condividi</strong> (l\'icona con la freccia in alto) e poi <strong>“Salva su File”</strong>.</p>' +
          '<div class="dlgate-cross" id="dlgate-cross" hidden>' +
            '<div class="dlgate-cross-title">&#127873; Prendi gratis anche le altre schede</div>' +
            '<div class="dlgate-cross-list" id="dlgate-cross-list"></div>' +
          '</div>' +
          '<a class="dlgate-crusc" id="dlgate-crusc" href="https://www.sbfoodconsulting.com/cruscotto-imprenditore" target="_blank" rel="noopener">' +
            '<span class="dlgate-crusc-badge">-15%</span>' +
            '<span class="dlgate-crusc-body">' +
              '<strong>Il Cruscotto dell\'Imprenditore</strong>' +
              '<em>La guida che ti dice, numeri alla mano, come sta andando la tua attivit&agrave;. Oggi <b>&euro;21,25</b> con il codice <b>CRUSCOTTO15</b>.</em>' +
            '</span>' +
            '<span class="dlgate-crusc-go">&rarr;</span>' +
          '</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    return wrap;
  }

  // CSS del banner Cruscotto iniettato via JS (self-contained, niente modifiche a style.css)
  function injectCruscStyles() {
    if (document.getElementById('dlgate-crusc-css')) return;
    var s = document.createElement('style');
    s.id = 'dlgate-crusc-css';
    s.textContent =
      '.dlgate-crusc{display:flex;align-items:center;gap:14px;margin-top:16px;padding:15px 18px;' +
      'background:linear-gradient(135deg,#181410,#0b0908);border:1px solid rgba(224,134,63,.45);' +
      'border-radius:14px;text-decoration:none;transition:border-color .2s,transform .2s}' +
      '.dlgate-crusc:hover{border-color:rgba(224,134,63,.95);transform:translateY(-1px)}' +
      '.dlgate-crusc-badge{flex:0 0 auto;background:#e0863f;color:#0a0705;font-weight:800;font-size:15px;' +
      'padding:8px 11px;border-radius:8px;line-height:1}' +
      '.dlgate-crusc-body{display:flex;flex-direction:column;gap:4px;min-width:0}' +
      '.dlgate-crusc-body strong{color:#f5efe6;font-size:15px;line-height:1.25}' +
      '.dlgate-crusc-body em{color:#c9b8a6;font-style:normal;font-size:12.5px;line-height:1.4}' +
      '.dlgate-crusc-body b{color:#e0863f;font-weight:700}' +
      '.dlgate-crusc-go{margin-left:auto;color:#e0863f;font-size:22px;flex:0 0 auto}';
    document.head.appendChild(s);
  }

  function renderCross(modal) {
    var others = TOOLS.filter(function (t) { return t.slug !== cfg.slug; });
    if (!others.length) return;
    var box = modal.querySelector('#dlgate-cross');
    var list = modal.querySelector('#dlgate-cross-list');
    list.innerHTML = '';
    others.forEach(function (t) {
      prefetch(t.slug, 'vuoto');   // pronto per il click
      var el;
      if (IS_INAPP) {
        el = document.createElement('a');
        el.href = pdfViewUrl(t.slug, 'vuoto'); el.target = '_blank'; el.rel = 'noopener';
      } else {
        el = document.createElement('button');
        el.type = 'button';
      }
      el.className = 'dlgate-cross-btn';
      el.innerHTML =
        '<span class="dlgate-cross-ic">&#8595;</span>' +
        '<span class="dlgate-cross-txt"><strong>' + t.label + '</strong><em>Scarica gratis &middot; PDF</em></span>' +
        '<span class="dlgate-cross-go">&rarr;</span>';
      el.addEventListener('click', function (e) {
        if (el.tagName === 'BUTTON') e.preventDefault();
        if (el.classList.contains('is-done')) { deliver(t.slug, t.label); return; }
        deliver(t.slug, t.label);
        el.classList.add('is-done');
        var em = el.querySelector('em'); if (em) em.textContent = 'Scaricata ✓';
        var ic = el.querySelector('.dlgate-cross-ic'); if (ic) ic.innerHTML = '&#10003;';
        var go = el.querySelector('.dlgate-cross-go'); if (go) go.innerHTML = '&#10003;';
      });
      list.appendChild(el);
    });
    box.hidden = false;
  }

  function init() {
    if (!cfg.slug) return;
    injectCruscStyles();
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
      formWrap.hidden = false; doneWrap.hidden = true; errEl.hidden = true;
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      prefetch(cfg.slug, 'vuoto'); prefetch(cfg.slug, 'esempio');
      setTimeout(function () { emailEl.focus(); }, 60);
    }
    function close() {
      modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
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
      if (!EMAIL_RE.test(email)) { errEl.textContent = 'Inserisci un indirizzo email valido.'; errEl.hidden = false; emailEl.focus(); return; }
      if (!consentEl.checked) { errEl.textContent = 'Serve il consenso per scaricare lo strumento.'; errEl.hidden = false; return; }
      errEl.hidden = true;
      leadEmail = email;

      firePixel(cfg.slug);
      saveLead(email, cfg.slug);

      formWrap.hidden = true;
      doneWrap.hidden = false;

      if (IS_INAPP) {
        fbV.href = pdfViewUrl(cfg.slug, 'vuoto'); fbV.target = '_blank'; fbV.rel = 'noopener';
        fbE.href = pdfViewUrl(cfg.slug, 'esempio'); fbE.target = '_blank'; fbE.rel = 'noopener';
        modal.querySelector('#dlgate-tip').hidden = false;
        modal.querySelector('#dlgate-done-sub').textContent = 'Ho aperto il PDF in una nuova scheda:';
        fbV.innerHTML = 'Riapri il modello (PDF)';
        fbE.innerHTML = 'Apri l\'esempio compilato';
        try { window.open(pdfViewUrl(cfg.slug, 'vuoto'), '_blank'); } catch (e2) {}
      } else {
        fbV.href = '#'; fbV.onclick = function (ev) { ev.preventDefault(); doDownload(cfg.slug, 'vuoto', cfg.slug + '.pdf'); };
        fbE.href = '#'; fbE.onclick = function (ev) { ev.preventDefault(); doDownload(cfg.slug, 'esempio', cfg.slug + '-esempio.pdf'); };
        doDownload(cfg.slug, 'vuoto', cfg.slug + '.pdf');
        setTimeout(function () { doDownload(cfg.slug, 'esempio', cfg.slug + '-esempio.pdf'); }, 900);
      }

      renderCross(modal);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
