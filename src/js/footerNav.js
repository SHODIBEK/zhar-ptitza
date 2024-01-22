import { IS_MOBILE } from './utils';

export default function footerNav() {
    if (!IS_MOBILE) return;
    const navItems = Array.from(document.querySelectorAll('.page-footer__nav > ul > li'));

    navItems.forEach(item => {
        const btn = item.firstElementChild;
        const list = btn.nextElementSibling;

        item.classList.add('js-accordion');
        btn.classList.add('js-accordion-btn');
        list?.classList.add('js-accordion-content');
    });

    const footerContactsWrapper = document.querySelector('.page-footer__contacts-wrapper');
    const footerContactsTitle = document.querySelector('.page-footer__contacts-title');
    const footerContactsContent = document.querySelector('.page-footer__contacts-content');

    if (footerContactsWrapper && footerContactsTitle && footerContactsContent) {
        footerContactsWrapper.classList.add('js-accordion');
        footerContactsTitle.classList.add('js-accordion-btn');
        footerContactsContent.classList.add('js-accordion-content');
    }
}
