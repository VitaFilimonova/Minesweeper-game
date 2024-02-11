import React, {useEffect, useState} from 'react';
import style from './Board.module.scss'
import Cell from "./Cell";
import {useSelector} from "react-redux";
import LoseTab from "./LoseTab";
import {updateBoard} from "../store/reducers/boardSizeSlice";
import Timer from "./Timer";
import WinTab from "./WinTab";

const Board = () => {
    const [board, setBoard] = useState([])
    const [mines, setMines] = useState([])
    const [nonMinesNumber, setNonMinesNumber] = useState(0);
    const [restart, setRestart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWinOver, setGameWinOver] = useState(false);
    const {rows, columns, minesNumber, mode} = useSelector((state) => state.boardSizeReducer)
    const [time, setTime] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const playerName = useSelector((state) => state.playerNameReducer.playerName)
    const [flagsCount, setFlagsCount] = useState(0);
    const [bombsCount, setBombsCount] = useState(minesNumber - flagsCount);

    useEffect(() => {
        const generateBoard = () => {
            const getBoard = createBoard();
            setNonMinesNumber(rows * columns - minesNumber);
            setTime(0);
            setFlagsCount(0)
            setBoard(getBoard.newBoard);
            setMines(getBoard.mines);
            setGameOver(false);
            setGameWinOver(false);
            setRestart(false);

            setGameStarted(false); // Сбрасываем флаг начала игры
        };
        generateBoard();

    }, [rows, columns, minesNumber, mode, restart, setRestart]);

    function createBoard() {
        const newBoard = Array.from({length: rows}, (_, rowIndex) =>
            Array.from({length: columns}, (_, colIndex) => ({
                value: 0,
                revealed: false,
                row: rowIndex,
                column: colIndex,
                flagged: false,
                exploded: false
            }))
        );


        // Add random mines
        function randomMines(min = 0, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let mine = 0
        while (mine < minesNumber) {

            let row = randomMines(0, rows - 1);
            let col = randomMines(0, columns - 1);

            if (newBoard[row][col].value === 0) {
                newBoard[row][col].value = "X";
                mines.push([row, col]);
                mine++
            }
        }


        // setBoard(newBoard);

        // Add numbers
        for (let rowNum = 0; rowNum < rows; rowNum++) {
            for (let colNum = 0; colNum < columns; colNum++) {
                if (newBoard[rowNum][colNum].value !== "X") {
                    let neighbors = [
                        [-1, -1], [-1, 0], [-1, 1],
                        [0, -1], [0, 1],
                        [1, -1], [1, 0], [1, 1]
                    ];

                    let count = 0;
                    for (let [dx, dy] of neighbors) {
                        let newRow = rowNum + dx;
                        let newCol = colNum + dy;
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns &&
                            newBoard[newRow][newCol].value === "X") {
                            count++;
                        }
                    }
                    newBoard[rowNum][colNum].value = count;
                }
            }
        }

        console.log(newBoard)
        return {newBoard, mines};
    }

    const revealed = (arr, x, y, newNonMinesNum) => {
        if (arr[x][y].revealed) return;

        const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        const stack = [[x, y]];

        while (stack.length) {
            const [cx, cy] = stack.pop();
            const cell = arr[cx][cy];

            if (!cell.revealed) {
                newNonMinesNum--;
                cell.revealed = true;
            }

            if (cell.value === 0) {
                for (const [dx, dy] of neighbors) {
                    const nx = cx + dx;
                    const ny = cy + dy;

                    if (
                        nx >= 0 && nx < arr.length &&
                        ny >= 0 && ny < arr[0].length &&
                        !arr[nx][ny].revealed
                    ) {
                        stack.push([nx, ny]);
                    }
                }
            }
        }

        return {arr, newNonMinesNum};
    };


    const updateBoard = (row, col, e) => {
        let newBoardValues = JSON.parse(JSON.stringify(board));
        let newNonMinesNumber = nonMinesNumber;

        if (!gameOver && !gameStarted  ) {
            setGameStarted(true); // Начинаем игру при первом открытии клетки
        }

        if (newBoardValues[row][col].value === "X") {
            newBoardValues[row][col].exploded = true;
            // Перебираем все клетки
            newBoardValues.forEach((boardRow, rowIndex) => {
                boardRow.forEach((cell, colIndex) => {
                    // Открываем только клетки с бомбами
                    if (cell.value === "X") {
                        newBoardValues[rowIndex][colIndex].revealed = true;
                    }
                });
            });
            setBoard(newBoardValues)
            setGameOver(true);
        } else {
            newBoardValues = revealed(newBoardValues, row, col, newNonMinesNumber);

            if (!newBoardValues) {
                return;
            }
            setBoard(newBoardValues.arr);
            setNonMinesNumber(newBoardValues.newNonMinesNum);
        }

    };


    useEffect(() => {

        console.log(flagsCount)
        console.log(board)

    }, [flagsCount, setFlagsCount]);
    useEffect(() => {
        setBombsCount(minesNumber - flagsCount)
    }, [flagsCount, minesNumber, setFlagsCount]);
    const flagCell = (row, col) => {
        setBoard(prevBoard => {
            // Копируем доску для иммутабильного обновления
            const newBoard = JSON.parse(JSON.stringify(prevBoard));

            // Обновляем состояние флага для клетки
            newBoard[row][col].flagged = !newBoard[row][col].flagged;

            // Подсчитываем новое количество флагов
            const newFlagsCount = newBoard.flat().filter(cell => cell.flagged).length;
            setFlagsCount(newFlagsCount);

            if (newFlagsCount > 0 && !gameStarted) {
                setGameStarted(true);
            }
            // Возвращаем обновленную доску
            return newBoard;
        });
    };

    const updateFlags = (flagged) => {
        setFlagsCount(prevFlagsCount => prevFlagsCount - 1);
    };

    function handleRestartButton() {
        setGameOver(false);
        setGameWinOver(false);
        setGameStarted(false); // Сбрасываем флаг начала игры
        setRestart(true)
    }


    const checkWin = () => {
        // Подсчитываем количество клеток без мин
        const nonMineCellsCount = rows * columns - minesNumber;

        // Подсчитываем количество правильно установленных флагов и количество открытых клеток
        let correctlyFlaggedMinesCount = 0;
        let openedCellsCount = 0;

        board.forEach(row => {
            row.forEach(cell => {
                if (cell.revealed && cell.value !== "X") {
                    openedCellsCount++;
                }
                if (cell.flagged && cell.value === "X") {
                    correctlyFlaggedMinesCount++;
                }
            });
        });

        // Проверяем условия победы
        // if (openedCellsCount === nonMineCellsCount ||
        //     (correctlyFlaggedMinesCount === minesNumber && openedCellsCount + correctlyFlaggedMinesCount === nonMineCellsCount + minesNumber)) {
        //     return true;
        // }

        if (gameStarted && nonMinesNumber === 0) {
            console.log('winnn')
return true
        }

        return false;
    };

    useEffect(() => {
        console.log(nonMinesNumber)
        if(checkWin()) {
            setGameWinOver(true)
        }
    }, [nonMinesNumber]);

    return (
        <div>
            <div className={style.board__header}>
                <div className={style.board__name}>Player: {playerName}</div>
                {gameOver && <LoseTab/>}
                {gameWinOver && <WinTab/>}
                <div className={style.board__menu}>
                    <p className={style.board__flags}>🚩{bombsCount}</p>
                    <button className={`${style.board__button} ${gameOver ? style.board__button_lose : ''} ${gameWinOver ? style.board__button_win : ''}`}
                            onClick={handleRestartButton}>
                    </button>
                    <Timer gameOver={gameOver} sendTime={setTime} gameStarted={gameStarted} restart={restart}/>
                </div>
            </div>
            {
                board.map((row, index) => {
                    return (
                        <div className={style.board__cells} key={index}>
                            {row.map((oneCell, indexOneCell) => {
                                return (
                                    <Cell
                                        key={indexOneCell}
                                        data={oneCell}
                                        x={index}  // передаем координаты x
                                        y={indexOneCell}  // передаем координаты y
                                        updateBoard={updateBoard}
                                        flagCell={flagCell}
                                        reset={restart}
                                        updateFlags={updateFlags}
                                        gameOver={gameOver}
                                    />
                                )
                            })

                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Board;