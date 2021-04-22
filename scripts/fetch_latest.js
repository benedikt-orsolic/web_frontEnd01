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
    let year = createYearNode(jsonData.release_date);
    let languages = createLangNode(jsonData.spoken_languages);
    let vote_average = createVoteNode(jsonData.vote_average);

    node.appendChild(poster);
    node.appendChild(title);
    node.appendChild(year);
    node.appendChild(languages);
    node.appendChild(vote_average);
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

function createYearNode(release_date) {
    let date = document.createElement('p');
    date.setAttribute('class', 'movieReleaseDate');

    let dateArray = release_date.split('-');

    let year = document.createElement('span');
    year.appendChild(document.createTextNode(dateArray[0]));
    year.setAttribute('class', 'movieReleaseYear');

    let month = document.createElement('span');
    month.appendChild(document.createTextNode(dateArray[1]));
    month.setAttribute('class', 'movieReleaseMonth');

    let day = document.createElement('span');
    day.appendChild(document.createTextNode(dateArray[2]));
    day.setAttribute('class', 'movieReleaseDay');

    date.appendChild(year);
    date.appendChild(month);
    date.appendChild(day);

    return date;
}

function createLangNode(spoken_languages) {
    let languages = document.createElement('section');
    languages.setAttribute('class', 'movieLanguages');

    for(let i = 0; i < spoken_languages.length; i++){
        let lang = document.createElement('section');
        lang.setAttribute('class', 'movieLanguage');

        let eng_name = document.createElement('span');
        eng_name.appendChild(document.createTextNode(spoken_languages[i].english_name));
        eng_name.setAttribute('class', 'engLangName');

        let iso_name = document.createElement('span');
        iso_name.appendChild(document.createTextNode(spoken_languages[i].iso_639_1));
        iso_name.setAttribute('class', 'isoLangName');

        let local_name = document.createElement('span');
        local_name.appendChild(document.createTextNode(spoken_languages[i].name));
        local_name.setAttribute('class', 'localLangName');

        lang.appendChild(eng_name);
        lang.appendChild(iso_name);
        lang.appendChild(local_name);

        languages.appendChild(lang);

    }

    return languages;
}

function createVoteNode(vote_average) {
    let vote = document.createElement('p');
    vote.setAttribute('class', 'movieVotes');

    vote.appendChild(document.createTextNode(vote_average));

    return vote;
}