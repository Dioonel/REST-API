const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = 'http://localhost:8080/api/postings';

document.getElementById('sortingForm').addEventListener('submit', executeSorting);

document.addEventListener('DOMContentLoaded', async () => {
    const postings = await searchPosts(`${POSTINGS_URL}${window.location.search}`);                 // Fetch the all the posts (query supported)
    for(let post of postings){                                                                      // Pushes the posts into the HTML div
        pushPosts(post);
    }

    try{                                                                                            // Setting-up sorting fields selected values
        const query = window.location.search.split('?')[1].split('&');
        for(let param of query){
            if(['sortBy=name', 'sortBy=price'].includes(param)){
                let sortByDefault = document.getElementById('filterSortBy');
                sortByDefault.value = param.split('sortBy=')[1];
                sortByDefault.selected = true;
                sortByDefault.defaultSelected = true;
            }
            if(['sortWay=-1', 'sortWay=desc', 'sortWay=descending'].includes(param)){
                let sortWayDefault = document.getElementById('filterSortWay');
                sortWayDefault.value = param.split('sortWay=')[1];
                sortWayDefault.selected = true;
                sortWayDefault.defaultSelected = true;
            }
        }
    } catch (err) {
        return false;
    }
});

async function searchPosts(url){                                                                        // Fetch posts
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.json();
}

function pushPosts(post){                                                                              // Populating the timeline with the posts
    let myBody = document.querySelector('.full-body-div');
    myBody.innerHTML += `<div class="post-parent-div">
    <div class="post-inner-div" onclick="getDetailedPost('${post._id}')">
        <img src="${post?.product?.image || ""}" class=post-img>
        <h3 class="post-title">${post.title}</h3>
        <h4 class="post-price">$${post?.product?.price || "?"}</h4>
    </div>
</div>`;
}

function getDetailedPost(myId){
    location.href = `http://localhost:8080/timeline/${myId}`;
}

async function executeSorting(){                                                                     // Sorting functionality
    let sortBy = document.getElementById('filterSortBy').value;
    let sortWay = document.getElementById('filterSortWay').value;

    let url = String(window.location.href).split('sortBy')[0].split('sortWay')[0];
    if(url[url.length - 1] !== '?' && url[url.length - 1] !== '&'){
        url += '?';
    }

    let filterQuery = '';
    if(sortBy){
        filterQuery += `sortBy=${sortBy}&`;
    }
    if(sortWay){
        filterQuery += `sortWay=${sortWay}`;
    }

    window.location.href = url + filterQuery;
}