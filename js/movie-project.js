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
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(chicken)
    };
    const response = await fetch(`${DOMAIN}`, options);
    const apiResponse = await response.json();
    return apiResponse;
}

const chicken = {
    title: "chicken little",
    genre: "akfbarugraevgak",
    rating: 5
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







