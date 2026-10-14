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

const SOCIALS = [
    { href: 'https://github.com/DVamsee', img: 'dist/img/github.png', label: 'GitHub' },
    { href: 'https://wa.me/qr/SMBMSEBHDWYIE1', img: 'dist/img/whatsapp.png', label: 'WhatsApp' },
    { href: 'https://instagram.com/vamsee.d?igshid=MzNlNGNkZWQ4Mg==', img: 'dist/img/instagram.png', label: 'Instagram' },
    { href: 'https://twitter.com/one_c_d', img: 'dist/img/twitter.png', label: 'Twitter' },
];

const currentPage = document.body.dataset.page || 'home';

function current(id) {
    return id === currentPage ? ' aria-current="page"' : '';
}

function headerHtml() {
    const desktopLinks = PAGES.map(function (p) {
        return '<a href="' + p.href + '"' + current(p.id) + ' class="nav-link mx-4 xl:mx-5 md:text-2xl hover:text-green-500">' + p.label + '</a>';
    }).join('');

    const mobileLinks = PAGES.map(function (p) {
        return '<li><a href="' + p.href + '"' + current(p.id) + ' class="mobile-nav-link block py-3 px-3 text-lg text-green-400 rounded-lg hover:bg-green-900 hover:bg-opacity-30 transition-colors">' + p.label + '</a></li>';
    }).join('');

    return `
    <header class="fixed z-20 text-green-600 body-font w-full sm:backdrop-blur-none bg-none">
        <div class="nav-shell hidden bg-black container mx-auto rounded-lg flex-wrap px-4 py-2 flex-col lg:flex-row items-center md:flex">
            <a href="index.html" class="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                <div class="w-14 h-14 bg-gray-900 inline-flex items-center justify-center rounded-full text-green-400 mb-4">
                    <img src="dist/img/1c.png" alt="Logo">
                </div>
            </a>
            <nav class="pb-4 md:ml-auto md:mr-auto font-medium flex flex-wrap items-center text-base justify-center">
                ${desktopLinks}
            </nav>
        </div>

        <div class="fixed top-4 left-4 z-30 md:hidden">
            <button id="mobile-menu-button" aria-label="Open menu" class="text-green-400 bg-gray-900 bg-opacity-80 backdrop-blur p-2.5 rounded-xl border border-green-800 border-opacity-40">
                <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>

        <div id="mobile-menu-overlay" class="mobile-menu-overlay fixed inset-0 z-40 hidden">
            <div class="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" id="mobile-menu-backdrop"></div>
            <nav class="mobile-menu-panel absolute top-0 left-0 h-full w-64 bg-gray-900 border-r border-green-900 border-opacity-40 p-6 pt-5 flex flex-col">
                <button id="mobile-menu-close-button" aria-label="Close menu" class="self-end text-gray-400 hover:text-white mb-6">
                    <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <ul class="space-y-1 flex-grow">
                    ${mobileLinks}
                </ul>
                <div class="pt-4 border-t border-green-900 border-opacity-30">
                    <p class="text-xs text-gray-600 text-center">&copy; 2026 Vamsee</p>
                </div>
            </nav>
        </div>
    </header>`;
}

