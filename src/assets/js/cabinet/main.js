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

function countdown(elementName, minutes, seconds) {
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits(n) {
        return n <= 9 ? '0' + n : n;
    }

    function updateTimer() {
        msLeft = endTime - +new Date();
        if (msLeft < 1000) {
            document.querySelector('.js-timer-toggle').style.display = 'block';
            document.querySelector('.js-timer-text').style.display = 'none';
        } else {
            time = new Date(msLeft);
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds());
            setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
        }
    }

    element = document.getElementById(elementName);
    endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;
    updateTimer();
}

function restartCountDown(minutes, seconds) {
    countdown('js-timer', minutes, seconds);
    $('.js-timer-toggle').hide();
    $('.js-timer-text').show();
}

document.addEventListener('DOMContentLoaded', function() {
    const timer = $('#js-timer');
    const minutes = timer.data('minutes');
    const seconds = timer.data('seconds');

    initMyPromo();
    countdown('js-timer', minutes, seconds);

    $('.js-timer-restart').on('click', function(e) {
        e.preventDefault();
        restartCountDown(minutes, seconds);
    });
});
