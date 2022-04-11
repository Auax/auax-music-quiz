import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams, Redirect } from "react-router-dom";
import Countdown from 'react-countdown';
import axios from 'axios';

import * as variables from "./premade/Variables"
import ProgressBar from "./premade/ProgressBar";

const getNewSong = (genreIdentifier) => {

}

const Play = () => {
    // Get countdown ref
    const countdownRef = useRef();
    // Function to start the countdown (call it as soon as we load the song)
    // We do not autostart the countdown because we don't know how long will it take
    // to load the song
    const countdownStart = () => countdownRef.current.start();

    // Round state variables
    const [isLoading, setLoading] = useState(true);
    const [round, setRound] = useState(1);
    const [time, setTime] = useState(15);
    const [song, setSong] = useState("");

    useEffect(() => {
        // let songAPI = getNewSong(genreIdentifier); // Get a new song API URL
        // Send POST req to server to get a new auth link
        axios.get(process.env.REACT_APP_API_URL + `/api/get/${genreIdentifier}`)
            .then(response => {
                // Handle success
                if (response.status === 200) {
                    setSong(response.data.song.split("/").at(-1)); // ID of track
                    setLoading(false);
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
    }, [round]); // Re-run effect if we change of round

    // Get the genre and gamemode from the URL
    // TODO: Check that the gamemode exists
    const { gamemode } = useParams(); // "solo" or "multiplayer"
    const genreIdentifier = new URL(window.location.href).searchParams.get("q");
    const genresClass = new variables.MusicGenres(); // Genres class instance

    // Assert the genre exists, if not, redirect to "/play"
    const genre = genresClass.getGenre(genreIdentifier);
    if (genre === null) {
        return <Redirect to="/play" />
    }

    // Round settings

    // Countdown renderer (the text we display while performing the countdown)
    const countdownRenderer = ({ seconds, completed }) => {
        if (completed) {
            return <span className="countdown-span">Time's up!</span>
        } else {
            // Render a countdown
            return <span className="countdown-span">Time remaining: {seconds}s</span>;
        }
    }

    console.log(document.querySelector('#songIframe > button'));


    if (isLoading) {
        return (
            <div className="hero-height text-center overflow-hidden">
                <div className="mt-48">
                    <span className="text-neutral-400">Loading song...</span>
                    <br/>
                    <svg role="status" className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="dark:bg-c-black bg-neutral-100 overflow-auto">
            <div className="container mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold dark:text-neutral-100 text-neutral-900 s
                m:px-0 tracking-tight mt-12 capitalize">Round {round}</h1>
                <p className="dark:text-neutral-300 text-neutral-900 mt-2">Guess the song and the artist!</p>

                <div className="my-5 text-left">
                    <Countdown date={Date.now() + time * 1000} renderer={countdownRenderer} autoStart={false} />

                    <ProgressBar bgcolor="#005FFF" completed="0" />
                </div>

                <iframe id="songIframe" src={`https://open.spotify.com/embed/track/${song}?utm_source=generator&theme=0`}
                    width="300" height="80" frameBorder="0" allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />

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