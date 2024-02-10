import React, {useEffect, useState} from 'react';
import style from './Board.module.scss'
import Cell from "./Cell";
import {useSelector} from "react-redux";
import LoseTab from "./LoseTab";
import {updateBoard} from "../store/reducers/BoardSizeSlice";
import Timer from "./Timer";

const Board = () => {
    const [board, setBoard] = useState([])
    const [mines, setMines] = useState([])
    const [nonMinesNumber, setNonMinesNumber] = useState(0);
    const [restart, setRestart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const {rows, columns, minesNumber} = useSelector((state) => state.boardSizeReducer)
    const [time, setTime] = useState(0);
    useEffect(() => {
        const generateBoard = () => {
            const getBoard = createBoard();
            // setNonMinesCount(100 - 20);
            setTime(0);
            setBoard(getBoard.newBoard);
            setMines(getBoard.mines);
            setGameOver(false);
            setRestart(false);
        };
        generateBoard();

    }, [rows, columns, minesNumber, restart]);

    function createBoard() {
        const newBoard = Array.from({length: rows}, (_, rowIndex) =>
            Array.from({length: columns}, (_, colIndex) => ({
                value: 0,
                revealed: false,
                row: rowIndex,
                column: colIndex,
                flagged: false,
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
        if (newBoardValues[row][col].value === "X") {
            for (let i = 0; i < mines.length; i++) {
                if (!newBoardValues[mines[i][0]][mines[i][1]].revealed) {
                    newBoardValues[mines[i][0]][mines[i][1]].revealed = true;
                }
            }
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


    const flagCell = (row, col) => {
        let newBoardValues = JSON.parse(JSON.stringify(board));
        newBoardValues[row][col].flagged = !newBoardValues[row][col].flagged;
        setBoard(newBoardValues);
        console.log(board)
    };

    return (
        <div>
            {gameOver && <LoseTab reset={setRestart} completeTime={time}/>}
            <div className={style.board__header}>
                <p>💥{}</p>
            <button className={style.board__button} onClick={() => setRestart(true)}>
            </button>
            <Timer gameOver={gameOver} sendTime={setTime}/>
            </div>
            {/*<TopBar gameOver={gameOver} setTime={setTime} newTime={newTime} />*/}
            {board.map((row, index) => {
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