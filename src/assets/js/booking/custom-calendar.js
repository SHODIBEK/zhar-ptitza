let firstSelectedBookingDate = new Date();
let startIntervalDate = new Date();
let holidays = []
let disabledDays = ['2024-09-10'];
let bookingDates = [
    {
        "start": "2024-08-29 12:00:00",
        "end": "2024-08-29 16:00:00"
    },
    {
        "start": "2024-08-29 19:00:00",
        "end": "2024-08-30 01:00:00"
    },
    {
        "start": "2024-08-30 12:00:00",
        "end": "2024-08-30 16:00:00"
    },
    {
        "start": "2024-08-30 17:00:00",
        "end": "2024-08-31 00:00:00"
    },
    {
        "start": "2024-08-31 16:00:00",
        "end": "2024-08-31 22:00:00"
    },
    {
        "start": "2024-09-05 20:00:00",
        "end": "2024-09-06 01:00:00"
    },
    {
        "start": "2024-09-07 15:00:00",
        "end": "2024-09-07 19:00:00"
    }
];
let isFirstInterval = true;
let selectStartCell = null;
let selectEndCell = null;
let minHours = 3;
startIntervalDate.setDate(startIntervalDate.getDate());

function tableRender() {
    const source = "<thead class=\"time-header\">\n" +
        "                        <tr>\n" +
        "                            <th class=\"time-cell\"></th>\n" +
        "                        {{#each times}}\n" +
        "                            <th class=\"time-cell\">\n" +
        "                                <span>{{{formatTime this}}}</span>\n" +
        "                            </th>\n" +
        "                        {{/each}}\n" +
        "                        </tr>\n" +
        "                    </thead>\n" +
        "                    <tbody class=\"date-rows\">\n" +
        "                        {{#each dates}}\n" +
        "                            <tr class=\"date-row\">\n" +
        "                                <td class=\"date-cell {{isActiveDate this}}\">\n" +
        "                                    <div><span>{{formatDate this}}</span></div>\n" +
        "                                </td>\n" +
        "                            {{#each ../times}}\n" +
        "                                <td class=\"time-slot {{#if (isPastDateTime ../this this @root.bookingDates)}}pastDate{{else if (isInInterval ../this this @root.bookingDates)}}booked{{else if (isEdgeInterval ../this this @root.bookingDates)}}empty{{else if (isDisabledDay ../this)}}notWorkingDay{{/if}}\"\n" +
        "                    data-date=\"{{../this}}\" data-time=\"{{subtractOneHour this}}\">\n" +
        "                </td>" +
        "                            {{/each}}\n" +
        "                            </tr>\n" +
        "                        {{/each}}\n" +
        "                    </tbody>";

    Handlebars.registerHelper('isDisabledDay', function (date) {
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD
        return disabledDays.includes(formattedDate); // Проверяем, есть ли эта дата в массиве disabledDays
    });

    Handlebars.registerHelper('isInInterval', function (date, time, bookingDates) {
        return isInInterval(new Date(date), time, bookingDates);
    });

    Handlebars.registerHelper('isEdgeInterval', function (date, time, bookingDates) {
        return isEdgeInterval(new Date(date), time, bookingDates);
    });

    Handlebars.registerHelper('formatDate', function (date) {
        return formatDate(new Date(date));
    });
    Handlebars.registerHelper('formatTime', function (time) {
        const tmp = time.split(':');
        if (tmp[0] == 24) {
            tmp[0] = '00'
        }
        return `${tmp[0]}<sup>:${tmp[1]}</sup>`;
    });

    Handlebars.registerHelper('isActiveDate', function (date) {
        const dateToCheck = new Date(date).setHours(0, 0, 0, 0); // Убираем время для точного сравнения только даты
        const selectedDate = new Date(firstSelectedBookingDate).setHours(0, 0, 0, 0);
        return dateToCheck === selectedDate ? 'active' : '';
    });

    Handlebars.registerHelper('isPastDateTime', function (date, time, bookingDates) {
        const [hours, minutes] = time.split(':').map(Number);
        const cellDateTime = new Date(date);
        cellDateTime.setHours(hours, minutes, 0, 0);

        // Получаем текущее время в Москве
        const nowInMoscow = new Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"});
        const moscowDate = new Date(nowInMoscow);

        // Добавляем один час к текущему времени в Москве
        moscowDate.setHours(moscowDate.getHours() + 1);

        const isPast = cellDateTime < moscowDate;
        const inInterval = isInInterval(new Date(date), time, bookingDates);
        const edgeInterval = isEdgeInterval(new Date(date), time, bookingDates);

        if (isPast) {
            // Проверяем, если это забронированная дата или краевой интервал, возвращаем false
            if (inInterval || edgeInterval) {
                return false;
            }

            // В противном случае проверяем, является ли это прошедшим временем
            return isPast;
        }
        return false;
    });

    Handlebars.registerHelper('subtractOneHour', function (time) {
        return adjustTimeByOneHour(time);
    });


    const template = Handlebars.compile(source);
    const context = {
        times: [
            "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
            "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
            "22:00", "23:00", "24:00"
        ],
        dates: getDateInterval(startIntervalDate),
        bookingDates: bookingDates
    };

    const table = document.querySelector('.calendar');
    if (table) {
        table.innerHTML = template(context);
        addCellClickHandlers();
    }
    checkMinDate();

    if (selectStartCell && selectEndCell) {
        const cells = getCellsInRange(selectStartCell, selectEndCell);
        cells.forEach(cell => cell.classList.add('selected'));
    }

    findBookedBeforeEmpty();
}

