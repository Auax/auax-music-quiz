import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import * as queryString from "query-string";
import {Toaster, toast, useToasterStore} from "react-hot-toast";
import axios, {AxiosError} from "axios";
import {Buffer} from "buffer";


const CreateMode = () => {
    const {toasts} = useToasterStore();
    const [adminMode, setAdminMode] = useState(false);
    const [difficulty, setDifficulty] = useState(1);
    const [canCreate, setCanCreate] = useState(true);
    const TOAST_LIMIT = 2

    useEffect(() => {
        toasts
            .filter((t) => t.visible) // Only consider visible toasts
            .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
            .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
    }, [toasts]);


    const createGame = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setCanCreate(false);

        // Get and extract id
        let url = document.getElementById("playlistId").value;

        const regex = /playlist\/(.{22})/;
        const match = regex.exec(url);
        const id = match[1]
        if (!match || !id) {
            toast.error("Please input a valid URL!");
            return;
        }

        if (adminMode) {
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let title = document.getElementById("title").value;
            let genre = document.getElementById("genre").value;
            let image = document.getElementById("image").value;
            let difficulty = document.getElementById("difficulty").value;

            let base64encodedData = Buffer.from(username + ':' + password).toString('base64');

            axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL + "/api/post/create-mode",
                headers: {'Authorization': 'Basic ' + base64encodedData},
                data: {
                    pid: id,
                    title: title,
                    genre: genre.toLowerCase(),
                    image: image,
                    difficulty: difficulty
                }
            }).then(r => {
                if (r.status === 200) {
                    toast.success("Successfully created a new mode!");
                }

            }).catch((reason: AxiosError) => {
                if (reason.response.status === 401) toast.error(reason.response.data.detail, {style: {textTransform: "capitalize"}});
                else if (reason.response.status === 422) toast.error(
                    <span><b>Fix: </b>{reason.response.data.detail}!</span>);
                else toast.error(`Unknown error: ${reason}`);
            }).finally(() => setCanCreate(true));

        } else {
            let nOfTracks = document.getElementById("tracksNumber").value;
            if (!url) toast.error(<span>Invalid Spotify playlist <b>URL</b></span>);
            else {
                window.location.replace("/play?" + queryString.stringify({mg: "custom", tn: nOfTracks, id: id}));
            }
        }
    }

    return (
        <div className="hero-height bg-base300 overflow-auto">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="text-center px-4 sm:px-5 px-0 relative">
                <h1 className="text-5xl md:text-7xl font-bold sm:px-0 tracking-tight mt-12 text-white">Create Mode</h1>
                <form onSubmit={(e) => createGame(e)}
                      className="bg-base200/80 border border-white/10 px-10 pt-10 pb-7 my-6 rounded text-left w-full md:w-3/5 lg:w-1/3 mx-auto">
                    <h2 className="text-2xl font-bold text-white">Settings</h2>
                    <label className="text-white/50"><span>Paste any public playlist</span></label>
                    <input type="text" name="playlistId" id="playlistId" placeholder="Spotify playlist link"
                           className="input bg-base-200 w-full"
                           autoComplete="off" required/>
                    {!adminMode &&
                        (
                            <div className="mt-2">
                                <label className="text-white/50"><span>Number of tracks</span></label>
                                <input type="number" name="tracksNumber" id="tracksNumber" defaultValue="10" max="50"
                                       min="2"
                                       placeholder="10"
                                       className="input bg-base-200 w-full"
                                       autoComplete="off"/>
                            </div>)}

                    {adminMode &&
                        (
                            <div>
                                <div className="mt-2">
                                    <label className="text-white/50"><span>Mode title</span></label>
                                    <input type="text" name="title" id="title"
                                           placeholder="Title"
                                           className="input bg-base-200 w-full" required/>
                                </div>

                                <div className="mt-2">
                                    <label className="text-white/50"><span>Genre</span></label>
                                    <input type="text" name="genre" id="genre"
                                           placeholder="Genre (case sensitive)"
                                           className="input bg-base-200 w-full" required/>
                                </div>

                                <div className="mt-2">
                                    <label className="text-white/50"><span>Mode image <span
                                        className="text-base-content/50">(920x421)</span></span></label>
                                    <input type="text" name="image" id="image"
                                           placeholder="URL"
                                           className="input bg-base-200 w-full" required autoComplete="off"/>
                                </div>

                                <div className="mt-2">
                                    <label className="text-white/50"><span>Your username</span></label>
                                    <input type="text" name="username" id="username"
                                           placeholder="Username"
                                           className="input bg-base-200 w-full" required/>
                                </div>

                                <div className="mt-2">
                                    <label className="text-white/50"><span>Your password</span></label>
                                    <input type="password" name="password" id="password"
                                           placeholder="Password"
                                           className="input bg-base-200 w-full" required/>
                                </div>

                                <div className="mt-2">
                                    <label className="text-white/50"><span>Difficulty: {difficulty}</span></label>
                                    <input type="range" min={1} max={3} step={1} defaultValue={1} name="difficulty"
                                           id="difficulty"
                                           placeholder="Difficulty" onChange={e => {
                                        setDifficulty(e.target.value)
                                    }} className="input px-0 bg-base-200 w-full range range-xs" required/>
                                </div>
                            </div>

                        )
                    }

                    <div>
                        <input type="submit" className="btn btn-primary bg-white mt-5 px-10 mb-3" disabled={!canCreate}
                               value={adminMode ? "Create" : "Play"}/>
                        <a href="#" className="text-neutral-300 text-xs float-right mt-12"
                           onClick={() => setAdminMode(!adminMode)}>{adminMode ? "Disable " : "Enable "}
                            Admin Mode</a>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default withRouter(CreateMode);