import './resto-item';

class cardResto extends HTMLElement{
  set resto(resto){
    this._resto = resto.restaurants;
    this.render();
  }

  render(){
    this._resto.forEach((data, index) => {
      if(index < 6){
        const restoItem = document.createElement('resto-item');
        restoItem.setAttribute('class', 'card--resto');
        restoItem.data = data;
        this.appendChild(restoItem);
      }
    });
  }
}

customElements.define('card-resto', cardResto);