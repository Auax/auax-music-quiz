import React from "react";
import { withRouter } from "react-router-dom";
import VerticalCard from "../components/Card/ImageCard";
import * as variables from "../Variables"

const SelectMusicGenre = () => {

    let cards = []
    const genresClass = new variables.MusicGenres();
    genresClass.getGenres().forEach(genre => {
        cards.push(<VerticalCard key={genre.identifier} customHeightClass="h-40" link={"/play/genre?q=" + genre.identifier} title={genre.name} description={genre.description} img={genre.image} />)
    });

    return (
        <div className="bg-base-300 overflow-auto">
            <div className="container mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold text-base-300-content sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="text-base-300-content/50 mt-2">Choose a music genre.</p>
                <div className="card-container py-6 px-4 flex flex-wrap justify-center ">
                    {cards}
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);