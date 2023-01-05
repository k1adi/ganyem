class AppFooter extends HTMLElement{
  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
      <p>Made with <span class="visual-hidden">love</span>❤️ by Rizki Adi</p>
      <small>Submission Dicoding <a href="https://www.dicoding.com/academies/219/tutorials/9301" class="footer__link"> Katalog Restoran </a> </small>
    `;
  }
}

customElements.define('app-footer', AppFooter);