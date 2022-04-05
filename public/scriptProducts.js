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
    const res = await doPost('http://localhost:3000/api/products', obj);
    console.log('OWO');
}


async function doPost(url, ob){
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: ob});
}


