import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import VerticalCard from "components/Card/ImageCard";
import * as queryString from "query-string";
import axios, {AxiosError} from "axios";
import LoaderScreen from "components/Loading/LoaderScreen";

const SelectMusicGenre = () => {

    const [toRender, setToRender] = useState([]);
    const [throwError, setThrowError] = useState(null);

    useEffect(() => {
        let genresToRender = []

        axios.get(process.env.REACT_APP_API_URL + "/api/get/modes").then(r => {
            let data = r.data;
            let ordered_entries = {}

            data.forEach(entry => {
                let genre = entry.genre
                if (!(genre in ordered_entries)) ordered_entries[genre] = [];
                ordered_entries[genre].push(entry)
            });
            for (let [genre, arrOfModes] of Object.entries(ordered_entries)) {
                let cards = [];
                arrOfModes.forEach(mode => {
                    cards.push(
                        <VerticalCard key={mode.title} customHeightClass="h-40"
                                      link={"/play?" + queryString.stringify({id: mode.pid, tn: 10})}
                                      pid={mode.pid}
                                      title={mode.title}
                                      img={mode.image}
                                      difficulty={mode.difficulty}/>);
                });
                let container = (
                    <div className="container mb-5 w-full" key={genre + " container"}>
                        <div className="divider w-full mx-auto text-sm text-base-content/50"
                             key={genre}>{genre.toUpperCase()}</div>
                        {cards}
                    </div>
                )
                genresToRender.push(container);
            }
            setToRender(genresToRender);
        }).catch(() => setThrowError("Cannot load the modes."));
    }, []);

    if (toRender.length === 0) return <LoaderScreen throwError={throwError} loadingMsg={"Loading modes..."}/>;

    return (
        <div className="bg-base-300 overflow-auto hero-height">
            <div className="lg:px-20 md:px-10 px-2 mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="text-base-300-content/50 mt-2">Choose a music genre</p>
                <div className="container mt-5 rounded-lg mx-auto w-auto">
                    <div
                        className="card-container w-full mx-auto lg:w-4/5 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                        {toRender}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);