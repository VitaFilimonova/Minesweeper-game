import React, { useState, useEffect } from "react";
import style from "./Timer.module.scss";
import { useSelector } from "react-redux";

const Timer = ({ gameOver, gameWinOver, sendTime, gameStarted, restart }) => {
  let [time, setTime] = useState(0);
  const { mode } = useSelector((state) => state.boardSizeReducer);
  const playerName = useSelector((state) => state.playerNameReducer.playerName);

  useEffect(() => {
    let timeIntervalId;

    if (gameStarted && !gameOver && !gameWinOver) {
      timeIntervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timeIntervalId);
  }, [gameStarted, gameOver, gameWinOver]);

  useEffect(() => {
    if (restart || mode) {
      setTime(0);
      sendTime(0);
    }
  }, [restart, sendTime, mode, playerName]);

  useEffect(() => {
    sendTime(time);
  }, [time, sendTime]);

  return (
    <div className={style.timer}>
      <span className={style.timer__img}>⏰</span>
      <div className={style.timer__digits}>{time}</div>
    </div>
  );
};

export default Timer;
