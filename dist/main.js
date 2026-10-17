// VAMSEE — Issue 02 / 2026. A risograph zine in two inks (Fluorescent Pink, Riso Blue) plus black.
//
// Shared layout: every page has <body data-page="..."> plus <div id="site-header"></div> and
// <div id="site-footer"></div> placeholders. Detail pages add data-detail (no prev/next) and
// data-folio="p.10" for their own page number.

const PAGES = [
    { id: 'home', href: 'index.html', label: 'Cover', p: '01', dek: 'Masthead, cover lines and the editor’s letter' },
    { id: 'experience', href: 'experience.html', label: 'Experience', p: '04', dek: 'Backend Developer at Shipsy; SQL internship at Virtusa' },
    { id: 'projects', href: 'projects.html', label: 'Projects', p: '08', dek: 'Veggy and Taskify, two builds start to finish' },
    { id: 'art', href: 'art.html', label: 'Art', p: '14', dek: 'The centrefold: nine drawings in ink and pencil' },
    { id: 'blog', href: 'blog.html', label: 'Blog', p: '20', dek: 'Runbooks and notes, starting with a headless M1 Air' },
    { id: 'skills', href: 'skills.html', label: 'Skills', p: '24', dek: 'The ink index, plus three stamped certifications' },
    { id: 'education', href: 'education.html', label: 'Education', p: '28', dek: 'B.Tech in Computer Science, SIETK' },
    { id: 'contact', href: 'contact.html', label: 'Contact', p: '32', dek: 'Tear off a tab: GitHub, X, Instagram' },
];

const SOCIALS = [
    { href: 'https://github.com/DVamsee', label: 'GitHub', handle: '@DVamsee' },
    { href: 'https://twitter.com/one_c_d', label: 'X / Twitter', handle: '@one_c_d' },
    { href: 'https://www.instagram.com/vamsee.d', label: 'Instagram', handle: '@vamsee.d' },
];

const ARROW = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="square" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
const REG_MARK = '<svg class="regmark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="20" cy="20" r="5" fill="currentColor"/><path d="M20 2v36M2 20h36" stroke="currentColor" stroke-width="1.4"/></svg>';

const root = document.documentElement;
const body = document.body;
root.classList.add('js');
const currentPage = body.dataset.page || 'home';
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pageIndex = PAGES.findIndex(function (p) { return p.id === currentPage; });
const folio = body.dataset.folio || (pageIndex >= 0 ? 'p.' + PAGES[pageIndex].p : '');

function current(id) {
    return id === currentPage ? ' aria-current="page"' : '';
}

function socialList(cls) {
    return '<ul class="' + cls + '">' + SOCIALS.map(function (s) {
        return '<li><a href="' + s.href + '" target="_blank" rel="noopener"><span>' + s.label + '</span> <b>' + s.handle + '</b></a></li>';
    }).join('') + '</ul>';
}

function headerHtml() {
    const links = PAGES.slice(1).map(function (p, i) {
        return '<li><a href="' + p.href + '"' + current(p.id) + '><span class="n">' + String(i + 1).padStart(2, '0') + '</span>' + p.label + '</a></li>';
    }).join('');

    const rows = PAGES.map(function (p, i) {
        return '<li style="--i:' + i + '"><a href="' + p.href + '"' + current(p.id) + '>'
            + '<span class="n">' + String(i).padStart(2, '0') + '</span>'
            + '<span class="t">' + p.label + '<small>' + p.dek + '</small></span>'
            + '<span class="dots" aria-hidden="true"></span>'
            + '<span class="p">p.' + p.p + '</span></a></li>';
    }).join('');

    return `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="topbar">
        <div class="bar-in">
            <a href="index.html" class="logo" aria-label="Vamsee, cover page"${current('home')}><span class="reg reg--line" data-reg>VAMSEE</span></a>
            <span class="issue mono">Issue 02 <i>/</i> 2026</span>
            <nav class="contents-nav" aria-label="Contents"><ol>${links}</ol></nav>
            <button class="paper-btn" type="button" aria-pressed="false" aria-label="Black paper (dark mode)">
                <span class="chip w" aria-hidden="true"></span><span class="chip b" aria-hidden="true"></span><span class="lbl mono">Paper</span>
            </button>
            <button class="menu-btn mono" type="button" aria-expanded="false" aria-controls="contents-sheet">Contents</button>
        </div>
    </header>
    <div class="contents-sheet" id="contents-sheet" role="dialog" aria-modal="true" aria-label="Contents">
        <div class="sheet-in">
            <p class="mono sheet-top"><span>VAMSEE &middot; Issue 02 / 2026</span><button class="sheet-close mono" type="button">Close &times;</button></p>
            <h2 class="sheet-title reg" data-reg>Contents</h2>
            <ol class="toc">${rows}</ol>
            ${socialList('sheet-socials mono')}
        </div>
    </div>`;
}

