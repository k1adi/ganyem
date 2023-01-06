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
  // Get element
  const body = document.querySelector('body');
  const restoWrapper = document.querySelector('card-resto');
  const appReview = document.querySelector('app-review');

  restoWrapper.resto = resto;
  appReview.review = review;

  if(checkStorage()){
    if(localStorage.getItem('ganyem-theme') === null){
      localStorage.setItem('ganyem-theme', 'light');
    }

    body.setAttribute('class', localStorage.getItem('ganyem-theme'));
  }

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
    },
    on:{
      init: function(swiper) {
        const swiperSlides = swiper.el.querySelectorAll('.swiper-slide');
        const swiperSlideVisibles = swiper.el.querySelectorAll('.swiper-slide-visible');
        const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');
    
        swiperSlides.forEach(slider => {
          slider.setAttribute('aria-hidden', true);
        });
    
        swiperSlideVisibles.forEach(slider => {
          slider.setAttribute('aria-hidden', false);
        });
    
        focusablesElem.forEach(elem => {
          const elemSlideWrapper = elem.parentNode.closest('.swiper-slide');
          const elemSlideWrapperIsVisible = elemSlideWrapper.classList.contains('swiper-slide-visible');

          if(!elemSlideWrapperIsVisible){
            elem.setAttribute('tabindex', '-1');
          }
        });
      }
    }
  });

  swiper.on('slideChange', function(swiper){
    const swiperNotif = swiper.el.querySelector('.swiper-notifcation');
    const swiperSlides = swiper.el.querySelectorAll('.swiper-slide');
    const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');
    
    swiperSlides.forEach(slider => {
      slider.setAttribute('aria-hidden', true);
    });

    focusablesElem.forEach(elem => {
      elem.setAttribute('tabindex', '-1');
    });

    setTimeout(function() {  
      const swiperSlideVisibles = swiper.el.querySelectorAll('.swiper-slide-visible');
      const focusablesElem = swiper.el.querySelectorAll('a[href]:not([disabled])');

      swiperSlideVisibles.forEach(slider => {
        slider.setAttribute('aria-hidden', false);
      });

      focusablesElem.forEach(elem => {
        const elemSlideWrapper = elem.parentNode.closest('.swiper-slide');
        const elemSlideWrapperIsVisible = elemSlideWrapper.classList.contains('swiper-slide-visible');

        if(!elemSlideWrapperIsVisible){
          elem.setAttribute('tabindex', '-1');
        } else {
          elem.removeAttribute('tabindex');
        }
      });     
    }, 0);

    swiperNotif.classList.add('visual-hidden');
  });
});