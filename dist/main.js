// The sketchbook: shared header/footer, theme, contents menu, hand-drawn marks,
// reveals and the drawing lightbox.
// Every page has <body data-page="..."> plus <div id="site-header"></div> and
// <div id="site-footer"></div> placeholders. data-detail on <body> hides prev/next.

const PAGES = [
    { id: 'home', href: 'index.html', label: 'Home' },
    { id: 'experience', href: 'experience.html', label: 'Experience' },
    { id: 'projects', href: 'projects.html', label: 'Projects' },
    { id: 'art', href: 'art.html', label: 'Art' },
    { id: 'blog', href: 'blog.html', label: 'Blog' },
    { id: 'skills', href: 'skills.html', label: 'Skills' },
    { id: 'education', href: 'education.html', label: 'Education' },
    { id: 'contact', href: 'contact.html', label: 'Contact' },
];

const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".6" fill="currentColor"/></svg>',
};

// A pen-drawn arrow, slightly uneven, like one drawn in a margin
const ARROW = '<svg class="arrow" viewBox="0 0 46 22" aria-hidden="true"><path d="M2 12 C 12 9, 26 13, 42 10"/><path d="M33 3 C 37 6, 40 8, 43 10 C 39 12, 36 15, 33 19"/></svg>';

const SOCIALS = [
    { href: 'https://github.com/DVamsee', icon: ICONS.github, label: 'GitHub', handle: '@DVamsee' },
    { href: 'https://twitter.com/one_c_d', icon: ICONS.twitter, label: 'Twitter / X', handle: '@one_c_d' },
    { href: 'https://www.instagram.com/vamsee.d', icon: ICONS.instagram, label: 'Instagram', handle: '@vamsee.d' },
];

// A small sketchbook page: white paper by day, black paper at night
const THEME_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true">'
    + '<path class="sheet-shape" d="M6.5 7.5 L26 6.8 L25.4 28 L6 27.4 Z"/>'
    + '<g class="rings"><path d="M10 4v5M14.5 4v5M19 4v5M23.5 4v5"/></g>'
    + '<path class="squiggle" d="M10 21 C 12 14, 15 25, 17.5 17 S 22 15, 22.5 20"/></svg>';

const currentPage = document.body.dataset.page || 'home';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
root.classList.add('js');

function current(id) {
    return id === currentPage ? ' aria-current="page"' : '';
}

// Hand-drawn strokes: a few variants so no two marks look identical
const UNDERLINES = [
    'M2 10 C 30 5, 70 3, 110 8 S 170 12, 198 6',
    'M3 8 C 45 12, 95 4, 140 7 S 185 11, 197 7',
    'M2 9 C 40 4, 80 11, 120 7 S 175 4, 198 9',
];
const RINGS = [
    'M108 6 C 60 0, 8 10, 5 38 C 2 66, 60 76, 112 72 C 170 68, 198 50, 194 30 C 190 8, 140 2, 92 8',
    'M96 4 C 44 4, 3 18, 6 42 C 9 68, 72 76, 124 70 C 176 64, 199 44, 192 24 C 184 4, 128 0, 80 10',
];

function scrawl(kind, i) {
    if (kind === 'ul') {
        return '<svg class="scrawl" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + UNDERLINES[i % UNDERLINES.length] + '"/></svg>';
    }
    return '<svg class="scrawl" viewBox="0 0 200 78" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + RINGS[i % RINGS.length] + '"/></svg>';
}

