/* ════════════════════════════════════════════════════════
   SB FOOD CONSULTING — Editorial v5 JS
   Custom scroll reveal, parallax, hero animation
   ════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ═══════ NAVBAR ═══════ */
    var navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    /* ═══════ MOBILE MENU ═══════ */
    var toggle = document.getElementById('menuToggle');
    var menu = document.getElementById('navMenu');
    var overlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        if (!toggle || !menu || !overlay) return;
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    }
    if (toggle) toggle.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.navbar-menu a').forEach(function (a) {
        a.addEventListener('click', function () {
            if (menu && menu.classList.contains('open')) toggleMenu();
        });
    });

    /* ═══════ HERO TEXT REVEAL ═══════ */
    var hero = document.getElementById('hero');
    if (hero) {
        setTimeout(function () {
            hero.classList.add('loaded');
        }, 200);
    }

    /* ═══════ SCROLL REVEAL ═══════ */
    var revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = parseInt(entry.target.dataset.revealDelay) || 0;
                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    /* ═══════ PARALLAX ═══════ */
    var parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length > 0) {
        var ticking = false;
        function updateParallax() {
            parallaxElements.forEach(function (el) {
                var speed = parseFloat(el.dataset.parallax) || 0.1;
                var rect = el.getBoundingClientRect();
                var center = rect.top + rect.height / 2;
                var viewCenter = window.innerHeight / 2;
                var offset = (center - viewCenter) * speed;
                el.style.transform = 'translateY(' + offset + 'px)';
            });
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        updateParallax();
    }

    /* ═══════ COUNTER ANIMATION ═══════ */
    var statNums = document.querySelectorAll('.ed-stat-num, .stat-num');
    if (statNums.length > 0) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var nums = entry.target.querySelectorAll('.ed-stat-num, .stat-num');
                nums.forEach(function (el) {
                    var target = parseInt(el.dataset.target);
                    if (!target) return;
                    var duration = 1600;
                    var start = performance.now();
                    function update(now) {
                        var elapsed = now - start;
                        var progress = Math.min(elapsed / duration, 1);
                        var ease = 1 - Math.pow(1 - progress, 4);
                        el.textContent = Math.floor(ease * target);
                        if (progress < 1) requestAnimationFrame(update);
                        else el.textContent = target;
                    }
                    requestAnimationFrame(update);
                });
                // Also fill stat bars (legacy pages)
                entry.target.querySelectorAll('.stat-bar-fill').forEach(function (bar) {
                    setTimeout(function () { bar.style.width = '100%'; }, 200);
                });
                counterObserver.disconnect();
            });
        }, { threshold: 0.25 });

        var statsSection = document.querySelector('.ed-stats') || document.querySelector('.stats-section');
        if (statsSection) counterObserver.observe(statsSection);
    }

    /* ═══════ AOS FALLBACK (for legacy pages) ═══════ */
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 });
    }

    /* ═══════ ACCORDION ═══════ */
    document.querySelectorAll('.accordion-trigger').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = this.closest('.accordion-item');
            var content = item.querySelector('.accordion-content');
            var open = item.classList.contains('active');
            item.closest('.accordion').querySelectorAll('.accordion-item').forEach(function (i) {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });
            if (!open) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    /* ═══════ SERVICES ACCORDION ═══════ */
    document.querySelectorAll('.ed-srow-head').forEach(function (head) {
        head.addEventListener('click', function () {
            var row = this.closest('.ed-srow');
            var panel = row.querySelector('.ed-srow-panel');
            var isOpen = row.classList.contains('open');

            // Close all other rows
            document.querySelectorAll('.ed-srow.open').forEach(function (openRow) {
                if (openRow !== row) {
                    openRow.classList.remove('open');
                    openRow.querySelector('.ed-srow-panel').style.maxHeight = null;
                }
            });

            if (isOpen) {
                row.classList.remove('open');
                panel.style.maxHeight = null;
            } else {
                row.classList.add('open');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    /* ═══════ CONTACT FORM ═══════ */
    /* Form contatti gestito da inviaContatto() in contatti.html */

    /* ═══════ ACADEMY AREA STUDENTI ═══════ */
    if (document.getElementById('area-studenti')) {
        mostraAreaCorsi();
    }
});

/* ═══════════ ACADEMY LOGIN SYSTEM ═══════════ */

var BACKEND_URL = 'https://web-production-f3794.up.railway.app';

/* ═══════ PAGE TRACKING (anonimo, aggregato — sempre attivo) ═══════ */
function trackPagina() {
    var payload = JSON.stringify({
        pagina: window.location.pathname || '/',
        referrer: document.referrer || ''
    });
    var url = BACKEND_URL + '/api/track';
    if (navigator.sendBeacon) {
        var blob = new Blob([payload], { type: 'text/plain' });
        if (navigator.sendBeacon(url, blob)) return;
    }
    try {
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: payload, keepalive: true }).catch(function() {});
    } catch(e) {}
}

/* ═══════ SCHEDE OPERATIVE (Academy → Risorse) — conteggio sempre attivo ═══════
   Il download/vista si conta sempre (anche senza consenso, in forma anonima);
   il visitor_id (per legare l'identità) viene incluso solo con consenso. */
function sbSchedaTrack(azione, slug) {
    var payload = {
        tipo: azione,
        pagina: window.location.pathname || '/',
        valore: String(slug).slice(0, 300),
        referrer: document.referrer || ''
    };
    if (sbConsent() === 'accepted') {
        payload.visitor_id = sbVisitorId();
        payload.session_id = sbSessionId();
    }
    var body = JSON.stringify(payload);
    var url = BACKEND_URL + '/api/traffico/track';
    if (navigator.sendBeacon) {
        if (navigator.sendBeacon(url, new Blob([body], { type: 'text/plain' }))) return;
    }
    try {
        fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: body, keepalive: true }).catch(function() {});
    } catch(e) {}
}
function sbInitSchede() {
    document.addEventListener('click', function(e) {
        var scheda = e.target.closest && e.target.closest('.risorsa-download, .risorsa-preview, .risorsa-esempio');
        if (!scheda) return;
        var href = scheda.getAttribute('href') || '';
        var slug = href.split('/').pop().replace('.pdf', '').replace('-esempio', '');
        if (!slug) return;
        var azione = scheda.classList.contains('risorsa-download') ? 'scheda_download' : 'scheda_vista';
        sbSchedaTrack(azione, slug);
    }, true);
}

/* ═══════ CONSENSO COOKIE + TRACKING PER-VISITATORE ═══════ */
var SB_CONSENT_KEY = 'sb_consent';
var META_PIXEL_ID = '802862849322298'; // dataset "SB food consulting"
function sbConsent() { try { return localStorage.getItem(SB_CONSENT_KEY); } catch(e){ return null; } }
function sbUuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
        var r = Math.random()*16|0; return (c==='x'?r:(r&0x3|0x8)).toString(16); });
}
function sbVisitorId() {
    try { var v = localStorage.getItem('sb_vid'); if(!v){v=sbUuid();localStorage.setItem('sb_vid',v);} return v; }
    catch(e){ return null; }
}
function sbSessionId() {
    try { var s = sessionStorage.getItem('sb_sid'); if(!s){s=sbUuid();sessionStorage.setItem('sb_sid',s);} return s; }
    catch(e){ return null; }
}
function sbSend(tipo, valore) {
    if (sbConsent() !== 'accepted') return;
    var vid = sbVisitorId(); if (!vid) return;
    var payload = JSON.stringify({
        visitor_id: vid, session_id: sbSessionId(), tipo: tipo,
        pagina: window.location.pathname || '/',
        valore: (valore == null ? '' : String(valore)).slice(0,300),
        referrer: document.referrer || ''
    });
    var url = BACKEND_URL + '/api/traffico/track';
    if (navigator.sendBeacon) { if (navigator.sendBeacon(url, new Blob([payload],{type:'text/plain'}))) return; }
    try { fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true}).catch(function(){}); } catch(e){}
}
// Identità: le pagine la chiamano quando l'utente lascia i dati (form, email checklist)
window.sbIdentify = function(email, nome) {
    if (sbConsent() !== 'accepted' || !email) return;
    var vid = sbVisitorId(); if (!vid) return;
    try {
        fetch(BACKEND_URL + '/api/traffico/identifica', {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ visitor_id: vid, session_id: sbSessionId(), email: email, nome: nome||'', pagina: window.location.pathname }),
            keepalive: true
        }).catch(function(){});
    } catch(e){}
};
var _sbStart = Date.now();
var _sbScrollHits = {};

