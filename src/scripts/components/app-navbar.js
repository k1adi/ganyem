import navLogo from '../../images/ganyem-logo.png';
import iconTheme from '../../images/circle-half.svg';

class AppNavbar extends HTMLElement{
  connectedCallback(){
    this.render();
  }

  render(){
    // Get screen width
    const widthScreen = window.screen.width;

    // Create nav-item array
    const navItem = [
      { 'text': 'Home', 'url': '/' },
      { 'text': 'Favorite', 'url': '#' },
      { 'text': 'About Us', 'url': 'https://codepen.io/k1adi' }
    ];

    // Loop nav-item
    const listItem = navItem.map(item => { 
      return ` <li class="nav__list__item"><a href="${item.url}">${item.text}</a></li> `;
    }).join('');

    /**
     * Render navigation element with mobile-first
     * Show toggle switch theme
     * Show nav-logo, nav-toggle and nav-list-wrapper witthout child
     */
    this.innerHTML = `
      <button class="toggle-theme" aria-pressed="false">
        <img class="toggle-theme__icon" src="${iconTheme}" alt="Theme">
        <span class="toggle-theme__text">Toggle High Contrast</span>
      </button>
      <nav class="nav">
        <a href="/" class="nav__logo">
          <img src="${navLogo}" class="nav__logo--mobile" alt="Ganyem">
        </a>

        <button class="nav__toggle" aria-expanded="false" aria-haspopup="true" aria-describedby="Open Navigation" aria-controls="navList">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span class="visual-hidden" id="toggleLabel">Show Navigation</span>
        </button>

        <ul class="nav__list" id="navList">
          ${widthScreen > 768 ? listItem : ''}
        </ul>
      </nav>
    `;

    // Select global element
    const body = document.querySelector('body');
    const navList = this.querySelector('.nav__list');
    const navToggle = this.querySelector('.nav__toggle');
    const toggleLabel = this.querySelector('#toggleLabel');
    const toggleTheme = this.querySelector('.toggle-theme');

    // Show mobile navigation
    const showNavigation = () => {
      // Clean nav-list from nav-item first
      removeNavItem();
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', true);
      toggleLabel.innerText = 'Close Navigation';
      navList.classList.add('active');
      // Show nav-item 
      showNavItem();
    };

    // Close mobile navigation
    const closeNavigation = () => {
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', false);
      toggleLabel.innerText = 'Show Navigation';
      navList.classList.remove('active');
      removeNavItem();
    };

    // Insert list-item node to nav-list DOM
    const showNavItem = () => {
      navList.insertAdjacentHTML('afterbegin', listItem);
    };

    // Remove list-item child from nav-list DOM
    const removeNavItem = () => {
      while(navList.firstChild){
        navList.removeChild(navList.firstChild);
      }
    };

    // Active trap focus
    const activeTrap = () => {
      // Select all focusable element, first focusable element and last focusable element
      const focusableElem = navList.querySelectorAll('[href]:not([disabled])');
      const firstFocusableElem = navToggle;
      const lastFocusableElem = focusableElem[focusableElem.length - 1];

      document.addEventListener('keydown', (e) => {
        // Set tabkey
        const tabKey = e.key === 'Tab';
        // If key pressed not 'Tab' key
        if(!tabKey){
          return;
        }
        // Function to guide next focus
        const checkActiveElement = (elementActivated, nextElement) => {
          if(document.activeElement === elementActivated){
            nextElement.focus();
            e.preventDefault();
          }
        };
        // If key pressed together with 'Shift' key
        if(e.shiftKey){
          checkActiveElement(firstFocusableElem, lastFocusableElem);
        } else {
          checkActiveElement(lastFocusableElem, firstFocusableElem);
        }
      });
    };

    // Add resize event listener to window
    window.addEventListener('resize', () => {
      // When window screen is bigger than 768px
      if(window.screen.width > 768){
        // Check if nav-list haven't child
        if(!navList.hasChildNodes()){
          showNavItem();
        }
      } else {
        // Close navigation when windows was resized
        closeNavigation();
      } 
    });

    // Add 'click' event listener to toggle-theme
    toggleTheme.addEventListener('click', function(){
      const bodyTheme = body.getAttribute('class');
      // Check current theme from body, then update attribute and save to localStorage
      if(bodyTheme === 'light'){
        body.setAttribute('class', 'dark');
        this.setAttribute('aria-pressed', true);
        localStorage.setItem('ganyem-theme', 'dark');
      } else {
        body.setAttribute('class', 'light');
        this.setAttribute('aria-pressed', false);
        localStorage.setItem('ganyem-theme', 'light');
      }
    });

    // Add 'click' event listener to nav-toggle
    navToggle.addEventListener('click', function() {
      const isActive = this.classList.contains('active');
      // Check if toggle is active
      if(isActive){
        closeNavigation();
      } else {
        showNavigation();
        activeTrap();
      }
    });
  }
}

customElements.define('app-navbar', AppNavbar);
