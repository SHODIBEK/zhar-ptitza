import { Swiper, Navigation, EffectFade, Autoplay, Pagination, Grid } from 'swiper';
Swiper.use([Navigation, EffectFade, Autoplay, Pagination, Grid]);

export default function bathRestSlider() {
    const elements = Array.from(document.querySelectorAll('.js-bath-rest-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            speed: 600,
            grabCursor: true,
            pagination: {
                el: element.querySelector('.bath-rest__slider-pagination'),
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: element.querySelector('.bath-rest__arrow--next'),
                prevEl: element.querySelector('.bath-rest__arrow--prev')
            },
            breakpoint: {
                641: {
                    slidesPerView: 1
                }
            }
        });
    });
}
