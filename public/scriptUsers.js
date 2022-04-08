const formPost = document.getElementById('form2');
formPost.addEventListener('submit', createUser);


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
}

async function deleteOne(){
    const input = document.getElementById('idDelete').value;
    const response = await doDelete(`http://localhost:3000/api/users/${input}`);
    console.log(response);
}

async function updateOne(){
    const id = document.getElementById('idUpdate').value;

    const first_name = document.getElementById('updateFirstName').value;
    const last_name = document.getElementById('updateLastName').value;
    const gender = document.getElementById('updateGender').value;
    const job_area = document.getElementById('updateJobArea').value;
    const contact = document.getElementById('updateContact').value;

    let obj = {};

    if (first_name != ""){                                                            // I know, this is trash
        obj = {
            ...obj,
            first_name: first_name,
        }
    }
    if (last_name != ""){
        obj = {
            ...obj,
            last_name: last_name,
        }
    }
    if (gender != ""){
        obj = {
            ...obj,
            gender: gender,
        }
    }
    if (job_area != ""){
        obj = {
            ...obj,
            job_area: job_area,
        }
    }
    if (contact != ""){
        obj = {
            ...obj,
            contact: contact,
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


