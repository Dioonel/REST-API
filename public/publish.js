const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = `http://localhost:8080/api/postings`;
const user_id = ('; '+document.cookie).split(`; id=`).pop().split(';')[0];

async function createPosting(){                                                               // Create a new post and redirect to that new post
    let product = {
        name: document.getElementById('product-item-create').value,
        price: document.getElementById('product-price-create').value,
        image: document.getElementById('product-image-create').value,
    }

    product = JSON.stringify(product);

    let responseProduct = await executeProduct('http://localhost:8080/api/products', product);         // First, creates the product

    if(responseProduct?.created == true){                                                      // If the product was successfully created...
        let posting = {                                                                      // ...proceed and create the post with that product
            title: document.getElementById('post-title-create').value,
            body: document.getElementById('post-body-create').value,
            product: responseProduct.data._id,
        }

        posting = JSON.stringify(posting);

        let responsePosting = await executePosting('http://localhost:8080/api/postings', posting);
        location.href = `${TIMELINE_URL}/${responsePosting.data._id}`;
    }
}


async function executeProduct(url, product){
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: product,
    });
    return res.json();
}

async function executePosting(url, posting){
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: posting,
    });
    return res.json();
}