const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button');
const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
const mobileMenuItems = mobileMenuOverlay.querySelectorAll('a');

mobileMenuButton.addEventListener('click', () => {
    mobileMenuOverlay.classList.toggle('hidden');
});

mobileMenuCloseButton.addEventListener('click', () => {
    mobileMenuOverlay.classList.add('hidden');
});

mobileMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('hidden');
    });
});

document.addEventListener('click', (event) => {
    if (!mobileMenuButton.contains(event.target) && !mobileMenuOverlay.contains(event.target)) {
        mobileMenuOverlay.classList.add('hidden');
    }
});