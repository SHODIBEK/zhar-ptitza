import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function header() {
    const innerHeader = document.querySelector('.inner-page .page-header');
    const header = document.querySelector('.page-header');
    const changeColorBlock = document.querySelector('.js-change-header-color');
    if (!header || header.classList.contains('fixed')) return;

    ScrollTrigger.create({
        trigger: changeColorBlock ? changeColorBlock : Array.from(document.querySelectorAll('section'))[0],
        start: () => header.offsetHeight,
        // (changeColorBlock ? `bottom-=${header.offsetHeight} top` : `top+=40 top`)
        markers: false,
        onEnter: () => {
            header.classList.add('fixed');
        },
        onLeaveBack: () => {
            header.classList.remove('fixed');
        }
    });

    if (innerHeader) {
        ScrollTrigger.create({
            trigger: innerHeader,
            start: 'top top',
            end: `+=${header.offsetHeight}`,
            onToggle: self => {
                if (self.direction === 1) {
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                }
            }
        });
    }
}
