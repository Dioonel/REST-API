const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createItem);


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
}

async function deleteOne(){
    const input = document.getElementById('idDelete').value;
    const response = await doDelete(`http://localhost:3000/api/products/${input}`);
    console.log(response);
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const name = document.getElementById('updateName').value;
    const price = document.getElementById('updatePrice').value;
    const image = document.getElementById('updateImage').value;

    let obj = {};

    if (name != ""){                                                            // I know, this is trash
        obj = {
            ...obj,
            name: name,
        }
    }
    if (price != ""){
        obj = {
            ...obj,
            price: price,
        }
    }
    if (image != ""){
        obj = {
            ...obj,
            image: image,
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
