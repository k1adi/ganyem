// Import star-icon and broken-image
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
        <span class="card--resto__label" aria-label="Location resto at ${this._data.city}">${this._data.city}</span>
      </div>
      <div class="card--resto__body">
        <small class="card--resto__rating">
          <img src="${star}" alt="Rating">
          ${this._data.rating}
        </small>
        <h3 class="card--resto__title">${this._data.name}</h3>
        <p class="card--resto__desc">${this._data.description.substring(0, 120)}</p>
        <div class="card__link">
          <a href="#" aria-label="See ${this._data.name} Resto">See Resto</a>
        </div>
      </div>
    `;
    // Set Image() constructor and select element resto-img
    const downloadImage = new Image();
    const cardImage = this.querySelector('.card--resto__image img');
    // Update image-src
    const updateImage = (imageSrc) => {
      cardImage.setAttribute('src', imageSrc);
      cardImage.removeAttribute('class');
    };
    // If image-src successfully loaded
    downloadImage.onload = function() {
      updateImage(this.src);
    };
    // If image-src faile loaded
    downloadImage.onerror = function() {
      updateImage(brokenImage);
    };
    // Set image.src properties
    downloadImage.src = this._data.pictureId;
  }
}

customElements.define('resto-item', restoItem);