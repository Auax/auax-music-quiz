import React from "react";
import { withRouter } from "react-router-dom";
import VerticalCard from "./premade/Card";
import * as variables from "./premade/Variables"

const PlayLobby = () => {

    let cards = []
    const genresClass = new variables.MusicGenres();
    genresClass.getGenres().forEach(genre => {
        cards.push(<VerticalCard key={genre.identifier} customHeightClass="h-40" link={"/play/genre?q=" + genre.identifier} title={genre.name} description={genre.description} img={genre.image} />)
    });

    return (
        <div className="dark:bg-c-black bg-neutral-100 overflow-auto">
            <div className="container mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold dark:text-neutral-100 text-neutral-900 sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="dark:text-neutral-300 text-neutral-900 mt-2">Choose a music genre.</p>
                <div className="card-container py-6 px-4 flex flex-wrap justify-center ">
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default withRouter(PlayLobby);