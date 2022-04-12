const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createUser);

const formDelete = document.getElementById('form3');
formDelete.addEventListener('submit', deleteOne);

function searchOne(){
    const input = document.getElementById('idSearch');
    const form = document.getElementById('form1');
    form.action = `http://localhost:3000/api/users/${input.value}`;
}

async function createUser(){
    const id = 'WIP xd';

    let obj = {
        first_name: document.getElementById('userFirstName').value,
        last_name: document.getElementById('userLastName').value,
        gender: document.getElementById('userGender').value,
        job_area: document.getElementById('userJobArea').value,
        contact: document.getElementById('userContact').value,
        id: id
    };

    obj = JSON.stringify(obj);
    const response = await doPost('http://localhost:3000/api/users', obj);
    console.log(response);

    userDecorate(response);
    formPost.reset();
}

async function deleteOne(){
    const input = document.getElementById('idDelete').value;
    const response = await doDelete(`http://localhost:3000/api/users/${input}`);
    console.log(response);

    formDelete.reset();
    deleteMsg(response);
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const first_name = {prop: 'first_name', value: document.getElementById('updateFirstName').value};
    const last_name = {prop: 'last_name', value: document.getElementById('updateLastName').value};
    const gender = {prop: 'gender', value: document.getElementById('updateGender').value};
    const job_area = {prop: 'job_area', value: document.getElementById('updateJobArea').value};
    const contact = {prop: 'contact', value: document.getElementById('updateContact').value};

    let obj = {};
    let array = [first_name, last_name, gender, job_area, contact];

    for (let b of array){
        if(b.value != ""){
            obj = {
                ...obj,
                [b.prop]: b.value,
            }
        }
    }

    obj = JSON.stringify(obj);
    const response = await doUpdate(`http://localhost:3000/api/users/${id}`, obj);
    console.log(response);
}

async function doPost(url, ob){
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: ob});
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

let userDecorate = (data) => {
    let span1 = document.querySelector('.postMsg');
    let span2 = document.querySelector('.showRes');
    span1.innerHTML = `<strong>User created!</strong>`;
    span1.style.display = 'inline';
    span2.innerHTML = `Welcome <strong>${data.data.first_name} ${data.data.last_name}</strong>!`;
    span2.style.display = 'inline';
}

let deleteMsg = (data) => {
    let span = document.querySelector('.delMsg');
    span.innerHTML = `<strong>${data.message.message}</strong>`;
    span.style.display = 'inline';
}