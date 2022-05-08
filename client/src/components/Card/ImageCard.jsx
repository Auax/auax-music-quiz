import React from "react";
import {Link} from "react-router-dom";

import "./card.css"

const VerticalCard = (props) => {
    return (
        <Link to={props.link}>
            <div
                className="card w-96 bg-base-100 shadow:sm m-5 duration-100 ease-in-out rounded-sm image-full border-2 border-accent/10">
                {props.img != null &&
                    <figure><img src={props.img} className="duration-75 ease-in-out" alt="Music genre"/></figure>}
                <div className="card-body items-center text-center flex justify-center">
                    <h1 className="card-title text-7xl duration-75 ease-in-out">{props.title}</h1>
                    {/*<p className="text-left font-roboto">{props.description}</p>*/}
                    <div className="card-actions justify-end"/>
                </div>
            </div>
        </Link>
    );
}

export default VerticalCard;
