import React from "react";
import {Link, withRouter} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="hero-height bg-base100 overflow-hidden">
            <div className="container mx-auto text-center text-white grid content-center h-full z-40 relative">
                <h1 className="text-9xl font-bold">404</h1>
                <h2 className="text-4xl text-blue-700">Oops, page not Found</h2>
                <div className="link mt-5"><Link to={"/"}>
                    <button className="btn btn-primary ">Go Home</button>
                </Link></div>
            </div>
        </div>
    );
}

export default withRouter(NotFoundPage);