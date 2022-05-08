import React, {useEffect, useState} from "react";
import styled, {keyframes, css} from "styled-components";
import {Link} from "react-router-dom";

// The "region" feature is only available in Jetbrains' products (as far as I know)
// region elements
const showKeyframes = keyframes`
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
`;

const hideKeyframes = keyframes`
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
`

const showBgKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const hideBgKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const ModalObj = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  top: 0%;
  left: 0;
  right: 0;
  z-index: 30;
  ${({isVisible}) => isVisible ?
          css`animation: ${showKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` : // Show
          css`animation: ${hideKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` // Hide
  }
`;

const BgObj = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  backdrop-filter: blur(6px);
  background: rgba(0, 0, 0, 0.6);
  ${({isVisible}) => isVisible ?
          css`animation: ${showBgKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` : // Show
          css`animation: ${hideBgKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` // Hide
  } // TODO Fix animation since we simply set display:none to hide it
`;

// endregion

export const AnswerModal = (props) => {
    const [showModal, setShowModal] = useState(props.show);

    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    return (
        <div className={`absolute w-full hero-height z-30 ${showModal ? "visible" : "hidden"}`}>
            <ModalObj isVisible={showModal} tabIndex="-1"
                      className="hero-height w-3/5 rounded md:inset-0 mx-auto my-auto blur-bg
                      flex items-center justify-center">
                <div className="w-full">
                    <img className="w-2/5 mt-2 mx-auto shadow-lg rounded-lg" src={props.track.image}
                         draggable="false" alt="album"/>
                    <h1 className="text-5xl text-center mt-5">{props.track.name}</h1>
                    <p className="text-2xl text-center break-words text-base-content/80">{props.track.artist}</p>
                </div>
            </ModalObj>
            <BgObj isVisible={showModal}/>
        </div>
    )
};

export const ScoreModal = (props) => {
    const [showModal, setShowModal] = useState(props.show);

    let tracks = [];
    props.tracks.forEach(track => {
        tracks.push(<li key={track.name}>{track.name} - {track.artist}</li>);
    });
    // const tracks = []

    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    return (
        <div className={`absolute w-full hero-height z-30 ${showModal ? "visible" : "hidden"}`}>
            <ModalObj isVisible={showModal} tabIndex="-1"
                      className="hero-height rounded md:inset-0 mx-auto my-auto
                      blur-bg flex items-center justify-center">
                <div className="w-full md:w-2/3 bg-base-200 rounded text-left p-16">
                    <h1 className="text-4xl md:text-5xl">Summary</h1>
                    <div className="divider"/>
                    <h2 className="text-3xl md:text-4xl">Score: <span className="text-base-content/70">{props.score}</span></h2>
                    <h2 className="text-3xl md:text-4xl mt-5">Tracks:</h2>
                    <div className="overflow-y-scroll max-h-36">
                        <ul className="list-disc text-base ml-7 text-base-content/70">
                            {tracks}
                        </ul>
                    </div>
                    <div className="divider"/>
                    <Link to="/choose">
                        <button className="btn btn-primary">Leave</button>
                    </Link>

                </div>
            </ModalObj>
            <BgObj isVisible={showModal}/>
        </div>
    )
}
