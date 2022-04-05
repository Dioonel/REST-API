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
    const res = await doPost('http://localhost:3000/api/users', obj);
    console.log('OWO');
}


async function doPost(url, ob){
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: ob});
}

