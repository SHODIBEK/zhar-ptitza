export default function eventPromoInput() {
    const promocodeInput = document.querySelectorAll('.js-promocode');

    promocodeInput.forEach(element => {
        const promocodeButton = element.parentElement.querySelector('.booking__checkout-promocode-button');
        element.addEventListener('input', () => {
            if (element.value.trim() !== '') {
                promocodeButton.classList.add('is-active');
            } else {
                promocodeButton.classList.remove('is-active');
            }
        });
    });
}