/* Meta Pixel — caricato SOLO con consenso (consent-gated). Aggiuntivo al
   funnel interno: se manca il consenso resta tutto un no-op, il funnel gira. */
function sbLoadPixel() {
    if (sbConsent() !== 'accepted' || !META_PIXEL_ID || window.__sbPixelLoaded) return;
    window.__sbPixelLoaded = true;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
}
// Evento custom Meta. No-op se non c'è consenso/pixel. fbq accoda gli eventi
// anche prima che fbevents.js finisca di caricare (ok in in-app browser).
window.sbPixel = function(evento, params) {
    try { if (window.fbq) window.fbq('trackCustom', evento, params || {}); } catch(e) {}
};

function sbInitTracking() {
    if (sbConsent() !== 'accepted') return;
    sbLoadPixel();
    sbSend('pageview');
    document.addEventListener('click', function(e){
        var el = e.target.closest && e.target.closest('a, button, [data-track]');
        if (!el) return;
        var label = el.getAttribute('data-track') || (el.textContent||'').trim() || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName;
        sbSend('click', String(label).slice(0,120));
    }, true);
    window.addEventListener('scroll', function(){
        var h = document.documentElement;
        if (h.scrollHeight <= window.innerHeight) return;
        var perc = Math.round((h.scrollTop + window.innerHeight) / h.scrollHeight * 100);
        [25,50,75,100].forEach(function(m){ if (perc >= m && !_sbScrollHits[m]){ _sbScrollHits[m]=true; sbSend('scroll', m); } });
    }, { passive: true });
    function sendTime(){ var sec = Math.round((Date.now()-_sbStart)/1000); if (sec>0 && sec<7200) sbSend('tempo', sec); }
    document.addEventListener('visibilitychange', function(){ if (document.visibilityState==='hidden') sendTime(); });
    window.addEventListener('pagehide', sendTime);
}

/* ═══════ BANNER CONSENSO ═══════ */
function sbInjectBannerStyle() {
    if (document.getElementById('sb-cb-style')) return;
    var css = '#sb-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;background:#37393f;color:#f5f2ee;border-radius:14px;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.35);z-index:9999;font-family:Inter,-apple-system,sans-serif;display:flex;flex-direction:column;gap:14px;animation:sbcbup .4s cubic-bezier(.4,0,.2,1)}'+
    '@keyframes sbcbup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'+
    '#sb-cookie-banner .sb-cb-text{font-size:.84rem;line-height:1.55;color:rgba(245,242,238,.85)}'+
    '#sb-cookie-banner a{color:#e08a4f;text-decoration:underline}'+
    '#sb-cookie-banner .sb-cb-actions{display:flex;gap:10px;justify-content:flex-end}'+
    '#sb-cookie-banner button{padding:10px 22px;border:none;border-radius:8px;font-family:inherit;font-size:.85rem;font-weight:600;cursor:pointer}'+
    '#sb-cookie-banner .sb-cb-reject{background:transparent;color:#f5f2ee;border:1px solid rgba(245,242,238,.3)}'+
    '#sb-cookie-banner .sb-cb-accept{background:#c4622d;color:#fff}'+
    '@media(max-width:520px){#sb-cookie-banner .sb-cb-actions{flex-direction:column-reverse}#sb-cookie-banner button{width:100%}}';
    var s = document.createElement('style'); s.id='sb-cb-style'; s.textContent=css; document.head.appendChild(s);
}
window.sbSetConsent = function(val) {
    try { localStorage.setItem(SB_CONSENT_KEY, val); } catch(e){}
    var b = document.getElementById('sb-cookie-banner'); if (b) b.remove();
    if (val === 'accepted') sbInitTracking();
};
function sbShowBanner() {
    if (sbConsent()) return;
    sbInjectBannerStyle();
    var b = document.createElement('div');
    b.id = 'sb-cookie-banner';
    b.setAttribute('role','dialog');
    b.setAttribute('aria-label','Consenso cookie');
    b.innerHTML =
        '<div class="sb-cb-text">Usiamo cookie tecnici e, con il tuo consenso, cookie di analisi per capire come navighi e migliorare il sito. '+
        '<a href="/cookie-policy.html">Cookie policy</a> &middot; <a href="/privacy-policy.html">Privacy</a></div>'+
        '<div class="sb-cb-actions">'+
            '<button class="sb-cb-reject" onclick="sbSetConsent(\'rejected\')">Rifiuta</button>'+
            '<button class="sb-cb-accept" onclick="sbSetConsent(\'accepted\')">Accetta</button>'+
        '</div>';
    document.body.appendChild(b);
}

