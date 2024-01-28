import { Swiper, Navigation, EffectFade, Autoplay } from 'swiper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { convertRemToPixels } from './utils';

Swiper.use([Navigation, EffectFade, Autoplay]);
gsap.registerPlugin(ScrollTrigger);

export default function gallerySlider() {
    const elements = Array.from(document.querySelectorAll('.js-gallery-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            touchEventsTarget: 'container',
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 15,
            watchOverflow: true,
            speed: 700,
            grabCursor: true
            // speed: 3500,
            // allowTouchMove: false,
            // autoplay: {
            //     delay: 0,
            //     disableOnInteraction: true
            // }
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        tl.fromTo(
            element,
            {
                x: () => (window.matchMedia('(max-width: 640px)').matches ? -1 * convertRemToPixels(4) : -1 * convertRemToPixels(18))
            },
            {
                x: () => (window.matchMedia('(max-width: 640px)').matches ? 1 * convertRemToPixels(4) : 1 * convertRemToPixels(18)),
                duration: 0.5
            }
        );
    });
}
