function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function promosSlider() {
    const elements = Array.from(document.querySelectorAll('.js-promos-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            speed: 500,
            spaceBetween: convertRemToPixels(3),
            navigation: {
                nextEl: element.querySelector('.promos-intro__slider-arrow--next'),
                prevEl: element.querySelector('.promos-intro__slider-arrow--prev')
            },
            grabCursor: true,
            pagination: {
                el: element.querySelector('.promos-intro__slider-pagination'),
                type: 'bullets',
                clickable: true
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    promosSlider();
});
