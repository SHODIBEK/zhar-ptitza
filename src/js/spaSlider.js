import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import { convertRemToPixels, IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function spaSlider() {
    const elements = Array.from(document.querySelectorAll('.js-spa-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            navigation: {
                nextEl: element.querySelector('.spa-slider__arrow--next'),
                prevEl: element.querySelector('.spa-slider__arrow--prev')
            },
            grabCursor: true,
            breakpoints: {
                641: {
                    slidesPerView: container.classList.contains('.js-spa-slider-3') ? 3 : 4,
                    spaceBetween: convertRemToPixels(8)
                }
            }
        });
    });
}
