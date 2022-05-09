import styled from "styled-components";
import React, {useRef} from "react";


const LeftInput = styled.input`
          ${`width: calc(100% - 58px)`}
`;

export const InputAnswer = (props) => {
    const InputRef = useRef();
    return (
        <div className="input-group flex">
            <LeftInput ref={InputRef} type="text" placeholder="Song or artist's name"
                       className="input focus:outline-none"
                       autoComplete="off"
                       onKeyDown={(e) => props.submitAnswer(e, InputRef)} id="userInput"/>
            <button onClick={(e) => props.submitAnswer(e, InputRef)}
                    className="btn btn-ghost bg-base-100 rounded-bl-none rounded-tl-none border-l-base-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
            </button>
        </div>
    )
}