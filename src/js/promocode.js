export default function eventPromoInput() {
    const promocodeInput = document.querySelectorAll('.js-promocode');
    const promoSubmitButton = document.querySelector('.booking__checkout-form-submit');

    promocodeInput.forEach(element => {
        const promocodeButton = element.parentElement.querySelector('.booking__checkout-promocode-button');
        element.addEventListener('input', () => {
            if (element.value.trim() !== '') {
                promocodeButton.classList.add('is-active');
                if (promoSubmitButton) {
                    promoSubmitButton.disabled = true;
                }
            } else {
                promocodeButton.classList.remove('is-active');

                if (promoSubmitButton) {
                    promoSubmitButton.disabled = false;
                }
            }
        });
    });
}