function addCellClickHandlers() {
    const cells = document.querySelectorAll('.time-slot');
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
        cell.addEventListener('mouseover', () => handleCellMouseOver(cell));
        cell.addEventListener('touchstart', () => handleCellMouseOver(cell));
    });
}

function findBookedBeforeEmpty() {
    const rows = document.querySelectorAll('tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        for (let i = 0; i < cells.length - 1; i++) {
            const currentCell = cells[i];
            const prevCell = cells[i - 1];
            if (currentCell.classList.contains('empty')) {
                prevCell.style.borderRightColor = '#ede8dd';
            }
        }
    });
}

function handleCellClick(cell) {

    if (!selectStartCell) {
        if (['empty', 'pastDate', 'booked', 'notWorkingDay'].some(key => cell.classList.contains(key))) {
            showTooltip(cell, 'Выбранный интервал недоступен для бронирования');
            return;
        }

        selectStartCell = cell;
        cell.classList.add('selected');
        cell.classList.add('start');
        disableCellsBeyondFirstBooked(selectStartCell);
    } else if (!selectEndCell) {
        if (selectStartCell === cell) {
            clearSelection();
            return;
        }

        minHours = getMinHours(cell.dataset.date);
        const start = new Date(selectStartCell.dataset.date).setHours(selectStartCell.dataset.time.split(':')[0], 0, 0);
        const end = new Date(cell.dataset.date).setHours(cell.dataset.time.split(':')[0], 0, 0);
        let cells = getCellsInRange(selectStartCell, cell);
        if (start > end) {
            cells = getCellsInRange(cell, selectStartCell);

            // Проверка на наличие бронированных ячеек
            if (cells.some(cell => cell.classList.contains('booked') || cell.classList.contains('notWorkingDay'))) {
                showTooltip(cell, 'Выбранный интервал недоступен для бронирования');
                return;
            }

            if (cells.length < minHours) {
                selectEndCell = null;
                showTooltip(cell, `Минимальное время аренды – ${minHours} часа`);
                return;
            }
            selectEndCell = selectStartCell;
            selectStartCell = cell;
        } else {
            const cells = getCellsInRange(selectStartCell, cell);

            // Проверка на наличие бронированных ячеек
            if (cells.some(cell => cell.classList.contains('booked') || cell.classList.contains('notWorkingDay'))) {
                showTooltip(cell, 'Выбранный интервал недоступен для бронирования');
                return;
            }

            selectEndCell = cell;
        }

        minHours = getMinHours(selectStartCell.dataset.date);
        cells = getCellsInRange(selectStartCell, selectEndCell);
        if (cells.length < minHours) {
            selectEndCell = null;
            showTooltip(cell, `Минимальное время аренды – ${minHours} часа`);
            return;
        }

        if (!cells.some(cell => cell.classList.contains('booked'))) {
            cells.forEach(cell => cell.classList.add('selected'));
        }

        const className = '.selected-info-' + (isMobile() ? 2 : 1);
        const selectedInfo = document.querySelector(className);
        const format = function (startDate, endDate) {
            const options = { day: 'numeric', month: 'long' };
            const start = new Date(startDate.dataset.date);
            const end = new Date(endDate.dataset.date);
            start.setHours(+startDate.dataset.time.split(':')[0], 0, 0, 0);
            end.setHours(+endDate.dataset.time.split(':')[0] + 1, 0, 0, 0);

            const diffTime = end.getTime() - start.getTime();
            const diffHours = Math.floor(diffTime / (1000 * 60 * 60)); // разница в часах
            const diffDays = Math.floor(diffHours / 24); // разница в днях
            const remainingHours = diffHours % 24; // остаток часов

            // Функция для склонения слов "день" и "час"
            const getWord = (num, one, few, many) => {
                if (num % 10 === 1 && num % 100 !== 11) return one;
                if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) return few;
                return many;
            };
            const getDayWord = (days) => getWord(days, 'день', 'дня', 'дней');
            const getHourWord = (hours) => getWord(hours, 'час', 'часа', 'часов');

            const startFormatted = start.toLocaleDateString('ru-RU', options) + ", " + start.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const endFormatted = end.toLocaleDateString('ru-RU', options) + ", " + end.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });

            let duration = '';
            if (diffDays > 0) {
                if (diffDays === 1 && remainingHours === 0) {
                    duration = `24 часа`;
                } else {
                    duration += `${diffDays} ${getDayWord(diffDays)}`;
                    if (remainingHours > 0) {
                        duration += ` и ${remainingHours} ${getHourWord(remainingHours)}`;
                    }
                }
            } else {
                duration = `${diffHours} ${getHourWord(diffHours)}`;
            }

            let result = `Выбрано: ${duration} — с ${startFormatted} по ${endFormatted}`;

            return result;
        };

