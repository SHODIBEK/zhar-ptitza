export default function timeDropdown() {
    const elements = Array.from(document.querySelectorAll('.js-time-dropdown'));

    elements.forEach(element => {
        const input = element.querySelector('.booking__common-search-input');
        const checkboxes = Array.from(element.querySelectorAll('.booking__common-search-dropdown-checkbox-input'));

        const dropdown = element.querySelector('.booking__common-search-dropdown');


        const setActiveRadio = () => {
            const checkedRadio = checkboxes.find(radio => radio.checked);
            if (!checkedRadio) return;
            input.value = checkedRadio.value;
        }


        setActiveRadio();


        input.addEventListener('focus', event => {
            dropdown.classList.add('active');
        })
        input.addEventListener('blur', event => {
            dropdown.classList.remove('active');
        })

        document.addEventListener('click', event => {
            if (event.target.matches('.booking__common-search-dropdown') || event.target.closest('.booking__common-search-dropdown')) return;
            if (event.target.matches('.booking__common-search-input') || event.target.closest('.booking__common-search-input')) return;

            dropdown.classList.remove('active');
        })


        checkboxes.forEach(box => {
            box.addEventListener('change', () => {
                setActiveRadio();
            })
        })
    });
}
