import React, {useState, useEffect} from "react";
import style from './Timer.module.scss'
import {useSelector} from "react-redux";

const Timer = ({gameOver,gameWinOVer, sendTime, gameStarted, restart}) => {
    let [time, setTime] = useState(0);
    const { mode} = useSelector((state) => state.boardSizeReducer)
    // Эффект для отслеживания старта игры и обновления таймера
    useEffect(() => {
        let timeIntervalId;

        if (gameStarted && !gameOver && !gameWinOVer) {
            timeIntervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // Очистка таймера
        return () => clearInterval(timeIntervalId);
    }, [gameStarted, gameOver, gameWinOVer]);

    // Эффект для сброса таймера при рестарте
    useEffect(() => {
        if (restart || mode) {
            setTime(0); // Сбрасываем таймер
            sendTime(0); // Отправляем сброшенное время, если нужно
        }
    }, [restart, sendTime, mode]);

    // Эффект для отправки текущего времени во внешний стейт
    useEffect(() => {
        sendTime(time);
    }, [time, sendTime]);

    return (
        <div className={style.timer}>
            <span className={style.timer__img}>
                ⏰
            </span>
            <div className={style.timer__digits}>
                {time}
            </div>
        </div>);
};

export default Timer;
