import React from "react";
import {Link, withRouter} from "react-router-dom";


const Home = () => {
    return (
        <div className="hero-main-page hero-height bg-neutral-80 overflow-auto">
            <div className="text-center px-4">
                <h1 className="text-7xl md:text-9xl sm:text-8xl font-bold text-white tracking-tight">Music
                    Quiz</h1>
                <p className="text-white/70">Spotify Powered</p>
                <Link to="/choose">
                    <button className="btn btn-primary mt-5 px-10">PLAY</button>
                </Link>
            </div>
        </div>
    );
}

export default withRouter(Home);