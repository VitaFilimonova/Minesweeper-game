import React, {useEffect, useState} from 'react';
import style from './Cell.module.scss'
import {updateName} from "../store/reducers/leadersSlice";
import {useSelector} from "react-redux";

const Cell = ({data, x, y, updateBoard, flagCell, reset, updateFlags, gameOver}) => {
    const {revealed, value, flagged} = data;
    const { mode} = useSelector((state) => state.boardSizeReducer)
    const [cellState, setCellState] = useState("hidden"); // Состояние клетки: "hidden", "flagged", "questionMark"

    useEffect(() => {
        setCellState("hidden"); // Возвращаем клетку в исходное скрытое состояние
    }, [reset,mode]);
    const handleClick = (e) => {
        // e.preventDefault();
        if (data.flagged || gameOver) {
            return;
        }
        updateBoard(x, y);
    };
    const handleRightClick = (e) => {
        e.preventDefault(); // Предотвращаем стандартное контекстное меню браузера
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
                    // flagCell(x, y);
                    setCellState("hidden");
                    break;
                default:
                    break;
            }
        }
    };

    const numColorCode = (num) => {
        switch (num) {
            case 1:
                return "#1976d2";
            case 2:
                return "#388d3c";
            case 3:
                return "#d33030";
            case 4:
                return "#051075";
            case 5:
                return "#835b06";
            case 6:
                return "#04e0cb";
            case 7:
                return "#000000";
            case 8:
                return "#ffffff";
            default:
                return;
        }
    };

    return (
        <div
            className={`${style.cell} ${revealed ? style.cell_revealed : ''} `}
            style={{color: numColorCode(value)}}
            onClick={handleClick}
            onContextMenu={handleRightClick}
            onMouseDown={(e) => {
                if (e.button === 1) handleRightClick(e);
            }}
        >

            {data.revealed ? (
                data.exploded ? (
                    "💥" // Отображение взорванной бомбы
                ) : data.value === "X" ? (
                    "💣"
                ) : (
                    data.value === 0 ? "" : data.value
                )
            ) : (
                cellState === "flagged" ? "🚩" :
                    cellState === "questionMark" ? "❔" : ""
            )}
        </div>
    );
};

export default Cell;