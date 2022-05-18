let form = document.getElementById('login');
form.addEventListener('submit', submit);
const URL = 'http://localhost:8080/login';

async function submit(){
    let obj = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    obj = JSON.stringify(obj)

    const res = await execute(URL, obj);
    console.log(res);

    logMsg(res);
    form.reset();
}

async function execute(URL, obj){
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: obj
    });
        return response.json();
}

function logMsg(data){
        let span1 = document.querySelector('.postMsg');
        span1.innerHTML = `<strong>${data.message}</strong>`;
        span1.style.display = 'inline';
} 