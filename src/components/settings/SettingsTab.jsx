import React, { useEffect, useState } from "react";
import style from "./SettingsTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../../store/reducers/boardSizeSlice";

const MAX_ROWS = 32;
const MIN_ROWS = 3;
const MAX_COLUMNS = 16;
const MIN_COLUMNS = 3;
const MIN_MINES = 1;
const SettingsTab = ({ open, setOpen }) => {
  const [showCustomTab, setShowCustomTab] = useState(false);
  const {
    rows: width,
    columns: height,
    minesNumber,
    mode,
  } = useSelector((state) => state.boardSizeReducer);
  const [difficulty, setDifficulty] = useState({
    rows: width,
    cols: height,
    mines: minesNumber,
  });
  const dispatch = useDispatch();
  const [selectedButton, setSelectedButton] = useState(mode);
  const [errors, setErrors] = useState({ rows: "", cols: "", mines: "" });
  const buttonsData = [
    {
      name: "easy",
      text: "Easy 8×8, 10 mines",
      params: { rows: 8, cols: 8, mines: 10 },
    },
    {
      name: "normal",
      text: "Normal 16×16, 40 mines",
      params: { rows: 16, cols: 16, mines: 30 },
    },
    {
      name: "hard",
      text: "Hard 32×16, 100 mines",
      params: { rows: 32, cols: 16, mines: 100 },
    },
    { name: "custom", text: "Custom mode" },
  ];

  useEffect(() => {
    const updatedBoardSize = {
      rows: difficulty.rows === "" ? MIN_ROWS : difficulty.rows,
      columns: difficulty.cols === "" ? MIN_COLUMNS : difficulty.cols,
      minesNumber: difficulty.mines === "" ? MIN_MINES : difficulty.mines,
      mode: selectedButton,
    };

    if (
      updatedBoardSize.rows &&
      updatedBoardSize.columns &&
      updatedBoardSize.minesNumber
    ) {
      dispatch(updateBoard(updatedBoardSize));
    }
  }, [selectedButton]);

  function setDifficultyLevel(param) {
    setDifficulty({ rows: param.rows, cols: param.cols, mines: param.mines });
  }

  const handleButtonClick = (buttonName, params) => {
    setSelectedButton(buttonName);

    if (buttonName === "custom") {
      setShowCustomTab(!showCustomTab);
    } else {
      setDifficultyLevel(params);
    }
  };

  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    if (difficulty.rows < MIN_ROWS || difficulty.rows > MAX_ROWS) {
      newErrors.rows = `Rows must be between ${MIN_ROWS} and ${MAX_ROWS}.`;
      isValid = false;
    }
    if (difficulty.cols < MIN_COLUMNS || difficulty.cols > MAX_COLUMNS) {
      newErrors.cols = `Columns must be between ${MIN_COLUMNS} and ${MAX_COLUMNS}.`;
      isValid = false;
    }
    const maxMines = difficulty.rows * difficulty.cols - 1;
    if (difficulty.mines < 1 || difficulty.mines > maxMines) {
      newErrors.mines = `Mines must be between 1 and ${maxMines}.`;
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      dispatch(
        updateBoard({
          rows: difficulty.rows,
          columns: difficulty.cols,
          minesNumber: difficulty.mines,
          mode: mode,
        }),
      );
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setDifficulty((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div
      className={`${style.difficulty__tab} ${open ? style.difficulty__tab_open : ""}`}
    >
      <div className={style.difficulty__content}>
        {buttonsData.map((button) => (
          <button
            key={button.name}
            className={`${style.difficulty__button} ${selectedButton === button.name ? style.difficulty__button_selected : ""}`}
            onClick={() => handleButtonClick(button.name, button.params)}
          >
            {button.text}
          </button>
        ))}
        <button
          className={style.difficulty__tab_close}
          onClick={() => setOpen(false)}
        >
          &#215;
        </button>
        <div
          className={`${style.difficulty__customTab} ${showCustomTab ? style.difficulty__customTab_open : ""}`}
        >
          <div className={style.difficulty__params}>
            Rows:
            <input
              className={style.difficulty__input}
              type="number"
              value={difficulty.rows}
              onChange={(e) => handleChange(e, "rows")}
            />
          </div>
          {errors.rows && (
            <div className={style.difficulty__error}>{errors.rows}</div>
          )}
          <div className={style.difficulty__params}>
            Columns:
            <input
              className={style.difficulty__input}
              type="number"
              value={difficulty.cols}
              onChange={(e) => handleChange(e, "cols")}
            />
          </div>
          {errors.cols && (
            <div className={style.difficulty__error}>{errors.cols}</div>
          )}
          <div className={style.difficulty__params}>
            Mines:
            <input
              className={style.difficulty__input}
              type="number"
              value={difficulty.mines}
              onChange={(event) => handleChange(event, "mines")}
            />
          </div>
          {errors.mines && (
            <div className={style.difficulty__error}>{errors.mines}</div>
          )}
          <button
            className={style.difficulty__updateButton}
            onClick={validateInputs}
          >
            Update board
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
