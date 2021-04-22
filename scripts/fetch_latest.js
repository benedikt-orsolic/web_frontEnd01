
addMovie(550)




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

    let poster = createPosterNode(jsonData.poster_path);

    node.appendChild(title);
    node.appendChild(poster);
    document.getElementById('movieList').appendChild(node);

}

function createPosterNode(posterPath) {

    let poster = document.createElement('img');

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let config = JSON.parse(this.responseText);
            poster.setAttribute('src', config.images.secure_base_url + config.images.poster_sizes[config.images.poster_sizes.length - 1] + posterPath)
        }
    }
    
    xhttp.open('GET', BASE_URL + 'configuration?api_key=' + API_KEY, true);
    xhttp.send();

    return poster;
}