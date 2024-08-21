export default function customTriggerInit() {
    const customTrigger = document.querySelectorAll('.custom-trigger');

    document.addEventListener('click', function(event) {
        let isClickInsideBlock = false;

        for (let block of customTrigger) {
            if (block.contains(event.target)) {
                isClickInsideBlock = true;
                break;
            }
        }

        if (!isClickInsideBlock) {
            for (let block of customTrigger) {
                block.classList.remove('is-open');
            }
        }
    });

    for (let block of customTrigger) {
        block.addEventListener('click', function() {
            this.classList.toggle('is-open');
        });
    }
}