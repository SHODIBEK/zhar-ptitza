import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function promoDetailSlider() {
    const elements = Array.from(document.querySelectorAll('.js-promo-detail-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            longSwipesRatio: 0.3,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            grabCursor: true,
            breakpoints: {
                641: {
                    centeredSlides: true
                }
            }
        });
    });
}
