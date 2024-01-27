import { Swiper, Navigation, EffectFade, Autoplay, Pagination } from 'swiper';
import { convertRemToPixels } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay, Pagination]);

export default function apartments() {
    const elements = Array.from(document.querySelectorAll('.js-apartments'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const swiper = new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 1000,
            grabCursor: true,
            pagination: {
                el: element.querySelector('.apartments__slider-pagination'),
                type: 'fraction'
            },
            navigation: {
                nextEl: element.querySelector('.apartments__slider-arrow--next'),
                prevEl: element.querySelector('.apartments__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: convertRemToPixels(14),
                    touchEventsTarget: 'container'
                }
            }
        });

        swiper.on('slideChange', function() {
            const videos = element.querySelectorAll('video');

            videos.forEach(element => {
                if (element != null) {
                    element.pause();
                    element.parentElement.parentElement.classList.remove('video-shown');
                }
            });
        });
    });
}
