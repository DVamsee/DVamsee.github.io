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
