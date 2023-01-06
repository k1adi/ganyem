// Import main styling
import '../styles/main.scss';
/* for async await transpile */
import 'regenerator-runtime';

// Import custom element
import './components/app-navbar';
import './components/app-banner';
import './components/card-resto';
import './components/app-review';
import './components/app-footer';

// Import function checkStorage
import checkStorage from './function.js';
// Import swiper and module navigation
import Swiper, {Navigation, Autoplay, A11y} from 'swiper';
// Import swiper and modules style
import 'swiper/css';
import 'swiper/css/navigation';

// Import data.json resto & review
import resto from './data/restaurants.json';
import review from './data/reviews.json';

document.addEventListener('DOMContentLoaded', () => {
  // Select element
  const body = document.querySelector('body');
  const restoWrapper = document.querySelector('card-resto');
  const appReview = document.querySelector('app-review');

  // Set data to custom element
  restoWrapper.resto = resto;
  appReview.review = review;

  // Check if browser support localStorage and set theme
  if(checkStorage()){
    // Check if localStorage is null
    if(localStorage.getItem('ganyem-theme') === null){
      // Default theme is light
      localStorage.setItem('ganyem-theme', 'light');
    }
    // Set theme from localStorage
    body.setAttribute('class', localStorage.getItem('ganyem-theme'));
  }

  // Initialize swiper for review section
  const swiper = new Swiper('#swiper-review', {
    modules: [Navigation, Autoplay, A11y],
    runCallbacksOnInit:false,
    watchSlidesProgress: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      612:{
        slidesPerView: 2,
        spaceBetween: 15
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    a11y:{
      containerMessage: 'Customer Review Sliders',
      firstSlideMessage: 'This is the first review',
      lastSlideMessage: 'This is the last review',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      notificationClass: 'visual-hidden'
    },
    on:{
      // Add event 'init' to swiper for accesibility
      init: function(swiper) {
        // Select swiper-slide, swiper-slide-visible and focusable element on swiper
        const swiperSlides = swiper.el.querySelectorAll('.swiper-slide');
        const swiperSlideVisibles = swiper.el.querySelectorAll('.swiper-slide-visible');
        const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');
        // Set aria-hidden 'true' to swiper-slide 
        swiperSlides.forEach(slider => {
          slider.setAttribute('aria-hidden', true);
        });
        // Set aria-hidden 'false' to swiper-slide-visible
        swiperSlideVisibles.forEach(slider => {
          slider.setAttribute('aria-hidden', false);
        });
        // Loop focusable element
        focusablesElem.forEach(elem => {
          // Select parent
          const elemSlideWrapper = elem.parentNode.closest('.swiper-slide');
          // Check if parent is visible by class name
          const elemSlideWrapperIsVisible = elemSlideWrapper.classList.contains('swiper-slide-visible');
          // Set tabindex '-1' to all focusable elements on invisible slide parent
          if(!elemSlideWrapperIsVisible){
            elem.setAttribute('tabindex', '-1');
          }
        });
      },
    }
  });

  // Add event 'slideChange' to update accessibility to swiper
  swiper.on('slideChange', function(swiper){
    // Select element
    const swiperSlides = swiper.el.querySelectorAll('.swiper-slide');
    const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');
    // Set aria-hidden 'true' to all swiper-slide
    swiperSlides.forEach(slider => {
      slider.setAttribute('aria-hidden', true);
    });
    // Set tabindex '-1' to all focusable element
    focusablesElem.forEach(elem => {
      elem.setAttribute('tabindex', '-1');
    });
    // Add trigger function after slideChanges
    setTimeout(function() {  
      // Select element
      const swiperSlideVisibles = swiper.el.querySelectorAll('.swiper-slide-visible');
      const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');
      // Set aria-hidden 'false' to swiper-slide-visible
      swiperSlideVisibles.forEach(slider => {
        slider.setAttribute('aria-hidden', false);
      });
      // Loop focusable element
      focusablesElem.forEach(elem => {
        // Select parent 
        const elemSlideWrapper = elem.parentNode.closest('.swiper-slide');
        // Check if parent is visible by class name
        const elemSlideWrapperIsVisible = elemSlideWrapper.classList.contains('swiper-slide-visible');
        // Set tabindex '-1' to all focusable elements on invisible slide parent
        if(!elemSlideWrapperIsVisible){
          elem.setAttribute('tabindex', '-1');
        } else {
          // Remove tabindex if focusable element on visible slide parent
          elem.removeAttribute('tabindex');
        }
      });
    }, 0);
  });
});