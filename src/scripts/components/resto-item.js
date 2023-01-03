import star from '../../images/star.svg';
import brokenImage from '../../images/broken-image.jpg';

class restoItem extends HTMLElement{
  set data(data){
    this._data = data;
    this.render();
  }

  render(){
    this.innerHTML = `
      <div class="card--resto__image">
        <img class="spinner" alt="">
        <span class="card--resto__label" aria-label="Location resto at">${this._data.city}</span>
      </div>
      <div class="card--resto__body">
        <small class="card--resto__rating">
          <img src="${star}" alt="Rating">
          ${this._data.rating}
        </small>
        <h3 class="card--resto__title">${this._data.name}</h3>
        <p class="text--muted">${this._data.description.substring(0, 120)}</p>
        <a href="#" class="card__link" aria-label="See Resto ${this._data.name}">See Resto</a>
      </div>
    `;

    const downloadImage = new Image();
    const cardImage = this.querySelector('.card--resto__image img');

    const updateImage = (imageSrc) => {
      cardImage.setAttribute('src', imageSrc);
      cardImage.removeAttribute('class');
    };

    downloadImage.onload = function() {
      updateImage(this.src);
    };

    downloadImage.onerror = function() {
      updateImage(brokenImage);
    };

    downloadImage.src = this._data.pictureId;
  }
}

customElements.define('resto-item', restoItem);