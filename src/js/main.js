import './lazyload';
import detectTouch from './detectTouch';
import setScrollbarWidth from './setScrollbarWidth';
import masks from './masks';
import validation from './validation';
import anchorLinks from './anchorLinks';
import accordions from './accordions';
import modals from './modals';
import tabs from './tabs';
import menu from './menu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gallerySlider from './gallerySlider';
import intro from './intro';
import news from './news';
import apartments from './apartments';
import maps from './maps';
import header from './header';
import scrollToTop from './scrollToTop';
import menuImages from './menuImages';
import footerNav from './footerNav';
import parallaxImages from './parallaxImages';
import headingAnimation from './headingAnimation';
import apartmentsVideo from './apartmentsVideo';
import mobileContacts from './mobileContacts';
import rooms from './rooms';
import imagesLoaded from 'imagesloaded';
import clientHeight from './clientHeight';
import bathsSlider from './bathsSlider';
import restTogetherSlider from './restTogetherSlider';
import featuresSlider from './featuresSlider';
import bathRestSlider from './bathRestSlider';
import roomSlider from './roomSlider';
import spaSlider from './spaSlider';
import datepicker from './datepicker';
import timeDropdown from './timeDropdown';
import ticketsAmount from './ticketsAmount';
import bookingRoomModalSlider from './bookingRoomModalSlider';
import aboutSpaceSlider from './aboutSpaceSlider';
import aboutFoodSlider from './aboutFoodSlider';
import initTooltips from './initTooltips';
import initMyPromo from './initMyPromo';
import bookingRoomSlider from './bookingRoomSlider';
import roomsAmount from './roomsAmount';
import selectBookingRoom from './selectBookingRoom';
import promosSlider from './promosSlider';
import promoDetailSlider from './promoDetailSlider';
import newsletterSlider from './newsletterSlider';
import newsletter from './newsLetter';

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
    gallerySlider();
    intro();
    news();
    apartments();
    maps();
    header();
    scrollToTop();
    menuImages();
    parallaxImages();
    headingAnimation();
    apartmentsVideo();
    mobileContacts();
    rooms();
    bathsSlider();
    restTogetherSlider();
    featuresSlider();
    bathRestSlider();
    roomSlider();
    spaSlider();
    datepicker();
    timeDropdown();
    ticketsAmount();
    bookingRoomModalSlider();
    aboutSpaceSlider();
    aboutFoodSlider();
    initTooltips();
    initMyPromo();
    bookingRoomSlider();
    roomsAmount();
    selectBookingRoom();
    promosSlider();
    promoDetailSlider();
    newsletter();
});

newsletterSlider();

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
