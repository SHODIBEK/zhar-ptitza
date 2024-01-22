import 'bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.ru';

export default function datepicker() {
    const elements = Array.from(document.querySelectorAll('.js-datepicker'));

    elements.forEach(element => {
        $(element)
            .datepicker({
                startDate: '+1d',
                format: 'dd.mm.yyyy',
                container: element.hasAttribute('data-picker-container') ? element.getAttribute('data-picker-container') : '#picker-container',
                language: 'ru',
                autoclose: true,
                templates: {
                    leftArrow: `
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.61057 7.54618C9.52768 5.63061 10.7477 2.96042 10.7477 0H11.3867C11.3867 1.27704 11.1543 2.55409 10.7477 3.71504C9.58578 7.02375 7.02963 9.57784 3.71825 10.6807H29.1055V11.3193H3.77635C7.02963 12.4802 9.58578 15.0343 10.6896 18.285C11.0962 19.4459 11.3286 20.6649 11.3286 22H10.6896C10.6896 19.0396 9.46959 16.3694 7.55248 14.4538C5.69346 12.5963 3.13731 11.4354 0.348783 11.3773H0.00021553V10.7388C3.02112 10.6227 5.63536 9.46174 7.61057 7.54618Z"
                                fill="#968A71" />
                        </svg>
                    `,
                    rightArrow: `
                        <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M21.4949 7.54618C19.5778 5.63061 18.3578 2.96042 18.3578 0H17.7188C17.7188 1.27704 17.9511 2.55409 18.3578 3.71504C19.5197 7.02375 22.0758 9.57784 25.3872 10.6807H0V11.3193H25.3291C22.0758 12.4802 19.5197 15.0343 18.4159 18.285C18.0092 19.4459 17.7769 20.6649 17.7769 22H18.4159C18.4159 19.0396 19.6359 16.3694 21.553 14.4538C23.412 12.5963 25.9682 11.4354 28.7567 11.3773H29.1053V10.7388C26.0843 10.6227 23.4701 9.46174 21.4949 7.54618Z"
                                fill="#968A71" />
                        </svg>
                    `
                }
            })
            .on('show', function(e) {
                element.classList.add('datepicker-shown');
            })
            .on('hide', function(e) {
                element.classList.remove('datepicker-shown');
            })
            .on('changeDate', function(e) {
                $(element).trigger('blur');
            });
    });
}
