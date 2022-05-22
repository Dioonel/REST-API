let form = document.getElementById('login');
form.addEventListener('submit', submit);
const URL = 'http://localhost:8080/login';
const params = new URLSearchParams(window.location.search);

if(params.has('user')){
    const div = document.querySelector('.redirectMsg');
    div.innerHTML = '<strong>Please, log in first.</strong>';
    div.style.display = 'block';
}

async function submit(){
    let obj = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    obj = JSON.stringify(obj)

    const res = await execute(URL, obj);
    logMsg(res);
    form.reset();
    
    if(res?.status == 200){
        setTimeout(() => {
            window.location.href = "http://localhost:8080/users";
        }, 500);
    }
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