function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function roomSlider() {
    const elements = Array.from(document.querySelectorAll('.js-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.room__slider-arrow--next'),
                prevEl: element.querySelector('.room__slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    centeredSlides: true
                }
            }
        });
    });
}

function apartments() {
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

function apartmentsVideo() {
    const elements = Array.from(
        document.querySelectorAll(
            '.apartments__slider-card-image-container, .rooms-catalog__card-image-container, .booking__room-slider-card-image-container'
        )
    );

    elements.forEach(element => {
        const video = element.querySelector('video');

        if (video != null) {
            element.addEventListener('mouseenter', () => {
                // video.pause();
                video.currentTime = 0;
                video.play();
                element.classList.add('video-shown');
            });

            element.addEventListener('mouseleave', () => {
                video.pause();
                element.classList.remove('video-shown');
            });

            element.addEventListener('click', event => {
                event.preventDefault();
                if (video.playing) {
                    video.pause();
                    element.classList.remove('video-shown');
                } else {
                    // video.pause();
                    video.currentTime = 0;
                    video.play();
                    element.classList.add('video-shown');
                }
            });
        }
    });
}

function news() {
    const elements = Array.from(document.querySelectorAll('.js-news'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.news__arrows-btn--next'),
                prevEl: element.querySelector('.news__arrows-btn--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 4,
                    spaceBetween: convertRemToPixels(8)
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    roomSlider();
    apartments();
    apartmentsVideo();
    news();
});
