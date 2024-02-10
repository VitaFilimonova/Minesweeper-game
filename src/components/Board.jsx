import React, {useEffect, useState} from 'react';
import style from './Board.module.scss'
import Cell from "./Cell";
import {useSelector} from "react-redux";
import LoseTab from "./LoseTab";
import {updateBoard} from "../store/reducers/BoardSizeSlice";

const Board = () => {
    const [board, setBoard] = useState([])
    const [restart, setRestart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const {rows, columns, minesNumber} = useSelector((state) => state.boardSizeReducer)
    const [time, setTime] = useState(0);
    useEffect(() => {
        const generateBoard = () => {
            const getBoard = createBoard();
            // setNonMinesCount(100 - 20);
            setTime(0);
            // setBoard(getBoard.board);
            // setMineLocations(getBoard.mineLocation);
            setGameOver(false);
            setRestart(false);
        };
        generateBoard();

    }, [rows, columns, minesNumber, restart, setRestart]);

    function createBoard() {
        const newBoard = Array.from({length: rows}, () =>
            Array.from({length: columns}, () => ({
                value: 0,
                revealed: false,
                isMine: false,
            }))
        );
        return setBoard(newBoard);
    }
    const flagCell = (x, y) => {
        let newBoardValues = JSON.parse(JSON.stringify(board));
        newBoardValues[x][y].flagged = !newBoardValues[x][y].flagged;
        setBoard(newBoardValues);
    };

    return (
        <div>
            {gameOver && <LoseTab reset={setRestart} completeTime={time}/>}
            {/*<TopBar gameOver={gameOver} setTime={setTime} newTime={newTime} />*/}
            {board.map((row, index) => {
                return (
                    <div className={style.ko}>
                    {row.map((oneCell, indexOneCell)=> {
                        return (
                            <Cell
                            key = {indexOneCell}
                            data={oneCell}
                            updateBoard={updateBoard}
                            flagCell={flagCell}
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