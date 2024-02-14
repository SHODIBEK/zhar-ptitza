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

function rooms() {
    const rooms = document.querySelector('.rooms');
    const zone = document.querySelector('.zone');
    if (!rooms || !zone) return;

    const roomsCards = Array.from(document.querySelectorAll('.rooms__card'));

    if (roomsCards.length !== 2) return;

    ScrollTrigger.matchMedia({
        '(min-width: 641px)': function() {
            roomsCards.forEach((card, cardIndex) => {
                const contentWrapper = card.querySelector('.rooms__card-content-wrapper');
                const cardContent = card.querySelector('.rooms__card-content');
                const title = card.querySelector('.rooms__card-title');
                const zoneTitle = document.querySelector('.zone__heading');
                const zoneHeadingText = document.querySelector('.zone__heading-text');
                const zoneZoomWrapper = document.querySelector('.zone__image-zoom-wrapper');
                const zoneZoomWrapperInner = document.querySelector('.zone__image-zoom-wrapper-inner');
                const zoneImage = document.querySelector('.zone__image');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        // start: () => `top-=${document.querySelector('.page-header').offsetHeight} top`,
                        start: () => `top top`,
                        end: () =>
                            `top+=${parseFloat(window.getComputedStyle(rooms).getPropertyValue('padding-bottom')) + cardContent.offsetHeight} top`,
                        pin: card.querySelector('.rooms__card-content'),
                        pinSpacing: false,
                        scrub: true,
                        markers: false,
                        anticipatePin: 1,
                        onLeave: () => {
                            const tl = gsap.timeline();
                            tl.to(title, {
                                autoAlpha: 0,
                                duration: 0
                            })
                                .to(
                                    zoneTitle,
                                    {
                                        autoAlpha: 1,
                                        duration: 0
                                    },
                                    '<'
                                )
                                .to(
                                    zoneHeadingText,
                                    {
                                        autoAlpha: 1,
                                        duration: 0.3
                                    },
                                    '<'
                                );
                        },
                        onEnterBack: () => {
                            const tl = gsap.timeline();
                            tl.to(title, {
                                autoAlpha: 1,
                                duration: 0
                            })
                                .to(
                                    zoneTitle,
                                    {
                                        autoAlpha: 0,
                                        duration: 0
                                    },
                                    '<'
                                )
                                .to(
                                    zoneHeadingText,
                                    {
                                        autoAlpha: 0,
                                        duration: 0.3
                                    },
                                    '<'
                                );
                        }
                    }
                });

                tl.to(
                    title,
                    {
                        xPercent: cardIndex === 0 ? 32 : -32,
                        // autoAlpha: 0,
                        duration: 2
                    },
                    0.4
                ).to(
                    contentWrapper,
                    {
                        autoAlpha: 0,
                        duration: 0.7
                    },
                    0
                );

                const zoneTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: zone,
                        start: 'top center',
                        endTrigger: zoneZoomWrapper,
                        end: () => `bottom bottom`,
                        scrub: true,
                        markers: false
                    }
                });

                zoneTl.fromTo(
                    zoneZoomWrapperInner,
                    {
                        scale: 0.5
                    },
                    {
                        scale: 1,
                        duration: 1
                    }
                );

                if (zoneImage.complete) {
                    ScrollTrigger.refresh();
                } else {
                    zoneImage.addEventListener('load', () => {
                        ScrollTrigger.refresh();
                    });
                }
            });
        }
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

function bookingRoomModalSlider() {
    const elements = Array.from(document.querySelectorAll('.js-booking-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            navigation: {
                nextEl: element.querySelector('.booking-room-modal__arrow--next'),
                prevEl: element.querySelector('.booking-room-modal__arrow--prev')
            },
            grabCursor: true,
            breakpoints: {
                641: {
                    centeredSlides: true
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    intro();
    news();
    apartments();
    apartmentsVideo();
    rooms();
    restTogetherSlider();
    featuresSlider();
    bathRestSlider();
    spaSlider();
    bookingRoomModalSlider();
});
