const POSTINGS_URL = 'http://localhost:8080/api/postings';

document.addEventListener('DOMContentLoaded', async () => {
    const postings = await searchPosts(`${POSTINGS_URL}?limit=5`);
    console.log(postings);
    for(let post of postings){
        pushPosts(post);
    }
});

async function searchPosts(url){
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

function pushPosts(post){
    let myBody = document.querySelector('.full-body-div');

    myBody.innerHTML += `<div class="post-parent-div">
    <div class="post-inner-div">
        <img src="${post?.product?.image || ""}" class=post-img>
        <h3 class="post-title">${post.title}</h3>
        <h4 class="post-price">$${post?.product?.price || "?"}</h4>
    </div>
</div>`;
}