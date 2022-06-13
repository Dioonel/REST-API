const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = `http://localhost:8080/api/postings`;
const user_id = ('; '+document.cookie).split(`; id=`).pop().split(';')[0];
let postId = window.location.pathname.split('/timeline')[1];

document.getElementById('addCommentForm').addEventListener('submit', createComment);

document.addEventListener('DOMContentLoaded', async () => {
    let postInfo = await executeSearch(`${POSTINGS_URL}/${postId}`);
    if(postInfo?.statusCode === 409){
        location.href = TIMELINE_URL;
    }
    
    makePostingHTML(postInfo);
    pushComments(postInfo.comments);
});

async function executeSearch(url){
    let res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

function makePostingHTML(data){
    document.querySelector('title').innerHTML = data.title;
    document.querySelector('.full-img').src = data.product?.image;
    document.querySelector('.detailed-product-title').innerHTML = data.title;
    document.querySelector('.detailed-price').innerHTML = `$${data.product?.price}`;
    document.querySelector('.detailed-seller').innerHTML = `Seller: ${data.seller?.username}`;
    document.querySelector('.detailed-description-text').innerHTML = `More info:
${data.body}`;
}

function pushComments(comments){
    if(comments.length > 0){
        let div = document.querySelector('.full-comments-div');
        for(let comment of comments){
            let date = comment.created_at.split('T')[0];
            let time = comment.created_at.split('T')[1].split('.')[0].split(':');
            let formattedDate = `${time[0]}:${time[1]}hs ~ ${date}`;

            div.innerHTML += `<div class="comment">
            <img src="${comment.author.image}" class="comment-user-img">
            <div class="comment-username">${comment.author.username}</div>
            <div class="comment-date">${formattedDate}</div>
            <br/>
            <div class="comment-body">${comment.text}</div>
            </div>`;
        }
    }
}

async function createComment(){
    let text = document.querySelector('.addCommentText').value;
    if(text.trim()){
        let obj = {
            author: user_id,
            post: postId,
            text: text.trim(),
        }

        obj = JSON.stringify(obj);
        let response = await executeAddComment(`http://localhost:8080/api/postings/${postId}`, obj);
        location.reload();
    }
}

async function executeAddComment(url, obj){
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: obj,
    });
    return res.json();
}