function footerHtml() {
    const detail = 'detail' in body.dataset;
    const idx = detail ? -1 : pageIndex;
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    const pager = idx >= 0 ? '<nav class="pager" aria-label="Turn the page">'
        + (prev ? '<a class="prev" href="' + prev.href + '"><small class="mono">Back to p.' + prev.p + '</small><span>' + prev.label + '</span></a>' : '<span></span>')
        + (next ? '<a class="next" href="' + next.href + '"><small class="mono">Turn to p.' + next.p + '</small><span>' + next.label + ARROW + '</span></a>' : '')
        + '</nav>' : '';

    const cta = currentPage === 'contact' ? '' : `
        <a class="letters" href="contact.html">
            <span class="mono k">Letters to the editor</span>
            <span class="big">Hiring, backend, logistics tech &mdash; or just a hello? <u>Tear off a tab on p.32</u></span>
        </a>`;

    return `
    <footer class="back">
        <div class="wrap">
            ${pager}
            ${cta}
            <div class="colophon">
                <div class="colour-bar" aria-hidden="true">
                    ${REG_MARK}<i class="s pk"></i><i class="s pk t50"></i><i class="s bl"></i><i class="s bl t50"></i><i class="s ov"></i><i class="s ye"></i><i class="s k"></i>${REG_MARK}
                </div>
                <div class="colo-text">
                    <p class="colo-h">Colophon</p>
                    <p>Printed digitally in two inks &middot; Issue 02 &middot; 2026 &middot; Made by Vamsee.</p>
                    <p class="mono small">Set in Big Shoulders Display, Archivo &amp; IBM Plex Mono. Inks: Fluorescent Pink, Riso Blue, a little Yellow. Drawings by the author.</p>
                </div>
                ${socialList('colo-socials mono')}
            </div>
            <p class="folio mono"><span>${folio}</span><span>VAMSEE &middot; Issue 02 / 2026</span><span>&copy; 2026 Vamsee</span></p>
        </div>
    </footer>`;
}

function mount(id, html) {
    const placeholder = document.getElementById(id);
    if (placeholder) placeholder.outerHTML = html;
}

mount('site-header', headerHtml());
mount('site-footer', footerHtml());

