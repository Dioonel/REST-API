const TIMELINE_URL = 'http://localhost:8080/timeline';
const POSTINGS_URL = 'http://localhost:8080/api/postings';
const username = ('; '+document.cookie).split(`; username=`).pop().split(';')[0];                       // Gets the username

document.getElementById('formSearchBar').addEventListener('submit', executeSearchBar);
document.getElementById('sortingForm').addEventListener('submit', executeSorting);

document.addEventListener('DOMContentLoaded', async () => {
    if(username){                                                                                       // Displays de username in the nav
        let myProfile = document.getElementById('nav-my-user');
        myProfile.innerHTML = `${username}`;
    }

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

async function executeSearchBar(){                                                                     // Search bar functionality
    let keywords = document.getElementById('searchBar').value;

    if(keywords.trim()){
        let data = {
            name: keywords.trim(),
            //min_price: document.getElementById().value,
            //max_price: document.getElementById().value,
        }

        location.href = filterURLMaker(data);
    }
}

function filterURLMaker(data){                                                        // Making the URL with filters (only search bar supported)
    let filterURL = `${TIMELINE_URL}?`;

    if(data.name){
        filterURL += `name=${data.name}&`;
    }
    // if(data.min_price){
    //     filterURL += `min_price=${data.min_price}&`;
    // }
    // if(data.max_price){
    //     filterURL += `max_price=${data.max_price}&`;
    // }
    // if(data.quantity){
    //     filterURL += `quantity=${data.quantity}&`;
    // }
    // if(data.sortBy){
    //     filterURL += `sortBy=${data.sortBy}&`;
    // }
    // if(data.sortWay){
    //     filterURL += `sortWay=${data.sortWay}&`;
    // }

    return filterURL;
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