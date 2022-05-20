import React from "react";
import DropdownList from "components/Dropdown/Dropdown";

const CategoryFilter = (props) => {

    let options = [];
    props.categories.forEach((category) => {
            options.push(<option key={`${category}Option`}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>)
        }
    );

    const updateSelected = (e, groupBy: string) => {
        if (e.target.id === "genre") document.getElementById("difficulty").selectedIndex = 0;
        else document.getElementById("genre").selectedIndex = 0;
        props.setGroupBy(groupBy);
        props.setFilterValue(e.target.value.toLowerCase());
    }

    return (
        <div
            className="text-white text-left bg-base100 shadow-lg z-10 relative container px-10 pb-7 pt-5 rounded-t mx-auto grid grid-cols-2">
            <div className="selector">
                <label className="label"><span className="text-white/70 select-none">Genre:</span></label>
                <select id="genre" className="input w-full float-left"
                        onChange={e => updateSelected(e, "genre")}>
                    <option defaultValue>All</option>
                    {options}
                </select>
            </div>
            <DropdownList/>
            {/*<div className="selector ml-5">*/}
            {/*    <label className="label"><span className="text-white/70 select-none">Difficulty:</span></label>*/}
            {/*    <select id="difficulty" className="input w-full float-left "*/}
            {/*            onChange={e => updateSelected(e, "difficulty")}>*/}
            {/*        <option defaultValue value={-1}>All</option>*/}
            {/*        <option value={1}>Easy</option>*/}
            {/*        <option value={2}>Medium</option>*/}
            {/*        <option value={3}>Hard</option>*/}
            {/*    </select>*/}
            {/*</div>*/}
        </div>
    );
}

export default CategoryFilter;
