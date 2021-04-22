if(document.addEventListener) {
    window.addEventListener('scroll', function(){
        loadMoreMovies();
    });
    window.addEventListener('load', function(){
        initialLoad();
    })
}


// Loading functions





function loadMoreMovies () {
    if( loadMoreMovies.counter == undefined ) {
        loadMoreMovies.counter = 0;
    }

    let scrollPos = window.scrollY + window.innerHeight;
    let height = (document.height !== undefined) ? document.height : document.body.offsetHeight;

    console.log( scrollPos + ' ' + height);

    if( scrollPos >= height * 0.9) addMovie( ++loadMoreMovies.counter );
}

function initialLoad() {
    addMovie(550)
}





// Add move to page functions





function addMovie(moveId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if(this.readyState == 4 && this.status == 200){
            appendToPage(JSON.parse(this.responseText));
        }
    }

    xhttp.open('GET', BASE_URL + 'movie/' + moveId + '?api_key=' + API_KEY, true);
    xhttp.send();
}

function appendToPage(jsonData){

    let node = document.createElement('article');
    node.classList.add('movieTitle');
    
    let title = document.createElement('h5');
    title.appendChild(document.createTextNode(jsonData.original_title));

    let poster = createPosterNode(jsonData.poster_path, jsonData.original_title);

    node.appendChild(title);
    node.appendChild(poster);
    document.getElementById('movieList').appendChild(node);

}

function createPosterNode(posterPath, original_title) {

    let poster = document.createElement('img');

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let config = JSON.parse(this.responseText);
            poster.setAttribute('src', config.images.secure_base_url + config.images.poster_sizes[config.images.poster_sizes.length - 1] + posterPath)
            poster.setAttribute('alt', original_title + ' poster img');
        }
    }
    
    xhttp.open('GET', BASE_URL + 'configuration?api_key=' + API_KEY, true);
    xhttp.send();

    return poster;
}