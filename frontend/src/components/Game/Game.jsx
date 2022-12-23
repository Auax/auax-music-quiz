import React, {useState, useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import stringSimilarity from "string-similarity";
import styled from "styled-components";
import {BsFillPauseFill, BsFillPlayFill, BsFillSkipEndFill} from "react-icons/bs";

import {useCountdown, useScore} from 'components';
import {AnswerModal, InputAnswer, ProgressBar, ScoreModal, Track, VolumeSlider} from "./GameComponents";
import {IdDoesNotExist, InvalidPlaylistId, TooManyRequests,} from "api/exceptions";
import {fetchGameData} from "api/Api";
import LoaderScreen from "components/Loading/LoaderScreen";
import {Container} from "util/Styles";


const GameControlsContainer = styled.div`
  text-align: left;
  display: flex;
  margin-top: 5px;

  & button, div {
    margin-right: 5px;
  }
`;

const PlaylistBgImage = styled.div`
  background-image: ${({img}) => `URL(${img})`};
  background-size: cover;
  background-position-y: 40%;
  filter: opacity(0.3) blur(10px);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  height: 60%;
  width: 100%;
  top: 0%;
  position: absolute;
  z-index: 0;
`

// TODO: fix progress bar progression when window's not focused
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
    const [playlistName, setPlaylistName] = useState("");
    const [playlistImage, setPlaylistImage] = useState("");

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
            const fetchedGameData = await fetchGameData(
                playlist_id, // Music genre
                tn, // Tracks number
            );

            // Set the tracks
            const fetchedTracks = fetchedGameData.songs;
            setTracks(fetchedTracks);

            // Set playlist's name and image
            setPlaylistName(fetchedGameData.playlist.name);
            setPlaylistImage(fetchedGameData.playlist.image);

            // Check that if we got fewer tracks than requested
            if (fetchedTracks.length < tn) {
                setTn(fetchedTracks.length);
                // Alert user
                toast(<p>Could only get {fetchedTracks.length} songs! This might be because the playlist has less songs
                    than the rounds set.</p>, {icon: "ℹ️", duration: 4000})
            }
        };
        execute().catch((error) => {
            switch (error.constructor) {
                case InvalidPlaylistId:
                    setThrowError("Please, specify a playlist ID!");
                    break;
                case IdDoesNotExist:
                    setThrowError("The specified playlist ID does not exist!");
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

            case "start":
                startCountdown();
                break;

            case "pause":
                pauseCountdown();
                break;

            case "next":
                zeroCountdown();

            case "finish":
                pauseCountdown();
                break;

            default:
                break;
        }
    }, [gameState]);

    useEffect(() => {
        // Countdown finished
        if (countdown > 0) return;
        if (gameState !== "next") setGameState("next");
        setShowRoundAnswer(true);
        setArtistRoundAnswer(false);
        setSongRoundAnswer(false);
        resetCountdown();

        document.querySelector("#userInput").value = "";
        setTimeout((() => {
            setShowRoundAnswer(false);
            if (currentTrackNo + 1 >= tn) setGameState("finish"); // Finish game
            else {
                setGameState("start");
                setCurrentTrackNo(currentTrackNo + 1);
            }
        }), 4000);
    }, [countdown]);

    const checkAnswer = (event, inputRef) => {
        if (event.key !== "Enter" && event.type !== "click") return;
        if (gameState !== "start") {
            inputRef.current.value = "";
            return;
        }
        let track = tracks[currentTrackNo];
        let inputAnswer = (inputRef.current.value).toLowerCase(); // Get answer in lowercase

        // Compare strings (punctuation removed in the comparison)
        let similarityWithSong = stringSimilarity.compareTwoStrings(inputAnswer, track.title.toLowerCase().replace(/[.,/#!$%&;:{}=\-_`~()]/g, ""));
        // Compare all artists
        let similarityWithArtist = 0;
        let guessedArtist;
        track.artists.forEach(artist => {
            const similarity = stringSimilarity.compareTwoStrings(inputAnswer, artist.name.toLowerCase().replace(/[.,/#!$%&;:{}=\-_`~()]/g, ""));
            // New better guess
            if (similarity >= similarityWithArtist) {
                similarityWithArtist = similarity;
                guessedArtist = artist.name;
            }
        });

        // Artist
        if (!roundAnswer.artist) {
            if (similarityWithArtist > similarityWithSong && similarityWithArtist > similarityThreshold) {
                scoreAddPoint();
                setArtistRoundAnswer(true);
                toast.success(<span><b>{guessedArtist}</b> is the artist!</span>);

                console.log(`Correct! ${guessedArtist} is the artist!`);
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
        <div className="bg-base200 hero-height align-middle">
            <LoaderScreen throwError={throwError} loadingMsg={"Loading songs..."}/>
        </div>);

    if (gameState === "finish") {
        return <ScoreModal score={score.correct} maxScore={tn * 2} show={true} tracks={tracks}/>;
    }

    // Once the songs are loaded
    return (
        <div className="hero-height bg-base200">
            <Toaster position="top-center" reverseOrder={false}/>
            <AnswerModal track={tracks[currentTrackNo]} show={roundAnswer.show}/>
            <PlaylistBgImage img={playlistImage}/>
            <Container className="mx-auto text-center px-4 z-10 relative">
                <h1 className="text-neutral-200 text-5xl md:text-7xl font-bold sm:px-0 tracking-tight pt-12 mb-2">{playlistName}</h1>
                {gameState === "init"
                    ? // Init
                    <div>
                        <button id="startRoundBtn"
                                className="btn btn-primary font-bold mt-4 uppercase px-7"
                                onClick={() => {
                                    setGameState("start")
                                }}>Play
                        </button>
                    </div>
                    : // start
                    <div>
                        <span className="text-neutral-300 text-xl font-bold">Score: {score.correct} / {tn * 2}</span>
                        <br/>
                        <button id="startRoundBtn"
                                className="btn btn-primary font-bold mt-4"
                                onClick={() => {
                                    setGameState("finish")
                                }}>End game
                        </button>
                    </div>
                }
                <div className="my-5 text-left text-neutral-300">

                    <div className="flex justify-between font-bold">
                        <span>{printTime()}</span>
                        <span>ROUND {currentTrackNo + 1}</span>
                    </div>

                    <ProgressBar
                        bgcolor="#005FFF"
                        gameState={gameState}
                        initTime={props.timePerRound}
                        time={countdown}/>
                </div>
                <Track track={tracks[currentTrackNo]} running={gameState === 'start'}
                       setPause={(p) => setGameState(p ? "pause" : "start")} volume={volume}/>
                <InputAnswer submitAnswer={checkAnswer}/>
                <GameControlsContainer>
                    <button id="pauseBtn"
                            className="btn bg-neutral-600/30 hover:bg-neutral-500/50 transition-all text-white font-bold h-12"
                            onClick={() => {
                                if (gameState === "pause" || gameState !== "start") setGameState("start");
                                else setGameState("pause");
                            }}>
                        {gameState === "pause" || gameState !== "start" ?
                            <BsFillPlayFill size={"1.5em"}/> :
                            <BsFillPauseFill size={"1.5em"}/>
                        }
                    </button>
                    <button id="skipRoundBtn"
                            className="btn bg-neutral-600/30 hover:bg-neutral-500/50 transition-all text-white font-bold h-12"
                            onClick={() => {
                                if (gameState === "start" || gameState === "pause") setGameState("next");
                            }}>
                        <BsFillSkipEndFill size={"1.5em"}/>
                    </button>
                    <VolumeSlider volumeSetter={setVolume}/>
                </GameControlsContainer>
            </Container>
        </div>
    );
}

Game.defaultProps = {
    timePerRound: 20,
};

export default withRouter(Game);