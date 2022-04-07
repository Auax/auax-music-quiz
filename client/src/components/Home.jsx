import React from "react";
import {Link, withRouter} from "react-router-dom";

const Home = () => {
    return (
        <div className="hero-main-page hero-height bg-neutral-80 overflow-auto">
            <div className="text-center">
                <h1 className="text-9xl sm:text-9xl font-bold dark:text-neutral-100 text-neutral-900 sm:px-0 tracking-tight">Auax
                    Music Quiz</h1>
                <p className="dark:text-neutral-200 text-neutral-900">Play alone or with friends.</p>
                <Link to="/play">
                    <button className="btn-primary mt-5">Play</button>
                </Link>
            </div>
        </div>
    );
}

export default withRouter(Home);