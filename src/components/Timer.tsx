import React, { FC, useEffect, useRef, useState } from 'react';
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<ReturnType<typeof setInterval>>()

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    useEffect(() => {
        if (blackTime === 0 || whiteTime === 0) {
            clearInterval(timer.current)
        }
    }, [whiteTime, blackTime])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }


    function handleRestart() {
        setWhiteTime(300)
        setBlackTime(300)
        startTimer()
        restart()
    }

    return (
        <div>
            <div>
                <button onClick={() => handleRestart()}>Restart game</button>
            </div>
            {blackTime !== 0
                ?
                <h2>Black - {blackTime}</h2>
                :
                <h2>White won</h2>
            }
            {whiteTime !== 0
                ?
                <h2>White - {whiteTime}</h2>
                :
                <h2>Black won</h2>
            }
        </div>
    );
};

export default Timer;
