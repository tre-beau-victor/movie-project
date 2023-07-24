"use strict";

const DOMAIN = " http://localhost:3000/movies";

const getMovie = async (id) => {
    const response = await fetch(`${DOMAIN}/${id}`);
    const movie = await response.json();
    return movie;
}

const createMovie = async (movie) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(movie)
    };
    const response = await fetch(`${DOMAIN}/${movie}`, options);
    const apiResponse = response.json();
    return apiResponse;
}










