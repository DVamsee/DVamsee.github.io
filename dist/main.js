// Drawing set — shared layout + behaviour.
// Every page: <body data-page="..."> with <div id="site-header"> / <div id="site-footer"> placeholders.
// Detail sheets add data-detail (no prev/next) plus data-sheet / data-title for the title block.

window.__bp = true;

const SHEETS = [
    { id: 'home', href: 'index.html', label: 'Home', title: 'General arrangement' },
    { id: 'experience', href: 'experience.html', label: 'Experience', title: 'Elevation — work' },
    { id: 'projects', href: 'projects.html', label: 'Projects', title: 'Project details' },
    { id: 'art', href: 'art.html', label: 'Art', title: 'Gesture studies' },
    { id: 'blog', href: 'blog.html', label: 'Blog', title: 'Drawing register' },
    { id: 'skills', href: 'skills.html', label: 'Skills', title: 'Bill of materials' },
    { id: 'education', href: 'education.html', label: 'Education', title: 'Elevation — study' },
    { id: 'contact', href: 'contact.html', label: 'Contact', title: 'Request for information' },
];
const TOTAL = String(SHEETS.length).padStart(2, '0');

const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" aria-hidden="true"><path d="M3 12h17M14 6l6 6-6 6"/></svg>',
};

const BRAND_MARK = '<svg class="brand-mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" aria-hidden="true">'
    + '<circle cx="16" cy="16" r="11.5" stroke-width="1.5"/>'
    + '<path d="M16 0v7M16 25v7M0 16h7M25 16h7" stroke-width="1"/>'
    + '<path class="r" d="M10.6 10.5 16 22l5.4-11.5" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="miter"/></svg>';

const SOCIALS = [
    { href: 'https://github.com/DVamsee', icon: ICONS.github, label: 'GitHub', handle: '@DVamsee' },
    { href: 'https://twitter.com/one_c_d', icon: ICONS.twitter, label: 'X', handle: '@one_c_d' },
    { href: 'https://www.instagram.com/vamsee.d', icon: ICONS.instagram, label: 'Instagram', handle: '@vamsee.d' },
];

const body = document.body;
const root = document.documentElement;
const currentPage = body.dataset.page || 'home';
const isDetail = 'detail' in body.dataset;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pageIndex = SHEETS.findIndex(function (p) { return p.id === currentPage; });
const sheetNo = body.dataset.sheet || String(pageIndex + 1).padStart(2, '0');
const sheetTitle = body.dataset.title || (SHEETS[pageIndex] ? SHEETS[pageIndex].title : '');

function current(id) { return id === currentPage ? ' aria-current="page"' : ''; }
function nn(i) { return String(i + 1).padStart(2, '0'); }

function headerHtml() {
    const links = SHEETS.map(function (p, i) {
        return '<a href="' + p.href + '"' + current(p.id) + '><span class="n">' + nn(i) + '</span>' + p.label + '</a>';
    }).join('');
    const mobile = SHEETS.map(function (p, i) {
        return '<li><a href="' + p.href + '"' + current(p.id) + '><span class="n">' + nn(i) + '</span><span class="t">' + p.label + '</span><span class="s">' + p.title + '</span></a></li>';
    }).join('');
    const socials = SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener">' + s.label + '</a>';
    }).join('');

    return '<a class="skip-link" href="#main">Skip to content</a>'
        + '<div class="sheet-frame" aria-hidden="true">'
        + '<div class="zones zt">' + 'ABCDEFGH'.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>'
        + '<div class="zones zb">' + 'ABCDEFGH'.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>'
        + '<div class="zones zl">' + '123456'.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>'
        + '<div class="zones zr">' + '123456'.split('').map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>'
        + '<div class="readout">X 0000 · Y 0000</div>'
        + '</div>'
        + '<header class="site-header"><div class="hdr">'
        + '<a href="index.html" class="brand" aria-label="Vamsee — home">' + BRAND_MARK
        + '<span class="brand-txt"><span class="brand-name">VAMSEE</span><span class="brand-sub">Drawing set · Rev 2026</span></span></a>'
        + '<nav class="nav" aria-label="Primary">' + links + '</nav>'
        + '<div class="hdr-tools">'
        + '<button class="theme-btn" type="button" aria-pressed="false" aria-label="Blueprint (dark) mode">'
        + '<span class="opt o-l" aria-hidden="true"><i></i><span class="o-txt">Film</span></span>'
        + '<span class="opt o-d" aria-hidden="true"><i></i><span class="o-txt">Blueprint</span></span></button>'
        + '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-menu"><span class="bars" aria-hidden="true"></span><span class="mb-t">Index</span></button>'
        + '</div></div></header>'
        + '<div class="mobile-menu" id="mobile-menu">'
        + '<div class="mm-cap lbl"><span>Sheet index</span><span>' + TOTAL + ' sheets</span></div>'
        + '<nav aria-label="Sheets"><ol>' + mobile + '</ol></nav>'
        + '<div class="mm-foot">' + socials + '</div></div>';
}

