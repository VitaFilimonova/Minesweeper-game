import React, {useEffect, useState} from 'react';
import './reset.scss';
import './App.scss';
import SettingsTab from "./components/SettingsTab";
import Board from "./components/Board";
import LeadersTab from "./components/LeadersTab";
import NameTab from "./components/NameTab";
import {useSelector} from "react-redux";


function App() {
    const playerNames = useSelector((state) => state.playerName)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLeadersOpen, setIsLeadersOpen] = useState(false);
    const [isNameOpen, setIsNameOpen] = useState(true);

    // useEffect(() => {
    //     // console.log(playerNames)
    //     // console.log('l;l')
    //     // if (playerName !== 'anonymous' && playerName !== undefined) {
    //     //     setIsNameOpen(false)
    //     // }
    // }, [playerNames]);

    return (
        <div className="App">
            <div className="App__container">
                <NameTab/>
                <h1 className="App__header">💣Minesweeper💣</h1>
                <div className="App__buttons">
                <button className="App__button" onClick={() => setIsSettingsOpen(true)}>Settings</button>
                {isSettingsOpen && <SettingsTab open={true} setOpen={setIsSettingsOpen}/>}
                <button className="App__button" onClick={() =>setIsLeadersOpen(true)}>Leaders</button>
                {isLeadersOpen && <LeadersTab open={true} setOpen={setIsLeadersOpen}/>}
                <button className="App__button" onClick={() => setIsNameOpen(true)}>Change name</button>
                {isNameOpen && <NameTab open={true} setOpen={setIsNameOpen}/>}
                </div>
                <Board/>

            </div>
        </div>
    );
}

export default App;