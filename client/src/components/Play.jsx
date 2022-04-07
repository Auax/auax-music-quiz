import React from "react";
import { withRouter, useParams, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

import * as variables from "./premade/Variables"


const spotifyLogin = () => {

    // Create cookies instance
    const cookies = new Cookies();

    // Check if the user is logged in with Spotify
    let spotifyToken = cookies.get("token");
    if (spotifyToken === undefined) {
        let formData = new FormData();
        formData.append("redirect_uri", window.location.href);

        // Check that the API url is defined
        const API_URL = process.env.REACT_APP_API_URL;
        if (API_URL == undefined) {
            console.error("API_URL is undefined");
            return;
        }

        // Send POST req to server to get a new auth link
        axios({
            method: "post",
            url: API_URL + "/api/spotify/login",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                // Handle success
                if (response.status === 200) {
                    window.location.href = response.data;
                }
                else {
                    console.error("Error getting Spotify auth link: " + response.status);
                    return null;
                }
            })
            .catch(function (response) {
                // Handle error
                console.error(response);
                return null;
            });

    } else {
        // Set cookie
        cookies.set("token", spotifyToken, { path: "/" });
    }
}

const Play = () => {

    spotifyLogin();

    // Get the genre and gamemode from the URL 
    const { gamemode } = useParams();
    const genreIdentifier = new URL(window.location.href).searchParams.get("q");
    const genresClass = new variables.MusicGenres(); // Genres class instance

    // Assert the genre exists
    const genre = genresClass.getGenre(genreIdentifier);
    if (genre === null) {
        return <Redirect to="/play" />
    }

    // TODO: Check that the gamemode exists


    return (
        <div className="dark:bg-c-black bg-neutral-100 overflow-auto">
            <div className="container mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold dark:text-neutral-100 text-neutral-900 sm:px-0 tracking-tight mt-12 capitalize">{gamemode}</h1>
                <p className="dark:text-neutral-300 text-neutral-900 mt-2">Your game will start soon.</p>
                <div className="card-container py-6 px-4 flex flex-wrap justify-center ">

                </div>
            </div>
        </div>
    );
}

export default withRouter(Play);