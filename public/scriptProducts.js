const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createItem);

const formDelete = document.getElementById('form3');
formDelete.addEventListener('submit', deleteOne);


function searchOne(){
    const input = document.getElementById('idSearch').value;
    const form = document.getElementById('form1');
    form.action = `http://localhost:3000/api/products/${input}`;
}


async function createItem(){
    const id = 'WIP';

    let obj = {
        name: document.getElementById('createName').value,
        price: document.getElementById('createPrice').value + `.00`,
        image: document.getElementById('createImage').value,
        id: id
    };

    obj = JSON.stringify(obj);
    const response = await doPost('http://localhost:3000/api/products', obj);
    console.log(response);

    itemDecorate(response);
    formPost.reset();
}

async function deleteOne(){
    const input = document.getElementById('idDelete').value;
    const response = await doDelete(`http://localhost:3000/api/products/${input}`);
    console.log(response);

    deleteMsg(response);
    formDelete.reset();
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const name = {prop: 'name', value: document.getElementById('updateName').value};
    const price = {prop: 'price', value: document.getElementById('updatePrice').value};
    const image = {prop: 'image', value: document.getElementById('updateImage').value};

    let obj = {};
    let array = [name, price, image];

    for (let b of array){
        if(b.value != ""){
            obj = {
                ...obj,
                [b.prop]: b.value,
            }
        }
    }


    obj = JSON.stringify(obj);
    const response = await doUpdate(`http://localhost:3000/api/products/${id}`, obj);
    console.log(response);
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

let itemDecorate = (data) => {
    let span1 = document.querySelector('.postMsg');
    let span2 = document.querySelector('.showRes');
    span1.innerHTML = `<strong>Item created!</strong>`;
    span1.style.display = 'inline';
    span2.innerHTML = `<strong>Item:</strong> <i>${data.data.name}</i>  -  <strong>Price:</strong> <i>${data.data.price}</i>  -  <strong>ImageURL:</strong> <i>${data.data.image}</i>  -  <strong>ID:</strong> <i>${data.data.id}</i>`;
    span2.style.display = 'inline';
}

let deleteMsg = (data) => {
    let span = document.querySelector('.delMsg');
    span.innerHTML = `<strong>${data.message.message}</strong>`;
    span.style.display = 'inline';
}