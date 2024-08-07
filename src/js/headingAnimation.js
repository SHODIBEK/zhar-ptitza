import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IS_MOBILE } from './utils';
import SplitText from './vendor/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function headingAnimation() {
    const headers = Array.from(document.querySelectorAll('.js-heading'));

    headers.forEach(header => {
        new SplitText(header, { type: 'lines', linesClass: 'lineChild' });
        new SplitText(header, { type: 'lines', linesClass: 'lineParent' });

        const lineParent = Array.from(header.querySelectorAll('.lineParent'));

        if (
            lineParent.length === 2 &&
            (header.matches('.news__heading, .apartments__heading, .rooms-catalog__heading, .spa-services__heading, .programs__block-heading') ||
                (header.matches('.bath-rest__heading--mobile-centered') && IS_MOBILE))
        ) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: 'top bottom',
                    end: 'bottom top',
                    markers: false,
                    scrub: true
                }
            });

            tl.from(lineParent[0], {
                xPercent: -15,
                duration: 0.6
            }).from(
                lineParent[1],
                {
                    xPercent: 15,
                    duration: 0.6
                },
                0
            );
        } else {
            lineParent.forEach(line => {
                gsap.set(line, {
                    overflow: 'hidden'
                });
            });

            const lineChild = Array.from(header.querySelectorAll('.lineChild'));

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: header,
                    start: 'top bottom',
                    end: 'bottom top',
                    markers: false
                }
            });

            tl.from(lineChild, {
                yPercent: 100,
                duration: 0.6
            });
        }
    });
}
