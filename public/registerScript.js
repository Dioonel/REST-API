let form = document.getElementById('register');
form.addEventListener('submit', submit);
const URL = 'http://localhost:8080/api/users';

async function submit(){
    let obj = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    }

    let confirmPassword = document.getElementById('confirmPassword').value;

    if(obj.password === confirmPassword){
        console.log('hola?');
        obj = JSON.stringify(obj);

        const res = await execute(URL, obj);
        form.reset();

        if(res?.username){
            logMsg(res);
            const data = await fetchLogin(obj);
            if(data.status == 200){
                setTimeout(() => {
                    window.location.href = 'http://localhost:8080/users';
                }, 500);
            }
        } else {
            logMsg({message: 'Username is already taken.'});
        }
    } else {
        logMsg({message: 'Passwords are not equal.'});
        form.reset();
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

async function fetchLogin(ob){
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body: ob
        });
            return response.json();
}

function logMsg(data){
        let span1 = document.querySelector('.postMsg');
        span1.innerHTML = `<strong>${data.message}</strong>`;
        span1.style.display = 'inline';
} 

