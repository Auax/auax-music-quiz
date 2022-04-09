import React from "react";
import { withRouter, useParams, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

import * as variables from "./premade/Variables"
import ProgressBar from "./premade/ProgressBar";

const Play = () => {
    // Get the genre and gamemode from the URL 
    const { gamemode } = useParams();
    const genreIdentifier = new URL(window.location.href).searchParams.get("q");
    const genresClass = new variables.MusicGenres(); // Genres class instance

    // Assert the genre exists
    const genre = genresClass.getGenre(genreIdentifier);
    if (genre === null) {
        return <Redirect to="/play" />
    }

    // Send POST req to server to get a new auth link
    axios.get(process.env.REACT_APP_API_URL + `/api/get/${genreIdentifier}`)
        .then(response => {
            // Handle success
            if (response.status === 200) {
                console.log(response)
            }
            else {
                console.error("Error getting Spotify auth link: " + response.status);
                return null;
            }
        })
        .catch(response => {
            // Handle error
            console.error(response);
            return null;
        });

    // TODO: Check that the gamemode exists

    // Round settings
    let round = "Round 1";
    let time = 15;


    return (
        <div className="dark:bg-c-black bg-neutral-100 overflow-auto">
            <div className="container mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold dark:text-neutral-100 text-neutral-900 s
                m:px-0 tracking-tight mt-12 capitalize">{round}</h1>
                <p className="dark:text-neutral-300 text-neutral-900 mt-2">Guess the song and the artist!</p>

                <div className="my-5 text-left">
                    <span className="text-sm dark:text-neutral-300 text-neutral-600">Time remaining: {time}s</span>
                    <ProgressBar bgcolor="#005FFF" completed="0" />
                </div>

                <input type="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-5  
                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 
                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                dark:focus:border-blue-500" placeholder="Song or artist's name" required autoComplete="off" />
            </div>
        </div>
    );
}

export default withRouter(Play);