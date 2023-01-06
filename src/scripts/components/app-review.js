import star from '../../images/star.svg';

class AppReview extends HTMLElement{
  set review(review){
    this._review = review.reviews;
    this.render();
  }

  render(){
    this.innerHTML = `
      <div class="swiper" id="swiper-review">
        <div class="swiper-wrapper"></div> 

        <!-- Navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    `;

    const swiperWrapper = this.querySelector('.swiper-wrapper');
    this._review.forEach(data => {
      swiperWrapper.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
          <div class="swiper--review">
            <div class="swiper--review__resto">
              <a href="#">${data.restaurant}</a>
              <small class="card--resto__rating">
                <img src="${star}" alt="Rating">
                ${data.rating}
              </small>
            </div>
            <p class="swiper--review__text">${data.review}</p>
            <div class="swiper--review__profile">
              <img src="${data.profilePicture}" alt="">
              <p>${data.name}</p>
            </div>
          </div>
        </div>
      `);
    });
  }
}

customElements.define('app-review', AppReview);