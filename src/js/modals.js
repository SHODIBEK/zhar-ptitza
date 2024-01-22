export default function modals() {
    window.activeModal = null;

    function openModal(id, event) {
        const modal = document.querySelector(`.js-modal${id}`);
        if (!modal) {
            // console.error(`Modal with ID: ${id} not found`);
            return;
        }

        if (typeof window.closeMenu === 'function') {
            window.closeMenu();
        }

        if (event) {
            event.preventDefault();
        }

        const openHandler = () => {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            window.activeModal = modal;

            requestAnimationFrame(() => {
                document.querySelector('.page-header')?.offsetWidth;
            });

            const openModalEvent = new CustomEvent('openmodal');
            document.dispatchEvent(openModalEvent);
        };
        if (window.activeModal) {
            closeModal(window.activeModal);

            setTimeout(() => {
                openHandler();
            }, 400);
        } else {
            openHandler();
        }
    }

    function closeModal(modal) {
        document.body.classList.remove('modal-open');

        modal.classList.remove('active');

        window.activeModal = null;

        const closeModalEvent = new CustomEvent('closemodal');
        document.dispatchEvent(closeModalEvent);

        requestAnimationFrame(() => {
            document.querySelector('.page-header')?.offsetWidth;
        });
    }

    window.openModal = openModal;

    window.closeModal = closeModal;

    document.addEventListener('click', event => {
        if (event.target.matches('a:not(.js-close-modal)') || event.target.closest('a:not(.js-close-modal)')) {
            const link = event.target.matches('a') ? event.target : event.target.closest('a');
            const hash = link.hash;
            if (!hash) return;
            openModal(hash, event);
        } else if (event.target.matches('.js-close-modal') || event.target.closest('.js-close-modal')) {
            event.preventDefault();
            const modalToClose = event.target.closest('.js-modal');
            closeModal(modalToClose);
        } else if (event.target.matches('.js-modal')) {
            event.preventDefault();
            const modalToClose = event.target;
            closeModal(modalToClose);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.which === 27 && window.activeModal) {
            closeModal(window.activeModal);
        }
    });
}