function footerHtml() {
    const idx = isDetail ? -1 : pageIndex;
    const prev = idx > 0 ? SHEETS[idx - 1] : null;
    const next = idx >= 0 && idx < SHEETS.length - 1 ? SHEETS[idx + 1] : null;
    let pager = '';
    if (isDetail) {
        const parent = SHEETS[pageIndex];
        pager = '<nav class="pager" aria-label="Sheets"><a class="prev" href="' + (body.dataset.parent || parent.href) + '">' + ICONS.arrow
            + '<span><small>Back to sheet ' + nn(pageIndex) + '</small><span>' + parent.label + '</span></span></a></nav>';
    } else if (idx >= 0) {
        pager = '<nav class="pager" aria-label="Sheets">'
            + (prev ? '<a class="prev" href="' + prev.href + '">' + ICONS.arrow + '<span><small>Sheet ' + nn(idx - 1) + ' · previous</small><span>' + prev.label + '</span></span></a>' : '')
            + (next ? '<a class="next" href="' + next.href + '"><span><small>Next · sheet ' + nn(idx + 1) + '</small><span>' + next.label + '</span></span>' + ICONS.arrow + '</a>' : '')
            + '</nav>';
    }

    const rfi = currentPage === 'contact' ? '' :
        '<div class="footer-rfi">'
        + '<div><span class="lbl">Status · open to conversations</span>'
        + '<a href="contact.html" class="big">Let&rsquo;s build something <em>thoughtful</em>.</a>'
        + '<p>Backend, logistics tech, or just a hello.</p></div>'
        + '<a class="btn btn-ink" href="contact.html">Raise an RFI ' + ICONS.arrow + '</a>'
        + '</div>';

    const links = SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener">' + s.icon + s.label + '</a>';
    }).join('');

    return '<footer class="site-footer"><div class="wrap">'
        + pager + rfi
        + '<div class="title-block">'
        + '<div class="tb-id">' + BRAND_MARK + '<span><span class="nm">VAMSEE</span><small>Engineer &amp; artist</small></span></div>'
        + '<div><span class="k">Project</span><span class="v">Portfolio — drawing set</span></div>'
        + '<div class="tb-wide"><span class="k">Sheet title</span><span class="v">' + sheetTitle + '</span></div>'
        + '<div><span class="k">Drawn by</span><span class="v">Vamsee</span></div>'
        + '<div class="tb-sheet"><span class="k">Sheet</span><span class="v">' + sheetNo + ' <small>of ' + TOTAL + '</small></span></div>'
        + '<div class="last-row"><span class="k">Scale</span><span class="v">1 : 1</span></div>'
        + '<div class="last-row"><span class="k">Rev</span><span class="v">2026</span></div>'
        + '<div class="last-row"><span class="k">Elsewhere</span><span class="v tb-links">' + links + '</span></div>'
        + '<div class="last-row"><span class="k">&copy; 2026</span><span class="v">Built by hand</span></div>'
        + '</div></div></footer>';
}

function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
}
mount('site-header', headerHtml());
mount('site-footer', footerHtml());
body.insertAdjacentHTML('beforeend', '<div class="scroll-progress" aria-hidden="true"></div>');
if (!reduceMotion) root.classList.add('zones-in');

/* ---------- theme: film (light) / blueprint (dark) ---------- */
(function () {
    const btn = document.querySelector('.theme-btn');
    const meta = document.querySelector('meta[name="theme-color"]');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    function stored() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
    function apply(theme) {
        root.dataset.theme = theme;
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B3050' : '#F3F7F9');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.title = theme === 'dark' ? 'Switch to film (light)' : 'Switch to blueprint (dark)';
        }
        // rev clouds read colours from CSS; nothing else to recompute
    }
    function switchTo(theme) {
        try { localStorage.setItem('theme', theme); } catch (e) {}
        if (reduceMotion) { apply(theme); return; }
        if (!document.startViewTransition) {
            root.classList.add('theme-fade');
            apply(theme);
            setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
            return;
        }
        // the copy comes out of the print machine: new sheet wipes down over the old one
        const t = document.startViewTransition(function () { apply(theme); });
        t.ready.then(function () {
            root.animate(
                { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] },
                { duration: 720, easing: 'cubic-bezier(.65,.05,.25,1)', pseudoElement: '::view-transition-new(root)' }
            );
            root.animate(
                { filter: ['brightness(1)', 'brightness(.92)'] },
                { duration: 720, easing: 'linear', pseudoElement: '::view-transition-old(root)' }
            );
        }).catch(function () {});
    }
    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');
    if (btn) btn.addEventListener('click', function () { switchTo(root.dataset.theme === 'dark' ? 'light' : 'dark'); });
    systemDark.addEventListener('change', function (e) {
        const s = stored();
        if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light');
    });
})();

