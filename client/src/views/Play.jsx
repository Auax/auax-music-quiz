import React, { useState, useRef, useEffect } from "react";
import { withRouter, useParams, Redirect } from "react-router-dom";
import Countdown from 'react-countdown';
import axios from 'axios';
import stringSimilarity from 'string-similarity';
import * as MetadataFilter from 'metadata-filter';

import * as variables from "Variables"
import ProgressBar from "components/ProgressBar";
import Modal from "components/Modal";

// Countdown renderer (the text we display while performing the countdown)
const countdownRenderer = ({ seconds, completed }) => {
    if (completed) {
        return <span className="countdown-span">Time's up!</span>
    }
    else {
        return <span className="countdown-span">Time remaining: {seconds}s</span>;
    }
}

const assertGenreExists = (redirectTo: string) => {
}

const Play = () => {
    const progressBarRef = useRef();
    const countdownRef = useRef();
    const modalRef = useRef();
    // Function to start the countdown (call it as soon as we load the song)
    // We do not autostart the countdown because we don't know how long will it take
    // to load the song
    const countdownStart = () => { countdownRef.current.start() };
    const progressBarStart = () => { progressBarRef.current.start() };

    // Get the genre and gamemode from the URL
    // TODO: Check that the gamemode exists
    const { gamemode } = useParams(); // "solo" or "multiplayer"

    // Round variables
    const time = 20;
    const totalRounds = 10;
    const similarityThreshold = 0.7; // How similar the guess must be to the answer to be correct
    const [playing, setPlaying] = useState(false);
    const [round, setRound] = useState(1);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isArtistCorrect, setIsArtistCorrect] = useState(false);
    const [isNameCorrect, setisNameCorrect] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [loadingErrors, setLoadingErrors] = useState(0);
    const loadingErrorRetries = 1;

    //We're pulling this by ID - use the uuid library to avoid collisions if you have multiple 
    const audioControlId = "use-uuid-if-multiple-on-page"
    const [audioControl, setAudioControl] = useState(null);
    const [audioSource, setAudioSource] = useState(null);
    let hasUserInteracted = false; // User must interact with the document to play an audio

    // Executed ONLY once (when the component is mounted)
    useEffect(() => {
        // Get the music genre identifier from the URL
        const genreIdentifier = new URL(window.location.href).searchParams.get("q");
        // Genres className instance
        const genresClass = new variables.MusicGenres();

        // Assert the genre exists, if not, redirect to "/play"
        const genre = genresClass.getGenre(genreIdentifier);
        if (genre === null) {
            return <Redirect to="/play" />
        }

        // Send POST req to server to get a new auth link
        axios.get(process.env.REACT_APP_API_URL + `/api/get/${genreIdentifier}/${totalRounds}`)
            .then(response => {
                // Handle success
                if (response.status === 200) {
                    // Remove "remastered" and other useless string tags from the song's name
                    const filterSet = {
                        track: [
                            MetadataFilter.removeRemastered,
                            MetadataFilter.fixTrackSuffix,
                            MetadataFilter.removeLive,
                            MetadataFilter.removeCleanExplicit,
                            MetadataFilter.removeVersion,
                            MetadataFilter.removeFeature,
                            MetadataFilter.removeParody,
                            MetadataFilter.removeZeroWidth
                        ],
                    };
                    const filter = MetadataFilter.createFilter(filterSet);

                    let songs_ = []
                    response.data.forEach(song => {
                        song["name"] = filter.filterField("track", song["name"]);
                        songs_.push(song);
                    });

                    setSongs(songs_);
                    console.log(songs_);
                    setCurrentSong(response.data[round - 1]);
                    if (isLoading) setLoading(false); // Set loading to false
                }

                else {
                    console.error("Error retrieving the songs. Error code: " + response.status);
                    return null;
                }
            })
            .catch(response => {
                // Handle error
                setLoadingErrors(loadingErrors + 1);
                console.error(response);
                return null;
            });
    }, []);

    // On change round
    useEffect(() => {
        setCurrentSong(songs[round - 1]);
    }, [round]);

    // On change song
    useEffect(() => {
        if (round > 1) nextRound(currentSong.preview_url);
    }, [currentSong]);

    // On show answer changes
    useEffect(() => {
        if (!playing) return;
        if (showAnswer) {
            modalRef.current.setVisible(true);
            // Show answer for x time and then pass to the next round
            setTimeout((() => {
                modalRef.current.setVisible(false);
                setShowAnswer(false);
            }),
                5000
            );
        }
        else {
            // Go to next round
            if (round < totalRounds) setRound(round + 1);
            else {
                // Call finishGame
                setPlaying(false);
            }
        }

    }, [showAnswer]);

    const nextRound = (url) => {
        // Audio
        audioSource.src = url;
        audioControl.load();
        audioControl.play();

        countdownStart();
        progressBarStart();

        console.log(`Set audioSource URL to: ${audioSource.src}`);
        console.log(`Starting Round: ${round}`);
    }

    const startRound = () => {
        hasUserInteracted = true;
        // Audio
        let tempAudioSource = document.querySelector("#audioSource");
        let tempAudioControl = document.querySelector(`#${audioControlId}`);
        setAudioSource(tempAudioSource);
        setAudioControl(tempAudioControl);
        tempAudioSource.src = currentSong.preview_url; // Change the audio source
        tempAudioControl.play(); // Start the audio

        // Start the countdown
        countdownStart();
        // Start the progressbar
        progressBarStart();

        // Remove the start button
        document.querySelector("#startRoundBtn").style.display = "none";

        setPlaying(true);

        console.log(`Set audioSource URL to: ${tempAudioSource.src}`);
        console.log(`Starting Round: ${round}`);
    }

    const onFinishCountdown = () => {
        // Stop the audio
        audioControl.pause();
        audioControl.currentTime = 0;

        // Wait to show answer
        setShowAnswer(true);
    }

    const checkAnswer = (event) => {
        if (event.key !== 'Enter') return;
        if (!playing) { event.target.value = ""; return; }
        let answer = (event.target.value).toLowerCase(); // Get answer in lowercase
        let similarityWithArtist = stringSimilarity.compareTwoStrings(answer, currentSong.artist.toLowerCase());
        let similarityWithSong = stringSimilarity.compareTwoStrings(answer, currentSong.name.toLowerCase());

        if (similarityWithArtist > similarityWithSong && similarityWithArtist > similarityThreshold) {
            console.log(`Correct! ${currentSong.artist} is the artist!`);
        }

        else if (similarityWithSong > similarityWithArtist && similarityWithSong > similarityThreshold) {
            console.log(`Correct! ${currentSong.name} is the song!`);
        }
        else {
            console.log("Incorrect");
        }

        event.target.value = ""; // Clear value
    }


    // Before fetching song
    if (isLoading) {
        return (
            <div className="hero-height bg-base-300 text-center overflow-hidden">
                <div className="mt-48">

                    {loadingErrors >= loadingErrorRetries ?
                        <div className="">
                            <span className="font-semibold">Error loading song. Please try again.</span>
                            <h1 className="text-9xl select-none">:(</h1>
                        </div>
                        :
                        <div>
                            <span className="font-semibold">Loading songs...</span>
                            <br />
                            <svg role="status" className="inline mt-4 mr-2 w-10 h-10 animate-spin fill-info" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>}
                </div>
            </div>
        );
    }

    // Final render
    return (
        <div className="hero-height bg-base-300">
            <Modal
                isVisible={showAnswer}
                name={currentSong.name}
                artist={currentSong.artist}
                image={currentSong.image}
                ref={modalRef} />

            <div className="container mx-auto text-center">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight pt-12 capitalize">Round {round}</h1>
                <p className="text-base-content/50 mt-2">Guess the song and the artist!</p>

                {hasUserInteracted === false ? <button id="startRoundBtn" className="btn font-bold btn-primary mt-4" onClick={startRound}>Start</button> : null}

                <div className="my-5 text-left">
                    <Countdown
                        date={Date.now() + time * 1000}
                        renderer={countdownRenderer}
                        autoStart={false}
                        ref={countdownRef}
                        onComplete={() => onFinishCountdown()} />

                    <ProgressBar
                        bgcolor="#005FFF"
                        completed="0"
                        time={time * 1000}
                        ref={progressBarRef} />
                </div>

                <audio id={audioControlId} controls preload="auto" className="hidden">
                    <source src={currentSong.preview_url} id="audioSource" type="audio/mpeg" />
                </audio>

                <input type="text" placeholder="Song or artist's name" className="input w-full" required autoComplete="off" onKeyDown={checkAnswer} ></input>
            </div>
        </div>
    );
}

export default withRouter(Play);