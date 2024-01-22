import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function parallaxImages() {
    const elements = Array.from(document.querySelectorAll('.js-parallax-image'));

    elements.forEach(element => {
        const parallaxWrapper = element.querySelector('.js-parallax-image-wrapper');

        gsap.set(parallaxWrapper, {
            transformOrigin: 'center bottom',
            scale: 1.2
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        tl.to(parallaxWrapper, {
            yPercent: 20,
            duration: 0.4
        });
    });
}
