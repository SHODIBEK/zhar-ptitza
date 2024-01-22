import { Swiper, Navigation, EffectFade, Autoplay, Controller, Pagination } from 'swiper';

Swiper.use([Navigation, EffectFade, Autoplay, Controller, Pagination]);

export default function newsletterSlider() {
    const elements = Array.from(document.querySelectorAll('.js-newsletter-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const instance = new Swiper(container, {
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true
            },
            grabCursor: true,
            pagination: {
                el: element.querySelector('.newsletter__slider-pagination'),
                type: 'bullets',
                clickable: true
            }
        });

        if (window.Parsley) {
            window.Parsley.on('field:validated', function() {
                instance.updateAutoHeight(400);
            });
        }

        instance.updateAutoHeight();
    });
}
