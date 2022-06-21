document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.topnav').innerHTML += `<a href="/">Main menu</a>
    <a href="/timeline">Timeline</a>
    <a href="/timeline/publish">Publish</a>
    <a href="https://twitter.com/SuspenDioo">Contact us</a>
    <a href="/my-profile" id="nav-my-user" style="float:right"></a>
    <a href="/my-cart" style="float:right">Your cart</a></l>
    <a href="/login" style="float:right">Change account</a>
    <div class="search-container">
        <form onsubmit="return false" id="formSearchBar">
            <input type="text" placeholder="Search..." id="searchBar" required>
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>
    </div>`

    document.getElementById('formSearchBar').addEventListener('submit', executeSearchBar);
});


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
