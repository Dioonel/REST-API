const URL = `http://localhost:8080/api/products`;

function searchOne(){
    const id = document.getElementById('idSearch').value;
    const form = document.getElementById('formGet');
    form.action = `${URL}/${id}`;
}

function filterItems(){
    let data = {
        name: document.getElementById('filterName').value,
        min_price: document.getElementById('filterMinPrice').value,
        max_price: document.getElementById('filterMaxPrice').value,
        quantity: document.getElementById('filterQuantity').value,
        sortBy: document.getElementById('filterSortBy').value,
        sortWay: document.getElementById('filterSortWay').value,
    }

    location.href = filterURLMaker(data);                                 // If I try to use form.action, idk why but query will not be sent
}

async function createItem(){
    let obj = {
        name: document.getElementById('namePost').value,
        price: parseInt(document.getElementById('pricePost').value),
        image: document.getElementById('imagePost').value,
    };

    obj = JSON.stringify(obj);

    const response = await doPost(URL, obj);
    postMsg(response);
    document.getElementById('formPost').reset();
}

async function deleteOne(){
    const id = document.getElementById('idDelete').value;

    const response = await doDelete(`${URL}/${id}`);
    deleteMsg(response);
    document.getElementById('formDelete').reset();
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const name = {prop: 'name', value: document.getElementById('nameUpdate').value};
    const price = {prop: 'price', value: document.getElementById('priceUpdate').value};
    const image = {prop: 'image', value: document.getElementById('imageUpdate').value};

    let obj = {};
    let array = [name, price, image];

    for (let b of array){
        if(b.value != "" && b.value != null){
            obj = {
                ...obj,
                [b.prop]: b.value,
            }
        }
    }

    obj = JSON.stringify(obj);

    const response = await doUpdate(`${URL}/${id}`, obj);
    updateMsg(response);
    document.getElementById('formUpdate').reset();
}


async function doPost(url, ob){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: ob
    });
    return response.json();
}

async function doDelete(url){
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'}
    });
    return response.json();
}

async function doUpdate(url, ob){
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ob
    });
    return response.json();
}

let postMsg = (data) => {
    let span1 = document.querySelector('.postMsg');
    let span2 = document.querySelector('.showRes');
    span1.innerHTML = `<strong>${data.message}</strong>`;
    span1.style.display = 'inline';
    span2.innerHTML = `<strong>Item:</strong> <i>${data.data.name}</i>  -  <strong>Price:</strong> <i>${data.data.price}</i>  -  <strong>ImageURL:</strong> <i>${data.data.image}</i>  -  <strong>ID:</strong> <i>${data.data._id}</i>`;
    span2.style.display = 'inline';
}

let deleteMsg = (data) => {
    let span = document.querySelector('.delMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}

let updateMsg = (data) => {
    let span = document.querySelector('.updMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}

function filterURLMaker(data){
    let filterURL = `${URL}?`

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