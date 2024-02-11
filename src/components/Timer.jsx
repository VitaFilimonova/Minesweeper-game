import React, { useState, useEffect } from "react";
import style from './Timer.module.scss'
const Timer = ({ gameOver, sendTime, gameStarted, restart }) => {
    let [time, setTime] = useState(0);

    // Эффект для отслеживания старта игры и обновления таймера
    useEffect(() => {
        let timeIntervalId;

        if (gameStarted && !gameOver) {
            timeIntervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // Очистка таймера
        return () => clearInterval(timeIntervalId);
    }, [gameStarted, gameOver]);

    // Эффект для сброса таймера при рестарте
    useEffect(() => {
        if (restart) {
            setTime(0); // Сбрасываем таймер
            sendTime(0); // Отправляем сброшенное время, если нужно
        }
    }, [restart, sendTime]);

    // Эффект для отправки текущего времени во внешний стейт
    useEffect(() => {
        sendTime(time);
    }, [time, sendTime]);

    return (
        <div className={style.timer} >
<span className={style.timer__img}>
    ⏰
</span>
        { time}
        </div>
    );
};

export default Timer;
