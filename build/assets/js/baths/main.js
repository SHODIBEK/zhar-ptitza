const IS_MOBILE = window.matchMedia('(max-width: 640px)').matches;

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

function bathsSlider() {
    if (!IS_MOBILE) return;

    const elements = Array.from(document.querySelectorAll('.js-baths-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 500,
            grabCursor: true
        });
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
    bathsSlider();
    rooms();
    news();
});
