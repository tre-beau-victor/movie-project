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






const editMovie = async (id) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
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
    document.querySelector('#movies').innerHTML = ""
    const movieDiv = document.querySelector('#movies');
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
         <img src=""/>
        <h2>${movie.title}</h2>
        <h5>${movie.genre}</h5>
        <h5>${movie.rating}</h5>
        <div class="review">
                <textarea class="review-input" placeholder="Enter your review"></textarea>
                <button class="btn submit-review">SUBMIT</button>
            </div>
            <button class="btn delete">DELETE</button>
            <div class="movie-review">${movie.review || ""}</div>
    `;
        const deleteBtn = card.querySelector('.btn.delete');
        deleteBtn.addEventListener('click', async () => {
            await deleteMovie(movie.id);
            card.remove();
        });
        const submitBtn = card.querySelector('.btn.submit-review');
        submitBtn.addEventListener('click', async () => {
            const reviewInput = card.querySelector('.review-input')
            const review = reviewInput.value;
            // Here you can add code to save the review to your backend or do something else with it.
            movie.review = review; // Save the review in the movie object
            const movieReviewDiv = card.querySelector('.movie-review');
            movieReviewDiv.textContent = review; // Display the review in the card
            reviewInput.value = "";
        });
        document.querySelector('#movies').appendChild(card);
        return card
    });
}





    renderMovie(movies);


//     const filterMovies = (movies, search) => {
//         console.log(movies)
//         return movies.filter(movie => movie.title.includes(search))
//     }
//
// // const filterMovies = (movies, search) => {console.log(movies)
// //     return movies.filter(movie => movie.title.includes(search))}
//
//  const filteredMovies = filterMovies(movies, searchQuery)
//     console.log(searchQuery)
//     console.log(filteredMovies);

    const filterMovies = (movies, search) => {
        console.log(movies)
        return movies.filter(movie => movie.title.includes(search))
    }
    const filteredMovies = filterMovies(movies, searchQuery)
    console.log(searchQuery)
    console.log(filteredMovies);





//     document.querySelector('#movies').appendChild(card);
//     return card;
// }


// const renderEditMovie = async (movie) => {
//     const
// }


renderMovie(movies)


///////////////////////////////// IFFE ///////////////////










})();






