import React from "react";


const CategoryFilter = (props) => {

    let options = [];
    props.categories.forEach((category) => {
            options.push(<option key={`${category}Option`}>{category}</option>)
        }
    );

    const updateSelected = (e) => {
        props.setSelectedCategory(e.target.value.toLowerCase());
    }

    return (
        <div className="w-full">
            <select className="select select-bordered w-full max-w-xs float-left" onChange={updateSelected}>
                <option disabled defaultValue>Category</option>
                <option>All</option>
                {options}
            </select>
        </div>
    );
}

export default CategoryFilter;
