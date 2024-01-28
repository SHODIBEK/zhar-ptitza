import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function roomSlider() {
    const elements = Array.from(document.querySelectorAll('.js-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.room__slider-arrow--next'),
                prevEl: element.querySelector('.room__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    centeredSlides: true
                }
            }
        });
    });
}
