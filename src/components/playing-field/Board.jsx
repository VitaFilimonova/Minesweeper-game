import React, { useEffect, useState } from "react";
import style from "./Board.module.scss";
import Cell from "./Cell";
import { useDispatch, useSelector } from "react-redux";
import LoseTab from "./LoseTab";
import Timer from "./Timer";
import WinTab from "./WinTab";
import { addLeaderResult } from "../../store/reducers/leadersSlice";
import { revealed } from "../../utils/revealed";
import { createBoard } from "../../utils/createBoard";

const Board = () => {
  const [board, setBoard] = useState([]);
  const [nonMinesNumber, setNonMinesNumber] = useState(0);
  const [restart, setRestart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWinOver, setGameWinOver] = useState(false);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [flagsCount, setFlagsCount] = useState(0);
  const { rows, columns, minesNumber, mode } = useSelector(
    (state) => state.boardSizeReducer,
  );
  const [bombsCount, setBombsCount] = useState(minesNumber - flagsCount);
  const playerName = useSelector((state) => state.playerNameReducer.playerName);
  const dispatch = useDispatch();

  useEffect(() => {
    const generateBoard = () => {
      const getBoard = createBoard(rows, columns, minesNumber);
      setNonMinesNumber(rows * columns - minesNumber);
      setTime(0);
      setFlagsCount(0);
      setBoard(getBoard.newBoard);
      setGameOver(false);
      setGameWinOver(false);
      setRestart(false);

      setGameStarted(false);
    };
    generateBoard();
  }, [rows, columns, minesNumber, mode, restart, setRestart, playerName]);

  const updateBoard = (row, col, e) => {
    let newBoardValues = JSON.parse(JSON.stringify(board));
    let newNonMinesNumber = nonMinesNumber;

    if (!gameOver && !gameStarted) {
      setGameStarted(true);
    }

    if (newBoardValues[row][col].value === "X") {
      newBoardValues[row][col].exploded = true;

      newBoardValues.forEach((boardRow, rowIndex) => {
        boardRow.forEach((cell, colIndex) => {
          if (cell.value === "X") {
            newBoardValues[rowIndex][colIndex].revealed = true;
          }
        });
      });
      setBoard(newBoardValues);
      setGameOver(true);
    } else {
      newBoardValues = revealed(newBoardValues, row, col, newNonMinesNumber);

      if (!newBoardValues) {
        return;
      }
      setBoard(newBoardValues.arr);
      setNonMinesNumber(newBoardValues.newNonMinesNum);
      setFlagsCount((prev) => prev - newBoardValues.flagsRemoved);
    }
  };

  const flagCell = (row, col) => {
    setBoard((prevBoard) => {
      const newBoard = JSON.parse(JSON.stringify(prevBoard));
      newBoard[row][col].flagged = !newBoard[row][col].flagged;

      const newFlagsCount = newBoard
        .flat()
        .filter((cell) => cell.flagged).length;
      setFlagsCount(newFlagsCount);

      if (newFlagsCount > 0 && !gameStarted) {
        setGameStarted(true);
      }

      return newBoard;
    });
  };

  const checkWin = () => {
    let correctlyFlaggedMinesCount = 0;

    board.forEach((row) => {
      row.forEach((cell) => {
        if (cell.flagged && cell.value === "X") {
          correctlyFlaggedMinesCount++;
        }
      });
    });

    return (
      correctlyFlaggedMinesCount === minesNumber ||
      (gameStarted && nonMinesNumber === 0)
    );
  };

  useEffect(() => {
    setBombsCount(minesNumber - flagsCount);
  }, [flagsCount, minesNumber, setFlagsCount]);

  useEffect(() => {
    if (checkWin()) {
      setGameWinOver(true);
      dispatch(
        addLeaderResult({
          mode: mode,
          playerName: playerName,
          time: time,
        }),
      );
    }
  }, [nonMinesNumber, flagsCount]);

  return (
    <div className={style.board}>
      <div className={style.board__header}>
        <div className={style.board__name}>Player: {playerName}</div>
        {gameOver && <LoseTab />}
        {gameWinOver && <WinTab />}
        <div className={style.board__menu}>
          <p className={style.board__flags}>🚩{bombsCount}</p>
          <button
            className={`${style.board__button} ${gameOver ? style.board__button_lose : ""} ${gameWinOver ? style.board__button_win : ""}`}
            onClick={() => setRestart(true)}
          ></button>
          <Timer
            gameOver={gameOver}
            gameWinOver={gameWinOver}
            sendTime={setTime}
            gameStarted={gameStarted}
            restart={restart}
          />
        </div>
      </div>
      {board.map((row, index) => {
        return (
          <div className={style.board__cells} key={index}>
            {row.map((oneCell, indexOneCell) => {
              return (
                <Cell
                  key={indexOneCell}
                  data={oneCell}
                  x={index}
                  y={indexOneCell}
                  updateBoard={updateBoard}
                  flagCell={flagCell}
                  reset={restart}
                  gameOver={gameOver}
                  gameWinOver={gameWinOver}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
