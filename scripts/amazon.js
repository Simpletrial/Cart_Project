import { products } from "../data/products.js";
import { addToCart, cart,totalCartQuantity } from "../data/cart.js";


let productHtml = '';
products.forEach((productItem) => {
  productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${productItem.image}">
          </div>
          <div class="product-name limit-text-to-2-lines">
            ${productItem.name}
          </div>
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${productItem.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${productItem.rating.count}
            </div>
          </div>
          <div class="product-price">
          &#8377;${productItem.price}
          </div>
          <div class="product-quantity-container">
            <select class="quantity-selector-${productItem.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${productItem.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${productItem.id}">
            Add to Cart
            </button>
            </div>
            `
})

document.querySelector('.products-grid').innerHTML = productHtml;
document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId;

    let added=document.querySelector(`.js-added-to-cart-${productId}`);
    added.classList.add('added')

    let timer
    setTimeout(() => {
      if(timer){
        clearTimeout(timer)
      }
       timer=setTimeout(()=>{
        added.classList.remove('added')
      },1500)
    });
    

    addToCart(productId)   

    console.log(cart);
  });
});

let cartQuantity = totalCartQuantity();
document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
