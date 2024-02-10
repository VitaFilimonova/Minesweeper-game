import React, {useEffect, useState} from 'react';
import style from './NameTab.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {updateName} from "../store/reducers/LeadersSlice";

const NameTab = ({open, setOpen}) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    // const [open, setOpen] = useState(true)
    const player = useSelector((state) => state.playerName)
    const dispatch = useDispatch()

    function savePlayer() {
        dispatch(updateName({ playerName: name }))
        setOpen(false)
    }

    useEffect(() => {
        if ( name.length > 30) {
            setNameError(true)
        } else {
            setNameError(false)
        }
    }, [name]);

    return (
        <div className={`${style.name__tab} ${open ? style.name__tab_open : ''}`}>

            <div className={style.name__content}>
                <button className={style.name__tab_close} onClick={() => setOpen(false)}>&#215;</button>
                <h3>Enter your name</h3>
                <input className={style.name__input} placeholder='Anonymous' type="text" value={name}
                       onChange={(event) => setName(event.target.value)}/>
                {nameError &&
                    <p className={style.name__error}>Invalid name, please try again</p>
                }
                <button className={style.name__buttonSave} onClick={savePlayer}
                        disabled={!name || name.length > 30}>Save
                </button>
            </div>
        </div>
    );
};

export default NameTab;