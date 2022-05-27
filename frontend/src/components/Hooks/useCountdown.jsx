import {useState, useEffect} from 'react';

export const useCountdown = (time: number = 10) => {
    const [countdown, setTimer] = useState(time);
    const [isActive, setIsActive] = useState(false);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;
        let interval = null;
        if (isActive) interval = setInterval(() => {
            setTimer(countdown - .25);
        }, 250);
        else if (!isActive && countdown !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, countdown, pause]);

    const startCountdown = () => {
        setPause(false);
        setIsActive(true);
    };

    const pauseCountdown = () => {
        setPause(true);
    };

    const resetCountdown = () => {
        setIsActive(false);
        setTimer(time);
    };

    const zeroCountdown = () => {
        setTimer(0);
    }

    const printTime = () => {
        if (!isActive) return "0s";
        return `${Math.round(countdown)}s`
    };

    return {countdown, startCountdown, pauseCountdown, resetCountdown, zeroCountdown, printTime};
};