/* ---------- mobile sheet index ---------- */
(function () {
    const btn = document.querySelector('.menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    const label = btn.querySelector('.mb-t');
    function setOpen(open) {
        body.classList.toggle('menu-open', open);
        body.style.overflow = open ? 'hidden' : '';
        btn.setAttribute('aria-expanded', String(open));
        if (label) label.textContent = open ? 'Close' : 'Index';
    }
    btn.addEventListener('click', function () { setOpen(!body.classList.contains('menu-open')); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) { setOpen(false); btn.focus(); }
    });
    window.matchMedia('(min-width: 1180px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
})();

/* ---------- elevation: place the NOW line at today's date ---------- */
(function () {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 1);
    const frac = d.getFullYear() + (d - start) / (365.25 * 864e5);
    document.querySelectorAll('[data-now]').forEach(function (el) { el.style.setProperty('--at', frac.toFixed(3)); });
    document.querySelectorAll('[data-now-end]').forEach(function (el) { el.style.setProperty('--e', frac.toFixed(3)); });
})();

/* ---------- callouts: numbered balloons + leader lines over a viewport ---------- */
(function () {
    const NS = 'http://www.w3.org/2000/svg';
    document.querySelectorAll('ol.legend[data-for]').forEach(function (list) {
        const fig = document.getElementById(list.dataset.for);
        if (!fig) return;
        const box = fig.querySelector('.vp-box, .pin-box') || fig;
        const layer = document.createElement('div');
        layer.className = 'pins';
        layer.setAttribute('aria-hidden', 'true');
        const svg = document.createElementNS(NS, 'svg');
        layer.appendChild(svg);
        const items = Array.from(list.querySelectorAll('li[data-at]'));
        items.forEach(function (li, i) {
            const at = li.dataset.at.split(',').map(Number);
            const b = (li.dataset.b || li.dataset.at).split(',').map(Number);
            const n = i + 1;
            const delay = (0.25 + i * 0.18) + 's';
            const g = document.createElementNS(NS, 'g');
            const halo = document.createElementNS(NS, 'line');
            const line = document.createElementNS(NS, 'line');
            [halo, line].forEach(function (l) {
                l.setAttribute('x1', b[0] + '%'); l.setAttribute('y1', b[1] + '%');
                l.setAttribute('x2', at[0] + '%'); l.setAttribute('y2', at[1] + '%');
                l.setAttribute('pathLength', '1');
                l.style.transitionDelay = delay;
            });
            halo.setAttribute('class', 'halo');
            const dot = document.createElementNS(NS, 'circle');
            dot.setAttribute('cx', at[0] + '%'); dot.setAttribute('cy', at[1] + '%'); dot.setAttribute('r', '3.2');
            dot.style.transitionDelay = delay;
            g.appendChild(halo); g.appendChild(line); g.appendChild(dot);
            svg.appendChild(g);
            const pin = document.createElement('span');
            pin.className = 'pin';
            pin.textContent = n;
            pin.style.left = b[0] + '%';
            pin.style.top = b[1] + '%';
            pin.style.transitionDelay = (0.45 + i * 0.18) + 's, ' + (0.45 + i * 0.18) + 's, 0s, 0s';
            layer.appendChild(pin);
            function hot(on) { pin.classList.toggle('hot', on); li.classList.toggle('hot', on); }
            li.addEventListener('mouseenter', function () { hot(true); });
            li.addEventListener('mouseleave', function () { hot(false); });
            pin.addEventListener('mouseenter', function () { hot(true); });
            pin.addEventListener('mouseleave', function () { hot(false); });
        });
        box.appendChild(layer);
        fig.classList.add('has-pins');
    });
})();

