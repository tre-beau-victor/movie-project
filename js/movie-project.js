import {
    getMovie,
    createMovie,
    editMovie,
    deleteMovie,
    renderMovie,
    filterMovies
} from './movie-utils.js'

//////////////////////// global /////////////////////////////////////////
const searchQuery = document.getElementById('movie-searchbar');
const searchResultsDiv = document.getElementById('searchResults');
const addMovieForm = document.getElementById("addMovieForm");
const titleInput = document.getElementById("title");
const genreInput = document.getElementById("genre");
const ratingInput = document.getElementById("rating");
const reviewInput = document.getElementById("review");


(async () => { //main method
    const movies =  await getMovie();
    const filteredMovies = filterMovies(movies, searchQuery)
    await renderMovie(movies)


    // ?. is The Optional Chaining Operator returns undefined if an object is undefined or null (instead of throwing an error).
    searchQuery?.addEventListener('keyup', () => {
    const searchTerm = searchQuery.value.trim();
    const filteredMovieList = filterMovies(movies, searchQuery.value);
    renderMovie(filteredMovieList);
    searchResultsDiv.textContent = `Your movie results are ${searchTerm}`;
    })
    addMovieForm?.addEventListener("submit", async function(event) {
        event.preventDefault();
        const newMovie = {
            title: titleInput.value,
            genre: genreInput.value,
            rating: parseFloat(ratingInput.value),
            review: reviewInput.value,
        };
        // console.log(reviewInput.value)
        // Add the new movie to the movies array

        const savedMovie = await createMovie(newMovie);
        movies.push(savedMovie);
        renderMovie(movies);

        // Optional: You can display the added movie in a list or perform any other action here

        // Clear the input fields
        titleInput.value = "";
        genreInput.value = "";
        ratingInput.value = "";
        reviewInput.value = "";
    });
})();






