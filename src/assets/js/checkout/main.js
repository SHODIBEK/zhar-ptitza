const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const decrementButton = counter.querySelector('.js-counter-minus');
    const incrementButton = counter.querySelector('.js-counter-plus');
    const valueInput = counter.querySelector('.js-counter-input');
    const minValue = valueInput.getAttribute('min') || 1;
    const maxValue = valueInput.getAttribute('max') || 100;

    function enforceMinMax() {
        if (parseInt(valueInput.value) <= parseInt(minValue)) {
            valueInput.value = minValue;

            decrementButton.setAttribute('disabled', 'disabled');
        } else {
            decrementButton.removeAttribute('disabled');
        }
        if (parseInt(valueInput.value) >= parseInt(maxValue)) {
            valueInput.value = maxValue;

            incrementButton.setAttribute('disabled', 'disabled');
        } else {
            incrementButton.removeAttribute('disabled');
        }
    }

    function increment() {
        let value = parseInt(valueInput.value);
        value++;

        valueInput.value = value;

        enforceMinMax();
    }

    function decrement() {
        let value = parseInt(valueInput.value);
        value--;

        valueInput.value = value >= 1 ? value : 1;

        enforceMinMax();
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);

    valueInput.addEventListener('keyup', enforceMinMax);
});

customSelect('select');