document.addEventListener('DOMContentLoaded', function() {
    trackPagina();
    sbInitSchede();
    if (sbConsent() === 'accepted') sbInitTracking();
    sbShowBanner();
});

function handleLogin() {
    var email = document.getElementById('login-email');
    var password = document.getElementById('login-password');
    var errorEl = document.getElementById('login-error');
    if (!email || !password) return;

    var emailVal = email.value.trim();
    var passVal = password.value;

    if (!emailVal || !passVal) {
        if (errorEl) { errorEl.textContent = 'Inserisci email e password.'; errorEl.style.display = 'block'; }
        return;
    }

    if (errorEl) { errorEl.style.display = 'none'; }

    fetch(BACKEND_URL + '/api/studenti/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVal, password: passVal })
    })
    .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
    .then(function(result) {
        if (!result.ok || !result.data.success) {
            if (errorEl) { errorEl.textContent = result.data.error || 'Credenziali non corrette.'; errorEl.style.display = 'block'; }
            return;
        }
        localStorage.setItem('sb_user', JSON.stringify({ email: emailVal, nome: result.data.nome, moduli: result.data.moduli }));
        mostraAreaCorsi();
    })
    .catch(function() {
        if (errorEl) { errorEl.textContent = 'Errore di connessione. Riprova.'; errorEl.style.display = 'block'; }
    });
}

function handleLogout() {
    localStorage.removeItem('sb_user');
    var loginBox = document.getElementById('login-box');
    var corsiBox = document.getElementById('corsi-box');
    if (loginBox) loginBox.style.display = 'block';
    if (corsiBox) corsiBox.style.display = 'none';
}

function mostraAreaCorsi() {
    var raw = localStorage.getItem('sb_user');
    var userData = raw ? JSON.parse(raw) : null;
    var loginBox = document.getElementById('login-box');
    var corsiBox = document.getElementById('corsi-box');

    if (!userData) {
        if (loginBox) loginBox.style.display = 'block';
        if (corsiBox) corsiBox.style.display = 'none';
        return;
    }

    if (loginBox) loginBox.style.display = 'none';
    if (corsiBox) corsiBox.style.display = 'block';

    var nomeEl = document.getElementById('user-name');
    if (nomeEl) nomeEl.textContent = userData.nome;

    for (var i = 1; i <= 5; i++) {
        var statusEl = document.getElementById('status-' + i);
        var rowEl = document.getElementById('modulo-row-' + i);

        if (userData.moduli.indexOf(i) !== -1) {
            if (statusEl) statusEl.innerHTML = '<span class="badge-unlocked">\u2713 Acquistato</span><button onclick="toggleContenuti(' + i + ')" class="btn btn-primary" style="font-size:0.8rem;padding:8px 16px">Apri modulo</button>';
            if (rowEl) rowEl.classList.add('unlocked');
        }
    }
}

