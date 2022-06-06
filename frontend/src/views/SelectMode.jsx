import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import ModeFilter from "components/ModeViewer/CategoryFilter/ModeFilter";
import ModeCardViewer from "components/ModeViewer/ModeCardViewer";

const SelectMusicGenre = () => {

    const [genres, setGenres] = useState([]);
    const [titles, setTitles] = useState([]);
    const [groupDataBy, setGroupDataBy] = useState("genre");
    const [filterViewBy, setFilterViewBy] = useState("all");

    return (
        <div className="bg-base200 hero-height overflow-auto">
            <div className="container lg:px-20 md:px-10 px-5 mx-auto text-center">
                <h1 className="text-neutral-200 text-4xl text-left sm:px-0 tracking-wide mt-12 mb-3">Play</h1>

                <ModeFilter
                    categories={genres}
                    titles={titles}
                    setFilterValue={setFilterViewBy}
                    setGroupBy={setGroupDataBy}/>

                <div className="overflow-auto mx-auto w-auto">
                    {/* Show the mode cards*/}
                    <ModeCardViewer
                        groupViewBy={groupDataBy}
                        filterValue={filterViewBy}
                        setGenres={setGenres} // Rock, hiphop...
                        setTitles={setTitles} // Top 100 Global, 80s Rap...
                    />
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);