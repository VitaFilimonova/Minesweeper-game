import React, { useEffect, useState } from "react";
import "./reset.scss";
import "./App.scss";
import SettingsTab from "./components/settings/SettingsTab";
import Board from "./components/playing-field/Board";
import LeadersTab from "./components/settings/LeadersTab";
import NameTab from "./components/settings/NameTab";
import { useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  const playerName = useSelector((state) => state.playerNameReducer.playerName);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isModalOpen = location.state?.modal;

  useEffect(() => {
    if (playerName === "anonymous") {
      setIsNameModalOpen(true);
    }
  }, [playerName]);

  return (
    <div className="App">
      <div className="App__container">
        {isNameModalOpen && (
          <NameTab open={true} setOpen={setIsNameModalOpen} />
        )}
        <h1 className="App__header">💣Minesweeper💣</h1>
        <div className="App__buttons">
          <button
            className="App__button"
            onClick={() => setIsSettingsOpen(true)}
          >
            Settings
          </button>
          {isSettingsOpen && (
            <SettingsTab open={true} setOpen={setIsSettingsOpen} />
          )}

          <button className="App__button" onClick={() => setIsNameOpen(true)}>
            Change name
          </button>
          {isNameOpen && <NameTab open={true} setOpen={setIsNameOpen} />}

          <Link to={"/leaders"} className="App__button" state={{ modal: true }}>
            Leaders
          </Link>
        </div>

        <Board />
        {isModalOpen && (
          <Routes>
            <Route
              path="/leaders"
              element={<LeadersTab open={true} setOpen={() => navigate(-1)} />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
