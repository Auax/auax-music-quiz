import React, {useState, useEffect, useRef} from 'react';
import {withRouter, useLocation, useHistory} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import stringSimilarity from "string-similarity";

import * as variables from "Variables";
import {Modal, ProgressBar, useCountdown, useScore} from 'components';
import {fetchTracks} from "api";
import Track from "./Track";

const AssertMusicGenre = (identifier: string, redirect_to: string = "/play", history: any) => {
    // Genres className instance
    const genresClass = new variables.MusicGenres();

    // Assert the genre exists, if not, redirect to "/play"
    const genre = genresClass.getGenre(identifier);
    if (genre === null) {
        history.push(redirect_to);
    }
}

const Game = (props) => {
    const location = useLocation();
    const history = useHistory();

    const similarityThreshold = 0.7; // How similar the guess must be to the answer to be correct

    // UseState variables
    const [tracks, setTracks] = useState(null);
    const [currentTrackNo, setCurrentTrackNo] = useState(0);
    const [gameState, setGameState] = useState("init");

    const [roundAnswer, setRoundAnswer] = useState({
        "show": false,
        "artist": false,
        "song": false
    });
    const setShowRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, show: b}));
    const setArtistRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, artist: b}));
    const setSongRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, song: b}));

    const [throwError, setThrowError] = useState(null);
    const {countdown, startCountdown, pauseCountdown, resetCountdown, printTime} = useCountdown(props.timePerRound);
    const {score, scoreAddPoint, resetScore} = useScore();

    // Fetch the tracks (already shuffled and filtered) from the server
    useEffect(() => {
        AssertMusicGenre(location.state.mg, "/play", history);

        const execute = async () => {
            const fetchedTracks = await fetchTracks(
                location.state.mg, // Music genre
                location.state.tn, // Tracks number
            );
            setTracks(fetchedTracks);
        };
        execute().then(() => {
            if (tracks == null) setThrowError("Error loading the songs!");
        });
    }, []);

    // Game states
    useEffect(() => {
        switch (gameState) {
            case "init":
                resetScore();
                resetCountdown();
                setCurrentTrackNo(0);
                break;

            case "started":
                startCountdown();
                break;

            case "paused":
                pauseCountdown();
                break;

            case "finished":
                pauseCountdown();
                break;

            default:
                break;
        }
    }, [gameState]);

    useEffect(() => {
        // Countdown finished
        if (countdown > 0) return;
        setShowRoundAnswer(true);
        setArtistRoundAnswer(false);
        setSongRoundAnswer(false);
        setGameState("paused");
        document.querySelector("#userInput").value = "";

        setTimeout((() => {
            resetCountdown();
            setShowRoundAnswer(false);
            setGameState("started");
            setCurrentTrackNo(currentTrackNo + 1);
        }), 5000);
    }, [countdown]);

    const checkAnswer = (event) => {
        if (event.key !== 'Enter') return;
        if (gameState !== "started") {
            event.target.value = "";
            return;
        }
        let track = tracks[currentTrackNo];
        let inputAnswer = (event.target.value).toLowerCase(); // Get answer in lowercase

        let similarityWithSong = stringSimilarity.compareTwoStrings(inputAnswer, track.name.toLowerCase());
        let similarityWithArtist = stringSimilarity.compareTwoStrings(inputAnswer, track.artist.toLowerCase());

        // Artist
        if (!roundAnswer.artist) {
            if (similarityWithArtist > similarityWithSong && similarityWithArtist > similarityThreshold) {
                scoreAddPoint();
                setArtistRoundAnswer(true);
                toast.success(<span><b>{track.artist}</b> is the artist!</span>);

                console.log(`Correct! ${track.artist} is the artist!`);
            }
        }

        // Song
        if (!roundAnswer.song) {
            if (similarityWithSong > similarityWithArtist && similarityWithSong > similarityThreshold) {
                scoreAddPoint();
                setSongRoundAnswer(true);
                toast.success(<span><b>{track.name}</b> is the song!</span>);
                console.log(`Correct! ${track.name} is the song!`);
            }
        }

        event.target.value = ""; // Clear value
    }

    // While fetching songs
    if (tracks == null) {
        return (
            <div className="hero-height bg-base-300 text-center overflow-hidden">
                <div className="mt-48">
                    {throwError ?
                        <div className="">
                            <span className="font-semibold">{throwError} Please try again.</span>
                            <h1 className="text-9xl select-none">:(</h1>
                        </div>
                        :
                        <div>
                            <span className="font-semibold">Loading songs...</span>
                            <br/>
                            <svg role="status" className="inline mt-4 mr-2 w-10 h-10 animate-spin fill-info"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div>}
                </div>
            </div>
        );
    }

    // Once the songs are loaded
    return (
        <div className="hero-height bg-base-300">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Modal
                track={tracks[currentTrackNo]}
                show={roundAnswer.show}
            />
            <div className="container mx-auto text-center px-4">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight pt-12 capitalize">Round {currentTrackNo + 1}</h1>


                {gameState === "init"
                    ? // Init
                    <div>
                        <p className="text-base-content/50 mt-2">Guess the song and the artist!</p>
                        <button id="startRoundBtn"
                                className={`btn font-bold btn-primary mt-4 ${gameState === "init" ? "visible" : "hidden"}`}
                                onClick={() => {
                                    setGameState("started")
                                }}>Start
                        </button>
                    </div>
                    : // Started
                    <div>
                        <span>Score: {score.correct} / {props.totalRounds * 2}</span>
                    </div>
                }

                <div className="my-5 text-left">
                    <span>{printTime()}</span>
                    <ProgressBar
                        bgcolor="#005FFF"
                        run={gameState === 'started'}
                        time={props.timePerRound}/>
                </div>
                <Track track={tracks[currentTrackNo]} running={gameState === 'started'}/>
                <input type="text" placeholder="Song or artist's name" className="input w-full"
                       autoComplete="off" onKeyDown={checkAnswer} id="userInput"/>
            </div>
        </div>
    );
}

Game.defaultProps = {
    timePerRound: 20,
    totalRounds: 10,
};

export default withRouter(Game);