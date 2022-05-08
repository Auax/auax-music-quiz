import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import VerticalCard from "components/Card/ImageCard";
import * as variables from "Variables"
import * as queryString from "query-string";
import {assertSpotifyLogin} from "../api/auth";

const SelectMusicGenre = () => {

    useEffect(() => {
        assertSpotifyLogin(window.location.href);
    }, [])

    let cards = []
    const genresClass = new variables.MusicGenres();
    genresClass.getGenres().forEach(genre => {
        cards.push(<VerticalCard key={genre.identifier} customHeightClass="h-40"
                                 link={"/play?" + queryString.stringify({mg: genre.identifier, tn: 10})}
                                 title={genre.name}
                                 img={genre.image}/>)
    });

    return (
        <div className="bg-base-300 overflow-auto hero-height">
            <div className="lg:px-20 md:px-10 px-2 mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="text-base-300-content/50 mt-2">Choose a music genre.</p>
                <div className="container my-10 rounded-lg mx-auto w-auto">
                    <div className="card-container flex flex-wrap justify-center">
                        {cards}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);