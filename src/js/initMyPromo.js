import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function initMyPromo() {
    const elements = Array.from(document.querySelectorAll('.my-promo'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: '2',
            spaceBetween: 0,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.my-promo__arrow--next'),
                prevEl: element.querySelector('.my-promo__arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 3
                }
            }
        });
    });
}
