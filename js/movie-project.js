"use strict";
//////////////////////// global /////////////////////////////////////////
const DOMAIN = "http://localhost:3000/movies";

const getMovie = async () => {
    const response = await fetch(`${DOMAIN}`);
    const movies = await response.json();
    return movies;
}






////////////////////// functions ///////////////////////////////////////


const createMovie = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    };
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




const renderMovie = async (movieParam) => {
    const movieDiv = document.querySelector('#movies');
movieParam.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
         <img src="" />
        <h2>${movie.title}</h2>
        <button class="btn delete">DELETE</button>
    `;
    const deleteBtn = card.querySelector('.btn.delete');
    deleteBtn.addEventListener('click', async () => {
        await deleteMovie(movie.id);
        card.remove();
    });

})

};











//     document.querySelector('#movies').appendChild(card);
//     return card;
// }


// const renderEditMovie = async (movie) => {
//     const
// }




///////////////////////////////// IFFE ///////////////////
(async () => {
    createMovie();
    renderMovie();

    const movies = await getMovie();
    console.log(movies)
    renderMovie()




})();






