export default function selectBookingRoom() {
    const radios = Array.from(document.querySelectorAll('.booking__room-slider-card-checkbox-input'));
    function setActiveCard() {
        radios.forEach(radio => {
            const card = radio.closest('.booking__room-slider-card');
            if (radio.checked) {
                card?.classList.add('selected');
            } else {
                card?.classList.remove('selected');
            }
        })
    }

    setActiveCard();

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            setActiveCard();
        })
    })
}