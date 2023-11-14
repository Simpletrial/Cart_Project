export let cart = JSON.parse(localStorage.getItem('p-cart'));
if (!cart) {
    cart=
    [{
        productId: "1",
        quantity: 2
    },
    {
        productId: "2",
        quantity: 1
    }
    ];
}


export function addToCart(productId) {
    let macthingItems;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            macthingItems = cartItem
        }
    })

    let quantitySelector = document.querySelector(`.quantity-selector-${productId}`);
    let quantitySelectorValue = Number(quantitySelector.value);

    if (macthingItems) {
        macthingItems.quantity += 1;
        macthingItems.quantity += quantitySelectorValue;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1,
            quantity: quantitySelectorValue
        });
    };
    let cartQuantity = totalCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    saveToCart()
};


export function removeCart(productId) {
    let newCart = []
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }
    })
    cart = newCart;
    let cartQuantity = totalCartQuantity()
    document.querySelector('.js-total-quantity').innerHTML = `${cartQuantity} Items`
    saveToCart();
}

export function updateCartButton(productId){
    let container=document.querySelector(`.js-cart-item-${productId}`)
    container.classList.add('is-editing-quantity');
}

export function updateSaveCartQuantity(productId,newQuantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(cartItem.productId===productId){
            matchingItem=cartItem;
        }
    })
    matchingItem.quantity=newQuantity;
    saveToCart()
}


export function totalCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
}


function saveToCart() {
    localStorage.setItem('p-cart', JSON.stringify((cart)));
}
saveToCart()
