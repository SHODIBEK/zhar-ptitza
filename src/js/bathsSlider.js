import { Swiper, Navigation, EffectFade, Autoplay, Pagination } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay, Pagination]);

export default function bathsSlider() {
    if (!IS_MOBILE) return;

    const elements = Array.from(document.querySelectorAll('.js-baths-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 500,
            grabCursor: true
        });
    });
}
