import {useState, useEffect} from 'react';

export const useCountdown = (time: number = 10) => {
    const [countdown, setTimer] = useState(time);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive) interval = setInterval(() => {
            setTimer(countdown - 1);
        }, 1000);
        else if (!isActive && countdown !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, countdown]);

    const startCountdown = () => {
        setIsActive(true);
    };

    const pauseCountdown = () => {
        setIsActive(false);
    };

    const resetCountdown = () => {
        setIsActive(false);
        setTimer(time);
    };

    const zeroCountdown = () => {
        setTimer(0);
    }

    const printTime = () => {
        if (!isActive) return "0:00";
        const getSeconds = `0${countdown % 60}`.slice(-2);
        const minutes = `${Math.floor(countdown / 60)}`;
        const getMinutes = `0${minutes}`.slice(-2);

        return `${getMinutes}:${getSeconds}`;
    };

    return {countdown, startCountdown, pauseCountdown, resetCountdown, zeroCountdown, printTime};
};

