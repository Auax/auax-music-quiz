import {useState} from 'react';

export const useScore = () => {
    const [score, setScore] = useState(0);

    const scoreAddPoint = () => {
        setScore((prevState) => ({
            ...prevState,
            correct: score.correct + 1,
        }));
    }

    const resetScore = () => {
        setScore({correct: 0});
    }

    return {score, scoreAddPoint, resetScore};
}