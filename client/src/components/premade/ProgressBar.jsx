import React from "react";
import { Link } from "react-router-dom";

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        const containerStyles = {
            height: 20,
            width: '100%',
            borderRadius: 5,
        }

        const fillerStyles = {
            height: '100%',
            width: `${this.props.completed}%`,
            backgroundColor: this.props.bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right'
        }

        return (
            <div style={containerStyles} className="dark:bg-neutral-800 bg-neutral-200 shadow-lg">
                <div style={fillerStyles}>
                </div>
            </div>
        )
    };
}

export default ProgressBar;