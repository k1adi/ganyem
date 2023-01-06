class AppBanner extends HTMLElement{
  connectedCallback(){
    // Get data-* atttribute
    this.bannerTitle = this.getAttribute('data-title');
    this.ctaStatus = this.getAttribute('data-cta');
    this.ctaText = this.getAttribute('data-cta-text');

    this.render();
  }

  render(){
    // Render banner
    this.innerHTML=`
      <div class="wrapper--wrap">
        <h1 class="banner__title">${this.bannerTitle}</h1>
        ${this.ctaStatus ? `
          <a class="banner__button" href="#resto">${this.ctaText}</a>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('app-banner', AppBanner);