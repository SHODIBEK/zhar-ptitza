import { Swiper, Navigation, EffectFade, Autoplay, Pagination, Grid } from 'swiper';
import { convertRemToPixels } from './utils';

export default function aboutFoodSlider() {
    const elements = Array.from(document.querySelectorAll('.js-about-food-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            speed: 600,
            centeredSlides: true,
            loop: true,
            loopedSlides: 6,
            watchOverflow: true,
            touchEventsTarget: 'container',
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.about-food__slider-next'),
                prevEl: element.querySelector('.about-food__slider-prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 3,
                    spaceBetween: convertRemToPixels(5.2)
                }
            }
        });
    });
}
