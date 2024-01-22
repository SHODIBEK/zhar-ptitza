import { Swiper, Navigation, EffectFade, Autoplay, Pagination, Grid } from 'swiper';
import { convertRemToPixels } from './utils';

export default function bookingRoomSlider() {
    const elements = Array.from(document.querySelectorAll('.js-booking-common-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const instance = new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            watchOverflow: true,
            threshold: 15,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.booking__room-slider-arrow--next'),
                prevEl: element.querySelector('.booking__room-slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: convertRemToPixels(2)
                }
            }
        });
    });
}