// Пример использования
        selectedInfo.innerHTML = format(selectStartCell, selectEndCell);

        if (selectStartCell && selectEndCell) {
            document.querySelectorAll('.time-slot.hover').forEach(cell => cell.classList.remove('hover'));
            document.querySelectorAll('.time-slot.disabled').forEach(cell => cell.classList.remove('disabled'));
            document.querySelectorAll('.time-slot.start').forEach(cell => cell.classList.remove('start'));
            const lastElem = cells[cells.length - 1];
            lastElem.style.setProperty('border-right-color', '#ede8dd');
            const submitBtn = document.getElementById('submitBtn');
            submitBtn.removeAttribute('disabled');
        }
    } else {
        clearSelection();
        handleCellClick(cell);
    }
}

function checkDateAndTime(cells, cell) {
    // Проверка на наличие бронированных ячеек
    if (cells.some(cell => cell.classList.contains('booked') || cell.classList.contains('notWorkingDay'))) {
        showTooltip(cell, 'Выбранный интервал недоступен для бронирования');
        return;
    }
}

function isMobile() {
    return window.innerWidth <= 640;
}

function handleCellMouseOver(cell) {
    if (selectStartCell && !selectEndCell) {
        document.querySelectorAll('.time-slot.hover').forEach(cell => cell.classList.remove('hover'));
        let start = selectStartCell;
        let end = cell;
        const isBack = new Date(selectStartCell.dataset.date).setHours(selectStartCell.dataset.time.split(':')[0], 0, 0) >
            new Date(cell.dataset.date).setHours(cell.dataset.time.split(':')[0], 0, 0)
        if (isBack) {
            start = cell;
            end = selectStartCell;
        }
        let cells = getCellsInRange(start, end);
        let foundBookedCell = false;

        if (isBack) {
            cells = cells.reverse()
        }
        cells.forEach(cell => {
            if (cell.classList.contains('booked') || cell.classList.contains('notWorkingDay') || cell.classList.contains('disabled') || cell.classList.contains('pastDate')) {
                foundBookedCell = true;
            }
            if (!foundBookedCell) {
                cell.classList.add('hover');
            }
        });
    }
}