function toggleContenuti(moduloId) {
    var el = document.getElementById('contenuti-' + moduloId);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function apriLezione(moduloId, lezioneId) {
    var userData = JSON.parse(localStorage.getItem('sb_user') || 'null');
    if (!userData) return;

    var modal = document.getElementById('lezione-modal');
    var titoloEl = document.getElementById('modal-titolo');
    var contenutoEl = document.getElementById('modal-contenuto');

    if (moduloId === 0 && lezioneId === 0) {
        if (titoloEl) titoloEl.textContent = 'Benvenuto nel corso';
        if (contenutoEl) contenutoEl.innerHTML =
            '<div style="margin-bottom:20px"><p style="color:#6b6560;font-size:0.95rem;line-height:1.7;margin-bottom:20px">Benvenuto nella SB Food Academy. In questo video Simone Braghetta ti presenta il corso, gli obiettivi di ogni modulo e come ottenere il massimo dal percorso formativo.</p></div>' +
            '<video controls style="width:100%;max-height:65vh;border-radius:0;background:#000;object-fit:contain;display:block" controlsList="nodownload"><source src="assets/video/presentazione-corso/presentazione.mp4" type="video/mp4">Il tuo browser non supporta la riproduzione video.</video>';
        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        return;
    }

    if (!userData.moduli.includes(moduloId)) return;

    // Challenge del modulo (contenuto statico da challenges.js)
    if (lezioneId === 5) {
        var ch = window.CHALLENGES ? window.CHALLENGES[moduloId] : null;
        if (titoloEl) titoloEl.textContent = ch ? ch.nome : 'La Challenge del modulo';
        if (contenutoEl) contenutoEl.innerHTML = window.renderChallengeHTML ? renderChallengeHTML(moduloId) : '<p>Contenuto non disponibile.</p>';
        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        return;
    }

    var cartelleModuli = { 1: 'controllo-ristorante', 2: 'risultati-giusti', 3: 'blocchi-crescita', 4: 'arte-accoglienza', 5: 'lancio-locale' };
    var nomiLezioni = { 1: 'Introduzione al modulo', 2: 'Slides esplicative', 3: 'Video di approfondimento', 4: 'Podcast \u2014 caso reale' };
    var cartella = cartelleModuli[moduloId];

    if (lezioneId === 0) {
        if (titoloEl) titoloEl.textContent = 'Introduzione di Simone \u2014 Modulo ' + moduloId;
        if (contenutoEl) contenutoEl.innerHTML =
            '<div style="margin-bottom:20px"><p style="color:#6b6560;font-size:0.95rem;line-height:1.7;margin-bottom:20px">Simone Braghetta introduce questo modulo \u2014 cosa imparerai, perch\u00e9 \u00e8 importante e come applicarlo nel tuo locale.</p></div>' +
            '<video controls style="width:100%;max-height:65vh;border-radius:0;background:#000;object-fit:contain;display:block" controlsList="nodownload"><source src="assets/video/' + cartella + '/simone/intro-simone.mp4" type="video/mp4">Il tuo browser non supporta la riproduzione video.</video>';
        if (modal) modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        return;
    }

    var titolo = 'Modulo ' + moduloId + ' \u2014 ' + nomiLezioni[lezioneId];
    if (titoloEl) titoloEl.textContent = titolo;

    var contenutoHTML = '';
    if (lezioneId === 1 || lezioneId === 3) {
        var nomeFile = lezioneId === 1 ? 'introduzione' : 'approfondimento';
        contenutoHTML = '<video controls style="width:100%;max-height:65vh;border-radius:0;background:#000;object-fit:contain;display:block" controlsList="nodownload"><source src="assets/video/' + cartella + '/' + nomeFile + '.mp4" type="video/mp4">Il tuo browser non supporta la riproduzione video.</video>';
    } else if (lezioneId === 2) {
        contenutoHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #edeae5"><span style="font-size:0.85rem;color:#6b6560">Slides esplicative \u2014 PDF</span><a href="assets/pdf/' + cartella + '/slides.pdf" download style="display:inline-flex;align-items:center;gap:6px;background:#c4622d;color:#fff;padding:7px 14px;font-size:0.8rem;font-weight:500;text-decoration:none">\u2193 Scarica PDF</a></div><iframe src="assets/pdf/' + cartella + '/slides.pdf" style="width:100%;height:75vh;border:none;display:block"></iframe>';
    } else if (lezioneId === 4) {
        contenutoHTML = '<div style="padding:40px 0"><div style="text-align:center;margin-bottom:32px"><div style="font-size:3rem;margin-bottom:16px">\uD83C\uDF99</div><h3 style="font-family:Playfair Display,serif;color:#37393f;margin-bottom:8px">Podcast \u2014 caso reale</h3><p style="color:#6b6560">Ascolta il racconto di un caso operativo reale.</p></div><audio controls style="width:100%;margin-top:16px" controlsList="nodownload"><source src="assets/audio/' + cartella + '/podcast.m4a" type="audio/mp4">Il tuo browser non supporta la riproduzione audio.</audio></div>';
    }

    if (contenutoEl) contenutoEl.innerHTML = contenutoHTML;
    if (modal) modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function chiudiLezione() {
    var modal = document.getElementById('lezione-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chiudiLezione();
});
