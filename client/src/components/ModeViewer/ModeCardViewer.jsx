import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import LoaderScreen from "components/Loading/LoaderScreen";
import VerticalCard from "components/Card/ImageCard";
import {fetchModes} from "api/Api";
import * as queryString from "query-string";
import {groupEntriesByKey} from "util/Functions";

const ModeCardViewer = (props) => {
    const [data, setData] = useState(null); // Fetched modes data
    const [toRender, setToRender] = useState([]); // Elements to render
    const [genres, setGenres] = useState([]); // All mode genres
    const [throwError, setThrowError] = useState(null); // Error message (when loading data only)

    // Fetch modes from db
    useEffect(() => {
        const execute = async () => {
            const fetchedModes = await fetchModes();
            setData(fetchedModes);
            return fetchedModes;
        }
        execute().then(r => updateEntries(r, props.groupViewBy, props.filterValue))
            .catch((error) => {
                setThrowError("Could not load modes!");
                console.error(error);
            });
    }, []);

    // Update render
    useEffect(() => {
        updateEntries(data, props.groupViewBy, props.filterValue);
    }, [props.filterValue, props.groupViewBy]);

    const updateEntries = (
        data: any = null,
        groupBy: string = "genre",
        filterKey: string = "all") => {

        if (data === null) return;

        setToRender([]);
        setGenres([]);

        let orderedData = groupEntriesByKey(data, groupBy); // Group by genre or another key
        let entriesData = (filterKey === "all" || filterKey === "-1") ? orderedData : {[filterKey]: orderedData[filterKey]}; // Filter

        // Create cards
        for (let [identifier, arrOfModes] of Object.entries(entriesData)) {
            let cards = [];
            arrOfModes.forEach(mode => {
                cards.push(
                    <VerticalCard key={mode.title}
                                  link={"/play?" + queryString.stringify({id: mode.pid, tn: 10})}
                                  title={mode.title}
                                  img={mode.image}
                                  difficulty={mode.difficulty}
                                  customCardStyle={{marginBottom: "20px"}}
                    />);
            });
            let container = (
                <div className="container mx-auto mb-5 w-full" key={identifier + new Date().getTime()}>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t-2 border-white/30"/>
                        <span className="flex-shrink mx-4 text-white text-sm"><b>{identifier.toUpperCase()}</b></span>
                        <div className="flex-grow border-t-2 border-white/30"/>
                    </div>
                    {cards}
                </div>
            )
            setToRender(old => [...old, container]);
            setGenres(Object.keys(groupEntriesByKey(data, "genre")));
        }
    }

    useEffect(() => {
        props.setGenres(genres);
    }, [genres]);

    if (toRender.length === 0)
        return <div><LoaderScreen throwError={throwError} loadingMsg={"Loading modes..."}/></div>;

    return (
        <div className={`w-full mx-auto grid grid-cols-1 gap-4 justify-center ${props.filterValue === "all" ? "md:grid-cols-2" : ""}`}>
            {toRender}
        </div>
    );
}

export default withRouter(ModeCardViewer);