function clearSelection() {
    selectStartCell = null;
    selectEndCell = null;
    document.querySelectorAll('.time-slot.disabled').forEach(cell => cell.classList.remove('disabled'));
    document.querySelector('.selected-info-' + (isMobile() ? 2 : 1)).innerHTML = '';
    document.querySelectorAll('.time-slot.selected').forEach(cell => cell.classList.remove('selected'));
    document.querySelectorAll('.time-slot.start').forEach(cell => cell.classList.remove('start'));
    document.querySelectorAll('.time-slot.hover').forEach(cell => cell.classList.remove('hover'));
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.setAttribute('disabled', true);
}

function getCellsInRange(startCell, endCell) {
    const startDate = new Date(startCell.dataset.date);
    const endDate = new Date(endCell.dataset.date);
    const startTime = startCell.dataset.time;
    const endTime = endCell.dataset.time;

    const cells = Array.from(document.querySelectorAll('.time-slot')).filter(cell => {
        const cellDate = new Date(cell.dataset.date);
        const cellTime = cell.dataset.time;

        if (cellDate > startDate && cellDate < endDate) {
            return true;
        } else if (cellDate.getTime() === startDate.getTime() && cellDate.getTime() === endDate.getTime()) {
            return cellTime >= startTime && cellTime <= endTime;
        } else if (cellDate.getTime() === startDate.getTime()) {
            return cellTime >= startTime;
        } else if (cellDate.getTime() === endDate.getTime()) {
            return cellTime <= endTime;
        }
        return false;
    });

    return cells;
}


// Функция для форматирования даты
function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Январь = 0
    return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month;
}

// Функция для получения 9-дневного интервала дат
function getDateInterval(startIntervalDate) {
    const dates = [];
    for (let i = 0; i < 9; i++) {
        let nextDate = new Date(startIntervalDate);
        nextDate.setDate(startIntervalDate.getDate() + i);
        dates.push(nextDate);
    }
    return dates;
}

// Обработчик для кнопки "Вверх"
const upBtn = document.getElementById('up-button');
upBtn.addEventListener('click', () => {
    startIntervalDate.setDate(startIntervalDate.getDate() - 3);
    const minDate = new Date().getDate();
    const minMonth = new Date().getMonth();
    if (startIntervalDate.getDate() < minDate || startIntervalDate.getMonth() < minMonth) {
        startIntervalDate = new Date();
    }
    if (!isFirstInterval) {
        tableRender();
        loader();
    }
    checkMinDate();
});

// Обработчик для кнопки "Вниз"
document.getElementById('down-button').addEventListener('click', () => {
    startIntervalDate.setDate(startIntervalDate.getDate() + 3);
    tableRender();
    loader();
});

function loader() {
    const modal = document.getElementById('booking-room-calendar-modal');
    const loader = modal.querySelector('.booking__loader');
    loader.classList.add('booking__loader--active');
    setTimeout(() => {
        loader.classList.remove('booking__loader--active');
    }, 500);
}

// Функция для проверки, находится ли время в интервале
function isInInterval(date, time, bookingDates) {
    const adjustedTime = adjustTimeByOneHour(time);
    const [hours, minutes] = adjustedTime.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    for (let i = 0; i < bookingDates.length; i++) {
        let start = new Date(bookingDates[i].start);
        let end = new Date(bookingDates[i].end);
        start.setHours(start.getHours(), 0, 0, 0);
        end.setHours(end.getHours() - 1, 0, 0, 0);
        if (date.getTime() >= start.getTime() && date.getTime() <= end.getTime()) {
            return true;
        }
    }
    return false;
}

