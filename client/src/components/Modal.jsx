import React from "react";
import styled, { keyframes, css } from "styled-components";

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: props.isVisible
        };
    }

    setVisible(b) {
        this.setState({
            isVisible: b
        });
    }

    render() {

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
        width: 60%;
        z-index: 50;
        ${({ isVisible }) => isVisible ?
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
            ${({ isVisible }) => isVisible ?
                css`animation: ${showBgKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` : // Show
                css`animation: ${hideBgKeyframes} 0.2s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;` // Hide
            }
        `;

        return (
            <div className={`absolute w-full hero-height ${this.state.isVisible ? "visible" : "hidden"}`}>
                <ModalObj isVisible={this.state.isVisible} tabIndex="-1"
                    className="hero-height rounded md:inset-0 mx-auto my-auto blur-bg flex items-center justify-center">
                    <div className="w-full">
                        <img className="w-2/5 mt-2 mx-auto shadow-lg rounded-lg" src={this.props.image} draggable="false" alt="album" />
                        <h1 className="text-5xl text-center text-white mt-5">{this.props.name}</h1>
                        <p className="text-2xl text-center break-words text-neutral-500">{this.props.artist}</p>
                    </div>
                </ModalObj>
                <BgObj isVisible={this.state.isVisible} />
            </div>
        )
    };
}

export default Modal;