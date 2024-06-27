let firstSelectedBookingDate = new Date();
let startIntervalDate = new Date();
let bookingDates = [
    {
        start: '2024-06-28T15:00:00',
        end: '2024-06-29T14:00:00'
    },
    {
        start: '2024-06-30T10:00:00',
        end: '2024-06-30T14:00:00'
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
        "                                <td class=\"time-slot {{#if (isInInterval ../this this @root.bookingDates)}}booked{{else if (isEdgeInterval ../this this @root.bookingDates)}}empty{{/if}}\" data-date=\"{{../this}}\" data-time=\"{{this}}\"></td>\n" +
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
        return `${tmp[0]}<sup>:${tmp[1]}</sup>`;
    });

    Handlebars.registerHelper('isActiveDate', function (date) {
        const dateToCheck = new Date(date).setHours(0, 0, 0, 0); // Убираем время для точного сравнения только даты
        const selectedDate = new Date(firstSelectedBookingDate).setHours(0, 0, 0, 0);
        return dateToCheck === selectedDate ? 'active' : '';
    });

    const template = Handlebars.compile(source);
    const context = {
        times: [
            "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
            "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
            "22:00", "23:00"
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
    const cells = document.querySelectorAll('.time-slot:not(.booked)');
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
        cell.addEventListener('mouseover', () => handleCellMouseOver(cell));
    });
}

function handleCellClick(cell) {
    if (!selectStartCell) {
        selectStartCell = cell;
        cell.classList.add('selected');
    } else if (!selectEndCell) {
        if (new Date(selectStartCell.dataset.date).setHours(selectStartCell.dataset.time.split(':')[0], 0, 0) >
            new Date(cell.dataset.date).setHours(cell.dataset.time.split(':')[0], 0, 0)) {
            selectStartCell.classList.remove('selected');
            selectStartCell.classList.remove('hover');
            selectEndCell = selectStartCell;
            selectStartCell = cell;
            selectStartCell.classList.add('selected');
        } else {
            selectEndCell = cell;
        }
        const cells = getCellsInRange(selectStartCell, selectEndCell);
        if (cells.length < minHours) {
            selectEndCell = null;
            showTooltip(cell, `Миним. ${minHours}ч.`);
            return;
        }
        const selectedInfo = document.querySelector('.selected-info');
        const format = function (startDate, endDate) {
            const options = {day: '2-digit', month: 'long'};
            const start = new Date(startDate.dataset.date);
            const end = new Date(endDate.dataset.date);
            start.setHours(+startDate.dataset.time.split(':')[0], 0, 0, 0);
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
        if (cells.some(cell => cell.classList.contains('booked'))) {
            showTooltip(cell, `Выбранный диапазон содержит занятые ячейки. Выбор сброшен.`);
            clearSelection();
        } else {
            cells.forEach(cell => cell.classList.add('selected'));
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
        if (new Date(selectStartCell.dataset.date).setHours(selectStartCell.dataset.time.split(':')[0], 0, 0) >
            new Date(cell.dataset.date).setHours(cell.dataset.time.split(':')[0], 0, 0)) {
            start = cell;
            end = selectStartCell;
        }
        const cells = getCellsInRange(start, end);
        let foundBookedCell = false;

        cells.forEach(cell => {
            if (cell.classList.contains('booked')) {
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
    startIntervalDate.setDate(startIntervalDate.getDate() - 9);
    const minDate = new Date().getDate();
    const minMonth = new Date().getMonth();
    if (startIntervalDate.getDate() < minDate && startIntervalDate.getMonth() <= minMonth) {
        startIntervalDate = new Date();
    }
    if (!isFirstInterval) {
        tableRender();
    }
});

// Обработчик для кнопки "Вниз"
document.getElementById('down-button').addEventListener('click', () => {
    startIntervalDate.setDate(startIntervalDate.getDate() + 9);
    tableRender();
});

// Функция для проверки, находится ли время в интервале
function isInInterval(date, time, bookingDates) {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    for (let i = 0; i < bookingDates.length; i++) {
        const start = new Date(bookingDates[i].start);
        const end = new Date(bookingDates[i].end);
        if (date >= start && date <= end) {
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
        if (date.getTime() === start.setHours(start.getHours() - 1, start.getMinutes(), 0, 0) ||
            date.getTime() === end.setHours(end.getHours() + 1, end.getMinutes(), 0, 0)) {
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
