export default function handleModalScroll(modalSelector, headerSelector) {
    const modals = document.querySelectorAll(modalSelector); // Получаем все модальные окна
    const header = document.querySelector(headerSelector); // Получаем шапку

    if (!modals.length || !header) return; // Проверяем, что элементы существуют

    const headerHeight = header.offsetHeight; // Получаем высоту шапки

    modals.forEach(modal => {
        modal.addEventListener('scroll', function() {
            if (modal.scrollTop > headerHeight) {
                header.classList.add('fixed'); // Добавляем класс 'fixed' к шапке
            } else {
                header.classList.remove('fixed'); // Удаляем класс 'fixed' с шапки
            }
        });
    });
}