// Функция для проверки, является ли время началом или концом интервала
function isEdgeInterval(date, time, bookingDates) {
    const adjustedTime = adjustTimeByOneHour(time);
    const [hours, minutes] = adjustedTime.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    for (let i = 0; i < bookingDates.length; i++) {
        const start = new Date(new Date(bookingDates[i].start).setMinutes(0, 0, 0)).getTime();
        const end = new Date(new Date(bookingDates[i].end).setMinutes(0, 0, 0)).getTime();

        const oneHourBeforeStart = start - 3600000;
        const oneHourAfterEnd = end;

        if (date.getTime() === oneHourBeforeStart || date.getTime() === oneHourAfterEnd) {
            return true;
        }
    }
    return false;
}

function checkMinDate() {
    const minDate = new Date().getDate();
    const minMonth = new Date().getMonth();
    isFirstInterval = startIntervalDate.getDate() <= minDate && startIntervalDate.getMonth() <= minMonth;
    upBtn.disabled = isFirstInterval;
}

function showTooltip(cell, message) {
    // Удаление старых тултипов
    const tooltips = document.getElementsByClassName('tooltip');
    for (let i = 0; i < tooltips.length; i++) {
        document.body.removeChild(tooltips[i]);
    }

    // Создание нового тултипа
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = message;
    document.body.appendChild(tooltip);

    const rect = cell.getBoundingClientRect();
    let left = rect.left + window.pageXOffset + 10;
    let top = rect.top + window.pageYOffset + 30;

    // Проверка, выходит ли тултип за пределы экрана
    const tooltipRect = tooltip.getBoundingClientRect();

    // Если тултип выходит за правый край экрана
    if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 10; // Смещаем влево
    }

    // Если тултип выходит за нижний край экрана
    if (top + tooltipRect.height > window.innerHeight) {
        top = rect.top + window.pageYOffset - tooltipRect.height - 10; // Смещаем вверх
    }

    // Применение скорректированных значений
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;

    // Удаление тултипа через 2 секунды
    setTimeout(() => {
        if (tooltip && tooltip.parentNode) {
            document.body.removeChild(tooltip);
        }
    }, 2000);
}


// Новая функция для установки класса disabled
function disableCellsBeyondFirstBooked(startCell) {
    const allCells = Array.from(document.querySelectorAll('.time-slot'));
    const startDate = new Date(startCell.dataset.date);
    const startTime = startCell.dataset.time;
    const startDateTime = new Date(startDate).setHours(startTime.split(':')[0], 0, 0);
    const index = allCells.indexOf(startCell);
    let foundBookedForward = false;
    let foundBookedBackward = false;

    // Forward iteration
    for (let i = index + 1; i < allCells.length; i++) {
        const cellDate = new Date(allCells[i].dataset.date);
        const cellTime = allCells[i].dataset.time;
        const cellDateTime = new Date(cellDate).setHours(cellTime.split(':')[0], 0, 0);
        if (cellDateTime >= startDateTime) {
            if (foundBookedForward || allCells[i].classList.contains('booked') || allCells[i].classList.contains('notWorkingDay')) {
                foundBookedForward = true;
                allCells[i].classList.add('disabled');
            } else {
                allCells[i].classList.remove('disabled');
            }
        }
    }

    // Backward iteration
    for (let i = index - 1; i >= 0; i--) {
        const cellDate = new Date(allCells[i].dataset.date);
        const cellTime = allCells[i].dataset.time;
        const cellDateTime = new Date(cellDate).setHours(cellTime.split(':')[0], 0, 0);
        if (cellDateTime <= startDateTime) {
            if (foundBookedBackward || allCells[i].classList.contains('booked') || allCells[i].classList.contains('notWorkingDay')) {
                foundBookedBackward = true;
                allCells[i].classList.add('disabled');
            } else {
                allCells[i].classList.remove('disabled');
            }
        }
    }
}

