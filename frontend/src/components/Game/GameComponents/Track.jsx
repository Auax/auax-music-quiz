import React, {useEffect, useRef} from "react";

export const Track = (props) => {
    const myAudio = useRef();

    useEffect(() => {
        if (!props.running) return;
        myAudio.current.play();
    }, [props.track]);

    useEffect(() => {
        if (props.running) myAudio.current.play();
        else myAudio.current.pause();
    }, [props.running]);

    useEffect(() => {
        myAudio.current.volume = props.volume / 100;
    }, [props.volume])

    return (
        <audio
            src={props.track.preview}
            ref={myAudio}
            type="audio"
            onPause={() => props.setPause(true)}
            onPlay={() => props.setPause(false)}
            style={{display: 'none'}}
            loop
        />
    )
}