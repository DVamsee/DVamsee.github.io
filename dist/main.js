// Shared layout for every page.
// Each page has <body data-page="..."> plus <div id="site-header"></div> and <div id="site-footer"></div>.
// Detail pages (a single project, a single post) add data-detail to skip the prev/next chapter links.

document.documentElement.classList.add('js');

const PAGES = [
    { id: 'home', href: 'index.html', label: 'Home', ch: 'Cover' },
    { id: 'experience', href: 'experience.html', label: 'Experience', ch: 'Ch. 1' },
    { id: 'projects', href: 'projects.html', label: 'Projects', ch: 'Ch. 2' },
    { id: 'art', href: 'art.html', label: 'Art', ch: 'Ch. 3' },
    { id: 'blog', href: 'blog.html', label: 'Blog', ch: 'Ch. 4' },
    { id: 'skills', href: 'skills.html', label: 'Skills', ch: 'Ch. 5' },
    { id: 'education', href: 'education.html', label: 'Education', ch: 'Ch. 0' },
    { id: 'contact', href: 'contact.html', label: 'Contact', ch: 'Last page' },
];

const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7"/></svg>',
};

const SOCIALS = [
    { href: 'https://github.com/DVamsee', icon: ICONS.github, label: 'GitHub' },
    { href: 'https://twitter.com/one_c_d', icon: ICONS.twitter, label: 'Twitter / X' },
    { href: 'https://www.instagram.com/vamsee.d', icon: ICONS.instagram, label: 'Instagram' },
];

// Sun that becomes a moon: a cut-out circle slides over the orb while the rays fold away
const THEME_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + '<mask id="theme-cut"><rect x="-4" y="-4" width="32" height="32" fill="#fff"/><circle class="cut" cx="17" cy="7" r="6" fill="#000"/></mask>'
    + '<circle class="orb" cx="12" cy="12" r="5" fill="currentColor" mask="url(#theme-cut)"/>'
    + '<g class="rays" stroke="currentColor" stroke-width="2.2" stroke-linecap="square">'
    + '<path d="M12 1.5v2M12 20.5v2M1.5 12h2M20.5 12h2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M4.6 19.4L6 18M18 6l1.4-1.4"/></g></svg>';

const currentPage = document.body.dataset.page || 'home';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function current(id) {
    return id === currentPage ? ' aria-current="page"' : '';
}

function socialLinks() {
    return SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '">' + s.icon + '</a>';
    }).join('');
}

