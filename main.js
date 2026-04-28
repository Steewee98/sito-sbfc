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

var utenti = {
    'demo@sbfoodacademy.com': { password: 'sbfood2025', nome: 'Utente Demo', moduli: [1,2,3,4,5] },
    'modulo1@test.com': { password: 'test123', nome: 'Studente', moduli: [1] }
};

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

    var utente = utenti[emailVal];
    if (!utente || utente.password !== passVal) {
        if (errorEl) { errorEl.textContent = 'Credenziali non corrette. Controlla email e password.'; errorEl.style.display = 'block'; }
        return;
    }

    localStorage.setItem('sb_user', JSON.stringify({ email: emailVal, nome: utente.nome, moduli: utente.moduli }));
    mostraAreaCorsi();
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
