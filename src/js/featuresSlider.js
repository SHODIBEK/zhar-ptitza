import { Swiper, Navigation, EffectFade, Autoplay, Pagination, Grid } from 'swiper';
import { convertRemToPixels } from './utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
Swiper.use([Navigation, EffectFade, Autoplay, Pagination, Grid]);

gsap.registerPlugin(ScrollTrigger);

export default function featuresSlider() {
    const elements = Array.from(document.querySelectorAll('.js-features-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const instance = new Swiper(container, {
            slidesPerView: 1,

            speed: 800,
            autoHeight: true,
            grabCursor: true,

            navigation: {
                nextEl: element.querySelector('.features__slider-arrow--next'),
                prevEl: element.querySelector('.features__slider-arrow--prev')
            },
            on: {
                init: swiper => {
                    ScrollTrigger.refresh();
                },
                slideChange: swiper => {
                    ScrollTrigger.refresh();
                }
            },
            init: false,
            breakpoints: {
                641: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        });

        instance.init();
    });
}
