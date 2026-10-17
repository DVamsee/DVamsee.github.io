// Shared layout: every page has <body data-page="..."> plus
// <div id="site-header"></div> and <div id="site-footer"></div> placeholders.
// Detail pages (e.g. a single project) add data-detail to skip the prev/next links.

const PAGES = [
    { id: 'home', href: 'index.html', label: 'Home' },
    { id: 'experience', href: 'experience.html', label: 'Experience' },
    { id: 'projects', href: 'projects.html', label: 'Projects' },
    { id: 'blog', href: 'blog.html', label: 'Blog' },
    { id: 'skills', href: 'skills.html', label: 'Skills' },
    { id: 'education', href: 'education.html', label: 'Education' },
    { id: 'contact', href: 'contact.html', label: 'Contact' },
];

const ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.97 3.22 9.18 7.69 10.67.56.1.77-.24.77-.54v-1.9c-3.13.68-3.79-1.34-3.79-1.34-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.16a10.7 10.7 0 0 1 5.64 0c2.15-1.46 3.1-1.16 3.1-1.16.61 1.55.23 2.7.11 2.98.72.79 1.16 1.8 1.16 3.03 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.78.54a11.26 11.26 0 0 0 7.68-10.67C23.25 5.48 18.27.5 12 .5z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};

const SOCIALS = [
    { href: 'https://github.com/DVamsee', icon: ICONS.github, label: 'GitHub' },
    { href: 'https://twitter.com/one_c_d', icon: ICONS.twitter, label: 'Twitter' },
];

const BRAND_MARK = '<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">'
    + '<circle cx="11" cy="12" r="8" fill="#E3A93B"/>'
    + '<circle cx="21" cy="12" r="8" fill="#D9714E" opacity=".9"/>'
    + '<circle cx="16" cy="21" r="8" fill="#3E5C8A" opacity=".85"/></svg>';

// Sun that becomes a moon: a cut-out circle slides over the orb while the rays fold away
const THEME_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true">'
    + '<mask id="theme-cut"><rect x="-4" y="-4" width="32" height="32" fill="#fff"/><circle class="cut" cx="17" cy="7" r="6" fill="#000"/></mask>'
    + '<circle class="orb" cx="12" cy="12" r="5" fill="currentColor" mask="url(#theme-cut)"/>'
    + '<g class="rays" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
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
    const links = PAGES.map(function (p) {
        return '<a href="' + p.href + '"' + current(p.id) + '>' + p.label + '</a>';
    }).join('');

    const mobileLinks = PAGES.map(function (p, i) {
        const n = String(i + 1).padStart(2, '0');
        return '<li style="transition-delay:' + (0.04 * i + 0.05) + 's"><a href="' + p.href + '"' + current(p.id) + '><small>' + n + '</small>' + p.label + '</a></li>';
    }).join('');

    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
        <div class="wrap nav-inner">
            <a href="index.html" class="brand" aria-label="Vamsee, home">${BRAND_MARK}<span>Vamsee</span></a>
            <nav class="nav-links" aria-label="Primary">${links}</nav>
            <div class="nav-actions">
                <button class="theme-btn" type="button" aria-label="Dark mode" aria-pressed="false">${THEME_ICON}</button>
                <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
            </div>
        </div>
    </header>
    <div class="mobile-menu" id="mobile-menu" aria-label="Menu">
        <ol>${mobileLinks}</ol>
        <div class="menu-foot"><span>&copy; 2026 Vamsee</span><span class="socials">${socialLinks()}</span></div>
    </div>`;
}

function footerHtml() {
    const idx = 'detail' in document.body.dataset ? -1 : PAGES.findIndex(function (p) { return p.id === currentPage; });
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    const prevLink = prev
        ? '<a class="prev" href="' + prev.href + '">' + ICONS.arrow + '<span><small>Previous</small><span>' + prev.label + '</span></span></a>'
        : '';
    const nextLink = next
        ? '<a class="next" href="' + next.href + '"><span><small>Next</small><span>' + next.label + '</span></span>' + ICONS.arrow + '</a>'
        : '';
    const pager = idx >= 0 ? '<nav class="pager" aria-label="Pages">' + prevLink + nextLink + '</nav>' : '';

    const cta = currentPage === 'contact' ? '' : `
        <div class="footer-cta">
            <p class="eyebrow">Open to conversations</p>
            <a href="contact.html" class="big display">Let's build something <em class="mark" data-color="ochre">thoughtful</em>.</a>
            <span class="hand">backend, logistics tech, or just a hello</span>
        </div>`;

    return `
    <footer class="site-footer">
        <div class="wrap">
            ${pager}
            ${cta}
            <div class="footer-bottom">
                <div class="palette" aria-hidden="true" title="The palette">
                    <i style="--c:var(--ochre)"></i><i style="--c:var(--terracotta)"></i><i style="--c:var(--rose)"></i><i style="--c:var(--indigo)"></i><i style="--c:var(--sage)"></i>
                </div>
                <p style="margin:0">&copy; 2026 Vamsee &middot; Designed &amp; built by hand</p>
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
document.body.insertAdjacentHTML('beforeend', '<div class="scroll-progress" aria-hidden="true"></div>');

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
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#1A1816' : '#FBF8F3');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
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
        // New theme spreads out from the button like ink on paper
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

