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
        <button class="btn delete">DELETE</button>
    `;
    const deleteBtn = card.querySelector('.btn.delete');
    deleteBtn.addEventListener('click', async () => {
        await deleteMovie(movie.id);
        card.remove();
    });
    document.querySelector('#movies').appendChild(card);
    return card
});
}


    renderMovie(movies);


// const filteredMovies = filterMovies(movies, searchQuery)
//     console.log(searchQuery)
// console.log(filteredMovies);







//     document.querySelector('#movies').appendChild(card);
//     return card;
// }


// const renderEditMovie = async (movie) => {
//     const
// }

// createMovie(movies);
// renderMovie(movies);


///////////////////////////////// IFFE ///////////////////

    const newMovie = {
        title: "The New Movie",
        genre: "Action",
        rating: 4.6
    };

    createMovie(newMovie)
        .then(createdMovie => {
            console.log("New movie created:", createdMovie);
        })
        .catch(error => {
            console.error("Error creating the movie:", error);
        });







})();






