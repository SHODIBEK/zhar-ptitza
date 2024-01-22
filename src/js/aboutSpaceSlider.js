import { Swiper, Navigation, EffectFade, Autoplay, Pagination, Grid } from 'swiper';

export default function aboutSpaceSlider() {
    const elements = Array.from(document.querySelectorAll('.js-about-space'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.about-space__arrows-btn--next'),
                prevEl: element.querySelector('.about-space__arrows-btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 1
                }
            }
        });
    });
}
