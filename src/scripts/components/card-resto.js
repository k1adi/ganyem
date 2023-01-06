// Import resto-item
import './resto-item';

class cardResto extends HTMLElement{
  // Set resto data
  set resto(resto){
    this._resto = resto.restaurants;
    this.render();
  }

  render(){
    // Looping 6 resto data 
    this._resto.forEach((data, index) => {
      if(index < 6){
        // Create resto-item custom element 
        const restoItem = document.createElement('resto-item');
        // Added class to resto-item
        restoItem.setAttribute('class', 'card--resto');
        // Set resto-item data from data resto
        restoItem.data = data;
        // Append child resto-item
        this.appendChild(restoItem);
      }
    });
  }
}

customElements.define('card-resto', cardResto);