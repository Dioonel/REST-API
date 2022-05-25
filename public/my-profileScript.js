const id = ('; '+document.cookie).split(`; id=`).pop().split(';')[0];
const URL = `http://localhost:8080/api/users/${id}`;

const imagePatch = document.getElementById('ppicPatch');
imagePatch.addEventListener('change', thumbnailPreview);

window.addEventListener('DOMContentLoaded', async () => {
    const res = await fetchUserData(URL);

    const username = document.getElementById('username');
    const first_name = document.getElementById('first-name');
    const last_name = document.getElementById('last-name');
    const gender = document.getElementById('gender');
    const birth = document.getElementById('birth');
    const job = document.getElementById('job');
    const contact = document.getElementById('contact');
    const ppic = document.getElementById('ppic');

    username.innerHTML = `User: ${res.username}`;
    first_name.innerHTML = `<strong>${res.first_name || 'undefined'}</strong>`;
    last_name.innerHTML = `<strong>${res.last_name || 'undefined'}</strong>`;
    gender.innerHTML = `Gender: <strong>${res.gender || 'undefined'}</strong>`;
    birth.innerHTML = `Date of birth: <strong>${res.date_of_birth || 'undefined'}</strong>`;
    job.innerHTML = `Job area: <strong>${res.job_area || 'undefined'}</strong>`;
    contact.innerHTML = `Contact: <strong>${res.contact || 'undefined'}</strong>`;
    ppic.src = res.image;
});


async function fetchUserData(url){
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

async function editEnable(){
    const baseDiv = document.querySelector('.div1');
    const formDiv = document.querySelector('.div4');

    baseDiv.style.display = 'none';
    formDiv.style.display = 'block';
}

async function formPatch(){
    const first_name = {prop: 'first_name', value: document.getElementById('fNamePatch').value};
    const last_name = {prop: 'last_name', value: document.getElementById('lNamePatch').value};
    const gender = {prop: 'gender', value: document.getElementById('genderPatch').value};
    const date_of_birth = {prop: 'date_of_birth', value: document.getElementById('birthPatch').value};
    const job_area = {prop: 'job_area', value: document.getElementById('jobPatch').value};
    const contact = {prop: 'contact', value: document.getElementById('contactPatch').value};
    const image = {prop: 'image', value: document.getElementById('ppicPatch').value};

    let obj = {};
    let array = [first_name, last_name, gender, date_of_birth, job_area, contact, image];

    for (let b of array){
        if(b.value != ""){
            obj = {
                ...obj,
                [b.prop]: b.value,
            }
        }
    }

    obj = JSON.stringify(obj);

    const response = await executePatch(URL, obj);
    updateMsg(response);

    setTimeout(() => {
        window.location.href = '/my-profile';
    }, 500);
}

async function executePatch(url, obj){
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: obj,
    });
    return response.json();
}

function thumbnailPreview(){
    setTimeout(() => {
        const thumbnail = document.querySelector('.thumbnail');
        thumbnail.src = imagePatch.value;
    }, 500)
}

function updateMsg (data) {
    let span = document.querySelector('.updMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}