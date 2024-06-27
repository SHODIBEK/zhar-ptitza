function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));
    elements.forEach(element => {
        const mainContainer = element.querySelector('.intro__content-slider .swiper');
        const bgContainer = element.querySelector('.intro__bg-slider .swiper');

        const bgSlides = Array.from(element.querySelectorAll('.intro__bg-slider .swiper-slide'));

        const mainInstance = new Swiper(mainContainer, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            grabCursor: true,
            pagination: {
                el: element.querySelector('.intro__pagination'),
                type: 'bullets',
                clickable: true
            }
        });

        const playVideo = index => {
            bgSlides.forEach(slide => {
                const video = slide?.querySelector('video');
                if (video) {
                    video.pause();
                    video.classList.remove('playing');
                }
            });
            const video = bgSlides[index]?.querySelector('video');
            if (!video) return;

            video.classList.add('playing');
            video.play();
        };

        const bgSlider = new Swiper(bgContainer, {
            effect: 'fade',
            fadeEffect: {
                crossFade: false
            },
            grabCursor: true,
            init: false,
            on: {
                init: swiper => {
                    playVideo(swiper.activeIndex);
                },
                slideChange: swiper => {
                    playVideo(swiper.activeIndex);
                }
            }
        });

        bgSlider.init();

        mainInstance.controller.control = bgSlider;
        bgSlider.controller.control = mainInstance;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                pin: '.intro__parallax-wrapper',
                markers: false,
                pinSpacing: false
            }
        });

        tl.to(element.querySelector('.intro__bg-slider'), {
            scale: 1.05,
            duration: 0.4
        });
    });
}

function spaSlider() {
    const elements = Array.from(document.querySelectorAll('.js-spa-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            navigation: {
                nextEl: element.querySelector('.spa-slider__arrow--next'),
                prevEl: element.querySelector('.spa-slider__arrow--prev')
            },
            grabCursor: true,
            breakpoints: {
                641: {
                    slidesPerView: container.classList.contains('.js-spa-slider-3') ? 3 : 4,
                    spaceBetween: convertRemToPixels(8)
                }
            }
        });
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
    intro();
    spaSlider();
    news();
});