function modalListener() {
    const modalTrigger = document.querySelector('a[href="#booking-room-calendar-modal"]');
    const modal = document.getElementById('booking-room-calendar-modal');
    const submitBtn = document.getElementById('submitBtn');

    modalTrigger.addEventListener('click', function (event) {
        event.preventDefault();

        const loader = modal.querySelector('.booking__loader');
        loader.classList.add('booking__loader--active');
        setTimeout(() => {
            loader.classList.remove('booking__loader--active');
        }, 500);
    });

    // Optionally, add an event listener to close the modal
    const closeModalButtons = modal.querySelectorAll('.js-close-modal');
    closeModalButtons.forEach(closeModalButton => {
        closeModalButton.addEventListener('click', function () {
            modal.classList.remove('is-active');
            firstSelectedBookingDate = new Date();
            startIntervalDate = new Date();
            isFirstInterval = true;
            selectStartCell = null;
            selectEndCell = null;
            tableRender();
        });
    })

    submitBtn.addEventListener('click', function (event) {
        submitBtn.classList.add('loading-active');
        submitBtn.setAttribute('disabled', true);
    })
}

function adjustTimeByOneHour(time) {
    const [hours, minutes] = time.split(':').map(Number);
    let newHours = hours - 1;
    if (newHours < 0) {
        newHours = 23; // Wrap around to 23 if it's less than 0
    }
    return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function scrollToCurrentHours() {
    const pastDate = Array.from(document.querySelectorAll('.pastDate'));
    const table = document.querySelector('.calendar');
    const element = pastDate[pastDate.length - 1];
    if (isMobile()) {
        const tmp = element.getBoundingClientRect()
        table.scrollTo((tmp.width * pastDate.length) + 20, tmp.top);
    }
}

function getMinHours(date) {
    const day = new Date(date).getDay();
    const isWeekend = day === 0 || day === 6; // 0 - воскресенье, 6 - суббота
    const isHoliday = holidays.some(day => day === dayjs(date).format('YYYY-MM-DD'));
    return isWeekend || isHoliday ? 4 : 3;
}

function initCustomZoom() {
    const element = document.querySelector('.calendar-container');
    const zoomContainer = document.querySelector('.zoom-container');
    let scale = 1;
    let originalWidth = 0;
    let originalHeight = 0;
    let initialPinchDistance = 0; // Для отслеживания начального расстояния между пальцами
    let lastScale = scale; // Для отслеживания последнего состояния масштаба

    setTimeout(() => {
        originalWidth = JSON.parse(JSON.stringify(element.offsetWidth));
        originalHeight = JSON.parse(JSON.stringify(element.offsetHeight));
    }, 100);


    // Устанавливаем начальный зум
    element.style.transformOrigin = '0 0';
    element.style.transform = `scale(${scale})`;

    // // Обработчик для колесика мыши (масштабирование)
    // element.addEventListener('wheel', (e) => {
    //     e.preventDefault(); // Отключаем стандартное поведение скролла
    //     const zoomFactor = 0.1; // Размер шага при масштабировании
    //     const delta = e.deltaY < 0 ? zoomFactor : -zoomFactor; // Проверка направления колесика
    //     // Изменение масштаба в зависимости от направления прокрутки
    //     scale = Math.min(1, Math.max(0.5, scale + delta)); // Ограничиваем масштаб в диапазоне 0.5 - 1.5
    //     updateZoom();
    // });

    // Обработчики для тач-событий (пинч-зум)
    element.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialPinchDistance = getPinchDistance(e.touches);
            lastScale = scale; // Запоминаем текущее состояние масштаба
        }
    });

    element.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentPinchDistance = getPinchDistance(e.touches);
            const pinchScale = currentPinchDistance / initialPinchDistance; // Вычисляем изменение масштаба
            scale = Math.min(1, Math.max(0.5, lastScale * pinchScale)); // Ограничиваем масштаб
            updateZoom();
        }
    });

    // Функция для обновления масштаба
    function updateZoom() {
        element.style.width = `${originalWidth / scale}px`;
        element.style.transform = `scale(${scale})`;
        setTimeout(() => {
            const clientRect = element.getBoundingClientRect();
            zoomContainer.style.height = `${clientRect.height}px`;
        })
    }

    // Функция для вычисления расстояния между двумя точками касания
    function getPinchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initCustomZoom();
    tableRender();
    modalListener();
    scrollToCurrentHours();
});