// ---------------------------------------------------------------------------
// Ink separations. Each SVG filter turns an image's lightness into the alpha of one flat ink,
// so paper shows through and inks overprint (multiply on white paper, screen on black paper).
// Drawings mix a local-contrast term (blurred minus original) with a global threshold so uneven
// paper photos drop out cleanly: alpha = a*blur - (a+b)*L + o.
// ---------------------------------------------------------------------------
(function () {
    const LUM = '.2126 .7152 .0722';
    const DRAW = {
        line: { a: 2.2, b: 2.0, o: 1.75, blur: 14 },   // ink on white paper
        grey: { a: 3.0, b: 1.6, o: 0.95, blur: 14 },   // pen/pencil on grey or tinted paper
        bold: { a: 0.6, b: 2.4, o: 1.85, blur: 14 },   // heavy blacks; keep big solid areas solid
    };
    const INKS = ['blue', 'pink', 'ink', 'yellow'];
    const dot = function (s) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + s + "' height='" + s + "'%3E%3CradialGradient id='g'%3E%3Cstop offset='0' stop-opacity='0'/%3E%3Cstop offset='1' stop-opacity='1'/%3E%3C/radialGradient%3E%3Crect width='" + s + "' height='" + s + "' fill='url(%23g)'/%3E%3C/svg%3E";
    };
    // alpha = k*(p - L) as a colour-matrix row
    function tone(k, p) {
        const w = LUM.split(' ').map(function (x) { return (-k * parseFloat(x)).toFixed(4); });
        return w.join(' ') + ' 0 ' + (k * p).toFixed(4);
    }
    let out = '';
    Object.keys(DRAW).forEach(function (name) {
        const d = DRAW[name];
        INKS.forEach(function (ink) {
            out += '<filter id="' + name + '-' + ink + '" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">'
                + '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ' + LUM + ' 0 0" result="L"/>'
                + '<feGaussianBlur in="L" stdDeviation="' + d.blur + '" result="B"/>'
                + '<feComposite in="B" in2="L" operator="arithmetic" k2="' + d.a + '" k3="' + (-(d.a + d.b)) + '" k4="' + d.o + '" result="A"/>'
                + '<feComposite in="A" in2="SourceAlpha" operator="in" result="A2"/>'
                + '<feFlood class="fl-' + ink + '"/><feComposite in2="A2" operator="in"/></filter>';
        });
    });
    // Logos: plain threshold, and a silhouette version for white-on-transparent marks
    INKS.forEach(function (ink) {
        out += '<filter id="logo-' + ink + '" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">'
            + '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ' + tone(2.4, 0.76) + '" result="A"/>'
            + '<feComposite in="A" in2="SourceAlpha" operator="in" result="A2"/>'
            + '<feFlood class="fl-' + ink + '"/><feComposite in2="A2" operator="in"/></filter>'
            + '<filter id="shape-' + ink + '" x="0" y="0" width="1" height="1">'
            + '<feFlood class="fl-' + ink + '"/><feComposite in2="SourceAlpha" operator="in"/></filter>';
    });
    // Photos are printed as two separations on their own sheet of white stock (in both themes):
    // Riso Blue carries the shadows, Fluorescent Pink carries the midtones through a halftone screen.
    function photo(id, color, k, p, screen) {
        let f = '<filter id="' + id + '" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">'
            + '<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ' + tone(k, p) + '" result="A"/>';
        if (screen) {
            f += '<feImage href="' + dot(screen) + '" x="0" y="0" width="' + screen + '" height="' + screen + '" result="dot"/>'
                + '<feTile in="dot" result="D"/>'
                + '<feComposite in="A" in2="D" operator="arithmetic" k2="6" k3="-6" k4="0.1" result="A"/>';
        }
        return f + '<feFlood flood-color="' + color + '"/><feComposite in2="A" operator="in"/></filter>';
    }
    out += photo('photo-blue', '#0078BF', 2.1, 0.5, 0);
    out += photo('photo-pink', '#FF48B0', 1.55, 0.9, 4);
    out += photo('shot-blue', '#0078BF', 2.6, 0.82, 0);
    out += photo('shot-pink', '#FF48B0', 2.4, 0.965, 3);
    // Rubber stamps: speckled ink, slightly wobbly edges
    out += '<filter id="stamp-rough" x="-5%" y="-5%" width="110%" height="110%">'
        + '<feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="7" result="t"/>'
        + '<feColorMatrix in="t" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.7 0 0 0 1.55" result="m"/>'
        + '<feComposite in="SourceGraphic" in2="m" operator="in" result="s"/>'
        + '<feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="2" result="w"/>'
        + '<feDisplacementMap in="s" in2="w" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter>';

    body.insertAdjacentHTML('afterbegin', '<svg class="ink-defs" width="0" height="0" aria-hidden="true" focusable="false">' + out + '</svg>');
    root.classList.add('inks');
})();

// Duplicate the text of every [data-reg] heading into a second, misregistered ink layer
document.querySelectorAll('[data-reg]').forEach(function (el) {
    el.classList.add('reg');
    el.setAttribute('data-text', el.innerText.trim());
});

// Crop marks on every sheet
document.querySelectorAll('.crops').forEach(function (el) {
    el.insertAdjacentHTML('afterbegin', '<i class="crop tl" aria-hidden="true"></i><i class="crop tr" aria-hidden="true"></i><i class="crop bl" aria-hidden="true"></i><i class="crop br" aria-hidden="true"></i>');
});

