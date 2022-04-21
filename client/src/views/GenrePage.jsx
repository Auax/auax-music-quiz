import React from "react";
import {Link, Redirect, withRouter} from "react-router-dom";
import * as variables from "Variables"

const GenrePage = () => {

    const genreIdentifier = new URL(window.location.href).searchParams.get("mg"); // GET the genre from the URL
    const genresClass = new variables.MusicGenres(); // Genres class instance

    // Assert the genre exists
    const genre = genresClass.getGenre(genreIdentifier);
    if (genre == null) {
        return <Redirect to="/play"/>
    }

    return (
        <div className="bg-base-300 overflow-auto">
            <div className="container mx-auto text-center overflow-auto hero-height">
                <h1 className="text-7xl font-bold text-base-300-content sm:px-0 tracking-tight mt-12">{genre.name}</h1>
                <Link to={{pathname: "/play/solo", state: {mg: genreIdentifier, tn: 10}}}>
                    <button className="btn btn-primary mt-5">Play solo</button>
                </Link>
            </div>
        </div>
    );
}

export default withRouter(GenrePage);