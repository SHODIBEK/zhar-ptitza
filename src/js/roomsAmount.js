import { num_word } from './utils';

export default function roomsAmount() {
    const elements = Array.from(document.querySelectorAll('.js-room-amount'));

    elements.forEach(element => {
        const input = element.querySelector('input');

        const minus = element.querySelector('button:first-child');
        const plus = element.querySelector('button:last-child');

        const min = input.hasAttribute('data-min') ? parseInt(input.getAttribute('data-min'), 10) : 0;

        const units = input.hasAttribute('data-units') ? input.getAttribute('data-units').split(',') : null;

        let initialValue = input.value.trim() !== '' ? parseInt(input.value, 10) : min;

        const checkbox = input.closest('.booking__room-slider-card-btns')?.querySelector('.booking__room-slider-card-checkbox-input');
        const card = input.closest('.booking__room-slider-card');

        const setActivity = value => {
            if (value <= min) {
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

        if (units) {
            input.value = initialValue + ' ' + num_word(initialValue, units);
        }

        minus.addEventListener('click', () => {
            if (minus.disabled) return;

            let value = input.value.trim() !== '' ? parseInt(input.value, 10) : min;

            value--;

            if (value <= min) {
                input.value = min;
                if (checkbox) checkbox.checked = false;
                if (card) card.classList.remove('selected');
                if (value === 0) {
                    value = 1;
                }
            }

            if (units) {
                input.value = value + ' ' + num_word(value, units);
            } else {
                input.value = value;
            }

            setTimeout(() => {
                setActivity(value);
            }, 500);
        });

        plus.addEventListener('click', event => {
            if (plus.disabled) return;

            let value = input.value.trim() !== '' ? parseInt(input.value, 10) : min;

            value++;

            if (input.hasAttribute('max')) {
                const maxValue = input.getAttribute('max');
                if (value >= maxValue) {
                    input.value = maxValue;
                }
            }

            if (units) {
                input.value = value + ' ' + num_word(value, units);
            } else {
                input.value = value;
            }

            setTimeout(() => {
                setActivity(value);
            });
        });
    });
}
