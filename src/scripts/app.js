import '../styles/main.scss';
import 'regenerator-runtime'; /* for async await transpile */

import './components/app-navbar';
import './components/app-banner';
import './components/card-resto';
import './components/app-footer';

import checkStorage from './function.js';

import resto from './data/restaurants.json';
// import review from './data/reviews.json';

document.addEventListener('DOMContentLoaded', () => {
  // Get element
  const body = document.querySelector('body');
  const restoWrapper = document.querySelector('card-resto');

  if(checkStorage()){
    if(localStorage.getItem('ganyem-theme') === null){
      localStorage.setItem('ganyem-theme', 'light');
    }

    body.setAttribute('class', localStorage.getItem('ganyem-theme'));
  }

  restoWrapper.resto = resto;
});