import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

class ProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start: false
        };
    }

    start() {
        this.setState(
            {
                start: true
            }
        );
    }

    render() {
        const containerStyles = {
            height: 20,
            width: '100%',
            borderRadius: 5,
        }

        const fillerKeyframes = keyframes`
            0% {
                width: 0%; 
            }
            100% {
                width: 100%; 
            }
        `;

        const AnimateFiller = styled.div`
            height: 100%;
            width: ${this.props.completed}%;
            border-radius: inherit;
            textAlign: right;
            animation-iteration-count: 1;
            ${({ active }) => active && css`animation: ${fillerKeyframes} ${this.props.time / 1000}s linear;`}
        `;

        return (
            <div style={containerStyles} id="trackProgressbar" className="bg-primary-content shadow-lg">
                <AnimateFiller active={this.state.start} className="bg-primary" />
            </div>
        )
    };
}

export default ProgressBar;