import React, {useEffect, useState} from 'react';
import './reset.scss';
import './App.scss';
import SettingsTab from "./components/SettingsTab";
import Board from "./components/Board";
import LeadersTab from "./components/LeadersTab";
import NameTab from "./components/NameTab";
import {useSelector} from "react-redux";
import {Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";


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
    const navigate = useNavigate();
    const location = useLocation();

    // Проверяем, открыто ли модальное окно
    const isModalOpen = location.state?.modal;

    return (
        <div className="App">
            <div className="App__container">
                <NameTab/>
                <h1 className="App__header">💣Minesweeper💣</h1>
                <div className="App__buttons">
                    <button className="App__button" onClick={() => setIsSettingsOpen(true)}>Settings</button>
                    {isSettingsOpen && <SettingsTab open={true} setOpen={setIsSettingsOpen}/>}
                    {/*<button className="App__button" onClick={() => setIsLeadersOpen(true)}>Leaders</button>*/}
                    {/*{isLeadersOpen && <LeadersTab open={true} setOpen={setIsLeadersOpen}/>}*/}
                    <Link to={'/leaders'} className="App__button"
                             state= {{modal: true}}>Leaders
                    </Link>
                    <button className="App__button" onClick={() => setIsNameOpen(true)}>Change name</button>
                    {isNameOpen && <NameTab open={true} setOpen={setIsNameOpen}/>}
                </div>
                {/*<Routes>*/}
                {/*    <Route path="/" element={<Board/>}/>*/}
                {/*    /!*<Route path="/leaders" element={<LeadersTab />} />*!/*/}
                {/*</Routes>*/}
                <Board/>
                {isModalOpen && (
                    <Routes>
                        <Route path="/leaders" element={<LeadersTab open={true} setOpen={() => navigate(-1)}/>}/>
                    </Routes>
                )}
            </div>
        </div>
    );
}

export default App;