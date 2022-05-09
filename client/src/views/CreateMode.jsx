import React from "react";
import {Link, withRouter} from "react-router-dom";
import * as queryString from "query-string";


const CreateMode = () => {

    const createGame = (e) => {
        let playlistId = document.getElementById("playlistId").value;
        let nOfTracks = document.getElementById("tracksNumber").value;
        window.location.replace("/play?" + queryString.stringify({mg: "custom", tn: nOfTracks, id: playlistId}));
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div className="hero-height hero-create-page bg-base-300 overflow-auto">
            <div className="text-center px-4 sm:px-5 px-0">
                <h1 className="text-5xl md:text-7xl font-bold sm:px-0 tracking-tight mt-12 text-white">Create Mode</h1>
                <form className="bg-base-100 p-10 mt-6 rounded text-left w-full md:w-3/5 lg:w-1/3 mx-auto">
                    <h2 className="text-2xl">Settings</h2>
                    <label className="label"><span className="label-text">Spotify playlist URL</span></label>
                    <input type="text" name="playlistId" id="playlistId" placeholder="URL"
                           className="input bg-base-200 w-full"
                           autoComplete="off" required/>
                    <label className="label mt-2"><span className="label-text">Number of tracks</span></label>
                    <input type="number" name="tracksNumber" id="tracksNumber" defaultValue="10" max="50" min="2"
                           placeholder="10"
                           className="input bg-base-200 w-full"
                           autoComplete="off"/>
                    <input type="submit" onSubmit={(e) => createGame(e)} className="btn btn-primary mt-5 px-10"
                           value="Play"/>
                </form>
                <Link to="/choose">
                </Link>
            </div>
        </div>
    );
}

export default withRouter(CreateMode);