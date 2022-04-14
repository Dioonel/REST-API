////////////////////////////////////////////////////////
const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createUser);
////////////////////////////////////////////////////////
const formDelete = document.getElementById('form3');
formDelete.addEventListener('submit', deleteOne);
////////////////////////////////////////////////////////
const formUpdate = document.getElementById('form4');
formUpdate.addEventListener('submit', updateOne);
////////////////////////////////////////////////////////

const URL = `http://localhost:3000/api/users`;

function searchOne(){
    const id = document.getElementById('idSearch').value;
    const form = document.getElementById('form1');
    form.action = `${URL}/${id}`;
}

async function createUser(){
    const id = 'WIP';

    let obj = {
        first_name: document.getElementById('fNamePost').value,
        last_name: document.getElementById('lNamePost').value,
        gender: document.getElementById('genderPost').value,
        job_area: document.getElementById('jobPost').value,
        contact: document.getElementById('contactPost').value,
        id: id
    };

    obj = JSON.stringify(obj);

    const response = await doPost(URL, obj);
    postMsg(response);
    formPost.reset();
}

async function deleteOne(){
    const id = document.getElementById('idDelete').value;

    const response = await doDelete(`${URL}/${id}`);
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

    const response = await doUpdate(`${URL}/${id}`, obj);
    updateMsg(response);
    formUpdate.reset();
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

let postMsg = (data) => {
    let span1 = document.querySelector('.postMsg');
    let span2 = document.querySelector('.showRes');
    span1.innerHTML = `<strong>${data.message}</strong>`;
    span1.style.display = 'inline';
    span2.innerHTML = `Welcome <strong>${data.data.first_name} ${data.data.last_name}</strong>!`;
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