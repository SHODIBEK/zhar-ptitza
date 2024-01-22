export default function newsletter() {
    const cookies = document.querySelector('.js-newsletter');
    const closeBtn = document.querySelector('.js-newsletter-close');

    if (cookies) {
        if (sessionStorage.getItem('newsletter-shown') !== 'yes') {
            cookies.classList.add('shown');
        }
        closeBtn.addEventListener('click', event => {
            event.preventDefault();
            cookies.classList.remove('shown');
            sessionStorage.setItem('newsletter-shown', 'yes');
        });
    }
}
