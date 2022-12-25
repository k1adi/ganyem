import navLogo from '../../images/ganyem-logo.png';

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
     * Show nav-logo, nav-toggle and nav-list-wrapper witthout child
     */
    this.innerHTML = `
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
    const navList = this.querySelector('.nav__list');
    const navToggle = this.querySelector('.nav__toggle');
    const toggleLabel = this.querySelector('#toggleLabel');

    // Show mobile navigation
    const showNavigation = () => {
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', true);
      toggleLabel.innerText = 'Close Navigation';
      navList.classList.add('active');
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
      const focusableElem = navList.querySelectorAll('[href]:not([disabled])');
      const firstFocusableElem = navToggle;
      const lastFocusableElem = focusableElem[focusableElem.length - 1];

      document.addEventListener('keydown', (e) => {
        const tabKey = e.key === 'Tab';

        if(!tabKey){
          return;
        }

        const checkActiveElement = (elementActivated, nextElement) => {
          if(document.activeElement === elementActivated){
            nextElement.focus();
            e.preventDefault();
          }
        };

        if(e.shiftKey){
          checkActiveElement(firstFocusableElem, lastFocusableElem);
        } else {
          checkActiveElement(lastFocusableElem, firstFocusableElem);
        }
      });
    };

    // Add 'click' event listener to nav-toggle
    navToggle.addEventListener('click', function() {
      const isActive = this.classList.contains('active');

      // Check toggle active
      if(!isActive){
        showNavigation();
        activeTrap();
      } else {
        closeNavigation();
      }
    });

    // Add resize event listener to window
    window.addEventListener('resize', () => {
      // When window screen is bigger than 768px
      if(window.screen.width > 768){
        // Check if nav-list has child
        if(!navList.hasChildNodes()){
          showNavItem();
        }
      } else {
        closeNavigation();
      } 
    });
  }
}

customElements.define('app-navbar', AppNavbar);
