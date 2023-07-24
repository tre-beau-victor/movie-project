"use strict";

const DOMAIN = "http://localhost:3000";

const getID = async () => {
    const response = await fetch(`${DOMAIN}/id`);
    const id = await response.json();
    return id;
}












