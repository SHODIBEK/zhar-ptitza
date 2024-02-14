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

function restTogetherSlider() {
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

function featuresSlider() {
    const elements = Array.from(document.querySelectorAll('.js-features-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const instance = new Swiper(container, {
            slidesPerView: 1,

            speed: 800,
            autoHeight: true,
            grabCursor: true,

            navigation: {
                nextEl: element.querySelector('.features__slider-arrow--next'),
                prevEl: element.querySelector('.features__slider-arrow--prev')
            },
            on: {
                init: swiper => {
                    ScrollTrigger.refresh();
                },
                slideChange: swiper => {
                    ScrollTrigger.refresh();
                }
            },
            init: false,
            breakpoints: {
                641: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        });

        instance.init();
    });
}

function bathRestSlider() {
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
    restTogetherSlider();
    featuresSlider();
    bathRestSlider();
    news();
});
