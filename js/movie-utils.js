const DOMAIN = "http://localhost:3000/movies";

export const getMovie = async () => {
    const response = await fetch(`${DOMAIN}`);
    const movies = await response.json();
    return movies;
}
export const createMovie = async (movie) => {
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
export const editMovie = async (id, title, genre, rating, reviews) => {
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, genre, rating, reviews }) // Include "reviews" property in the request body
    };
    const response = await fetch(`${DOMAIN}/${id}`, options);
    const apiResponse = response.json();
    return apiResponse;
};
export const deleteMovie = async (id) => {
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

export const deleteReviews = async (movie) => {
    // do a fetch request to localhost/movies/${movie.id}
    // method 'PATCH'
    // the object to be stringified:
    const bodyObject = {
        reviews: []
    }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject) // Include "reviews" property in the request body
    };
    const response = await fetch(`${DOMAIN}/${movie.id}`, options);
    const apiResponse = response.json();
    return apiResponse;
}
export const renderMovie = async (movies) => {
    document.querySelector('#movies').innerHTML = "";
    const movieDiv = document.querySelector('#movies');

    movies.forEach(movie => {
        console.log(movie)
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <div class="row">
              <div class="col">
                <div class="card-example">
                    <img class="card-image" src="${movie.images}"/>
                </div>
              </div>
              <div class="w-100"></div>
              <div class="d-flex flex-column">            
                <h2>${movie.title}</h2>
                <h5>Genre:</h5> ${movie.genre}
                <h5>Rating:</h5> ${movie.rating}
                <h5>Reviews:</h5> 
                <div class="card movie-reviews">
                    ${
                        movie.reviews ? movie.reviews.map((movie) => {
                            return `<p>${movie}</p>`
                        }).join("") : "No Reviews Yet"
                    }
                </div>
                <form class="review flex-grow-1 position-relative">
                    <textarea class="review-input" placeholder="Enter your review"></textarea>
                    <button class="review-submit">
                        <span> > </span>
                    </button>
                </form>
             
                <div class="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <button class="btn delete-reviews">DELETE REVIEWS</button>
                    <button class="btn delete-movie">DELETE MOVIE</button>
                </div>
              </div>
            </div>
        `;

        const deleteMovieBtn = card.querySelector('.btn.delete-movie');
        deleteMovieBtn.addEventListener('click', async () => {
            console.log("inside deleteMovieBtn event listener")
            console.log(movie);
            await deleteMovie(movie.id);
            card.remove();
        });

        const reviewFormBtn = card.querySelector('form.review');


        reviewFormBtn.addEventListener('click', async (e) => {
                e.preventDefault();

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

        // reviewForm.addEventListener('submit', async (e) => {
        //     console.log("inside reviewform submit event listener");
        //     e.preventDefault();
        //     const reviewInput = card.querySelector('.review-input');
        //     const review = reviewInput.value.trim();
        //
        //     if (review !== "") {
        //         const movieReviewsDiv = card.querySelector('.movie-reviews');
        //         const newReviewDiv = document.createElement('div');
        //         newReviewDiv.classList.add('movie-review');
        //         newReviewDiv.textContent = review;
        //         movieReviewsDiv.appendChild(newReviewDiv);
        //         reviewInput.value = "";
        //
        //
        //         // Get the movie ID from the parent card element
        //         const movieId = movie.id;
        //
        //         // Update the reviews in the movies array
        //         const movieIndex = movies.findIndex(movie => movie.id === movieId);
        //         if (movieIndex !== -1) {
        //             if (!movies[movieIndex].reviews) {
        //                 movies[movieIndex].reviews = []; // Initialize the "reviews" array if not present
        //             }
        //             movies[movieIndex].reviews.push(review); // Add the new review to the "reviews" array
        //         }
        //
        //         // Call the editMovie function to update the reviews in the JSON data
        //         const {title, genre, rating, reviews} = movies[movieIndex];
        //         await editMovie(movieId, title, genre, rating, reviews);
        //     }
        // });


        const deleteReviewsBtn = card.querySelector('.btn.delete-reviews');
        deleteReviewsBtn.addEventListener('click', async () => {
            const movieReviewsDiv = card.querySelector('.movie-reviews');
            movieReviewsDiv.innerHTML = ""; // Clear all reviews for this movie
            await deleteReviews(movie);
        });






        document.querySelector('#movies').appendChild(card);
    });
}
export const filterMovies = (movies, search) => {
    //todo: get filter function working
    console.log(movies)
    return movies.filter(movie => movie.title.includes(search))
}