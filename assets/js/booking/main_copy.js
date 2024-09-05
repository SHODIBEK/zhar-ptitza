let loaderElem = null;

function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function num_word(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}

function bookingRoomSlider() {
    const elements = Array.from(document.querySelectorAll('.js-booking-common-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const instance = new Swiper(container, {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 600,
            watchOverflow: true,
            threshold: 15,
            grabCursor: true,
            navigation: {
                nextEl: element.querySelector('.booking__room-slider-arrow--next'),
                prevEl: element.querySelector('.booking__room-slider-arrow--prev')
            },
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: convertRemToPixels(2)
                }
            }
        });
    });
}

function bookingRoomModalSlider() {
    const elements = Array.from(document.querySelectorAll('.js-booking-room-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        new Swiper(container, {
            slidesPerView: 'auto',
            centeredSlides: false,
            loopedSlides: 10,
            loopedSlidesLimit: false,
            loopAdditionalSlides: 10,
            loop: true,
            speed: 500,
            navigation: {
                nextEl: element.querySelector('.booking-room-modal__arrow--next'),
                prevEl: element.querySelector('.booking-room-modal__arrow--prev')
            },
            grabCursor: true
        });
    });
}


function datepicker() {
    const elements = Array.from(document.querySelectorAll('.js-datepicker'));
    const today = new Date();
    const formattedToday = ('0' + today.getDate()).slice(-2) + '.' + ('0' + (today.getMonth() + 1)).slice(-2) + '.' + today.getFullYear();

    elements.forEach(element => {
        $(element)
            .datepicker({
                startDate: '0d', // Устанавливает минимальную дату на сегодняшнюю дату
                format: 'dd.mm.yyyy',
                container: element.hasAttribute('data-picker-container') ? element.getAttribute('data-picker-container') : '#picker-container',
                language: 'ru',
                autoclose: true,
                defaultViewDate: {year: today.getFullYear(), month: today.getMonth(), day: today.getDate()},
                templates: {
                    leftArrow: `
                                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.61057 7.54618C9.52768 5.63061 10.7477 2.96042 10.7477 0H11.3867C11.3867 1.27704 11.1543 2.55409 10.7477 3.71504C9.58578 7.02375 7.02963 9.57784 3.71825 10.6807H29.1055V11.3193H3.77635C7.02963 12.4802 9.58578 15.0343 10.6896 18.285C11.0962 19.4459 11.3286 20.6649 11.3286 22H10.6896C10.6896 19.0396 9.46959 16.3694 7.55248 14.4538C5.69346 12.5963 3.13731 11.4354 0.348783 11.3773H0.00021553V10.7388C3.02112 10.6227 5.63536 9.46174 7.61057 7.54618Z"
                                        fill="#968A71" />
                                </svg>
                            `,
                    rightArrow: `
                                <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.4949 7.54618C19.5778 5.63061 18.3578 2.96042 18.3578 0H17.7188C17.7188 1.27704 17.9511 2.55409 18.3578 3.71504C19.5197 7.02375 22.0758 9.57784 25.3872 10.6807H0V11.3193H25.3291C22.0758 12.4802 19.5197 15.0343 18.4159 18.285C18.0092 19.4459 17.7769 20.6649 17.7769 22H18.4159C18.4159 19.0396 19.6359 16.3694 21.553 14.4538C23.412 12.5963 25.9682 11.4354 28.7567 11.3773H29.1053V10.7388C26.0843 10.6227 23.4701 9.46174 21.4949 7.54618Z"
                                        fill="#968A71" />
                                </svg>
                            `
                },
                onSelect: function (dateText, inst) {
                    console.log("Выбранная дата: " + dateText);
                }
            })
            .on('show', function (e) {
                element.classList.add('datepicker-shown');
            })
            .on('hide', function (e) {
                element.classList.remove('datepicker-shown');
            })
            .on('changeDate', function (e) {
                toggleLoader(true);

                setTimeout(() => {
                    if (e.date) {
                        startIntervalDate = e.date;
                        firstSelectedBookingDate = JSON.parse(JSON.stringify(e.date));
                    }
                    tableRender();
                }, 0);
                $(element).trigger('blur');
                setTimeout(() => {
                    toggleLoader(false);
                }, 500);
            });

        $(element).datepicker('update', formattedToday);
    });
}

$(document).ready(function () {
    datepicker();
});

function toggleLoader(show) {
    if (show) {
        loaderElem.classList.add('booking__loader--active');
    } else {
        loaderElem.classList.remove('booking__loader--active');
    }
}

function roomsAmount() {
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

function timeDropdown() {
    const elements = Array.from(document.querySelectorAll('.js-time-dropdown'));

    elements.forEach(element => {
        const input = element.querySelector('.booking__common-search-input');
        const checkboxes = Array.from(element.querySelectorAll('.booking__common-search-dropdown-checkbox-input'));

        const dropdown = element.querySelector('.booking__common-search-dropdown');

        const setActiveRadio = () => {
            const checkedRadio = checkboxes.find(radio => radio.checked);
            if (!checkedRadio) return;
            input.value = checkedRadio.value;
        };

        setActiveRadio();

        input.addEventListener('focus', event => {
            dropdown.classList.add('active');
        });
        input.addEventListener('blur', event => {
            dropdown.classList.remove('active');
        });

        document.addEventListener('click', event => {
            if (event.target.matches('.booking__common-search-dropdown') || event.target.closest('.booking__common-search-dropdown')) return;
            if (event.target.matches('.booking__common-search-input') || event.target.closest('.booking__common-search-input')) return;

            dropdown.classList.remove('active');
        });

        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                setActiveRadio();
            });
        });
    });
}

function ticketsAmount() {
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

function videoPlaying() {
    const elements = Array.from(
        document.querySelectorAll(
            '.apartments__slider-card-image-container, .rooms-catalog__card-image-container, .booking__room-slider-card-image-container'
        )
    );

    elements.forEach(element => {
        const video = element.querySelector('video');

        if (video != null) {
            element.addEventListener('mouseenter', () => {
                // video.pause();
                video.currentTime = 0;
                video.play();
                element.classList.add('video-shown');
            });

            element.addEventListener('mouseleave', () => {
                video.pause();
                element.classList.remove('video-shown');
            });

            element.addEventListener('click', event => {
                event.preventDefault();
                if (video.playing) {
                    video.pause();
                    element.classList.remove('video-shown');
                } else {
                    // video.pause();
                    video.currentTime = 0;
                    video.play();
                    element.classList.add('video-shown');
                }
            });
        }
    });
}



document.addEventListener('DOMContentLoaded', function () {
    loaderElem = document.querySelector('.booking__loader');
    datepicker();
    bookingRoomSlider();
    roomsAmount();
    timeDropdown();
    ticketsAmount();
    videoPlaying();
    bookingRoomModalSlider();
});
