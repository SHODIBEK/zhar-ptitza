import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function mobileContacts() {
    ScrollTrigger.matchMedia({
        '(max-width: 640px)': function() {
            // ScrollTrigger.create({
            //     trigger: '.intro',
            //     start: 'top top',
            //     end: 999999,
            //     pin: '.intro__contacts',
            //     pinSpacing: false
            // });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.page-footer',
                    start: 'top bottom',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            })

            tl.to('.intro__contacts', {
                autoAlpha: 0,
                duration: 0.4
            })
        }
    });
}
