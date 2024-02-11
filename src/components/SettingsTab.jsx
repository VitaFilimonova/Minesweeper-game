import React, {useEffect, useState} from 'react';
import style from './SettingsTab.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {boardSizeSlice, updateBoard} from "../store/reducers/BoardSizeSlice";

const MAX_ROWS = 32;
const MAX_COLUMNS = 16;
const MAX_MINES = 100;
const SettingsTab = ({open, setOpen}) => {

    const [showCustomTab, setShowCustomTab] = useState(false)
    const {rows: width, columns: height, minesNumber, mode} = useSelector((state) => state.boardSizeReducer)
    const [difficulty, setDifficulty] = useState({rows: width, cols: height, mines: minesNumber})
    const dispatch = useDispatch()
    const [selectedButton, setSelectedButton] = useState(mode); // Состояние для хранения выбранной кнопки
    const buttonsData = [
        {name: 'easy', text: 'Easy 8×8, 10 mines', params: {rows: 8, cols: 8, mines: 10}},
        {name: 'normal', text: 'Normal 16×16, 40 mines', params: {rows: 16, cols: 16, mines: 30}},
        {name: 'hard', text: 'Hard 32×16, 100 mines', params: {rows: 32, cols: 16, mines: 100}},
        {name: 'custom', text: 'Custom mode'}
    ];

    useEffect(() => {
        const updatedBoardSize = {
            rows: difficulty.rows,
            columns: difficulty.cols,
            minesNumber: difficulty.mines,
            mode: selectedButton
        };
        dispatch(updateBoard(updatedBoardSize));
        console.log(difficulty)
        console.log(width, height, minesNumber, mode)
    }, [difficulty, selectedButton]);

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

                    <div className={style.difficulty__params}>Columns:
                        <input className={style.difficulty__input} type='number'
                               value={difficulty.cols}
                               onChange={(event) => setDifficultyParam('cols', event.target.value)}/>
                    </div>
                    <div className={style.difficulty__params}>Mines:
                        <input className={style.difficulty__input} type='number'
                               value={difficulty.mines}
                               onChange={(event) => setDifficultyParam('mines', event.target.value)}/>
                    </div>
                </div>
                {/*<button className={style.difficulty__updateButton} >Update board</button>*/}
            </div>
        </div>
    );
};

export default SettingsTab;