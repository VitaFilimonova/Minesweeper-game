import React, {useEffect, useState} from 'react';
import style from './SettingsTab.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {boardSizeSlice, updateBoard} from "../store/reducers/BoardSizeSlice";

const MAX_ROWS = 32;
const MAX_COLUMNS = 16;
const MAX_MINES = 100;
const SettingsTab = ({open, setOpen}) => {
    const [difficulty, setDifficulty] = useState({rows: 0, cols: 0, mines: 0})
    const [showCustomTab, setShowCustomTab] = useState(false)
    const {rows: width, columns: height, minesNumber} = useSelector((state) => state.boardSizeReducer)
    const dispatch = useDispatch()
    const [selectedButton, setSelectedButton] = useState('easy'); // Состояние для хранения выбранной кнопки
    const buttonsData = [
        {name: 'easy', text: 'Easy 8×8', params: {rows: 8, cols: 8, mines: 10}},
        {name: 'normal', text: 'Normal 16×16', params: {rows: 16, cols: 16, mines: 30}},
        {name: 'hard', text: 'Hard 32×16', params: {rows: 32, cols: 16, mines: 100}},
        {name: 'custom', text: 'Custom mode'}
    ];

    useEffect(() => {
        const updatedBoardSize = {
            rows: parseInt(difficulty.rows),
            columns: parseInt(difficulty.cols),
            minesNumber: parseInt(difficulty.mines)
        };
        dispatch(updateBoard(updatedBoardSize));
        console.log(difficulty)
        console.log(width, height, minesNumber)
    }, [difficulty, dispatch]);

    function setDifficultyLevel(param) {
        setDifficulty({rows: param.rows, cols:  param.cols, mines: param.mines})
    }


    const handleButtonClick = (buttonName, params) => {
        setSelectedButton(buttonName); // Обновление состояния выбранной кнопки

        if (buttonName === 'custom') {
            setShowCustomTab(!showCustomTab); // Обновление состояния для показа/скрытия кастомной вкладки
        } else {
            setDifficultyLevel(params)
        }
    };

    const setDifficultyParam = (param, value) => {
        setDifficulty(prevState => ({...prevState, [param]: value}));
    };

    return (
        <div className={`${style.difficulty__tab} ${open ? style.difficulty__tab_open : ''}`}>
            <div className={style.difficulty__content}>
                {buttonsData.map((button) => (
                    <button
                        key={button.name}
                        className={`${style.difficulty__button} ${selectedButton === button.name ? style.difficulty__button_selected : ''}`}
                        onClick={() => handleButtonClick(button.name, button.params)}
                    >
                        {button.text}
                    </button>
                ))}
                <button className={style.difficulty__tab_close} onClick={() => setOpen(false)}>&#215;</button>
                <div
                    className={`${style.difficulty__customTab} ${showCustomTab ? style.difficulty__customTab_open : ''}`}>
                    <div className={style.difficulty__params}>
                        Rows:
                        <input className={style.difficulty__input} type='number'
                               value={difficulty.rows}
                               onChange={(event) => setDifficultyParam('rows', event.target.value)}/>
                    </div>

                    <div>Columns:
                        <input className={style.difficulty__input} type='number'
                               value={difficulty.cols}
                               onChange={(event) => setDifficultyParam('cols', event.target.value)}/>
                    </div>
                    <div>Mines:
                        <input className={style.difficulty__input} type='number'
                               value={difficulty.mines}
                               onChange={(event) => setDifficultyParam('mines', event.target.value)}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsTab;