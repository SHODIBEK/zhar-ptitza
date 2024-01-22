export default function menuImages() {
    const btns = Array.from(document.querySelectorAll('.menu__nav-list-item'));
    const imagesContainer = document.querySelector('.menu__images-list');
    const images = Array.from(document.querySelectorAll('.menu__images-card'));
    const imagesListItems = Array.from(document.querySelectorAll('.menu__images-list-item'));

    btns.forEach((btn, btnIndex) => {
        const submenuItems = Array.from(btn.querySelectorAll('.menu__submenu-link'));
        const submenuCards = Array.from(imagesListItems[btnIndex]?.querySelectorAll('.menu__images-card-inner-image-wrapper'));
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('active');
            imagesContainer.classList.add('active');

            images.forEach(image => image.classList.remove('active'));
            images[btnIndex].classList.add('active');

            submenuItems.forEach((item, index) => {
                item.addEventListener('mouseenter', () => {
                    images[btnIndex].classList.remove('active');
                    submenuCards.forEach(item => item.classList.remove('active'));
                    submenuCards[index]?.classList.add('active');
                });

                item.addEventListener('mouseleave', () => {
                    submenuCards.forEach(item => item.classList.remove('active'));
                    images[btnIndex]?.classList.add('active');
                });
            });
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('active');
            imagesContainer.classList.remove('active');
            images.forEach(image => image.classList.remove('active'));
        });
    });
}
