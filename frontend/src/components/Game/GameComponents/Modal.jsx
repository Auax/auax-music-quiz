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
                    <h1 className="text-3xl md:text-4xl text-center mt-5 font-bold text-white">{props.track.title}</h1>
                    <p className="text-sm md:text-md text-center break-words text-white/50">Main artist</p>
                    <p className="text-1xl md:text-2xl text-center break-words text-white/70">{props.track.artists[0].name}</p>
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
        tracks.push(<li key={track.title}><b>{track.title}</b> - {track.artists[0].name}</li>);
    });
    // const tracks = []

    useEffect(() => {
        setShowModal(props.show);
    }, [props.show]);

    return (
        <ScoreModalObj tabIndex="-1"
                       className={`"w-full hero-height text-neutral-300 bg-base200 ${showModal ? "visible" : "hidden"}`}>
            <div className="w-full h-full rounded text-left px-16 py-12">
                <h1 className="text-white font-bold text-4xl md:text-5xl">Summary</h1>
                <div className="py-4">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Correct: <span
                    className="text-neutral-400">{Math.round(props.score / props.maxScore * 100)}%</span></h2>
                <h2 className="text-2xl md:text-3xl font-bold mt-5">Tracks:
                    <span className="text-neutral-400"> {tracks.length}</span></h2>
                <div className="overflow-y-scroll max-h-64">
                    <ul className="list-disc text-neutral-300/70 ml-7 text-base-content/70">
                        {tracks}
                    </ul>
                </div>
                <div className="py-4">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <Link to="/choose">
                    <button className="btn btn-primary mb-5 font-bold">Leave</button>
                </Link>

                <button onClick={() => window.location.reload(false)} className="btn btn-primary ml-2 font-bold">Play
                    Again
                </button>
            </div>
        </ScoreModalObj>

    )
}

