"use strict";
//////////////////////// global /////////////////////////////////////////
(async () => {
const DOMAIN = "http://localhost:3000/movies";

const getMovie = async () => {
    const response = await fetch(`${DOMAIN}`);
    const movies = await response.json();
    return movies;
}

const movies =  await getMovie();




const searchQuery = document.getElementById('movie-searchbar');
const searchResultsDiv = document.getElementById('searchResults');

searchQuery.addEventListener('keyup', () => {
    const searchTerm = searchQuery.value.trim();
    const filteredMovieList = filterMovies(movies, searchQuery.value);
    renderMovie(filteredMovieList);
    searchResultsDiv.textContent = `Your movie results are ${searchTerm}`;
})




////////////////////// functions ///////////////////////////////////////


const createMovie = async (movie) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    };
    console.log(options)
    const response = await fetch(`${DOMAIN}`, options);
    const apiResponse = await response.json();
    return apiResponse;
}






    const editMovie = async (id, title, genre, rating, reviews) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, genre, rating, reviews }) // Include "reviews" property in the request body
        };
        const response = await fetch(`${DOMAIN}/${id}`, options);
        const apiResponse = response.json();
        return apiResponse;
    };





    const deleteMovie = async (id) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`${DOMAIN}/${id}`, options);
    const apiResponse = response.json();
    return apiResponse;
};





    const renderMovie = async (movies) => {
        document.querySelector('#movies').innerHTML = "";
        const movieDiv = document.querySelector('#movies');

        movies.forEach(movie => {
            console.log(movie)
            const card = document.createElement('div');
            card.classList.add('movie-card');
            card.innerHTML = `
            <img src=""/>
            <h2>${movie.title}</h2>
            <h5>${movie.genre}</h5>
            <h5>${movie.rating}</h5>
            <h5>${movie.reviews ? movie.reviews.map((movie) => {return `<h5>${movie}</h5>`}).join("") : "No Reviews Yet"}</h5>
            <div class="review">
                <textarea class="review-input" placeholder="Enter your review"></textarea>
                <button class="btn submit-review">SUBMIT</button>
            </div>
            <div class="movie-reviews">
                ${movie.review ? `<div class="movie-review">${movie.review}</div>` : ''}
            </div>
            
            <button class="btn delete-reviews">DELETE REVIEWS</button>
            <button class="btn delete-movie">DELETE MOVIE</button>
        `;

            const deleteMovieBtn = card.querySelector('.btn.delete-movie');
            deleteMovieBtn.addEventListener('click', async () => {
                await deleteMovie(movie.id);
                card.remove();
            });

            const submitBtn = card.querySelector('.btn.submit-review');
            submitBtn.addEventListener('click', async () => {
                const reviewInput = card.querySelector('.review-input');
                const review = reviewInput.value.trim();

                if (review !== "") {
                    const movieReviewsDiv = card.querySelector('.movie-reviews');
                    const newReviewDiv = document.createElement('div');
                    newReviewDiv.classList.add('movie-review');
                    newReviewDiv.textContent = review;
                    movieReviewsDiv.appendChild(newReviewDiv);
                    reviewInput.value = "";


                    // Get the movie ID from the parent card element
                    const movieId = movie.id;

                    // Update the reviews in the movies array
                    const movieIndex = movies.findIndex(movie => movie.id === movieId);
                    if (movieIndex !== -1) {
                        if (!movies[movieIndex].reviews) {
                            movies[movieIndex].reviews = []; // Initialize the "reviews" array if not present
                        }
                        movies[movieIndex].reviews.push(review); // Add the new review to the "reviews" array
                    }

                    // Call the editMovie function to update the reviews in the JSON data
                    const {title, genre, rating, reviews} = movies[movieIndex];
                    await editMovie(movieId, title, genre, rating, reviews);
                }
            });


            const deleteReviewsBtn = card.querySelector('.btn.delete-reviews');
            deleteReviewsBtn.addEventListener('click', async () => {
                const movieReviewsDiv = card.querySelector('.movie-reviews');
                movieReviewsDiv.innerHTML = ""; // Clear all reviews for this movie
                await deleteReviewsBtn(movie.reviews)
            });



            document.querySelector('#movies').appendChild(card);
        });
    }



    // function for user to add movies

    document.getElementById("addMovieForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const titleInput = document.getElementById("title");
        const genreInput = document.getElementById("genre");
        const ratingInput = document.getElementById("rating");
        const reviewInput = document.getElementById("review")
        const newMovie = {
            title: titleInput.value,
            genre: genreInput.value,
            rating: parseFloat(ratingInput.value),
            review: reviewInput.value,
        };
        // console.log(reviewInput.value)
        // Add the new movie to the movies array
        movies.push(newMovie);
        renderMovie(movies);
        createMovie(newMovie);

        // Optional: You can display the added movie in a list or perform any other action here

        // Clear the input fields
        titleInput.value = "";
        genreInput.value = "";
        ratingInput.value = "";
        reviewInput.value = "";
    });





    renderMovie(movies);


    const filterMovies = (movies, search) => {
        console.log(movies)
        return movies.filter(movie => movie.title.includes(search))
    }
    const filteredMovies = filterMovies(movies, searchQuery)
    console.log(searchQuery)
    console.log(filteredMovies);



renderMovie(movies)



})();






