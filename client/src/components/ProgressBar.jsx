import React, {useEffect, useState} from "react";
import styled, {keyframes, css} from "styled-components";


const fillerKeyframes = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }`;

const AnimateFiller = styled.div`
  height: 100%;
  border-radius: inherit;
  ${({width}) => css`width: ${width}%;`}
  animation-iteration-count: 1;
  ${({active, time}) => active && css`animation: ${fillerKeyframes} ${time}s linear;`}
`;

const ProgressBar = (props) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(0);
    }, [props.run]);

    const containerStyles = {
        height: 20,
        width: '100%',
    }

    return (
        <div style={containerStyles} id="trackProgressbar" className="bg-primary-content shadow-lg rounded-md">
            <AnimateFiller active={props.run} time={props.time} width={width} className="bg-primary "/>
        </div>
    )
}

ProgressBar.defaultProps = {
    run: false,
    time: 10, // In seconds
};

export default ProgressBar;