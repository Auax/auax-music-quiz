import React from "react";
import { Link } from "react-router-dom";

class VerticalCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Link to={this.props.link}>
                    <div className="max-w-sm bg-white shadow-md dark:bg-neutral-200 mx-2 my-2 genre-card border dark:border-neutral-800 border-neutral-200">
                        {this.props.img != null &&
                            <img src={this.props.img} alt="" draggable="false" />
                        }
                        <div className={"p-5 " + this.props.customHeightClass}>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight 
                        text-white dark:text-neutral-900 duration-75 ease-in
                        ">{this.props.title}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-neutral-700 leading-snug tracking-tight px-2">{this.props.description}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    };
}

export default VerticalCard;