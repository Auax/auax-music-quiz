import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import * as queryString from "query-string";
import {extractPlaylistId} from "../api/api";
import {Toaster, toast, useToasterStore} from "react-hot-toast";


const CreateMode = () => {
    const {toasts} = useToasterStore();
    const TOAST_LIMIT = 2

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);

    const createGame = (e) => {
        let playlistId = document.getElementById("playlistId").value;
        let nOfTracks = document.getElementById("tracksNumber").value;
        let id = extractPlaylistId(playlistId);
        if (!id) toast.error(<span>Invalid Spotify playlist <b>URL</b> or <b>ID</b>!</span>);
        else {
            window.location.replace("/play?" + queryString.stringify({mg: "custom", tn: nOfTracks, id: id}));
        }
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <div className="hero-height hero-create-page bg-base-300 overflow-auto">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="text-center px-4 sm:px-5 px-0">
                <h1 className="text-5xl md:text-7xl font-bold sm:px-0 tracking-tight mt-12 text-white">Create Mode</h1>
                <form onSubmit={(e) => createGame(e)}
                      className="bg-base-100 p-10 mt-6 rounded text-left w-full md:w-3/5 lg:w-1/3 mx-auto">
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
                    <input type="submit" className="btn btn-primary mt-5 px-10"
                           value="Play"/>
                </form>
                <Link to="/choose">
                </Link>
            </div>
        </div>
    );
}

export default withRouter(CreateMode);