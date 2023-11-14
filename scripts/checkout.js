import { cart, removeCart, totalCartQuantity, updateCartButton, updateSaveCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

let cartDetailHtml = '';
 cart.forEach((cartItem) => {

    let productId = cartItem.productId;
    let matchingItem;

    products.forEach((productItems) => {
        if (productItems.id === productId) {
            matchingItem = productItems;
        };
    });

    cartDetailHtml +=
        `
    <div class="cart-item-container js-cart-item-${matchingItem.id}">
    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">
      <div class="cart-item-details">
        <div class="product-name">
         ${matchingItem.name}
        </div>
        <div class="product-price">
        &#8377;${matchingItem.price}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary" data-product-id="${matchingItem.id}">
            Update
          </span>
          <input class="js-update-input js-input-${matchingItem.id}">
          <span class="link-primary js-save-button" data-product-id="${matchingItem.id}" >Save</span>
          <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
            Delete
          </span>
        </div>
      </div>
    </div>
  </div>
    `
})
document.querySelector('.js-order-summary').innerHTML = cartDetailHtml;

document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;

        removeCart(productId)
        let container = document.querySelector(`.js-cart-item-${productId}`);
        container.remove()
        console.log(cart)
    })
});

document.querySelectorAll('.update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        updateCartButton(productId);
    })
});


document.querySelectorAll('.js-save-button').forEach((link) => {
    link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        let inputElem = document.querySelector(`.js-input-${productId}`);
        let newQuantity = inputElem.value;
        newQuantity = Number(inputElem.value);
        if(newQuantity<0 || newQuantity>=1000){
            alert('Sorryy..! Items must choose between 0 to 1000');
            return;
        }
        updateSaveCartQuantity(productId, newQuantity);
        let quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity;
        inputElem.value ='';
        let container = document.querySelector(`.js-cart-item-${productId}`);
        container.classList.remove('is-editing-quantity');
        let cartQuantity = totalCartQuantity()
        document.querySelector('.js-total-quantity').innerHTML = `${cartQuantity} Items`

    })
})



let cartQuantity = totalCartQuantity()
document.querySelector('.js-total-quantity').innerHTML = `${cartQuantity} Items`




