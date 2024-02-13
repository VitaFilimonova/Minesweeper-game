import React, { useEffect, useState } from "react";
import style from "./NameTab.module.scss";
import { useDispatch } from "react-redux";
import { updateName } from "../../store/reducers/playerNameSlice";

const NameTab = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const dispatch = useDispatch();

  function savePlayer() {
    dispatch(updateName({ playerName: name }));
    setOpen(false);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      savePlayer();
    }
  };

  useEffect(() => {
    if (name.length > 25 || name.trim() === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  return (
    <div className={`${style.name__tab} ${open ? style.name__tab_open : ""}`}>
      <div className={style.name__content}>
        <button
          className={style.name__tab_close}
          onClick={() => setOpen(false)}
        >
          &#215;
        </button>
        <h3>Enter your name</h3>
        <input
          className={style.name__input}
          placeholder="anonymous"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        {nameError && (
          <p className={style.name__error}>Invalid name, please try again</p>
        )}
        <button
          className={style.name__buttonSave}
          onClick={savePlayer}
          disabled={!name || name.trim() === "" || name.length > 25}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default NameTab;
