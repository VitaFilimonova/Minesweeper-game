import React, { useEffect, useState } from "react";
import style from "./Cell.module.scss";
import { useSelector } from "react-redux";
import { numColorCode } from "../../utils/numColorCode";

const Cell = ({
  data,
  x,
  y,
  updateBoard,
  flagCell,
  reset,
  gameOver,
  gameWinOver,
}) => {
  const { revealed, value } = data;
  const { mode } = useSelector((state) => state.boardSizeReducer);
  const [cellState, setCellState] = useState("hidden");
  const playerName = useSelector((state) => state.playerNameReducer.playerName);

  useEffect(() => {
    setCellState("hidden"); // Returning the cell to its original hidden state
  }, [reset, mode, playerName]);

  const handleClick = () => {
    if (data.flagged || gameOver || gameWinOver) {
      return;
    }
    updateBoard(x, y);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (gameOver || gameWinOver) {
      return;
    }

    if (!revealed) {
      switch (cellState) {
        case "hidden":
          flagCell(x, y);
          setCellState("flagged");
          break;
        case "flagged":
          flagCell(x, y);
          setCellState("questionMark");
          break;
        case "questionMark":
          setCellState("hidden");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div
      className={`${style.cell} ${revealed ? style.cell_revealed : ""} `}
      style={{ color: numColorCode(value) }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseDown={(e) => {
        if (e.button === 1) handleRightClick(e);
      }}
    >
      {data.revealed
        ? data.exploded
          ? "💥"
          : data.value === "X"
            ? "💣"
            : data.value === 0
              ? ""
              : data.value
        : cellState === "flagged"
          ? "🚩"
          : cellState === "questionMark"
            ? "❔"
            : ""}
    </div>
  );
};

export default Cell;
