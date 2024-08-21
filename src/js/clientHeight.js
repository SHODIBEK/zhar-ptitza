import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { debounce } from 'lodash';

gsap.registerPlugin(ScrollTrigger);

export default function clientHeight() {
    let width = 0;
    const setHeight = () => {
        const currentWidth = document.documentElement.clientWidth;
        if (width === currentWidth) return;
        width = currentWidth;
        const clientHeight = document.documentElement.clientHeight;

        document.documentElement.style.setProperty('--client-height', clientHeight + 'px');

        ScrollTrigger.refresh();
    };

    setHeight();

    window.addEventListener(
        'resize',
        debounce(() => {
            if (document.documentElement.clientWidth === width) return;
            setHeight();
        }, 400)
    );
}
