import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import LoaderScreen from "components/Loading/LoaderScreen";
import CategoryFilter from "components/CategoryFilter/CategoryFilter";
import VerticalCard from "components/Card/ImageCard";
import {fetchModes} from "api/Api";
import * as queryString from "query-string";

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false
});

const SelectMusicGenre = () => {

    const [toRender, setToRender] = useState([]);
    const [data, setData] = useState(null);
    const [throwError, setThrowError] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const execute = async () => {
            const fetchedModes = await fetchModes();
            setData(fetchedModes);
            return fetchedModes;
        }
        execute().then((r) => updateEntries(r));
    }, []);

    useEffect(() => {
        updateEntries(data, selectedCategory);
    }, [selectedCategory]);

    const updateEntries = (data: any = null, category: string = "all") => {
        if (data === null) return;
        let entriesData = category === "all" ? data : {[category]: data[category]};

        let genresToRender = [];
        let genreArr = [];
        // Create cards
        for (let [genre, arrOfModes] of Object.entries(entriesData)) {
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
            genreArr.push(genre.capitalize());
        }
        setToRender(genresToRender);
        setGenres(genres.length === 0 ? genreArr : genres);
    }

    if (toRender.length === 0) return <LoaderScreen throwError={throwError} loadingMsg={"Loading modes..."}/>;

    return (
        <div className="bg-base-300 overflow-auto hero-height">
            <div className="lg:px-20 md:px-10 px-2 mx-auto text-center overflow-auto">
                <h1 className="text-7xl font-bold sm:px-0 tracking-tight mt-12">Play</h1>
                <p className="text-base-300-content/50 mt-2">Choose a music genre</p>
                <div className="container my-5 rounded-lg mx-auto w-auto bg-base-200">
                    <CategoryFilter categories={genres} setSelectedCategory={setSelectedCategory}/>
                    <div className="card-container w-full mx-auto lg:w-4/5
                         grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                        {toRender}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);