import './lazyload'; // global
import detectTouch from './detectTouch'; // global
import setScrollbarWidth from './setScrollbarWidth'; // global
import masks from './masks'; // global
import validation from './validation'; // global
import anchorLinks from './anchorLinks'; // global
import accordions from './accordions'; // global
import modals from './modals'; // global
import tabs from './tabs'; // ?
import menu from './menu'; // global
import maps from './maps'; // global
import header from './header'; // global
import scrollToTop from './scrollToTop'; // global
import menuImages from './menuImages'; // global
import footerNav from './footerNav'; // global
import parallaxImages from './parallaxImages'; // global
import headingAnimation from './headingAnimation'; // global
import mobileContacts from './mobileContacts'; // global
import imagesLoaded from 'imagesloaded'; // global
import clientHeight from './clientHeight'; // global
import gallerySlider from './gallerySlider';
import initTooltips from './initTooltips'; // global
import newsletterSlider from './newsletterSlider'; // global
import newsletter from './newsLetter'; // global
import './tooltip'; // global

gsap.registerPlugin(ScrollTrigger);

window.triggerRefresh = () => {
    ScrollTrigger.refresh();
};

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function() {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    detectTouch();
    setScrollbarWidth();
    clientHeight();
    masks();
    validation();
    anchorLinks();
    footerNav();
    accordions();
    modals();
    tabs();
    menu();
    maps();
    header();
    scrollToTop();
    menuImages();
    parallaxImages();
    headingAnimation();
    mobileContacts();
    gallerySlider();
    initTooltips();
    newsletter();

    setTimeout(() => {
        newsletterSlider();
    }, 100);
});

let imgLoad = imagesLoaded(document.querySelector('.page-content'));
function onAlways() {
    ScrollTrigger.refresh();
}

imgLoad.on('always', onAlways);

document.addEventListener('lazyloaded', () => {
    ScrollTrigger.refresh();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    ScrollTrigger.refresh();
    setTimeout(() => document.body.classList.add('animatable'), 300);
});
