const popularMovies_url = 'https://api.themoviedb.org/3/movie/popular?api_key=974756984f07d703f85b8dd845963e71';

const topRated_url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=974756984f07d703f85b8dd845963e71';

const upcoming_url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=974756984f07d703f85b8dd845963e71';


const popularMovies = [];
const top_ratedMovies = [];
const upcomingMovies = [];

const movieTileContainer = document.getElementById('movieTileContainer');

async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('There is some error in displaying the movies', error);
        return [];
    }
}

async function displayMovies(url) {
    try{
        const moviesData = await fetchMovies(url);
        generateMovieTiles(moviesData);
    } catch(error){
        console.error('There is an error in displaying movies.', error);
}
}

async function fetchPopularMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=974756984f07d703f85b8dd845963e71');
        const data = await response.json();
        popularMovies.push(...data.results);
        console.log('Popular Movies:', popularMovies);
    } catch (error) {
        console.error('There is an error in getting the movies.', error);
    }
}

async function fetchTopRatedMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=974756984f07d703f85b8dd845963e71');
        const data = await response.json();
        top_ratedMovies.push(...data.results);
        console.log('Top-rated Movies:', top_ratedMovies);
    } catch (error) {
        console.error('There is an error in getting the movies.', error);
    }
}

async function fetchUpcomingMovies() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=974756984f07d703f85b8dd845963e71');
        const data = await response.json();
        upcomingMovies.push(...data.results);
        console.log('UpcomingMovies:', upcomingMovies);
    } catch (error) {
        console.error('There is an error in getting the movies.', error);
    }
}

fetchPopularMovies();
fetchTopRatedMovies();
fetchUpcomingMovies();

function generateMovieTiles(moviesData) {
    movieTileContainer.innerHTML = '';
    moviesData.forEach(movie => {
        const tile = createTileForMovie(movie);
        movieTileContainer.appendChild(tile);
    });
}

function createTileForMovie(movie) {
    const tile = document.createElement('div');
    tile.classList.add('card');
    tile.style.width = '18rem';

    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    const imageUrl =  'https://via.placeholder.com/1920x1080';

    const body = document.createElement('div');
    body.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = movie.title;

    const releaseDate = document.createElement('h5');
    releaseDate.classList.add('release-date');
    releaseDate.textContent = 'Release Date: ' + movie.release_date;

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = movie.overview;

    
    const genre = document.createElement('h5');
    genre.classList.add('genre');
    genre.textContent = 'Genre: ' + movie.genre;

    body.appendChild(title);
    body.appendChild(releaseDate);
    body.appendChild(description);
    body.appendChild(genre);

    tile.appendChild(image);
    tile.appendChild(body);

    return tile;
}

document.getElementById('popularMovies').addEventListener('click', () => {
    displayMovies(popularMovies_url);
});

document.getElementById('topRatedMovies').addEventListener('click', () => {
    displayMovies(topRated_url);
});

document.getElementById('upcomingMovies').addEventListener('click', () => {
    displayMovies(upcoming_url);
});

displayMovies(popularMovies_url);
displayMovies(topRated_url);
displayMovies(upcoming_url);