/* ---------- revision clouds around [data-rc] ---------- */
(function () {
    const els = document.querySelectorAll('[data-rc]');
    if (!els.length) return;
    const NS = 'http://www.w3.org/2000/svg';
    function cloud(w, h, step) {
        let d = 'M0 0';
        function edge(x0, y0, x1, y1) {
            const len = Math.hypot(x1 - x0, y1 - y0);
            const n = Math.max(1, Math.round(len / step));
            for (let i = 1; i <= n; i++) {
                const x = x0 + (x1 - x0) * i / n, y = y0 + (y1 - y0) * i / n;
                const r = (len / n) * 0.62;
                d += ' A' + r.toFixed(1) + ' ' + r.toFixed(1) + ' 0 0 1 ' + x.toFixed(1) + ' ' + y.toFixed(1);
            }
        }
        edge(0, 0, w, 0); edge(w, 0, w, h); edge(w, h, 0, h); edge(0, h, 0, 0);
        return d;
    }
    function draw(el) {
        let svg = el.querySelector(':scope > .rc');
        const pad = parseFloat(el.dataset.rcPad || 10);
        const w = el.offsetWidth + pad * 2, h = el.offsetHeight + pad * 2;
        if (!svg) {
            svg = document.createElementNS(NS, 'svg');
            svg.setAttribute('class', 'rc');
            svg.setAttribute('aria-hidden', 'true');
            el.classList.add('has-rc');
            el.appendChild(svg);
        }
        svg.style.left = -pad + 'px'; svg.style.top = -pad + 'px';
        svg.setAttribute('width', w); svg.setAttribute('height', h);
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
        const tx = w + 4, ty = -2;
        svg.innerHTML = '<path class="cloud" pathLength="1" d="' + cloud(w, h, 18) + '"/>'
            + '<path class="tri" d="M' + (tx) + ' ' + (ty - 12) + ' l11 19 h-22 z"/>'
            + '<text x="' + tx + '" y="' + (ty + 4) + '" text-anchor="middle">' + (el.dataset.rc || '1') + '</text>';
    }
    els.forEach(draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { els.forEach(draw); });
    if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(function (entries) { entries.forEach(function (e) { draw(e.target); }); });
        els.forEach(function (el) { ro.observe(el); });
    }
})();

/* ---------- hover measurements ---------- */
(function () {
    document.querySelectorAll('.measure').forEach(function (el) {
        el.addEventListener('pointerenter', function () {
            const r = el.getBoundingClientRect();
            el.setAttribute('data-w', Math.round(r.width) + ' px');
            el.setAttribute('data-h', Math.round(r.height) + ' px');
        });
    });
})();

/* ---------- count-up figures ---------- */
function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const set = function (v) { el.firstChild.nodeValue = v.toFixed(decimals); };
    if (reduceMotion || !el.firstChild) return;
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / 1400, 1);
        set(target * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(step);
    }
    set(0);
    requestAnimationFrame(step);
}

/* ---------- reveal: plot lines, extend dimensions, draw leaders ---------- */
(function () {
    const sel = '.reveal, .dim, .plot.draw, .brush-anim, .elev, .has-pins, .stamp-card, .has-rc';
    const items = Array.from(document.querySelectorAll(sel));
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('in'); });
        return;
    }
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            io.unobserve(el);
            if (el.classList.contains('reveal')) {
                const sibs = Array.from(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
                const delay = Math.min(Math.max(sibs.indexOf(el), 0), 5) * 0.09;
                el.style.transitionDelay = delay + 's';
                setTimeout(function () { el.style.transitionDelay = ''; }, delay * 1000 + 900);
            }
            el.classList.add('in');
            el.querySelectorAll('[data-count]').forEach(countUp);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
})();

/* ---------- scroll: progress, header, CAD readout ---------- */
(function () {
    const progress = document.querySelector('.scroll-progress');
    const header = document.querySelector('.site-header');
    const readout = document.querySelector('.sheet-frame .readout');
    let lastY = window.scrollY, ticking = false, mx = 0, my = 0;
    function pad(n) { return String(Math.max(0, Math.round(n))).padStart(4, '0'); }
    function update() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
        if (header && !body.classList.contains('menu-open')) {
            if (y > lastY && y > 260) header.classList.add('hidden-up');
            else if (y < lastY) header.classList.remove('hidden-up');
        }
        if (readout) readout.textContent = 'X ' + pad(mx) + ' · Y ' + pad(my + y);
        lastY = y;
        ticking = false;
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    if (readout && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('pointermove', function (e) { mx = e.clientX; my = e.clientY; req(); }, { passive: true });
    }
    update();
})();

/* ---------- leave the sheet gently ---------- */
(function () {
    if (reduceMotion) return;
    document.addEventListener('click', function (e) {
        const a = e.target.closest('a');
        if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin || url.protocol === 'file:' && url.pathname === location.pathname) return;
        if (url.pathname === location.pathname && url.hash) return;
        e.preventDefault();
        body.classList.add('is-leaving');
        setTimeout(function () { location.href = url.href; }, 200);
    });
    window.addEventListener('pageshow', function (e) { if (e.persisted) body.classList.remove('is-leaving'); });
})();
