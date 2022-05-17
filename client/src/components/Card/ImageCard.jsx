import React from "react";
import {Link} from "react-router-dom";

import "./card.css"
import StarRating from "components/Rating/StarRating";

const VerticalCard = (props) => {
    let difficultyClasses;
    let tooltipColor;
    switch (props.difficulty) {
        case 1:
            tooltipColor = "#93c5fd"
            difficultyClasses = "bg-blue-300 text-black";
            break;
        case 2:
            tooltipColor = "#fb923c";
            difficultyClasses = "bg-orange-400 text-white";
            break;
        default:
            tooltipColor = "#ef4444";
            difficultyClasses = "bg-red-500 text-white";
    }

    return (
        <Link to={props.link}>
            <div
                className="card mx-auto w-full bg-base-100 shadow:sm m-5 duration-100 ease-in-out rounded-sm image-full border-2 border-accent/10">
                {props.img != null &&
                    <figure><img src={props.img} className="duration-75 ease-in-out" alt="Music genre"/></figure>}
                <div className="card-body items-center text-center flex justify-center">
                    <h1 className="card-title text-5xl md:text-5xl duration-75 ease-in-out">{props.title}</h1>
                    {props.difficulty &&
                        <StarRating stars={props.difficulty} totalStars={3} starsClass={"text-yellow-500/50"}/>}
                    <div className="card-actions justify-end"/>
                </div>
            </div>
        </Link>
    );
}

export default VerticalCard;
