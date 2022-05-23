import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import CategoryFilter from "components/CategoryFilter/CategoryFilter";
import ModeCardViewer from "components/ModeViewer/ModeCardViewer";

const SelectMusicGenre = () => {

    const [genres, setGenres] = useState([]);
    const [groupDataBy, setGroupDataBy] = useState("genre");
    const [filterViewBy, setFilterViewBy] = useState("all");

    return (
        <div className="hero-create-page hero-height overflow-auto">
            <div className="lg:px-20 md:px-10 px-2 mx-auto text-center">
                <h1 className="text-neutral-200 text-7xl font-bold sm:px-0 tracking-tight mt-12">PLAY</h1>
                <p className="text-neutral-300 mt-2 mb-6">Choose a music mode</p>
                <CategoryFilter categories={genres} setFilterValue={setFilterViewBy}
                                setGroupBy={setGroupDataBy}/>
                <div className="container overflow-auto pt-5 px-10 mx-auto w-auto bg-base100/80 border-white/10 border">
                    <ModeCardViewer groupViewBy={groupDataBy} filterValue={filterViewBy} setGenres={setGenres}/>
                </div>
            </div>
        </div>
    );
}

export default withRouter(SelectMusicGenre);