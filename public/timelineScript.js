const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = 'http://localhost:8080/api/postings';
const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];

document.getElementById('formSearchBar').addEventListener('submit', executeSearchBar);
document.getElementById('filterForm').addEventListener('submit', executeFilter);

document.addEventListener('DOMContentLoaded', async () => {
    if(username){
        let myProfile = document.getElementById('nav-my-user');
        myProfile.innerHTML = `${username}`;
    }
    const postings = await searchPosts(`${POSTINGS_URL}${window.location.search}`);
    for(let post of postings){
        pushPosts(post);
    }

    try{
        const query = window.location.search.split('?')[1].split('&');
        for(let param of query){
            if(['sortBy=name', 'sortBy=price'].includes(param)){
                let sortByDefault = document.getElementById('filterSortBy');
                sortByDefault.value = param.split('sortBy=')[1];
                sortByDefault.selected = true;
                sortByDefault.defaultSelected = true;
            }
            if(['sortWay=-1', 'sortWay=desc', 'sortWay=descending'].includes(param)){
                let sortWayDefault = document.getElementById('filterSortWay');
                sortWayDefault.value = param.split('sortWay=')[1];
                sortWayDefault.selected = true;
                sortWayDefault.defaultSelected = true;
            }
        }
    } catch (err) {
        return false;
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

async function executeSearchBar(){
    let keywords = document.getElementById('searchBar').value;

    if(keywords.trim()){
        let data = {
            name: keywords.trim(),
            //min_price: document.getElementById().value,
            //max_price: document.getElementById().value,
        }

        location.href = filterURLMaker(data);
    }
}

function filterURLMaker(data){
    let filterURL = `${TIMELINE_URL}?`;

    if(data.name){
        filterURL += `name=${data.name}&`;
    }
    if(data.min_price){
        filterURL += `min_price=${data.min_price}&`;
    }
    if(data.max_price){
        filterURL += `max_price=${data.max_price}&`;
    }
    if(data.quantity){
        filterURL += `quantity=${data.quantity}&`;
    }
    if(data.sortBy){
        filterURL += `sortBy=${data.sortBy}&`;
    }
    if(data.sortWay){
        filterURL += `sortWay=${data.sortWay}&`;
    }

    return filterURL;
}

async function executeFilter(){
    let sortBy = document.getElementById('filterSortBy').value;
    let sortWay = document.getElementById('filterSortWay').value;

    let url = String(window.location.href).split('sortBy')[0].split('sortWay')[0];
    if(url[url.length - 1] !== '?' && url[url.length - 1] !== '&'){
        url += '?';
    }

    let filterQuery = '';
    if(sortBy){
        filterQuery += `sortBy=${sortBy}&`;
    }
    if(sortWay){
        filterQuery += `sortWay=${sortWay}`;
    }

    window.location.href = url + filterQuery;
}