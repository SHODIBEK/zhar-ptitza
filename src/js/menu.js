export default function menu() {
    const burgers = Array.from(document.querySelectorAll('.page-header__burger'));
    const menu = document.querySelector('.menu');

    const menuClose = document.querySelector('.menu__close');

    window.menuOpen = false;

    if (!burgers.length || !menu) return;

    const openMenu = () => {
        if (window.menuOpen) return;
        document.body.classList.add('mobile-menu-open');

        window.menuOpen = true;
    };
    const closeMenu = () => {
        if (!window.menuOpen) return;
        document.body.classList.remove('mobile-menu-open');

        window.menuOpen = false;
    };

    window.openMenu = openMenu;
    window.closeMenu = closeMenu;

    burgers.forEach(burger => {
        burger.addEventListener('click', event => {
            event.preventDefault();
            if (!window.menuOpen) {
                openMenu();
            }
        });
    });

    menuClose.addEventListener('click', event => {
        event.preventDefault();

        if (window.menuOpen) {
            closeMenu();
        }
    });

    const items = Array.from(document.querySelectorAll('.menu__nav-list-item'));

    items.forEach(item => {
        const hasSubmenu = !!item.querySelector('.menu__submenu-list');
        const link = item.querySelector('.menu__nav-link');
        link.addEventListener('click', event => {
            if (window.matchMedia('(max-width: 640px)').matches && hasSubmenu) {
                event.preventDefault();
                item.classList.toggle('shown');
            }
        });
    });
}