// Hand-drawn underline under every .mark; each gets a slightly different stroke
(function () {
    const strokes = [
        'M2 12 C 30 5, 70 3, 110 8 S 170 13, 198 6',
        'M3 9 C 45 13, 95 4, 140 7 S 185 12, 197 8',
        'M2 10 C 40 4, 80 12, 120 7 S 175 4, 198 10',
    ];
    document.querySelectorAll('.mark').forEach(function (el, i) {
        el.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="' + strokes[i % strokes.length] + '"/></svg>');
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
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
        if (e.matches) setOpen(false);
    });
})();

// Count-up numbers: <p data-count="9.36" data-decimals="2" data-suffix="+">
function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) {
        el.textContent = target.toFixed(decimals) + suffix;
        return;
    }
    const duration = 1600;
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Scroll reveal for .reveal blocks and .mark underlines
(function () {
    const items = document.querySelectorAll('.reveal, .mark');
    if (!reduceMotion) {
        document.querySelectorAll('[data-count]').forEach(function (el) {
            el.textContent = '0' + (el.dataset.suffix || '');
        });
    }
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('visible', 'in'); });
        return;
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            observer.unobserve(el);
            if (el.classList.contains('mark')) {
                el.classList.add('in');
                return;
            }
            // Stagger siblings that come into view together
            const siblings = Array.from(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
            const delay = Math.min(siblings.indexOf(el), 5) * 0.1;
            el.style.transitionDelay = delay + 's';
            el.classList.add('visible');
            el.querySelectorAll('[data-count]').forEach(countUp);
            setTimeout(function () { el.style.transitionDelay = ''; }, delay * 1000 + 900);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (el) { observer.observe(el); });
})();

// Scroll-driven: progress bar, header background, hide header while reading down
(function () {
    const progress = document.querySelector('.scroll-progress');
    const header = document.querySelector('.site-header');
    let lastY = window.scrollY;
    let ticking = false;

    function update() {
        const y = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = 'scaleX(' + (maxScroll > 0 ? y / maxScroll : 0) + ')';
        if (header) {
            header.classList.toggle('scrolled', y > 12);
            if (y > lastY && y > 240) header.classList.add('hidden-up');
            else if (y < lastY) header.classList.remove('hidden-up');
        }
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
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
        setTimeout(function () { location.href = url.href; }, 230);
    });
    // Coming back via the back button restores the page from cache, still faded out
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) document.body.classList.remove('is-leaving');
    });
})();
