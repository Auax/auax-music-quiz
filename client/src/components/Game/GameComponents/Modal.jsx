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
  //position: fixed;
  left: 0;
  right: 0;
  z-index: 30;
  ${({isVisible}) => isVisible ?
          css`animation: ${showKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` : // Show
          css`animation: ${hideKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` // Hide
  }
`;

const ScoreModalObj = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  left: 0;
  right: 0;
  z-index: 30;
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
                      className="fixed hero-height w-3/5 rounded md:inset-0 mx-auto my-auto blur-bg
                      flex items-center justify-center">
                <div className="w-full ">
                    <img className="md:w-3/5 lg:w-2/5 mt-2 mx-auto shadow-lg rounded-lg" src={props.track.image}
                         draggable="false" alt="album"/>
                    <h1 className="text-3xl md:text-4xl text-center mt-5 text-white">{props.track.title}</h1>
                    <p className="text-1xl md:text-2xl text-center break-words text-white/70">{props.track.artist}</p>
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
        tracks.push(<li key={track.title}><b>{track.title}</b> - {track.artist}</li>);
    });
    // const tracks = []

    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    return (
        <ScoreModalObj tabIndex="-1"
                       className={`"w-full hero-height rounded md:inset-0 mx-auto my-auto
                      blur-bg flex items-center justify-center bg-base-200 ${showModal ? "visible" : "hidden"}`}>
            <div className="w-full h-full rounded text-left px-16 py-12">
                <h1 className="text-4xl md:text-5xl">Summary</h1>
                <div className="divider"/>
                <h2 className="text-3xl md:text-4xl">Correct: <span
                    className="text-base-content/70">{props.score / props.maxScore * 100}%</span></h2>
                <h2 className="text-3xl md:text-4xl mt-5">Tracks:</h2>
                <div className="overflow-y-scroll max-h-64">
                    <ul className="list-disc text-base ml-7 text-base-content/70">
                        {tracks}
                    </ul>
                </div>
                <div className="divider"/>
                <Link to="/choose">
                    <button className="btn btn-primary mb-5">Leave</button>
                </Link>
            </div>
        </ScoreModalObj>

    )
}

