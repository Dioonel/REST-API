const URL = `http://localhost:8080/api/users`;
const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];
const token = ('; '+document.cookie).split(`; token=`).pop().split(';')[0];

if(username) {
    const link = document.getElementById('profLink');
    link.innerHTML = `<strong>Welcome ${username}!</strong>`;
}

function searchOne(){
    const id = document.getElementById('idSearch').value;
    const form = document.getElementById('formGet');
    form.action = `${URL}/${id}`;
}

async function deleteOne(){
    const id = document.getElementById('idDelete').value;

    const response = await doDelete(`${URL}/${id}`);
    document.getElementById('formDelete').reset();
    deleteMsg(response);
}

async function doDelete(url){
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'}
    });
    return response.json();
}

let deleteMsg = (data) => {
    let span = document.querySelector('.delMsg');
    span.innerHTML = `<strong>${data.message}</strong>`;
    span.style.display = 'inline';
}