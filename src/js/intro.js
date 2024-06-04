import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function intro() {
    const elements = Array.from(document.querySelectorAll('.js-intro'));
    elements.forEach(element => {
        const mainContainer = element.querySelector('.intro__content-slider .swiper');
        const bgContainer = element.querySelector('.intro__bg-slider .swiper');

        const bgSlides = Array.from(element.querySelectorAll('.intro__bg-slider .swiper-slide'));

        const mainInstance = new Swiper(mainContainer, {
            effect: 'fade',
            autoHeight: true,
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
            autoHeight: true,
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
