import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";

export const VolumeSliderInput = styled.input`
  max-width: 50px;
  margin-right: 10px;
  z-index: 1;
`;

export const VolumeSlider = (props) => {
    const [volume, setVolume] = useState(100);
    const [prevVolume, setPrevVolume] = useState(volume);
    const RangeRef = useRef();

    const muteSound = () => {
        setPrevVolume(volume > 0 ? volume : 100);
        let newVolume = volume > 0 ? 0 : prevVolume;
        setVolume(newVolume);
        RangeRef.current.value = newVolume;
    }

    useEffect(() => {
        RangeRef.current.value = volume;
    }, [RangeRef]);

    useEffect(() => {
        props.volumeSetter(volume);
    }, [volume]);


    return (
        <div className="flex items-center btn btn-secondary h-12 text-white">
            <VolumeSliderInput type="range" ref={RangeRef} min="0" max="100"
                               onChange={(e) => setVolume(e.target.value)}/>
            <button onClick={muteSound} className="p-1 hover:scale-110">
                {volume > 0 ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                              clipRule="evenodd"/>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                    </svg>}
            </button>
        </div>

    )
}