import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import stringSimilarity from "string-similarity";

import {useCountdown, useScore} from 'components';
import {AnswerModal, InputAnswer, ProgressBar, ScoreModal, Track, VolumeSlider} from "./GameComponents";
import {InvalidPlaylistId, TooManyRequests,} from "api/exceptions";
import {fetchTracks} from "api/Api";
import LoaderScreen from "components/Loading/LoaderScreen";

// TODO: fix progress bar progression when window's not focused
// TODO: ADD skip button and volume controller
const Game = (props) => {
    const location = new URL(window.location.href);
    // Tracks number
    let toSetTn = location.searchParams.get("tn");
    const [tn, setTn] = useState(toSetTn <= 50 ? toSetTn : 50);
    // Custom playlist ID (only in 'custom' mode)
    const playlist_id = location.searchParams.get("id");
    // How similar the guess must be to the answer to be correct
    const similarityThreshold = 0.7;

    // UseState variables
    const [tracks, setTracks] = useState(null);
    const [currentTrackNo, setCurrentTrackNo] = useState(0);
    const [gameState, setGameState] = useState("init");
    const [volume, setVolume] = useState(100);

    const [roundAnswer, setRoundAnswer] = useState({
        "show": false,
        "artist": false,
        "song": false
    });
    const setShowRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, show: b}));
    const setArtistRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, artist: b}));
    const setSongRoundAnswer = (b: boolean) => setRoundAnswer(prev => ({...prev, song: b}));

    const [throwError, setThrowError] = useState(null);
    const {
        countdown,
        startCountdown,
        pauseCountdown,
        resetCountdown,
        zeroCountdown,
        printTime
    } = useCountdown(props.timePerRound);
    const {score, scoreAddPoint, resetScore} = useScore();


    // Fetch the tracks (already shuffled and filtered) from the server
    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await fetchTracks(
                playlist_id, // Music genre
                tn, // Tracks number
            );
            setTracks(fetchedTracks);
            if (fetchedTracks.length < tn) {
                setTn(fetchedTracks.length);
                toast(<p>Could only get {fetchedTracks.length} songs! This might be because the playlist has less songs
                    than the rounds set.</p>, {icon: "ℹ️", duration: 4000})
            }
        };
        execute().catch((error) => {
            switch (error.constructor) {
                case InvalidPlaylistId:
                    setThrowError("Invalid playlist ID!");
                    break;
                case TooManyRequests:
                    setThrowError("Too many requests (429) please wait some time!");
                    break;
                default:
                    setThrowError("Error loading the songs!");
            }
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
            if (currentTrackNo + 1 >= tn) setGameState("finished"); // Finish game
            else {
                setGameState("started");
                setCurrentTrackNo(currentTrackNo + 1);
            }
        }), 4000);
    }, [countdown]);

    const checkAnswer = (event, inputRef) => {
        if (event.key !== "Enter" && event.type !== "click") return;
        if (gameState !== "started") {
            inputRef.current.value = "";
            return;
        }
        let track = tracks[currentTrackNo];
        let inputAnswer = (inputRef.current.value).toLowerCase(); // Get answer in lowercase

        // Compare strings (punctuation removed in the comparison)
        let similarityWithSong = stringSimilarity.compareTwoStrings(inputAnswer, track.title.toLowerCase().replace(/[.,\/#!$%&;:{}=\-_`~()]/g, ""));
        let similarityWithArtist = stringSimilarity.compareTwoStrings(inputAnswer, track.artist.toLowerCase().replace(/[.,\/#!$%&;:{}=\-_`~()]/g, ""));

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
                toast.success(<span><b>{track.title}</b> is the song!</span>);
                console.log(`Correct! ${track.title} is the song!`);
            }
        }

        inputRef.current.value = ""; // Clear value
    }

    // While fetching songs
    if (tracks == null) return (
        <div className="hero-height align-middle">
            <LoaderScreen throwError={throwError} loadingMsg={"Loading songs..."}/>
        </div>);

    if (gameState === "finished") {
        return <ScoreModal score={score.correct} maxScore={tn * 2} show={true} tracks={tracks}/>;
    }

    // Once the songs are loaded
    return (
        <div className="hero-height bg-base-300">
            <Toaster position="top-center" reverseOrder={false}/>
            <AnswerModal track={tracks[currentTrackNo]} show={roundAnswer.show}/>
            <div className="container mx-auto text-center px-4">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight pt-12 capitalize mb-2">Round {currentTrackNo + 1}</h1>
                {gameState === "init"
                    ? // Init
                    <div>
                        <p className="text-base-content/50 mt-2">Guess the song and the artist!</p>
                        <button id="startRoundBtn"
                                className="btn font-bold btn-primary mt-4"
                                onClick={() => {
                                    setGameState("started")
                                }}>Start
                        </button>
                    </div>
                    : // Started
                    <div>
                        <span>Score: {score.correct} / {tn * 2}</span>
                        <br/>
                        <button id="startRoundBtn"
                                className="btn font-bold btn-primary mt-4"
                                onClick={() => {
                                    setGameState("finished")
                                }}>End game
                        </button>
                    </div>
                }
                <div className="my-5 text-left">
                    <span>{printTime()}</span>
                    <ProgressBar
                        bgcolor="#005FFF"
                        run={gameState === 'started'}
                        time={props.timePerRound}/>
                </div>
                <Track track={tracks[currentTrackNo]} running={gameState === 'started'} volume={volume}/>
                <InputAnswer submitAnswer={checkAnswer}/>
                <div className="text-left flex justify-start items-center mt-2">
                    <button id="skipRoundBtn"
                            className="btn btn-ghost font-bold bg-base-100"
                            onClick={() => {
                                if (gameState === "started") zeroCountdown();
                            }}>
                        <svg className="text-base-content h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 4 15 12 5 20 5 4"/>
                            <line x1="19" y1="5" x2="19" y2="19"/>
                        </svg>
                    </button>
                    <VolumeSlider volumeSetter={setVolume}/>
                </div>
            </div>
        </div>
    );
}

Game.defaultProps = {
    timePerRound: 20,
};

export default withRouter(Game);