import React from "react";
import { Link, withRouter } from "react-router-dom";

const Home = () => {

    const playIframe = () => {
        const iframe = document.getElementById("iframe");
        let doc = iframe.contentDocument || iframe.contentWindow.document;
        console.log(doc);
        doc.querySelector("button").click();
    }

    return (
        <div className="hero-main-page hero-height bg-neutral-80 overflow-auto">
            <div className="text-center">
                <h1 className="text-9xl sm:text-9xl font-bold text-white sm:px-0 tracking-tight">Auax Music Quiz</h1>
                <p className="text-white/70">Play alone or with friends.</p>
                <Link to="/play">
                    <button className="btn btn-primary mt-5 px-10">PLAY</button>
                </Link>
            </div>
        </div>
    );
}

export default withRouter(Home);