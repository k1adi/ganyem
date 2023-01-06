// Import image star icon
import star from '../../images/star.svg';

class AppReview extends HTMLElement{
  // Set data review
  set review(review){
    this._review = review.reviews;
    this.render();
  }

  render(){
    // Render swiper wrapper and swiper navigation
    this.innerHTML = `
      <div class="swiper" id="swiper-review">
        <div class="swiper-wrapper"></div> 

        <!-- Navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    `;
    // Select swiper wrapper
    const swiperWrapper = this.querySelector('.swiper-wrapper');
    // Loop data review for swiper-slides
    this._review.forEach(data => {
      swiperWrapper.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
          <div class="swiper--review">
            <div class="swiper--review__resto">
              <a href="#" aria-label="${data.restaurant} review">${data.restaurant}</a>
              <small class="card--resto__rating">
                <img src="${star}" alt="Rating">
                ${data.rating}
              </small>
            </div>
            <p class="swiper--review__text">${data.review}</p>
            <div class="swiper--review__profile">
              <img src="${data.profilePicture}" alt="Profile picture">
              <p>${data.name}</p>
            </div>
          </div>
        </div>
      `);
    });
  }
}

customElements.define('app-review', AppReview);