// Theme: the inline script in <head> sets data-theme before first paint; this keeps it in sync
(function () {
    const btn = document.querySelector('.paper-btn');
    const meta = document.querySelector('meta[name="theme-color"]');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    function stored() {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    }

    function apply(theme) {
        root.dataset.theme = theme;
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#141316' : '#F3F0E9');
        if (btn) {
            btn.setAttribute('aria-pressed', String(theme === 'dark'));
            btn.title = theme === 'dark' ? 'Print on white paper' : 'Print on black paper';
        }
    }

    function switchTo(theme) {
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
        // The new sheet feeds through the drum from the top, like paper through a duplicator
        const t = document.startViewTransition(function () { apply(theme); });
        t.ready.then(function () {
            root.animate(
                { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'] },
                { duration: 650, easing: 'cubic-bezier(0.5, 0, 0.1, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(function () {});
    }

    apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

    if (btn) {
        btn.addEventListener('click', function () {
            switchTo(root.dataset.theme === 'dark' ? 'light' : 'dark');
        });
    }

    // Follow the OS setting until the visitor picks a paper themselves
    systemDark.addEventListener('change', function (e) {
        const s = stored();
        if (s !== 'light' && s !== 'dark') apply(e.matches ? 'dark' : 'light');
    });
})();

// Contents sheet (mobile / narrow screens)
(function () {
    const btn = document.querySelector('.menu-btn');
    const sheet = document.getElementById('contents-sheet');
    if (!btn || !sheet) return;
    const close = sheet.querySelector('.sheet-close');

    function setOpen(open) {
        body.classList.toggle('sheet-open', open);
        body.style.overflow = open ? 'hidden' : '';
        btn.setAttribute('aria-expanded', String(open));
        if (open) {
            const cur = sheet.querySelector('[aria-current]') || sheet.querySelector('a');
            setTimeout(function () { (close || cur).focus(); }, 60);
        }
    }

    btn.addEventListener('click', function () { setOpen(!body.classList.contains('sheet-open')); });
    if (close) close.addEventListener('click', function () { setOpen(false); btn.focus(); });
    sheet.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && body.classList.contains('sheet-open')) {
            setOpen(false);
            btn.focus();
        }
    });
    window.matchMedia('(min-width: 1121px)').addEventListener('change', function (e) {
        if (e.matches) setOpen(false);
    });
})();

// Sections slide in like pages being turned
(function () {
    const items = document.querySelectorAll('.reveal');
    if (reduceMotion || !('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('visible'); });
        return;
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            observer.unobserve(el);
            const siblings = Array.from(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
            const delay = Math.min(Math.max(siblings.indexOf(el), 0), 5) * 0.07;
            el.style.transitionDelay = delay + 's';
            el.classList.add('visible');
            setTimeout(function () { el.style.transitionDelay = ''; }, delay * 1000 + 700);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { observer.observe(el); });
})();

// Plate viewer for the centrefold: <a data-plate href="full.jpg"> opens a larger print
(function () {
    const plates = document.querySelectorAll('[data-plate]');
    if (!plates.length || typeof HTMLDialogElement !== 'function') return;
    body.insertAdjacentHTML('beforeend',
        '<dialog class="viewer" aria-label="Plate viewer"><figure><div class="viewer-img"></div><figcaption class="mono"></figcaption></figure>'
        + '<button class="viewer-close mono" type="button">Close &times;</button></dialog>');
    const dlg = document.querySelector('.viewer');
    const holder = dlg.querySelector('.viewer-img');
    const cap = dlg.querySelector('figcaption');
    plates.forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const img = a.querySelector('img');
            holder.innerHTML = '';
            const big = img.cloneNode();
            big.removeAttribute('loading');
            big.className = img.className;
            holder.className = 'viewer-img ' + (a.dataset.plate || '');
            holder.appendChild(big);
            cap.textContent = a.dataset.caption || img.alt;
            dlg.showModal();
        });
    });
    dlg.querySelector('.viewer-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

// Header: tuck away while reading down, come back when scrolling up
(function () {
    const header = document.querySelector('.topbar');
    if (!header) return;
    let lastY = window.scrollY;
    let ticking = false;
    function update() {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 8);
        if (y > lastY && y > 260 && !body.classList.contains('sheet-open')) header.classList.add('tucked');
        else if (y < lastY) header.classList.remove('tucked');
        lastY = y;
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    header.addEventListener('focusin', function () { header.classList.remove('tucked'); });
    update();
})();
