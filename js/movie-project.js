"use strict";

const DOMAIN = "http://localhost:3000/movies";

const getMovie = async (id) => {
    const response = await fetch(`${DOMAIN}/${id}`);
    const movie = await response.json();
    return movie;
}

const createMovie = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    };
    console.log(options)
    const response = await fetch(`${DOMAIN}`, options);
    const apiResponse = await response.json();
    return apiResponse;
}




// function movieSearch(){
//     let searched = movieSelection.value;
//     let filterSearch = [];
//
//     for (let i = 0; i < ; i++) {
//
//     }
// }
//
// let movieSelection = document.querySelector(`#movieSelection`);
// movieSelection.addEventListener('keyup', movieSelection);




createMovie();







