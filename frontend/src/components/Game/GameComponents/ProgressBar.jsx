import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes, css} from "styled-components";
import game from "../Game";


const fillerKeyframes = (startWidth) => keyframes`
  0% {
    width: ${startWidth}%;
  }
  100% {
    width: 100%;
  }`;

const AnimateFiller = styled.div`
  height: 100%;
  border-radius: inherit;
  ${({width}) => css`width: ${width}%;`} // animation-iteration-count: 1;
                  // ${({active, time, width}) => active && css`animation: ${fillerKeyframes(width)} ${time}s linear;`}
`;

export const ProgressBar = (props) => {
    const fillerRef = useRef();
    const barRef = useRef();
    const [width, setWidth] = useState(0);
    const [triggerInterval, setTriggerInterval] = useState(0);
    const [isBarActive, setIsBarActive] = useState(false);

    useEffect(() => {
        let totalWidth = parseInt(window.getComputedStyle(barRef.current).getPropertyValue("width"));
        let pxWidth = totalWidth / props.initTime * (props.initTime - props.time);
        let percentage = pxWidth / totalWidth * 100;

        let interval = null;
        if (props.gameState !== "pause" || props.gameState !== "next")
            interval = setInterval(() => {
                setWidth(percentage);
                setTriggerInterval(!triggerInterval);
            }, 250);
        return () => clearInterval(interval);
    }, [props.time, triggerInterval]);

    const containerStyles = {
        height: 20,
        width: '100%',
    }

    return (
        <div ref={barRef} style={containerStyles} id="trackProgressbar" className="bg-neutral-500/50 shadow-lg rounded-sm">
            <AnimateFiller ref={fillerRef} active={isBarActive} width={width}
                           className="bg-blue-600 "/>
        </div>
    )
}

ProgressBar.defaultProps = {
    run: false,
    time: 10, // In seconds
};
