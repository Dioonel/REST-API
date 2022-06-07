const POSTINGS_URL = 'http://localhost:8080/api/postings';
const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];

document.addEventListener('DOMContentLoaded', async () => {
    if(username){
        let myProfile = document.getElementById('nav-my-user');
        myProfile.innerHTML = `${username}`;
    }
    
    const postings = await searchPosts(`${POSTINGS_URL}?`);
    for(let post of postings){
        pushPosts(post);
    }
});

async function searchPosts(url){
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

function pushPosts(post){
    let myBody = document.querySelector('.full-body-div');
    myBody.innerHTML += `<div class="post-parent-div">
    <div class="post-inner-div" onclick="getDetailedPost('${post._id}')">
        <img src="${post?.product?.image || ""}" class=post-img>
        <h3 class="post-title">${post.title}</h3>
        <h4 class="post-price">$${post?.product?.price || "?"}</h4>
    </div>
</div>`;
}


function enableCreate(){
    const div = document.querySelector('.divPost');

    if(div.style.display == 'block'){
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }
}


async function createPosting(){
    let product = {
        name: document.getElementById('product-item-create').value,
        price: document.getElementById('product-price-create').value,
        image: document.getElementById('product-image-create').value,
    }

    product = JSON.stringify(product);

    let responseProduct = await executeProduct('http://localhost:8080/api/products', product);

    if(responseProduct?.created == true){
        let posting = {
            title: document.getElementById('post-title-create').value,
            body: document.getElementById('post-body-create').value,
            product: responseProduct.data._id,
        }

        posting = JSON.stringify(posting);

        let responsePosting = await executePosting('http://localhost:8080/api/postings', posting);
        location.reload();
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

function getDetailedPost(myId){
    location.href = `http://localhost:8080/timeline/${myId}`;
}