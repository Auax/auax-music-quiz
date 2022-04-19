import React from "react";
import { Link } from "react-router-dom";

import "./card.css"

const VerticalCard = (props) => {
    return (
        <div>
            <Link to={props.link}>
                <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 m-5 duration-75">
                    {props.img != null && <figure><img src={props.img} alt="Shoes" /></figure>}
                    <div className="card-body">
                        <h2 className="card-title text-primary">{props.title}<div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p className="text-left font-roboto">{props.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Music</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default VerticalCard;
