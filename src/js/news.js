import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import { convertRemToPixels } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function news() {
    const elements = Array.from(document.querySelectorAll('.js-news'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.news__arrows-btn--next'),
                prevEl: element.querySelector('.news__arrows-btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 4,
                    spaceBetween: convertRemToPixels(8)
                }
            }
        });
    });
}
