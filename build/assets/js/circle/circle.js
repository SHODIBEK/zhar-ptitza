const circleTitle = $('.js-circle-date');
const circleDate = circleTitle.data('date');
const circleDateText = $('.js-circle-title');

// Задаем дату, до которой нужно считать
const endDate = dayjs(circleDate);

// Вычисляем разницу в днях между текущей датой и заданной датой
const diffDays = endDate.diff(dayjs(), 'day');

// Функция для выбора правильной формы слова "день"
function pluralizeDays(number) {
    if (number === 1) {
        return 'день';
    } else if (number >= 2 && number <= 4) {
        return 'дня';
    } else {
        return 'дней';
    }
}

circleTitle.text(diffDays);
circleDateText.text(pluralizeDays(diffDays));
