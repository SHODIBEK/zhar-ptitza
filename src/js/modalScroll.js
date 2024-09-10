export default function handleModalScroll(modalSelector, headerSelector) {
    const modals = document.querySelectorAll(modalSelector);
    const header = document.querySelector(headerSelector);
    if (!modals.length || !header) return;

    const headerHeight = header.offsetHeight;

    function toggleHeaderClass(modal) {
        if (modal.scrollTop > headerHeight) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }

    modals.forEach(modal => {
        modal.addEventListener('scroll', function() {
            toggleHeaderClass(modal);
        });

        toggleHeaderClass(modal);
    });
}
