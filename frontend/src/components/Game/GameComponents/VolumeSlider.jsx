import styled from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi";

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
        <div className="flex btn bg-neutral-600/30 items-center h-12 text-white">
            <VolumeSliderInput
                type="range" ref={RangeRef} min="0" max="100"
                onChange={(e) => setVolume(e.target.value)}/>
            <button onClick={muteSound} className="p-1 transition-all hover:scale-110">
                {volume > 0 ?
                    <HiVolumeUp size={"1.5em"}/> :
                    <HiVolumeOff size={"1.5em"}/>}
            </button>
        </div>

    )
}