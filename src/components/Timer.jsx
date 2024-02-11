import React, { useState, useEffect } from "react";
import style from './Timer.module.scss'
const Timer = ({ gameOver, sendTime }) => {
    let [time, setTime] = useState(0);
    let [sTime, setSTime] = useState(0);
    let timeIntervalId;

    useEffect(() => {
        if (time > 0 && gameOver) {
            setSTime(time);
            setTime(0);
        }
    }, [gameOver, time]);

    useEffect(() => {
        const incrementTime = () => {
            let newTime = time + 1;
            setTime(newTime);
        };
        timeIntervalId = setTimeout(() => {
            incrementTime();
        }, 1000);
        if (gameOver) {
              // let updatedTime = JSON.parse(JSON.stringify(time));

            clearInterval(timeIntervalId);
        }
    }, [time, setTime, gameOver, sendTime]);

    return (
        <div className={style.timer} >
<span className={style.timer__img}>
    ⏰
</span>
        {gameOver ? sTime : time}
        </div>
    );
};

export default Timer;
