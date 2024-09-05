function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function aboutSpaceSlider() {
    const elements = Array.from(document.querySelectorAll('.js-about-space'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.about-space__arrows-btn--next'),
                prevEl: element.querySelector('.about-space__arrows-btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 1
                }
            }
        });
    });
}

function aboutFoodSlider() {
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

document.addEventListener('DOMContentLoaded', function() {
    aboutSpaceSlider();
    aboutFoodSlider();
});
