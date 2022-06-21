const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = `http://localhost:8080/api/postings`;
const user_id = ('; '+document.cookie).split(`; id=`).pop().split(';')[0];

const CART_API_URL = 'http://localhost:8080/api/my-cart';

document.addEventListener('DOMContentLoaded', async () => {
    let cart = await executeGetCart(CART_API_URL)
    if(cart?.items?.length > 0){
        for(let item of cart?.items){
            await pushItems(item);                                                                            // Populate cart items
        }
        document.querySelector('.empty-cart-div').innerHTML += `<a class="btn btn-danger" onclick="emptyCart()"> Remove all items </a>`;
    } else {
        let myBody = document.querySelector('.full-body-div');
        myBody.innerHTML += `<p> Your cart is empty. </p>`;                                     // If the cart is empty, show message
    }
    
    document.querySelector('.cart-total-price').innerHTML += `<p> Total price: <strong> $${cart?.subtotal} </strong> </p>`    // Cart subtotal
});

async function executeGetCart(url){
    let response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function pushItems(item){                                                                        // Populating the cart with the items
    let myBody = document.querySelector('.full-body-div');
    console.log(item._id);
    myBody.innerHTML += `<div class="cart-item-div">
    <img class="cart-img" src="${item?.product?.image || ""}">
    <div class="cart-item-info-div">
        <h2 class="cart-item-title"> ${item?.product?.name} </h2> <br/>
        <p class="cart-item-amount"> Amount: <strong>${item?.amount || 1}</strong> <span class="note"> - ($${item?.product?.price || "?"} each)</span> </p>
        <p class="cart-item-seller"> Seller: <strong>${item?.product?.seller?.username || "?"}</strong> </p>
    </div>
    <button type="submit" class="removeItem" value="${item?._id}" onclick="popItem(event)"><i class="fa fa-trash"></i></button>
    <h3 class="cart-item-price"> $${parseInt(item?.product?.price) * parseInt(item?.amount) || 1} </h3>
</div>`;
}

async function popItem(e){
    let itemId = e.currentTarget.value;
    
    let response = await executePopItem(`${CART_API_URL}/${itemId}`);
    location.reload();
}

async function executePopItem(url){
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function emptyCart(){
    let response = await executeEmptyCart(`${CART_API_URL}/empty`);
    location.reload();
}

async function executeEmptyCart(url){
    let response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}