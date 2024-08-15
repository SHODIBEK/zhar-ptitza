let firstSelectedBookingDate = new Date();
let startIntervalDate = new Date();
let bookingDates = [
    {
        start: new Date(new Date(new Date().setHours(15)).setDate(new Date().getDate() + 1)).toISOString(),
        end: new Date(new Date(new Date().setHours(13)).setDate(new Date().getDate() + 2)).toISOString()
    },
    {
        start: new Date(new Date(new Date().setHours(11)).setDate(new Date().getDate() + 3)).toISOString(),
        end: new Date((new Date(new Date().setHours(16)).setDate(new Date().getDate() + 3))).toISOString()
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
        "                                    <div>{{formatDate this}}</div>\n" +
        "                                </td>\n" +
        "                            {{#each ../times}}\n" +
        "                                <td class=\"time-slot {{#if (isPastDateTime ../this this)}}pastDate{{else if (isInInterval ../this this @root.bookingDates)}}booked{{else if (isEdgeInterval ../this this @root.bookingDates)}}empty{{/if}}\" data-date=\"{{../this}}\" data-time=\"{{this}}\"></td>\n" +
        "                            {{/each}}\n" +
        "                            </tr>\n" +
        "                        {{/each}}\n" +
        "                    </tbody>";

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

    Handlebars.registerHelper('isPastDateTime', function (date, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const cellDateTime = new Date(date);
        cellDateTime.setHours(hours, minutes, 0, 0);
        return cellDateTime < new Date();
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
}

function addCellClickHandlers() {
    const cells = document.querySelectorAll('.time-slot');
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
        cell.addEventListener('mouseover', () => handleCellMouseOver(cell));
    });
}

function handleCellClick(cell) {
    if (['empty', 'pastDate', 'booked', 'disabled'].some(key => cell.classList.contains(key))) {
        return;
    }
    if (!selectStartCell) {
        selectStartCell = cell;
        cell.classList.add('selected');
        disableCellsBeyondFirstBooked(selectStartCell);
    } else if (!selectEndCell) {
        if (cell.classList.contains('disabled')) {
            showTooltip(cell, `Выбранный диапазон содержит занятые ячейки. Выбор сброшен.`);
            return;
        }
        const start = new Date(selectStartCell.dataset.date).setHours(selectStartCell.dataset.time.split(':')[0], 0, 0);
        const end = new Date(cell.dataset.date).setHours(cell.dataset.time.split(':')[0], 0, 0);
        if (start > end) {
            const cells = getCellsInRange(cell, selectStartCell);
            if (cells.length < minHours) {
                selectEndCell = null;
                showTooltip(cell, `Миним. ${minHours}ч.`);
                return;
            }
            selectEndCell = selectStartCell;
            selectStartCell = cell;
        } else {
            selectEndCell = cell;
        }
        const cells = getCellsInRange(selectStartCell, selectEndCell);
        if (cells.length < minHours) {
            selectEndCell = null;
            showTooltip(cell, `Миним. ${minHours}ч.`);
            return;
        }
        if (!cells.some(cell => cell.classList.contains('booked'))) {
            cells.forEach(cell => cell.classList.add('selected'));
        }
        const selectedInfo = document.querySelector('.selected-info');
        const format = function (startDate, endDate) {
            const options = {day: '2-digit', month: 'long'};
            const start = new Date(startDate.dataset.date);
            const end = new Date(endDate.dataset.date);
            start.setHours(+startDate.dataset.time.split(':')[0] - 1, 0, 0, 0);
            end.setHours(+endDate.dataset.time.split(':')[0], 0, 0, 0);

            const startFormatted = start.toLocaleDateString('ru-RU', options) + ", " + start.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const endFormatted = end.toLocaleDateString('ru-RU', options) + ", " + end.toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            });

            return `с ${startFormatted} по ${endFormatted}`;
        };
        selectedInfo.innerHTML = `Выбрано: ${cells.length} ч — ${format(selectStartCell, selectEndCell)}`;

        if (selectStartCell && selectEndCell) {
            document.querySelectorAll('.time-slot.disabled').forEach(cell => cell.classList.remove('disabled'));
        }
    } else {
        clearSelection();
        handleCellClick(cell);
    }
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
            if (cell.classList.contains('booked') || cell.classList.contains('disabled')) {
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
    document.querySelector('.selected-info').innerHTML = '';
    document.querySelectorAll('.time-slot.selected').forEach(cell => cell.classList.remove('selected'));
    document.querySelectorAll('.time-slot.hover').forEach(cell => cell.classList.remove('hover'));
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

document.addEventListener('DOMContentLoaded', () => {
    tableRender();
});

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
    let [hours, minutes] = time.split(':').map(Number);
    if (time === '00:00') {
        // hours = hours - 1
        // minutes = 59;
        debugger;
    }
    date.setHours(hours, minutes, 0, 0);

    for (let i = 0; i < bookingDates.length; i++) {
        let start = new Date(bookingDates[i].start)
        let end = new Date(bookingDates[i].end)
        start = start.setHours(start.getUTCHours(), 0, 0, 0);
        end = end.setHours(end.getUTCHours(), 0, 0, 0);
        if (date.getTime() >= start && date.getTime() <= end) {
            return true;
        }
    }
    return false;
}

// Функция для проверки, является ли время началом или концом интервала
function isEdgeInterval(date, time, bookingDates) {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    for (let i = 0; i < bookingDates.length; i++) {
        const start = new Date(bookingDates[i].start);
        const end = new Date(bookingDates[i].end);

        // Calculate the exact times for the conditions
        const oneHourBeforeStart = new Date(start);
        oneHourBeforeStart.setHours(oneHourBeforeStart.getUTCHours() - 1, 0, 0, 0);

        const oneHourAfterEnd = new Date(end);
        oneHourAfterEnd.setHours(oneHourAfterEnd.getUTCHours() + 1, 0, 0, 0);

        if (date.getTime() === oneHourBeforeStart.getTime() || date.getTime() === oneHourAfterEnd.getTime()) {
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
    const tooltips = document.getElementsByClassName('tooltip');
    for (let i = 0; i < tooltips.length; i++) {
        document.body.removeChild(tooltips[i]);
    }
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = message;
    document.body.appendChild(tooltip);
    const rect = cell.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.pageXOffset + 10}px`;
    tooltip.style.top = `${rect.top + window.pageYOffset + 30}px`;

    setTimeout(() => {
        document.body.removeChild(tooltip);
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
            if (foundBookedForward || allCells[i].classList.contains('booked')) {
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
            if (foundBookedBackward || allCells[i].classList.contains('booked')) {
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

    modalTrigger.addEventListener('click', function(event) {
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
        closeModalButton.addEventListener('click', function() {
            modal.classList.remove('is-active');
            firstSelectedBookingDate = new Date();
            startIntervalDate = new Date();
            isFirstInterval = true;
            selectStartCell = null;
            selectEndCell = null;
            tableRender();
        });
    })
}
document.addEventListener('DOMContentLoaded', function () {
    modalListener();
});
