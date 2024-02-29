const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const decrementButton = counter.querySelector('.js-counter-minus');
    const incrementButton = counter.querySelector('.js-counter-plus');
    const valueInput = counter.querySelector('.js-counter-input');

    function increment() {
        let value = parseInt(valueInput.value);
        value++;
        valueInput.value = value;
    }

    function decrement() {
        let value = parseInt(valueInput.value);
        value--;
        valueInput.value = value >= 1 ? value : 1;
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
});