function headerHtml() {
    const links = PAGES.filter(function (p) { return p.id !== 'home'; }).map(function (p) {
        return '<a href="' + p.href + '"' + current(p.id) + '>' + p.label + '</a>';
    }).join('');

    const mobileLinks = PAGES.map(function (p, i) {
        return '<li style="--i:' + i + '"><a href="' + p.href + '"' + current(p.id) + '><small>' + p.ch + '</small>' + p.label + '</a></li>';
    }).join('');

    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
        <div class="wrap nav-inner">
            <a href="index.html" class="brand" aria-label="Vamsee, home"${current('home')}>
                <span class="brand-logo">Vamsee</span>
                <span class="brand-issue">Issue #01<br>Backend &amp; ink</span>
            </a>
            <nav class="nav-links" aria-label="Primary">${links}</nav>
            <div class="nav-actions">
                <button class="theme-btn" type="button" aria-label="Night edition" aria-pressed="false">${THEME_ICON}</button>
                <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button>
            </div>
        </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-label="Menu">
        <p class="cap">Contents</p>
        <ol>${mobileLinks}</ol>
        <div class="menu-foot socials">${socialLinks()}</div>
    </div>`;
}

function footerHtml() {
    const idx = 'detail' in document.body.dataset ? -1 : PAGES.findIndex(function (p) { return p.id === currentPage; });
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    const prevLink = prev
        ? '<a class="pager-link prev" href="' + prev.href + '"><span class="cap">Previously&hellip;</span><span class="pager-title">' + prev.label + '</span><small>' + prev.ch + '</small></a>'
        : '<span></span>';
    const nextLink = next
        ? '<a class="pager-link next" href="' + next.href + '"><span class="cap">Next&hellip;</span><span class="pager-title">' + next.label + ICONS.arrow + '</span><small>' + next.ch + '</small></a>'
        : '';
    const pager = idx >= 0 ? '<nav class="pager" aria-label="Chapters">' + prevLink + nextLink + '</nav>' : '';

    const cta = currentPage === 'contact' ? '' : `
        <div class="footer-cta panel pop">
            <div class="ht ht-full" aria-hidden="true"></div>
            <p class="balloon tail-bl"><span>Building something in backend or logistics tech &mdash; or hiring? Let&rsquo;s talk.</span></p>
            <a href="contact.html" class="btn btn-ink">Get in touch ${ICONS.arrow}</a>
        </div>`;

    return `
    <footer class="site-footer">
        <div class="wrap">
            ${pager}
            ${cta}
            <div class="footer-bottom">
                <p>&copy; 2026 Vamsee &middot; Written, drawn &amp; coded by hand.</p>
                <div class="socials">${socialLinks()}</div>
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

// Theme: the inline script in <head> sets data-theme before first paint; this keeps it in sync
(function () {
    const root = document.documentElement;
    const btn = document.querySelector('.theme-btn');
    const meta = document.querySelector('meta[name="theme-color"]');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    function stored() {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    }

    function apply(theme) {
        root.dataset.theme = theme;
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#0D0E11' : '#F1F2EE');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.title = theme === 'dark' ? 'Switch to the day edition' : 'Switch to the night edition';
        }
    }

    function switchTo(theme, x, y) {
        try { localStorage.setItem('theme', theme); } catch (e) {}
        if (reduceMotion) {
            apply(theme);
            return;
        }
        if (!document.startViewTransition) {
            root.classList.add('theme-fade');
            apply(theme);
            setTimeout(function () { root.classList.remove('theme-fade'); }, 500);
            return;
        }
        // The new edition is revealed like a panel wiping across the page
        const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        const t = document.startViewTransition(function () { apply(theme); });
        t.ready.then(function () {
            root.animate(
                { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
                { duration: 650, easing: 'cubic-bezier(0.3, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(function () {});
    }

    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

    if (btn) {
        btn.addEventListener('click', function () {
            const r = btn.getBoundingClientRect();
            switchTo(root.dataset.theme === 'dark' ? 'light' : 'dark', r.left + r.width / 2, r.top + r.height / 2);
        });
    }

    // Follow the OS setting until the visitor picks a theme themselves
    systemDark.addEventListener('change', function (e) {
        const s = stored();
        if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light');
    });
})();

// Mobile menu
(function () {
    const btn = document.querySelector('.menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    function setOpen(open) {
        document.body.classList.toggle('menu-open', open);
        document.body.style.overflow = open ? 'hidden' : '';
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    btn.addEventListener('click', function () {
        setOpen(!document.body.classList.contains('menu-open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            setOpen(false);
            btn.focus();
        }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', function (e) {
        if (e.matches) setOpen(false);
    });
})();

// Panels pop in, balloons pop from their tails, halftone fills sweep across.
// Hidden states only apply under html.js (see site.css), so content never stays invisible without JS.
(function () {
    const items = document.querySelectorAll('.pop, .balloon, .ht, .stamp');
    function show(el) { el.classList.add('in'); }
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(show);
        return;
    }
    const observer = new IntersectionObserver(function (entries) {
        // Panels entering together are revealed in reading order, a beat apart
        const batch = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
        batch.forEach(function (el, i) {
            observer.unobserve(el);
            const base = el.classList.contains('balloon') ? 0.25 : 0;
            const delay = Math.min(i, 6) * 0.08 + base;
            el.style.setProperty('--d', delay + 's');
            show(el);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { observer.observe(el); });
})();

// Header hides while reading down, returns on scroll up
(function () {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    function update() {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 8);
        if (y > lastY && y > 260 && !document.body.classList.contains('menu-open')) header.classList.add('hidden-up');
        else if (y < lastY) header.classList.remove('hidden-up');
        lastY = y;
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
})();

// Lightbox for drawings and screenshots: <a href="big.jpg" data-lightbox data-caption="...">
(function () {
    const links = document.querySelectorAll('a[data-lightbox]');
    if (!links.length || typeof HTMLDialogElement !== 'function') return;
    document.body.insertAdjacentHTML('beforeend',
        '<dialog class="lightbox" aria-label="Enlarged image"><figure><img alt=""><figcaption class="cap"></figcaption></figure>'
        + '<button type="button" class="lightbox-close" aria-label="Close">&times;</button></dialog>');
    const dlg = document.querySelector('.lightbox');
    const img = dlg.querySelector('img');
    const cap = dlg.querySelector('figcaption');
    links.forEach(function (a) {
        a.addEventListener('click', function (e) {
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            e.preventDefault();
            const thumb = a.querySelector('img');
            img.src = a.getAttribute('href');
            img.alt = thumb ? thumb.alt : '';
            img.className = thumb && thumb.closest('.ink-art') ? 'is-ink' : '';
            cap.textContent = a.dataset.caption || '';
            cap.hidden = !a.dataset.caption;
            dlg.showModal();
        });
    });
    dlg.querySelector('.lightbox-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

// Fade out before moving to another page on this site
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
        setTimeout(function () { location.href = url.href; }, 220);
    });
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.body.classList.remove('is-leaving');
    });
})();
