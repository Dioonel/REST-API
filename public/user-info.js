const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];

document.addEventListener('DOMContentLoaded', () => {
    if(username){
        document.getElementById('nav-my-user').innerHTML = `${username}`;
    }
});