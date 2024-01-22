import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import { IS_MOBILE } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);

export default function bookingRoomModalSlider() {
    const elements = Array.from(document.querySelectorAll('.js-booking-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            navigation: {
                nextEl: element.querySelector('.booking-room-modal__arrow--next'),
                prevEl: element.querySelector('.booking-room-modal__arrow--prev')
            },
            grabCursor: true,
            breakpoints: {
                641: {
                    centeredSlides: true
                }
            }
        });
    });
}
