export default function ticketsAmount() {
    const elements = Array.from(document.querySelectorAll('.js-ticket-amount'));

    elements.forEach(element => {
        const input = element.querySelector('input');

        const minus = element.querySelector('button:first-child');
        const plus = element.querySelector('button:last-child');

        let initialValue = input.value.trim() !== '' ? Number(input.value) : 0;

        const setActivity = value => {
            if (value <= 0) {
                minus.disabled = true;
            } else {
                minus.disabled = false;
            }

            if (input.hasAttribute('max')) {
                const maxValue = input.getAttribute('max');
                if (value >= maxValue) {
                    plus.disabled = true;
                } else {
                    plus.disabled = false;
                }
            }
        };

        setActivity(initialValue);

        minus.addEventListener('click', () => {
            if (minus.disabled) return;

            let value = input.value.trim() !== '' ? Number(input.value) : 0;

            value--;

            input.value = value;

            if (value <= 0) {
                input.value = 0;
            }

            setTimeout(() => {
                setActivity(value);
            }, 500);
        });

        plus.addEventListener('click', event => {
            if (plus.disabled) return;

            let value = input.value.trim() !== '' ? Number(input.value) : 0;

            value++;
            input.value = value;

            if (input.hasAttribute('max')) {
                const maxValue = input.getAttribute('max');
                if (value >= maxValue) {
                    input.value = maxValue;
                }
            }

            setTimeout(() => {
                setActivity(value);
            }, 500);
        });
    });
}
