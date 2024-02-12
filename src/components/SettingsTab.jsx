import React, { useEffect, useState } from "react";
import style from "./SettingsTab.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { boardSizeSlice, updateBoard } from "../store/reducers/boardSizeSlice";

const MAX_ROWS = 32;
const MIN_ROWS = 3;
const MAX_COLUMNS = 16;
const MIN_COLUMNS = 3;
const MAX_MINES = MAX_ROWS * MAX_COLUMNS;
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
  const [selectedButton, setSelectedButton] = useState(mode); // Состояние для хранения выбранной кнопки
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

  const limits = {
    rows: { min: MIN_ROWS, max: MAX_ROWS },
    cols: { min: MIN_COLUMNS, max: MAX_COLUMNS },
    mines: { min: MIN_MINES, max: MAX_ROWS * MAX_COLUMNS },
  };

  useEffect(() => {
    const updatedBoardSize = {
      rows: difficulty.rows === "" ? MIN_ROWS : difficulty.rows,
      columns: difficulty.cols === "" ? MIN_COLUMNS : difficulty.cols,
      minesNumber: difficulty.mines === "" ? MIN_MINES : difficulty.mines,
      mode: selectedButton,
    };
    // Перед диспатчем проверьте, что все значения не пустые
    if (
      updatedBoardSize.rows &&
      updatedBoardSize.columns &&
      updatedBoardSize.minesNumber
    ) {
      dispatch(updateBoard(updatedBoardSize));
    }
  }, [difficulty, selectedButton]);

  function setDifficultyLevel(param) {
    setDifficulty({ rows: param.rows, cols: param.cols, mines: param.mines });
  }

  const handleButtonClick = (buttonName, params) => {
    setSelectedButton(buttonName); // Обновление состояния выбранной кнопки

    if (buttonName === "custom") {
      setShowCustomTab(!showCustomTab); // Обновление состояния для показа/скрытия кастомной вкладки
    } else {
      setDifficultyLevel(params);
    }
  };

  const setDifficultyParam = (param, value) => {
    // const newValue = value === '' ? '' : Math.max(3, Number(value));

    // Определяем пределы для каждого параметра
    // const limits = {
    //   rows: { min: MIN_ROWS, max: MAX_ROWS },
    //   cols: { min: MIN_COLUMNS, max: MAX_COLUMNS },
    //   mines: { min: MIN_MINES, max: MAX_MINES },
    // };
    // const numValue = value === "" ? "" : Number(value);
    // // Проверяем валидность значения
    // if (numValue < limits[param].min || numValue > limits[param].max) {
    //   // Устанавливаем сообщение об ошибке для соответствующего параметра
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [param]: `Value must be between ${limits[param].min} and ${limits[param].max}`,
    //   }));
    //   setDifficulty((prevState) => ({ ...prevState, [param]: numValue }));
    // } else {
    //   // Если значение валидно, обновляем состояние и сбрасываем ошибку
    //   setDifficulty((prevState) => ({ ...prevState, [param]: numValue }));
    //   setErrors((prevErrors) => ({ ...prevErrors, [param]: "" }));
    // }

    const numValue =
      // value === ""
      //   ? ""
      //   : Math.max(
      //       limits[param].min,
      //       Math.min(Number(value), limits[param].max),
      //     );
      // Обновляем состояние без установки ошибки, ошибка будет установлена при потере фокуса, если значение некорректно
      setDifficulty((prevState) => ({
        ...prevState,
        [param]: numValue,
      }));

    // setDifficulty(prevState => ({
    //     ...prevState,
    //     [param]: newValue
    // }));
  };

  const handleInputBlur = (param) => {
    // Корректировка значения при потере фокуса
    const value = difficulty[param];
    let correctedValue = value;

    if (value === "") {
      correctedValue = param === "mines" ? MIN_MINES : MIN_MINES;
    } else if (value < limits[param].min) {
      correctedValue = limits[param].min;
    } else if (value > limits[param].max) {
      correctedValue = limits[param].max;
    }

    setDifficulty((prevState) => ({
      ...prevState,
      [param]: correctedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [param]: "",
    }));

    // let correctedValue = difficulty[param];
    const limit = limits[param];

    // correctedValue =
    //   correctedValue === ""
    //     ? limit.min
    //     : Math.max(limit.min, Math.min(Number(correctedValue), limit.max));
    //
    // setDifficulty((prevState) => ({
    //   ...prevState,
    //   [param]: correctedValue,
    // }));
    // Сброс или установка ошибки
    // const error =
    //   correctedValue < limit.min || correctedValue > limit.max
    //     ? `Value must be between ${limit.min} and ${limit.max}`
    //     : "";
    // setErrors((prevErrors) => ({ ...prevErrors, [param]: error }));
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
              onChange={(event) =>
                setDifficultyParam("rows", event.target.value)
              }
              onBlur={() => handleInputBlur("rows")}
            />
            {errors.rows && (
              <div className={style.difficulty__error}>{errors.rows}</div>
            )}
          </div>

          <div className={style.difficulty__params}>
            Columns:
            <input
              className={style.difficulty__input}
              type="number"
              value={difficulty.cols}
              onChange={(event) =>
                setDifficultyParam("cols", event.target.value)
              }
              onBlur={() => handleInputBlur("cols")}
            />
            {errors.cols && (
              <div className={style.difficulty__error}>{errors.cols}</div>
            )}
          </div>
          <div className={style.difficulty__params}>
            Mines:
            <input
              className={style.difficulty__input}
              type="number"
              value={difficulty.mines}
              onChange={(event) =>
                setDifficultyParam("mines", event.target.value)
              }
              onBlur={() => handleInputBlur("mines")}
            />
            {errors.mines && (
              <div className={style.difficulty__error}>{errors.mines}</div>
            )}
          </div>
        </div>
        <button className={style.difficulty__updateButton}>Update board</button>
      </div>
    </div>
  );
};

export default SettingsTab;