function headerHtml() {
    const tabs = PAGES.map(function (p, i) {
        const isCurrent = p.id === currentPage;
        const mark = isCurrent
            ? '<svg class="scrawl ring" viewBox="0 0 200 78" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + RINGS[i % 2] + '"/></svg>'
            : '<svg class="scrawl under" viewBox="0 0 200 78" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M14 66 C 60 60, 120 70, 186 62"/></svg>';
        return '<a href="' + p.href + '"' + current(p.id) + '>' + p.label + mark + '</a>';
    }).join('');

    const contents = PAGES.map(function (p, i) {
        return '<li><a href="' + p.href + '"' + current(p.id) + '><span>' + p.label + '</span><span class="n">p. ' + (i + 1) + '</span></a></li>';
    }).join('');

    const socials = SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener">' + s.label + '</a>';
    }).join('');

    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
        <div class="header-inner">
            <a href="index.html" class="brand" aria-label="Vamsee, home"><span class="brand-name">Vamsee</span><span class="brand-sub">backend dev &middot; draws</span></a>
            <nav class="tabs" aria-label="Primary">${tabs}</nav>
            <div class="header-tools">
                <button class="theme-btn" type="button" aria-label="Black paper (dark mode)" aria-pressed="false">${THEME_ICON}</button>
                <button class="menu-btn" type="button" aria-expanded="false" aria-controls="contents-menu">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 5.5 C 8 5, 12 6, 17 5.2 M3 10.2 C 8 9.8, 12 10.6, 17 10 M3 15 C 7 14.6, 10 15.4, 13 14.8"/></svg>
                    Contents
                </button>
            </div>
        </div>
    </header>
    <div class="contents-menu" id="contents-menu" role="dialog" aria-modal="true" aria-label="Contents">
        <div class="contents-sheet">
            <button class="close-btn" type="button" aria-label="Close contents">&times;</button>
            <h2>Contents</h2>
            <nav aria-label="Primary (menu)"><ol>${contents}</ol></nav>
            <div class="menu-socials">${socials}</div>
        </div>
    </div>`;
}

function footerHtml() {
    const idx = 'detail' in document.body.dataset ? -1 : PAGES.findIndex(function (p) { return p.id === currentPage; });
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    const prevLink = prev ? '<a class="prev" href="' + prev.href + '">' + ARROW + '<span><small>back a few pages</small><span>' + prev.label + '</span></span></a>' : '';
    const nextLink = next ? '<a class="next" href="' + next.href + '"><span><small>turn the page</small><span>' + next.label + '</span></span>' + ARROW + '</a>' : '';
    const pager = idx >= 0 ? '<nav class="pager" aria-label="Chapters">' + prevLink + nextLink + '</nav>' : '';

    const note = currentPage === 'contact' ? '' : `
            <a class="sticky" href="contact.html" style="--r:-2.5deg">
                Backend, logistics tech, a role &mdash; or swapping notes on drawing?
                <span class="go">Say hi &rarr;</span>
            </a>`;

    const socials = SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + ' ' + s.handle + '">' + s.icon + '</a>';
    }).join('');

    return `
    <footer class="site-footer">
        ${pager}
        <div class="footer-row">
            ${note}
            <div class="footer-meta">
                <span class="sig-mark" aria-hidden="true">~ V.</span>
                <div class="socials">${socials}</div>
                <p>&copy; 2026 Vamsee &middot; drawn &amp; coded by hand</p>
            </div>
        </div>
    </footer>`;
}

function mount(id, html) {
    const placeholder = document.getElementById(id);
    if (placeholder) placeholder.outerHTML = html;
}

mount('site-header', headerHtml());
mount('site-footer', footerHtml());
requestAnimationFrame(function () { root.classList.add('ready'); });

// ---------- Theme ----------
(function () {
    const btn = document.querySelector('.theme-btn');
    const meta = document.querySelector('meta[name="theme-color"]');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    function stored() {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    }

    function apply(theme) {
        root.dataset.theme = theme;
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#2b2a28' : '#d8d9d4');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.title = theme === 'dark' ? 'Switch to white paper' : 'Switch to black paper';
        }
    }

    function switchTo(theme, x, y) {
        try { localStorage.setItem('theme', theme); } catch (e) {}
        if (reduceMotion) { apply(theme); return; }
        if (!document.startViewTransition) {
            root.classList.add('theme-fade');
            apply(theme);
            setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
            return;
        }
        // The new paper spreads out from the button
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const t = document.startViewTransition(function () { apply(theme); });
        t.ready.then(function () {
            root.animate(
                { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
                { duration: 700, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(function () {});
    }

    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

    if (btn) {
        btn.addEventListener('click', function () {
            const b = btn.getBoundingClientRect();
            switchTo(root.dataset.theme === 'dark' ? 'light' : 'dark', b.left + b.width / 2, b.top + b.height / 2);
        });
    }

    systemDark.addEventListener('change', function (e) {
        const s = stored();
        if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light');
    });
})();

// ---------- Contents menu (small screens) ----------
(function () {
    const btn = document.querySelector('.menu-btn');
    const menu = document.getElementById('contents-menu');
    if (!btn || !menu) return;
    const closeBtn = menu.querySelector('.close-btn');
    const sheet = menu.querySelector('.contents-sheet');

    function focusables() {
        return Array.from(sheet.querySelectorAll('a, button'));
    }

    function setOpen(open) {
        document.body.classList.toggle('menu-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        btn.setAttribute('aria-expanded', String(open));
        if (open) closeBtn.focus();
        else btn.focus();
    }

    btn.addEventListener('click', function () { setOpen(true); });
    closeBtn.addEventListener('click', function () { setOpen(false); });
    menu.addEventListener('click', function (e) { if (e.target === menu) setOpen(false); });
    document.addEventListener('keydown', function (e) {
        if (!document.body.classList.contains('menu-open')) return;
        if (e.key === 'Escape') setOpen(false);
        if (e.key === 'Tab') {
            const f = focusables();
            if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
            else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
        }
    });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', function (e) {
        if (e.matches && document.body.classList.contains('menu-open')) setOpen(false);
    });
})();

// ---------- Hand-drawn marks ----------
document.querySelectorAll('.ul').forEach(function (el, i) { el.insertAdjacentHTML('beforeend', scrawl('ul', i)); });
document.querySelectorAll('.circled').forEach(function (el, i) { el.insertAdjacentHTML('beforeend', scrawl('ring', i)); });
document.querySelectorAll('.ring').forEach(function (el, i) {
    el.insertAdjacentHTML('afterbegin', '<svg viewBox="0 0 200 78" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + RINGS[i % 2] + '"/></svg>');
});

// ---------- Reveals: tape drops, pencil draws ----------
(function () {
    const items = document.querySelectorAll('.rv, .drop, .fade, .ul, .circled');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('in'); });
        return;
    }
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            io.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
})();

// ---------- Lightbox for drawings and screenshots ----------
(function () {
    const triggers = Array.from(document.querySelectorAll('button.zoom'));
    if (!triggers.length) return;

    const dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Larger view');
    dlg.innerHTML = '<div class="lb-top"><button class="lb-btn lb-close" type="button">close &times;</button></div>'
        + '<div class="lb-stage"><img alt=""></div>'
        + '<div class="lb-bottom"><p class="lb-cap" aria-live="polite" style="margin:0"></p></div>'
        + '<button class="lb-btn lb-nav lb-prev" type="button" aria-label="Previous">&larr;</button>'
        + '<button class="lb-btn lb-nav lb-next" type="button" aria-label="Next">&rarr;</button>';
    document.body.appendChild(dlg);

    const img = dlg.querySelector('img');
    const cap = dlg.querySelector('.lb-cap');
    let group = [];
    let index = 0;
    let opener = null;

    function show(i) {
        index = (i + group.length) % group.length;
        const t = group[index];
        const src = t.querySelector('img');
        img.src = t.dataset.full || src.src;
        img.alt = src.alt;
        cap.textContent = t.dataset.caption || '';
        const multi = group.length > 1;
        dlg.querySelector('.lb-prev').hidden = !multi;
        dlg.querySelector('.lb-next').hidden = !multi;
    }

    triggers.forEach(function (t) {
        t.addEventListener('click', function () {
            const g = t.dataset.group || '';
            group = triggers.filter(function (x) { return (x.dataset.group || '') === g; });
            opener = t;
            show(group.indexOf(t));
            dlg.showModal();
            dlg.querySelector('.lb-close').focus();
        });
    });

    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(index - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(index + 1); });
    dlg.addEventListener('click', function (e) {
        if (e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close();
    });
    dlg.addEventListener('keydown', function (e) {
        if (group.length < 2) return;
        if (e.key === 'ArrowLeft') show(index - 1);
        if (e.key === 'ArrowRight') show(index + 1);
    });
    dlg.addEventListener('close', function () {
        if (opener) opener.focus();
    });
})();

// ---------- Header: shadow when scrolled, tuck away while reading down ----------
(function () {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    function update() {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 8);
        if (y > lastY && y > 260) header.classList.add('hidden-up');
        else if (y < lastY) header.classList.remove('hidden-up');
        lastY = y;
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
})();

// ---------- Turn the page when moving to another page of the book ----------
(function () {
    if (reduceMotion) return;
    document.addEventListener('click', function (e) {
        const a = e.target.closest('a');
        if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
        const url = new URL(a.href, location.href);
        if (url.origin !== location.origin) return;
        if (url.pathname === location.pathname && url.hash) return;
        e.preventDefault();
        document.body.classList.add('is-leaving');
        setTimeout(function () { location.href = url.href; }, 240);
    });
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.body.classList.remove('is-leaving');
    });
})();
