import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import VerticalCard from "components/Card/ImageCard";
import * as variables from "data/Variables"
import * as queryString from "query-string";
import {assertSpotifyLogin} from "../api/Auth";

const SelectMusicGenre = () => {

    useEffect(() => {
        assertSpotifyLogin(window.location.href);
    }, [])

    let genresToRender = []
    const genresClass = new variables.MusicGenres();
    for (let category in genresClass.categories) {
        let cards = []
        let genres = genresClass.getGenresByCategory(category);
        for (let genreIdentifier in genres) {
            let genre = genresClass.categories[category][genreIdentifier];
            cards.push(
                <VerticalCard key={genre.name} customHeightClass="h-40"
                              link={"/play?" + queryString.stringify({mg: genreIdentifier, tn: 10})}
                              title={genre.name}
                              img={genre.img}/>);
        }
        let container = (
            <div className="container mb-5 w-full" key={category + " container"}>
                <div className="divider w-full mx-auto text-sm text-base-content/50"
                     key={category}>{category.toUpperCase()}</div>
                {cards}
            </div>
        )
        genresToRender.push(container);
    }
    return (
        <div className="bg-base-300 overflow-auto hero-height">
            <div className="lg:px-20 md:px-10 px-2 mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="text-base-300-content/50 mt-2">Choose a music genre</p>
                <div className="container my-10 rounded-lg mx-auto w-auto">
                    <div
                        className="card-container w-full mx-auto lg:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                        {genresToRender}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);