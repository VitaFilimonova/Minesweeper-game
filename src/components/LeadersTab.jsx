import React, { useState } from "react";
import style from "./LeadersTab.module.scss";
import { useSelector } from "react-redux";

const LeadersTab = ({ open, setOpen }) => {
  const mode = useSelector((state) => state.boardSizeReducer.mode);
  const [selectedButton, setSelectedButton] = useState(mode);
  const leadersData = useSelector((state) => state.leadersReducer.leaders);
  const leaders = leadersData[selectedButton];
  const buttonsData = [
    { name: "easy" },
    { name: "normal" },
    { name: "hard" },
    { name: "custom" },
  ];

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div
      className={`${style.leaders__tab} ${open ? style.leaders__tab_open : ""}`}
    >
      <div className={style.leaders__content}>
        <button
          className={style.leaders__tab_close}
          onClick={() => setOpen(false)}
        >
          &#215;
        </button>
        <h2 className={style.leaders__header}>Leaderboard</h2>
        <div className={style.leaders__buttons}>
          {buttonsData.map((button) => (
            <button
              key={button.name}
              className={`${style.leaders__button} ${selectedButton === button.name ? style.leaders__button_selected : ""}`}
              onClick={() => handleButtonClick(button.name)}
            >
              {button.name}
            </button>
          ))}
        </div>
        <ul className={style.leaders__table}>
          <li className={style.leaders__tableHeader}>
            <span>Top</span>
            <span>Player</span>
            <span>Time, sec</span>
          </li>
          {leaders.map((leader, index) => (
            <li className={style.leaders__tableContent} key={index}>
              <span>{index + 1}</span>
              <span>{leader.playerName}</span>
              <span>{leader.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeadersTab;