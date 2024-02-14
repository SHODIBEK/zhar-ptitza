export default function scrollToTop() {
    const elements = Array.from(document.querySelectorAll('.js-scroll-to-top'));

    elements.forEach(element => {
        element.addEventListener('click', event => {
            event.preventDefault();

            gsap.to(window, {
                duration: 1.5,
                ease: 'power2.out',
                scrollTo: {
                    y: 0
                }
            });
        });
    });
}