function footerHtml() {
    const idx = 'detail' in document.body.dataset ? -1 : PAGES.findIndex(function (p) { return p.id === currentPage; });
    const prev = idx > 0 ? PAGES[idx - 1] : null;
    const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;

    const arrow = '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>';
    const backArrow = '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 transform rotate-180" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>';

    const prevLink = prev
        ? '<a href="' + prev.href + '" class="group flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">' + backArrow + '<span><span class="block text-xs uppercase tracking-widest text-gray-600">Previous</span><span class="text-lg">' + prev.label + '</span></span></a>'
        : '<span></span>';
    const nextLink = next
        ? '<a href="' + next.href + '" class="group flex items-center gap-2 text-right text-gray-400 hover:text-green-400 transition-colors"><span><span class="block text-xs uppercase tracking-widest text-gray-600">Next</span><span class="text-lg">' + next.label + '</span></span>' + arrow + '</a>'
        : '<span></span>';

    const socials = SOCIALS.map(function (s) {
        return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + s.label + '" class="opacity-70 hover:opacity-100 transition-opacity"><img src="' + s.img + '" class="h-6 w-6 mx-3" alt="' + s.label + '"></a>';
    }).join('');

    return `
    <footer class="text-gray-400 body-font">
        <div class="container mx-auto px-5 lg:px-20 pb-10">
            ${idx >= 0 ? '<div class="flex justify-between items-center py-8 border-t border-green-900 border-opacity-40">' + prevLink + nextLink + '</div>' : ''}
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-green-900 border-opacity-40">
                <p class="text-sm text-gray-600">&copy; 2026 Vamsee &middot; Built with Tailwind CSS</p>
                <span class="inline-flex">${socials}</span>
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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Ambient layers: drifting glow orbs + grid, cursor glow, scroll progress bar
document.body.insertAdjacentHTML('afterbegin', '<div class="fx-layer ambient" aria-hidden="true"><span></span><span></span><span></span></div>');
document.body.insertAdjacentHTML('beforeend', '<div class="fx-layer scroll-progress" aria-hidden="true"></div>');
if (finePointer && !reduceMotion) {
    document.body.insertAdjacentHTML('beforeend', '<div class="fx-layer cursor-glow" aria-hidden="true"></div>');
}

// Mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
const mobileMenuItems = mobileMenuOverlay.querySelectorAll('a');

function openMenu() {
    mobileMenuOverlay.classList.remove('hidden');
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            mobileMenuOverlay.classList.add('open');
        });
    });
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
        if (!mobileMenuOverlay.classList.contains('open')) {
            mobileMenuOverlay.classList.add('hidden');
        }
    }, 350);
}

mobileMenuButton.addEventListener('click', function (e) {
    e.stopPropagation();
    openMenu();
});
mobileMenuCloseButton.addEventListener('click', closeMenu);
mobileMenuBackdrop.addEventListener('click', closeMenu);

mobileMenuItems.forEach(function (item) {
    item.addEventListener('click', closeMenu);
});

// Animated particle background
let scrollDrift = 0;

(function () {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles, mouse;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    mouse = { x: w / 2, y: h / 2 };
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;

    function createParticle() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            pulse: Math.random() * Math.PI * 2,
        };
    }

    particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Bigger (closer) particles drift further on scroll, giving a sense of depth
        const drift = reduceMotion ? 0 : scrollDrift;
        scrollDrift = 0;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.pulse += 0.008;
            const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

            p.x += p.vx;
            p.y += p.vy - drift * p.radius * 0.12;

            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 222, 128, ${alpha * 0.15})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(74, 222, 128, ${0.06 * (1 - dist / CONNECTION_DIST)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 160) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(74, 222, 128, ${0.08 * (1 - mDist / 160)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
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

// Scroll reveal
(function () {
    const reveals = document.querySelectorAll('.reveal');
    if (!reduceMotion) {
        document.querySelectorAll('[data-count]').forEach(function (el) {
            el.textContent = '0' + (el.dataset.suffix || '');
        });
    }
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const siblings = Array.from(el.parentElement.children).filter(function (c) { return c.classList.contains('reveal'); });
                const idx = siblings.indexOf(el);
                const delay = idx * 0.12;
                el.style.transitionDelay = delay + 's';
                el.classList.add('visible');
                el.querySelectorAll('[data-count]').forEach(countUp);
                observer.unobserve(el);
                // Once the entrance finishes, switch to snappier hover transitions
                setTimeout(function () {
                    el.style.transitionDelay = '';
                    el.classList.add('revealed');
                }, delay * 1000 + 850);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
})();

// Card tilt + cursor spotlight
(function () {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll('.glass-card, [data-tilt]').forEach(function (card) {
        card.classList.add('spotlight');
        card.addEventListener('mousemove', function (e) {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            card.style.setProperty('--mx', x + 'px');
            card.style.setProperty('--my', y + 'px');
            const tiltTarget = card.closest('.reveal') || card;
            if (!tiltTarget.classList.contains('revealed')) return;
            const rx = ((y / r.height) - 0.5) * -6;
            const ry = ((x / r.width) - 0.5) * 6;
            card.style.transition = 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s, background-color 0.3s';
            card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transition = '';
            card.style.transform = '';
        });
    });
})();

// Cursor glow follows the mouse with a little lag
(function () {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2, x = tx, y = ty;
    let running = false;
    function follow() {
        x += (tx - x) * 0.12;
        y += (ty - y) * 0.12;
        glow.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
            requestAnimationFrame(follow);
        } else {
            running = false;
        }
    }
    document.addEventListener('mousemove', function (e) {
        tx = e.clientX;
        ty = e.clientY;
        glow.classList.add('active');
        if (!running) {
            running = true;
            requestAnimationFrame(follow);
        }
    });
    document.addEventListener('mouseleave', function () { glow.classList.remove('active'); });
})();

// Scroll-driven effects: progress bar, header, hero parallax, timeline focus
(function () {
    const progress = document.querySelector('.scroll-progress');
    const navShell = document.querySelector('.nav-shell');
    const parallax = document.querySelectorAll('[data-parallax]');
    const scrollCue = document.querySelector('.scroll-cue');
    const timeline = Array.from(document.querySelectorAll('.timeline-item'));
    let lastY = window.scrollY;
    let ticking = false;

    function updateTimelineFocus(y, vh, maxScroll) {
        const items = timeline.filter(function (el) { return el.offsetParent !== null; });
        if (!items.length) return;
        // Short pages that barely scroll: keep everything lit
        if (maxScroll < 80) {
            items.forEach(function (el) { el.classList.add('in-focus'); });
            return;
        }
        let best = items[items.length - 1];
        if (y < maxScroll - 4) {
            let bestDist = Infinity;
            items.forEach(function (el) {
                const r = el.getBoundingClientRect();
                const dist = Math.abs(r.top + r.height / 2 - vh * 0.5);
                if (dist < bestDist) { bestDist = dist; best = el; }
            });
        }
        items.forEach(function (el) { el.classList.toggle('in-focus', el === best); });
    }

    function update() {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - vh;

        if (progress) progress.style.transform = 'scaleX(' + (maxScroll > 0 ? y / maxScroll : 0) + ')';

        if (navShell) {
            navShell.classList.toggle('nav-scrolled', y > 20);
            const goingDown = y > lastY;
            if (goingDown && y > 160) navShell.classList.add('nav-hidden');
            else if (!goingDown) navShell.classList.remove('nav-hidden');
        }

        if (!reduceMotion) {
            parallax.forEach(function (el) {
                if (y > vh) return;
                el.style.transform = 'translateY(' + (y * 0.3) + 'px)';
                el.style.opacity = Math.max(0, 1 - y / (vh * 0.75));
            });
            if (scrollCue) scrollCue.style.opacity = Math.max(0, 1 - y / 200);
        }

        updateTimelineFocus(y, vh, maxScroll);

        scrollDrift += y - lastY;
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
