import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import ModeFilter from "components/ModeViewer/CategoryFilter/ModeFilter";
import ModeCardViewer from "components/ModeViewer/ModeCardViewer";
import styled from "styled-components";
import {colors, shadows} from "../util/Styles";

const Card = styled.div`
  width: 100%;
  text-align: left;
  box-shadow: ${shadows.shadowLg};
  background-color: ${colors.base300};
  transition: all .1s ease-in-out;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(79, 79, 79, 0.22);
  padding: 14px;

  &:hover {
    background-color: #2a2b33;
  }
`;

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

                <div>
                    <Link to="/create/mode">
                        <Card className="mt-2">
                            <h1 className="text-white text-xl">Custom mode</h1>
                            <p className="text-white/50 text-md">Use any public Spotify playlist and select the number
                                of songs to use!</p>
                        </Card>
                    </Link>

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