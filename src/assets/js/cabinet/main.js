function initMyPromo() {
    const elements = Array.from(document.querySelectorAll('.my-promo'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: '2',
            spaceBetween: 0,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.my-promo__arrow--next'),
                prevEl: element.querySelector('.my-promo__arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 3
                }
            }
        });
    });
}

let int;

function startTimer(duration, display) {
    var timer = parseInt(duration),
        display;
    int = setInterval(function() {
        if (timer > 0) {
            timer--;
            display.text(timer);
        } else {
            clearInterval(int);
            $('.js-timer-toggle').show();
            $('.js-timer-text').hide();
        }
    }, 1000);
}

function restartTimer(duration, display) {
    clearInterval(int);
    startTimer(duration, display);
    $('.js-timer-toggle').hide();
    $('.js-timer-text').show();
}

document.addEventListener('DOMContentLoaded', function() {
    const timer = $('.js-timer');
    const minutes = timer.data('time');
    startTimer(minutes, timer);

    initMyPromo();

    $('.js-timer-restart').on('click', function(e) {
        e.preventDefault();
        restartTimer(minutes, timer);
    });
});
