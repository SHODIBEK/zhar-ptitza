import { Swiper, Navigation, EffectFade, Autoplay, Pagination } from 'swiper';
Swiper.use([Navigation, EffectFade, Autoplay, Pagination]);

export default function restTogetherSlider() {
    const elements = Array.from(document.querySelectorAll('.js-rest-together-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            speed: 800,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 12,
            loop: true,
            navigation: {
                nextEl: element.querySelector('.rest-together__slider-arrow--next'),
                prevEl: element.querySelector('.rest-together__slider-arrow--prev')
            },
            grabCursor: true,
            breakpoints: {
                641: {
                    slidesPerView: 1,
                    centeredSlides: false,
                    loop: false,
                    spaceBetween: 0
                }
            }
        });
    });
}
